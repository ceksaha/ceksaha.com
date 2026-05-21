// src/data/seed.js
const fs = require('fs');
const path = require('path');

// We will reconstruct the data from mockData.ts
const featuredArticles = [
  {
    id: '1',
    title: 'Senate Passes Landmark AI Governance Bill After Months of Bipartisan Negotiation',
    content: `WASHINGTON — The United States Senate passed the Artificial Intelligence Accountability and Safety Act on Thursday in a rare 72-28 bipartisan vote, sending the most comprehensive AI regulation package in American history to the President's desk for signature.

The legislation, which took 14 months to negotiate through a joint Senate-House conference committee, establishes the Federal AI Safety Board, a new independent agency charged with reviewing high-risk AI deployments in sectors including energy, transportation, financial services, and healthcare.

Senate Majority Leader Andrea Mitchell called the vote "a historic moment for American technology leadership," adding that the framework balances innovation incentives with necessary safeguards. "We are not here to stop progress. We are here to ensure progress doesn't stop us," she said from the Senate floor before the final vote.

The bill's key provisions include mandatory pre-deployment safety assessments for AI systems capable of autonomous decision-making, a national registry for large language models with more than 10 billion parameters, and a whistleblower protection framework for AI safety researchers.`,
    imageUrl: 'https://images.unsplash.com/photo-1673725641916-5b3625cfb335',
    category: 'Politics',
    categoryColor: 'category-politics bg-gradient-to-r from-primary to-accent',
    createdAt: new Date('May 18, 2026').toISOString(),
    updatedAt: new Date('May 18, 2026').toISOString()
  },
  {
    id: '2',
    title: 'Federal Reserve Holds Rates Steady, Signals Two Cuts Possible Before Year End',
    content: 'Chair Jerome Powell cited cooling inflation data and a resilient labor market as key factors in the unanimous decision by the Federal Reserve to hold interest rates steady.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_115f480d4-1773360011752.png',
    category: 'Business',
    categoryColor: 'category-business bg-green-700',
    createdAt: new Date('May 18, 2026').toISOString(),
    updatedAt: new Date('May 18, 2026').toISOString()
  },
  {
    id: '3',
    title: 'NVIDIA Unveils Blackwell Ultra Architecture, Claims 10x Inference Speed Over Previous Gen',
    content: 'NVIDIA announced the Blackwell Ultra GPU architecture, claiming a massive 10x inference performance boost for large-scale AI models. The announcement sent chipmaker shares surging 8% in after-hours trading as AI data center demand continues to accelerate globally.',
    imageUrl: 'https://images.unsplash.com/photo-1697071327741-04319e5d54d3',
    category: 'Technology',
    categoryColor: 'category-technology bg-blue-700',
    createdAt: new Date('May 17, 2026').toISOString(),
    updatedAt: new Date('May 17, 2026').toISOString()
  },
  {
    id: '4',
    title: 'NBA Finals: Boston Celtics Claim Third Consecutive Championship in Game 7 Thriller',
    content: "Jayson Tatum's triple-double performance sealed a historic dynasty as the Celtics edged the Thunder 98-94 in a heart-stopping Game 7 finale to claim their third consecutive championship.",
    imageUrl: 'https://images.unsplash.com/photo-1576250223658-05e6e593d8ce',
    category: 'Sports',
    categoryColor: 'category-sports bg-accent',
    createdAt: new Date('May 17, 2026').toISOString(),
    updatedAt: new Date('May 17, 2026').toISOString()
  },
  {
    id: '5',
    title: 'Mediterranean Diet Linked to 23% Reduction in Cardiovascular Events, Study Finds',
    content: 'A 12-year longitudinal study tracking 40,000 participants across six countries reveals significant protective benefits of plant-forward eating, linking the Mediterranean Diet to a 23% reduction in cardiovascular events.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f4dc45d4-1772081333213.png',
    category: 'Lifestyle',
    categoryColor: 'category-lifestyle bg-purple-700',
    createdAt: new Date('May 17, 2026').toISOString(),
    updatedAt: new Date('May 17, 2026').toISOString()
  },
  {
    id: '6',
    title: 'IMF Revises Global Growth Forecast Upward to 3.4% Amid Easing Trade Tensions',
    content: 'The revised IMF outlook reflects improved manufacturing activity in Asia-Pacific and a stronger-than-expected rebound in European consumer spending, pushing global growth forecasts up to 3.4%.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ebb8d918-1766751948962.png',
    category: 'Business',
    categoryColor: 'category-business bg-green-700',
    createdAt: new Date('May 16, 2026').toISOString(),
    updatedAt: new Date('May 16, 2026').toISOString()
  }
];

