import { QuizData } from './types';

// Define the 12 personality metrics
export interface PersonalityScores {
  socialComfort: number;
  discipline: number;
  riskTolerance: number;
  techComfort: number;
  structurePreference: number;
  motivation: number;
  feedbackResilience: number;
  creativity: number;
  confidence: number;
  adaptability: number;
  focusPreference: number;
  resilience: number;
}

// Raw score tracking for calculations
interface RawScores {
  socialComfort: number;
  discipline: number;
  riskTolerance: number;
  techComfort: number;
  structurePreference: number;
  motivation: number;
  feedbackResilience: number;
  creativity: number;
  confidence: number;
  adaptability: number;
  focusPreference: number;
  resilience: number;
}

// Type guard to check if a key is valid for RawScores
function isValidRawScoreKey(key: string): key is keyof RawScores {
  return key in {
    socialComfort: true,
    discipline: true,
    riskTolerance: true,
    techComfort: true,
    structurePreference: true,
    motivation: true,
    feedbackResilience: true,
    creativity: true,
    confidence: true,
    adaptability: true,
    focusPreference: true,
    resilience: true
  };
}

// Helper function to safely add scores
function addToRawScores(rawScores: RawScores, scores: Record<string, number>): void {
  Object.entries(scores).forEach(([key, value]) => {
    if (isValidRawScoreKey(key) && typeof value === 'number') {
      rawScores[key] += value;
    }
  });
}

// Min/Max values for normalization (based on algorithm analysis)
const MIN_MAX_SCORES = {
  socialComfort: { min: -15, max: 25 },
  discipline: { min: -12, max: 28 },
  riskTolerance: { min: -18, max: 22 },
  techComfort: { min: -8, max: 32 },
  structurePreference: { min: -20, max: 20 },
  motivation: { min: -10, max: 30 },
  feedbackResilience: { min: -15, max: 25 },
  creativity: { min: -12, max: 28 },
  confidence: { min: -18, max: 22 },
  adaptability: { min: -10, max: 30 },
  focusPreference: { min: -15, max: 25 },
  resilience: { min: -12, max: 28 }
};

