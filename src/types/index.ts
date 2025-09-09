export interface Lead {
  id: string;
  name: string;
  contact: string;
  date: string;
  source: string;
  platform: 'Meta Ads' | 'Google Ads';
  campaign: string;
  adSet?: string;
}

export interface Campaign {
  id: string;
  name: string;
  leads: number;
  cpl: number;
  investment: number;
  impressions: number;
  clicks: number;
  ctr: number;
  platform: 'Meta Ads' | 'Google Ads';
}

export interface DashboardMetrics {
  totalLeads: number;
  cpl: number;
  totalInvestment: number;
  leadsSources: {
    metaAds: number;
    googleAds: number;
  };
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  cpm: number;
  cpc: number;
}

export interface AIAnalysis {
  diagnosis: string;
  causeAnalysis: string;
  recommendedAction: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedImpact: string;
}

export type PeriodFilter = 
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisMonth'
  | 'lastMonth'
  | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface Goal {
  id: string;
  name: string;
  type: 'leads' | 'cpl' | 'roas' | 'ctr';
  target: number;
  current: number;
  period: 'daily' | 'weekly' | 'monthly';
  status: 'on-track' | 'at-risk' | 'behind';
}

export interface CompetitorData {
  name: string;
  estimatedCPL: number;
  marketShare: number;
  adSpend: number;
}

export interface Forecast {
  period: string;
  predictedLeads: number;
  predictedCPL: number;
  confidence: number;
}

export interface Alert {
  id: string;
  type: 'performance_drop' | 'budget_alert' | 'opportunity' | 'anomaly';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  campaignId?: string;
  timestamp: Date;
  dismissed: boolean;
}

// New types for SaaS platform
export interface SocialMediaAccount {
  id: string;
  platform: 'Instagram' | 'TikTok' | 'LinkedIn' | 'Facebook';
  username: string;
  connected: boolean;
  followers: number;
  lastSync: Date;
}

export interface ContentPost {
  id: string;
  platform: string;
  content: string;
  mediaUrl?: string;
  hashtags: string[];
  scheduledDate: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
}

export interface CampaignTemplate {
  id: string;
  name: string;
  platform: 'Meta Ads' | 'Google Ads';
  type: 'conversion' | 'traffic' | 'awareness' | 'lead_generation';
  structure: {
    adSets?: AdSetTemplate[];
    keywords?: string[];
    audiences?: AudienceTemplate[];
    creatives?: CreativeTemplate[];
  };
  budget: number;
  objective: string;
}

export interface AdSetTemplate {
  name: string;
  budget: number;
  targeting: AudienceTemplate;
  placements: string[];
}

export interface AudienceTemplate {
  name: string;
  demographics: {
    ageMin: number;
    ageMax: number;
    genders: string[];
    locations: string[];
  };
  interests: string[];
  behaviors: string[];
  customAudiences?: string[];
}

export interface CreativeTemplate {
  type: 'image' | 'video' | 'carousel' | 'text';
  headline: string;
  description: string;
  callToAction: string;
  mediaUrl?: string;
}

export interface StrategicPlan {
  id: string;
  clientName: string;
  industry: string;
  budget: number;
  objectives: string[];
  recommendations: {
    mediaStrategy: string;
    contentStrategy: string;
    budgetAllocation: {
      metaAds: number;
      googleAds: number;
      content: number;
    };
    timeline: string;
  };
  createdAt: Date;
}

export interface QuickAction {
  id: string;
  type: 'pause_campaign' | 'increase_budget' | 'duplicate_campaign' | 'optimize_targeting';
  campaignId: string;
  campaignName: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  estimatedResult: string;
}

export interface APIConnection {
  platform: 'Meta Ads' | 'Google Ads' | 'Instagram' | 'TikTok' | 'LinkedIn';
  connected: boolean;
  lastSync: Date;
  status: 'active' | 'error' | 'expired';
  permissions: string[];
}

export interface ContentCalendar {
  id: string;
  month: number;
  year: number;
  posts: ContentPost[];
  suggestions: AIContentSuggestion[];
}

export interface AIContentSuggestion {
  id: string;
  platform: string;
  content: string;
  hashtags: string[];
  bestTime: string;
  reasoning: string;
  confidence: number;
}