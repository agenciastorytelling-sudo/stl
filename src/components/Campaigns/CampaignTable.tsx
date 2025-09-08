import React from 'react';
import { ExternalLink, Bot, TrendingUp, TrendingDown } from 'lucide-react';
import type { Campaign } from '../../types';

interface CampaignTableProps {
  campaigns: Campaign[];
  onAnalyzeWithAI: (campaign: Campaign) => void;
}

export function CampaignTable({ campaigns, onAnalyzeWithAI }: CampaignTableProps) {
  const [sortField, setSortField] = React.useState<keyof Campaign>('leads');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const SortButton = ({ field, children }: { field: keyof Campaign; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left hover:text-purple-400 transition-colors"
    >
      <span>{children}</span>
      {sortField === field && (
        sortDirection === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
      )}
    </button>
  );

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Análise Detalhada por Campanha</h3>
        <p className="text-gray-400 text-sm mt-1">Performance individual das campanhas ativas</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left">
                <SortButton field="name">Nome da Campanha</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton field="platform">Plataforma</SortButton>
              </th>
              <th className="px-6 py-4 text-center">
                <SortButton field="leads">Leads</SortButton>
              </th>
              <th className="px-6 py-4 text-center">
                <SortButton field="cpl">CPL</SortButton>
              </th>
              <th className="px-6 py-4 text-center">
                <SortButton field="investment">Investimento</SortButton>
              </th>
              <th className="px-6 py-4 text-center">
                <SortButton field="impressions">Impressões</SortButton>
              </th>
              <th className="px-6 py-4 text-center">
                <SortButton field="clicks">Cliques</SortButton>
              </th>
              <th className="px-6 py-4 text-center">
                <SortButton field="ctr">CTR</SortButton>
              </th>
              <th className="px-6 py-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedCampaigns.map(campaign => (
              <tr key={campaign.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-white font-medium">{campaign.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.platform === 'Meta Ads' 
                      ? 'bg-purple-900 text-purple-200'
                      : 'bg-blue-900 text-blue-200'
                  }`}>
                    {campaign.platform}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-white font-semibold">{campaign.leads}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-white">R$ {campaign.cpl.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-white">R$ {campaign.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">{campaign.impressions.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">{campaign.clicks.toLocaleString()}</span>
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
                    <button
                      onClick={() => onAnalyzeWithAI(campaign)}
                      className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium"
                    >
                      <Bot size={14} />
                      <span>Analisar com IA</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}