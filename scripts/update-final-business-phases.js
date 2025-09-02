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
  'digital-services': {
    phase1: [
      {
        title: "Service Definition & Setup (Week 1-2)",
        steps: [
          "Define your digital service offerings (web design, SEO, social media)",
          "Create professional website and service packages",
          "Set up project management and communication tools",
          "Research target market and competition pricing",
          "Create portfolio of past work or sample projects"
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
          "Deliver exceptional results and collect testimonials",
          "Refine your service delivery process",
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
          "Standardize service delivery processes",
          "Implement client management and billing systems",
          "Create case studies showcasing results",
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
          "Add new digital services based on client demand",
          "Develop your personal brand and authority",
          "Create signature service frameworks",
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
          "Hire digital specialists and support staff",
          "Develop proprietary service methodologies",
          "Create online courses and training programs",
          "Launch membership programs for ongoing support",
          "Build strategic partnerships with complementary services"
        ],
        timeline: "6 months",
        budget: "$2000-6000",
        successMetrics: "Team of 5+ people, $20K+ monthly revenue, courses launched"
      },
      {
        title: "Agency Launch & Industry Leadership (Year 1+)",
        steps: [
          "Launch your own digital agency",
          "Hire full-time employees for core services",
          "Develop enterprise-level client relationships",
          "Create multiple service lines and revenue streams",
          "Become recognized industry leader and speaker"
        ],
        timeline: "Ongoing",
        budget: "$6000+",
        successMetrics: "Agency with 15+ employees, $50K+ monthly revenue, industry recognition"
      }
    ]
  },
  'local-service': {
    phase1: [
      {
        title: "Service Research & Setup (Week 1-3)",
        steps: [
          "Research profitable local service niches in your area",
          "Set up business registration and insurance",
          "Create professional website and service listings",
          "Set up business phone and communication systems",
          "Research local competition and pricing"
        ],
        timeline: "3 weeks",
        budget: "$500-1500",
        successMetrics: "Business registered, website launched, first service inquiry"
      },
      {
        title: "First Clients & Service Delivery (Week 4-8)",
        steps: [
          "Reach out to 100+ local businesses and homeowners",
          "Offer discounted rates for first 5-10 clients",
          "Deliver exceptional service and collect testimonials",
          "Build relationships with local suppliers",
          "Create service delivery checklists and processes"
        ],
        timeline: "5 weeks",
        budget: "$300-800",
        successMetrics: "First 10 clients, 4.5+ star rating, 5+ testimonials"
      }
    ],
    phase2: [
      {
        title: "Local Market Penetration (Month 2-4)",
        steps: [
          "Implement local SEO and Google My Business optimization",
          "Build relationships with local business associations",
          "Create referral programs with satisfied clients",
          "Develop service packages for different customer segments",
          "Start local advertising and community involvement"
        ],
        timeline: "2-3 months",
        budget: "$800-2000",
        successMetrics: "25+ clients, local market presence, $8K+ monthly revenue"
      },
      {
        title: "Service Expansion & Team Building (Month 3-6)",
        steps: [
          "Add complementary services to your offerings",
          "Hire first employees or subcontractors",
          "Develop standardized service delivery processes",
          "Create customer loyalty programs",
          "Build partnerships with local businesses"
        ],
        timeline: "3-4 months",
        budget: "$1500-4000",
        successMetrics: "40+ clients, team of 3+ people, $15K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Diversify (Month 6-12)",
        steps: [
          "Expand to multiple service areas or cities",
          "Launch franchise or licensing opportunities",
          "Develop proprietary service methodologies",
          "Create online booking and management systems",
          "Build a network of service providers"
        ],
        timeline: "6 months",
        budget: "$4000-12000",
        successMetrics: "100+ clients, multiple locations, $30K+ monthly revenue"
      },
      {
        title: "Business Empire & Exit Strategy (Year 1+)",
        steps: [
          "Launch multiple service businesses in different niches",
          "Develop enterprise-level client relationships",
          "Create training programs for other service providers",
          "Build a portfolio of local service businesses",
          "Consider franchising or selling the business"
        ],
        timeline: "Ongoing",
        budget: "$12000+",
        successMetrics: "Multiple businesses, $100K+ monthly revenue, exit options"
      }
    ]
  },
  'online-course-creation': {
    phase1: [
      {
        title: "Course Planning & Content Creation (Week 1-6)",
        steps: [
          "Research profitable course topics with high demand",
          "Create detailed course outline and curriculum",
          "Record 10-15 high-quality video lessons",
          "Create supporting materials (workbooks, templates)",
          "Set up course hosting platform (Teachable, Udemy)"
        ],
        timeline: "6 weeks",
        budget: "$200-800",
        successMetrics: "Course outline complete, 15+ lessons recorded, platform setup"
      },
      {
        title: "Course Launch & Marketing (Week 7-12)",
        steps: [
          "Launch course with promotional pricing",
          "Create sales page and marketing materials",
          "Implement email marketing campaigns",
          "Reach out to your existing audience and network",
          "Collect first student feedback and testimonials"
        ],
        timeline: "6 weeks",
        budget: "$300-1000",
        successMetrics: "First 20+ students, course launched, initial feedback collected"
      }
    ],
    phase2: [
      {
        title: "Student Growth & Course Optimization (Month 3-6)",
        steps: [
          "Implement student feedback to improve course content",
          "Create additional bonus materials and resources",
          "Develop affiliate program for course promotion",
          "Build email list of prospects and past students",
          "Start creating content marketing to attract students"
        ],
        timeline: "3-4 months",
        budget: "$500-1500",
        successMetrics: "100+ students, affiliate program active, $3K+ monthly revenue"
      },
      {
        title: "Course Expansion & Brand Building (Month 4-8)",
        steps: [
          "Create additional courses in related topics",
          "Develop your personal brand as course creator",
          "Launch membership site for ongoing student support",
          "Create live workshops and group coaching",
          "Build strategic partnerships with other creators"
        ],
        timeline: "4-5 months",
        budget: "$1000-3000",
        successMetrics: "3+ courses, membership site active, $8K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Automate (Month 8-12)",
        steps: [
          "Develop automated marketing and sales funnels",
          "Create online course creation business",
          "Hire team members for content creation and support",
          "Launch certification programs and advanced courses",
          "Build a network of course creators and partners"
        ],
        timeline: "4-5 months",
        budget: "$3000-8000",
        successMetrics: "10+ courses, team of 5+ people, $20K+ monthly revenue"
      },
      {
        title: "Education Empire & Industry Leadership (Year 1+)",
        steps: [
          "Launch your own online education platform",
          "Create courses for other experts and creators",
          "Develop proprietary course creation methodologies",
          "Secure speaking engagements and media appearances",
          "Consider selling courses or entire business"
        ],
        timeline: "Ongoing",
        budget: "$8000+",
        successMetrics: "Education platform, 50+ courses, $50K+ monthly revenue"
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
console.log('\n🎉 Final business models updated successfully!');
console.log('📝 All major business models now have detailed implementation phases!');
