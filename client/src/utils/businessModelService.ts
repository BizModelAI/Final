import { QuizData } from "../types";
import { calculateAllBusinessModelMatches } from "../../../shared/scoring";

export interface BusinessModelMatch {
  id: string;
  name: string;
  score: number;
  category: string;
  description?: string;
  fitScore?: number; // For backward compatibility
}

/**
 * Centralized business model scoring service
 * Calculates business model matches once and caches results
 */
export class BusinessModelService {
  private static instance: BusinessModelService;
  private cache = new Map<
    string,
    { matches: BusinessModelMatch[]; timestamp: number }
  >();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  static getInstance(): BusinessModelService {
    if (!BusinessModelService.instance) {
      BusinessModelService.instance = new BusinessModelService();
    }
    return BusinessModelService.instance;
  }

  clearCache(): void {
    console.log(" Clearing business model cache");
    this.cache.clear();
  }

  private getCacheKey(quizData: QuizData): string {
    // Create a stable cache key based on quiz data
    return JSON.stringify({
      mainMotivation: quizData.mainMotivation,
      selfMotivationLevel: quizData.selfMotivationLevel,
      weeklyTimeCommitment: quizData.weeklyTimeCommitment,
      upfrontInvestment: quizData.upfrontInvestment,
      riskComfortLevel: quizData.riskComfortLevel,
      techSkillsRating: quizData.techSkillsRating,
      familiarTools: quizData.familiarTools?.sort(),
    });
  }

  /**
   * Get business model matches for quiz data with server-first approach
   */
  async getBusinessModelMatches(quizData: QuizData, attemptId?: number): Promise<BusinessModelMatch[]> {
    const cacheKey = this.getCacheKey(quizData);
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.matches;
    }

    let matches: BusinessModelMatch[] = [];

    // Try to fetch scores from server first if we have an attemptId
    if (attemptId) {
      try {
        const response = await fetch(`/api/business-model-scores/${attemptId}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const serverScores = await response.json();
          matches = serverScores.map((score: any) => ({
            id: score.id,
            name: score.name,
            score: score.score,
            category: score.category,
            fitScore: score.fitScore || score.score
          }));
          console.log(`✅ Fetched ${matches.length} scores from server for attempt ${attemptId}`);
        }
      } catch (error) {
        console.log('❌ Failed to fetch scores from server, falling back to local calculation:', error);
      }
    }

    // Fallback to local calculation if server fetch failed
    if (matches.length === 0) {
      const rawMatches = calculateAllBusinessModelMatches(quizData);
      matches = rawMatches.map((match) => ({
        id: match.id,
        name: match.name,
        score: match.score,
        category: match.category,
        fitScore: match.score,
      }));
      console.log(`⚠️ Calculated ${matches.length} scores locally (fallback)`);
    }

    // Cache the results
    this.cache.set(cacheKey, { matches, timestamp: now });

    return matches;
  }


  /**
   * Get top N business model matches
   */
  async getTopMatches(quizData: QuizData, count: number = 3, attemptId?: number): Promise<BusinessModelMatch[]> {
    const allMatches = await this.getBusinessModelMatches(quizData, attemptId);
    return allMatches.slice(0, count);
  }

  /**
   * Get bottom N business model matches (worst fits)
   */
  async getBottomMatches(
    quizData: QuizData,
    count: number = 3,
    attemptId?: number
  ): Promise<BusinessModelMatch[]> {
    const allMatches = await this.getBusinessModelMatches(quizData, attemptId);
    return allMatches.slice(-count).reverse(); // Last N, reversed to show worst first
  }

  /**
   * Get matches by category
   */
  async getMatchesByCategory(
    quizData: QuizData,
    category: string,
    attemptId?: number
  ): Promise<BusinessModelMatch[]> {
    const allMatches = await this.getBusinessModelMatches(quizData, attemptId);
    return allMatches.filter((match) => match.category === category);
  }

  /**
   * Find specific business model match
   */
  async getBusinessModelMatch(
    quizData: QuizData,
    businessId: string,
    attemptId?: number
  ): Promise<BusinessModelMatch | undefined> {
    const allMatches = await this.getBusinessModelMatches(quizData, attemptId);
    return allMatches.find((match) => match.id === businessId);
  }

  // Sync versions for backward compatibility - use getBusinessModelMatchesSync internally
  getTopMatchesSync(quizData: QuizData, count: number = 3): BusinessModelMatch[] {
    const allMatches = this.getBusinessModelMatchesSync(quizData);
    return allMatches.slice(0, count);
  }

  getBottomMatchesSync(quizData: QuizData, count: number = 3): BusinessModelMatch[] {
    const allMatches = this.getBusinessModelMatchesSync(quizData);
    return allMatches.slice(-count).reverse();
  }

  getMatchesByCategorySync(quizData: QuizData, category: string): BusinessModelMatch[] {
    const allMatches = this.getBusinessModelMatchesSync(quizData);
    return allMatches.filter((match) => match.category === category);
  }

  getBusinessModelMatchSync(quizData: QuizData, businessId: string): BusinessModelMatch | undefined {
    const allMatches = this.getBusinessModelMatchesSync(quizData);
    return allMatches.find((match) => match.id === businessId);
  }
}

// Export singleton instance
export const businessModelService = BusinessModelService.getInstance();

// Backward compatibility exports
export { calculateAllBusinessModelMatches } from "../../../shared/scoring";
