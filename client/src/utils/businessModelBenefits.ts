// Utility function to generate personalized business model benefits based on user quiz data
export function generateBusinessModelBenefits(path: any, quizData: any): string[] {
  if (!quizData || !path) {
    return [];
  }
  
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
    if (quizData.workCollaborationPreference === 'independent') {
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
  
  return benefits.slice(0, 3); // Return top 3 benefits for frontend display
}
