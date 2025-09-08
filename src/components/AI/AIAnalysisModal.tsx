import React from 'react';
import { X, Bot, TrendingDown, AlertTriangle, Lightbulb, Target, Zap } from 'lucide-react';
import type { Campaign, AIAnalysis } from '../../types';

interface AIAnalysisModalProps {
  campaign: Campaign;
  analysis: AIAnalysis;
  onClose: () => void;
}

export function AIAnalysisModal({ campaign, analysis, onClose }: AIAnalysisModalProps) {
  const getPriorityColor = (priority: AIAnalysis['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'low': return 'text-green-400 bg-green-900/30 border-green-500/50';
    }
  };

  const getPriorityText = (priority: AIAnalysis['priority']) => {
    switch (priority) {
      case 'critical': return 'Crítica';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Análise com IA</h2>
                <p className="text-gray-400 text-sm">{campaign.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getPriorityColor(analysis.priority)}`}>
                Prioridade {getPriorityText(analysis.priority)}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Confiança da IA</div>
                <div className="text-lg font-bold text-white">{analysis.confidence}%</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Campaign Summary */}
          <div className="mb-8 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Resumo da Campanha</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{campaign.leads}</div>
                <div className="text-gray-400 text-sm">Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">R$ {campaign.cpl.toFixed(2)}</div>
                <div className="text-gray-400 text-sm">CPL</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">R$ {campaign.investment.toFixed(2)}</div>
                <div className="text-gray-400 text-sm">Investimento</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  campaign.ctr >= 3 ? 'text-green-400' : campaign.ctr >= 2 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {campaign.ctr.toFixed(1)}%
                </div>
                <div className="text-gray-400 text-sm">CTR</div>
              </div>
            </div>
          </div>

          {/* AI Analysis Sections */}
          <div className="space-y-6">
            {/* Diagnosis */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingDown className="text-red-400" size={20} />
                <h3 className="text-lg font-semibold text-white">1. Diagnóstico</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {analysis.diagnosis}
              </p>
            </div>

            {/* Cause Analysis */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h3 className="text-lg font-semibold text-white">2. Análise de Causa</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {analysis.causeAnalysis}
              </p>
            </div>

            {/* Recommended Action */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="text-blue-400" size={20} />
                <h3 className="text-lg font-semibold text-white">3. Ação Recomendada</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {analysis.recommendedAction}
              </p>
            </div>

            {/* Estimated Impact */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-6 border border-purple-500/30">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="text-purple-400" size={20} />
                <h3 className="text-lg font-semibold text-white">4. Impacto Estimado</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                {analysis.estimatedImpact}
              </p>
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-400" size={16} />
                <span className="text-sm text-yellow-400 font-medium">
                  Implementação recomendada nas próximas 24-48 horas
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Fechar
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
            >
              Aplicar Sugestões
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}