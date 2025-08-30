import { prisma } from '../db.js';
import { calculateAllBusinessModelMatches } from '../../shared/scoring.js';

export interface BusinessAnalysisData {
  businessModelScores: any[];
  topMatches: any[];
  fitScore: number;
  analysis: any;
}

export interface EmailContentData {
  emailType: 'quiz-results' | 'full-report' | 'welcome';
  recipient: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  emailId?: string;
}

export interface PersonalizedContentData {
  contentType: 'benefits' | 'challenges' | 'action-plan' | 'recommendations';
  content: any;
}

/**
 * Comprehensive content storage service
 * Stores ALL generated content with proper retention policies
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
   * Store business model analysis and scoring
   */
  async storeBusinessAnalysis(
    quizAttemptId: number,
    quizData: any
  ): Promise<void> {
    try {
      // Calculate business model scores
      const businessModelScores = calculateAllBusinessModelMatches(quizData);
      const topMatches = businessModelScores.slice(0, 3);
      const fitScore = topMatches[0]?.score || 0;

      // Create analysis data
      const analysisData: BusinessAnalysisData = {
        businessModelScores,
        topMatches,
        fitScore,
        analysis: {
          totalModels: businessModelScores.length,
          topModel: topMatches[0],
          scoreDistribution: this.getScoreDistribution(businessModelScores),
          generatedAt: new Date()
        }
      };

      // Store in database
      await prisma.businessAnalysis.upsert({
        where: { quizAttemptId },
        update: {
          businessModelScores: analysisData.businessModelScores,
          topMatches: analysisData.topMatches,
          fitScore: analysisData.fitScore,
          analysis: analysisData.analysis,
          generatedAt: new Date()
        },
        create: {
          quizAttemptId,
          businessModelScores: analysisData.businessModelScores,
          topMatches: analysisData.topMatches,
          fitScore: analysisData.fitScore,
          analysis: analysisData.analysis
        }
      });

      console.log(`✅ Business analysis stored for quiz attempt ${quizAttemptId}`);
    } catch (error) {
      console.error('❌ Failed to store business analysis:', error);
      throw error;
    }
  }

  /**
   * Store email content
   */
  async storeEmailContent(
    quizAttemptId: number,
    emailData: EmailContentData
  ): Promise<void> {
    try {
      await prisma.emailContent.upsert({
        where: {
          quizAttemptId_emailType: {
            quizAttemptId,
            emailType: emailData.emailType
          }
        },
        update: {
          recipient: emailData.recipient,
          subject: emailData.subject,
          htmlContent: emailData.htmlContent,
          textContent: emailData.textContent,
          emailId: emailData.emailId,
          sentAt: emailData.emailId ? new Date() : null
        },
        create: {
          quizAttemptId,
          emailType: emailData.emailType,
          recipient: emailData.recipient,
          subject: emailData.subject,
          htmlContent: emailData.htmlContent,
          textContent: emailData.textContent,
          emailId: emailData.emailId,
          sentAt: emailData.emailId ? new Date() : null
        }
      });

      console.log(`✅ Email content stored for quiz attempt ${quizAttemptId}, type: ${emailData.emailType}`);
    } catch (error) {
      console.error('❌ Failed to store email content:', error);
      throw error;
    }
  }

  /**
   * Store personalized content
   */
  async storePersonalizedContent(
    quizAttemptId: number,
    contentType: string,
    content: any
  ): Promise<void> {
    try {
      await prisma.personalizedContent.upsert({
        where: {
          quizAttemptId_contentType: {
            quizAttemptId,
            contentType: contentType as any
          }
        },
        update: {
          content,
          generatedAt: new Date()
        },
        create: {
          quizAttemptId,
          contentType: contentType as any,
          content
        }
      });

      console.log(`✅ Personalized content stored for quiz attempt ${quizAttemptId}, type: ${contentType}`);
    } catch (error) {
      console.error('❌ Failed to store personalized content:', error);
      throw error;
    }
  }

  /**
   * Get stored business analysis
   */
  async getBusinessAnalysis(quizAttemptId: number): Promise<BusinessAnalysisData | null> {
    try {
      const analysis = await prisma.businessAnalysis.findUnique({
        where: { quizAttemptId }
      });
      return analysis;
    } catch (error) {
      console.error('❌ Failed to get business analysis:', error);
      return null;
    }
  }

  /**
   * Get stored email content
   */
  async getEmailContent(quizAttemptId: number, emailType: string): Promise<any | null> {
    try {
      const emailContent = await prisma.emailContent.findUnique({
        where: {
          quizAttemptId_emailType: {
            quizAttemptId,
            emailType: emailType as any
          }
        }
      });
      return emailContent;
    } catch (error) {
      console.error('❌ Failed to get email content:', error);
      return null;
    }
  }

  /**
   * Get stored personalized content
   */
  async getPersonalizedContent(quizAttemptId: number, contentType: string): Promise<any | null> {
    try {
      const content = await prisma.personalizedContent.findUnique({
        where: {
          quizAttemptId_contentType: {
            quizAttemptId,
            contentType: contentType as any
          }
        }
      });
      return content;
    } catch (error) {
      console.error('❌ Failed to get personalized content:', error);
      return null;
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
   * Get score distribution for analysis
   */
  private getScoreDistribution(scores: any[]): any {
    const distribution = {
      excellent: 0, // 90-100
      good: 0,      // 80-89
      fair: 0,      // 70-79
      poor: 0       // 0-69
    };

    scores.forEach(score => {
      if (score.score >= 90) distribution.excellent++;
      else if (score.score >= 80) distribution.good++;
      else if (score.score >= 70) distribution.fair++;
      else distribution.poor++;
    });

    return distribution;
  }

  /**
   * Store complete quiz results (all content at once)
   */
  async storeCompleteQuizResults(
    quizAttemptId: number,
    quizData: any,
    emailData: EmailContentData,
    personalizedData: PersonalizedContentData[]
  ): Promise<void> {
    try {
      // Store business analysis
      await this.storeBusinessAnalysis(quizAttemptId, quizData);

      // Store email content
      await this.storeEmailContent(quizAttemptId, emailData);

      // Store personalized content
      for (const data of personalizedData) {
        await this.storePersonalizedContent(quizAttemptId, data.contentType, data.content);
      }

      console.log(`✅ Complete quiz results stored for attempt ${quizAttemptId}`);
    } catch (error) {
      console.error('❌ Failed to store complete quiz results:', error);
      throw error;
    }
  }
}

export default ContentStorageService;
