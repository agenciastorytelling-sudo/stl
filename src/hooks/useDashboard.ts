import { useState, useEffect } from 'react';
import type { 
  DashboardMetrics, 
  Campaign, 
  Lead, 
  PeriodFilter, 
  DateRange, 
  Notification, 
  Goal, 
  CompetitorData, 
  Forecast,
  Alert 
} from '../types';

// Mock data generator
const generateMockData = (): {
  metrics: DashboardMetrics;
  campaigns: Campaign[];
  leads: Lead[];
  notifications: Notification[];
  goals: Goal[];
  competitors: CompetitorData[];
  forecasts: Forecast[];
  alerts: Alert[];
} => {
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campanha Black Friday - Meta',
      leads: 45,
      cpl: 12.50,
      investment: 562.50,
      impressions: 8500,
      clicks: 340,
      ctr: 4.0,
      platform: 'Meta Ads'
    },
    {
      id: '2',
      name: 'Promoção Fim de Ano - Google',
      leads: 32,
      cpl: 18.75,
      investment: 600.00,
      impressions: 12000,
      clicks: 240,
      ctr: 2.0,
      platform: 'Google Ads'
    },
    {
      id: '3',
      name: 'Liquidação Janeiro - Meta',
      leads: 28,
      cpl: 15.30,
      investment: 428.40,
      impressions: 6800,
      clicks: 195,
      ctr: 2.87,
      platform: 'Meta Ads'
    }
  ];

  const leads: Lead[] = [
    {
      id: '1',
      name: 'João Silva',
      contact: '(11) 99999-9999',
      date: '2025-01-21T10:30:00Z',
      source: 'Campanha Black Friday - Meta',
      platform: 'Meta Ads',
      campaign: 'Campanha Black Friday - Meta'
    },
    {
      id: '2',
      name: 'Maria Santos',
      contact: 'maria@email.com',
      date: '2025-01-21T09:15:00Z',
      source: 'Promoção Fim de Ano - Google',
      platform: 'Google Ads',
      campaign: 'Promoção Fim de Ano - Google'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      contact: '(11) 88888-8888',
      date: '2025-01-20T16:45:00Z',
      source: 'Liquidação Janeiro - Meta',
      platform: 'Meta Ads',
      campaign: 'Liquidação Janeiro - Meta'
    }
  ];

  const totalLeads = campaigns.reduce((sum, campaign) => sum + campaign.leads, 0);
  const totalInvestment = campaigns.reduce((sum, campaign) => sum + campaign.investment, 0);
  const avgCpl = totalInvestment / totalLeads;
  
  const metaLeads = campaigns
    .filter(c => c.platform === 'Meta Ads')
    .reduce((sum, campaign) => sum + campaign.leads, 0);
  
  const googleLeads = campaigns
    .filter(c => c.platform === 'Google Ads')
    .reduce((sum, campaign) => sum + campaign.leads, 0);

  const metrics: DashboardMetrics = {
    totalLeads,
    cpl: avgCpl,
    totalInvestment,
    leadsSources: {
      metaAds: metaLeads,
      googleAds: googleLeads
    },
    followers: 12500,
    engagement: 4.2,
    reach: 45000,
    impressions: campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0),
    cpm: 8.50,
    cpc: 2.30
  };

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      title: 'CPL Aumentou 15%',
      message: 'O CPL da campanha "Black Friday" aumentou significativamente nas últimas 24h',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/campaigns'
    },
    {
      id: '2',
      type: 'success',
      title: 'Meta Atingida',
      message: 'Parabéns! Você atingiu a meta de 100 leads este mês',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Novo Lead Recebido',
      message: 'Maria Santos se interessou pela campanha "Promoção Fim de Ano"',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true
    }
  ];

  const goals: Goal[] = [
    {
      id: '1',
      name: 'Leads Mensais',
      type: 'leads',
      target: 150,
      current: totalLeads,
      period: 'monthly',
      status: totalLeads >= 120 ? 'on-track' : totalLeads >= 90 ? 'at-risk' : 'behind'
    },
    {
      id: '2',
      name: 'CPL Máximo',
      type: 'cpl',
      target: 15.00,
      current: avgCpl,
      period: 'monthly',
      status: avgCpl <= 15 ? 'on-track' : avgCpl <= 20 ? 'at-risk' : 'behind'
    }
  ];

  const competitors: CompetitorData[] = [
    { name: 'Concorrente A', estimatedCPL: 18.50, marketShare: 25, adSpend: 15000 },
    { name: 'Concorrente B', estimatedCPL: 22.30, marketShare: 18, adSpend: 12000 },
    { name: 'Concorrente C', estimatedCPL: 16.80, marketShare: 15, adSpend: 8500 }
  ];

  const forecasts: Forecast[] = [
    { period: 'Próxima Semana', predictedLeads: 28, predictedCPL: 14.20, confidence: 85 },
    { period: 'Próximo Mês', predictedLeads: 125, predictedCPL: 15.80, confidence: 78 },
    { period: 'Próximo Trimestre', predictedLeads: 380, predictedCPL: 16.50, confidence: 65 }
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'performance_drop',
      severity: 'high',
      title: 'Queda de Performance Detectada',
      description: 'CTR da campanha "Black Friday" caiu 40% nas últimas 6 horas',
      campaignId: '1',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      dismissed: false
    },
    {
      id: '2',
      type: 'opportunity',
      severity: 'medium',
      title: 'Oportunidade de Escala',
      description: 'Campanha "Liquidação Janeiro" com CPL 30% abaixo da meta - considere aumentar budget',
      campaignId: '3',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      dismissed: false
    }
  ];

  return { metrics, campaigns, leads, notifications, goals, competitors, forecasts, alerts };
};

