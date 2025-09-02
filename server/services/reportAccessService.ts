import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

export interface ReportAccessData {
  id: number;
  quizAttemptId: number;
  reportType: string;
  isUnlocked: boolean;
  unlockedAt: Date | null;
  unlockedBy: string | null;
  expiresAt: Date | null;
  createdAt: Date;
}

export class ReportAccessService {
  private static instance: ReportAccessService;

  private constructor() {}

  public static getInstance(): ReportAccessService {
    if (!ReportAccessService.instance) {
      ReportAccessService.instance = new ReportAccessService();
    }
    return ReportAccessService.instance;
  }

  /**
   * Initialize report access for a new quiz attempt
   */
  async initializeReportAccess(quizAttemptId: number, isPaid: boolean): Promise<void> {
    const reportTypes = [
      'results-preview',    // Free - basic results
      'full-report',        // Paid - detailed analysis
      'pdf-download',       // Paid - downloadable PDF
      'income-projections'  // Paid - financial forecasts
    ];

    for (const reportType of reportTypes) {
      const isUnlocked = reportType === 'results-preview' || isPaid;
      const unlockedBy = reportType === 'results-preview' ? 'free' : (isPaid ? 'paid' : 'locked');
      
      await prisma.reportAccess.upsert({
        where: {
          quizAttemptId_reportType: {
            quizAttemptId,
            reportType
          }
        },
        update: {
          isUnlocked,
          unlockedBy,
          unlockedAt: isUnlocked ? new Date() : null,
          expiresAt: null
        },
        create: {
          quizAttemptId,
          reportType,
          isUnlocked,
          unlockedBy,
          unlockedAt: isUnlocked ? new Date() : null,
          expiresAt: null
        }
      });
    }
  }

  /**
   * Check if a specific report is unlocked for a quiz attempt
   */
  async isReportUnlocked(quizAttemptId: number, reportType: string): Promise<boolean> {
    const access = await prisma.reportAccess.findUnique({
      where: {
        quizAttemptId_reportType: {
          quizAttemptId,
          reportType
        }
      }
    });

    if (!access) return false;

    // Check if access has expired
    if (access.expiresAt && access.expiresAt < new Date()) {
      return false;
    }

    return access.isUnlocked;
  }

  /**
   * Unlock a specific report (e.g., after payment)
   */
  async unlockReport(quizAttemptId: number, reportType: string, unlockedBy: string, expiresAt?: Date): Promise<void> {
    await prisma.reportAccess.upsert({
      where: {
        quizAttemptId_reportType: {
          quizAttemptId,
          reportType
        }
      },
      update: {
        isUnlocked: true,
        unlockedBy,
        unlockedAt: new Date(),
        expiresAt
      },
      create: {
        quizAttemptId,
        reportType,
        isUnlocked: true,
        unlockedBy,
        unlockedAt: new Date(),
        expiresAt
      }
    });
  }

  /**
   * Get all report access for a quiz attempt
   */
  async getReportAccess(quizAttemptId: number): Promise<ReportAccessData[]> {
    return await prisma.reportAccess.findMany({
      where: { quizAttemptId },
      orderBy: { reportType: 'asc' }
    });
  }

  /**
   * Update user's paid status and unlock all reports
   */
  async updateUserPaidStatus(quizAttemptId: number, isPaid: boolean): Promise<void> {
    // Update the quiz attempt
    await prisma.quizAttempt.update({
      where: { id: quizAttemptId },
      data: { isPaid }
    });

    // Unlock all reports if paid
    if (isPaid) {
      const reportTypes = ['full-report', 'pdf-download', 'income-projections'];
      for (const reportType of reportTypes) {
        await this.unlockReport(quizAttemptId, reportType, 'paid');
      }
    }
  }

  /**
   * Clean up expired temporary unlocks
   */
  async cleanupExpiredUnlocks(): Promise<void> {
    await prisma.reportAccess.updateMany({
      where: {
        expiresAt: {
          lt: new Date()
        },
        isUnlocked: true
      },
      data: {
        isUnlocked: false,
        unlockedAt: null
      }
    });
  }

  /**
   * Get unlock statistics
   */
  async getUnlockStats(): Promise<any> {
    const stats = await prisma.reportAccess.groupBy({
      by: ['reportType', 'isUnlocked'],
      _count: {
        id: true
      }
    });

    return stats.reduce((acc: Record<string, { locked: number; unlocked: number }>, stat) => {
      if (!acc[stat.reportType]) {
        acc[stat.reportType] = { locked: 0, unlocked: 0 };
      }
      if (stat.isUnlocked) {
        acc[stat.reportType].unlocked = stat._count.id;
      } else {
        acc[stat.reportType].locked = stat._count.id;
      }
      return acc;
    }, {});
  }
}
