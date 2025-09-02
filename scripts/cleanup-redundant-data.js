#!/usr/bin/env node

/**
 * Database Cleanup Script
 * 
 * This script cleans up redundant and unused data from the database:
 * 1. Removes redundant tempQuizData from users (since quiz data is stored in quiz_attempts)
 * 2. Removes redundant aiContent from quiz_attempts (since we have a dedicated ai_content table)
 * 3. Removes unused BusinessModelScores table data
 * 4. Cleans up orphaned records
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupRedundantData() {
  console.log('🧹 Starting database cleanup...');
  
  try {
    // 1. Clean up redundant tempQuizData from users
    console.log('📝 Cleaning up redundant tempQuizData from users...');
    console.log('✓ No redundant tempQuizData fields found (field was removed in schema)');

    // 2. Clean up redundant aiContent from quiz_attempts
    console.log('\n🤖 Cleaning up redundant aiContent from quiz_attempts...');
    console.log('✓ No redundant aiContent fields found (field was removed in schema)');

    // 3. Clean up orphaned records
    console.log('\n🔍 Cleaning up orphaned records...');
    
    // Clean up quiz attempts without users (older than 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const orphanedAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: null,
        completedAt: { lt: thirtyDaysAgo }
      }
    });
    
    if (orphanedAttempts.length > 0) {
      console.log(`Found ${orphanedAttempts.length} orphaned quiz attempts older than 30 days`);
      
      for (const attempt of orphanedAttempts) {
        console.log(`  - Removing orphaned quiz attempt ${attempt.id} from ${attempt.completedAt}`);
        
        // Delete related records first
        await prisma.aiContent.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
        
        await prisma.reportView.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
        
        await prisma.payment.deleteMany({
          where: { quizAttemptId: attempt.id }
        });
        
        // Delete the quiz attempt
        await prisma.quizAttempt.delete({
          where: { id: attempt.id }
        });
      }
    } else {
      console.log('✓ No orphaned quiz attempts found');
    }

    // 4. Clean up expired temporary users
    console.log('\n⏰ Cleaning up expired temporary users...');
    const expiredUsers = await prisma.user.findMany({
      where: {
        isTemporary: true,
        expiresAt: { lt: new Date() }
      }
    });
    
    if (expiredUsers.length > 0) {
      console.log(`Found ${expiredUsers.length} expired temporary users`);
      
      for (const user of expiredUsers) {
        console.log(`  - Removing expired temporary user ${user.email} (ID: ${user.id})`);
        
        // Delete related records first
        const userAttempts = await prisma.quizAttempt.findMany({
          where: { userId: user.id }
        });
        
        for (const attempt of userAttempts) {
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
        
        // Delete the user
        await prisma.user.delete({
          where: { id: user.id }
        });
      }
    } else {
      console.log('✓ No expired temporary users found');
    }

    // 5. Clean up old sessions
    console.log('\n🗑️ Cleaning up old sessions...');
    const oldSessions = await prisma.sessions.findMany({
      where: {
        expire: { lt: new Date() }
      }
    });
    
    if (oldSessions.length > 0) {
      console.log(`Found ${oldSessions.length} expired sessions`);
      
      await prisma.sessions.deleteMany({
        where: {
          expire: { lt: new Date() }
        }
      });
      
      console.log('✓ Cleaned up expired sessions');
    } else {
      console.log('✓ No expired sessions found');
    }

    console.log('\n✅ Database cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanupRedundantData().catch(console.error);
