export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  tags: string[];
  slug: string;
  featured?: boolean;
  body?: string[];
  factCheckRating?: 'benar' | 'sebagian_benar' | 'menyesatkan' | 'hoaks';
  factCheckSummary?: string;
};

export const featuredArticles: Article[] = [
  {
    id: '1',
    title: 'Senate Passes Landmark AI Governance Bill After Months of Bipartisan Negotiation',
    excerpt:
      'The legislation establishes the first federal framework for regulating large language models and autonomous systems used in critical infrastructure.',
    category: 'Politics',
    categoryColor: 'category-politics',
    author: 'Margaret Holloway',
    authorRole: 'Political Correspondent',
    date: 'May 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1673725641916-5b3625cfb335',
    imageAlt:
      'Sunlit marble government building exterior with grand columns and American flag, bright clear sky, formal architectural setting',
    tags: ['AI', 'Legislation', 'Senate', 'Technology Policy'],
    slug: 'senate-ai-governance-bill',
    featured: true,
    factCheckRating: 'benar',
    factCheckSummary:
      'RUU Tata Kelola AI telah resmi disahkan oleh Senat AS dengan persetujuan bipartisan 72-28.',
  },
  {
    id: '2',
    title: 'Federal Reserve Holds Rates Steady, Signals Two Cuts Possible Before Year End',
    excerpt:
      'Chair Jerome Powell cited cooling inflation data and a resilient labor market as key factors in the unanimous decision.',
    category: 'Business',
    categoryColor: 'category-business',
    author: 'David Osei',
    authorRole: 'Economics Editor',
    date: 'May 18, 2026',
    readTime: '4 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_115f480d4-1773360011752.png',
    imageAlt:
      'Modern financial trading floor with multiple screens showing stock charts, bright overhead lighting, professional environment',
    tags: ['Federal Reserve', 'Interest Rates', 'Economy'],
    slug: 'fed-holds-rates-two-cuts',
    featured: true,
  },
  {
    id: '3',
    title:
      'NVIDIA Unveils Blackwell Ultra Architecture, Claims 10x Inference Speed Over Previous Gen',
    excerpt:
      'The announcement sent chipmaker shares surging 8% in after-hours trading as AI data center demand continues to accelerate.',
    category: 'Technology',
    categoryColor: 'category-technology',
    author: 'Priya Nair',
    authorRole: 'Tech Reporter',
    date: 'May 17, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1697071327741-04319e5d54d3',
    imageAlt:
      'Close-up of green circuit board with intricate pathways and components, bright studio lighting, clean technical detail',
    tags: ['NVIDIA', 'GPU', 'AI Hardware'],
    slug: 'nvidia-blackwell-ultra',
  },
  {
    id: '4',
    title: 'NBA Finals: Boston Celtics Claim Third Consecutive Championship in Game 7 Thriller',
    excerpt:
      "Jayson Tatum's triple-double performance sealed a historic dynasty as the Celtics edged the Thunder 98-94 in a heart-stopping finale.",
    category: 'Sports',
    categoryColor: 'category-sports',
    author: 'Marcus Webb',
    authorRole: 'Sports Desk',
    date: 'May 17, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1576250223658-05e6e593d8ce',
    imageAlt:
      'Basketball court under bright arena lights with players mid-game, crowd in background, dynamic action shot',
    tags: ['NBA', 'Celtics', 'Championship'],
    slug: 'celtics-nba-championship',
  },
  {
    id: '5',
    title: 'Mediterranean Diet Linked to 23% Reduction in Cardiovascular Events, Study Finds',
    excerpt:
      'A 12-year longitudinal study tracking 40,000 participants across six countries reveals significant protective benefits of plant-forward eating.',
    category: 'Lifestyle',
    categoryColor: 'category-lifestyle',
    author: 'Sofia Andrade',
    authorRole: 'Health & Wellness Writer',
    date: 'May 17, 2026',
    readTime: '4 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f4dc45d4-1772081333213.png',
    imageAlt:
      'Colorful Mediterranean meal spread with fresh vegetables, olive oil, and grains on a bright white table, natural daylight',
    tags: ['Health', 'Nutrition', 'Research'],
    slug: 'mediterranean-diet-cardiovascular',
  },
  {
    id: '6',
    title: 'IMF Revises Global Growth Forecast Upward to 3.4% Amid Easing Trade Tensions',
    excerpt:
      'The revised outlook reflects improved manufacturing activity in Asia-Pacific and a stronger-than-expected rebound in European consumer spending.',
    category: 'Business',
    categoryColor: 'category-business',
    author: 'James Okafor',
    authorRole: 'Global Markets Correspondent',
    date: 'May 16, 2026',
    readTime: '5 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ebb8d918-1766751948962.png',
    imageAlt:
      'Aerial view of modern city skyline with glass towers reflecting sunlight, clear blue sky, prosperous urban landscape',
    tags: ['IMF', 'Global Economy', 'Trade'],
    slug: 'imf-global-growth-forecast',
  },
];