export function calculatePersonalityScores(data: QuizData): PersonalityScores {
  // Validate required fields exist
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid quiz data provided');
  }

  const rawScores: RawScores = {
    socialComfort: 0,
    discipline: 0,
    riskTolerance: 0,
    techComfort: 0,
    structurePreference: 0,
    motivation: 0,
    feedbackResilience: 0,
    creativity: 0,
    confidence: 0,
    adaptability: 0,
    focusPreference: 0,
    resilience: 0
  };

  // Q1: Main motivation
  const motivationScores = {
    'financial-freedom': { socialComfort: 1, discipline: 2, riskTolerance: 2, motivation: 3, confidence: 2, adaptability: 2, focusPreference: 3, resilience: 2 },
    'flexibility-autonomy': { socialComfort: -1, discipline: 1, riskTolerance: 1, motivation: 2, structurePreference: -2, adaptability: 3, focusPreference: 1, resilience: 1 },
    'purpose-impact': { socialComfort: 2, motivation: 3, creativity: 3, confidence: 1, adaptability: 2, focusPreference: 2, resilience: 3 },
    'creativity-passion': { creativity: 4, motivation: 2, structurePreference: -1, confidence: 1, adaptability: 3, focusPreference: 1, resilience: 2 }
  };
  const motivationScore = motivationScores[data.mainMotivation as keyof typeof motivationScores] || {};
  addToRawScores(rawScores, motivationScore);

  // Q2: First income timeline
  const timelineScores = {
    'under-1-month': { motivation: 4, riskTolerance: 3, confidence: 2, discipline: -1, adaptability: 4, focusPreference: 4, resilience: 3 },
    '1-3-months': { motivation: 3, riskTolerance: 2, confidence: 1, discipline: 1, adaptability: 3, focusPreference: 3, resilience: 2 },
    '3-6-months': { motivation: 2, riskTolerance: 1, confidence: 1, discipline: 2, adaptability: 2, focusPreference: 2, resilience: 3 },
    'no-rush': { motivation: 1, riskTolerance: -1, confidence: -1, discipline: 3, adaptability: 1, focusPreference: 1, resilience: 4 }
  };
  const timelineScore = timelineScores[data.firstIncomeTimeline as keyof typeof timelineScores] || {};
  addToRawScores(rawScores, timelineScore);

  // Q3: Success income goal
  const incomeScores = {
    500: { confidence: -2, motivation: 1, riskTolerance: -1, adaptability: 1, focusPreference: 2, resilience: 1 },
    2000: { confidence: 1, motivation: 2, riskTolerance: 1, adaptability: 2, focusPreference: 2, resilience: 2 },
    5000: { confidence: 2, motivation: 3, riskTolerance: 2, adaptability: 3, focusPreference: 3, resilience: 3 },
    10000: { confidence: 3, motivation: 4, riskTolerance: 3, adaptability: 4, focusPreference: 4, resilience: 4 }
  };
  const incomeLevel = data.successIncomeGoal >= 10000 ? 10000 : 
                     data.successIncomeGoal >= 5000 ? 5000 : 
                     data.successIncomeGoal >= 2000 ? 2000 : 500;
  const incomeScore = incomeScores[incomeLevel as keyof typeof incomeScores] || {};
  addToRawScores(rawScores, incomeScore);

  // Q4: Upfront investment
  const investmentScores = {
    0: { riskTolerance: -3, confidence: -2, motivation: -1 },
    250: { riskTolerance: -1, confidence: -1, motivation: 1 },
    1000: { riskTolerance: 1, confidence: 1, motivation: 2 },
    2000: { riskTolerance: 3, confidence: 2, motivation: 3 }
  };
  const investmentLevel = data.upfrontInvestment >= 2000 ? 2000 : 
                         data.upfrontInvestment >= 1000 ? 1000 : 
                         data.upfrontInvestment >= 250 ? 250 : 0;
  const investmentScore = investmentScores[investmentLevel as keyof typeof investmentScores] || {};
  addToRawScores(rawScores, investmentScore);

  // Q5: Passion identity alignment (1-5 scale)
  if (typeof data.passionIdentityAlignment === 'number' && data.passionIdentityAlignment >= 1 && data.passionIdentityAlignment <= 5) {
    const passionMultiplier = {
      creativity: data.passionIdentityAlignment - 3,
      motivation: Math.floor((data.passionIdentityAlignment - 3) * 1.5),
      structurePreference: -(data.passionIdentityAlignment - 3),
      adaptability: data.passionIdentityAlignment - 3,
      focusPreference: data.passionIdentityAlignment - 3
    };
    addToRawScores(rawScores, passionMultiplier);
  }

  // Q6: Business exit plan
  const exitScores = {
    'yes': { motivation: 2, riskTolerance: 2, confidence: 1, structurePreference: 1 },
    'no': { motivation: 1, riskTolerance: -1, confidence: -1, structurePreference: -1 },
    'not-sure': { motivation: 1, riskTolerance: 0, confidence: 0, structurePreference: 0 }
  };
  const exitScore = exitScores[data.businessExitPlan as keyof typeof exitScores] || {};
  addToRawScores(rawScores, exitScore);

  // Q7: Business growth size
  const growthScores = {
    'side-income': { confidence: -1, motivation: 1, riskTolerance: -1, discipline: 1 },
    'full-time-income': { confidence: 1, motivation: 2, riskTolerance: 1, discipline: 2 },
    'multi-6-figure': { confidence: 2, motivation: 3, riskTolerance: 2, discipline: 3 },
    'widely-recognized': { confidence: 3, motivation: 4, riskTolerance: 3, discipline: 4, socialComfort: 2 }
  };
  const growthScore = growthScores[data.businessGrowthSize as keyof typeof growthScores] || {};
  addToRawScores(rawScores, growthScore);

  // Q8: Passive income importance (1-5 scale)
  if (typeof data.passiveIncomeImportance === 'number' && data.passiveIncomeImportance >= 1 && data.passiveIncomeImportance <= 5) {
    const passiveMultiplier = {
      motivation: data.passiveIncomeImportance - 3,
      discipline: Math.floor((data.passiveIncomeImportance - 3) * 1.5),
      structurePreference: data.passiveIncomeImportance - 3
    };
    addToRawScores(rawScores, passiveMultiplier);
  }

  // Q9: Weekly time commitment
  const timeScores = {
    5: { discipline: -2, motivation: -1, confidence: -1 },
    10: { discipline: 1, motivation: 1, confidence: 0 },
    25: { discipline: 2, motivation: 2, confidence: 1 },
    40: { discipline: 3, motivation: 3, confidence: 2 }
  };
  const timeLevel = data.weeklyTimeCommitment >= 25 ? 40 : 
                   data.weeklyTimeCommitment >= 10 ? 25 : 
                   data.weeklyTimeCommitment >= 5 ? 10 : 5;
  const timeScore = timeScores[timeLevel as keyof typeof timeScores] || {};
  addToRawScores(rawScores, timeScore);

  // Q10: Long-term consistency (1-5 scale)
  if (typeof data.longTermConsistency === 'number' && data.longTermConsistency >= 1 && data.longTermConsistency <= 5) {
    const consistencyMultiplier = {
      discipline: (data.longTermConsistency - 3) * 2,
      motivation: data.longTermConsistency - 3,
      feedbackResilience: data.longTermConsistency - 3,
      confidence: Math.floor((data.longTermConsistency - 3) * 1.5),
      adaptability: data.longTermConsistency - 3,
      focusPreference: data.longTermConsistency - 3,
      resilience: data.longTermConsistency
    };
    addToRawScores(rawScores, consistencyMultiplier);
  }

  // Q11: Trial and error comfort (1-5 scale)
  if (typeof data.trialErrorComfort === 'number' && data.trialErrorComfort >= 1 && data.trialErrorComfort <= 5) {
    const trialErrorMultiplier = {
      riskTolerance: (data.trialErrorComfort - 3) * 2,
      structurePreference: -(data.trialErrorComfort - 3) * 2,
      creativity: data.trialErrorComfort - 3,
      feedbackResilience: data.trialErrorComfort - 3,
      adaptability: data.trialErrorComfort,
      focusPreference: data.trialErrorComfort - 3,
      resilience: (data.trialErrorComfort - 1) * 0.8
    };
    addToRawScores(rawScores, trialErrorMultiplier);
  }

  // Q12: Learning preference
  const learningScores = {
    'hands-on': { creativity: 2, structurePreference: -1, riskTolerance: 1, techComfort: 1 },
    'tutorials': { creativity: 0, structurePreference: 1, riskTolerance: 0, techComfort: 2 },
    'reading': { creativity: 1, structurePreference: 2, riskTolerance: -1, techComfort: 0 },
    'coaching': { creativity: 0, structurePreference: 1, riskTolerance: -1, socialComfort: 1 }
  };
  const learningScore = learningScores[data.learningPreference as keyof typeof learningScores] || {};
  addToRawScores(rawScores, learningScore);

  // Q13: Systems/routines enjoyment (1-5 scale)
  if (typeof data.systemsRoutinesEnjoyment === 'number' && data.systemsRoutinesEnjoyment >= 1 && data.systemsRoutinesEnjoyment <= 5) {
    const systemsMultiplier = {
      discipline: (data.systemsRoutinesEnjoyment - 3) * 2,
      structurePreference: (data.systemsRoutinesEnjoyment - 3) * 2,
      creativity: -(data.systemsRoutinesEnjoyment - 3),
      techComfort: data.systemsRoutinesEnjoyment - 3
    };
    addToRawScores(rawScores, systemsMultiplier);
  }

  // Q14: Discouragement resilience (1-5 scale)
  if (typeof data.discouragementResilience === 'number' && data.discouragementResilience >= 1 && data.discouragementResilience <= 5) {
    const resilienceMultiplier = {
      feedbackResilience: (data.discouragementResilience - 3) * 2,
      motivation: data.discouragementResilience - 3,
      confidence: data.discouragementResilience - 3,
      discipline: Math.floor((data.discouragementResilience - 3) * 1.5),
      adaptability: data.discouragementResilience - 3,
      focusPreference: data.discouragementResilience - 3,
      resilience: data.discouragementResilience
    };
    addToRawScores(rawScores, resilienceMultiplier);
  }

  // Q15: Tool learning willingness
  const toolWillingnessScores = {
    'yes': { techComfort: 3, structurePreference: 1, motivation: 1, confidence: 1 },
    'no': { techComfort: -3, structurePreference: -1, motivation: -1, confidence: -1 }
  };
  const toolScore = toolWillingnessScores[data.toolLearningWillingness as keyof typeof toolWillingnessScores] || {};
  addToRawScores(rawScores, toolScore);

  // Q16: Organization level (1-5 scale)
  if (typeof data.organizationLevel === 'number' && data.organizationLevel >= 1 && data.organizationLevel <= 5) {
    const organizationMultiplier = {
      discipline: (data.organizationLevel - 3) * 2,
      structurePreference: (data.organizationLevel - 3) * 2,
      confidence: data.organizationLevel - 3,
      techComfort: Math.floor((data.organizationLevel - 3) * 1.5)
    };
    addToRawScores(rawScores, organizationMultiplier);
  }

  // Q17: Self-motivation level (1-5 scale)
  if (typeof data.selfMotivationLevel === 'number' && data.selfMotivationLevel >= 1 && data.selfMotivationLevel <= 5) {
    const selfMotivationMultiplier = {
      motivation: (data.selfMotivationLevel - 3) * 2,
      discipline: (data.selfMotivationLevel - 3) * 2,
      confidence: data.selfMotivationLevel - 3,
      feedbackResilience: Math.floor((data.selfMotivationLevel - 3) * 1.5)
    };
    addToRawScores(rawScores, selfMotivationMultiplier);
  }

  // Q18: Uncertainty handling (1-5 scale)
  if (typeof data.uncertaintyHandling === 'number' && data.uncertaintyHandling >= 1 && data.uncertaintyHandling <= 5) {
    const uncertaintyMultiplier = {
      riskTolerance: (data.uncertaintyHandling - 3) * 2,
      structurePreference: -(data.uncertaintyHandling - 3) * 2,
      confidence: data.uncertaintyHandling - 3,
      creativity: Math.floor((data.uncertaintyHandling - 3) * 1.5),
      adaptability: data.uncertaintyHandling,
      focusPreference: data.uncertaintyHandling - 3,
      resilience: (data.uncertaintyHandling - 1) * 0.7
    };
    addToRawScores(rawScores, uncertaintyMultiplier);
  }

  // Q19: Repetitive tasks feeling
  const repetitiveScores = {
    'avoid': { discipline: -2, structurePreference: -2, creativity: 2, motivation: -1 },
    'tolerate': { discipline: 1, structurePreference: 0, creativity: 0, motivation: 0 },
    'dont-mind': { discipline: 2, structurePreference: 1, creativity: -1, motivation: 1 },
    'enjoy': { discipline: 3, structurePreference: 2, creativity: -2, motivation: 2 }
  };
  const repetitiveScore = repetitiveScores[data.repetitiveTasksFeeling as keyof typeof repetitiveScores] || {};
  addToRawScores(rawScores, repetitiveScore);

  // Q20: Work collaboration preference
  const collaborationScores = {
    'solo-only': { socialComfort: -3, structurePreference: -1, confidence: -1, creativity: 1 },
    'mostly-solo': { socialComfort: -1, structurePreference: 0, confidence: 0, creativity: 1 },
    'team-oriented': { socialComfort: 3, structurePreference: 1, confidence: 1, creativity: 0 },
    'both': { socialComfort: 1, structurePreference: 0, confidence: 1, creativity: 1 }
  };
  const collaborationScore = collaborationScores[data.workCollaborationPreference as keyof typeof collaborationScores] || {};
  addToRawScores(rawScores, collaborationScore);

  // Q21: Brand face comfort (1-5 scale)
  if (typeof data.brandFaceComfort === 'number' && data.brandFaceComfort >= 1 && data.brandFaceComfort <= 5) {
    const brandFaceMultiplier = {
      socialComfort: (data.brandFaceComfort - 3) * 2,
      confidence: (data.brandFaceComfort - 3) * 2,
      motivation: Math.floor((data.brandFaceComfort - 3) * 1.5),
      creativity: data.brandFaceComfort - 3
    };
    addToRawScores(rawScores, brandFaceMultiplier);
  }

  // Q22: Competitiveness level (1-5 scale)
  if (typeof data.competitivenessLevel === 'number' && data.competitivenessLevel >= 1 && data.competitivenessLevel <= 5) {
    const competitivenessMultiplier = {
      motivation: (data.competitivenessLevel - 3) * 2,
      confidence: (data.competitivenessLevel - 3) * 2,
      riskTolerance: data.competitivenessLevel - 3,
      feedbackResilience: Math.floor((data.competitivenessLevel - 3) * 1.5)
    };
    addToRawScores(rawScores, competitivenessMultiplier);
  }

  // Q23: Creative work enjoyment (1-5 scale)
  if (typeof data.creativeWorkEnjoyment === 'number' && data.creativeWorkEnjoyment >= 1 && data.creativeWorkEnjoyment <= 5) {
    const creativeWorkMultiplier = {
      creativity: (data.creativeWorkEnjoyment - 3) * 2,
      structurePreference: -(data.creativeWorkEnjoyment - 3),
      motivation: data.creativeWorkEnjoyment - 3,
      confidence: Math.floor((data.creativeWorkEnjoyment - 3) * 1.5),
      adaptability: data.creativeWorkEnjoyment - 3,
      focusPreference: data.creativeWorkEnjoyment === 5 ? 1 : data.creativeWorkEnjoyment === 4 ? 2 : data.creativeWorkEnjoyment === 3 ? 3 : data.creativeWorkEnjoyment === 2 ? 4 : 5
    };
    addToRawScores(rawScores, creativeWorkMultiplier);
  }

  // Q24: Direct communication enjoyment (1-5 scale)
  if (typeof data.directCommunicationEnjoyment === 'number' && data.directCommunicationEnjoyment >= 1 && data.directCommunicationEnjoyment <= 5) {
    const communicationMultiplier = {
      socialComfort: (data.directCommunicationEnjoyment - 3) * 2,
      confidence: (data.directCommunicationEnjoyment - 3) * 2,
      feedbackResilience: data.directCommunicationEnjoyment - 3,
      motivation: Math.floor((data.directCommunicationEnjoyment - 3) * 1.5)
    };
    addToRawScores(rawScores, communicationMultiplier);
  }

  // Q25: Work structure preference
  const workStructureScores = {
    'clear-steps': { structurePreference: 3, discipline: 2, creativity: -1, riskTolerance: -1 },
    'some-structure': { structurePreference: 1, discipline: 1, creativity: 0, riskTolerance: 0 },
    'mostly-flexible': { structurePreference: -1, discipline: 0, creativity: 1, riskTolerance: 1 },
    'total-freedom': { structurePreference: -3, discipline: -1, creativity: 2, riskTolerance: 2 }
  };
  const workStructureScore = workStructureScores[data.workStructurePreference as keyof typeof workStructureScores] || {};
  addToRawScores(rawScores, workStructureScore);

  // Q26: Tech skills rating (1-5 scale)
  if (typeof data.techSkillsRating === 'number' && data.techSkillsRating >= 1 && data.techSkillsRating <= 5) {
    const techSkillsMultiplier = {
      techComfort: (data.techSkillsRating - 3) * 3,
      confidence: data.techSkillsRating - 3,
      structurePreference: Math.floor((data.techSkillsRating - 3) * 0.5)
    };
    addToRawScores(rawScores, techSkillsMultiplier);
  }

  // Q27: Workspace availability
  const workspaceScores = {
    'yes': { discipline: 2, structurePreference: 2, confidence: 1, techComfort: 1 },
    'no': { discipline: -2, structurePreference: -2, confidence: -1, techComfort: -1 }
  };
  const workspaceScore = workspaceScores[data.workspaceAvailability as keyof typeof workspaceScores] || {};
  addToRawScores(rawScores, workspaceScore);

  // Q28: Support system strength
  const supportScores = {
    'none': { confidence: -2, feedbackResilience: -2, motivation: -1, socialComfort: -1 },
    'one-two': { confidence: 0, feedbackResilience: 0, motivation: 0, socialComfort: 0 },
    'small-helpful-group': { confidence: 1, feedbackResilience: 1, motivation: 1, socialComfort: 1 },
    'very-strong': { confidence: 2, feedbackResilience: 2, motivation: 2, socialComfort: 2 }
  };
  const supportScore = supportScores[data.supportSystemStrength as keyof typeof supportScores] || {};
  addToRawScores(rawScores, supportScore);

  // Q29: Internet/device reliability (1-5 scale)
  if (typeof data.internetDeviceReliability === 'number' && data.internetDeviceReliability >= 1 && data.internetDeviceReliability <= 5) {
    const reliabilityMultiplier = {
      techComfort: (data.internetDeviceReliability - 3) * 2,
      structurePreference: data.internetDeviceReliability - 3,
      confidence: Math.floor((data.internetDeviceReliability - 3) * 1.5),
      discipline: data.internetDeviceReliability - 3
    };
    addToRawScores(rawScores, reliabilityMultiplier);
  }

  // Q30: Familiar tools
  const toolBonuses = {
    'google-docs-sheets': { techComfort: 2, discipline: 1, adaptability: 1, focusPreference: 1 },
    'canva': { techComfort: 2, creativity: 1, adaptability: 1, focusPreference: 1 },
    'notion': { techComfort: 3, structurePreference: 1, adaptability: 1, focusPreference: 1 },
    'shopify-wix': { techComfort: 3, confidence: 1, adaptability: 1, focusPreference: 1 },
    'zoom-streamyard': { techComfort: 2, socialComfort: 1, adaptability: 1, focusPreference: 1 }
  };
  if (Array.isArray(data.familiarTools)) {
    data.familiarTools.forEach(tool => {
      const toolScore = toolBonuses[tool as keyof typeof toolBonuses] || {};
      addToRawScores(rawScores, toolScore);
    });
  }

  // Q31: Decision making style
  const decisionScores = {
    'quickly-instinctively': { riskTolerance: 2, structurePreference: -2, confidence: 1, creativity: 1 },
    'after-some-research': { riskTolerance: 1, structurePreference: 0, confidence: 1, discipline: 1 },
    'logical-process': { riskTolerance: 0, structurePreference: 2, confidence: 1, discipline: 2 },
    'talking-to-others': { riskTolerance: -1, structurePreference: 0, confidence: 0, socialComfort: 2 }
  };
  const decisionScore = decisionScores[data.decisionMakingStyle as keyof typeof decisionScores] || {};
  addToRawScores(rawScores, decisionScore);

  // Q32: Risk comfort level (1-5 scale)
  if (typeof data.riskComfortLevel === 'number' && data.riskComfortLevel >= 1 && data.riskComfortLevel <= 5) {
    const riskComfortMultiplier = {
      riskTolerance: (data.riskComfortLevel - 3) * 3,
      confidence: (data.riskComfortLevel - 3) * 2,
      motivation: data.riskComfortLevel - 3,
      feedbackResilience: Math.floor((data.riskComfortLevel - 3) * 1.5)
    };
    addToRawScores(rawScores, riskComfortMultiplier);
  }

  // Q33: Feedback rejection response (1-5 scale)
  if (typeof data.feedbackRejectionResponse === 'number' && data.feedbackRejectionResponse >= 1 && data.feedbackRejectionResponse <= 5) {
    const feedbackResponseMultiplier = {
      feedbackResilience: (data.feedbackRejectionResponse - 3) * 3,
      confidence: (data.feedbackRejectionResponse - 3) * 2,
      motivation: data.feedbackRejectionResponse - 3,
      socialComfort: Math.floor((data.feedbackRejectionResponse - 3) * 1.5),
      adaptability: data.feedbackRejectionResponse - 3,
      focusPreference: data.feedbackRejectionResponse - 3,
      resilience: data.feedbackRejectionResponse
    };
    addToRawScores(rawScores, feedbackResponseMultiplier);
  }

  // Q34: Path preference
  const pathScores = {
    'proven-paths': { creativity: -2, riskTolerance: -2, structurePreference: 2, confidence: 1 },
    'mix': { creativity: 0, riskTolerance: 0, structurePreference: 0, confidence: 1 },
    'mostly-original': { creativity: 2, riskTolerance: 2, structurePreference: -1, confidence: 1 },
    'build-something-new': { creativity: 3, riskTolerance: 3, structurePreference: -2, confidence: 2 }
  };
  const pathScore = pathScores[data.pathPreference as keyof typeof pathScores] || {};
  addToRawScores(rawScores, pathScore);

  // Q35: Control importance (1-5 scale)
  if (typeof data.controlImportance === 'number' && data.controlImportance >= 1 && data.controlImportance <= 5) {
    const controlMultiplier = {
      confidence: (data.controlImportance - 3) * 2,
      structurePreference: data.controlImportance - 3,
      riskTolerance: Math.floor((data.controlImportance - 3) * 1.5),
      discipline: data.controlImportance - 3
    };
    addToRawScores(rawScores, controlMultiplier);
  }

  // Additional scoring for remaining questions...
  // Q36: Online presence comfort
  const onlinePresenceScores = {
    'yes': { socialComfort: 2, confidence: 2, techComfort: 1, creativity: 1 },
    'no': { socialComfort: -2, confidence: -2, techComfort: -1, creativity: -1 }
  };
  const onlineScore = onlinePresenceScores[data.onlinePresenceComfort as keyof typeof onlinePresenceScores] || {};
  addToRawScores(rawScores, onlineScore);

  // Q37: Client calls comfort
  const clientCallsScores = {
    'yes': { socialComfort: 3, confidence: 2, feedbackResilience: 1 },
    'no': { socialComfort: -3, confidence: -2, feedbackResilience: -1 }
  };
  const clientCallsScore = clientCallsScores[data.clientCallsComfort as keyof typeof clientCallsScores] || {};
  addToRawScores(rawScores, clientCallsScore);

  // Q38: Physical shipping openness
  const shippingScores = {
    'yes': { discipline: 2, structurePreference: 2, techComfort: 1 },
    'no': { discipline: -1, structurePreference: -1, techComfort: 0 }
  };
  const shippingScore = shippingScores[data.physicalShippingOpenness as keyof typeof shippingScores] || {};
  addToRawScores(rawScores, shippingScore);

  // Q39: Work style preference
  const workStyleScores = {
    'create-once-passive': { creativity: 2, motivation: 2, structurePreference: 1, discipline: 1 },
    'work-with-people': { socialComfort: 3, discipline: 2, feedbackResilience: 1 },
    'mix-both': { creativity: 1, socialComfort: 1, discipline: 1, motivation: 1 }
  };
  const workStyleScore = workStyleScores[data.workStylePreference as keyof typeof workStyleScores] || {};
  addToRawScores(rawScores, workStyleScore);

  // Normalize scores to 1-5 scale
  const finalScores: PersonalityScores = {
    socialComfort: 1,
    discipline: 1,
    riskTolerance: 1,
    techComfort: 1,
    structurePreference: 1,
    motivation: 1,
    feedbackResilience: 1,
    creativity: 1,
    confidence: 1,
    adaptability: 1,
    focusPreference: 1,
    resilience: 1
  };

  // Apply normalization formula for each metric
  Object.keys(finalScores).forEach(key => {
    const metric = key as keyof PersonalityScores;
    const rawScore = rawScores[metric];
    const { min, max } = MIN_MAX_SCORES[metric];
    
    // Normalize to 1-5 scale: 1 + ((raw - min) / (max - min)) * 4
    const normalized = 1 + ((rawScore - min) / (max - min)) * 4;
    
    // Clamp to 1-5 range and round to 1 decimal place
    finalScores[metric] = Math.round(Math.max(1, Math.min(5, normalized)) * 10) / 10;
  });

  return finalScores;
}

