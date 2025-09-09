import React from 'react';
import { Settings, CheckCircle, XCircle, RefreshCw, ExternalLink, Zap } from 'lucide-react';
import type { APIConnection, SocialMediaAccount } from '../../types';

export function IntegrationsPanel() {
  const [connections, setConnections] = React.useState<APIConnection[]>([
    {
      platform: 'Meta Ads',
      connected: true,
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      status: 'active',
      permissions: ['read_campaigns', 'create_campaigns', 'read_insights']
    },
    {
      platform: 'Google Ads',
      connected: false,
      lastSync: new Date(),
      status: 'error',
      permissions: []
    },
    {
      platform: 'Instagram',
      connected: true,
      lastSync: new Date(Date.now() - 15 * 60 * 1000),
      status: 'active',
      permissions: ['read_posts', 'create_posts', 'read_insights']
    },
    {
      platform: 'LinkedIn',
      connected: false,
      lastSync: new Date(),
      status: 'expired',
      permissions: []
    },
    {
      platform: 'TikTok',
      connected: false,
      lastSync: new Date(),
      status: 'error',
      permissions: []
    }
  ]);

  const [socialAccounts] = React.useState<SocialMediaAccount[]>([
    {
      id: '1',
      platform: 'Instagram',
      username: '@minhaempresa',
      connected: true,
      followers: 15420,
      lastSync: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: '2',
      platform: 'LinkedIn',
      username: 'Minha Empresa',
      connected: false,
      followers: 2340,
      lastSync: new Date()
    }
  ]);

  const handleConnect = (platform: string) => {
    setConnections(prev => prev.map(conn => 
      conn.platform === platform 
        ? { ...conn, connected: true, status: 'active' as const, lastSync: new Date() }
        : conn
    ));
  };

  const handleDisconnect = (platform: string) => {
    setConnections(prev => prev.map(conn => 
      conn.platform === platform 
        ? { ...conn, connected: false, status: 'error' as const }
        : conn
    ));
  };

  const handleSync = (platform: string) => {
    setConnections(prev => prev.map(conn => 
      conn.platform === platform 
        ? { ...conn, lastSync: new Date() }
        : conn
    ));
  };

  const getStatusColor = (status: APIConnection['status']) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'expired': return 'text-yellow-400';
    }
  };

  const getStatusText = (status: APIConnection['status']) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'error': return 'Erro';
      case 'expired': return 'Expirado';
    }
  };

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}min atrás`;
    return 'Agora';
  };

  return (
    <div className="space-y-6">
      {/* API Connections */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
            <Settings size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Integrações de API</h2>
            <p className="text-gray-400 text-sm">Conecte suas contas de mídia paga e redes sociais</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map(connection => (
            <div key={connection.platform} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold">{connection.platform}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {connection.connected ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : (
                      <XCircle size={16} className="text-red-400" />
                    )}
                    <span className={`text-sm ${getStatusColor(connection.status)}`}>
                      {getStatusText(connection.status)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleSync(connection.platform)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Sincronizar"
                >
                  <RefreshCw size={16} />
                </button>
              </div>

              {connection.connected && (
                <div className="mb-4">
                  <p className="text-gray-400 text-xs mb-2">Última sincronização:</p>
                  <p className="text-gray-300 text-sm">{formatLastSync(connection.lastSync)}</p>
                  
                  {connection.permissions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-gray-400 text-xs mb-1">Permissões:</p>
                      <div className="flex flex-wrap gap-1">
                        {connection.permissions.slice(0, 2).map(permission => (
                          <span key={permission} className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded-full">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                        {connection.permissions.length > 2 && (
                          <span className="text-xs text-gray-400">+{connection.permissions.length - 2}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                {connection.connected ? (
                  <button
                    onClick={() => handleDisconnect(connection.platform)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Desconectar
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(connection.platform)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium"
                  >
                    Conectar
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Configurações">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Accounts */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Contas de Redes Sociais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialAccounts.map(account => (
            <div key={account.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    account.platform === 'Instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    account.platform === 'LinkedIn' ? 'bg-blue-600' :
                    'bg-gray-600'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {account.platform.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{account.username}</h4>
                    <p className="text-gray-400 text-sm">{account.platform}</p>
                  </div>
                </div>
                {account.connected ? (
                  <CheckCircle size={20} className="text-green-400" />
                ) : (
                  <XCircle size={20} className="text-red-400" />
                )}
              </div>

              {account.connected && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Seguidores:</span>
                    <span className="text-white font-medium">{account.followers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-400">Última sync:</span>
                    <span className="text-gray-300">{formatLastSync(account.lastSync)}</span>
                  </div>
                </div>
              )}

              <button className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                account.connected 
                  ? 'bg-gray-600 text-white hover:bg-gray-500'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              }`}>
                {account.connected ? 'Gerenciar' : 'Conectar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Status Summary */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="text-yellow-400" size={24} />
          <h3 className="text-white font-semibold">Status das Integrações</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {connections.filter(c => c.connected).length}
            </div>
            <div className="text-gray-400 text-sm">APIs Conectadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {socialAccounts.filter(a => a.connected).length}
            </div>
            <div className="text-gray-400 text-sm">Contas Sociais</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {connections.filter(c => c.status === 'active').length}
            </div>
            <div className="text-gray-400 text-sm">Sincronizações Ativas</div>
          </div>
        </div>
      </div>
    </div>
  );
}