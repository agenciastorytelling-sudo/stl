import React from 'react';
import { Users, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import type { CompetitorData } from '../../types';

interface CompetitorAnalysisProps {
  competitors: CompetitorData[];
  ourCPL: number;
}

export function CompetitorAnalysis({ competitors, ourCPL }: CompetitorAnalysisProps) {
  const totalMarketShare = competitors.reduce((sum, comp) => sum + comp.marketShare, 0);
  const ourMarketShare = Math.max(0, 100 - totalMarketShare);
  
  const sortedCompetitors = [...competitors].sort((a, b) => b.marketShare - a.marketShare);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg">
          <Users size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Análise Competitiva</h3>
          <p className="text-gray-400 text-sm">Posicionamento no mercado</p>
        </div>
      </div>

      {/* Market Share Overview */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="text-white font-medium mb-3">Participação de Mercado</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-purple-400 font-medium">Sua Empresa</span>
            <span className="text-white font-bold">{ourMarketShare.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${ourMarketShare}%` }}
            />
          </div>
        </div>
      </div>

      {/* Competitors List */}
      <div className="space-y-4">
        {sortedCompetitors.map((competitor, index) => (
          <div key={competitor.name} className="p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-yellow-400' : 
                  index === 1 ? 'bg-gray-400' : 
                  'bg-orange-600'
                }`} />
                <span className="text-white font-medium">{competitor.name}</span>
              </div>
              <span className="text-gray-300 text-sm">{competitor.marketShare}% do mercado</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                  <DollarSign size={14} />
                  <span>CPL Est.</span>
                </div>
                <div className={`font-bold ${
                  competitor.estimatedCPL < ourCPL ? 'text-red-400' : 'text-green-400'
                }`}>
                  R$ {competitor.estimatedCPL.toFixed(2)}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                  <PieChart size={14} />
                  <span>Share</span>
                </div>
                <div className="text-white font-bold">{competitor.marketShare}%</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                  <TrendingUp size={14} />
                  <span>Investimento</span>
                </div>
                <div className="text-white font-bold">
                  R$ {(competitor.adSpend / 1000).toFixed(0)}k
                </div>
              </div>
            </div>

            <div className="mt-3 w-full bg-gray-600 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full"
                style={{ width: `${(competitor.marketShare / Math.max(...competitors.map(c => c.marketShare))) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Competitive Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
        <h4 className="text-white font-medium mb-2">💡 Insights Competitivos</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Você está {ourCPL < Math.min(...competitors.map(c => c.estimatedCPL)) ? 'com o menor CPL do mercado' : 'com oportunidade de otimizar CPL'}</li>
          <li>• Sua participação de mercado é de {ourMarketShare.toFixed(1)}%</li>
          <li>• {competitors.filter(c => c.estimatedCPL > ourCPL).length} concorrentes têm CPL maior que o seu</li>
        </ul>
      </div>
    </div>
  );
}