// Helper function to get personality descriptions
export function getPersonalityDescription(scores: PersonalityScores) {
  const descriptions = {
    socialComfort: {
      low: "Prefers working independently and behind-the-scenes",
      medium: "Comfortable with moderate social interaction",
      high: "Thrives on social interaction and being visible"
    },
    discipline: {
      low: "Works best with flexibility and variety",
      medium: "Balances structure with adaptability",
      high: "Excels with consistent routines and systems"
    },
    riskTolerance: {
      low: "Prefers proven, safe approaches",
      medium: "Comfortable with calculated risks",
      high: "Embraces uncertainty and bold ventures"
    },
    techComfort: {
      low: "Prefers simple, familiar tools",
      medium: "Comfortable learning new technologies",
      high: "Loves exploring cutting-edge tools"
    },
    structurePreference: {
      low: "Thrives with creative freedom",
      medium: "Appreciates some guidance and flexibility",
      high: "Performs best with clear frameworks"
    },
    motivation: {
      low: "Steady, sustainable approach",
      medium: "Balanced drive and patience",
      high: "High energy and ambitious goals"
    },
    feedbackResilience: {
      low: "Sensitive to criticism, needs encouragement",
      medium: "Handles feedback constructively",
      high: "Uses criticism as fuel for improvement"
    },
    creativity: {
      low: "Prefers systematic, logical approaches",
      medium: "Balances creativity with practicality",
      high: "Thrives on innovation and original ideas"
    },
    confidence: {
      low: "Cautious and thoughtful decision-maker",
      medium: "Balanced confidence and humility",
      high: "Bold and decisive leader"
    },
    adaptability: {
      low: "Prefers stability and routine",
      medium: "Adjusts well to moderate changes",
      high: "Thrives in dynamic, changing environments"
    },
    focusPreference: {
      low: "Prefers creative, varied tasks",
      medium: "Balances focus with creativity",
      high: "Excels at deep, concentrated work"
    },
    resilience: {
      low: "Needs support during setbacks",
      medium: "Recovers steadily from challenges",
      high: "Bounces back quickly from failures"
    }
  };

  const result: Record<string, string> = {};
  Object.entries(scores).forEach(([key, value]) => {
    const metric = key as keyof PersonalityScores;
    const level = value <= 2.5 ? 'low' : value <= 3.5 ? 'medium' : 'high';
    result[key] = descriptions[metric][level];
  });

  return result;
}