import { PrismaClient } from '@prisma/client';
import { calculateAllBusinessModelMatches } from '../../shared/scoring';
import type { QuizData } from '../../shared/types';

const prisma = new PrismaClient();

export interface BusinessModelScore {
  id: string;
  name: string;
  score: number;
  category: string;
  fitScore: number;
}

export class CentralizedScoringService {
  private static instance: CentralizedScoringService;

  private constructor() {}

  static getInstance(): CentralizedScoringService {
    if (!CentralizedScoringService.instance) {
      CentralizedScoringService.instance = new CentralizedScoringService();
    }
    return CentralizedScoringService.instance;
  }

  /**
   * Calculate and store business model scores for a quiz attempt
   * This ensures scores are calculated once and stored consistently
   */
  async calculateAndStoreScores(quizData: QuizData, quizAttemptId: number | string): Promise<BusinessModelScore[]> {
    try {
      // Convert string ID to integer if needed
      const numericId = typeof quizAttemptId === 'string' ? parseInt(quizAttemptId, 10) : quizAttemptId;
      
      if (isNaN(numericId)) {
        throw new Error(`Invalid quizAttemptId: ${quizAttemptId}`);
      }

      // Check if scores already exist for this quiz attempt
      const existingScores = await prisma.businessModelScores.findMany({
        where: { quizAttemptId: numericId },
        orderBy: { score: 'desc' }
      });

      if (existingScores.length > 0) {
        console.log(`Scores already exist for quiz attempt ${numericId}, returning stored scores`);
        return existingScores.map(score => ({
          id: score.businessModelId,
          name: score.businessModelName,
          score: score.score,
          category: score.category,
          fitScore: score.fitScore
        }));
      }

      // Calculate scores using the centralized algorithm
      console.log(`Calculating scores for quiz attempt ${numericId}`);
      const calculatedScores = calculateAllBusinessModelMatches(quizData);

      // Store scores in database
      const scoresToStore = calculatedScores.map(score => ({
        quizAttemptId: numericId,
        businessModelId: score.id,
        businessModelName: score.name,
        score: score.score,
        category: score.category,
        fitScore: score.score // For backward compatibility
      }));

      await prisma.businessModelScores.createMany({
        data: scoresToStore
      });

      console.log(`Stored ${scoresToStore.length} business model scores for quiz attempt ${numericId}`);

      return calculatedScores.map(score => ({
        id: score.id,
        name: score.name,
        score: score.score,
        category: score.category,
        fitScore: score.score // For backward compatibility
      }));
    } catch (error) {
      console.error('Error calculating and storing scores:', error);
      throw new Error(`Failed to calculate and store scores: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get stored business model scores for a quiz attempt
   */
  async getStoredScores(quizAttemptId: number | string): Promise<BusinessModelScore[]> {
    try {
      // Convert string ID to integer if needed
      const numericId = typeof quizAttemptId === 'string' ? parseInt(quizAttemptId, 10) : quizAttemptId;
      
      if (isNaN(numericId)) {
        throw new Error(`Invalid quizAttemptId: ${quizAttemptId}`);
      }

      const scores = await prisma.businessModelScores.findMany({
        where: { quizAttemptId: numericId },
        orderBy: { score: 'desc' }
      });

      return scores.map(score => ({
        id: score.businessModelId,
        name: score.businessModelName,
        score: score.score,
        category: score.category,
        fitScore: score.fitScore
      }));
    } catch (error) {
      console.error('Error retrieving stored scores:', error);
      throw new Error(`Failed to retrieve stored scores: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get stored scores by email (for users who took quiz multiple times)
   */
  async getStoredScoresByEmail(email: string): Promise<BusinessModelScore[]> {
    try {
      // Find the most recent quiz attempt for this email
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          quizAttempts: {
            orderBy: { completedAt: 'desc' },
            take: 1,
            include: {
              businessModelScores: {
                orderBy: { score: 'desc' }
              }
            }
          }
        }
      });

      if (!user || user.quizAttempts.length === 0) {
        return [];
      }

      const latestAttempt = user.quizAttempts[0];
      return latestAttempt.businessModelScores.map(score => ({
        id: score.businessModelId,
        name: score.businessModelName,
        score: score.score,
        category: score.category,
        fitScore: score.fitScore
      }));
    } catch (error) {
      console.error('Error retrieving stored scores by email:', error);
      throw new Error(`Failed to retrieve stored scores by email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Clean up expired scores (for temporary/guest users)
   */
  async cleanupExpiredScores(): Promise<void> {
    try {
      const now = new Date();
      
      // Find expired quiz attempts
      const expiredAttempts = await prisma.quizAttempt.findMany({
        where: {
          expiresAt: {
            not: null,
            lt: now
          },
          isPaid: false // Don't delete paid user data
        },
        select: { id: true }
      });

      if (expiredAttempts.length > 0) {
        // Delete associated business model scores
        await prisma.businessModelScores.deleteMany({
          where: {
            quizAttemptId: {
              in: expiredAttempts.map(a => a.id)
            }
          }
        });

        console.log(`Cleaned up scores for ${expiredAttempts.length} expired quiz attempts`);
      }
    } catch (error) {
      console.error('Error cleaning up expired scores:', error);
    }
  }
}

export const centralizedScoringService = CentralizedScoringService.getInstance();