const categoryArticles = [
  {
    id: 'p1',
    title: 'White House Announces New Executive Order on Domestic Semiconductor Manufacturing',
    content: 'The executive order directs $8 dollar billions in federal grants toward expanding domestic semiconductor and chip manufacturing capabilities across the United States over the next five years.',
    imageUrl: 'https://images.unsplash.com/photo-1729598585817-ae8f028fd1a4',
    category: 'Politics',
    categoryColor: 'category-politics bg-gradient-to-r from-primary to-accent',
    createdAt: new Date('May 18, 2026').toISOString(),
    updatedAt: new Date('May 18, 2026').toISOString()
  },
  {
    id: 'p2',
    title: 'EU Parliament Votes to Extend Carbon Border Adjustment Mechanism to 2035',
    content: 'The European Union parliament voted overwhelmingly to extend its carbon border tax to cover steel, cement, and digital services with significant carbon footprints all the way to 2035.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_14df8daf4-1772305141241.png',
    category: 'Politics',
    categoryColor: 'category-politics bg-gradient-to-r from-primary to-accent',
    createdAt: new Date('May 17, 2026').toISOString(),
    updatedAt: new Date('May 17, 2026').toISOString()
  },
  {
    id: 'p3',
    title: 'G7 Leaders Agree on Joint Framework to Counter AI-Powered Disinformation',
    content: 'G7 nations have agreed to a new joint working framework to detect, watermark, and counter AI-powered synthetic media and disinformation campaigns across borders.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_1160ec040-1768806124767.png',
    category: 'Politics',
    categoryColor: 'category-politics bg-gradient-to-r from-primary to-accent',
    createdAt: new Date('May 16, 2026').toISOString(),
    updatedAt: new Date('May 16, 2026').toISOString()
  },
  {
    id: 'b1',
    title: 'Apple Reports Record Q2 Revenue of $124B, Services Segment Grows 18% Year-Over-Year',
    content: 'Apple posted record-breaking quarterly revenue of $124 billion, fueled by massive iPhone sales in Southeast Asia and an 18% year-over-year surge in services segment revenues.',
    imageUrl: 'https://images.unsplash.com/photo-1505573064804-7c19cb8387f4',
    category: 'Business',
    categoryColor: 'category-business bg-green-700',
    createdAt: new Date('May 18, 2026').toISOString(),
    updatedAt: new Date('May 18, 2026').toISOString()
  },
  {
    id: 'b2',
    title: 'Venture Capital Investment in Climate Tech Surpasses $40B in Q1 2026',
    content: 'VC investment in clean energy, hydrogen grids, battery storage, and carbon capture technologies reached an all-time quarterly high of $40 billion globally in Q1 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1622934296055-4b688fe67dd6',
    category: 'Business',
    categoryColor: 'category-business bg-green-700',
    createdAt: new Date('May 17, 2026').toISOString(),
    updatedAt: new Date('May 17, 2026').toISOString()
  },
  {
    id: 't1',
    title: 'OpenAI Releases GPT-6 with Native Multimodal Reasoning Across 12 Modalities',
    content: 'OpenAI officially released GPT-6, featuring next-generation capabilities that can natively reason across 12 distinct data modalities including text, audio, video, code, and spatial maps.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b9b78950-1774149821493.png',
    category: 'Technology',
    categoryColor: 'category-technology bg-blue-700',
    createdAt: new Date('May 18, 2026').toISOString(),
    updatedAt: new Date('May 18, 2026').toISOString()
  },
  {
    id: 't2',
    title: 'Scientists Achieve Room-Temperature Superconductivity in New Carbon-Based Compound',
    content: 'In a historic breakthrough published in Nature, researchers achieved near-room-temperature superconductivity using a novel carbon-sulfur-hydrogen crystal structure at moderate pressures.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_19b9aae1b-1775049093041.png',
    category: 'Technology',
    categoryColor: 'category-technology bg-blue-700',
    createdAt: new Date('May 17, 2026').toISOString(),
    updatedAt: new Date('May 17, 2026').toISOString()
  },
  {
    id: 'l1',
    title: 'Cannes 2026: "The Cartographer" Wins Palme d\'Or in Surprise Unanimous Decision',
    content: 'The brilliant debut feature film from Senegalese director Fatou Diallo took home the top honor at the 79th Cannes Film Festival, winning the prestigious Palme d\'Or.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_181caa39c-1772253556347.png',
    category: 'Lifestyle',
    categoryColor: 'category-lifestyle bg-purple-700',
    createdAt: new Date('May 18, 2026').toISOString(),
    updatedAt: new Date('May 18, 2026').toISOString()
  },
  {
    id: 's1',
    title: 'Novak Djokovic Wins Record 25th Grand Slam Title at French Open',
    content: 'The legendary Novak Djokovic outlasted Carlos Alcaraz in a five-set epic French Open final to claim his historic 25th Grand Slam title, solidifying his standing as the greatest ever.',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_14746d329-1778687003530.png',
    category: 'Sports',
    categoryColor: 'category-sports bg-accent',
    createdAt: new Date('May 18, 2026').toISOString(),
    updatedAt: new Date('May 18, 2026').toISOString()
  }
];

const allSeedArticles = [...featuredArticles, ...categoryArticles];

const targetPath = path.join(__dirname, 'articles.json');

// Read existing articles, if any, and merge
let existing = [];
try {
  if (fs.existsSync(targetPath)) {
    const raw = fs.readFileSync(targetPath, 'utf8');
    existing = JSON.parse(raw);
  }
} catch (e) {}

// Avoid duplicates by title
const merged = [...existing];
allSeedArticles.forEach(seed => {
  if (!merged.some(item => item.title === seed.title)) {
    merged.push(seed);
  }
});

fs.writeFileSync(targetPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`Seed completed successfully! Migrated ${allSeedArticles.length} mock articles.`);
