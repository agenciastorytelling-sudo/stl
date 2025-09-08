import React from 'react';
import { Search, Filter, Phone, Mail, Calendar } from 'lucide-react';
import type { Lead } from '../../types';

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [platformFilter, setPlatformFilter] = React.useState<'all' | 'Meta Ads' | 'Google Ads'>('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = platformFilter === 'all' || lead.platform === platformFilter;
    
    return matchesSearch && matchesPlatform;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEmail = (contact: string) => contact.includes('@');

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-white">Leads Recebidos</h3>
            <p className="text-gray-400 text-sm mt-1">
              {filteredLeads.length} de {leads.length} leads encontrados
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors w-full sm:w-64"
              />
            </div>
            
            {/* Platform Filter */}
            <div className="relative">
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value as typeof platformFilter)}
                className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none w-full sm:w-40"
              >
                <option value="all">Todas</option>
                <option value="Meta Ads">Meta Ads</option>
                <option value="Google Ads">Google Ads</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-gray-300 font-medium">Nome do Lead</th>
              <th className="px-6 py-4 text-left text-gray-300 font-medium">Contato</th>
              <th className="px-6 py-4 text-left text-gray-300 font-medium">Data de Envio</th>
              <th className="px-6 py-4 text-left text-gray-300 font-medium">Origem</th>
              <th className="px-6 py-4 text-center text-gray-300 font-medium">Plataforma</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{lead.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {isEmail(lead.contact) ? (
                      <Mail size={16} className="text-gray-400" />
                    ) : (
                      <Phone size={16} className="text-gray-400" />
                    )}
                    <span className="text-gray-300">{lead.contact}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-300">{formatDate(lead.date)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-300">{lead.source}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    lead.platform === 'Meta Ads' 
                      ? 'bg-purple-900 text-purple-200'
                      : 'bg-blue-900 text-blue-200'
                  }`}>
                    {lead.platform}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">Nenhum lead encontrado</div>
            <div className="text-gray-500 text-sm">
              {searchTerm || platformFilter !== 'all' 
                ? 'Tente ajustar os filtros de busca' 
                : 'Os leads aparecerão aqui quando forem recebidos'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}