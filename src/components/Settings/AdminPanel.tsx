import React from 'react';
import { Settings, Key, Webhook, Save, CheckCircle, XCircle } from 'lucide-react';

export function AdminPanel() {
  const [metaToken, setMetaToken] = React.useState('');
  const [googleToken, setGoogleToken] = React.useState('');
  const [webhookUrl, setWebhookUrl] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    // In a real app, this would save to a backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const isMetaConnected = metaToken.length > 0;
  const isGoogleConnected = googleToken.length > 0;
  const isWebhookConfigured = webhookUrl.length > 0;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <Settings size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Configurações de Integração</h2>
            <p className="text-gray-400 text-sm">Configure as APIs e webhooks para coleta de dados</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Meta Ads Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Key size={18} />
                <span>Meta Ads API</span>
              </h3>
              <div className="flex items-center space-x-2">
                {isMetaConnected ? (
                  <>
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">Conectado</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-400" />
                    <span className="text-red-400 text-sm">Desconectado</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Access Token
              </label>
              <input
                type="password"
                value={metaToken}
                onChange={(e) => setMetaToken(e.target.value)}
                placeholder="Insira o token de acesso do Meta Ads"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <p className="text-gray-400 text-xs mt-1">
                Obtenha seu token em: Meta Business → Configurações → Tokens de Sistema
              </p>
            </div>
          </div>

          {/* Google Ads Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Key size={18} />
                <span>Google Ads API</span>
              </h3>
              <div className="flex items-center space-x-2">
                {isGoogleConnected ? (
                  <>
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">Conectado</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-400" />
                    <span className="text-red-400 text-sm">Desconectado</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                API Key
              </label>
              <input
                type="password"
                value={googleToken}
                onChange={(e) => setGoogleToken(e.target.value)}
                placeholder="Insira a API key do Google Ads"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <p className="text-gray-400 text-xs mt-1">
                Configure em: Google Cloud Console → APIs e Serviços → Credenciais
              </p>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Webhook size={18} />
                <span>Webhook para Leads</span>
              </h3>
              <div className="flex items-center space-x-2">
                {isWebhookConfigured ? (
                  <>
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">Configurado</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-400" />
                    <span className="text-red-400 text-sm">Não configurado</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                URL do Webhook
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://seu-servidor.com/webhook/leads"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <p className="text-gray-400 text-xs mt-1">
                URL que receberá os dados dos leads capturados via UTMs
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
          >
            <Save size={16} />
            <span>Salvar Configurações</span>
          </button>
        </div>

        {saved && (
          <div className="mt-4 p-3 bg-green-900 border border-green-700 rounded-lg flex items-center space-x-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-green-400 text-sm">Configurações salvas com sucesso!</span>
          </div>
        )}
      </div>

      {/* API Status Dashboard */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Status das Integrações</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-medium">Meta Ads</span>
              {isMetaConnected ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <XCircle size={16} className="text-red-400" />
              )}
            </div>
            <div className="text-xs text-gray-400">
              {isMetaConnected ? 'Última sincronização: Há 5 min' : 'Aguardando configuração'}
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-medium">Google Ads</span>
              {isGoogleConnected ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <XCircle size={16} className="text-red-400" />
              )}
            </div>
            <div className="text-xs text-gray-400">
              {isGoogleConnected ? 'Última sincronização: Há 3 min' : 'Aguardando configuração'}
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-medium">Webhook</span>
              {isWebhookConfigured ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <XCircle size={16} className="text-red-400" />
              )}
            </div>
            <div className="text-xs text-gray-400">
              {isWebhookConfigured ? 'Último lead: Há 12 min' : 'Aguardando configuração'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}