export function useDashboard() {
  const [period, setPeriod] = useState<PeriodFilter>('last30days');
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([
    'followers', 'engagement', 'reach'
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const { metrics, campaigns, leads, notifications, goals, competitors, forecasts, alerts } = generateMockData();

  // Mock data for new features
  const quickActions: QuickAction[] = [
    {
      id: '1',
      type: 'pause_campaign',
      campaignId: '1',
      campaignName: 'Campanha Black Friday - Meta',
      description: 'CTR caiu 40% nas últimas 6 horas',
      impact: 'high',
      estimatedResult: 'Economia de R$ 200-300 em gastos desnecessários'
    },
    {
      id: '2',
      type: 'increase_budget',
      campaignId: '3',
      campaignName: 'Liquidação Janeiro - Meta',
      description: 'CPL 30% abaixo da meta, oportunidade de escala',
      impact: 'medium',
      estimatedResult: '+15-20 leads adicionais com mesmo CPL'
    }
  ];

  const contentCalendar: ContentCalendar = {
    id: '1',
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    posts: [
      {
        id: '1',
        platform: 'Instagram',
        content: 'Dica do dia: Como otimizar suas campanhas de Meta Ads para melhor performance! 🚀',
        hashtags: ['marketing', 'metaads', 'dicas', 'performance'],
        scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: 'scheduled'
      }
    ],
    suggestions: [
      {
        id: '1',
        platform: 'Instagram',
        content: 'Você sabia que campanhas com vídeos têm 30% mais engajamento? Teste agora! 📹✨',
        hashtags: ['video', 'marketing', 'engajamento', 'dicas'],
        bestTime: '18:00',
        reasoning: 'Baseado no histórico de engajamento da sua audiência',
        confidence: 85
      },
      {
        id: '2',
        platform: 'LinkedIn',
        content: 'Case de sucesso: Como reduzimos o CPL em 45% usando segmentação inteligente.',
        hashtags: ['casesucesso', 'cpl', 'segmentacao', 'resultados'],
        bestTime: '09:00',
        reasoning: 'Horário de maior atividade profissional',
        confidence: 92
      }
    ]
  };

  const socialAccounts: SocialMediaAccount[] = [
    {
      id: '1',
      platform: 'Instagram',
      username: '@minhaagencia',
      connected: true,
      followers: 15420,
      lastSync: new Date(Date.now() - 10 * 60 * 1000)
    }
  ];

  const availableWidgets = [
    { id: 'followers', label: 'Seguidores', value: metrics.followers.toLocaleString() },
    { id: 'engagement', label: 'Engajamento', value: `${metrics.engagement}%` },
    { id: 'reach', label: 'Alcance', value: metrics.reach.toLocaleString() },
    { id: 'impressions', label: 'Impressões', value: metrics.impressions.toLocaleString() },
    { id: 'cpm', label: 'CPM', value: `R$ ${metrics.cpm.toFixed(2)}` },
    { id: 'cpc', label: 'CPC', value: `R$ ${metrics.cpc.toFixed(2)}` }
  ];

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const filteredCampaigns = campaigns;
  const filteredLeads = leads;

  return {
    metrics,
    campaigns: filteredCampaigns,
    leads: filteredLeads,
    notifications,
    goals,
    competitors,
    forecasts,
    alerts,
    period,
    setPeriod,
    dateRange,
    setDateRange,
    selectedWidgets,
    availableWidgets,
    toggleWidget,
    isLoading,
    quickActions,
    contentCalendar,
    socialAccounts
  };
}