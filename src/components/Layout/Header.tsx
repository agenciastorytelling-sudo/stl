import React from 'react';
import { User, Calendar } from 'lucide-react';
import { NotificationCenter } from '../Dashboard/NotificationCenter';
import type { Notification } from '../../types';

interface HeaderProps {
  activeSection: string;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function Header({ activeSection, notifications, onMarkAsRead, onDismiss }: HeaderProps) {
  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'dashboard': return 'Dashboard Principal';
      case 'campaigns': return 'Análise de Campanhas';
      case 'leads': return 'Gerenciamento de Leads';
      case 'analytics': return 'Análises Avançadas';
      case 'settings': return 'Configurações';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{getSectionTitle(activeSection)}</h2>
          <p className="text-gray-400 text-sm mt-1">
            Acompanhe o desempenho das suas campanhas em tempo real
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar size={16} />
            <span className="text-sm">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <NotificationCenter 
            notifications={notifications}
            onMarkAsRead={onMarkAsRead}
            onDismiss={onDismiss}
          />
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-white font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}