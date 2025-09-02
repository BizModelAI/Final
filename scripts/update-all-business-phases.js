import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the business paths file
const businessPathsFile = path.join(__dirname, '../shared/businessPaths.ts');
let content = fs.readFileSync(businessPathsFile, 'utf8');

// Define detailed action plans for each business model
const detailedActionPlans = {
  'youtube-automation': {
    phase1: [
      {
        title: "Channel Research & Setup (Week 1-3)",
        steps: [
          "Research profitable niches with low competition and high CPM",
          "Set up YouTube channel with professional branding and description",
          "Create content calendar for first 30 videos",
          "Set up YouTube Studio and analytics tracking",
          "Research trending topics and keywords in your niche"
        ],
        timeline: "3 weeks",
        budget: "$100-300",
        successMetrics: "Channel created, content calendar ready, first video published"
      },
      {
        title: "Content Creation & Publishing (Week 4-12)",
        steps: [
          "Create and publish 2-3 videos per week consistently",
          "Use AI voice tools and stock footage for content creation",
          "Implement SEO optimization with targeted keywords",
          "Create engaging thumbnails and titles",
          "Build initial audience through social media promotion"
        ],
        timeline: "8 weeks",
        budget: "$200-500",
        successMetrics: "20+ videos published, 100+ subscribers, first monetization milestone"
      }
    ],
    phase2: [
      {
        title: "Monetization & Audience Growth (Month 3-6)",
        steps: [
          "Apply for YouTube Partner Program once eligible",
          "Implement mid-roll ads and optimize ad placement",
          "Create sponsored content opportunities with brands",
          "Build email list and implement affiliate marketing",
          "Analyze performance data and optimize content strategy"
        ],
        timeline: "3-4 months",
        budget: "$500-1000",
        successMetrics: "1000+ subscribers, first $100+ month, 3+ brand partnerships"
      },
      {
        title: "Scaling & Automation (Month 4-8)",
        steps: [
          "Hire video editors and content creators",
          "Implement automated publishing schedules",
          "Expand to multiple channels in different niches",
          "Develop content templates and systems",
          "Create merchandise and digital products"
        ],
        timeline: "4-5 months",
        budget: "$1000-3000",
        successMetrics: "5000+ subscribers, $500+ monthly income, 3+ channels"
      }
    ],
    phase3: [
      {
        title: "Multi-Channel Empire (Month 8-12)",
        steps: [
          "Launch 5-10 additional channels in profitable niches",
          "Develop proprietary content creation systems",
          "Hire full-time team for content management",
          "Create online courses teaching YouTube automation",
          "Build a network of content creators and partners"
        ],
        timeline: "4-5 months",
        budget: "$3000-8000",
        successMetrics: "10+ channels, $2K+ monthly income, automated systems"
      },
      {
        title: "Business Expansion & Exit Strategy (Year 1+)",
        steps: [
          "Launch YouTube automation agency for other creators",
          "Develop proprietary tools and software",
          "Acquire existing channels and grow them",
          "Create multiple revenue streams beyond YouTube",
          "Consider selling channels or entire business"
        ],
        timeline: "Ongoing",
        budget: "$8000+",
        successMetrics: "Agency with 20+ channels, $10K+ monthly income, exit options"
      }
    ]
  },
  'ai-marketing-agency': {
    phase1: [
      {
        title: "Service Definition & Setup (Week 1-2)",
        steps: [
          "Define your AI marketing service offerings (ads, content, analytics)",
          "Set up professional website and business infrastructure",
          "Create service packages and pricing tiers",
          "Set up project management and communication tools",
          "Research target market and competition"
        ],
        timeline: "2 weeks",
        budget: "$200-500",
        successMetrics: "Website launched, service packages defined, first client inquiry"
      },
      {
        title: "First Clients & Service Delivery (Week 3-8)",
        steps: [
          "Reach out to 50+ potential clients daily",
          "Offer discounted rates for first 3-5 clients",
          "Implement AI tools for marketing automation",
          "Deliver exceptional results and collect testimonials",
          "Refine your service delivery process"
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
          "Standardize service delivery processes",
          "Implement AI-powered analytics and reporting",
          "Create case studies showcasing client results",
          "Build referral network with satisfied clients",
          "Develop retainer packages for ongoing services"
        ],
        timeline: "2-3 months",
        budget: "$500-1500",
        successMetrics: "15+ clients, 5+ retainer contracts, $5K+ monthly revenue"
      },
      {
        title: "Service Expansion & Team Building (Month 3-6)",
        steps: [
          "Add new AI marketing services based on client demand",
          "Hire virtual assistants for routine tasks",
          "Develop proprietary AI marketing methodologies",
          "Create training programs for clients",
          "Build strategic partnerships with AI tool providers"
        ],
        timeline: "3-4 months",
        budget: "$1000-3000",
        successMetrics: "25+ clients, team of 3+ people, $10K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Automate (Month 6-12)",
        steps: [
          "Develop proprietary AI marketing software",
          "Create online courses teaching AI marketing",
          "Launch a membership program for ongoing support",
          "Hire full-time employees for core services",
          "Implement advanced automation and AI systems"
        ],
        timeline: "6 months",
        budget: "$3000-10000",
        successMetrics: "50+ clients, proprietary software, $25K+ monthly revenue"
      },
      {
        title: "Industry Leadership & Exit Strategy (Year 1+)",
        steps: [
          "Become recognized industry leader through speaking and media",
          "Launch franchise or licensing opportunities",
          "Acquire smaller agencies and integrate them",
          "Develop enterprise-level AI marketing solutions",
          "Consider IPO or acquisition opportunities"
        ],
        timeline: "Ongoing",
        budget: "$10000+",
        successMetrics: "Industry recognition, $100K+ monthly revenue, exit valuation"
      }
    ]
  },
  'social-media-agency': {
    phase1: [
      {
        title: "Service Setup & First Clients (Week 1-4)",
        steps: [
          "Define your social media service offerings",
          "Create professional website and portfolio",
          "Set up project management and social media tools",
          "Reach out to 100+ local businesses",
          "Offer free audits to get first 3-5 clients"
        ],
        timeline: "4 weeks",
        budget: "$200-600",
        successMetrics: "Website launched, 5+ clients, first social media campaigns"
      },
      {
        title: "Service Delivery & Optimization (Week 5-12)",
        steps: [
          "Deliver exceptional results for first clients",
          "Create case studies and before/after examples",
          "Implement social media management systems",
          "Build content calendars and posting schedules",
          "Collect testimonials and ask for referrals"
        ],
        timeline: "8 weeks",
        budget: "$400-1000",
        successMetrics: "10+ completed campaigns, 4+ testimonials, first referrals"
      }
    ],
    phase2: [
      {
        title: "Client Growth & Service Expansion (Month 3-6)",
        steps: [
          "Launch retainer packages for ongoing services",
          "Add new services (paid ads, influencer marketing)",
          "Implement client onboarding and management systems",
          "Build email list of prospects and past clients",
          "Create content marketing to attract new clients"
        ],
        timeline: "3-4 months",
        budget: "$800-2000",
        successMetrics: "20+ clients, 10+ retainer contracts, $8K+ monthly revenue"
      },
      {
        title: "Team Building & Process Optimization (Month 4-8)",
        steps: [
          "Hire social media managers and content creators",
          "Develop standardized service delivery processes",
          "Create training programs for team members",
          "Implement advanced analytics and reporting",
          "Build strategic partnerships with complementary services"
        ],
        timeline: "4-5 months",
        budget: "$2000-5000",
        successMetrics: "Team of 5+ people, 30+ clients, $15K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Diversify (Month 8-12)",
        steps: [
          "Launch multiple service lines and specializations",
          "Create online courses teaching social media",
          "Develop proprietary tools and methodologies",
          "Expand to enterprise-level clients",
          "Build a network of partner agencies"
        ],
        timeline: "4-5 months",
        budget: "$5000-15000",
        successMetrics: "50+ clients, multiple service lines, $30K+ monthly revenue"
      },
      {
        title: "Industry Leadership & Exit Strategy (Year 1+)",
        steps: [
          "Become recognized industry leader and speaker",
          "Launch franchise opportunities or licensing",
          "Acquire smaller agencies and integrate them",
          "Develop proprietary social media software",
          "Consider IPO or acquisition opportunities"
        ],
        timeline: "Ongoing",
        budget: "$15000+",
        successMetrics: "Industry recognition, $100K+ monthly revenue, exit options"
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
console.log('\n🎉 All business models updated successfully!');
console.log('📝 Next: Update the remaining business models manually or create more detailed plans');
