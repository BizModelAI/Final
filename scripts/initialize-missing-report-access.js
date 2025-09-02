#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import { ReportAccessService } from '../server/services/reportAccessService.js';

const prisma = new PrismaClient();

async function initializeMissingReportAccess() {
  try {
    console.log('🔧 Initializing Missing Report Access...\n');
    console.log('=' .repeat(50));

    // Find quiz attempts without report access
    const quizAttemptsWithoutReportAccess = await prisma.quizAttempt.findMany({
      where: {
        reportAccess: {
          none: {}
        }
      },
      include: {
        user: true
      }
    });

    console.log(`Found ${quizAttemptsWithoutReportAccess.length} quiz attempts without report access\n`);

    if (quizAttemptsWithoutReportAccess.length === 0) {
      console.log('✅ All quiz attempts already have report access initialized');
      return;
    }

    const reportAccessService = ReportAccessService.getInstance();
    let initializedCount = 0;

    for (const attempt of quizAttemptsWithoutReportAccess) {
      try {
        const isPaid = attempt.isPaid || (attempt.user && attempt.user.isPaid);
        
        console.log(`Initializing report access for quiz attempt ${attempt.id} (user: ${attempt.user?.email || 'anonymous'}, paid: ${isPaid})`);
        
        await reportAccessService.initializeReportAccess(attempt.id, isPaid);
        initializedCount++;
        
        console.log(`✅ Initialized report access for quiz attempt ${attempt.id}\n`);
      } catch (error) {
        console.error(`❌ Failed to initialize report access for quiz attempt ${attempt.id}:`, error.message);
      }
    }

    console.log(`🎉 Successfully initialized report access for ${initializedCount}/${quizAttemptsWithoutReportAccess.length} quiz attempts`);

    // Verify the fix
    const remainingQuizAttemptsWithoutReportAccess = await prisma.quizAttempt.findMany({
      where: {
        reportAccess: {
          none: {}
        }
      }
    });

    if (remainingQuizAttemptsWithoutReportAccess.length === 0) {
      console.log('✅ All quiz attempts now have report access initialized');
    } else {
      console.log(`⚠️  ${remainingQuizAttemptsWithoutReportAccess.length} quiz attempts still missing report access`);
    }

  } catch (error) {
    console.error('❌ Failed to initialize missing report access:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the initialization
initializeMissingReportAccess();
