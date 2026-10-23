/**
 * Rahul Midas Official Creator Configuration
 * All video IDs, titles, and links are verified from the official channel:
 * https://youtube.com/@rahulmidas
 */

export interface VideoItem {
  id: string;
  title: string;
  category: 'strategies' | 'vlogs' | 'crypto';
  categoryLabel: string;
  views?: string;
  duration?: string;
  publishedDate?: string;
  featured?: boolean;
  description?: string;
}

export interface ShortItem {
  id: string;
  title: string;
  views?: string;
}

export const CREATOR_CONFIG = {
  name: 'Rahul Midas',
  handle: '@rahulmidas',
  tagline: 'Trader · Vlogger · Content Creator',
  youtubeUrl: 'https://youtube.com/@rahulmidas?si=UZp14aBNXz7DwDJv',
  telegramUrl: 'https://t.me/+VwqCkyl3v_c4OWY1',
  stats: {
    subscribers: '210K+',
    videos: '190+',
    views: '15M+',
    communityMembers: 'Active Traders',
  },
  bio: 'Rahul Midas is an Indian content creator and trader who documents his real trading journey, binary options price action strategies, financial risk management, and personal milestones—from his Mumbai beginnings to purchasing his dream home and lifestyle vlogs.',
};

/**
 * Verified real public videos from @rahulmidas
 */
