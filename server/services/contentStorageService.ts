import { prisma } from '../db.js';
import { centralizedScoringService } from './centralizedScoringService.js';

export interface BusinessModelScore {
  id: string;
  name: string;
  score: number;
  category: string;
}

export interface BusinessModelScoresData {
  scores: BusinessModelScore[];
  topMatches: BusinessModelScore[];
  overallFitScore: number;
}

/**
 * FOCUSED Content Storage Service
 * Only stores what's actually needed and reused
 */
export class ContentStorageService {
  private static instance: ContentStorageService;

  static getInstance(): ContentStorageService {
    if (!ContentStorageService.instance) {
      ContentStorageService.instance = new ContentStorageService();
    }
    return ContentStorageService.instance;
  }

  /**
   * Store business model scores (calculated once, used everywhere)
   * This is the ONLY thing that needs to be stored because:
   * - Scores are calculated from quiz data
   * - Scores are used in UI, emails, reports
   * - Regenerating scores is expensive (AI calls)
   */
  async storeBusinessModelScores(
    quizAttemptId: number,
    quizData: any
  ): Promise<void> {
    try {
      // Get business model scores from centralized service
      const businessModelScores = await centralizedScoringService.getStoredScores(quizAttemptId);
      const topMatches = businessModelScores.slice(0, 3);
      const overallFitScore = topMatches[0]?.score || 0;

      // Store in AiContent table with content type 'business-model-scores'
      await prisma.aiContent.upsert({
        where: { 
          quizAttemptId_contentType: {
            quizAttemptId,
            contentType: 'business-model-scores'
          }
        },
        update: {
          content: {
            scores: businessModelScores.map(score => ({
              id: score.id,
              name: score.name,
              score: score.score,
              category: score.category
            })),
            topMatches: topMatches.map(score => ({
              id: score.id,
              name: score.name,
              score: score.score,
              category: score.category
            })),
            overallFitScore,
            calculatedAt: new Date()
          },
          generatedAt: new Date()
        },
        create: {
          quizAttemptId,
          contentType: 'business-model-scores',
          content: {
            scores: businessModelScores.map(score => ({
              id: score.id,
              name: score.name,
              score: score.score,
              category: score.category
            })),
            topMatches: topMatches.map(score => ({
              id: score.id,
              name: score.name,
              score: score.score,
              category: score.category
            })),
            overallFitScore,
            calculatedAt: new Date()
          }
        }
      });

      console.log(`✅ Business model scores stored for quiz attempt ${quizAttemptId}`);
    } catch (error) {
      console.error('❌ Failed to store business model scores:', error);
      throw error;
    }
  }

  /**
   * Get stored business model scores
   */
  async getBusinessModelScores(quizAttemptId: number): Promise<BusinessModelScoresData | null> {
    try {
      const scores = await prisma.aiContent.findFirst({
        where: { 
          quizAttemptId,
          contentType: 'business-model-scores'
        }
      });
      
      if (scores && scores.content) {
        return scores.content as unknown as BusinessModelScoresData;
      }
      return null;
    } catch (error) {
      console.error('❌ Failed to get business model scores:', error);
      return null;
    }
  }

  /**
   * Check if scores exist for a quiz attempt
   */
  async hasBusinessModelScores(quizAttemptId: number): Promise<boolean> {
    try {
      const scores = await prisma.aiContent.findFirst({
        where: { 
          quizAttemptId,
          contentType: 'business-model-scores'
        },
        select: { id: true }
      });
      return !!scores;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clean up expired content based on user type
   */
  async cleanupExpiredContent(): Promise<void> {
    try {
      const now = new Date();
      
      // Guest users: 1 day retention
      const guestExpiry = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      // Temporary users: 3 months retention
      const tempExpiry = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

      // Find expired quiz attempts
      const expiredAttempts = await prisma.quizAttempt.findMany({
        where: {
          OR: [
            // Guest users (no userId, no sessionId)
            {
              userId: null,
              sessionId: null,
              completedAt: { lt: guestExpiry }
            },
            // Temporary users with expiration
            {
              expiresAt: { lt: now }
            }
          ]
        },
        select: { id: true }
      });

      if (expiredAttempts.length > 0) {
        console.log(`🧹 Cleaning up ${expiredAttempts.length} expired quiz attempts`);
        
        // Delete related content (cascade will handle this)
        await prisma.quizAttempt.deleteMany({
          where: {
            id: { in: expiredAttempts.map(a => a.id) }
          }
        });
      }

      console.log('✅ Content cleanup completed');
    } catch (error) {
      console.error('❌ Failed to cleanup expired content:', error);
    }
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<any> {
    try {
      const totalAttempts = await prisma.quizAttempt.count();
      const withScores = await prisma.aiContent.count({
        where: { contentType: 'business-model-scores' }
      });
      const guestAttempts = await prisma.quizAttempt.count({
        where: {
          userId: null,
          sessionId: null
        }
      });
      const tempAttempts = await prisma.quizAttempt.count({
        where: {
          user: {
            isTemporary: true
          }
        }
      });
      const paidAttempts = await prisma.quizAttempt.count({
        where: {
          user: {
            isPaid: true
          }
        }
      });

      return {
        totalAttempts,
        withScores,
        guestAttempts,
        tempAttempts,
        paidAttempts,
        scoreCoverage: totalAttempts > 0 ? Math.round((withScores / totalAttempts) * 100) : 0
      };
    } catch (error) {
      console.error('❌ Failed to get storage stats:', error);
      return {};
    }
  }
}

export default ContentStorageService;
