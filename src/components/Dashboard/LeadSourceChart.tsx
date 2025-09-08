import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { DashboardMetrics } from '../../types';

interface LeadSourceChartProps {
  data: DashboardMetrics['leadsSources'];
  onDrillDown: () => void;
}

export function LeadSourceChart({ data, onDrillDown }: LeadSourceChartProps) {
  const total = data.metaAds + data.googleAds;
  const metaPercentage = total > 0 ? (data.metaAds / total) * 100 : 0;
  const googlePercentage = total > 0 ? (data.googleAds / total) * 100 : 0;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Origem dos Leads</h3>
        <button
          onClick={onDrillDown}
          className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span className="text-sm">Ver detalhes</span>
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Meta Ads */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span className="text-white font-medium">Meta Ads</span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{data.metaAds}</div>
              <div className="text-gray-400 text-sm">{metaPercentage.toFixed(1)}%</div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metaPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Google Ads */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <span className="text-white font-medium">Google Ads</span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{data.googleAds}</div>
              <div className="text-gray-400 text-sm">{googlePercentage.toFixed(1)}%</div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${googlePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Total de Leads</span>
            <span className="text-2xl font-bold text-white">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}