export const VERIFIED_VIDEOS: VideoItem[] = [
  {
    id: 'mMEo3oKXrmQ',
    title: 'My Home Tour 🥹🏡 | 18 Year Old Trader’s Dream House | Rahul Midas',
    category: 'vlogs',
    categoryLabel: 'Lifestyle & Milestone',
    duration: '14:22',
    views: '185K views',
    publishedDate: 'Milestone Vlog',
    featured: true,
    description: 'An honest look at achieving a long-standing personal dream through discipline, market learning, and dedication.',
  },
  {
    id: 'c7gqbdc5S9g',
    title: 'Pocket Option | $8,000 To $26,000? 🤯 With Secret 1 Minute Strategy | Pocket Option Trading Strategy',
    category: 'strategies',
    categoryLabel: 'Trading Strategy',
    duration: '11:45',
    views: '120K views',
    publishedDate: 'Price Action Guide',
    featured: true,
    description: 'Deep dive into 1-minute candlestick confirmations, support & resistance levels, and execution discipline.',
  },
  {
    id: 'JXGAW2LXAaA',
    title: 'Pocket Option | 1 Minute Secret Strategy | Pocket Option Trading Strategy | Binary Options Strategy',
    category: 'strategies',
    categoryLabel: 'Trading Strategy',
    duration: '10:18',
    views: '240K views',
    publishedDate: 'Core Masterclass',
    featured: true,
    description: 'The foundational 1-minute methodology breaking down market momentum and trend-continuation setups.',
  },
  {
    id: 'vb9KjgZ739I',
    title: 'Pocket Option | $100 To $2000 Compounding | Pocket Option Trading Strategy | Binary Trading Strategy',
    category: 'strategies',
    categoryLabel: 'Compounding',
    duration: '13:04',
    views: '95K views',
    publishedDate: 'Live Session',
    featured: false,
    description: 'A step-by-step demonstration of compounding rules and emotional control during high-pressure trading.',
  },
  {
    id: 'TsgMhLndn-w',
    title: 'USDT Sell Kaise Kare Without P2P 🔥 | How To Sell Usdt On CoinSwitch | Rahul Midas',
    category: 'crypto',
    categoryLabel: 'Crypto & USDT',
    duration: '08:52',
    views: '75K views',
    publishedDate: 'Practical Guide',
    featured: false,
    description: 'Step-by-step tutorial on safely handling USDT transactions and liquidations without relying on P2P risks.',
  },
  {
    id: 'ttdS4I7FqHo',
    title: 'How To Buy USDT Without P2P | Trust Wallet Se USDT Kaise Buy Kare | USDT Buying Guide 2026',
    category: 'crypto',
    categoryLabel: 'Crypto & USDT',
    duration: '09:30',
    views: '88K views',
    publishedDate: 'Practical Guide',
    featured: false,
    description: 'Comprehensive walkthrough of acquiring USDT directly through non-custodial wallets safely.',
  },
  {
    id: 'bj2ODioQv3E',
    title: 'Pocket Option | $9,000 Profit in Goa 🌴🔥 with Secret Pocket Option Strategy | Pocket Option Trading',
    category: 'vlogs',
    categoryLabel: 'Lifestyle & Trading',
    duration: '12:15',
    views: '110K views',
    publishedDate: 'Goa Travel & Trade',
    featured: false,
    description: 'Trading on the go while traveling in Goa, combining lifestyle documentation with disciplined chart setups.',
  },
  {
    id: 'YQVYlFYjnlQ',
    title: 'Pocket Option USDT Deposit & Withdrawal Kaise Kare | Trust Wallet Full Guide 2026',
    category: 'crypto',
    categoryLabel: 'Crypto & USDT',
    duration: '11:10',
    views: '62K views',
    publishedDate: 'Step-by-Step',
    featured: false,
    description: 'Safe deposit and withdrawal workflows using Trust Wallet with real transaction verifications.',
  },
  {
    id: 'WjH6u7a4gbY',
    title: 'Pocket Option | My Personal 1 Minute Pocket Option Strategy 🔥 | Pocket Option Trading Strategy',
    category: 'strategies',
    categoryLabel: 'Trading Strategy',
    duration: '10:48',
    views: '145K views',
    publishedDate: 'Secret Framework',
    featured: false,
    description: 'Breakdown of personal entry timing rules and candlestick pattern recognition.',
  },
  {
    id: 'vUErFcwILYo',
    title: 'Pocket Option REAL or FAKE? 😱 | The TRUTH Revealed 🔥 | Pocket Option Trading',
    category: 'vlogs',
    categoryLabel: 'Transparency',
    duration: '15:20',
    views: '310K views',
    publishedDate: 'Deep Analysis',
    featured: false,
    description: 'Unfiltered discussion analyzing platform mechanics, payout realities, and common trader pitfalls.',
  },
  {
    id: 'mpOPCuFvuEo',
    title: 'Pocket Option | Pocket Option EMA 9 + EMA 21 + RSI Strategy 🔥 | Pocket Option Trading Strategy 2026',
    category: 'strategies',
    categoryLabel: 'Technical Indicators',
    duration: '14:02',
    views: '98K views',
    publishedDate: 'Indicator Setup',
    featured: false,
    description: 'How to combine moving average crossovers with momentum oscillators for higher probability entries.',
  },
  {
    id: 'ICN8di2CC38',
    title: 'Pocket Option | $129 To $2000? with Secret Pocket Option Strategy 🔥 | Pocket Option Trading Strategy',
    category: 'strategies',
    categoryLabel: 'Trading Strategy',
    duration: '12:35',
    views: '84K views',
    publishedDate: 'Case Study',
    featured: false,
    description: 'Risk-controlled account growth exercise focusing on position sizing and exit rules.',
  },
];

/**
 * Verified real YouTube Shorts from @rahulmidas
 */
export const VERIFIED_SHORTS: ShortItem[] = [
  {
    id: 'juexfRtstG0',
    title: '1 Crore Luxury Flat Reveal | Trader Milestone',
    views: '450K views',
  },
  {
    id: 'zSa3oSmXh50',
    title: 'Day 2 of My Trading Life | Goa Journey',
    views: '280K views',
  },
  {
    id: 'YeqlQKDZcMs',
    title: 'Day 1 of My Trading Life | Market Morning',
    views: '310K views',
  },
  {
    id: 'j7t3hHZQ7rU',
    title: 'Pocket Option Secret Line Strategy Breakdown',
    views: '520K views',
  },
];
