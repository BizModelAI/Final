import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the business paths file
const businessPathsFile = path.join(__dirname, '../shared/businessPaths.ts');
let content = fs.readFileSync(businessPathsFile, 'utf8');

// Define detailed action plans for ALL remaining business models
const detailedActionPlans = {
  'high-ticket-sales': {
    phase1: [
      {
        title: "Industry Selection & Setup (Week 1-3)",
        steps: [
          "Research high-ticket industries (real estate, software, consulting)",
          "Choose your target industry and learn product knowledge",
          "Set up CRM system and sales tracking tools",
          "Create professional LinkedIn profile and sales materials",
          "Research target companies and decision makers"
        ],
        timeline: "3 weeks",
        budget: "$200-500",
        successMetrics: "Industry selected, CRM setup, first prospect list created"
      },
      {
        title: "Prospecting & First Conversations (Week 4-8)",
        steps: [
          "Start prospecting 50+ companies daily using LinkedIn and cold outreach",
          "Schedule first 10-15 discovery calls with prospects",
          "Practice your sales pitch and objection handling",
          "Build relationships with gatekeepers and assistants",
          "Create sales scripts and follow-up sequences"
        ],
        timeline: "5 weeks",
        budget: "$100-300",
        successMetrics: "First 15 discovery calls, sales scripts refined, pipeline building"
      }
    ],
    phase2: [
      {
        title: "Sales Process Refinement (Month 2-4)",
        steps: [
          "Close your first 2-3 deals and collect testimonials",
          "Refine your sales process based on what works",
          "Implement advanced prospecting techniques",
          "Build relationships with industry influencers",
          "Develop case studies from successful deals"
        ],
        timeline: "2-3 months",
        budget: "$300-800",
        successMetrics: "First 3 deals closed, sales process documented, $50K+ revenue"
      },
      {
        title: "Pipeline Scaling & Optimization (Month 3-6)",
        steps: [
          "Scale prospecting efforts to 100+ companies daily",
          "Implement advanced CRM automation and tracking",
          "Build referral network with satisfied clients",
          "Develop sales training materials and processes",
          "Start mentoring junior sales reps"
        ],
        timeline: "3-4 months",
        budget: "$500-1500",
        successMetrics: "100+ prospects daily, referral network active, $100K+ revenue"
      }
    ],
    phase3: [
      {
        title: "Team Building & Leadership (Month 6-12)",
        steps: [
          "Hire and train junior sales representatives",
          "Develop proprietary sales methodologies",
          "Create sales training programs and materials",
          "Build strategic partnerships with complementary services",
          "Expand to additional high-ticket industries"
        ],
        timeline: "6 months",
        budget: "$2000-6000",
        successMetrics: "Team of 5+ sales reps, $500K+ monthly revenue, training programs"
      },
      {
        title: "Sales Organization & Exit Strategy (Year 1+)",
        steps: [
          "Launch your own sales training company",
          "Develop enterprise-level client relationships",
          "Create multiple revenue streams beyond sales",
          "Consider franchising or licensing opportunities",
          "Build a portfolio of sales businesses"
        ],
        timeline: "Ongoing",
        budget: "$6000+",
        successMetrics: "Sales training company, $1M+ annual revenue, exit options"
      }
    ]
  },
  'saas-development': {
    phase1: [
      {
        title: "Idea Validation & MVP Planning (Week 1-4)",
        steps: [
          "Research and validate your SaaS business idea",
          "Learn required technologies or hire developers",
          "Create detailed product roadmap and feature list",
          "Build MVP version with core functionality",
          "Set up development environment and tools"
        ],
        timeline: "4 weeks",
        budget: "$500-2000",
        successMetrics: "Idea validated, MVP planned, development environment ready"
      },
      {
        title: "MVP Development & Testing (Week 5-16)",
        steps: [
          "Develop MVP with essential features only",
          "Implement user authentication and basic functionality",
          "Set up hosting, database, and payment processing",
          "Test with 10-20 beta users and collect feedback",
          "Iterate based on user feedback and bug reports"
        ],
        timeline: "12 weeks",
        budget: "$2000-8000",
        successMetrics: "MVP developed, 20+ beta users, core functionality working"
      }
    ],
    phase2: [
      {
        title: "Launch & User Acquisition (Month 4-8)",
        steps: [
          "Launch SaaS product to the public",
          "Implement marketing and user acquisition strategies",
          "Set up analytics and user tracking",
          "Optimize onboarding and user experience",
          "Build customer support and feedback systems"
        ],
        timeline: "4-5 months",
        budget: "$3000-12000",
        successMetrics: "Product launched, 100+ users, $5K+ monthly revenue"
      },
      {
        title: "Product Optimization & Growth (Month 6-12)",
        steps: [
          "Implement user feedback and feature requests",
          "Optimize conversion rates and user retention",
          "Scale infrastructure for growing user base",
          "Develop advanced features and integrations",
          "Build customer success and onboarding teams"
        ],
        timeline: "6-7 months",
        budget: "$5000-20000",
        successMetrics: "500+ users, 90%+ retention rate, $25K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Enterprise Focus (Month 12-18)",
        steps: [
          "Develop enterprise features and security",
          "Hire sales team for enterprise customers",
          "Implement advanced analytics and reporting",
          "Create partner integrations and API access",
          "Build customer success and support teams"
        ],
        timeline: "6 months",
        budget: "$20000-50000",
        successMetrics: "1000+ users, enterprise customers, $100K+ monthly revenue"
      },
      {
        title: "Market Leadership & Exit Strategy (Year 2+)",
        steps: [
          "Become market leader in your SaaS category",
          "Develop proprietary technologies and patents",
          "Consider IPO, acquisition, or private equity",
          "Expand to international markets",
          "Launch additional SaaS products"
        ],
        timeline: "Ongoing",
        budget: "$50000+",
        successMetrics: "Market leadership, $500K+ monthly revenue, exit valuation"
      }
    ]
  },
  'virtual-assistant': {
    phase1: [
      {
        title: "Service Definition & Setup (Week 1-2)",
        steps: [
          "Define your VA service offerings and specializations",
          "Create professional website and service packages",
          "Set up project management and communication tools",
          "Research target market and competition pricing",
          "Create portfolio of past work or sample projects"
        ],
        timeline: "2 weeks",
        budget: "$100-300",
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
        budget: "$200-500",
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
        budget: "$300-800",
        successMetrics: "15+ clients, 5+ retainer contracts, $3K+ monthly revenue"
      },
      {
        title: "Service Expansion & Team Building (Month 3-6)",
        steps: [
          "Add new VA services based on client demand",
          "Hire junior VAs and train them",
          "Develop proprietary service methodologies",
          "Create training programs for team members",
          "Build strategic partnerships with complementary services"
        ],
        timeline: "3-4 months",
        budget: "$500-1500",
        successMetrics: "25+ clients, team of 3+ VAs, $8K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Automate (Month 6-12)",
        steps: [
          "Develop proprietary VA management software",
          "Create online courses teaching VA skills",
          "Launch VA agency for other entrepreneurs",
          "Hire full-time employees for core services",
          "Implement advanced automation and systems"
        ],
        timeline: "6 months",
        budget: "$1500-5000",
        successMetrics: "50+ clients, proprietary software, $20K+ monthly revenue"
      },
      {
        title: "VA Empire & Industry Leadership (Year 1+)",
        steps: [
          "Launch multiple VA businesses in different niches",
          "Develop franchise opportunities for VA services",
          "Create proprietary tools and methodologies",
          "Become recognized industry leader and speaker",
          "Consider selling VA businesses or franchising"
        ],
        timeline: "Ongoing",
        budget: "$5000+",
        successMetrics: "Multiple VA businesses, $50K+ monthly revenue, industry recognition"
      }
    ]
  },
  'online-reselling': {
    phase1: [
      {
        title: "Product Research & Sourcing (Week 1-3)",
        steps: [
          "Research profitable product categories with high demand",
          "Identify reliable suppliers and wholesalers",
          "Set up business accounts with major suppliers",
          "Create product sourcing and pricing spreadsheets",
          "Research competition and market pricing"
        ],
        timeline: "3 weeks",
        budget: "$500-1500",
        successMetrics: "Suppliers identified, product categories selected, pricing strategy"
      },
      {
        title: "Platform Setup & First Listings (Week 4-8)",
        steps: [
          "Set up accounts on major reselling platforms (eBay, Amazon, etc.)",
          "Create professional store profiles and branding",
          "List first 50-100 products with optimized titles",
          "Implement inventory management system",
          "Set up shipping and fulfillment processes"
        ],
        timeline: "5 weeks",
        budget: "$300-800",
        successMetrics: "Platforms setup, 100+ products listed, first sales"
      }
    ],
    phase2: [
      {
        title: "Sales Optimization & Scaling (Month 2-4)",
        steps: [
          "Analyze sales data and optimize top-performing products",
          "Implement advanced listing optimization techniques",
          "Scale successful product categories",
          "Build relationships with top suppliers",
          "Develop automated pricing and inventory systems"
        ],
        timeline: "2-3 months",
        budget: "$800-2000",
        successMetrics: "100+ monthly sales, $5K+ monthly revenue, optimized listings"
      },
      {
        title: "Business Expansion & Automation (Month 3-6)",
        steps: [
          "Expand to additional reselling platforms",
          "Hire virtual assistants for routine tasks",
          "Develop proprietary sourcing methodologies",
          "Create automated systems for inventory management",
          "Build strategic partnerships with suppliers"
        ],
        timeline: "3-4 months",
        budget: "$1500-4000",
        successMetrics: "5+ platforms, automated systems, $15K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Scale & Diversify (Month 6-12)",
        steps: [
          "Launch private label products in successful categories",
          "Create wholesale and B2B sales channels",
          "Develop proprietary product sourcing software",
          "Hire team members for operations and customer service",
          "Expand to international markets"
        ],
        timeline: "6 months",
        budget: "$4000-12000",
        successMetrics: "Private label products, B2B channels, $30K+ monthly revenue"
      },
      {
        title: "Reselling Empire & Exit Strategy (Year 1+)",
        steps: [
          "Launch multiple reselling businesses in different niches",
          "Develop franchise opportunities for resellers",
          "Create training programs for other resellers",
          "Build a portfolio of successful reselling businesses",
          "Consider selling businesses or franchising"
        ],
        timeline: "Ongoing",
        budget: "$12000+",
        successMetrics: "Multiple businesses, $100K+ monthly revenue, exit options"
      }
    ]
  },
  'handmade-goods': {
    phase1: [
      {
        title: "Product Development & Branding (Week 1-4)",
        steps: [
          "Develop 5-10 unique handmade product designs",
          "Create professional product photography and branding",
          "Set up Etsy shop and other handmade platforms",
          "Research materials and suppliers for cost optimization",
          "Create product descriptions and pricing strategy"
        ],
        timeline: "4 weeks",
        budget: "$300-800",
        successMetrics: "10+ products developed, shop setup, first product photos"
      },
      {
        title: "Shop Launch & First Sales (Week 5-12)",
        steps: [
          "Launch shop with promotional pricing and social media",
          "Implement SEO optimization for product listings",
          "Create social media presence and content marketing",
          "Build email list of customers and prospects",
          "Collect first customer feedback and testimonials"
        ],
        timeline: "8 weeks",
        budget: "$200-500",
        successMetrics: "Shop launched, first 20+ sales, social media following"
      }
    ],
    phase2: [
      {
        title: "Sales Growth & Product Expansion (Month 3-6)",
        steps: [
          "Analyze sales data and expand successful product lines",
          "Implement advanced marketing and advertising strategies",
          "Build relationships with local boutiques and retailers",
          "Create seasonal collections and limited editions",
          "Develop customer loyalty and referral programs"
        ],
        timeline: "3-4 months",
        budget: "$500-1500",
        successMetrics: "100+ monthly sales, $3K+ monthly revenue, retail partnerships"
      },
      {
        title: "Business Scaling & Team Building (Month 4-8)",
        steps: [
          "Hire artisans and production assistants",
          "Develop standardized production processes",
          "Create wholesale and B2B sales channels",
          "Launch your own e-commerce website",
          "Build strategic partnerships with complementary businesses"
        ],
        timeline: "4-5 months",
        budget: "$1500-4000",
        successMetrics: "Team of 5+ artisans, wholesale channels, $8K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Brand Building & Market Expansion (Month 8-12)",
        steps: [
          "Develop strong brand identity and market positioning",
          "Launch multiple product lines and categories",
          "Create subscription boxes and membership programs",
          "Expand to international markets and shipping",
          "Develop proprietary production techniques"
        ],
        timeline: "4-5 months",
        budget: "$4000-10000",
        successMetrics: "Strong brand recognition, multiple product lines, $20K+ monthly revenue"
      },
      {
        title: "Handmade Empire & Legacy Building (Year 1+)",
        steps: [
          "Launch multiple handmade businesses in different niches",
          "Create training programs for other artisans",
          "Develop franchise opportunities for handmade goods",
          "Build a portfolio of successful handmade businesses",
          "Consider selling businesses or creating legacy brand"
        ],
        timeline: "Ongoing",
        budget: "$10000+",
        successMetrics: "Multiple businesses, $50K+ monthly revenue, legacy brand"
      }
    ]
  },
  'amazon-fba': {
    phase1: [
      {
        title: "Product Research & Validation (Week 1-4)",
        steps: [
          "Research profitable Amazon FBA product opportunities",
          "Validate product demand using Jungle Scout or Helium 10",
          "Source 3-5 product samples from reliable suppliers",
          "Analyze competition and pricing strategies",
          "Create product specifications and requirements"
        ],
        timeline: "4 weeks",
        budget: "$500-1500",
        successMetrics: "Products selected, samples received, competition analyzed"
      },
      {
        title: "Product Development & Launch (Week 5-16)",
        steps: [
          "Work with suppliers to develop and customize products",
          "Create professional product photography and listings",
          "Set up Amazon FBA seller account and optimize listings",
          "Launch products with promotional pricing and PPC campaigns",
          "Monitor performance and optimize based on data"
        ],
        timeline: "12 weeks",
        budget: "$2000-8000",
        successMetrics: "Products launched, first 50+ sales, PPC campaigns active"
      }
    ],
    phase2: [
      {
        title: "Sales Optimization & Scaling (Month 4-8)",
        steps: [
          "Optimize product listings based on sales data",
          "Scale successful PPC campaigns and advertising spend",
          "Implement inventory management and reorder systems",
          "Build relationships with top-performing suppliers",
          "Develop customer service and review management systems"
        ],
        timeline: "4-5 months",
        budget: "$3000-12000",
        successMetrics: "200+ monthly sales, $10K+ monthly revenue, optimized listings"
      },
      {
        title: "Product Expansion & Brand Building (Month 6-12)",
        steps: [
          "Launch additional products in successful categories",
          "Develop private label products and exclusive relationships",
          "Create Amazon brand store and enhanced content",
          "Implement email marketing and customer retention strategies",
          "Build relationships with Amazon account managers"
        ],
        timeline: "6-7 months",
        budget: "$5000-20000",
        successMetrics: "10+ products, private label products, $25K+ monthly revenue"
      }
    ],
    phase3: [
      {
        title: "Multi-Platform & International Expansion (Month 12-18)",
        steps: [
          "Expand to additional Amazon marketplaces globally",
          "Launch products on other e-commerce platforms",
          "Develop wholesale and B2B sales channels",
          "Create proprietary product development processes",
          "Hire team members for operations and customer service"
        ],
        timeline: "6 months",
        budget: "$20000-50000",
        successMetrics: "5+ marketplaces, wholesale channels, $50K+ monthly revenue"
      },
      {
        title: "FBA Empire & Exit Strategy (Year 2+)",
        steps: [
          "Launch multiple FBA businesses in different niches",
          "Develop proprietary product research and development software",
          "Create training programs for other FBA sellers",
          "Build a portfolio of successful FBA businesses",
          "Consider selling businesses or creating FBA agency"
        ],
        timeline: "Ongoing",
        budget: "$50000+",
        successMetrics: "Multiple FBA businesses, $100K+ monthly revenue, exit options"
      }
    ]
  },
  'podcasting': {
    phase1: [
      {
        title: "Show Concept & Equipment Setup (Week 1-3)",
        steps: [
          "Define your podcast concept and target audience",
          "Research successful podcasts in your niche",
          "Purchase essential recording equipment (microphone, headphones)",
          "Set up recording software and hosting platform",
          "Create show format and episode structure"
        ],
        timeline: "3 weeks",
        budget: "$200-500",
        successMetrics: "Concept defined, equipment purchased, hosting platform setup"
      },
      {
        title: "Content Creation & Launch (Week 4-12)",
        steps: [
          "Record and edit first 10-15 episodes",
          "Create show artwork and promotional materials",
          "Launch podcast on major platforms (Spotify, Apple, Google)",
          "Implement SEO optimization for show descriptions",
          "Build initial audience through social media promotion"
        ],
        timeline: "8 weeks",
        budget: "$100-300",
        successMetrics: "15+ episodes published, podcast launched, first 100+ listeners"
      }
    ],
    phase2: [
      {
        title: "Audience Growth & Monetization (Month 3-6)",
        steps: [
          "Apply for podcast advertising networks and sponsorships",
          "Implement email marketing and audience building strategies",
          "Create premium content and bonus episodes",
          "Build relationships with other podcasters in your niche",
          "Develop merchandise and digital product offerings"
        ],
        timeline: "3-4 months",
        budget: "$300-800",
        successMetrics: "1000+ monthly listeners, first sponsorships, $500+ monthly income"
      },
      {
        title: "Content Expansion & Brand Building (Month 4-8)",
        steps: [
          "Launch additional podcast shows in related niches",
          "Create live events and speaking opportunities",
          "Develop your personal brand as podcast host",
          "Build strategic partnerships with brands and influencers",
          "Implement advanced analytics and audience insights"
        ],
        timeline: "4-5 months",
        budget: "$500-1500",
        successMetrics: "3+ shows, personal brand established, $1K+ monthly income"
      }
    ],
    phase3: [
      {
        title: "Scale & Diversify (Month 8-12)",
        steps: [
          "Launch podcast network with multiple shows",
          "Create podcast production company for other creators",
          "Develop proprietary podcast analytics and tools",
          "Hire team members for production and marketing",
          "Build multiple revenue streams beyond podcasting"
        ],
        timeline: "4-5 months",
        budget: "$1500-5000",
        successMetrics: "Podcast network, production company, $5K+ monthly income"
      },
      {
        title: "Media Empire & Industry Leadership (Year 1+)",
        steps: [
          "Launch podcast hosting and distribution platform",
          "Create training programs for other podcasters",
          "Develop proprietary podcast technologies",
          "Secure media partnerships and syndication deals",
          "Consider selling podcast network or entire business"
        ],
        timeline: "Ongoing",
        budget: "$5000+",
        successMetrics: "Podcast platform, training programs, $15K+ monthly income"
      }
    ]
  },
  'ghostwriting': {
    phase1: [
      {
        title: "Portfolio Building & Setup (Week 1-3)",
        steps: [
          "Create professional website and ghostwriting portfolio",
          "Write 10-15 sample pieces in different styles and genres",
          "Set up profiles on ghostwriting platforms and job boards",
          "Research target industries and client types",
          "Set competitive initial rates for ghostwriting services"
        ],
        timeline: "3 weeks",
        budget: "$100-300",
        successMetrics: "Website launched, portfolio with 15+ samples, first client inquiry"
      },
      {
        title: "First Clients & Service Delivery (Week 4-8)",
        steps: [
          "Apply to 20+ ghostwriting job postings daily",
          "Accept 3-5 small projects to build portfolio",
          "Deliver exceptional work and collect testimonials",
          "Establish clear communication protocols with clients",
          "Create templates for common ghostwriting projects"
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
          "Focus on high-value ghostwriting projects and industries",
          "Develop specialized ghostwriting services",
          "Build long-term client relationships",
          "Create case studies showcasing successful projects"
        ],
        timeline: "2-3 months",
        budget: "$200-500",
        successMetrics: "15+ clients, 20% rate increase, $4K+ monthly income"
      },
      {
        title: "Service Expansion & Brand Building (Month 3-6)",
        steps: [
          "Add new ghostwriting services (books, speeches, content)",
          "Develop your personal brand as ghostwriting expert",
          "Create signature ghostwriting frameworks",
          "Build email list of prospects and clients",
          "Start networking with publishers and literary agents"
        ],
        timeline: "3-4 months",
        budget: "$300-800",
        successMetrics: "25+ clients, personal brand established, $6K+ monthly income"
      }
    ],
    phase3: [
      {
        title: "Scale & Team Building (Month 6-12)",
        steps: [
          "Hire junior ghostwriters and editors",
          "Create training programs for team members",
          "Develop proprietary ghostwriting methodologies",
          "Launch online courses teaching ghostwriting",
          "Build strategic partnerships with publishers and agents"
        ],
        timeline: "6 months",
        budget: "$1000-3000",
        successMetrics: "Team of 5+ ghostwriters, $12K+ monthly income, courses launched"
      },
      {
        title: "Ghostwriting Agency & Industry Leadership (Year 1+)",
        steps: [
          "Launch your own ghostwriting agency",
          "Hire full-time employees for core services",
          "Develop enterprise-level client relationships",
          "Create multiple service lines and revenue streams",
          "Become recognized industry leader and speaker"
        ],
        timeline: "Ongoing",
        budget: "$3000+",
        successMetrics: "Agency with 10+ ghostwriters, $25K+ monthly revenue, industry recognition"
      }
    ]
  },
  'dropshipping': {
    phase1: [
      {
        title: "Product Research & Store Setup (Week 1-4)",
        steps: [
          "Research profitable dropshipping products using tools like Oberlo",
          "Validate product demand through Google Trends and social media",
          "Set up Shopify store with professional theme and apps",
          "Create compelling product listings with high-quality images",
          "Set up payment processing and shipping calculators"
        ],
        timeline: "4 weeks",
        budget: "$500-2000",
        successMetrics: "Store launched, 20+ products listed, payment processing setup"
      },
      {
        title: "Launch & Initial Marketing (Week 5-12)",
        steps: [
          "Launch store with social media announcement",
          "Set up Google Analytics and Facebook Pixel tracking",
          "Start with low-budget Facebook and Instagram ads ($20-50/day)",
          "Implement email marketing with welcome series",
          "Focus on SEO optimization for organic traffic growth"
        ],
        timeline: "8 weeks",
        budget: "$1000-3000",
        successMetrics: "First 20+ sales, 100+ email subscribers, $200+ daily ad spend"
      }
    ],
    phase2: [
      {
        title: "Optimization & Customer Acquisition (Month 3-6)",
        steps: [
          "Analyze conversion data and optimize product pages",
          "Scale successful ad campaigns and test new marketing channels",
          "Build customer loyalty through email marketing",
          "Expand product line based on customer feedback",
          "Implement customer service systems and review management"
        ],
        timeline: "3-4 months",
        budget: "$2000-8000",
        successMetrics: "100+ customers, 3%+ conversion rate, $8K+ monthly revenue"
      },
      {
        title: "Scaling & Brand Building (Month 4-8)",
        steps: [
          "Increase advertising budget to $300-800/day across channels",
          "Develop private label products and exclusive supplier relationships",
          "Build brand awareness through influencer partnerships",
          "Launch customer loyalty program and subscription services",
          "Expand to additional sales channels (Amazon, eBay)"
        ],
        timeline: "4-5 months",
        budget: "$5000-15000",
        successMetrics: "$25K+ monthly revenue, 500+ customers, brand recognition"
      }
    ],
    phase3: [
      {
        title: "Scale & Diversify (Month 8-12)",
        steps: [
          "Launch multiple dropshipping stores in different niches",
          "Develop automated systems for inventory management",
          "Hire team members for customer service and marketing",
          "Create wholesale and B2B sales channels",
          "Invest in advanced analytics and marketing automation"
        ],
        timeline: "4-5 months",
        budget: "$10000-25000",
        successMetrics: "5+ stores, automated systems, $50K+ monthly revenue"
      },
      {
        title: "Dropshipping Empire & Exit Strategy (Year 1+)",
        steps: [
          "Launch dropshipping agency for other entrepreneurs",
          "Develop proprietary dropshipping software and tools",
          "Create training programs teaching dropshipping",
          "Build a portfolio of successful dropshipping businesses",
          "Consider selling stores or entire business"
        ],
        timeline: "Ongoing",
        budget: "$25000+",
        successMetrics: "Dropshipping agency, training programs, $100K+ monthly revenue"
      }
    ]
  },
  'real-estate-investing': {
    phase1: [
      {
        title: "Education & Market Research (Week 1-6)",
        steps: [
          "Learn real estate investing fundamentals and strategies",
          "Research local real estate markets and investment opportunities",
          "Join real estate investment groups and networking events",
          "Set up business entity and banking relationships",
          "Create investment criteria and property analysis tools"
        ],
        timeline: "6 weeks",
        budget: "$500-1500",
        successMetrics: "Education completed, market research done, business setup"
      },
      {
        title: "First Investment & Property Analysis (Week 7-16)",
        steps: [
          "Analyze 50+ potential investment properties",
          "Build relationships with real estate agents and wholesalers",
          "Make first 2-3 offers on properties",
          "Conduct thorough due diligence and property inspections",
          "Secure financing and close first investment property"
        ],
        timeline: "10 weeks",
        budget: "$2000-10000",
        successMetrics: "First property acquired, financing secured, rental income started"
      }
    ],
    phase2: [
      {
        title: "Portfolio Building & Optimization (Month 4-8)",
        steps: [
          "Implement property management systems and processes",
          "Acquire 2-3 additional investment properties",
          "Optimize rental rates and property management",
          "Build relationships with contractors and service providers",
          "Develop refinancing and equity extraction strategies"
        ],
        timeline: "4-5 months",
        budget: "$15000-50000",
        successMetrics: "5+ properties, $10K+ monthly rental income, optimized management"
      },
      {
        title: "Scale & Diversify Strategies (Month 6-12)",
        steps: [
          "Expand to different real estate investment strategies",
          "Develop partnerships with other investors",
          "Create automated systems for property analysis",
          "Build team for property management and acquisitions",
          "Explore commercial real estate opportunities"
        ],
        timeline: "6-7 months",
        budget: "$25000-75000",
        successMetrics: "10+ properties, multiple strategies, $25K+ monthly income"
      }
    ],
    phase3: [
      {
        title: "Real Estate Empire & Syndication (Month 12-18)",
        steps: [
          "Launch real estate investment funds or syndications",
          "Develop proprietary investment analysis software",
          "Create training programs for other investors",
          "Build strategic partnerships with institutional investors",
          "Expand to multiple markets and property types"
        ],
        timeline: "6 months",
        budget: "$50000-150000",
        successMetrics: "Investment funds launched, software developed, $50K+ monthly income"
      },
      {
        title: "Industry Leadership & Legacy Building (Year 2+)",
        steps: [
          "Become recognized real estate investment expert",
          "Launch real estate investment education company",
          "Develop proprietary investment methodologies",
          "Create multiple revenue streams beyond real estate",
          "Build a legacy portfolio for generational wealth"
        ],
        timeline: "Ongoing",
        budget: "$100000+",
        successMetrics: "Industry recognition, education company, $100K+ monthly income"
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
console.log('\n🎉 ALL remaining business models updated successfully!');
console.log('📝 Now ALL 25 business models have comprehensive implementation phases!');
