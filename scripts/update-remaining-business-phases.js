import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the business paths file
const businessPathsFile = path.join(__dirname, '../shared/businessPaths.ts');
let content = fs.readFileSync(businessPathsFile, 'utf8');

// Define detailed action plans for remaining business models
const detailedActionPlans = {
  'blogging': {
    phase1: [
      {
        title: "Niche Selection & Setup (Week 1-2)",
        steps: [
          "Research profitable blog niches with low competition",
          "Set up WordPress blog with professional theme",
          "Create content calendar for first 30 posts",
          "Set up SEO tools and analytics tracking",
          "Research target keywords and topics"
        ],
        timeline: "2 weeks",
        budget: "$100-300",
        successMetrics: "Blog launched, content calendar ready, first post published"
      },
      {
        title: "Content Creation & SEO (Week 3-12)",
        steps: [
          "Publish 3-5 high-quality posts weekly",
          "Implement SEO optimization for each post",
          "Build internal linking structure",
          "Create lead magnets and opt-in forms",
          "Start building email list"
        ],
        timeline: "10 weeks",
        budget: "$200-500",
        successMetrics: "30+ posts published, 100+ email subscribers, first organic traffic"
      }
    ],
    phase2: [
      {
        title: "Monetization & Traffic Growth (Month 3-6)",
        steps: [
          "Apply for Google AdSense and affiliate programs",
          "Create sponsored content opportunities",
          "Implement email marketing campaigns",
          "Focus on high-traffic keywords",
          "Build backlinks through guest posting"
        ],
        timeline: "3-4 months",
        budget: "$300-800",
        successMetrics: "1000+ monthly visitors, first $100+ month, 5+ affiliate programs"
      },
      {
        title: "Audience Building & Brand (Month 4-8)",
        steps: [
          "Expand to social media platforms",
          "Create signature content series",
          "Build relationships with other bloggers",
          "Develop personal brand and authority",
          "Launch podcast or YouTube channel"
        ],
        timeline: "4-5 months",
        budget: "$500-1200",
        successMetrics: "5000+ monthly visitors, personal brand established, $300+ monthly income"
      }
    ],
    phase3: [
      {
        title: "Scale & Diversify (Month 8-12)",
        steps: [
          "Launch digital products (courses, e-books)",
          "Create membership site for exclusive content",
          "Hire writers and virtual assistants",
          "Develop multiple revenue streams",
          "Expand to new niches and topics"
        ],
        timeline: "4-5 months",
        budget: "$1000-3000",
        successMetrics: "$1K+ monthly income, 10K+ monthly visitors, multiple products"
      },
      {
        title: "Business Expansion & Exit (Year 1+)",
        steps: [
          "Launch blog network or media company",
          "Acquire other blogs and grow them",
          "Create proprietary tools and software",
          "Secure speaking and media opportunities",
          "Consider selling blog or entire business"
        ],
        timeline: "Ongoing",
        budget: "$3000+",
        successMetrics: "$5K+ monthly income, blog network, exit options"
      }
    ]
  },
  'copywriting': {
    phase1: [
      {
        title: "Portfolio Building & Setup (Week 1-3)",
        steps: [
          "Create professional website and portfolio",
          "Write 10-15 sample pieces in different styles",
          "Set up profiles on freelance platforms",
          "Research target industries and clients",
          "Set competitive initial rates"
        ],
        timeline: "3 weeks",
        budget: "$100-300",
        successMetrics: "Website launched, portfolio with 15+ samples, first client inquiry"
      },
      {
        title: "First Clients & Service Delivery (Week 4-8)",
        steps: [
          "Apply to 20+ relevant job postings daily",
          "Accept 3-5 small projects to build portfolio",
          "Deliver exceptional work and collect testimonials",
          "Establish clear communication protocols",
          "Create templates for common project types"
        ],
        timeline: "5 weeks",
        budget: "$0-100",
        successMetrics: "First 5 clients, 4.5+ star rating, 3+ testimonials"
      }
    ],
    phase2: [
      {
        title: "Client Growth & Rate Increases (Month 2-4)",
        steps: [
          "Gradually increase rates by 15-25% every 2 months",
          "Focus on high-value clients and industries",
          "Develop specialized copywriting services",
          "Build long-term client relationships",
          "Create case studies showcasing results"
        ],
        timeline: "2-3 months",
        budget: "$200-500",
        successMetrics: "15+ clients, 20% rate increase, $3K+ monthly income"
      },
      {
        title: "Service Expansion & Brand (Month 3-6)",
        steps: [
          "Add new services (email sequences, landing pages)",
          "Develop your personal brand and authority",
          "Create signature copywriting frameworks",
          "Build email list of prospects and clients",
          "Start networking with marketing agencies"
        ],
        timeline: "3-4 months",
        budget: "$300-800",
        successMetrics: "25+ clients, personal brand established, $5K+ monthly income"
      }
    ],
    phase3: [
      {
        title: "Scale & Team Building (Month 6-12)",
        steps: [
          "Hire junior copywriters and editors",
          "Create training programs for team members",
          "Develop proprietary copywriting methodologies",
          "Launch online courses teaching copywriting",
          "Build strategic partnerships with agencies"
        ],
        timeline: "6 months",
        budget: "$1000-3000",
        successMetrics: "Team of 5+ people, $10K+ monthly income, courses launched"
      },
      {
        title: "Agency Launch & Expansion (Year 1+)",
        steps: [
          "Launch your own copywriting agency",
          "Hire full-time employees for core services",
          "Develop enterprise-level client relationships",
          "Create multiple service lines and revenue streams",
          "Consider franchising or licensing opportunities"
        ],
        timeline: "Ongoing",
        budget: "$3000+",
        successMetrics: "Agency with 10+ employees, $25K+ monthly revenue, enterprise clients"
      }
    ]
  },
  'consulting': {
    phase1: [
      {
        title: "Expertise Definition & Setup (Week 1-2)",
        steps: [
          "Define your consulting niche and target market",
          "Create professional website and consulting packages",
          "Set up business infrastructure and tools",
          "Research competition and pricing in your niche",
          "Create case studies from past experience"
        ],
        timeline: "2 weeks",
        budget: "$200-500",
        successMetrics: "Website launched, packages defined, first client inquiry"
      },
      {
        title: "First Clients & Service Delivery (Week 3-8)",
        steps: [
          "Reach out to 50+ potential clients daily",
          "Offer discounted rates for first 3-5 clients",
          "Deliver exceptional results and collect testimonials",
          "Refine your consulting methodology",
          "Build relationships with industry professionals"
        ],
        timeline: "6 weeks",
        budget: "$300-800",
        successMetrics: "First 5 clients, 4.5+ star rating, 3+ testimonials"
      }
    ],
    phase2: [
      {
        title: "Client Base Building & Optimization (Month 2-4)",
        steps: [
          "Standardize consulting processes and deliverables",
          "Implement client management and billing systems",
          "Create comprehensive case studies",
          "Build referral network with satisfied clients",
          "Develop retainer packages for ongoing services"
        ],
        timeline: "2-3 months",
        budget: "$500-1500",
        successMetrics: "15+ clients, 5+ retainer contracts, $8K+ monthly revenue"
      },
      {
        title: "Service Expansion & Brand Building (Month 3-6)",
        steps: [
          "Add new consulting services based on client demand",
          "Develop your personal brand and authority",
          "Create signature consulting frameworks",
          "Build email list of prospects and clients",
          "Start speaking at industry events"
        ],
        timeline: "3-4 months",
        budget: "$800-2000",
        successMetrics: "25+ clients, personal brand established, $12K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Team Building (Month 6-12)",
        steps: [
          "Hire associate consultants and support staff",
          "Develop proprietary consulting methodologies",
          "Create online courses and training programs",
          "Launch membership programs for ongoing support",
          "Build strategic partnerships with complementary services"
        ],
        timeline: "6 months",
        budget: "$2000-6000",
        successMetrics: "Team of 5+ people, $20K+ monthly revenue, courses launched"
      },
      {
        title: "Firm Launch & Industry Leadership (Year 1+)",
        steps: [
          "Launch your own consulting firm",
          "Hire full-time employees for core services",
          "Develop enterprise-level client relationships",
          "Create multiple service lines and revenue streams",
          "Become recognized industry leader and speaker"
        ],
        timeline: "Ongoing",
        budget: "$6000+",
        successMetrics: "Firm with 15+ employees, $50K+ monthly revenue, industry recognition"
      }
    ]
  }
};

