import { BusinessPath } from "./types";

export const businessPaths: BusinessPath[] = [
  {
    id: "content-creation",
    name: "Content Creation / UGC",
    description:
      "Create videos, photos, blogs, or social media posts for personal brands or other businesses",
    detailedDescription:
      "Content creation and user-generated content (UGC) involve producing videos, photos, blogs, or social media posts for personal brands or other businesses. UGC creators are often paid by companies to create native-style content that aligns with the brand's identity but feels organic to viewers.",
    fitScore: 0,
    timeToProfit: "2-4 weeks",
    startupCost: "$0-300",
    potentialIncome: "$0-20K/month",
    pros: [
      "Extremely low barrier to entry",
      "Creative freedom and self-expression",
      "Potential for large income with no inventory",
      "Flexible work schedule",
      "Builds long-term personal brand equity",
      "Opens opportunities in many niches",
    ],
    cons: [
      "Algorithms can change rapidly",
      "Time-intensive content planning and editing",
      "Emotional toll of public feedback",
      "Inconsistent income early on",
      "High competition and saturation",
      "Burnout is common without balance",
    ],
    tools: ["CapCut", "Canva", "TikTok", "Instagram", "Notion"],
    skills: [
      "Creative thinking",
      "Communication",
      "Social media",
      "Visual storytelling",
      "Trend awareness",
    ],
    icon: "TrendingUp",
    emoji: "🚀",
    marketSize: "Creator economy valued at over $104B",
    averageIncome: {
      beginner: "$0-500/month",
      intermediate: "$500-5K/month",
      advanced: "$5K-20K/month",
    },
    userStruggles: [
      "Consistency challenges",
      "Audience growth",
      "Monetization timing",
      "Negative feedback handling",
    ],
    solutions: [
      "Content calendar planning",
      "Focus on niche audience",
      "Diversify revenue streams",
      "Build thick skin and community",
    ],
    bestFitPersonality: [
      "Creative and innovative",
      "Patient and persistent",
      "Comfortable on camera",
      "Resilient to criticism",
    ],
    resources: {
      platforms: ["YouTube", "TikTok", "Instagram", "Creator Now"],
      learning: ["YouTube Creator Academy", "Creator economy courses"],
      tools: ["CapCut", "Canva", "Later", "Notion"],
    },
    actionPlan: {
      phase1: [
        {
          title: "Foundation Setup (Week 1-2)",
          steps: [
            "Research and choose your content niche (lifestyle, tech, fitness, etc.)",
            "Set up professional social media accounts (TikTok, Instagram, YouTube)",
            "Invest in basic equipment: smartphone with good camera, ring light ($50-100)",
            "Create a content calendar with 3-5 posts per week",
            "Study top creators in your niche and analyze their content style"
          ],
          timeline: "1-2 weeks",
          budget: "$50-100",
          successMetrics: "Consistent posting schedule, 100+ followers"
        },
        {
          title: "Content Creation & Consistency (Week 3-8)",
          steps: [
            "Post 3-5 times per week following your content calendar",
            "Experiment with different content formats (videos, photos, stories)",
            "Engage with your audience by responding to comments within 2 hours",
            "Use trending hashtags and sounds to increase discoverability",
            "Collaborate with 2-3 other creators in your niche"
          ],
          timeline: "6 weeks",
          budget: "$0-50",
          successMetrics: "500+ followers, 5%+ engagement rate"
        }
      ],
      phase2: [
        {
          title: "Audience Growth & Engagement (Month 2-4)",
          steps: [
            "Implement a consistent posting schedule (same times daily)",
            "Create signature content series that your audience expects",
            "Engage with 50+ accounts daily (comments, likes, shares)",
            "Analyze your top-performing content and replicate success patterns",
            "Start networking with brands and other creators in your niche"
          ],
          timeline: "2-3 months",
          budget: "$100-300",
          successMetrics: "5K+ followers, 8%+ engagement rate, brand inquiries"
        },
        {
          title: "Monetization Strategy (Month 3-6)",
          steps: [
            "Apply for TikTok Creator Fund and YouTube Partner Program",
            "Create a media kit showcasing your audience demographics",
            "Reach out to 10+ brands in your niche for collaboration opportunities",
            "Set up affiliate marketing partnerships with relevant products",
            "Launch your first digital product (e-book, course, template)"
          ],
          timeline: "3-4 months",
          budget: "$200-500",
          successMetrics: "First $500+ month, 3+ brand partnerships"
        }
      ],
      phase3: [
        {
          title: "Scale & Diversify (Month 6-12)",
          steps: [
            "Expand to 2-3 additional platforms (LinkedIn, Twitter, Pinterest)",
            "Launch a membership program or exclusive content for super fans",
            "Create and sell your own branded merchandise",
            "Host virtual events or workshops for your community",
            "Build an email list and start email marketing campaigns"
          ],
          timeline: "6 months",
          budget: "$500-1000",
          successMetrics: "$2K+ monthly income, 50K+ total followers"
        },
        {
          title: "Business Expansion (Year 1+)",
          steps: [
            "Hire virtual assistants to help with content creation and management",
            "Launch your own agency to manage other creators",
            "Create online courses teaching others your content creation methods",
            "Secure speaking engagements and media appearances",
            "Invest in advanced equipment and studio setup"
          ],
          timeline: "Ongoing",
          budget: "$1000+",
          successMetrics: "$5K+ monthly income, multiple income streams"
        }
      ],
    },
  },
  {
    id: "freelancing",
    name: "Freelancing",
    description:
      "Offer specialized services to clients on a project or contract basis",
    detailedDescription:
      "Freelancing involves offering specialized services to clients on a project or contract basis. This could include writing, graphic design, web development, marketing, consulting, or any skill-based service. Freelancers work independently, often with multiple clients, and have the flexibility to choose their projects and set their rates.",
    fitScore: 0,
    timeToProfit: "1-2 weeks",
    startupCost: "$0-500",
    potentialIncome: "$1K-15K+/month",
    pros: [
      "Quick to start with existing skills",
      "Complete schedule flexibility",
      "Choose your own clients and projects",
      "No inventory or upfront costs",
      "Can work from anywhere",
      "Direct relationship with income and effort",
    ],
    cons: [
      "Income can be inconsistent",
      "No benefits or job security",
      "Constant client acquisition needed",
      "Time-for-money limitation",
      "Handling all business aspects alone",
      "Potential for scope creep and difficult clients",
    ],
    tools: ["Upwork", "Fiverr", "LinkedIn", "Slack", "Zoom"],
    skills: [
      "Specialized expertise",
      "Client communication",
      "Project management",
      "Time management",
      "Networking",
    ],
    icon: "Briefcase",
    emoji: "🧑‍💻",
    marketSize: "Freelance economy worth $400B+ globally",
    averageIncome: {
      beginner: "$500-2K/month",
      intermediate: "$2K-8K/month",
      advanced: "$8K-15K+/month",
    },
    userStruggles: [
      "Finding consistent clients",
      "Pricing services appropriately",
      "Managing multiple projects",
      "Dealing with difficult clients",
    ],
    solutions: [
      "Build strong portfolio and testimonials",
      "Develop recurring client relationships",
      "Use project management tools",
      "Set clear boundaries and contracts",
    ],
    bestFitPersonality: [
      "Self-motivated and disciplined",
      "Strong communication skills",
      "Adaptable to different clients",
      "Business-minded",
    ],
    resources: {
      platforms: ["Upwork", "Fiverr", "LinkedIn", "Freelancer"],
      learning: ["Freelancer courses", "Industry certifications"],
      tools: ["Slack", "Zoom", "Trello", "FreshBooks"],
    },
    actionPlan: {
      phase1: [
        {
          title: "Platform Setup & Portfolio (Week 1-2)",
          steps: [
            "Create professional profiles on Upwork, Fiverr, and 99designs",
            "Build a portfolio showcasing your best 5-10 pieces of work",
            "Research competitive rates in your niche and set initial pricing",
            "Set up a professional email and business phone number",
            "Create a simple website or landing page to showcase your services"
          ],
          timeline: "1-2 weeks",
          budget: "$0-100",
          successMetrics: "3+ platform profiles, portfolio with 10+ samples, first client inquiry"
        },
        {
          title: "First Clients & Service Delivery (Week 3-6)",
          steps: [
            "Apply to 20+ relevant job postings daily with personalized proposals",
            "Accept 2-3 small projects to build your rating and reviews",
            "Deliver exceptional work and ask for testimonials",
            "Establish clear communication protocols with clients",
            "Create templates for common project types to speed up delivery"
          ],
          timeline: "4 weeks",
          budget: "$0-50",
          successMetrics: "First 3-5 completed projects, 4.5+ star rating, 2+ testimonials"
        }
      ],
      phase2: [
        {
          title: "Brand Building & Client Relationships (Month 2-4)",
          steps: [
            "Develop a personal brand with consistent visual identity",
            "Create service packages with clear pricing tiers (Basic, Standard, Premium)",
            "Build an email list of past clients and prospects",
            "Network with other freelancers in your niche",
            "Ask satisfied clients for referrals and repeat business"
          ],
          timeline: "2-3 months",
          budget: "$100-300",
          successMetrics: "Personal brand established, 3 pricing tiers, 10+ repeat clients"
        },
        {
          title: "Service Expansion & Rate Increases (Month 3-6)",
          steps: [
            "Gradually increase your rates by 10-20% every 3 months",
            "Add complementary services to your offerings",
            "Create retainer packages for long-term clients",
            "Develop case studies showcasing your best work",
            "Start targeting higher-value clients and projects"
          ],
          timeline: "3-4 months",
          budget: "$200-500",
          successMetrics: "20% rate increase, 5+ retainer clients, $2K+ monthly income"
        }
      ],
      phase3: [
        {
          title: "Scale & Team Building (Month 6-12)",
          steps: [
            "Hire subcontractors or virtual assistants for routine tasks",
            "Create systems and processes to manage multiple projects",
            "Focus on high-value, long-term client relationships",
            "Develop passive income streams (courses, templates, products)",
            "Build a referral network with other professionals"
          ],
          timeline: "6 months",
          budget: "$500-1000",
          successMetrics: "Team of 2-3 people, $5K+ monthly income, 80% repeat clients"
        },
        {
          title: "Agency Launch & Business Expansion (Year 1+)",
          steps: [
            "Launch your own agency or consultancy firm",
            "Hire full-time employees for core services",
            "Develop proprietary methodologies and frameworks",
            "Secure enterprise-level clients and contracts",
            "Create multiple service lines and revenue streams"
          ],
          timeline: "Ongoing",
          budget: "$1000+",
          successMetrics: "Agency with 5+ employees, $20K+ monthly revenue, enterprise clients"
        }
      ],
    },
  },
  {
    id: "affiliate-marketing",
    name: "Affiliate Marketing",
    description:
      "Promote other companies' products and earn commissions on successful referrals",
    detailedDescription:
      "Affiliate marketing involves promoting other companies' products or services and earning a commission for each sale or lead generated through your referral. This can be done through blogs, social media, email marketing, or paid advertising.",
    fitScore: 0,
    timeToProfit: "3-6 months",
    startupCost: "$0-1000",
    potentialIncome: "$0-50K+/month",
    pros: [
      "No product creation required",
      "Passive income potential",
      "Low startup costs",
      "Flexible schedule",
      "Scalable income",
      "Work from anywhere",
    ],
    cons: [
      "Takes time to build audience",
      "Dependent on other companies",
      "Commission-based income",
      "High competition",
      "Need to constantly adapt to changes",
      "Building trust takes time",
    ],
    tools: [
      "WordPress",
      "ConvertKit",
      "Google Analytics",
      "Canva",
      "Social media platforms",
    ],
    skills: [
      "Content creation",
      "SEO",
      "Email marketing",
      "Social media marketing",
      "Analytics",
    ],
    icon: "TrendingUp",
    emoji: "🔗",
    marketSize: "Affiliate marketing industry worth $17B+ globally",
    averageIncome: {
      beginner: "$0-500/month",
      intermediate: "$500-5K/month",
      advanced: "$5K-50K+/month",
    },
    userStruggles: [
      "Building initial audience",
      "Finding profitable niches",
      "Creating engaging content",
      "Tracking and optimizing campaigns",
    ],
    solutions: [
      "Focus on one niche initially",
      "Provide genuine value first",
      "Use analytics to optimize",
      "Build email list early",
    ],
    bestFitPersonality: [
      "Patient and persistent",
      "Good at building relationships",
      "Analytical mindset",
      "Marketing-oriented",
    ],
    resources: {
      platforms: [
        "Amazon Associates",
        "ShareASale",
        "CJ Affiliate",
        "ClickBank",
      ],
      learning: ["Affiliate marketing courses", "Industry blogs"],
      tools: ["WordPress", "ConvertKit", "Google Analytics", "Canva"],
    },
    actionPlan: {
      phase1: [
        {
          title: "Niche Selection & Platform Setup (Week 1-3)",
          steps: [
            "Research and choose a profitable niche (health, finance, tech, lifestyle)",
            "Set up a WordPress blog or YouTube channel as your primary platform",
            "Research top affiliate programs in your niche (Amazon Associates, ShareASale)",
            "Create 10-15 pieces of valuable content to establish authority",
            "Set up Google Analytics and basic tracking tools"
          ],
          timeline: "3 weeks",
          budget: "$50-200",
          successMetrics: "Platform established, 15+ content pieces, first affiliate program approval"
        },
        {
          title: "Content Creation & Audience Building (Week 4-12)",
          steps: [
            "Publish 3-5 high-quality content pieces weekly",
            "Focus on SEO optimization for organic traffic growth",
            "Create product reviews and comparison guides",
            "Build an email list with lead magnets and opt-in forms",
            "Engage with your audience through comments and social media"
          ],
          timeline: "8 weeks",
          budget: "$100-300",
          successMetrics: "100+ email subscribers, 1000+ monthly visitors, 5+ affiliate links active"
        }
      ],
      phase2: [
        {
          title: "Monetization & Optimization (Month 3-6)",
          steps: [
            "Join 3-5 additional affiliate programs in your niche",
            "Create detailed product review content with affiliate links",
            "Implement email marketing campaigns to promote products",
            "Use A/B testing to optimize conversion rates",
            "Focus on high-commission products and recurring revenue"
          ],
          timeline: "3-4 months",
          budget: "$200-500",
          successMetrics: "First $100+ affiliate income month, 1000+ email subscribers, 10+ active programs"
        },
        {
          title: "Traffic Scaling & Brand Building (Month 4-8)",
          steps: [
            "Expand to additional platforms (YouTube, TikTok, Pinterest)",
            "Create signature content series that drive consistent traffic",
            "Build relationships with product creators and brands",
            "Develop your personal brand and authority in the niche",
            "Start experimenting with paid advertising (Facebook, Google)"
          ],
          timeline: "4-5 months",
          budget: "$300-800",
          successMetrics: "5000+ monthly visitors, $500+ monthly income, personal brand established"
        }
      ],
      phase3: [
        {
          title: "Scale & Diversify (Month 8-12)",
          steps: [
            "Launch your own digital products (courses, e-books, templates)",
            "Create a membership site for exclusive content and community",
            "Hire virtual assistants to help with content creation",
            "Develop strategic partnerships with major brands",
            "Expand to international markets and new niches"
          ],
          timeline: "4-5 months",
          budget: "$500-1500",
          successMetrics: "$2K+ monthly income, 10K+ monthly visitors, multiple income streams"
        },
        {
          title: "Business Expansion & Automation (Year 1+)",
          steps: [
            "Build an affiliate marketing agency or network",
            "Create automated systems for content creation and promotion",
            "Develop proprietary tools and methodologies",
            "Secure exclusive affiliate partnerships and deals",
            "Invest in advanced analytics and automation tools"
          ],
          timeline: "Ongoing",
          budget: "$1000+",
          successMetrics: "$10K+ monthly income, agency with team, automated systems"
        }
      ],
    },
  },
  {
    id: "online-coaching",
    name: "Online Coaching",
    description:
      "Provide expertise and guidance to clients in your area of specialization",
    detailedDescription:
      "Online coaching involves providing expertise, guidance, and strategic advice to clients in your area of specialization. This could range from business consulting to life coaching, fitness training, or career guidance. Sessions are typically conducted via video calls, and packages can include one-on-one sessions, group coaching, or digital courses.",
    fitScore: 0,
    timeToProfit: "1-2 weeks",
    startupCost: "$0-200",
    potentialIncome: "$1K-10K/month",
    pros: [
      "Use existing knowledge and skills",
      "Flexible scheduling",
      "High hourly rates possible",
      "Rewarding work helping others",
      "No inventory needed",
      "Global student reach",
    ],
    cons: [
      "Time-for-money limitation",
      "Seasonal demand variations",
      "Need to manage difficult students",
      "Preparation time required",
      "Competition from platforms",
      "Inconsistent income",
    ],
    tools: ["Zoom", "Google Meet", "Teachable", "Udemy", "Calendly"],
    skills: [
      "Subject expertise",
      "Teaching ability",
      "Patience",
      "Communication",
      "Technology",
    ],
    icon: "BookOpen",
    emoji: "🧑‍💼",
    marketSize: "Online tutoring market worth $15B+ globally",
    averageIncome: {
      beginner: "$500-2K/month",
      intermediate: "$2K-5K/month",
      advanced: "$5K-10K/month",
    },
    userStruggles: [
      "Finding students initially",
      "Setting appropriate rates",
      "Managing scheduling",
      "Handling payment processing",
    ],
    solutions: [
      "Join established platforms first",
      "Create valuable free content",
      "Build student testimonials",
      "Use scheduling tools",
    ],
    bestFitPersonality: [
      "Patient and encouraging",
      "Clear communicator",
      "Subject matter expert",
      "Enjoys helping others",
    ],
    resources: {
      platforms: ["Wyzant", "Tutor.com", "Preply", "iTalki"],
      learning: ["Teaching certification courses", "Online education training"],
      tools: ["Zoom", "Google Meet", "Calendly", "PayPal"],
    },
    actionPlan: {
      phase1: [
        {
          title: "Expertise Definition & Platform Setup (Week 1-2)",
          steps: [
            "Define your specific coaching niche and target audience",
            "Create professional profiles on coaching platforms (Wyzant, Preply, iTalki)",
            "Set up Zoom, Google Meet, and scheduling tools (Calendly)",
            "Create a simple website or landing page showcasing your services",
            "Set competitive initial rates based on market research"
          ],
          timeline: "1-2 weeks",
          budget: "$0-100",
          successMetrics: "3+ platform profiles, website established, first student inquiry"
        },
        {
          title: "First Students & Service Delivery (Week 3-6)",
          steps: [
            "Accept your first 2-3 students at introductory rates",
            "Create structured lesson plans and teaching materials",
            "Conduct coaching sessions and collect feedback",
            "Ask satisfied students for testimonials and referrals",
            "Refine your coaching methodology based on student results"
          ],
          timeline: "4 weeks",
          budget: "$0-50",
          successMetrics: "First 3-5 students, 4.5+ star rating, 2+ testimonials"
        }
      ],
      phase2: [
        {
          title: "Reputation Building & Rate Increases (Month 2-4)",
          steps: [
            "Gradually increase your rates by 15-25% every 2 months",
            "Develop comprehensive teaching materials and resources",
            "Build a portfolio of successful student outcomes",
            "Expand to additional coaching platforms and directories",
            "Create free content (blog posts, videos) to attract students"
          ],
          timeline: "2-3 months",
          budget: "$100-300",
          successMetrics: "10+ students, 20% rate increase, portfolio established"
        },
        {
          title: "Service Expansion & Brand Building (Month 3-6)",
          steps: [
            "Add group coaching sessions and workshops",
            "Create signature coaching programs and packages",
            "Develop your personal brand and authority in your niche",
            "Build an email list of prospects and past students",
            "Start networking with other coaches and professionals"
          ],
          timeline: "3-4 months",
          budget: "$200-500",
          successMetrics: "Group sessions launched, personal brand established, $2K+ monthly income"
        }
      ],
      phase3: [
        {
          title: "Scale & Product Creation (Month 6-12)",
          steps: [
            "Create and launch your first online course or digital product",
            "Develop a membership program for ongoing student support",
            "Hire assistant coaches or virtual assistants",
            "Secure speaking engagements and media appearances",
            "Build strategic partnerships with complementary services"
          ],
          timeline: "6 months",
          budget: "$500-1500",
          successMetrics: "First course launched, membership program active, $5K+ monthly income"
        },
        {
          title: "Agency Launch & Business Expansion (Year 1+)",
          steps: [
            "Launch your own coaching agency or training company",
            "Hire full-time coaches and support staff",
            "Develop proprietary coaching methodologies and frameworks",
            "Create multiple revenue streams (courses, consulting, speaking)",
            "Expand to corporate training and enterprise clients"
          ],
          timeline: "Ongoing",
          budget: "$1000+",
          successMetrics: "Agency with 5+ coaches, $15K+ monthly revenue, corporate clients"
        }
      ],
    },
  },
  {
    id: "e-commerce",
    name: "E-commerce Store",
    description:
      "Sell physical or digital products online through your own store",
    detailedDescription:
      "E-commerce involves creating an online store to sell products directly to consumers. This can include physical products, digital downloads, print-on-demand items, or dropshipping products from suppliers.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "2-6 months",
    startupCost: "$500-5K",
    potentialIncome: "$1K-100K+/month",
    pros: [
      "Scalable business model",
      "Passive income potential",
      "Global customer reach",
      "Multiple revenue streams",
      "Build valuable asset",
      "Creative product control",
    ],
    cons: [
      "High initial investment",
      "Inventory management",
      "Customer service demands",
      "Marketing costs",
      "Competition pressure",
      "Technical complexity",
    ],
    tools: [
      "Shopify",
      "WooCommerce",
      "Facebook Ads",
      "Google Analytics",
      "Klaviyo",
    ],
    skills: [
      "Digital marketing",
      "Product sourcing",
      "Customer service",
      "Analytics",
      "Design",
    ],
    icon: "Star",
    emoji: "🛒",
    marketSize: "Global e-commerce worth $6.2T+ annually",
    averageIncome: {
      beginner: "$0-2K/month",
      intermediate: "$2K-15K/month",
      advanced: "$15K-100K+/month",
    },
    userStruggles: [
      "Finding profitable products",
      "Driving traffic to store",
      "Managing inventory",
      "Converting visitors to sales",
    ],
    solutions: [
      "Start with validated products",
      "Focus on SEO and content marketing",
      "Use inventory management tools",
      "Optimize conversion funnel",
    ],
    bestFitPersonality: [
      "Entrepreneurial mindset",
      "Detail-oriented",
      "Marketing-focused",
      "Customer-centric",
    ],
    resources: {
      platforms: ["Shopify", "WooCommerce", "BigCommerce", "Etsy"],
      learning: ["E-commerce courses", "Dropshipping guides"],
      tools: ["Shopify", "Facebook Ads", "Google Analytics", "Klaviyo"],
    },
    actionPlan: {
      phase1: [
        {
          title: "Product Research & Store Setup (Week 1-4)",
          steps: [
            "Research profitable product niches using tools like Jungle Scout or Helium 10",
            "Validate product demand through Google Trends and social media research",
            "Set up Shopify store with professional theme and essential apps",
            "Source initial products from reliable suppliers (AliExpress, local manufacturers)",
            "Create compelling product listings with high-quality images and descriptions"
          ],
          timeline: "4 weeks",
          budget: "$500-2000",
          successMetrics: "Store launched, 10+ products listed, first supplier relationships"
        },
        {
          title: "Launch & Initial Marketing (Week 5-12)",
          steps: [
            "Launch store with social media announcement and email list building",
            "Set up Google Analytics, Facebook Pixel, and conversion tracking",
            "Start with low-budget Facebook and Instagram ads ($20-50/day)",
            "Implement email marketing with welcome series and abandoned cart flows",
            "Focus on SEO optimization for organic traffic growth"
          ],
          timeline: "8 weeks",
          budget: "$1000-3000",
          successMetrics: "First 10+ sales, 100+ email subscribers, $100+ daily ad spend"
        }
      ],
      phase2: [
        {
          title: "Optimization & Customer Acquisition (Month 3-6)",
          steps: [
            "Analyze conversion data and optimize product pages and checkout flow",
            "Scale successful ad campaigns and test new marketing channels",
            "Build customer loyalty through email marketing and retargeting",
            "Expand product line based on customer feedback and sales data",
            "Implement customer service systems and review management"
          ],
          timeline: "3-4 months",
          budget: "$2000-8000",
          successMetrics: "100+ customers, 3%+ conversion rate, $5K+ monthly revenue"
        },
        {
          title: "Scaling & Brand Building (Month 4-8)",
          steps: [
            "Increase advertising budget to $200-500/day across multiple channels",
            "Develop private label products and exclusive supplier relationships",
            "Build brand awareness through influencer partnerships and PR",
            "Launch customer loyalty program and subscription services",
            "Expand to additional sales channels (Amazon, eBay, wholesale)"
          ],
          timeline: "4-5 months",
          budget: "$5000-15000",
          successMetrics: "$20K+ monthly revenue, 500+ customers, brand recognition"
        }
      ],
      phase3: [
        {
          title: "Scale & Diversify (Month 8-12)",
          steps: [
            "Launch multiple product lines and expand to new niches",
            "Develop automated systems for inventory management and customer service",
            "Hire team members for customer service, marketing, and operations",
            "Create wholesale and B2B sales channels",
            "Invest in advanced analytics and marketing automation tools"
          ],
          timeline: "4-5 months",
          budget: "$10000-25000",
          successMetrics: "$50K+ monthly revenue, multiple product lines, automated systems"
        },
        {
          title: "Business Expansion & Exit Strategy (Year 1+)",
          steps: [
            "Expand to international markets and multiple store locations",
            "Develop proprietary products and intellectual property",
            "Acquire complementary businesses or merge with competitors",
            "Build a strong brand that can be franchised or sold",
            "Consider exit strategies (IPO, acquisition, private equity)"
          ],
          timeline: "Ongoing",
          budget: "$25000+",
          successMetrics: "$100K+ monthly revenue, international presence, exit valuation"
        }
      ],
    },
  },
  {
    id: "youtube-automation",
    name: "YouTube Automation",
    description:
      "Create and monetize YouTube channels with minimal personal involvement",
    detailedDescription:
      "YouTube automation involves creating YouTube channels that generate revenue through systematic content creation, often using outsourced creators, stock footage, or AI tools to minimize personal time investment.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "3-6 months",
    startupCost: "$500-2K",
    potentialIncome: "$1K-50K+/month",
    pros: [
      "Passive income potential",
      "Scalable to multiple channels",
      "No need to be on camera",
      "Multiple monetization methods",
      "Global audience reach",
      "Long-term asset building",
    ],
    cons: [
      "Algorithm dependency",
      "High competition",
      "Initial investment required",
      "Time to build audience",
      "Content creation challenges",
      "Platform policy changes",
    ],
    tools: ["TubeBuddy", "VidIQ", "Canva", "AI voice tools", "Stock footage"],
    skills: [
      "Video editing",
      "SEO optimization",
      "Market research",
      "Analytics",
      "Outsourcing",
    ],
    icon: "Play",
    emoji: "📺",
    marketSize: "YouTube ad revenue over $28B+ annually",
    averageIncome: {
      beginner: "$0-500/month",
      intermediate: "$500-5K/month",
      advanced: "$5K-50K+/month",
    },
    userStruggles: [
      "Finding profitable niches",
      "Creating engaging content",
      "Managing outsourced team",
      "Maintaining consistent uploads",
    ],
    solutions: [
      "Research trending topics",
      "Study successful channels",
      "Use project management tools",
      "Create content calendars",
    ],
    bestFitPersonality: [
      "Business-minded",
      "Patient with long-term goals",
      "Good at delegation",
      "Analytical thinker",
    ],
    resources: {
      platforms: ["YouTube Studio", "TubeBuddy", "VidIQ"],
      learning: ["YouTube automation courses", "Video marketing guides"],
      tools: ["TubeBuddy", "VidIQ", "Canva", "Murf AI"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Channel Research & Setup (Week 1-3)",
          steps: [
            "Research profitable niches with low competition and high CPM",
            "Set up YouTube channel with professional branding and description",
            "Create content calendar for first 30 videos",
            "Set up YouTube Studio and analytics tracking",
            "Research trending topics and keywords in your niche",
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
            "Build initial audience through social media promotion",
          ],
          timeline: "8 weeks",
          budget: "$200-500",
          successMetrics: "20+ videos published, 100+ subscribers, first monetization milestone"
        },
      ],
      phase2: [
        {
          title: "Monetization & Audience Growth (Month 3-6)",
          steps: [
            "Apply for YouTube Partner Program once eligible",
            "Implement mid-roll ads and optimize ad placement",
            "Create sponsored content opportunities with brands",
            "Build email list and implement affiliate marketing",
            "Analyze performance data and optimize content strategy",
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
            "Create merchandise and digital products",
          ],
          timeline: "4-5 months",
          budget: "$1000-3000",
          successMetrics: "5000+ subscribers, $500+ monthly income, 3+ channels"
        },
      ],
      phase3: [
        {
          title: "Multi-Channel Empire (Month 8-12)",
          steps: [
            "Launch 5-10 additional channels in profitable niches",
            "Develop proprietary content creation systems",
            "Hire full-time team for content management",
            "Create online courses teaching YouTube automation",
            "Build a network of content creators and partners",
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
            "Consider selling channels or entire business",
          ],
          timeline: "Ongoing",
          budget: "$8000+",
          successMetrics: "Agency with 20+ channels, $10K+ monthly income, exit options"
        },
      ],
    },
  },
  {
    id: "local-service",
    name: "Local Service Business",
    description:
      "Provide services to businesses and residents in your local area",
    detailedDescription:
      "Local service businesses provide essential services to nearby businesses and homeowners, such as cleaning, lawn care, handyman services, pet care, or professional services like accounting or consulting.",
    fitScore: 0,
    difficulty: "Easy",
    timeToProfit: "1-4 weeks",
    startupCost: "$100-2K",
    potentialIncome: "$2K-20K/month",
    pros: [
      "Quick to start earning",
      "Recurring customer relationships",
      "Lower competition online",
      "Cash-based transactions",
      "Personal relationships",
      "Essential service demand",
    ],
    cons: [
      "Limited to local market",
      "Physical presence required",
      "Weather/seasonal factors",
      "Equipment and vehicle needs",
      "Time-intensive work",
      "Limited scalability",
    ],
    tools: [
      "Google My Business",
      "Nextdoor",
      "Square",
      "QuickBooks",
      "Scheduling apps",
    ],
    skills: [
      "Service expertise",
      "Customer service",
      "Local marketing",
      "Operations",
      "Reliability",
    ],
    icon: "Target",
    emoji: "🛠️",
    marketSize: "Local services market worth $500B+ in US",
    averageIncome: {
      beginner: "$1K-3K/month",
      intermediate: "$3K-8K/month",
      advanced: "$8K-20K/month",
    },
    userStruggles: [
      "Finding first customers",
      "Pricing services competitively",
      "Managing scheduling",
      "Scaling beyond personal time",
    ],
    solutions: [
      "Start with friends and neighbors",
      "Research local competitor pricing",
      "Use scheduling software",
      "Hire help as you grow",
    ],
    bestFitPersonality: [
      "Enjoys hands-on work",
      "Good with people",
      "Reliable and trustworthy",
      "Community-oriented",
    ],
    resources: {
      platforms: ["Google My Business", "Nextdoor", "TaskRabbit", "Thumbtack"],
      learning: ["Local business guides", "Service industry training"],
      tools: ["Google My Business", "Square", "QuickBooks", "Calendly"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Service Research & Setup (Week 1-3)",
          steps: [
            "Research profitable local service niches in your area",
            "Set up business registration and insurance",
            "Create professional website and service listings",
            "Set up business phone and communication systems",
            "Research local competition and pricing",
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
            "Create service delivery checklists and processes",
          ],
          timeline: "5 weeks",
          budget: "$300-800",
          successMetrics: "First 10 clients, 4.5+ star rating, 5+ testimonials"
        },
      ],
      phase2: [
        {
          title: "Local Market Penetration (Month 2-4)",
          steps: [
            "Implement local SEO and Google My Business optimization",
            "Build relationships with local business associations",
            "Create referral programs with satisfied clients",
            "Develop service packages for different customer segments",
            "Start local advertising and community involvement",
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
            "Build partnerships with local businesses",
          ],
          timeline: "3-4 months",
          budget: "$1500-4000",
          successMetrics: "40+ clients, team of 3+ people, $15K+ monthly revenue"
        },
      ],
      phase3: [
        {
          title: "Scale & Diversify (Month 6-12)",
          steps: [
            "Expand to multiple service areas or cities",
            "Launch franchise or licensing opportunities",
            "Develop proprietary service methodologies",
            "Create online booking and management systems",
            "Build a network of service providers",
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
            "Consider franchising or selling the business",
          ],
          timeline: "Ongoing",
          budget: "$12000+",
          successMetrics: "Multiple businesses, $100K+ monthly revenue, exit options"
        },
      ],
    },
  },
  {
    id: "high-ticket-sales",
    name: "High-Ticket Sales",
    description:
      "Sell premium products or services with substantial commission potential",
    detailedDescription:
      "High-ticket sales involves selling expensive products or services, typically involving consultative sales processes, relationship building, and substantial per-transaction earnings. This can include real estate, luxury goods, B2B software, or coaching programs.",
    fitScore: 0,
    difficulty: "Hard",
    timeToProfit: "2-6 months",
    startupCost: "$0-1K",
    potentialIncome: "$5K-100K+/month",
    pros: [
      "High earnings per sale",
      "Relationship-based business",
      "Skills transfer to many industries",
      "Performance-based rewards",
      "Professional development",
      "Network building opportunities",
    ],
    cons: [
      "Inconsistent income timing",
      "High rejection rates",
      "Pressure and stress",
      "Long sales cycles",
      "Requires thick skin",
      "Performance accountability",
    ],
    tools: [
      "CRM software",
      "LinkedIn Sales Navigator",
      "Zoom",
      "Email automation",
      "Calendly",
    ],
    skills: [
      "Communication",
      "Relationship building",
      "Negotiation",
      "Psychology",
      "Persistence",
    ],
    icon: "TrendingUp",
    emoji: "🤝",
    marketSize: "B2B sales market worth $6T+ globally",
    averageIncome: {
      beginner: "$2K-8K/month",
      intermediate: "$8K-25K/month",
      advanced: "$25K-100K+/month",
    },
    userStruggles: [
      "Handling rejection",
      "Building initial pipeline",
      "Closing complex deals",
      "Managing long sales cycles",
    ],
    solutions: [
      "Focus on relationship building",
      "Use consultative selling approach",
      "Track metrics and optimize",
      "Continuous learning and practice",
    ],
    bestFitPersonality: [
      "Excellent communicator",
      "Resilient to rejection",
      "Goal-oriented",
      "Enjoys helping others",
    ],
    resources: {
      platforms: ["LinkedIn", "Salesforce", "HubSpot"],
      learning: ["Sales training courses", "Industry certifications"],
      tools: ["CRM software", "LinkedIn Sales Navigator", "Calendly"],
    },
    actionPlan: {
      phase1: [
        "Choose your industry",
        "Learn product knowledge",
        "Set up CRM system",
        "Start prospecting",
      ],
      phase2: [
        "Build sales pipeline",
        "Refine sales process",
        "Track and optimize metrics",
        "Close first deals",
      ],
      phase3: [
        "Scale prospecting efforts",
        "Build referral network",
        "Mentor other sales reps",
        "Consider leadership roles",
      ],
    },
  },
  {
    id: "saas-development",
    name: "SaaS Development",
    description:
      "Build software applications that generate recurring subscription revenue",
    detailedDescription:
      "SaaS (Software as a Service) development involves creating web applications that solve specific problems for businesses or consumers, generating recurring revenue through subscription models.",
    fitScore: 0,
    difficulty: "Hard",
    timeToProfit: "6-18 months",
    startupCost: "$500-5K",
    potentialIncome: "$1K-500K+/month",
    pros: [
      "Recurring revenue model",
      "Highly scalable business",
      "High profit margins",
      "Global market reach",
      "Valuable asset creation",
      "Solving real problems",
    ],
    cons: [
      "High technical barriers",
      "Long development time",
      "Competitive market",
      "Ongoing maintenance costs",
      "Customer churn challenges",
      "Significant upfront investment",
    ],
    tools: ["AWS", "React", "Node.js", "Stripe", "Analytics tools"],
    skills: [
      "Programming",
      "Product management",
      "UI/UX design",
      "Marketing",
      "Customer support",
    ],
    icon: "Monitor",
    emoji: "💻",
    marketSize: "Global SaaS market worth $300B+ annually",
    averageIncome: {
      beginner: "$0-2K/month",
      intermediate: "$2K-25K/month",
      advanced: "$25K-500K+/month",
    },
    userStruggles: [
      "Finding product-market fit",
      "Technical development challenges",
      "Customer acquisition costs",
      "Managing development timeline",
    ],
    solutions: [
      "Start with MVP and iterate",
      "Use no-code tools initially",
      "Focus on customer feedback",
      "Build in public for accountability",
    ],
    bestFitPersonality: [
      "Technical problem solver",
      "Patient with long-term goals",
      "Customer-focused",
      "Enjoys continuous learning",
    ],
    resources: {
      platforms: ["AWS", "Vercel", "Stripe", "Firebase"],
      learning: ["Coding bootcamps", "SaaS development courses"],
      tools: ["React", "Node.js", "PostgreSQL", "Stripe"],
    },
    actionPlan: {
      phase1: [
        "Validate business idea",
        "Learn required technologies",
        "Build MVP version",
        "Get first beta users",
      ],
      phase2: [
        "Implement user feedback",
        "Add payment processing",
        "Focus on user acquisition",
        "Optimize conversion funnel",
      ],
      phase3: [
        "Scale marketing efforts",
        "Add advanced features",
        "Build team as needed",
        "Consider investment/exit",
      ],
    },
  },
  {
    id: "social-media-agency",
    name: "Social Media Marketing Agency",
    description:
      "Help businesses grow their online presence through social media management",
    detailedDescription:
      "Social media marketing agencies provide comprehensive social media services to businesses, including content creation, account management, advertising campaigns, and strategy development across various platforms.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "1-3 months",
    startupCost: "$500-2K",
    potentialIncome: "$3K-50K+/month",
    pros: [
      "High demand service",
      "Recurring monthly revenue",
      "Creative and strategic work",
      "Scalable business model",
      "Work with diverse clients",
      "Remote work friendly",
    ],
    cons: [
      "Keeping up with algorithm changes",
      "Client management challenges",
      "Competitive market",
      "Proving ROI pressure",
      "Time-intensive content creation",
      "Platform dependency",
    ],
    tools: [
      "Hootsuite",
      "Canva",
      "Facebook Ads Manager",
      "Analytics tools",
      "Scheduling software",
    ],
    skills: [
      "Social media marketing",
      "Content creation",
      "Analytics",
      "Client management",
      "Design",
    ],
    icon: "Users",
    emoji: "📣",
    marketSize: "Social media marketing worth $150B+ globally",
    averageIncome: {
      beginner: "$2K-5K/month",
      intermediate: "$5K-15K/month",
      advanced: "$15K-50K+/month",
    },
    userStruggles: [
      "Finding quality clients",
      "Proving measurable results",
      "Managing multiple accounts",
      "Staying current with trends",
    ],
    solutions: [
      "Specialize in specific niches",
      "Create detailed reporting systems",
      "Use management tools",
      "Continuous learning and adaptation",
    ],
    bestFitPersonality: [
      "Creative and strategic",
      "Excellent communicator",
      "Detail-oriented",
      "Adaptable to change",
    ],
    resources: {
      platforms: ["Facebook", "Instagram", "LinkedIn", "TikTok"],
      learning: ["Social media marketing courses", "Platform certifications"],
      tools: ["Hootsuite", "Buffer", "Canva", "Google Analytics"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Service Setup & First Clients (Week 1-4)",
          steps: [
            "Define your social media service offerings",
            "Create professional website and portfolio",
            "Set up project management and social media tools",
            "Reach out to 100+ local businesses",
            "Offer free audits to get first 3-5 clients",
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
            "Collect testimonials and ask for referrals",
          ],
          timeline: "8 weeks",
          budget: "$400-1000",
          successMetrics: "10+ completed campaigns, 4+ testimonials, first referrals"
        },
      ],
      phase2: [
        {
          title: "Client Growth & Service Expansion (Month 3-6)",
          steps: [
            "Launch retainer packages for ongoing services",
            "Add new services (paid ads, influencer marketing)",
            "Implement client onboarding and management systems",
            "Build email list of prospects and past clients",
            "Create content marketing to attract new clients",
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
            "Build strategic partnerships with complementary services",
          ],
          timeline: "4-5 months",
          budget: "$2000-5000",
          successMetrics: "Team of 5+ people, 30+ clients, $15K+ monthly revenue"
        },
      ],
      phase3: [
        {
          title: "Scale & Diversify (Month 8-12)",
          steps: [
            "Launch multiple service lines and specializations",
            "Create online courses teaching social media",
            "Develop proprietary tools and methodologies",
            "Expand to enterprise-level clients",
            "Build a network of partner agencies",
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
            "Consider IPO or acquisition opportunities",
          ],
          timeline: "Ongoing",
          budget: "$15000+",
          successMetrics: "Industry recognition, $100K+ monthly revenue, exit options"
        },
      ],
    },
  },
  {
    id: "ai-marketing-agency",
    name: "AI Marketing Agency",
    description:
      "Leverage AI tools to provide cutting-edge marketing solutions for businesses",
    detailedDescription:
      "AI marketing agencies use artificial intelligence tools and technologies to provide advanced marketing services, including automated content creation, predictive analytics, chatbots, and AI-powered advertising optimization.",
    fitScore: 0,
    difficulty: "Hard",
    timeToProfit: "2-6 months",
    startupCost: "$1K-5K",
    potentialIncome: "$5K-100K+/month",
    pros: [
      "Cutting-edge technology advantage",
      "High-value service offering",
      "Scalable with automation",
      "Premium pricing potential",
      "Growing market demand",
      "Competitive differentiation",
    ],
    cons: [
      "Steep learning curve",
      "Rapidly changing technology",
      "High client expectations",
      "Technical complexity",
      "Tool subscription costs",
      "Need for continuous learning",
    ],
    tools: [
      "OpenAI API",
      "Claude",
      "Midjourney",
      "Marketing automation platforms",
      "Analytics tools",
    ],
    skills: [
      "AI tool mastery",
      "Marketing strategy",
      "Data analysis",
      "Technical integration",
      "Client education",
    ],
    icon: "Brain",
    emoji: "🤖",
    marketSize: "AI marketing market projected $100B+ by 2030",
    averageIncome: {
      beginner: "$3K-8K/month",
      intermediate: "$8K-25K/month",
      advanced: "$25K-100K+/month",
    },
    userStruggles: [
      "Keeping up with AI developments",
      "Educating clients on AI value",
      "Integration complexity",
      "Proving AI effectiveness",
    ],
    solutions: [
      "Focus on specific AI tools",
      "Create educational content",
      "Start with simple implementations",
      "Track and share success metrics",
    ],
    bestFitPersonality: [
      "Tech-savvy and innovative",
      "Continuous learner",
      "Strategic thinker",
      "Early adopter mindset",
    ],
    resources: {
      platforms: ["OpenAI", "Anthropic", "Midjourney", "HubSpot"],
      learning: ["AI marketing courses", "Technical documentation"],
      tools: ["OpenAI API", "Marketing automation", "Analytics platforms"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Service Definition & Setup (Week 1-2)",
          steps: [
            "Define your AI marketing service offerings (ads, content, analytics)",
            "Set up professional website and business infrastructure",
            "Create service packages and pricing tiers",
            "Set up project management and communication tools",
            "Research target market and competition",
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
            "Refine your service delivery process",
          ],
          timeline: "6 weeks",
          budget: "$300-800",
          successMetrics: "First 5 clients, 4.5+ star rating, 3+ testimonials"
        },
      ],
      phase2: [
        {
          title: "Client Base Building & Optimization (Month 2-4)",
          steps: [
            "Standardize service delivery processes",
            "Implement AI-powered analytics and reporting",
            "Create case studies showcasing client results",
            "Build referral network with satisfied clients",
            "Develop retainer packages for ongoing services",
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
            "Build strategic partnerships with AI tool providers",
          ],
          timeline: "3-4 months",
          budget: "$1000-3000",
          successMetrics: "25+ clients, team of 3+ people, $10K+ monthly revenue"
        },
      ],
      phase3: [
        {
          title: "Scale & Automate (Month 6-12)",
          steps: [
            "Develop proprietary AI marketing software",
            "Create online courses teaching AI marketing",
            "Launch a membership program for ongoing support",
            "Hire full-time employees for core services",
            "Implement advanced automation and AI systems",
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
            "Consider IPO or acquisition opportunities",
          ],
          timeline: "Ongoing",
          budget: "$10000+",
          successMetrics: "Industry recognition, $100K+ monthly revenue, exit valuation"
        },
      ],
    },
  },
  {
    id: "digital-services",
    name: "Digital Services",
    emoji: "💻",
    description:
      "Provide specialized digital services like web development, design, or consulting",
    detailedDescription:
      "Digital services encompass a wide range of technology-based services including web development, graphic design, digital marketing, SEO, content writing, and various forms of digital consulting.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "1-3 months",
    startupCost: "$0-1K",
    potentialIncome: "$2K-30K+/month",
    pros: [
      "High demand for digital skills",
      "Work from anywhere",
      "Diverse service options",
      "Scalable pricing",
      "Build valuable portfolio",
      "Continuous learning opportunities",
    ],
    cons: [
      "High competition",
      "Keeping skills current",
      "Client acquisition challenges",
      "Time-for-money limitation",
      "Scope creep issues",
      "Technology changes rapidly",
    ],
    tools: [
      "Adobe Creative Suite",
      "Figma",
      "WordPress",
      "Google Analytics",
      "Project management tools",
    ],
    skills: [
      "Technical expertise",
      "Design thinking",
      "Client communication",
      "Project management",
      "Marketing",
    ],
    icon: "🖥️",
    marketSize: "Digital services market worth $500B+ globally",
    averageIncome: {
      beginner: "$1K-3K/month",
      intermediate: "$3K-10K/month",
      advanced: "$10K-30K+/month",
    },
    userStruggles: [
      "Standing out in crowded market",
      "Pricing services appropriately",
      "Managing project scope",
      "Finding quality clients",
    ],
    solutions: [
      "Specialize in specific niches",
      "Build strong portfolio",
      "Use clear contracts",
      "Focus on relationship building",
    ],
    bestFitPersonality: [
      "Technical problem solver",
      "Detail-oriented",
      "Client-focused",
      "Adaptable to new technologies",
    ],
    resources: {
      platforms: ["Upwork", "Fiverr", "99designs", "Toptal"],
      learning: ["Online courses", "Technical certifications"],
      tools: ["Adobe CC", "Figma", "VS Code", "Project management software"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Service Definition & Setup (Week 1-2)",
          steps: [
            "Define your digital service offerings (web design, SEO, social media)",
            "Create professional website and service packages",
            "Set up project management and communication tools",
            "Research target market and competition pricing",
            "Create portfolio of past work or sample projects",
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
            "Build relationships with industry professionals",
          ],
          timeline: "6 weeks",
          budget: "$300-800",
          successMetrics: "First 5 clients, 4.5+ star rating, 3+ testimonials"
        },
      ],
      phase2: [
        {
          title: "Client Base Building & Optimization (Month 2-4)",
          steps: [
            "Standardize service delivery processes",
            "Implement client management and billing systems",
            "Create case studies showcasing results",
            "Build referral network with satisfied clients",
            "Develop retainer packages for ongoing services",
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
            "Start speaking at industry events",
          ],
          timeline: "3-4 months",
          budget: "$800-2000",
          successMetrics: "25+ clients, personal brand established, $12K+ monthly revenue"
        },
      ],
      phase3: [
        {
          title: "Scale & Team Building (Month 6-12)",
          steps: [
            "Hire digital specialists and support staff",
            "Develop proprietary service methodologies",
            "Create online courses and training programs",
            "Launch membership programs for ongoing support",
            "Build strategic partnerships with complementary services",
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
            "Become recognized industry leader and speaker",
          ],
          timeline: "Ongoing",
          budget: "$6000+",
          successMetrics: "Agency with 15+ employees, $50K+ monthly revenue, industry recognition"
        },
      ],
    },
  },
  {
    id: "investing-trading",
    name: "Investing & Trading",
    emoji: "💹",
    description:
      "Generate returns through strategic investment in various financial instruments",
    detailedDescription:
      "Investing and trading involves generating returns through strategic investment in stocks, cryptocurrency, real estate, forex, or other financial instruments using analysis, market timing, and risk management strategies.",
    fitScore: 0,
    difficulty: "Hard",
    timeToProfit: "3-12 months",
    startupCost: "$1K-10K+",
    potentialIncome: "$500-unlimited/month",
    pros: [
      "Potentially unlimited returns",
      "Passive income opportunity",
      "Work from anywhere",
      "Scalable with capital",
      "Market independence",
      "Financial education benefits",
    ],
    cons: [
      "High risk of losses",
      "Requires significant capital",
      "Emotional stress",
      "Market volatility",
      "Steep learning curve",
      "No guaranteed income",
    ],
    tools: [
      "Trading platforms",
      "Charting software",
      "News feeds",
      "Portfolio trackers",
      "Risk management tools",
    ],
    skills: [
      "Market analysis",
      "Risk management",
      "Emotional control",
      "Research",
      "Mathematical thinking",
    ],
    icon: "📈",
    marketSize: "Global trading volume $6T+ daily",
    averageIncome: {
      beginner: "$0-1K/month (high variance)",
      intermediate: "$1K-5K/month (high variance)",
      advanced: "$5K-unlimited/month (high variance)",
    },
    userStruggles: [
      "Managing emotions and psychology",
      "Risk management",
      "Information overload",
      "Consistency in profits",
    ],
    solutions: [
      "Start with paper trading",
      "Develop strict risk rules",
      "Focus on education first",
      "Use systematic approaches",
    ],
    bestFitPersonality: [
      "Analytical and disciplined",
      "Comfortable with risk",
      "Emotionally stable",
      "Continuous learner",
    ],
    resources: {
      platforms: [
        "Robinhood",
        "E*TRADE",
        "TD Ameritrade",
        "Interactive Brokers",
      ],
      learning: ["Financial education courses", "Market analysis training"],
      tools: [
        "TradingView",
        "Bloomberg Terminal",
        "Portfolio management software",
      ],
    },
    actionPlan: {
      phase1: [
        "Learn market fundamentals",
        "Practice with paper trading",
        "Develop trading strategy",
        "Start with small amounts",
      ],
      phase2: [
        "Refine risk management",
        "Track performance metrics",
        "Gradually increase capital",
        "Diversify strategies",
      ],
      phase3: [
        "Scale successful strategies",
        "Consider alternative investments",
        "Potentially manage others' money",
        "Build investment business",
      ],
    },
  },
  {
    id: "copywriting",
    name: "Copywriting",
    emoji: "✍️",
    description:
      "Write persuasive marketing and sales copy for businesses and brands",
    detailedDescription:
      "Copywriting involves creating persuasive written content for businesses, including sales pages, email campaigns, advertisements, website copy, and marketing materials designed to drive specific actions from readers.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "1-3 months",
    startupCost: "$0-500",
    potentialIncome: "$2K-25K+/month",
    pros: [
      "High-value skill in demand",
      "Work from anywhere",
      "Results-driven pricing",
      "Multiple industries to serve",
      "Scalable income potential",
      "Creative and strategic work",
    ],
    cons: [
      "Pressure to deliver results",
      "Competitive market",
      "Client education needed",
      "Income can be project-based",
      "Constant need to prove ROI",
      "Writing skills must be excellent",
    ],
    tools: [
      "Google Docs",
      "Grammarly",
      "Hemingway Editor",
      "Research tools",
      "Project management",
    ],
    skills: [
      "Persuasive writing",
      "Psychology",
      "Market research",
      "A/B testing",
      "Client communication",
    ],
    icon: "✒️",
    marketSize: "Content marketing industry worth $400B+ globally",
    averageIncome: {
      beginner: "$1K-3K/month",
      intermediate: "$3K-10K/month",
      advanced: "$10K-25K+/month",
    },
    userStruggles: [
      "Finding clients who value copy",
      "Proving copy effectiveness",
      "Handling revisions and feedback",
      "Pricing work appropriately",
    ],
    solutions: [
      "Focus on results-driven niches",
      "Track and share conversion data",
      "Set clear revision limits",
      "Charge based on value delivered",
    ],
    bestFitPersonality: [
      "Excellent writer",
      "Persuasive communicator",
      "Research-oriented",
      "Results-focused",
    ],
    resources: {
      platforms: ["Upwork", "Contently", "ClearVoice", "ProBlogger"],
      learning: ["Copywriting courses", "Marketing psychology"],
      tools: ["Google Docs", "Grammarly", "CoSchedule Headline Analyzer"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Portfolio Building & Setup (Week 1-3)",
          steps: [
            "Create professional website and portfolio",
            "Write 10-15 sample pieces in different styles",
            "Set up profiles on freelance platforms",
            "Research target industries and clients",
            "Set competitive initial rates",
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
            "Create templates for common project types",
          ],
          timeline: "5 weeks",
          budget: "$0-100",
          successMetrics: "First 5 clients, 4.5+ star rating, 3+ testimonials"
        },
      ],
      phase2: [
        {
          title: "Client Growth & Rate Increases (Month 2-4)",
          steps: [
            "Gradually increase rates by 15-25% every 2 months",
            "Focus on high-value clients and industries",
            "Develop specialized copywriting services",
            "Build long-term client relationships",
            "Create case studies showcasing results",
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
            "Start networking with marketing agencies",
          ],
          timeline: "3-4 months",
          budget: "$300-800",
          successMetrics: "25+ clients, personal brand established, $5K+ monthly income"
        },
      ],
      phase3: [
        {
          title: "Scale & Team Building (Month 6-12)",
          steps: [
            "Hire junior copywriters and editors",
            "Create training programs for team members",
            "Develop proprietary copywriting methodologies",
            "Launch online courses teaching copywriting",
            "Build strategic partnerships with agencies",
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
            "Consider franchising or licensing opportunities",
          ],
          timeline: "Ongoing",
          budget: "$3000+",
          successMetrics: "Agency with 10+ employees, $25K+ monthly revenue, enterprise clients"
        },
      ],
    },
  },
  {
    id: "virtual-assistant",
    name: "Virtual Assistant",
    description:
      "Provide remote administrative, technical, or creative support to businesses",
    detailedDescription:
      "Virtual assistants provide remote support services to entrepreneurs and businesses, including administrative tasks, customer service, social media management, content creation, and specialized technical services.",
    fitScore: 0,
    difficulty: "Easy",
    timeToProfit: "1-2 weeks",
    startupCost: "$0-300",
    potentialIncome: "$1K-8K/month",
    pros: [
      "Low barrier to entry",
      "Flexible schedule",
      "Diverse task variety",
      "Learn new business skills",
      "Stable recurring income",
      "Remote work opportunity",
    ],
    cons: [
      "Can be task-intensive",
      "Time zone coordination",
      "Lower hourly rates initially",
      "Client dependency",
      "Administrative workload",
      "Limited growth potential",
    ],
    tools: [
      "Slack",
      "Zoom",
      "Trello",
      "Google Workspace",
      "Time tracking software",
    ],
    skills: [
      "Organization",
      "Communication",
      "Technical proficiency",
      "Problem-solving",
      "Reliability",
    ],
    icon: "Users",
    emoji: "👥",
    marketSize: "Virtual assistant market worth $25B+ globally",
    averageIncome: {
      beginner: "$800-2K/month",
      intermediate: "$2K-5K/month",
      advanced: "$5K-8K/month",
    },
    userStruggles: [
      "Finding quality clients",
      "Setting boundaries",
      "Managing multiple clients",
      "Increasing rates over time",
    ],
    solutions: [
      "Specialize in valuable skills",
      "Set clear work agreements",
      "Use project management tools",
      "Focus on results and value",
    ],
    bestFitPersonality: [
      "Highly organized",
      "Detail-oriented",
      "Reliable and trustworthy",
      "Adaptable to different needs",
    ],
    resources: {
      platforms: ["Belay", "Time Etc", "Fancy Hands", "Upwork"],
      learning: ["VA training courses", "Business skills development"],
      tools: ["Google Workspace", "Slack", "Asana", "Calendly"],
    },
    actionPlan: {
      phase1: [
        "Identify your skill strengths",
        "Create professional profiles",
        "Apply to VA platforms",
        "Get first clients",
      ],
      phase2: [
        "Deliver exceptional service",
        "Build client testimonials",
        "Specialize in high-value tasks",
        "Increase hourly rates",
      ],
      phase3: [
        "Build VA agency",
        "Hire other VAs",
        "Create specialized services",
        "Focus on premium clients",
      ],
    },
  },
  {
    id: "online-reselling",
    name: "Online Reselling",
    emoji: "📦",
    description:
      "Buy and resell products online through platforms like eBay, Amazon, or Poshmark",
    detailedDescription:
      "Online reselling involves purchasing products at low prices and reselling them at higher prices through online marketplaces. This can include retail arbitrage, wholesale purchasing, thrift store finds, clearance items, or sourcing from manufacturers.",
    fitScore: 0,
    difficulty: "Easy",
    timeToProfit: "1-4 weeks",
    startupCost: "$200-2K",
    potentialIncome: "$1K-15K+/month",
    pros: [
      "Low barrier to entry",
      "Quick cash flow potential",
      "Learn market dynamics",
      "Flexible schedule",
      "Scalable business model",
      "No specialized skills required",
    ],
    cons: [
      "Time-intensive sourcing",
      "Storage space requirements",
      "Competition pressure",
      "Seasonal demand variations",
      "Platform fee costs",
      "Inventory management challenges",
    ],
    tools: [
      "Amazon Seller App",
      "eBay",
      "Facebook Marketplace",
      "Keepa",
      "Inventory management software",
    ],
    skills: [
      "Product research",
      "Market analysis",
      "Negotiation",
      "Customer service",
      "Inventory management",
    ],
    icon: "🛒",
    marketSize: "Online resale market worth $200B+ globally",
    averageIncome: {
      beginner: "$500-2K/month",
      intermediate: "$2K-8K/month",
      advanced: "$8K-15K+/month",
    },
    userStruggles: [
      "Finding profitable products",
      "Managing storage space",
      "Dealing with returns",
      "Time-intensive sourcing",
    ],
    solutions: [
      "Use product research tools",
      "Start with online arbitrage",
      "Optimize return policies",
      "Automate where possible",
    ],
    bestFitPersonality: [
      "Enjoys hunting for deals",
      "Detail-oriented",
      "Comfortable with risk",
      "Good at pattern recognition",
    ],
    resources: {
      platforms: ["Amazon FBA", "eBay", "Poshmark", "Mercari"],
      learning: ["Reselling courses", "Arbitrage communities"],
      tools: ["Keepa", "CamelCamelCamel", "Amazon Seller App"],
    },
    actionPlan: {
      phase1: [
        "Learn product research",
        "Start with small investments",
        "Test different product categories",
        "Set up selling accounts",
      ],
      phase2: [
        "Scale successful products",
        "Optimize sourcing process",
        "Build inventory systems",
        "Expand to new platforms",
      ],
      phase3: [
        "Consider wholesale relationships",
        "Automate operations",
        "Build team for sourcing",
        "Explore private labeling",
      ],
    },
  },
  {
    id: "handmade-goods",
    name: "Handmade Goods",
    emoji: "🧶",
    description:
      "Create and sell handmade products such as crafts, jewelry, or art",
    detailedDescription:
      "Handmade goods businesses involve creating unique, handcrafted products and selling them through online platforms. This can include jewelry, clothing, home decor, art, crafts, or any custom-made items that showcase personal creativity and skill.",
    fitScore: 0,
    difficulty: "Easy",
    timeToProfit: "2-8 weeks",
    startupCost: "$100-1K",
    potentialIncome: "$500-10K+/month",
    pros: [
      "Creative fulfillment",
      "Unique product offerings",
      "Personal brand building",
      "Flexible production schedule",
      "Premium pricing potential",
      "Direct customer relationships",
    ],
    cons: [
      "Time-intensive production",
      "Limited scalability",
      "Material cost fluctuations",
      "Seasonal demand patterns",
      "Photography and marketing needs",
      "Competition from mass production",
    ],
    tools: [
      "Etsy",
      "Shopify",
      "Canva",
      "Social media platforms",
      "Photography equipment",
    ],
    skills: [
      "Crafting expertise",
      "Photography",
      "Product design",
      "Customer service",
      "Social media marketing",
    ],
    icon: "🎨",
    marketSize: "Handmade goods market worth $44B+ globally",
    averageIncome: {
      beginner: "$200-1K/month",
      intermediate: "$1K-4K/month",
      advanced: "$4K-10K+/month",
    },
    userStruggles: [
      "Pricing products appropriately",
      "Standing out in crowded market",
      "Scaling production",
      "Managing custom orders",
    ],
    solutions: [
      "Calculate true cost including time",
      "Focus on unique value proposition",
      "Streamline production processes",
      "Set clear custom order policies",
    ],
    bestFitPersonality: [
      "Creative and artistic",
      "Detail-oriented",
      "Patient with production",
      "Enjoys working with hands",
    ],
    resources: {
      platforms: [
        "Etsy",
        "Amazon Handmade",
        "Facebook Marketplace",
        "Local craft fairs",
      ],
      learning: ["Crafting tutorials", "Etsy seller guides"],
      tools: ["Etsy", "Canva", "Instagram", "Photography lighting"],
    },
    actionPlan: {
      phase1: [
        "Perfect your craft",
        "Create initial product line",
        "Set up online store",
        "Take quality product photos",
      ],
      phase2: [
        "Build social media presence",
        "Gather customer feedback",
        "Expand product offerings",
        "Optimize pricing strategy",
      ],
      phase3: [
        "Scale production methods",
        "Consider wholesale opportunities",
        "Build brand loyalty",
        "Explore custom order services",
      ],
    },
  },
  {
    id: "amazon-fba",
    name: "Amazon FBA",
    emoji: "🏷️",
    description:
      "Sell products using Amazon's Fulfillment by Amazon (FBA) service",
    detailedDescription:
      "Amazon FBA (Fulfillment by Amazon) allows sellers to send products to Amazon's warehouses, where they handle storage, shipping, and customer service. Sellers focus on product research, sourcing, and marketing while Amazon manages the logistics. This model requires upfront investment in inventory but offers scalability and passive income potential.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "2-8 months",
    startupCost: "$1K-10K",
    potentialIncome: "$2K-50K+/month",
    pros: [
      "Amazon handles logistics",
      "Scalable business model",
      "Global reach",
      "Passive income potential",
      "Data-driven decisions",
      "Multiple product opportunities",
    ],
    cons: [
      "High upfront investment",
      "Inventory risk",
      "Amazon dependency",
      "Competitive market",
      "Complex regulations",
      "Seasonal fluctuations",
    ],
    tools: [
      "Helium 10",
      "Jungle Scout",
      "AMZScout",
      "Seller Central",
      "Keepa",
    ],
    skills: [
      "Product research",
      "Market analysis",
      "Supplier negotiation",
      "Amazon SEO",
      "Inventory management",
    ],
    icon: "🏭",
    marketSize: "Amazon marketplace worth $400B+ globally",
    averageIncome: {
      beginner: "$1K-5K/month",
      intermediate: "$5K-20K/month",
      advanced: "$20K-50K+/month",
    },
    userStruggles: [
      "Finding profitable products",
      "Managing inventory costs",
      "Competing with established sellers",
      "Understanding Amazon algorithms",
    ],
    solutions: [
      "Use research tools effectively",
      "Start with small inventory",
      "Focus on underserved niches",
      "Optimize listings for SEO",
    ],
    bestFitPersonality: [
      "Analytical and data-driven",
      "Patient with long-term results",
      "Comfortable with risk",
      "Detail-oriented",
    ],
    resources: {
      platforms: ["Amazon Seller Central", "FBA communities"],
      learning: ["Amazon Seller University", "FBA courses"],
      tools: ["Helium 10", "Jungle Scout", "Keepa"],
    },
    actionPlan: {
      phase1: [
        "Learn Amazon FBA basics",
        "Research product opportunities",
        "Find reliable suppliers",
        "Create first product listing",
      ],
      phase2: [
        "Launch first product",
        "Optimize listing and PPC",
        "Scale successful products",
        "Build supplier relationships",
      ],
      phase3: [
        "Expand product portfolio",
        "Consider private labeling",
        "Automate operations",
        "Build brand presence",
      ],
    },
  },
  {
    id: "podcasting",
    name: "Podcasting",
    emoji: "🎙️",
    description:
      "Create and monetize audio content through podcasts",
    detailedDescription:
      "Podcasting involves creating audio content on specific topics or niches, building an audience, and monetizing through sponsorships, advertising, affiliate marketing, or premium content. Successful podcasters focus on consistent content creation, audience engagement, and strategic monetization partnerships.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "6-12 months",
    startupCost: "$100-1K",
    potentialIncome: "$500-20K+/month",
    pros: [
      "Low barrier to entry",
      "Build authority in niche",
      "Multiple revenue streams",
      "Flexible schedule",
      "Global audience reach",
      "Long-term content value",
    ],
    cons: [
      "Slow audience growth",
      "Equipment and technical learning",
      "Consistent content creation needed",
      "Competition for sponsors",
      "Monetization takes time",
      "Audio quality expectations",
    ],
    tools: [
      "Anchor",
      "Audacity",
      "Zoom",
      "Canva",
      "Mailchimp",
    ],
    skills: [
      "Audio recording and editing",
      "Content planning",
      "Interview skills",
      "Marketing and promotion",
      "Audience building",
    ],
    icon: "🎙️",
    marketSize: "Podcast industry worth $4B+ and growing rapidly",
    averageIncome: {
      beginner: "$0-500/month",
      intermediate: "$500-5K/month",
      advanced: "$5K-20K+/month",
    },
    userStruggles: [
      "Building initial audience",
      "Consistent content creation",
      "Finding sponsors",
      "Technical audio quality",
    ],
    solutions: [
      "Focus on specific niche",
      "Create content calendar",
      "Network with potential sponsors",
      "Invest in quality equipment",
    ],
    bestFitPersonality: [
      "Comfortable speaking",
      "Consistent and disciplined",
      "Enjoys research and interviews",
      "Patient with growth",
    ],
    resources: {
      platforms: ["Spotify", "Apple Podcasts", "Google Podcasts"],
      learning: ["Podcasting courses", "Audio editing tutorials"],
      tools: ["Anchor", "Audacity", "Descript"],
    },
    actionPlan: {
      phase1: [
        "Choose podcast niche",
        "Set up recording equipment",
        "Create first episodes",
        "Submit to podcast directories",
      ],
      phase2: [
        "Build audience engagement",
        "Network with guests",
        "Optimize for discoverability",
        "Explore monetization options",
      ],
      phase3: [
        "Secure sponsorships",
        "Launch premium content",
        "Expand to multiple shows",
        "Build community",
      ],
    },
  },
  {
    id: "blogging",
    name: "Blogging",
    emoji: "📝",
    description:
      "Write and monetize blog content on various topics",
    detailedDescription:
      "Blogging involves creating written content on specific topics or niches, building an engaged audience, and monetizing through advertising, affiliate marketing, sponsored posts, or selling digital products. Successful bloggers focus on SEO, consistent content creation, and audience engagement.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "6-12 months",
    startupCost: "$50-500",
    potentialIncome: "$500-15K+/month",
    pros: [
      "Low startup costs",
      "Build authority and expertise",
      "Multiple monetization options",
      "Flexible work schedule",
      "SEO benefits",
      "Long-term content value",
    ],
    cons: [
      "Slow initial growth",
      "Consistent content creation needed",
      "SEO competition",
      "Monetization takes time",
      "Technical learning curve",
      "Content saturation",
    ],
    tools: [
      "WordPress",
      "Yoast SEO",
      "Mailchimp",
      "Canva",
      "Google Analytics",
    ],
    skills: [
      "Writing and editing",
      "SEO optimization",
      "Content strategy",
      "Social media marketing",
      "Email marketing",
    ],
    icon: "💡",
    marketSize: "Blogging industry worth $500M+ with growing opportunities",
    averageIncome: {
      beginner: "$0-500/month",
      intermediate: "$500-3K/month",
      advanced: "$3K-15K+/month",
    },
    userStruggles: [
      "Building initial traffic",
      "Consistent content creation",
      "SEO optimization",
      "Monetization strategy",
    ],
    solutions: [
      "Focus on specific niche",
      "Create content calendar",
      "Learn SEO fundamentals",
      "Diversify income streams",
    ],
    bestFitPersonality: [
      "Enjoys writing",
      "Patient with growth",
      "Consistent and disciplined",
      "Likes research and learning",
    ],
    resources: {
      platforms: ["WordPress", "Medium", "Substack"],
      learning: ["SEO courses", "Content marketing guides"],
      tools: ["Yoast SEO", "Google Analytics", "Mailchimp"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Niche Selection & Setup (Week 1-2)",
          steps: [
            "Research profitable blog niches with low competition",
            "Set up WordPress blog with professional theme",
            "Create content calendar for first 30 posts",
            "Set up SEO tools and analytics tracking",
            "Research target keywords and topics",
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
            "Start building email list",
          ],
          timeline: "10 weeks",
          budget: "$200-500",
          successMetrics: "30+ posts published, 100+ email subscribers, first organic traffic"
        },
      ],
      phase2: [
        {
          title: "Monetization & Traffic Growth (Month 3-6)",
          steps: [
            "Apply for Google AdSense and affiliate programs",
            "Create sponsored content opportunities",
            "Implement email marketing campaigns",
            "Focus on high-traffic keywords",
            "Build backlinks through guest posting",
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
            "Launch podcast or YouTube channel",
          ],
          timeline: "4-5 months",
          budget: "$500-1200",
          successMetrics: "5000+ monthly visitors, personal brand established, $300+ monthly income"
        },
      ],
      phase3: [
        {
          title: "Scale & Diversify (Month 8-12)",
          steps: [
            "Launch digital products (courses, e-books)",
            "Create membership site for exclusive content",
            "Hire writers and virtual assistants",
            "Develop multiple revenue streams",
            "Expand to new niches and topics",
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
            "Consider selling blog or entire business",
          ],
          timeline: "Ongoing",
          budget: "$3000+",
          successMetrics: "$5K+ monthly income, blog network, exit options"
        },
      ],
    },
  },
  {
    id: "consulting",
    name: "Consulting",
    emoji: "💼",
    description:
      "Provide expert advice and solutions to businesses or individuals",
    detailedDescription:
      "Consulting involves providing expert advice and strategic guidance to businesses in your area of expertise. Consultants help clients solve problems, improve processes, and achieve goals through specialized knowledge and experience. This can include business strategy, operations, marketing, technology, or industry-specific consulting.",
    fitScore: 0,
    difficulty: "Hard",
    timeToProfit: "2-8 months",
    startupCost: "$0-2K",
    potentialIncome: "$5K-50K+/month",
    pros: [
      "High hourly rates",
      "Leverage existing expertise",
      "Flexible client base",
      "Intellectual challenge",
      "Build reputation",
      "Scalable through products",
    ],
    cons: [
      "Time-for-money limitation",
      "Client acquisition challenges",
      "Requires proven expertise",
      "Project-based income",
      "High client expectations",
      "Travel requirements",
    ],
    tools: [
      "Zoom",
      "Slack",
      "Notion",
      "PowerPoint",
      "Stripe",
    ],
    skills: [
      "Deep expertise in specific area",
      "Problem-solving",
      "Communication and presentation",
      "Project management",
      "Client relationship management",
    ],
    icon: "🧑‍💼",
    marketSize: "Consulting industry worth $250B+ globally",
    averageIncome: {
      beginner: "$2K-8K/month",
      intermediate: "$8K-25K/month",
      advanced: "$25K-50K+/month",
    },
    userStruggles: [
      "Establishing credibility",
      "Finding initial clients",
      "Pricing services appropriately",
      "Managing client expectations",
    ],
    solutions: [
      "Build strong case studies",
      "Network actively",
      "Start with lower rates",
      "Set clear project scope",
    ],
    bestFitPersonality: [
      "Expert in specific field",
      "Strong communication skills",
      "Problem-solving mindset",
      "Professional and trustworthy",
    ],
    resources: {
      platforms: ["LinkedIn", "Consulting communities"],
      learning: ["Industry certifications", "Consulting courses"],
      tools: ["Zoom", "Notion", "Stripe"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Expertise Definition & Setup (Week 1-2)",
          steps: [
            "Define your consulting niche and target market",
            "Create professional website and consulting packages",
            "Set up business infrastructure and tools",
            "Research competition and pricing in your niche",
            "Create case studies from past experience",
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
            "Build relationships with industry professionals",
          ],
          timeline: "6 weeks",
          budget: "$300-800",
          successMetrics: "First 5 clients, 4.5+ star rating, 3+ testimonials"
        },
      ],
      phase2: [
        {
          title: "Client Base Building & Optimization (Month 2-4)",
          steps: [
            "Standardize consulting processes and deliverables",
            "Implement client management and billing systems",
            "Create comprehensive case studies",
            "Build referral network with satisfied clients",
            "Develop retainer packages for ongoing services",
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
            "Start speaking at industry events",
          ],
          timeline: "3-4 months",
          budget: "$800-2000",
          successMetrics: "25+ clients, personal brand established, $12K+ monthly revenue"
        },
      ],
      phase3: [
        {
          title: "Scale & Team Building (Month 6-12)",
          steps: [
            "Hire associate consultants and support staff",
            "Develop proprietary consulting methodologies",
            "Create online courses and training programs",
            "Launch membership programs for ongoing support",
            "Build strategic partnerships with complementary services",
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
            "Become recognized industry leader and speaker",
          ],
          timeline: "Ongoing",
          budget: "$6000+",
          successMetrics: "Firm with 15+ employees, $50K+ monthly revenue, industry recognition"
        },
      ],
    },
  },
  {
    id: "real-estate-investing",
    name: "Real Estate Investing",
    emoji: "🏠",
    description:
      "Invest in and manage real estate properties for profit",
    detailedDescription:
      "Real estate investing involves purchasing properties to generate income through rentals, appreciation, or flipping. This can include residential rentals, commercial properties, house flipping, or real estate crowdfunding. Success requires market knowledge, financial analysis, and property management skills.",
    fitScore: 0,
    difficulty: "Hard",
    timeToProfit: "6-24 months",
    startupCost: "$10K-100K+",
    potentialIncome: "$2K-50K+/month",
    pros: [
      "Tangible asset ownership",
      "Multiple income streams",
      "Tax benefits",
      "Appreciation potential",
      "Leverage opportunities",
      "Passive income",
    ],
    cons: [
      "High capital requirements",
      "Market risk",
      "Property management challenges",
      "Illiquid investment",
      "Maintenance costs",
      "Regulatory complexity",
    ],
    tools: [
      "Zillow",
      "BiggerPockets",
      "RentSpree",
      "QuickBooks",
      "Cozy",
    ],
    skills: [
      "Market analysis",
      "Financial modeling",
      "Property evaluation",
      "Negotiation",
      "Property management",
    ],
    icon: "🏠",
    marketSize: "Real estate market worth $3.7T+ in the US alone",
    averageIncome: {
      beginner: "$1K-5K/month",
      intermediate: "$5K-20K/month",
      advanced: "$20K-50K+/month",
    },
    userStruggles: [
      "High capital requirements",
      "Finding good deals",
      "Property management",
      "Market timing",
    ],
    solutions: [
      "Start with REITs or crowdfunding",
      "Network with real estate professionals",
      "Hire property managers",
      "Focus on cash flow over appreciation",
    ],
    bestFitPersonality: [
      "Analytical and research-oriented",
      "Comfortable with large investments",
      "Patient with long-term results",
      "Good at networking",
    ],
    resources: {
      platforms: ["BiggerPockets", "Real estate investment groups"],
      learning: ["Real estate courses", "Market analysis training"],
      tools: ["Zillow", "RentSpree", "QuickBooks"],
    },
    actionPlan: {
      phase1: [
        "Learn real estate fundamentals",
        "Analyze local markets",
        "Build investment criteria",
        "Network with professionals",
      ],
      phase2: [
        "Make first investment",
        "Learn property management",
        "Build team of professionals",
        "Scale portfolio",
      ],
      phase3: [
        "Diversify property types",
        "Consider commercial properties",
        "Build passive income streams",
        "Explore new markets",
      ],
    },
  },
  {
    id: "online-course-creation",
    name: "Online Course Creation",
    emoji: "🎓",
    description:
      "Create and sell online courses on platforms like Udemy or Teachable",
    detailedDescription:
      "Online course creation involves developing educational content on specific topics and selling it through platforms like Udemy, Teachable, or your own website. Successful course creators focus on solving specific problems, creating engaging content, and building a marketing system to reach their target audience.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "2-12 months",
    startupCost: "$100-2K",
    potentialIncome: "$1K-50K+/month",
    pros: [
      "Scalable income",
      "Leverage existing knowledge",
      "Passive income potential",
      "Global reach",
      "Build authority",
      "Multiple revenue streams",
    ],
    cons: [
      "High initial time investment",
      "Competitive market",
      "Technical learning curve",
      "Marketing required",
      "Content updates needed",
      "Platform dependency",
    ],
    tools: [
      "Teachable",
      "Camtasia",
      "Loom",
      "Canva",
      "Mailchimp",
    ],
    skills: [
      "Subject matter expertise",
      "Content creation",
      "Video production",
      "Instructional design",
      "Marketing and sales",
    ],
    icon: "🎓",
    marketSize: "Online education market worth $350B+ globally",
    averageIncome: {
      beginner: "$500-3K/month",
      intermediate: "$3K-15K/month",
      advanced: "$15K-50K+/month",
    },
    userStruggles: [
      "Creating engaging content",
      "Marketing courses effectively",
      "Standing out in crowded market",
      "Technical production quality",
    ],
    solutions: [
      "Focus on specific problems",
      "Build email list before launch",
      "Create unique value proposition",
      "Invest in quality equipment",
    ],
    bestFitPersonality: [
      "Enjoys teaching others",
      "Patient with content creation",
      "Comfortable on camera",
      "Organized and systematic",
    ],
    resources: {
      platforms: ["Teachable", "Udemy", "Kajabi"],
      learning: ["Course creation courses", "Video production tutorials"],
      tools: ["Camtasia", "Loom", "Canva"],
    },
        actionPlan: {
      phase1: [
        {
          title: "Course Planning & Content Creation (Week 1-6)",
          steps: [
            "Research profitable course topics with high demand",
            "Create detailed course outline and curriculum",
            "Record 10-15 high-quality video lessons",
            "Create supporting materials (workbooks, templates)",
            "Set up course hosting platform (Teachable, Udemy)",
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
            "Collect first student feedback and testimonials",
          ],
          timeline: "6 weeks",
          budget: "$300-1000",
          successMetrics: "First 20+ students, course launched, initial feedback collected"
        },
      ],
      phase2: [
        {
          title: "Student Growth & Course Optimization (Month 3-6)",
          steps: [
            "Implement student feedback to improve course content",
            "Create additional bonus materials and resources",
            "Develop affiliate program for course promotion",
            "Build email list of prospects and past students",
            "Start creating content marketing to attract students",
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
            "Build strategic partnerships with other creators",
          ],
          timeline: "4-5 months",
          budget: "$1000-3000",
          successMetrics: "3+ courses, membership site active, $8K+ monthly revenue"
        },
      ],
      phase3: [
        {
          title: "Scale & Automate (Month 8-12)",
          steps: [
            "Develop automated marketing and sales funnels",
            "Create online course creation business",
            "Hire team members for content creation and support",
            "Launch certification programs and advanced courses",
            "Build a network of course creators and partners",
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
            "Consider selling courses or entire business",
          ],
          timeline: "Ongoing",
          budget: "$8000+",
          successMetrics: "Education platform, 50+ courses, $50K+ monthly revenue"
        },
      ],
    },
  },
  {
    id: "ghostwriting",
    name: "Ghostwriting",
    emoji: "👻",
    description:
      "Write content for others who are credited as the author",
    detailedDescription:
      "Ghostwriting involves writing content for others who publish under their own name. This can include books, articles, speeches, blog posts, and other content. Ghostwriters must adapt their writing style to match their client's voice while maintaining high quality and meeting deadlines.",
    fitScore: 0,
    difficulty: "Medium",
    timeToProfit: "2-8 months",
    startupCost: "$0-300",
    potentialIncome: "$3K-30K+/month",
    pros: [
      "High project rates",
      "Diverse content types",
      "Build relationships",
      "Learn from experts",
      "Flexible schedule",
      "Portfolio variety",
    ],
    cons: [
      "No public credit",
      "Client dependency",
      "Confidentiality requirements",
      "Project-based income",
      "Client management",
      "Style adaptation",
    ],
    tools: [
      "Google Docs",
      "Scrivener",
      "Zoom",
      "Trello",
      "PayPal",
    ],
    skills: [
      "Adaptable writing style",
      "Research capabilities",
      "Interview skills",
      "Project management",
      "Client collaboration",
    ],
    icon: "👻",
    marketSize: "Ghostwriting industry worth $500M+ with growing demand",
    averageIncome: {
      beginner: "$1K-5K/month",
      intermediate: "$5K-15K/month",
      advanced: "$15K-30K+/month",
    },
    userStruggles: [
      "Finding quality clients",
      "Adapting writing style",
      "Managing multiple projects",
      "Building trust with clients",
    ],
    solutions: [
      "Build strong portfolio",
      "Practice style adaptation",
      "Use project management tools",
      "Maintain confidentiality",
    ],
    bestFitPersonality: [
      "Adaptable writer",
      "Collaborative worker",
      "Maintains confidentiality",
      "Strong communication skills",
    ],
    resources: {
      platforms: ["Upwork", "LinkedIn", "Ghostwriting agencies"],
      learning: ["Writing courses", "Style adaptation training"],
      tools: ["Scrivener", "Google Docs", "Trello"],
    },
    actionPlan: {
      phase1: [
        "Build writing portfolio",
        "Identify target clients",
        "Set up professional presence",
        "Network with potential clients",
      ],
      phase2: [
        "Secure first projects",
        "Develop client relationships",
        "Refine writing process",
        "Build referral network",
      ],
      phase3: [
        "Increase project rates",
        "Focus on premium clients",
        "Create scalable processes",
        "Consider team expansion",
      ],
    },
  },
  {
    id: "dropshipping",
    name: "Dropshipping",
    emoji: "🚚",
    description:
      "Sell products online without holding inventory, using suppliers to fulfill orders",
    detailedDescription:
      "Dropshipping involves selling products online without holding inventory. You partner with suppliers who ship products directly to your customers when orders are placed. This model requires strong marketing skills, product research, and customer service, but eliminates inventory management and upfront costs.",
    fitScore: 0,
    difficulty: "Easy",
    timeToProfit: "1-4 months",
    startupCost: "$100-2K",
    potentialIncome: "$1K-20K+/month",
    pros: [
      "Low upfront investment",
      "No inventory management",
      "Easy to start",
      "Multiple product testing",
      "Location independence",
      "Scalable model",
    ],
    cons: [
      "Lower profit margins",
      "Supplier dependency",
      "Customer service challenges",
      "Shipping delays",
      "Quality control issues",
      "High competition",
    ],
    tools: [
      "Shopify",
      "Oberlo",
      "AliExpress",
      "Facebook Ads",
      "Google Analytics",
    ],
    skills: [
      "Product research",
      "Digital marketing",
      "Customer service",
      "Website management",
      "Analytics understanding",
    ],
    icon: "📦",
    marketSize: "Dropshipping market worth $200B+ globally",
    averageIncome: {
      beginner: "$500-3K/month",
      intermediate: "$3K-10K/month",
      advanced: "$10K-20K+/month",
    },
    userStruggles: [
      "Finding profitable products",
      "Managing customer expectations",
      "Dealing with shipping delays",
      "Standing out in competition",
    ],
    solutions: [
      "Use product research tools",
      "Set clear shipping expectations",
      "Work with reliable suppliers",
      "Focus on unique marketing angles",
    ],
    bestFitPersonality: [
      "Marketing-focused",
      "Product research oriented",
      "Comfortable with risk",
      "Customer service minded",
    ],
    resources: {
      platforms: ["Shopify", "WooCommerce", "Amazon"],
      learning: ["Dropshipping courses", "Digital marketing training"],
      tools: ["Oberlo", "AliExpress", "Facebook Ads"],
    },
    actionPlan: {
      phase1: [
        "Research product opportunities",
        "Set up online store",
        "Find reliable suppliers",
        "Launch first products",
      ],
      phase2: [
        "Implement marketing strategies",
        "Optimize conversion rates",
        "Scale successful products",
        "Build customer base",
      ],
      phase3: [
        "Expand product portfolio",
        "Consider private labeling",
        "Build brand presence",
        "Explore new markets",
      ],
    },
  },
];
