import React from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { MetricCard } from './components/Dashboard/MetricCard';
import { PeriodFilterComponent } from './components/Dashboard/PeriodFilter';
import { LeadSourceChart } from './components/Dashboard/LeadSourceChart';
import { WidgetSelector } from './components/Dashboard/WidgetSelector';
import { GoalsTracker } from './components/Dashboard/GoalsTracker';
import { AlertsPanel } from './components/Alerts/AlertsPanel';
import { CampaignTable } from './components/Campaigns/CampaignTable';
import { LeadsTable } from './components/Leads/LeadsTable';
import { CompetitorAnalysis } from './components/Analytics/CompetitorAnalysis';
import { ForecastChart } from './components/Analytics/ForecastChart';
import { AutomatedReports } from './components/Reports/AutomatedReports';
import { AIAnalysisModal } from './components/AI/AIAnalysisModal';
import { AdminPanel } from './components/Settings/AdminPanel';
import { CampaignManager } from './components/CampaignManager/CampaignManager';
import { ContentManager } from './components/Content/ContentManager';
import { AITools } from './components/AI/AITools';
import { StrategicPlanning } from './components/Strategic/StrategicPlanning';
import { IntegrationsPanel } from './components/Integrations/IntegrationsPanel';
import { useDashboard } from './hooks/useDashboard';
import { generateAIAnalysis } from './services/aiAnalysis';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import type { Campaign, AIAnalysis, Notification, Alert, QuickAction } from './types';

function App() {
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
  const [aiAnalysis, setAIAnalysis] = React.useState<AIAnalysis | null>(null);
  
  const {
    metrics,
    campaigns,
    leads,
    notifications,
    goals,
    competitors,
    forecasts,
    alerts,
    period,
    setPeriod,
    selectedWidgets,
    availableWidgets,
    toggleWidget,
    quickActions,
    contentCalendar,
    socialAccounts
  } = useDashboard();

  const handleDrillDown = () => {
    setActiveSection('campaigns');
  };

  const handleAnalyzeWithAI = (campaign: Campaign) => {
    const analysis = generateAIAnalysis(campaign);
    setSelectedCampaign(campaign);
    setAIAnalysis(analysis);
  };

  const closeAIModal = () => {
    setSelectedCampaign(null);
    setAIAnalysis(null);
  };

  const handleMarkAsRead = (id: string) => {
    // In a real app, this would update the backend
    console.log('Mark as read:', id);
  };

  const handleDismissNotification = (id: string) => {
    // In a real app, this would update the backend
    console.log('Dismiss notification:', id);
  };

  const handleDismissAlert = (id: string) => {
    // In a real app, this would update the backend
    console.log('Dismiss alert:', id);
  };

  const handleExecuteQuickAction = (action: QuickAction) => {
    console.log('Executing quick action:', action);
    // In a real app, this would call the appropriate API
  };

  const handleSchedulePost = (post: any) => {
    console.log('Scheduling post:', post);
    // In a real app, this would call the social media API
  };

  const handleViewCampaign = (campaignId: string) => {
    setActiveSection('campaigns');
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Active Alerts */}
      <AlertsPanel 
        alerts={alerts}
        onDismiss={handleDismissAlert}
        onViewCampaign={handleViewCampaign}
      />

      {/* Period Filter */}
      <div className="flex justify-end">
        <PeriodFilterComponent period={period} setPeriod={setPeriod} />
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total de Leads Gerados"
          value={metrics.totalLeads}
          change={15.3}
          changeType="increase"
          icon={<Users className="text-white" size={24} />}
          gradient="from-purple-600 to-pink-600"
          size="large"
        />
        <MetricCard
          title="Custo Por Lead (CPL)"
          value={`R$ ${metrics.cpl.toFixed(2)}`}
          change={-8.2}
          changeType="decrease"
          icon={<DollarSign className="text-white" size={24} />}
          gradient="from-blue-600 to-cyan-600"
          size="large"
        />
        <MetricCard
          title="Investimento Total"
          value={`R$ ${metrics.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={12.7}
          changeType="increase"
          icon={<TrendingUp className="text-white" size={24} />}
          gradient="from-green-600 to-emerald-600"
          size="large"
        />
      </div>

      {/* Lead Sources Chart and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeadSourceChart data={metrics.leadsSources} onDrillDown={handleDrillDown} />
        <GoalsTracker goals={goals} />
        
        {/* Quick Stats */}
        <div className="space-y-4 lg:col-span-1">
          <h3 className="text-lg font-semibold text-white">Métricas Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Impressões"
              value={metrics.impressions.toLocaleString()}
              size="small"
            />
            <MetricCard
              title="CPM"
              value={`R$ ${metrics.cpm.toFixed(2)}`}
              size="small"
            />
          </div>
        </div>
      </div>

      {/* Selectable Widgets */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Métricas Personalizáveis</h3>
        <WidgetSelector
          availableWidgets={availableWidgets}
          selectedWidgets={selectedWidgets}
          onToggleWidget={toggleWidget}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'campaigns-manager':
        return (
          <CampaignManager 
            campaigns={campaigns}
            quickActions={quickActions}
            onExecuteAction={handleExecuteQuickAction}
          />
        );
      case 'campaigns':
        return (
          <CampaignTable 
            campaigns={campaigns} 
            onAnalyzeWithAI={handleAnalyzeWithAI}
          />
        );
      case 'leads':
        return <LeadsTable leads={leads} />;
      case 'content':
        return (
          <ContentManager 
            calendar={contentCalendar}
            socialAccounts={socialAccounts}
            onSchedulePost={handleSchedulePost}
          />
        );
      case 'ai-tools':
        return <AITools />;
      case 'strategic-planning':
        return <StrategicPlanning />;
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CompetitorAnalysis competitors={competitors} ourCPL={metrics.cpl} />
              <ForecastChart forecasts={forecasts} />
            </div>
          </div>
        );
      case 'reports':
        return <AutomatedReports />;
      case 'integrations':
        return <IntegrationsPanel />;
      case 'settings':
        return <AdminPanel />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          activeSection={activeSection}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onDismiss={handleDismissNotification}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* AI Analysis Modal */}
      {selectedCampaign && aiAnalysis && (
        <AIAnalysisModal
          campaign={selectedCampaign}
          analysis={aiAnalysis}
          onClose={closeAIModal}
        />
      )}
    </div>
  );
}

export default App;