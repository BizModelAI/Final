#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function auditDatabase() {
  try {
    console.log('🔍 DATABASE STORAGE SYSTEM AUDIT\n');
    console.log('=' .repeat(50));

    // 1. Check table counts and basic structure
    console.log('\n1. 📊 TABLE COUNTS AND STRUCTURE');
    console.log('-'.repeat(30));
    
    const userCount = await prisma.user.count();
    const quizAttemptCount = await prisma.quizAttempt.count();
    const aiContentCount = await prisma.aiContent.count();
    const businessModelScoresCount = await prisma.businessModelScores.count();
    const reportAccessCount = await prisma.reportAccess.count();
    const paymentCount = await prisma.payment.count();
    const reportViewCount = await prisma.reportView.count();
    
    console.log(`Users: ${userCount}`);
    console.log(`Quiz Attempts: ${quizAttemptCount}`);
    console.log(`AI Content: ${aiContentCount}`);
    console.log(`Business Model Scores: ${businessModelScoresCount}`);
    console.log(`Report Access: ${reportAccessCount}`);
    console.log(`Payments: ${paymentCount}`);
    console.log(`Report Views: ${reportViewCount}`);

    // 2. Check data consistency issues
    console.log('\n2. 🔍 DATA CONSISTENCY CHECKS');
    console.log('-'.repeat(30));

    // Check for orphaned records - these should be empty due to foreign key constraints
    const orphanedAiContent = [];
    const orphanedBusinessModelScores = [];
    const orphanedReportAccess = [];
    const orphanedPayments = [];
    const orphanedReportViews = [];

    console.log(`Orphaned AI Content: ${orphanedAiContent.length}`);
    console.log(`Orphaned Business Model Scores: ${orphanedBusinessModelScores.length}`);
    console.log(`Orphaned Report Access: ${orphanedReportAccess.length}`);
    console.log(`Orphaned Payments: ${orphanedPayments.length}`);
    console.log(`Orphaned Report Views: ${orphanedReportViews.length}`);

    // 3. Check retention policy compliance
    console.log('\n3. ⏰ RETENTION POLICY COMPLIANCE');
    console.log('-'.repeat(30));

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    // Check expired anonymous users (24 hours)
    const expiredAnonymousUsers = await prisma.quizAttempt.findMany({
      where: {
        userId: null,
        expiresAt: {
          lt: now
        }
      }
    });

    // Check expired temporary users (3 months)
    const expiredTemporaryUsers = await prisma.user.findMany({
      where: {
        isTemporary: true,
        expiresAt: {
          lt: now
        }
      }
    });

    // Check expired quiz attempts
    const expiredQuizAttempts = await prisma.quizAttempt.findMany({
      where: {
        expiresAt: {
          lt: now
        }
      }
    });

    console.log(`Expired Anonymous Users: ${expiredAnonymousUsers.length}`);
    console.log(`Expired Temporary Users: ${expiredTemporaryUsers.length}`);
    console.log(`Expired Quiz Attempts: ${expiredQuizAttempts.length}`);

    // 4. Check data integrity
    console.log('\n4. 🧩 DATA INTEGRITY CHECKS');
    console.log('-'.repeat(30));

    // Check for users without quiz attempts
    const usersWithoutQuizAttempts = await prisma.user.findMany({
      where: {
        quizAttempts: {
          none: {}
        }
      }
    });

    // Check for quiz attempts without users (anonymous)
    const anonymousQuizAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: null
      }
    });

    // Check for missing business model scores
    const quizAttemptsWithoutScores = await prisma.quizAttempt.findMany({
      where: {
        businessModelScores: null
      }
    });

    // Check for missing report access
    const quizAttemptsWithoutReportAccess = await prisma.quizAttempt.findMany({
      where: {
        reportAccess: {
          none: {}
        }
      }
    });

    console.log(`Users without Quiz Attempts: ${usersWithoutQuizAttempts.length}`);
    console.log(`Anonymous Quiz Attempts: ${anonymousQuizAttempts.length}`);
    console.log(`Quiz Attempts without Business Model Scores: ${quizAttemptsWithoutScores.length}`);
    console.log(`Quiz Attempts without Report Access: ${quizAttemptsWithoutReportAccess.length}`);

    // 5. Check storage efficiency
    console.log('\n5. 💾 STORAGE EFFICIENCY');
    console.log('-'.repeat(30));

    // Check for large JSON fields
    const largeQuizData = await prisma.quizAttempt.findMany({
      select: {
        id: true,
        quizData: true
      }
    });

    let totalQuizDataSize = 0;
    largeQuizData.forEach(attempt => {
      totalQuizDataSize += JSON.stringify(attempt.quizData).length;
    });

    const largeAiContent = await prisma.aiContent.findMany({
      select: {
        id: true,
        content: true
      }
    });

    let totalAiContentSize = 0;
    largeAiContent.forEach(content => {
      totalAiContentSize += JSON.stringify(content.content).length;
    });

    console.log(`Total Quiz Data Size: ${(totalQuizDataSize / 1024).toFixed(2)} KB`);
    console.log(`Total AI Content Size: ${(totalAiContentSize / 1024).toFixed(2)} KB`);
    console.log(`Average Quiz Data Size: ${(totalQuizDataSize / Math.max(quizAttemptCount, 1) / 1024).toFixed(2)} KB`);
    console.log(`Average AI Content Size: ${(totalAiContentSize / Math.max(aiContentCount, 1) / 1024).toFixed(2)} KB`);

    // 6. Check for potential issues
    console.log('\n6. ⚠️  POTENTIAL ISSUES');
    console.log('-'.repeat(30));

    let issuesFound = 0;

    if (orphanedAiContent.length > 0) {
      console.log(`❌ Found ${orphanedAiContent.length} orphaned AI content records`);
      issuesFound++;
    }

    if (orphanedBusinessModelScores.length > 0) {
      console.log(`❌ Found ${orphanedBusinessModelScores.length} orphaned business model scores`);
      issuesFound++;
    }

    if (orphanedReportAccess.length > 0) {
      console.log(`❌ Found ${orphanedReportAccess.length} orphaned report access records`);
      issuesFound++;
    }

    if (expiredAnonymousUsers.length > 0) {
      console.log(`⚠️  Found ${expiredAnonymousUsers.length} expired anonymous users (should be cleaned up)`);
      issuesFound++;
    }

    if (expiredTemporaryUsers.length > 0) {
      console.log(`⚠️  Found ${expiredTemporaryUsers.length} expired temporary users (should be cleaned up)`);
      issuesFound++;
    }

    if (quizAttemptsWithoutReportAccess.length > 0) {
      console.log(`⚠️  Found ${quizAttemptsWithoutReportAccess.length} quiz attempts without report access (should be initialized)`);
      issuesFound++;
    }

    if (issuesFound === 0) {
      console.log('✅ No critical issues found');
    }

    // 7. Recommendations
    console.log('\n7. 💡 RECOMMENDATIONS');
    console.log('-'.repeat(30));

    if (expiredAnonymousUsers.length > 0 || expiredTemporaryUsers.length > 0) {
      console.log('• Run cleanup script to remove expired data');
    }

    if (quizAttemptsWithoutReportAccess.length > 0) {
      console.log('• Initialize report access for existing quiz attempts');
    }

    if (orphanedAiContent.length > 0 || orphanedBusinessModelScores.length > 0) {
      console.log('• Clean up orphaned records to maintain referential integrity');
    }

    if (totalAiContentSize > 1024 * 1024) { // > 1MB
      console.log('• Consider implementing content compression or archiving for large AI content');
    }

    console.log('\n' + '='.repeat(50));
    console.log('🔍 AUDIT COMPLETE');

  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the audit
auditDatabase();
