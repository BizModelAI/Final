#!/usr/bin/env node

/**
 * Cleanup script for expired business model scores and quiz attempts
 * This ensures the database doesn't accumulate unnecessary data from temporary/guest users
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupExpiredData() {
  try {
    console.log('🧹 Starting cleanup of expired data...');
    
    const now = new Date();
    
    // Find expired quiz attempts (temporary/guest users only)
    const expiredAttempts = await prisma.quizAttempt.findMany({
      where: {
        expiresAt: {
          not: null,
          lt: now
        },
        isPaid: false // Don't delete paid user data
      },
      select: { id: true, userId: true, sessionId: true, expiresAt: true }
    });

    if (expiredAttempts.length === 0) {
      console.log('✅ No expired quiz attempts found');
      return;
    }

    console.log(`📊 Found ${expiredAttempts.length} expired quiz attempts`);

    // Delete associated business model scores first (due to foreign key constraints)
    const expiredAttemptIds = expiredAttempts.map(a => a.id);
    
    const deletedScores = await prisma.businessModelScores.deleteMany({
      where: {
        quizAttemptId: {
          in: expiredAttemptIds
        }
      }
    });

    console.log(`🗑️  Deleted ${deletedScores.count} expired business model scores`);

    // Delete expired quiz attempts
    const deletedAttempts = await prisma.quizAttempt.deleteMany({
      where: {
        id: {
          in: expiredAttemptIds
        }
      }
    });

    console.log(`🗑️  Deleted ${deletedAttempts.count} expired quiz attempts`);

    // Log details for debugging
    expiredAttempts.forEach(attempt => {
      console.log(`  - Attempt ${attempt.id}: User ${attempt.userId || 'Guest'} (${attempt.sessionId}), Expired: ${attempt.expiresAt}`);
    });

    console.log('✅ Cleanup completed successfully');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run cleanup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupExpiredData()
    .then(() => {
      console.log('🎉 Cleanup script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Cleanup script failed:', error);
      process.exit(1);
    });
}

export { cleanupExpiredData };
