#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Set up content retention policies and cleanup
 * - Guest users: 1 day retention
 * - Temporary users: 3 months retention  
 * - Paid users: Forever
 */
async function setupContentRetention() {
  try {
    console.log('🚀 Setting up content retention policies...');

    // Set expiration dates for existing quiz attempts
    const now = new Date();
    
    // Guest users (no userId, no sessionId) - 1 day retention
    const guestAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: null,
        sessionId: null,
        expiresAt: null
      }
    });

    if (guestAttempts.length > 0) {
      const guestExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day
      
      await prisma.quizAttempt.updateMany({
        where: {
          id: { in: guestAttempts.map(a => a.id) }
        },
        data: {
          expiresAt: guestExpiry
        }
      });
      
      console.log(`✅ Set 1-day expiration for ${guestAttempts.length} guest quiz attempts`);
    }

    // Temporary users - 3 months retention
    const tempUsers = await prisma.user.findMany({
      where: {
        isTemporary: true,
        expiresAt: null
      }
    });

    if (tempUsers.length > 0) {
      const tempExpiry = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 3 months
      
      await prisma.user.updateMany({
        where: {
          id: { in: tempUsers.map(u => u.id) }
        },
        data: {
          expiresAt: tempExpiry
        }
      });
      
      console.log(`✅ Set 3-month expiration for ${tempUsers.length} temporary users`);
    }

    // Set expiration for quiz attempts of temporary users
    const tempUserAttempts = await prisma.quizAttempt.findMany({
      where: {
        user: {
          isTemporary: true
        },
        expiresAt: null
      }
    });

    if (tempUserAttempts.length > 0) {
      const tempExpiry = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 3 months
      
      await prisma.quizAttempt.updateMany({
        where: {
          id: { in: tempUserAttempts.map(a => a.id) }
        },
        data: {
          expiresAt: tempExpiry
        }
      });
      
      console.log(`✅ Set 3-month expiration for ${tempUserAttempts.length} temporary user quiz attempts`);
    }

    // Paid users - no expiration (forever)
    const paidUsers = await prisma.user.findMany({
      where: {
        isPaid: true,
        expiresAt: { not: null }
      }
    });

    if (paidUsers.length > 0) {
      await prisma.user.updateMany({
        where: {
          id: { in: paidUsers.map(u => u.id) }
        },
        data: {
          expiresAt: null
        }
      });
      
      console.log(`✅ Removed expiration for ${paidUsers.length} paid users`);
    }

    // Remove expiration for quiz attempts of paid users
    const paidUserAttempts = await prisma.quizAttempt.findMany({
      where: {
        user: {
          isPaid: true
        },
        expiresAt: { not: null }
      }
    });

    if (paidUserAttempts.length > 0) {
      await prisma.quizAttempt.updateMany({
        where: {
          id: { in: paidUserAttempts.map(a => a.id) }
        },
        data: {
          expiresAt: null
        }
      });
      
      console.log(`✅ Removed expiration for ${paidUserAttempts.length} paid user quiz attempts`);
    }

    console.log('✅ Content retention policies setup complete!');
    
    // Show current stats
    const stats = await getRetentionStats();
    console.log('\n📊 Current Retention Statistics:');
    console.log(`Guest attempts: ${stats.guestAttempts} (1 day retention)`);
    console.log(`Temporary user attempts: ${stats.tempAttempts} (3 months retention)`);
    console.log(`Paid user attempts: ${stats.paidAttempts} (forever)`);
    console.log(`Total attempts: ${stats.totalAttempts}`);

  } catch (error) {
    console.error('❌ Error setting up content retention:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getRetentionStats() {
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

  const totalAttempts = await prisma.quizAttempt.count();

  return {
    guestAttempts,
    tempAttempts,
    paidAttempts,
    totalAttempts
  };
}

// Run the setup
setupContentRetention();
