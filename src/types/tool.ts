export type ToolCategory =
  | 'video'
  | 'image'
  | 'coding'
  | 'writing'
  | 'chatbots'
  | 'music'
  | 'voice'
  | 'research'
  | 'education'
  | 'automation'
  | 'business';

export type PricingModel = 'Free' | 'Freemium' | 'Free Trial' | 'Paid' | 'Open Source';

export type Platform = 'Web' | 'Mac' | 'Windows' | 'Linux' | 'iOS' | 'Android' | 'API' | 'CLI' | 'Extension';

export interface AITool {
  id: string; // url slug
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  pricingModel: PricingModel;
  pricingDetails: string;
  hasFreeTier: boolean;
  isOpenSource: boolean;
  isVerified: boolean;
  websiteUrl: string;
  repositoryUrl?: string;
  rating: number; // e.g. 4.8
  reviewCount: number;
  launchYear: number;
  company: string;
  platforms: Platform[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  freeAlternatives: string[]; // IDs of recommended free/open-source tools
  tags: string[];
  initials: string;
}

export interface UserReview {
  id: string;
  toolId: string;
  userName: string;
  userRole?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  pros?: string;
  cons?: string;
  verifiedUser?: boolean;
}

export interface ToolSubmission {
  id: string;
  name: string;
  websiteUrl: string;
  category: ToolCategory;
  pricingModel: PricingModel;
  pricingDetails: string;
  tagline: string;
  description: string;
  hasFreeTier: boolean;
  isOpenSource: boolean;
  submittedAt: string;
  submitterEmail: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FilterOptions {
  searchQuery: string;
  category: ToolCategory | 'all';
  pricingModel: PricingModel | 'all';
  onlyFreeOrFreemium: boolean;
  onlyOpenSource: boolean;
  onlyVerified: boolean;
  platform: Platform | 'all';
  sortBy: 'popular' | 'rating' | 'name' | 'newest';
}
