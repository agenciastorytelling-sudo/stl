import React from 'react';
import { Play, Pause, Copy, TrendingUp, TrendingDown, DollarSign, Eye, MousePointer } from 'lucide-react';
import type { Campaign, QuickAction } from '../../types';

interface CampaignManagerProps {
  campaigns: Campaign[];
  quickActions: QuickAction[];
  onExecuteAction: (action: QuickAction) => void;
}

export function CampaignManager({ campaigns, quickActions, onExecuteAction }: CampaignManagerProps) {
  const [selectedCampaigns, setSelectedCampaigns] = React.useState<string[]>([]);

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Executing ${action} on campaigns:`, selectedCampaigns);
    // In a real app, this would call the API
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Panel */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🚀 Ações Rápidas Recomendadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(action => (
            <div key={action.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{action.campaignName}</h4>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  action.impact === 'high' ? 'bg-red-900 text-red-200' :
                  action.impact === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-blue-900 text-blue-200'
                }`}>
                  {action.impact === 'high' ? 'Alto Impacto' : 
                   action.impact === 'medium' ? 'Médio Impacto' : 'Baixo Impacto'}
                </span>
              </div>
              <div className="mb-3">
                <p className="text-green-400 text-sm font-medium">{action.estimatedResult}</p>
              </div>
              <button
                onClick={() => onExecuteAction(action)}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium text-sm"
              >
                Executar Ação
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Management Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Gerenciamento de Campanhas</h3>
            <div className="flex items-center space-x-3">
              {selectedCampaigns.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">{selectedCampaigns.length} selecionadas</span>
                  <button
                    onClick={() => handleBulkAction('pause')}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <Pause size={14} />
                    <span>Pausar</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('duplicate')}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Copy size={14} />
                    <span>Duplicar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCampaigns(campaigns.map(c => c.id));
                      } else {
                        setSelectedCampaigns([]);
                      }
                    }}
                    className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Campanha</th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">Status</th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">Leads</th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">CPL</th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">Investimento</th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">CTR</th>
                <th className="px-6 py-4 text-center text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => handleSelectCampaign(campaign.id)}
                      className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{campaign.name}</div>
                      <div className="text-gray-400 text-sm">{campaign.platform}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200">
                      Ativa
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-white font-semibold">{campaign.leads}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-white">R$ {campaign.cpl.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-white">R$ {campaign.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${
                      campaign.ctr >= 3 ? 'text-green-400' : campaign.ctr >= 2 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {campaign.ctr.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-green-400 transition-colors" title="Pausar/Ativar">
                        <Play size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors" title="Duplicar">
                        <Copy size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-400 transition-colors" title="Aumentar Verba">
                        <TrendingUp size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}