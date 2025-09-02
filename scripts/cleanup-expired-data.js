#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupExpiredData() {
  try {
    console.log('🧹 CLEANING UP EXPIRED DATA...\n');
    console.log('=' .repeat(50));

    const now = new Date();
    let totalCleaned = 0;

    // 1. Clean up expired anonymous quiz attempts (24 hours)
    console.log('\n1. 🕐 Cleaning up expired anonymous quiz attempts (24 hours)...');
    const expiredAnonymousAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: null,
        expiresAt: {
          lt: now
        }
      }
    });

    if (expiredAnonymousAttempts.length > 0) {
      console.log(`Found ${expiredAnonymousAttempts.length} expired anonymous quiz attempts`);
      
      // Delete related records first (due to foreign key constraints)
      for (const attempt of expiredAnonymousAttempts) {
        await prisma.reportAccess.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
        
        await prisma.businessModelScores.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
        
        await prisma.aiContent.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
        
        await prisma.reportView.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
        
        await prisma.payment.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
      }
      
      await prisma.quizAttempt.deleteMany({
        where: {
          id: {
            in: expiredAnonymousAttempts.map(a => a.id)
          }
        }
      });
      
      console.log(`✅ Cleaned up ${expiredAnonymousAttempts.length} expired anonymous quiz attempts`);
      totalCleaned += expiredAnonymousAttempts.length;
    } else {
      console.log('✅ No expired anonymous quiz attempts found');
    }

    // 2. Clean up expired temporary users (3 months)
    console.log('\n2. 🕐 Cleaning up expired temporary users (3 months)...');
    const expiredTemporaryUsers = await prisma.user.findMany({
      where: {
        isTemporary: true,
        expiresAt: {
          lt: now
        }
      }
    });

    if (expiredTemporaryUsers.length > 0) {
      console.log(`Found ${expiredTemporaryUsers.length} expired temporary users`);
      
      // Delete related records first
      for (const user of expiredTemporaryUsers) {
        const userQuizAttempts = await prisma.quizAttempt.findMany({
          where: { userId: user.id }
        });
        
        for (const attempt of userQuizAttempts) {
          await prisma.reportAccess.deleteMany({
            where: { quizAttemptId: attempt.id }
          });
          
          await prisma.businessModelScores.deleteMany({
            where: { quizAttemptId: attempt.id }
          });
          
          await prisma.aiContent.deleteMany({
            where: { quizAttemptId: attempt.id }
          });
          
          await prisma.reportView.deleteMany({
            where: { quizAttemptId: attempt.id }
          });
          
          await prisma.payment.deleteMany({
            where: { quizAttemptId: attempt.id }
          });
        }
        
        await prisma.quizAttempt.deleteMany({
          where: { userId: user.id }
        });
        
        await prisma.payment.deleteMany({
          where: { userId: user.id }
        });
        
        await prisma.reportView.deleteMany({
          where: { userId: user.id }
        });
      }
      
      await prisma.user.deleteMany({
        where: {
          id: {
            in: expiredTemporaryUsers.map(u => u.id)
          }
        }
      });
      
      console.log(`✅ Cleaned up ${expiredTemporaryUsers.length} expired temporary users`);
      totalCleaned += expiredTemporaryUsers.length;
    } else {
      console.log('✅ No expired temporary users found');
    }

    // 3. Clean up expired report access
    console.log('\n3. 🔓 Cleaning up expired report access...');
    const expiredReportAccess = await prisma.reportAccess.findMany({
      where: {
        expiresAt: {
          lt: now
        },
        isUnlocked: true
      }
    });

    if (expiredReportAccess.length > 0) {
      console.log(`Found ${expiredReportAccess.length} expired report access records`);
      
      await prisma.reportAccess.updateMany({
        where: {
          expiresAt: {
            lt: now
          },
          isUnlocked: true
        },
        data: {
          isUnlocked: false,
          unlockedAt: null
        }
      });
      
      console.log(`✅ Updated ${expiredReportAccess.length} expired report access records`);
    } else {
      console.log('✅ No expired report access records found');
    }

    // 4. Clean up expired password reset tokens
    console.log('\n4. 🔑 Cleaning up expired password reset tokens...');
    const expiredPasswordTokens = await prisma.passwordResetToken.findMany({
      where: {
        expiresAt: {
          lt: now
        }
      }
    });

    if (expiredPasswordTokens.length > 0) {
      console.log(`Found ${expiredPasswordTokens.length} expired password reset tokens`);
      
      await prisma.passwordResetToken.deleteMany({
        where: {
          expiresAt: {
            lt: now
          }
        }
      });
      
      console.log(`✅ Cleaned up ${expiredPasswordTokens.length} expired password reset tokens`);
      totalCleaned += expiredPasswordTokens.length;
    } else {
      console.log('✅ No expired password reset tokens found');
    }

    // 5. Clean up expired sessions
    console.log('\n5. 🪑 Cleaning up expired sessions...');
    const expiredSessions = await prisma.sessions.findMany({
      where: {
        expire: {
          lt: now
        }
      }
    });

    if (expiredSessions.length > 0) {
      console.log(`Found ${expiredSessions.length} expired sessions`);
      
      await prisma.sessions.deleteMany({
        where: {
          expire: {
            lt: now
          }
        }
      });
      
      console.log(`✅ Cleaned up ${expiredSessions.length} expired sessions`);
      totalCleaned += expiredSessions.length;
    } else {
      console.log('✅ No expired sessions found');
    }

    // 6. Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 CLEANUP SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total records cleaned: ${totalCleaned}`);
    
    if (totalCleaned === 0) {
      console.log('🎉 No expired data found - database is clean!');
    } else {
      console.log('🧹 Cleanup completed successfully');
    }

    // 7. Verify cleanup
    console.log('\n7. 🔍 Verifying cleanup...');
    const remainingExpiredData = await prisma.quizAttempt.count({
      where: {
        expiresAt: {
          lt: now
        }
      }
    });

    if (remainingExpiredData === 0) {
      console.log('✅ All expired data has been cleaned up');
    } else {
      console.log(`⚠️  ${remainingExpiredData} expired records still exist`);
    }

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanupExpiredData();