export type CategoryPreview = {
  name: string;
  slug: string;
  color: string;
  pillClass: string;
  icon: string;
  articles: Article[];
};

export const categoryPreviews: CategoryPreview[] = [
  {
    name: 'Politics & Government',
    slug: 'politics',
    color: 'text-primary',
    pillClass: 'category-politics',
    icon: '🏛️',
    articles: [
      {
        id: 'p1',
        title: 'White House Announces New Executive Order on Domestic Semiconductor Manufacturing',
        excerpt:
          'The order directs $8 billion in federal grants toward expanding US chip production capacity over the next five years.',
        category: 'Politics',
        categoryColor: 'category-politics',
        author: 'Elena Vasquez',
        authorRole: 'White House Correspondent',
        date: 'May 18, 2026',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1729598585817-ae8f028fd1a4',
        imageAlt:
          'Washington DC Capitol building dome at dusk with orange sky, iconic silhouette against colorful sunset',
        tags: ['White House', 'Semiconductors', 'Manufacturing'],
        slug: 'white-house-semiconductor-order',
      },
      {
        id: 'p2',
        title: 'EU Parliament Votes to Extend Carbon Border Adjustment Mechanism to 2035',
        excerpt:
          'The extension covers steel, cement, aluminum, and for the first time, digital services with significant carbon footprints.',
        category: 'Politics',
        categoryColor: 'category-politics',
        author: 'Lena Hoffmann',
        authorRole: 'Europe Bureau',
        date: 'May 17, 2026',
        readTime: '3 min',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_14df8daf4-1772305141241.png',
        imageAlt:
          'European Parliament chamber interior with semicircular seating arrangement, blue and gold decor, formal session lighting',
        tags: ['EU', 'Climate Policy', 'Carbon'],
        slug: 'eu-carbon-border-mechanism',
      },
      {
        id: 'p3',
        title: 'G7 Leaders Agree on Joint Framework to Counter AI-Powered Disinformation',
        excerpt:
          'The communiqué outlines shared standards for watermarking AI-generated content and cross-border enforcement mechanisms.',
        category: 'Politics',
        categoryColor: 'category-politics',
        author: 'Richard Tanaka',
        authorRole: 'International Affairs',
        date: 'May 16, 2026',
        readTime: '5 min',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1160ec040-1768806124767.png',
        imageAlt:
          'International summit meeting room with flags of multiple nations, round conference table, formal diplomatic setting',
        tags: ['G7', 'Disinformation', 'AI Policy'],
        slug: 'g7-ai-disinformation-framework',
        factCheckRating: 'menyesatkan',
        factCheckSummary:
          'Meskipun para pemimpin G7 sepakat tentang bahaya disinformasi AI, draf kerja framework bersamanya belum disahkan sepenuhnya secara hukum.',
      },
    ],
  },
  {
    name: 'Business & Economy',
    slug: 'business',
    color: 'text-green-700',
    pillClass: 'category-business',
    icon: '📈',
    articles: [
      {
        id: 'b1',
        title:
          'Apple Reports Record Q2 Revenue of $124B, Services Segment Grows 18% Year-Over-Year',
        excerpt:
          'Strong iPhone 17 sales in India and Southeast Asia drove the beat, with services revenue crossing the $30B quarterly mark for the first time.',
        category: 'Business',
        categoryColor: 'category-business',
        author: 'Aisha Patel',
        authorRole: 'Tech Business Reporter',
        date: 'May 18, 2026',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1505573064804-7c19cb8387f4',
        imageAlt:
          'Apple Store glass facade with Apple logo, clean minimalist architecture, bright daylight reflection',
        tags: ['Apple', 'Earnings', 'Revenue'],
        slug: 'apple-record-q2-revenue',
      },
      {
        id: 'b2',
        title: 'Venture Capital Investment in Climate Tech Surpasses $40B in Q1 2026',
        excerpt:
          'Green hydrogen, grid-scale battery storage, and direct air capture startups attracted the largest share of the record quarterly figure.',
        category: 'Business',
        categoryColor: 'category-business',
        author: 'Thomas Bergmann',
        authorRole: 'Markets Correspondent',
        date: 'May 17, 2026',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1622934296055-4b688fe67dd6',
        imageAlt:
          'Wind turbines on green rolling hills under clear blue sky, clean energy landscape, bright natural lighting',
        tags: ['Venture Capital', 'Climate Tech', 'Investment'],
        slug: 'vc-climate-tech-record',
      },
      {
        id: 'b3',
        title: 'Amazon Expands Same-Day Delivery to 60 New US Cities Using Autonomous Drone Fleet',
        excerpt:
          'The rollout marks the largest single expansion of drone delivery infrastructure in commercial history, covering markets in the South and Midwest.',
        category: 'Business',
        categoryColor: 'category-business',
        author: 'Carmen Rodriguez',
        authorRole: 'Retail & Commerce',
        date: 'May 16, 2026',
        readTime: '3 min',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19316df01-1772214421984.png',
        imageAlt:
          'Modern warehouse fulfillment center interior with conveyor belts and organized shelving, bright industrial lighting',
        tags: ['Amazon', 'Drones', 'Delivery'],
        slug: 'amazon-drone-delivery-expansion',
      },
    ],
  },
  {
    name: 'Technology & Science',
    slug: 'technology',
    color: 'text-blue-700',
    pillClass: 'category-technology',
    icon: '🔬',
    articles: [
      {
        id: 't1',
        title: 'OpenAI Releases GPT-6 with Native Multimodal Reasoning Across 12 Modalities',
        excerpt:
          'The model demonstrates advanced spatial reasoning and can synthesize video, audio, code, and text in a single unified inference pass.',
        category: 'Technology',
        categoryColor: 'category-technology',
        author: 'Priya Nair',
        authorRole: 'AI Correspondent',
        date: 'May 18, 2026',
        readTime: '6 min',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b9b78950-1774149821493.png',
        imageAlt:
          'Glowing neural network visualization on dark background with interconnected nodes and data streams, blue and white light',
        tags: ['OpenAI', 'GPT-6', 'AI'],
        slug: 'openai-gpt6-release',
      },
      {
        id: 't2',
        title: 'Scientists Achieve Room-Temperature Superconductivity in New Carbon-Based Compound',
        excerpt:
          'The breakthrough, published in Nature, could revolutionize power transmission, magnetic levitation, and quantum computing hardware.',
        category: 'Technology',
        categoryColor: 'category-technology',
        author: 'Dr. Wei Zhang',
        authorRole: 'Science Editor',
        date: 'May 17, 2026',
        readTime: '7 min',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19b9aae1b-1775049093041.png',
        imageAlt:
          'Laboratory with scientific equipment, test tubes, and bright fluorescent lighting, clean sterile research environment',
        tags: ['Superconductivity', 'Physics', 'Research'],
        slug: 'room-temperature-superconductivity',
      },
      {
        id: 't3',
        title: 'SpaceX Starship Completes First Crewed Lunar Orbit Mission Successfully',
        excerpt:
          'A crew of four astronauts returned safely after a 14-day mission that included two lunar flybys and a deep-space communications test.',
        category: 'Technology',
        categoryColor: 'category-technology',
        author: 'Jake Morrison',
        authorRole: 'Space & Science',
        date: 'May 15, 2026',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1452271844093-6b9508fa1843',
        imageAlt:
          'Rocket launching into clear blue sky with white smoke trail, powerful ascent, dramatic perspective from below',
        tags: ['SpaceX', 'Starship', 'NASA'],
        slug: 'spacex-lunar-orbit-mission',
      },
    ],
  },
  {
    name: 'Lifestyle & Culture',
    slug: 'lifestyle',
    color: 'text-purple-700',
    pillClass: 'category-lifestyle',
    icon: '🎨',
    articles: [
      {
        id: 'l1',
        title: 'Cannes 2026: "The Cartographer" Wins Palme d\'Or in Surprise Unanimous Decision',
        excerpt:
          "The debut feature from Senegalese director Fatou Diallo broke records as the most-awarded first film in the festival's 79-year history.",
        category: 'Lifestyle',
        categoryColor: 'category-lifestyle',
        author: 'Isabelle Fontaine',
        authorRole: 'Arts & Culture',
        date: 'May 18, 2026',
        readTime: '4 min',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_181caa39c-1772253556347.png',
        imageAlt:
          'Film festival red carpet with bright spotlights and elegant crowd, glamorous evening event atmosphere, warm golden lighting',
        tags: ['Cannes', 'Film', 'Awards'],
        slug: 'cannes-palme-dor-2026',
      },
      {
        id: 'l2',
        title: 'The "Slow Living" Movement Is Reshaping How Gen Z Approaches Work and Leisure',
        excerpt:
          'A new Pew Research survey finds 61% of adults aged 18-28 prioritize quality of life over career advancement, a 22-point jump since 2020.',
        category: 'Lifestyle',
        categoryColor: 'category-lifestyle',
        author: 'Naomi Clarke',
        authorRole: 'Culture Reporter',
        date: 'May 17, 2026',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1658940347542-dcec41b437bb',
        imageAlt:
          'Person sitting peacefully on mountain overlook at sunrise, serene landscape, soft golden morning light, calm atmosphere',
        tags: ['Gen Z', 'Lifestyle', 'Work-Life Balance'],
        slug: 'slow-living-gen-z',
      },
      {
        id: 'l3',
        title: "James Beard Awards 2026: Chicago's Culinary Scene Dominates With Six Major Wins",
        excerpt:
          'Chef Amara Obi of Lagoon Restaurant took Outstanding Chef honors, while three other Chicago establishments claimed regional titles.',
        category: 'Lifestyle',
        categoryColor: 'category-lifestyle',
        author: 'Sofia Andrade',
        authorRole: 'Food & Culture',
        date: 'May 16, 2026',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1668246791341-7d30c2bbb4c3',
        imageAlt:
          'Elegant restaurant interior with warm candlelight, artfully plated gourmet food on white table, sophisticated dining atmosphere',
        tags: ['Food', 'Awards', 'Chicago'],
        slug: 'james-beard-awards-2026',
      },
    ],
  },
  {
    name: 'Sports',
    slug: 'sports',
    color: 'text-red-600',
    pillClass: 'category-sports',
    icon: '⚽',
    articles: [
      {
        id: 's1',
        title:
          'Novak Djokovic Wins Record 25th Grand Slam Title at French Open, Extends All-Time Record',
        excerpt:
          "The 39-year-old Serbian legend defeated Carlos Alcaraz in a five-set epic to cement his status as the sport's greatest champion.",
        category: 'Sports',
        categoryColor: 'category-sports',
        author: 'Marcus Webb',
        authorRole: 'Sports Correspondent',
        date: 'May 18, 2026',
        readTime: '4 min',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_14746d329-1778687003530.png',
        imageAlt:
          'Tennis player celebrating victory on clay court with arms raised, Roland Garros red court, bright sunshine, crowd cheering',
        tags: ['Tennis', 'French Open', 'Djokovic'],
        slug: 'djokovic-25th-grand-slam',
      },
      {
        id: 's2',
        title: 'FIFA Confirms 2030 World Cup Will Feature 64 Teams Across Six Continents',
        excerpt:
          'The expanded tournament, celebrating the 100th anniversary of the World Cup, will span 22 host cities across Africa, Asia, and the Americas.',
        category: 'Sports',
        categoryColor: 'category-sports',
        author: 'Paulo Ferreira',
        authorRole: 'Global Football',
        date: 'May 17, 2026',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1674760726595-d12f5e45482a',
        imageAlt:
          'Soccer stadium filled with cheering fans at night, green pitch under floodlights, electric atmosphere, colorful crowd',
        tags: ['FIFA', 'World Cup', '2030'],
        slug: 'fifa-world-cup-2030-expanded',
      },
      {
        id: 's3',
        title: 'Golden State Warriors Sign Victor Wembanyama to Historic $400M Max Extension',
        excerpt:
          "The deal, the largest in NBA history, signals the Warriors' commitment to building their next dynasty around the 22-year-old French phenom.",
        category: 'Sports',
        categoryColor: 'category-sports',
        author: 'Darius Thompson',
        authorRole: 'NBA Reporter',
        date: 'May 16, 2026',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1581390891065-f456a3a4921f',
        imageAlt:
          'Basketball player in mid-air dunk at indoor arena with bright court lighting, action shot, energetic crowd background',
        tags: ['NBA', 'Warriors', 'Wembanyama'],
        slug: 'warriors-wembanyama-extension',
      },
    ],
  },
];

