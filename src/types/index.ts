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