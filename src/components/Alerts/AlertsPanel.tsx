import React from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Lightbulb, X, ExternalLink } from 'lucide-react';
import type { Alert } from '../../types';

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
  onViewCampaign: (campaignId: string) => void;
}

export function AlertsPanel({ alerts, onDismiss, onViewCampaign }: AlertsPanelProps) {
  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  
  if (activeAlerts.length === 0) {
    return null;
  }

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'performance_drop': return <TrendingDown size={20} className="text-red-400" />;
      case 'budget_alert': return <AlertTriangle size={20} className="text-yellow-400" />;
      case 'opportunity': return <TrendingUp size={20} className="text-green-400" />;
      case 'anomaly': return <Lightbulb size={20} className="text-blue-400" />;
    }
  };

  const getAlertColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-900/20';
      case 'low': return 'border-blue-500 bg-blue-900/20';
    }
  };

  const getSeverityText = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high': return 'Alta Prioridade';
      case 'medium': return 'Média Prioridade';
      case 'low': return 'Baixa Prioridade';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}min atrás`;
    return 'Agora';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">🚨 Alertas Ativos</h3>
        <span className="text-sm text-gray-400">{activeAlerts.length} alertas</span>
      </div>

      <div className="space-y-3">
        {activeAlerts.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${getAlertColor(alert.severity)} transition-all hover:shadow-lg`}
          >
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white font-medium">{alert.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-900 text-red-200' :
                        alert.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-blue-900 text-blue-200'
                      }`}>
                        {getSeverityText(alert.severity)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{alert.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatTime(alert.timestamp)}
                      </span>
                      <div className="flex items-center space-x-2">
                        {alert.campaignId && (
                          <button
                            onClick={() => onViewCampaign(alert.campaignId!)}
                            className="flex items-center space-x-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <span>Ver Campanha</span>
                            <ExternalLink size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => onDismiss(alert.id)}
                          className="text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}