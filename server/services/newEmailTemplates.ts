import { businessPaths } from '../../shared/businessPaths';
import { centralizedScoringService } from './centralizedScoringService.js';

// Import client business models for consistency
import { businessModels as clientBusinessModels } from '../../client/src/data/businessModels';

// Get business model data - always use client business models for consistency
const getClientBusinessModels = () => {
  return clientBusinessModels.map(model => ({
    id: model.id,
    title: model.title,
    name: model.title, // alias for compatibility
    emoji: model.emoji,
    description: model.description,
    detailedDescription: model.detailedDescription
  }));
};

// New email templates based on React components
export async function generatePreviewEmailHTML(quizData: any, quizAttemptId?: number, preCalculatedScores?: any[]): Promise<string> {
  
  // Use pre-calculated scores if provided, otherwise calculate fresh scores for new quiz attempt
  let calculatedMatches = preCalculatedScores;
  if (!calculatedMatches || calculatedMatches.length === 0) {
    // For new quiz attempts (like emails), always calculate fresh scores from quiz data
    const { calculateAllBusinessModelMatches } = await import('../../shared/scoring');
    calculatedMatches = calculateAllBusinessModelMatches(quizData);
    console.log(`✅ Calculated ${calculatedMatches.length} fresh scores for new quiz attempt`);
    
    // Store the scores if we have a quiz attempt ID (but don't wait for it)
    if (quizAttemptId) {
      centralizedScoringService.calculateAndStoreScores(quizData, quizAttemptId).catch(error => {
        console.log('⚠️ Failed to store scores (but email continues):', error);
      });
    }
  }
  
  // Ensure we have calculated matches - fallback to local calculation if needed
  if (!calculatedMatches || calculatedMatches.length === 0) {
    console.log('⚠️ No scores calculated, using fallback local calculation');
    try {
      const { calculateAllBusinessModelMatches } = await import('../../shared/scoring');
      calculatedMatches = calculateAllBusinessModelMatches(quizData);
      console.log(`✅ Fallback calculation successful: ${calculatedMatches.length} scores`);
    } catch (fallbackError) {
      console.error('❌ Fallback calculation also failed:', fallbackError);
      // Use default matches as absolute last resort
      calculatedMatches = [
        { id: 'affiliate-marketing', name: 'Affiliate Marketing', score: 85, category: 'online' },
        { id: 'content-creation', name: 'Content Creation', score: 80, category: 'creative' },
        { id: 'freelance-services', name: 'Freelance Services', score: 75, category: 'service' }
      ];
      console.log('✅ Using default placeholder matches for email');
    }
  }
  
  // Use the actual calculated scores without artificial capping
  
  // Use the actual calculated scores to determine top 3 paths
  const sortedMatches = calculatedMatches
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  console.log('Email template - Top 3 calculated matches (after capping):', sortedMatches.map(m => `${m.name} (${m.score}%)`));
  console.log('Email template - Available business path IDs:', businessPaths.map(p => p.id));
  
  // Get client business models for consistent metadata
  const clientBusinessModels = getClientBusinessModels();
  console.log('Email template - Using client business models for consistency with results page');
  console.log('Email template - Available client model IDs:', clientBusinessModels.map((m: any) => m.id));
  
  // Map the calculated scores to the client business models - NO FALLBACKS
  const topPaths = sortedMatches.map(match => {
    // Must find exact ID match - no fallbacks allowed
    const model = clientBusinessModels.find((m: any) => m.id === match.id);
    
    if (!model) {
      console.error(`CRITICAL ERROR: No client business model found for ID: ${match.id} (${match.name})`);
      console.error(`Available client model IDs:`, clientBusinessModels.map((m: any) => m.id));
      throw new Error(`Business model mismatch: ${match.id} not found in client models`);
    }
    
    // Find the matching business path to get the canonical emoji
    const businessPathData = businessPaths.find(bp => bp.id === model.id);
    
    return {
      id: model.id,
      name: model.title, // Use title from client models
      emoji: businessPathData?.emoji || model.emoji, // Use businessPaths emoji for consistency with results page
      description: model.description,
      detailedDescription: model.detailedDescription,
      fitScore: match.score // Use the calculated score
    };
  });
  
  // Generate business model-specific benefits based on user's quiz data
  function generateBusinessModelBenefits(path: any, quizData: any): string[] {
    if (!quizData || !path) return [];
    
    const benefits = [];
    
    // Content Creation / UGC specific benefits
    if (path.id === 'content-creation') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes content creation feel effortless and enjoyable');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills give you an edge in content creation tools and platforms');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('High self-motivation keeps you consistent with content creation schedules');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style aligns perfectly with content creation workflows');
      }
      if (quizData.riskComfortLevel >= 4) {
        benefits.push('Risk tolerance helps you experiment with new content formats and trends');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability allows for consistent content production and growth');
      }
    }
    
    // Freelancing specific benefits
    else if (path.id === 'freelancing') {
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work preference makes freelancing a natural fit for you');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Strong self-motivation drives consistent client acquisition and project delivery');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Tech skills enable efficient remote work and client communication');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Flexible structure preference allows you to adapt to different client needs');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate the ups and downs of freelancing');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable freelance business');
      }
    }
    
    // Affiliate Marketing specific benefits
    else if (path.id === 'affiliate-marketing') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you build and optimize affiliate websites');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent content creation and promotion');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits affiliate marketing\'s solo nature');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you test different affiliate strategies');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building multiple income streams');
      }
      if (quizData.learningPreference === 'hands-on') {
        benefits.push('Hands-on learning style accelerates affiliate marketing skill development');
      }
    }
    
    // Online Coaching specific benefits
    else if (path.id === 'online-coaching') {
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style makes one-on-one coaching relationships natural');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('High self-motivation inspires and motivates your coaching clients');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech comfort enables smooth online coaching sessions and tools');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Flexible structure helps you adapt coaching to different client needs');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you build confidence in your coaching business');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable coaching practice');
      }
    }
    
    // E-commerce specific benefits
    else if (path.id === 'e-commerce') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills give you an edge in e-commerce platforms and tools');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent product development and marketing');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize inventory, orders, and customer service');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate e-commerce market fluctuations');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building and scaling an e-commerce business');
      }
      if (quizData.learningPreference === 'hands-on') {
        benefits.push('Hands-on learning accelerates e-commerce platform mastery');
      }
    }
    
    // YouTube Automation specific benefits
    else if (path.id === 'youtube-automation') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you master YouTube automation tools and analytics');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent content creation and channel growth');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits YouTube automation\'s solo nature');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with different content strategies');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building multiple monetized channels');
      }
      if (quizData.learningPreference === 'hands-on') {
        benefits.push('Hands-on learning accelerates YouTube automation skill development');
      }
    }
    
    // Local Service specific benefits
    else if (path.id === 'local-service') {
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build strong local business relationships');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent service quality and customer satisfaction');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize service delivery and customer management');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate local market challenges');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable local service business');
      }
      if (quizData.learningPreference === 'hands-on') {
        benefits.push('Hands-on learning accelerates local service skill development');
      }
    }
    
    // High-Ticket Sales specific benefits
    else if (path.id === 'high-ticket-sales') {
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build trust with high-value clients');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent prospecting and relationship building');
      }
      if (quizData.riskComfortLevel >= 4) {
        benefits.push('High risk tolerance helps you handle sales pressure and rejection');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a high-ticket sales pipeline');
      }
      if (quizData.learningPreference === 'hands-on') {
        benefits.push('Hands-on learning accelerates sales skill development');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills help you use CRM tools and sales automation effectively');
      }
    }
    
    // SaaS Development specific benefits
    else if (path.id === 'saas-development') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills give you an edge in SaaS development and deployment');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent product development and iteration');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize complex SaaS development projects');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate SaaS market uncertainties');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building and scaling a SaaS product');
      }
      if (quizData.learningPreference === 'after-some-research') {
        benefits.push('Research-oriented learning helps you stay ahead in SaaS trends');
      }
    }
    
    // Social Media Agency specific benefits
    else if (path.id === 'social-media-agency') {
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build strong client relationships');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent client service and campaign management');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you master social media tools and analytics');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize multiple client campaigns');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with new social media strategies');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable agency business');
      }
    }
    
    // AI Marketing Agency specific benefits
    else if (path.id === 'ai-marketing-agency') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you leverage AI marketing tools effectively');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent AI tool learning and implementation');
      }
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build trust with AI-focused clients');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize AI marketing campaigns');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with cutting-edge AI tools');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building AI marketing expertise');
      }
    }
    
    // Digital Services Agency specific benefits
    else if (path.id === 'digital-services') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills give you credibility with digital service clients');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent service delivery and client satisfaction');
      }
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build strong client relationships');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize multiple client projects');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate digital service market changes');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable agency business');
      }
    }
    
    // Investing/Trading specific benefits
    else if (path.id === 'investing-trading') {
      if (quizData.riskComfortLevel >= 4) {
        benefits.push('High risk tolerance helps you navigate market volatility confidently');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent market research and strategy development');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits the solo nature of investing and trading');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you use trading platforms and analysis tools');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports thorough market analysis and strategy execution');
      }
      if (quizData.learningPreference === 'after-some-research') {
        benefits.push('Research-oriented learning helps you make informed investment decisions');
      }
    }
    
    // Copywriting specific benefits
    else if (path.id === 'copywriting') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes copywriting feel effortless and engaging');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent copy creation and client satisfaction');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits copywriting\'s solo nature');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills help you use copywriting tools and client management systems');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with different copywriting styles');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable copywriting business');
      }
    }
    
    // Virtual Assistant specific benefits
    else if (path.id === 'virtual-assistant') {
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build strong client relationships');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent service quality and client satisfaction');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you use virtual assistant tools effectively');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize multiple client tasks and schedules');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate client relationship challenges');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable VA business');
      }
    }
    
    // Online Reselling specific benefits
    else if (path.id === 'online-reselling') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you use reselling platforms and tools effectively');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent product sourcing and listing management');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits reselling\'s solo nature');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize inventory and order management');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate product sourcing uncertainties');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable reselling business');
      }
    }
    
    // Handmade Goods specific benefits
    else if (path.id === 'handmade-goods') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes handmade goods unique and appealing');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent product creation and quality');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits handmade goods production');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize production and inventory management');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with new product designs');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable handmade business');
      }
    }
    
    // Amazon FBA specific benefits
    else if (path.id === 'amazon-fba') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you use Amazon FBA tools and analytics effectively');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent product research and listing optimization');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits Amazon FBA\'s solo nature');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize inventory and order management');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate product sourcing and market uncertainties');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable FBA business');
      }
    }
    
    // Podcasting specific benefits
    else if (path.id === 'podcasting') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes podcast content engaging and unique');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent content creation and episode publishing');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits podcasting\'s solo nature');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills help you use podcasting equipment and editing software');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with different podcast formats');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable podcasting business');
      }
    }
    
    // Blogging specific benefits
    else if (path.id === 'blogging') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes blog content engaging and valuable');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent content creation and publishing');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits blogging\'s solo nature');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills help you use blogging platforms and SEO tools');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with different content strategies');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable blogging business');
      }
    }
    
    // Consulting specific benefits
    else if (path.id === 'consulting') {
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build strong client relationships');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent client acquisition and service delivery');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills help you use consulting tools and client management systems');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize consulting projects and deliverables');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate consulting market uncertainties');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable consulting business');
      }
    }
    
    // Real Estate Investing specific benefits
    else if (path.id === 'real-estate-investing') {
      if (quizData.riskComfortLevel >= 4) {
        benefits.push('High risk tolerance helps you navigate real estate market uncertainties');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent market research and deal analysis');
      }
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style helps build strong real estate networks');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills help you use real estate analysis tools and platforms');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports thorough market analysis and deal execution');
      }
      if (quizData.learningPreference === 'after-some-research') {
        benefits.push('Research-oriented learning helps you make informed investment decisions');
      }
    }
    
    // Online Course Creation specific benefits
    else if (path.id === 'online-course-creation') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes course content engaging and valuable');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent course development and marketing');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits course creation\'s solo nature');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you use course creation platforms and tools');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize course content and student management');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building comprehensive courses');
      }
    }
    
    // Ghostwriting specific benefits
    else if (path.id === 'ghostwriting') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes ghostwriting content engaging and valuable');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent content creation and client satisfaction');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits ghostwriting\'s solo nature');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills help you use writing tools and client management systems');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you experiment with different writing styles');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable ghostwriting business');
      }
    }
    
    // E-commerce (Dropshipping) specific benefits
    else if (path.id === 'dropshipping') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you use dropshipping platforms and tools effectively');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent product research and store optimization');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits dropshipping\'s solo nature');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Structured approach helps organize store management and customer service');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate product testing and market uncertainties');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable dropshipping business');
      }
    }
    
    // If no specific business model benefits found, generate generic but personalized ones
    if (benefits.length === 0) {
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Your high self-motivation drives consistent business growth and success');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills give you a competitive advantage in digital business');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style allows you to build businesses on your own terms');
      }
      if (quizData.riskComfortLevel >= 4) {
        benefits.push('High risk tolerance helps you navigate entrepreneurial uncertainties');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building sustainable business operations');
      }
      if (quizData.learningPreference === 'hands-on') {
        benefits.push('Hands-on learning style accelerates business skill development');
      }
    }
    
    return benefits.slice(0, 4); // Return top 4 benefits
  }
  
  function getPersonalizedSnapshot(quizData: any): string[] {
    if (!quizData) return [
        'Prefer flexibility with structure',
        'Thrive on independent projects',
        'Are motivated by financial freedom',
        'Learn best by doing',
        'Adapt quickly to new tools and systems',
        'Value passion and personal meaning in your work',
    ];
    const lines = [];
    
    // 1. Work structure - improved accuracy
    if (quizData.workStructurePreference === 'some-structure' || quizData.workStructurePreference === 'mix-both') {
        lines.push('Prefer flexibility with structure');
    } else if (quizData.workStructurePreference === 'full-structure') {
        lines.push('Prefer clear structure and routines');
    } else if (quizData.workStructurePreference === 'no-structure') {
        lines.push('Comfortable with flexible or unstructured work');
    } else {
        lines.push('Adapt well to different work structure preferences');
    }
    
    // 2. Collaboration - improved accuracy
    if (quizData.workCollaborationPreference === 'mostly-solo' || quizData.workCollaborationPreference === 'solo-flexible') {
        lines.push('Thrive on independent projects');
    } else if (quizData.workCollaborationPreference === 'team') {
        lines.push('Enjoy collaborating with others');
    } else if (quizData.workCollaborationPreference === 'mix-both') {
        lines.push('Open to both solo and team work');
    } else {
        lines.push('Adapt well to different collaboration styles');
    }
    
    // 3. Motivation - improved accuracy with multiple fields
    if (quizData.mainMotivation === 'financial-freedom' || quizData.primaryMotivation === 'financial-independence' || quizData.financialFreedomMotivation >= 4) {
        lines.push('Are motivated by financial freedom');
    } else if (quizData.mainMotivation === 'passion' || quizData.passionIdentityAlignment >= 4 || quizData.passionMotivation >= 4) {
        lines.push('Driven by passion and personal meaning');
    } else if (quizData.mainMotivation === 'growth' || quizData.personalGrowthMotivation >= 4) {
        lines.push('Motivated by growth and new challenges');
    } else if (quizData.mainMotivation === 'independence' || quizData.independenceMotivation >= 4) {
        lines.push('Value independence and autonomy in your work');
    } else {
        lines.push('Motivated by a combination of factors');
    }
    
    // 4. Learning style - improved accuracy
    if (quizData.learningPreference === 'hands-on') {
        lines.push('Learn best by doing');
    } else if (quizData.learningPreference === 'after-some-research') {
        lines.push('Prefer to research before taking action');
    } else if (quizData.learningPreference === 'comprehensive-study') {
        lines.push('Prefer comprehensive study before implementation');
    } else if (quizData.learningPreference === 'mix-both') {
        lines.push('Adapt learning style to the situation');
    } else {
        lines.push('Flexible in your learning approach');
    }
    
    // 5. Tech skills/adaptability - improved accuracy
    if (quizData.techSkillsRating >= 4) {
        lines.push('Confident with technology and new tools');
    } else if (quizData.techSkillsRating === 3) {
        lines.push('Comfortable with most digital tools');
    } else if (quizData.techSkillsRating <= 2) {
        lines.push('Willing to learn new technology as needed');
    } else {
        lines.push('Adaptable to different technology levels');
    }
    
    // 6. Resilience/self-motivation - improved accuracy with multiple fields
    if (quizData.longTermConsistency >= 4 || quizData.selfMotivationLevel >= 4 || quizData.discipline >= 4) {
        lines.push('Highly self-motivated and consistent');
    } else if (quizData.longTermConsistency === 3 || quizData.selfMotivationLevel === 3 || quizData.discipline === 3) {
        lines.push('Stay motivated with clear goals and support');
    } else if (quizData.longTermConsistency <= 2 || quizData.selfMotivationLevel <= 2 || quizData.discipline <= 2) {
        lines.push('Working to build consistency and motivation');
    } else {
        lines.push('Building your motivation and consistency skills');
    }
    
    return lines.slice(0, 6);
  }
  
  const snapshotLines = getPersonalizedSnapshot(quizData);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your BizModelAI Results</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f6fa; min-height: 100vh;">
        <div style="background: #f4f6fa; min-height: 100vh; padding: 0;">
          <div style="max-width: 700px; margin: 40px auto 0 auto; border-radius: 24px; box-shadow: 0 8px 32px rgba(37, 99, 235, 0.10); background: #fff; overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #7c3aed 100%); padding: 56px 32px 56px 32px; text-align: center; border-radius: 0; margin: 0;">
              <div style="font-size: 54px; margin-bottom: 10px; margin-top: 0;">🎉</div>
              <h1 style="font-size: 36px; font-weight: 800; color: #fff; margin: 0; letter-spacing: -0.02em; line-height: 1.1;">Your AI-Powered Business Blueprint</h1>
              <p style="color: #e0e7ef; font-size: 15px; margin: 18px 0 0 0; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Personalized recommendations based on your unique goals, skills, and preferences</p>
            </div>

            <div style="padding: 40px 32px 32px 32px; background: #fff;">
              <!-- Hidden description for email preview -->
              <div style="display: none; color: #fff;">Your personalized business model results are ready! See your best fit, AI insights, and how to unlock your full report.</div>
              
              <!-- Best Fit Business Model (only show first one) -->
              ${topPaths[0] ? (() => {
                const path = topPaths[0];
                const emoji = path.emoji || '💡';
                const fitScore = path.fitScore || 92;
                const pros = generateBusinessModelBenefits(path, quizData);
                const description = path.detailedDescription || path.description;
                return `
                  <div style="margin-bottom: 32px; border-radius: 16px; border: none; box-shadow: 0 8px 32px rgba(30, 41, 59, 0.18); padding: 40px 40px 24px 40px; background: #f1f5f9; text-align: left; position: relative; min-height: 140px;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px;">
                      <div style="display: flex; align-items: center; gap: 18px;">
                        <span style="font-size: 38px; margin-right: 8px;">${emoji}</span>
                        <h3 style="font-size: 27px; font-weight: 900; color: #18181b; margin: 0; letter-spacing: -0.01em; line-height: 1.1;">${path.name}</h3>
                      </div>
                      <div style="text-align: center; margin-left: 18px;">
                        <div style="font-weight: 900; font-size: 32px; color: #6366f1; line-height: 1;">${fitScore}%</div>
                        <div style="font-weight: 500; font-size: 15px; color: #64748b; line-height: 1; margin-top: 6px;">AI Match</div>
                      </div>
                    </div>
                    <div style="margin-bottom: 16px;">
                      <div style="font-weight: 700; color: #6366f1; font-size: 16px; margin-bottom: 6px;">Top Benefits</div>
                      <ul style="color: #334155; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
                        ${pros.map((pro: string) => `<li style="margin-bottom: 6px;">${pro}</li>`).join('')}
                      </ul>
                    </div>
                    <p style="color: #18181b; font-size: 16px; margin-bottom: 24px; line-height: 1.7;">${description}</p>
                  </div>
                `;
              })() : ''}

              <!-- Unlock Message -->
              <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 14px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: center; color: #18181b; font-weight: 700; font-size: 15px;">
                <span style="margin-right: 8px;">🔒</span>Get more business model matches by purchasing the full report.
              </div>

              <!-- Personalized Snapshot -->
              <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: left;">
                <div style="font-weight: 700; font-size: 18px; color: #18181b; display: flex; align-items: center; gap: 8px; margin-bottom: 10px;"><span>📝</span>Personalized Snapshot</div>
                <div style="border-top: 1px solid #e5e7eb; margin: 0 0 18px 0; height: 1px;"></div>
                <ul style="color: #18181b; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
                  ${snapshotLines.map(line => `<li style="margin-bottom: 6px;">${line}</li>`).join('')}
                </ul>
              </div>

              <!-- Unlock Section -->
              <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: left; color: #18181b; font-size: 16px;">
                <div style="font-weight: 700; font-size: 18px; display: flex; align-items: center; gap: 8px; color: #18181b; margin-bottom: 10px;"><span>📈</span>Unlock Your Full Report To Access:</div>
                <div style="border-top: 1px solid #e5e7eb; margin: 0 0 18px 0; height: 1px;"></div>
                <ul style="color: #18181b; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
                  <li>Business model fit scores & reasoning</li>
                  <li>Projected income & startup costs</li>
                  <li>AI-generated pros/cons per model</li>
                  <li>Personalized step-by-step launch plans</li>
                  <li>Lifetime access to all 20+ business guides</li>
                  <li>30-day action roadmap</li>
                </ul>
              </div>

              <!-- Welcome Message -->
              <div style="background: #f1f5f9; border-radius: 16px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); margin: 0 0 32px 0; padding: 28px 32px; font-size: 16px; color: #18181b; font-style: italic; text-align: left; line-height: 1.7; position: relative;">
                <div style="margin-bottom: 8px; font-weight: 600;">Dear User,</div>
                <div>
                  Thanks for taking the BizModelAI quiz. Based on your responses, our system has carefully analyzed your skills, preferences, and entrepreneurial traits to identify the business models that best align with your goals. This personalized analysis is designed to help you take action with clarity and confidence—so you can stop second-guessing and start building a business that fits who you are and where you want to go.
                </div>
                <div style="text-align: right; margin-top: 16px; font-style: italic; font-weight: 500;">
                  With love,<br/>The BizModelAI Team 💌
                </div>
              </div>

              <!-- CTA Button -->
              <div style="margin: 48px 0 0 0; text-align: center;">
                <a href="https://bizmodelai.com/full-report" style="display: inline-block; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #fff; padding: 20px 48px; border-radius: 999px; font-weight: 900; font-size: 22px; text-decoration: none; box-shadow: 0 6px 24px rgba(59,130,246,0.13); letter-spacing: -0.01em; margin-bottom: 14px;">👉 Unlock My Full Report</a>
                <div style="color: #2563eb; font-weight: 700; font-size: 18px; margin: 18px 0 8px 0;">Only $9.99 — One-time payment for lifetime access</div>
                <div style="color: #64748b; font-size: 14px; margin: 14px auto 32px auto; text-align: center; background: none; max-width: 480px;">
                  <strong>Data Retention Notice:</strong> Your quiz results and data will be stored securely for 3 months from today. After this period, your data will be automatically deleted from our systems unless you create a paid account.
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="width: 100%; margin: 0 0 0 0; padding: 0; text-align: center;">
            <div style="background: #1e293b; border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; padding: 32px 0 24px 0; color: #fff; margin: 0 auto; box-shadow: 0 2px 12px rgba(30,41,59,0.10); width: 90%; max-width: 700px;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin: 0 auto 0 auto; width: fit-content;">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F8eb83e4a630e4b8d86715228efeb581b%2F8de3245c79ad43b48b9a59be9364a64e?format=webp&width=60" alt="BizModelAI Logo" style="width: 36px; height: 36px; border-radius: 8px; background: none; margin: 0 0 0 0; display: block;">
                <span style="font-weight: 800; font-size: 20px; letter-spacing: -0.01em; color: #fff;">BizModelAI</span>
              </div>
              <div style="height: 18px;"></div>
              <div style="color: #cbd5e1; font-size: 14px; margin-top: 18px; margin-bottom: 0;">
                Need help or have questions? Just reply to this email or contact team@bizmodelai.com.<br>
                Your preview is saved for the next 90 days.
              </div>
              <div style="margin: 18px 0 18px 0; display: flex; justify-content: center; gap: 22px;">
                <a href="https://www.tiktok.com/@bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
                <a href="https://www.instagram.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
                <a href="https://twitter.com/bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X (Twitter)" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
                <a href="https://www.pinterest.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg" alt="Pinterest" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
              </div>
              <div style="margin-top: 18px;"></div>
              <div style="border-top: 1px solid #334155; margin: 24px 0 0 0; height: 1px; width: 80%; margin-left: 10%; margin-right: 10%;"></div>
              <div style="color: #94a3b8; font-size: 13px; margin-top: 18px;">&copy; 2025 BizModelAI. All rights reserved.</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function generatePaidEmailHTML(quizData: any, quizAttemptId?: number, preCalculatedScores?: any[]): Promise<string> {
  const { businessPaths } = await import('../../shared/businessPaths');
  
  // Use pre-calculated scores if provided, otherwise calculate fresh scores for new quiz attempt
  let calculatedMatches = preCalculatedScores;
  if (!calculatedMatches || calculatedMatches.length === 0) {
    // For new quiz attempts (like emails), always calculate fresh scores from quiz data
    const { calculateAllBusinessModelMatches } = await import('../../shared/scoring');
    calculatedMatches = calculateAllBusinessModelMatches(quizData);
    console.log(`✅ Calculated ${calculatedMatches.length} fresh scores for new quiz attempt`);
    
    // Store the scores if we have a quiz attempt ID (but don't wait for it)
    if (quizAttemptId) {
      centralizedScoringService.calculateAndStoreScores(quizData, quizAttemptId).catch(error => {
        console.log('⚠️ Failed to store scores (but email continues):', error);
      });
    }
  }
  
  // Ensure we have calculated matches - fallback to local calculation if needed
  if (!calculatedMatches || calculatedMatches.length === 0) {
    console.log('⚠️ No scores calculated, using fallback local calculation');
    try {
      const { calculateAllBusinessModelMatches } = await import('../../shared/scoring');
      calculatedMatches = calculateAllBusinessModelMatches(quizData);
      console.log(`✅ Fallback calculation successful: ${calculatedMatches.length} scores`);
    } catch (fallbackError) {
      console.error('❌ Fallback calculation also failed:', fallbackError);
      // Use default matches as absolute last resort
      calculatedMatches = [
        { id: 'affiliate-marketing', name: 'Affiliate Marketing', score: 85, category: 'online' },
        { id: 'content-creation', name: 'Content Creation', score: 80, category: 'creative' },
        { id: 'freelance-services', name: 'Freelance Services', score: 75, category: 'service' }
      ];
      console.log('✅ Using default placeholder matches for email');
    }
  }
  
  // Use the actual calculated scores without artificial capping
  
  // Use the actual calculated scores to determine top 3 paths
  const sortedMatches = calculatedMatches
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  console.log('Email template - Top 3 calculated matches (after capping):', sortedMatches.map(m => `${m.name} (${m.score}%)`));
  console.log('Email template - Available business path IDs:', businessPaths.map(p => p.id));
  
  // Get client business models for consistent metadata
  const clientBusinessModels = getClientBusinessModels();
  console.log('Email template - Using client business models for consistency with results page');
  console.log('Email template - Available client model IDs:', clientBusinessModels.map((m: any) => m.id));
  
  // Map the calculated scores to the client business models - NO FALLBACKS
  const topPaths = sortedMatches.map(match => {
    // Must find exact ID match - no fallbacks allowed
    const model = clientBusinessModels.find((m: any) => m.id === match.id);
    
    if (!model) {
      console.error(`CRITICAL ERROR: No client business model found for ID: ${match.id} (${match.name})`);
      console.error(`Available client model IDs:`, clientBusinessModels.map((m: any) => m.id));
      throw new Error(`Business model mismatch: ${match.id} not found in client models`);
    }
    
    // Find the matching business path to get the canonical emoji
    const businessPathData = businessPaths.find(bp => bp.id === model.id);
    
    return {
      id: model.id,
      name: model.title, // Use title from client models
      emoji: businessPathData?.emoji || model.emoji, // Use businessPaths emoji for consistency with results page
      description: model.description,
      detailedDescription: model.detailedDescription,
      fitScore: match.score // Use the calculated score
    };
  });
  
  // Generate business model-specific benefits based on user's quiz data
  function generateBusinessModelBenefits(path: any, quizData: any): string[] {
    if (!quizData || !path) return [];
    
    const benefits = [];
    
    // Content Creation / UGC specific benefits
    if (path.id === 'content-creation') {
      if (quizData.creativeWorkEnjoyment >= 4) {
        benefits.push('Your natural creativity makes content creation feel effortless and enjoyable');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills give you an edge in content creation tools and platforms');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('High self-motivation keeps you consistent with content creation schedules');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style aligns perfectly with content creation workflows');
      }
      if (quizData.riskComfortLevel >= 4) {
        benefits.push('Risk tolerance helps you experiment with new content formats and trends');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability allows for consistent content production and growth');
      }
    }
    
    // Freelancing specific benefits
    else if (path.id === 'freelancing') {
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work preference makes freelancing a natural fit for you');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Strong self-motivation drives consistent client acquisition and project delivery');
      }
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Tech skills enable efficient remote work and client communication');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Flexible structure preference allows you to adapt to different client needs');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate the ups and downs of freelancing');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable freelance business');
      }
    }
    
    // Affiliate Marketing specific benefits
    else if (path.id === 'affiliate-marketing') {
      if (quizData.techSkillsRating >= 4) {
        benefits.push('Strong tech skills help you build and optimize affiliate websites');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('Self-motivation drives consistent content creation and promotion');
      }
      if (quizData.workCollaborationPreference === 'mostly-solo') {
        benefits.push('Independent work style fits affiliate marketing\'s solo nature');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you test different affiliate strategies');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building multiple income streams');
      }
      if (quizData.learningPreference === 'hands-on') {
        benefits.push('Hands-on learning style accelerates affiliate marketing skill development');
      }
    }
    
    // Online Coaching specific benefits
    else if (path.id === 'online-coaching') {
      if (quizData.workCollaborationPreference === 'team' || quizData.workCollaborationPreference === 'solo-flexible') {
        benefits.push('Your collaboration style makes one-on-one coaching relationships natural');
      }
      if (quizData.selfMotivationLevel >= 4) {
        benefits.push('High self-motivation inspires and motivates your coaching clients');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech comfort enables smooth online coaching sessions and tools');
      }
      if (quizData.workStructurePreference === 'some-structure') {
        benefits.push('Flexible structure helps you adapt coaching to different client needs');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you build confidence in your coaching business');
      }
      if (quizData.weeklyTimeCommitment >= 17) {
        benefits.push('Your time availability supports building a sustainable coaching practice');
      }
    }
    
    // Generic benefits for any business model
    if (benefits.length === 0) {
      if (quizData.selfMotivationLevel >= 3) {
        benefits.push('Strong self-motivation drives business success');
      }
      if (quizData.techSkillsRating >= 3) {
        benefits.push('Tech skills enable efficient business operations');
      }
      if (quizData.riskComfortLevel >= 3) {
        benefits.push('Risk tolerance helps you navigate business challenges');
      }
      if (quizData.weeklyTimeCommitment >= 15) {
        benefits.push('Your time availability supports business growth');
      }
    }
    
    // Ensure we always have at least 3 benefits
    if (benefits.length < 3) {
      const fallbackBenefits = [
        'Your unique combination of skills and preferences creates a strong foundation for success',
        'This business model aligns well with your current situation and goals',
        'Your entrepreneurial mindset positions you well for this opportunity'
      ];
      
      // Add fallback benefits to reach 3 total
      for (let i = benefits.length; i < 3; i++) {
        benefits.push(fallbackBenefits[i - benefits.length]);
      }
    }
    
    return benefits;
  }
  
  function getPersonalizedSnapshot(quizData: any): string[] {
    // Same logic as above
    if (!quizData) return [
        'Prefer flexibility with structure',
        'Thrive on independent projects', 
        'Are motivated by financial freedom',
        'Learn best by doing',
        'Adapt quickly to new tools and systems',
        'Value passion and personal meaning in your work',
    ];
    const lines = [];
    
    // 1. Work structure - improved accuracy
    if (quizData.workStructurePreference === 'some-structure' || quizData.workStructurePreference === 'mix-both') {
        lines.push('Prefer flexibility with structure');
    } else if (quizData.workStructurePreference === 'full-structure') {
        lines.push('Prefer clear structure and routines');
    } else if (quizData.workStructurePreference === 'no-structure') {
        lines.push('Comfortable with flexible or unstructured work');
    } else {
        lines.push('Adapt well to different work structure preferences');
    }
    
    // 2. Collaboration - improved accuracy
    if (quizData.workCollaborationPreference === 'mostly-solo' || quizData.workCollaborationPreference === 'solo-flexible') {
        lines.push('Thrive on independent projects');
    } else if (quizData.workCollaborationPreference === 'team') {
        lines.push('Enjoy collaborating with others');
    } else if (quizData.workCollaborationPreference === 'mix-both') {
        lines.push('Open to both solo and team work');
    } else {
        lines.push('Adapt well to different collaboration styles');
    }
    
    // 3. Motivation - improved accuracy with multiple fields
    if (quizData.mainMotivation === 'financial-freedom' || quizData.primaryMotivation === 'financial-independence' || quizData.financialFreedomMotivation >= 4) {
        lines.push('Are motivated by financial freedom');
    } else if (quizData.mainMotivation === 'passion' || quizData.passionIdentityAlignment >= 4 || quizData.passionMotivation >= 4) {
        lines.push('Driven by passion and personal meaning');
    } else if (quizData.mainMotivation === 'growth' || quizData.personalGrowthMotivation >= 4) {
        lines.push('Motivated by growth and new challenges');
    } else if (quizData.mainMotivation === 'independence' || quizData.independenceMotivation >= 4) {
        lines.push('Value independence and autonomy in your work');
    } else {
        lines.push('Motivated by a combination of factors');
    }
    
    // 4. Learning style - improved accuracy
    if (quizData.learningPreference === 'hands-on') {
        lines.push('Learn best by doing');
    } else if (quizData.learningPreference === 'after-some-research') {
        lines.push('Prefer to research before taking action');
    } else if (quizData.learningPreference === 'comprehensive-study') {
        lines.push('Prefer comprehensive study before implementation');
    } else if (quizData.learningPreference === 'mix-both') {
        lines.push('Adapt learning style to the situation');
    } else {
        lines.push('Flexible in your learning approach');
    }
    
    // 5. Tech skills/adaptability - improved accuracy
    if (quizData.techSkillsRating >= 4) {
        lines.push('Confident with technology and new tools');
    } else if (quizData.techSkillsRating === 3) {
        lines.push('Comfortable with most digital tools');
    } else if (quizData.techSkillsRating <= 2) {
        lines.push('Willing to learn new technology as needed');
    } else {
        lines.push('Adaptable to different technology levels');
    }
    
    // 6. Resilience/self-motivation - improved accuracy with multiple fields
    if (quizData.longTermConsistency >= 4 || quizData.selfMotivationLevel >= 4 || quizData.discipline >= 4) {
        lines.push('Highly self-motivated and consistent');
    } else if (quizData.longTermConsistency === 3 || quizData.selfMotivationLevel === 3 || quizData.discipline === 3) {
        lines.push('Stay motivated with clear goals and support');
    } else if (quizData.longTermConsistency <= 2 || quizData.selfMotivationLevel <= 2 || quizData.discipline <= 2) {
        lines.push('Working to build consistency and motivation');
    } else {
        lines.push('Building your motivation and consistency skills');
    }
    
    return lines.slice(0, 6);
  }
  
  const snapshotLines = getPersonalizedSnapshot(quizData);
  const userId = quizData?.userId || quizData?.userID || quizData?.user_id || '';
  const attemptId = quizData?.attemptId || quizData?.attemptID || quizData?.attempt_id || '';
  let url = 'https://bizmodelai.com/results';
  const params = [];
  if (userId) params.push(`userId=${encodeURIComponent(userId)}`);
  if (attemptId) params.push(`attemptId=${encodeURIComponent(attemptId)}`);
  if (params.length) url += '?' + params.join('&');
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Complete Business Report</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f6fa; min-height: 100vh;">
        <div style="background: #f4f6fa; min-height: 100vh; padding: 0;">
          <div style="max-width: 700px; margin: 40px auto 0 auto; border-radius: 24px; box-shadow: 0 8px 32px rgba(37, 99, 235, 0.10); background: #fff; overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #7c3aed 100%); padding: 56px 32px 56px 32px; text-align: center; border-radius: 0; margin: 0;">
              <div style="font-size: 54px; margin-bottom: 10px; margin-top: 0;">🎉</div>
              <h1 style="font-size: 36px; font-weight: 800; color: #fff; margin: 0; letter-spacing: -0.02em; line-height: 1.1;">Your AI-Powered Business Blueprint</h1>
              <p style="color: #e0e7ef; font-size: 15px; margin: 18px 0 0 0; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Personalized recommendations based on your unique goals, skills, and preferences</p>
            </div>

            <div style="padding: 40px 32px 32px 32px; background: #fff;">
              <!-- Hidden description for email preview -->
              <div style="display: none; color: #fff;">Your personalized business model results are ready! See your best fit, AI insights, and your full report.</div>
              
              <!-- Show all 3 business model cards -->
              ${topPaths.map((path, idx) => {
                const emoji = path.emoji || '💡';
                const fitScore = path.fitScore || 92;
                const pros = generateBusinessModelBenefits(path, quizData);
                const description = path.detailedDescription || path.description;
                return `
                  <div style="margin-bottom: 32px; border-radius: 16px; border: none; box-shadow: 0 8px 32px rgba(30, 41, 59, 0.18); padding: 40px 40px 24px 40px; background: #f1f5f9; text-align: left; position: relative; min-height: 140px;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px;">
                      <div style="display: flex; align-items: center; gap: 18px;">
                        <span style="font-size: 38px; margin-right: 8px;">${emoji}</span>
                        <h3 style="font-size: 27px; font-weight: 900; color: #18181b; margin: 0; letter-spacing: -0.01em; line-height: 1.1;">${path.name}</h3>
                      </div>
                      <div style="text-align: center; margin-left: 18px;">
                        <div style="font-weight: 900; font-size: 32px; color: #6366f1; line-height: 1;">${fitScore}%</div>
                        <div style="font-weight: 500; font-size: 15px; color: #64748b; line-height: 1; margin-top: 6px;">AI Match</div>
                      </div>
                    </div>
                    <div style="margin-bottom: 16px;">
                      <div style="font-weight: 700; color: #6366f1; font-size: 16px; margin-bottom: 6px;">Top Benefits</div>
                      <ul style="color: #334155; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
                        ${pros.map((pro: string) => `<li style="margin-bottom: 6px;">${pro}</li>`).join('')}
                      </ul>
                    </div>
                    <p style="color: #18181b; font-size: 16px; margin-bottom: 24px; line-height: 1.7;">${description}</p>
                  </div>
                `;
              }).join('')}

              <!-- Personalized Snapshot -->
              <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: left;">
                <div style="font-weight: 700; font-size: 18px; color: #18181b; display: flex; align-items: center; gap: 8px; margin-bottom: 10px;"><span>📝</span>Personalized Snapshot</div>
                <div style="border-top: 1px solid #e5e7eb; margin: 0 0 18px 0; height: 1px;"></div>
                <ul style="color: #18181b; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
                  ${snapshotLines.map(line => `<li style="margin-bottom: 6px;">${line}</li>`).join('')}
                </ul>
              </div>

              <!-- Welcome Message -->
              <div style="background: #f1f5f9; border-radius: 16px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); margin: 0 0 32px 0; padding: 28px 32px; font-size: 16px; color: #18181b; font-style: italic; text-align: left; line-height: 1.7; position: relative;">
                <div style="margin-bottom: 8px; font-weight: 600;">Dear User,</div>
                <div>
                  Thanks for taking the BizModelAI quiz. Based on your responses, our system has carefully analyzed your skills, preferences, and entrepreneurial traits to identify the business models that best align with your goals. This personalized analysis is designed to help you take action with clarity and confidence—so you can stop second-guessing and start building a business that fits who you are and where you want to go.
                </div>
                <div style="text-align: right; margin-top: 16px; font-style: italic; font-weight: 500;">
                  With love,<br/>The BizModelAI Team 💌
                </div>
              </div>

              <!-- View Full Results button for paid users -->
              <div style="text-align: center; margin: 0 0 32px 0;">
                <a href="${url}" style="display: inline-block; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #fff; padding: 16px 40px; border-radius: 999px; font-weight: 900; font-size: 20px; text-decoration: none; box-shadow: 0 6px 24px rgba(59,130,246,0.13); letter-spacing: -0.01em; margin-top: 0;">View Full Results</a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="width: 100%; margin: 0 0 0 0; padding: 0; text-align: center;">
            <div style="background: #1e293b; border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; padding: 32px 0 24px 0; color: #fff; margin: 0 auto; box-shadow: 0 2px 12px rgba(30,41,59,0.10); width: 90%; max-width: 700px;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin: 0 auto 0 auto; width: fit-content;">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F8eb83e4a630e4b8d86715228efeb581b%2F8de3245c79ad43b48b9a59be9364a64e?format=webp&width=60" alt="BizModelAI Logo" style="width: 36px; height: 36px; border-radius: 8px; background: none; margin: 0 0 0 0; display: block;">
                <span style="font-weight: 800; font-size: 20px; letter-spacing: -0.01em; color: #fff;">BizModelAI</span>
              </div>
              <div style="height: 18px;"></div>
              <div style="color: #cbd5e1; font-size: 14px; margin-top: 18px; margin-bottom: 0;">
                Need help or have questions? Just reply to this email or contact team@bizmodelai.com.
              </div>
              <div style="margin: 18px 0 18px 0; display: flex; justify-content: center; gap: 22px;">
                <a href="https://www.tiktok.com/@bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
                <a href="https://www.instagram.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
                <a href="https://twitter.com/bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X (Twitter)" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
                <a href="https://www.pinterest.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg" alt="Pinterest" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
                </a>
              </div>
              <div style="margin-top: 18px;"></div>
              <div style="border-top: 1px solid #334155; margin: 24px 0 0 0; height: 1px; width: 80%; margin-left: 10%; margin-right: 10%;"></div>
              <div style="color: #94a3b8; font-size: 13px; margin-top: 18px;">&copy; 2025 BizModelAI. All rights reserved.</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}