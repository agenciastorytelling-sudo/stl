import React from 'react';
import { TrendingUp, Calendar, Target } from 'lucide-react';
import type { Forecast } from '../../types';

interface ForecastChartProps {
  forecasts: Forecast[];
}

export function ForecastChart({ forecasts }: ForecastChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
          <TrendingUp size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Previsões com IA</h3>
          <p className="text-gray-400 text-sm">Projeções baseadas em dados históricos</p>
        </div>
      </div>

      <div className="space-y-6">
        {forecasts.map((forecast, index) => (
          <div key={forecast.period} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-white font-medium">{forecast.period}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  forecast.confidence >= 80 ? 'bg-green-400' :
                  forecast.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className="text-gray-400 text-sm">{forecast.confidence}% confiança</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target size={16} className="text-purple-400" />
                  <span className="text-gray-400 text-sm">Leads Previstos</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {forecast.predictedLeads}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-400">R$</span>
                  <span className="text-gray-400 text-sm">CPL Previsto</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  R$ {forecast.predictedCPL.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Nível de Confiança</span>
                <span className="text-white font-medium">{forecast.confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    forecast.confidence >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    forecast.confidence >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                  style={{ width: `${forecast.confidence}%` }}
                />
              </div>
            </div>

            {index < forecasts.length - 1 && <hr className="border-gray-700" />}
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg border border-green-500/30">
        <h4 className="text-white font-medium mb-2">🤖 Insights da IA</h4>
        <p className="text-sm text-gray-300">
          Com base nos padrões atuais, esperamos um crescimento de {
            ((forecasts[1]?.predictedLeads || 0) / (forecasts[0]?.predictedLeads || 1) - 1) * 100 > 0 ? 
            `${(((forecasts[1]?.predictedLeads || 0) / (forecasts[0]?.predictedLeads || 1) - 1) * 100).toFixed(1)}%` : 
            'estabilidade'
          } no volume de leads no próximo mês.
        </p>
      </div>
    </div>
  );
}