// Function to convert action plan to string format
function convertActionPlanToString(actionPlan) {
  let result = '    actionPlan: {\n';
  
  ['phase1', 'phase2', 'phase3'].forEach(phase => {
    result += `      ${phase}: [\n`;
    actionPlan[phase].forEach(item => {
      result += `        {\n`;
      result += `          title: "${item.title}",\n`;
      result += `          steps: [\n`;
      item.steps.forEach(step => {
        result += `            "${step}",\n`;
      });
      result += `          ],\n`;
      result += `          timeline: "${item.timeline}",\n`;
      result += `          budget: "${item.budget}",\n`;
      result += `          successMetrics: "${item.successMetrics}"\n`;
      result += `        },\n`;
    });
    result += `      ],\n`;
  });
  
  result += '    },';
  return result;
}

// Update each business model
Object.keys(detailedActionPlans).forEach(modelId => {
  const searchPattern = new RegExp(`id: "${modelId}"[\\s\\S]*?actionPlan: \\{[\\s\\S]*?\\},`, 'g');
  const replacement = convertActionPlanToString(detailedActionPlans[modelId]);
  
  if (content.includes(`id: "${modelId}"`)) {
    content = content.replace(searchPattern, (match) => {
      // Find the actionPlan section and replace it
      const actionPlanPattern = /actionPlan: \{[\s\S]*?\},/;
      return match.replace(actionPlanPattern, replacement);
    });
    console.log(`✅ Updated ${modelId}`);
  } else {
    console.log(`❌ Could not find ${modelId}`);
  }
});

// Write the updated content back to the file
fs.writeFileSync(businessPathsFile, content, 'utf8');
console.log('\n🎉 Remaining business models updated successfully!');
console.log('📝 Next: Continue updating the remaining business models');
