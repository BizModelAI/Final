#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Clean up expired content based on retention policies
 * - Guest users: 1 day retention
 * - Temporary users: 3 months retention
 * - Paid users: Forever (no cleanup)
 */
async function cleanupExpiredContent() {
  try {
    console.log('🧹 Starting expired content cleanup...');
    const now = new Date();
    
    // Calculate cutoff dates
    const guestCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
    const tempCutoff = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 3 months ago
    
    let totalDeleted = 0;
    
    // Clean up expired guest quiz attempts (no userId, no sessionId)
    const expiredGuestAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: null,
        sessionId: null,
        completedAt: { lt: guestCutoff }
      },
      select: { id: true }
    });
    
    if (expiredGuestAttempts.length > 0) {
      console.log(`🗑️  Deleting ${expiredGuestAttempts.length} expired guest quiz attempts...`);
      
      // Delete related content (cascade will handle this)
      await prisma.quizAttempt.deleteMany({
        where: {
          id: { in: expiredGuestAttempts.map(a => a.id) }
        }
      });
      
      totalDeleted += expiredGuestAttempts.length;
      console.log(`✅ Deleted ${expiredGuestAttempts.length} expired guest attempts`);
    }
    
    // Clean up expired temporary user quiz attempts
    const expiredTempAttempts = await prisma.quizAttempt.findMany({
      where: {
        user: {
          isTemporary: true,
          expiresAt: { lt: now }
        }
      },
      select: { id: true }
    });
    
    if (expiredTempAttempts.length > 0) {
      console.log(`🗑️  Deleting ${expiredTempAttempts.length} expired temporary user quiz attempts...`);
      
      await prisma.quizAttempt.deleteMany({
        where: {
          id: { in: expiredTempAttempts.map(a => a.id) }
        }
      });
      
      totalDeleted += expiredTempAttempts.length;
      console.log(`✅ Deleted ${expiredTempAttempts.length} expired temporary user attempts`);
    }
    
    // Clean up expired temporary users
    const expiredTempUsers = await prisma.user.findMany({
      where: {
        isTemporary: true,
        expiresAt: { lt: now }
      },
      select: { id: true }
    });
    
    if (expiredTempUsers.length > 0) {
      console.log(`🗑️  Deleting ${expiredTempUsers.length} expired temporary users...`);
      
      await prisma.user.deleteMany({
        where: {
          id: { in: expiredTempUsers.map(u => u.id) }
        }
      });
      
      console.log(`✅ Deleted ${expiredTempUsers.length} expired temporary users`);
    }
    
    // Clean up expired sessions
    const expiredSessions = await prisma.sessions.deleteMany({
      where: {
        expire: { lt: now }
      }
    });
    
    if (expiredSessions.count > 0) {
      console.log(`🗑️  Deleted ${expiredSessions.count} expired sessions`);
    }
    
    // Clean up expired password reset tokens
    const expiredTokens = await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: { lt: now }
      }
    });
    
    if (expiredTokens.count > 0) {
      console.log(`🗑️  Deleted ${expiredTokens.count} expired password reset tokens`);
    }
    
    console.log(`✅ Cleanup complete! Total items deleted: ${totalDeleted}`);
    
    // Show current stats
    const stats = await getCurrentStats();
    console.log('\n📊 Current Database Statistics:');
    console.log(`Users: ${stats.users}`);
    console.log(`Quiz Attempts: ${stats.quizAttempts}`);
    console.log(`AI Content: ${stats.aiContent}`);
    console.log(`Business Analysis: ${stats.businessAnalysis}`);
    console.log(`Email Content: ${stats.emailContent}`);
    console.log(`Personalized Content: ${stats.personalizedContent}`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getCurrentStats() {
  const users = await prisma.user.count();
  const quizAttempts = await prisma.quizAttempt.count();
  const aiContent = await prisma.aiContent.count();
  const businessAnalysis = await prisma.businessAnalysis.count();
  const emailContent = await prisma.emailContent.count();
  const personalizedContent = await prisma.personalizedContent.count();
  
  return {
    users,
    quizAttempts,
    aiContent,
    businessAnalysis,
    emailContent,
    personalizedContent
  };
}

// Run cleanup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupExpiredContent();
}

export { cleanupExpiredContent };
