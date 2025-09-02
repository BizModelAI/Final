import { PrismaClient } from '@prisma/client';

class Storage {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async testConnection() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: { email: true, isTemporary: true, createdAt: true, expiresAt: true },
    });
  }

  async createUser(data: any) {
    return await this.prisma.user.create({ data });
  }

  async updateUser(id: number, data: any) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async recordQuizAttempt(data: any) {
    return await this.prisma.quizAttempt.create({ data });
  }

  // Centralized quiz attempt creation with report access initialization
  async createQuizAttemptWithAccess(data: {
    userId?: number;
    sessionId?: string;
    quizData: any;
    isPaid?: boolean;
  }) {
    const { userId, sessionId, quizData, isPaid = false } = data;
    
    // Use a transaction to ensure both quiz attempt and report access are created atomically
    return await this.prisma.$transaction(async (tx) => {
      // Create the quiz attempt
      const attempt = await tx.quizAttempt.create({
        data: {
          userId,
          sessionId,
          quizData,
          isPaid,
          completedAt: new Date(),
        },
      });

      // Initialize report access within the same transaction
      const reportTypes = [
        'results-preview',    // Free - basic results
        'full-report',        // Paid - detailed analysis
        'pdf-download',       // Paid - downloadable PDF
        'income-projections'  // Paid - financial forecasts
      ];

      for (const reportType of reportTypes) {
        const isUnlocked = reportType === 'results-preview' || isPaid;
        const unlockedBy = reportType === 'results-preview' ? 'free' : (isPaid ? 'paid' : 'locked');
        
        await tx.reportAccess.create({
          data: {
            quizAttemptId: attempt.id,
            reportType,
            isUnlocked,
            unlockedBy,
            unlockedAt: isUnlocked ? new Date() : null,
            expiresAt: null
          }
        });
      }

      // Calculate and store business model scores within the same transaction
      try {
        const { calculateAllBusinessModelMatches } = await import('../shared/scoring');
        const calculatedScores = calculateAllBusinessModelMatches(quizData);
        
        // Store scores in database
        const scoresToStore = calculatedScores.map(score => ({
          quizAttemptId: attempt.id,
          businessModelId: score.id,
          businessModelName: score.name,
          score: score.score,
          category: score.category,
          fitScore: score.score // For backward compatibility
        }));

        await tx.businessModelScores.createMany({
          data: scoresToStore
        });

        console.log(`Business model scores calculated and stored for quiz attempt ${attempt.id}`);
      } catch (error) {
        console.error(`Error calculating business model scores for quiz attempt ${attempt.id}:`, error);
        // Don't fail the transaction if scoring fails - the quiz attempt is still valid
      }

      console.log(`Quiz attempt ${attempt.id} created with report access and scoring initialized (transaction)`);
      return attempt;
    });
  }

  async getQuizAttemptsCount(userId: number) {
    return await this.prisma.quizAttempt.count({ where: { userId } });
  }

  async getQuizAttempts(userId: number) {
    return await this.prisma.quizAttempt.findMany({ where: { userId }, orderBy: { completedAt: 'desc' } });
  }

  async getQuizAttemptsByUserId(userId: number) {
    return this.getQuizAttempts(userId);
  }

  async getQuizAttempt(id: number) {
    return await this.prisma.quizAttempt.findUnique({ where: { id } });
  }

  async updateQuizAttempt(id: number, data: any) {
    return await this.prisma.quizAttempt.update({ where: { id }, data });
  }

  async saveAIContent(quizAttemptId: number, contentType: string, content: any) {
    return await this.prisma.aiContent.create({
      data: {
        quizAttemptId,
        contentType,
        content,
        generatedAt: new Date(),
        createdAt: new Date(),
      },
    });
  }

  async getAllAIContentForQuizAttempt(quizAttemptId: number): Promise<any[]> {
    return await this.prisma.aiContent.findMany({
      where: { quizAttemptId },
      orderBy: { generatedAt: 'desc' },
    });
  }

  async deleteAIContent(
    quizAttemptId: number,
    contentType: string,
  ): Promise<void> {
    await this.prisma.aiContent.deleteMany({
      where: { quizAttemptId, contentType },
    });
  }

  async saveAIContentToQuizAttempt(quizAttemptId: number, contentType: string, content: any) {
    return await this.saveAIContent(quizAttemptId, contentType, content);
  }

  async getAIContent(quizAttemptId: number, contentType: string) {
    return await this.prisma.aiContent.findFirst({
      where: { quizAttemptId, contentType },
      orderBy: { generatedAt: 'desc' },
    });
  }

  async createPayment(data: any) {
    const created = await this.prisma.payment.create({ data });
    // Always fetch the full payment record by ID to ensure all fields are present
    return await this.prisma.payment.findUnique({ where: { id: created.id } });
  }

  async completePayment(paymentId: number) {
    return await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'completed', completedAt: new Date() },
    });
  }

  async linkPaymentToQuizAttempt(paymentId: number, quizAttemptId: number) {
    return await this.prisma.payment.update({ where: { id: paymentId }, data: { quizAttemptId } });
  }

  async getPaymentsByUser(userId: number) {
    return await this.prisma.payment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async getPaymentsByStripeId(stripePaymentIntentId: string) {
    return await this.prisma.payment.findMany({ where: { stripePaymentIntentId } });
  }

  async getPaymentById(paymentId: number) {
    return await this.prisma.payment.findUnique({ where: { id: paymentId } });
  }

  async getAllPayments(limit = 100) {
    return await this.prisma.payment.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
  }

  async getPaymentsWithUsers(options: any = {}) {
    const { limit = 100, offset = 0, status } = options;
    return await this.prisma.payment.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: { user: true },
    });
  }

  async createRefund(data: any) {
    return await this.prisma.refund.create({ data });
  }

  async updateRefundStatus(refundId: number, status: string, processedAt?: Date, stripeRefundId?: string, paypalRefundId?: string) {
    return await this.prisma.refund.update({
      where: { id: refundId },
      data: { status, processedAt, stripeRefundId, paypalRefundId },
    });
  }

  async getRefundsByPayment(paymentId: number) {
    return await this.prisma.refund.findMany({ where: { paymentId }, orderBy: { createdAt: 'desc' } });
  }

  async getRefundById(refundId: number) {
    return await this.prisma.refund.findUnique({ where: { id: refundId } });
  }

  async getAllRefunds(limit = 100) {
    return await this.prisma.refund.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
  }

  async storeTemporaryUser(sessionId: string, email: string, data: any) {
    // Always attempt to create the user, handle race condition with try/catch
    try {
      return await this.prisma.user.create({
        data: {
          email,
          password: data.password || '',
          isTemporary: true,
          sessionId,
          // quizData is stored in QuizAttempt, not in User
          expiresAt: data.expiresAt || null,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
        },
      });
    } catch (err: any) {
      // Handle unique constraint error (race condition)
      if (err.code === 'P2002') {
        console.info(`[INFO] storeTemporaryUser: User with email ${email} already exists, reusing existing user (non-fatal)`);
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user) return user;
      }
      throw err;
    }
  }

  async getTemporaryUser(sessionId: string) {
    return await this.prisma.user.findFirst({
      where: { sessionId, isTemporary: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTemporaryUserByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email, isTemporary: true }, orderBy: { createdAt: 'desc' } });
  }

  async cleanupExpiredTemporaryUsers() {
    const now = new Date();
    await this.prisma.user.deleteMany({ where: { isTemporary: true, expiresAt: { lt: now } } });
  }

  async convertTemporaryUserToPaid(sessionId: string) {
    return await this.prisma.user.updateMany({
      where: { sessionId, isTemporary: true },
      data: { isPaid: true, isTemporary: false, sessionId: undefined, expiresAt: undefined, updatedAt: new Date() },
    });
  }

  async isPaidUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return !!(user && user.isPaid);
  }

  async createPasswordResetToken(userId: number, token: string, expiresAt: Date) {
    return await this.prisma.passwordResetToken.create({ data: { userId, token, expiresAt } });
  }

  async getPasswordResetToken(token: string) {
    return await this.prisma.passwordResetToken.findUnique({ where: { token } });
  }

  async deletePasswordResetToken(token: string) {
    return await this.prisma.passwordResetToken.delete({ where: { token } });
  }

  async updateUserPassword(userId: number, hashedPassword: string) {
    return await this.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword, updatedAt: new Date() } });
  }
}

export const storage = new Storage();
