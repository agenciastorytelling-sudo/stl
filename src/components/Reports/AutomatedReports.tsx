import React from 'react';
import { FileText, Download, Send, Calendar, Settings } from 'lucide-react';

export function AutomatedReports() {
  const [reportFrequency, setReportFrequency] = React.useState('weekly');
  const [emailRecipients, setEmailRecipients] = React.useState('cliente@empresa.com');
  const [includeAIInsights, setIncludeAIInsights] = React.useState(true);

  const reportTypes = [
    { id: 'performance', name: 'Relatório de Performance', description: 'Métricas principais e KPIs' },
    { id: 'leads', name: 'Relatório de Leads', description: 'Detalhamento dos leads recebidos' },
    { id: 'campaigns', name: 'Análise de Campanhas', description: 'Performance detalhada por campanha' },
    { id: 'competitive', name: 'Análise Competitiva', description: 'Posicionamento no mercado' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
          <FileText size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Relatórios Automatizados</h3>
          <p className="text-gray-400 text-sm">Configure relatórios automáticos para clientes</p>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Frequência dos Relatórios
            </label>
            <select
              value={reportFrequency}
              onChange={(e) => setReportFrequency(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Destinatários (Email)
            </label>
            <input
              type="email"
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
              placeholder="cliente@empresa.com, gestor@empresa.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Report Types */}
        <div>
          <h4 className="text-white font-medium mb-3">Tipos de Relatório</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reportTypes.map(type => (
              <div key={type.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  id={type.id}
                  defaultChecked
                  className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <label htmlFor={type.id} className="text-white font-medium cursor-pointer">
                    {type.name}
                  </label>
                  <p className="text-gray-400 text-xs">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Option */}
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
          <input
            type="checkbox"
            id="ai-insights"
            checked={includeAIInsights}
            onChange={(e) => setIncludeAIInsights(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
          />
          <div className="flex-1">
            <label htmlFor="ai-insights" className="text-white font-medium cursor-pointer">
              Incluir Análises com IA
            </label>
            <p className="text-gray-400 text-sm">Adiciona insights automáticos e recomendações nos relatórios</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium">
            <Settings size={16} />
            <span>Salvar Configurações</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
            <Download size={16} />
            <span>Gerar Relatório Agora</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
            <Send size={16} />
            <span>Enviar Teste</span>
          </button>
        </div>

        {/* Next Report Info */}
        <div className="p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-gray-400">Próximo relatório:</span>
            <span className="text-white font-medium">
              {reportFrequency === 'daily' ? 'Amanhã às 09:00' :
               reportFrequency === 'weekly' ? 'Segunda-feira às 09:00' :
               'Dia 1 do próximo mês às 09:00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}