export const sampleArticle: Article = {
  id: 'full-1',
  title: 'Senate Passes Landmark AI Governance Bill After Months of Bipartisan Negotiation',
  excerpt:
    'The legislation establishes the first federal framework for regulating large language models and autonomous systems used in critical infrastructure.',
  category: 'Politics',
  categoryColor: 'category-politics',
  author: 'Margaret Holloway',
  authorRole: 'Political Correspondent',
  date: 'May 18, 2026',
  readTime: '6 min read',
  image: 'https://images.unsplash.com/photo-1673725641916-5b3625cfb335',
  imageAlt:
    'Sunlit marble government building exterior with grand columns and American flag, bright clear sky, formal architectural setting',
  tags: ['AI', 'Legislation', 'Senate', 'Technology Policy', 'Bipartisan'],
  slug: 'senate-ai-governance-bill',
  body: [
    "WASHINGTON — The United States Senate passed the Artificial Intelligence Accountability and Safety Act on Thursday in a rare 72-28 bipartisan vote, sending the most comprehensive AI regulation package in American history to the President's desk for signature.",
    'The legislation, which took 14 months to negotiate through a joint Senate-House conference committee, establishes the Federal AI Safety Board, a new independent agency charged with reviewing high-risk AI deployments in sectors including energy, transportation, financial services, and healthcare.',
    'Senate Majority Leader Andrea Mitchell called the vote "a historic moment for American technology leadership," adding that the framework balances innovation incentives with necessary safeguards. "We are not here to stop progress. We are here to ensure progress doesn\'t stop us," she said from the Senate floor before the final vote.',
    "The bill's key provisions include mandatory pre-deployment safety assessments for AI systems capable of autonomous decision-making, a national registry for large language models with more than 10 billion parameters, and a whistleblower protection framework for AI safety researchers.",
    "Critics from the technology industry argued the bill's compliance costs could disadvantage American companies against foreign competitors not subject to similar regulations. The Computer & Communications Industry Association estimated first-year compliance costs at $2.3 billion across the sector.",
    'Proponents counter that clear federal standards will ultimately reduce legal uncertainty and create a more stable environment for long-term AI investment. Several major technology executives, including representatives from Microsoft, Google, and Anthropic, testified in support of the framework during committee hearings.',
    'The White House issued a statement indicating the President intends to sign the bill within 10 days, calling it "a thoughtful, evidence-based approach to governing transformative technology in the public interest."',
    'Implementation of the Federal AI Safety Board is expected to begin within 180 days of enactment, with the first round of mandatory safety assessments due by Q1 2027 for systems already in commercial deployment.',
  ],
};
