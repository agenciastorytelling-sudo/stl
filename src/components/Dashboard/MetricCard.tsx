import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
  gradient?: string;
  size?: 'small' | 'medium' | 'large';
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  gradient = 'from-purple-600 to-blue-600',
  size = 'medium'
}: MetricCardProps) {
  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const valueSizes = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-4xl'
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
      <div className={sizeClasses[size]}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className={`${valueSizes[size]} font-bold text-white mt-2`}>
              {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
            </p>
          </div>
          {icon && (
            <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient}`}>
              {icon}
            </div>
          )}
        </div>
        
        {change !== undefined && (
          <div className="flex items-center space-x-2">
            {changeType === 'increase' ? (
              <TrendingUp size={16} className="text-green-400" />
            ) : (
              <TrendingDown size={16} className="text-red-400" />
            )}
            <span className={`text-sm font-semibold ${
              changeType === 'increase' ? 'text-green-400' : 'text-red-400'
            }`}>
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
            <span className="text-gray-400 text-sm">vs período anterior</span>
          </div>
        )}
      </div>
    </div>
  );
}