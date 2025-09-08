import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import type { PeriodFilter } from '../../types';

interface PeriodFilterProps {
  period: PeriodFilter;
  setPeriod: (period: PeriodFilter) => void;
}

export function PeriodFilterComponent({ period, setPeriod }: PeriodFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const periodOptions = [
    { value: 'today' as PeriodFilter, label: 'Hoje' },
    { value: 'yesterday' as PeriodFilter, label: 'Ontem' },
    { value: 'last7days' as PeriodFilter, label: 'Últimos 7 dias' },
    { value: 'last30days' as PeriodFilter, label: 'Últimos 30 dias' },
    { value: 'thisMonth' as PeriodFilter, label: 'Mês Atual' },
    { value: 'lastMonth' as PeriodFilter, label: 'Mês Anterior' },
    { value: 'custom' as PeriodFilter, label: 'Personalizado' }
  ];

  const currentLabel = periodOptions.find(option => option.value === period)?.label || 'Últimos 30 dias';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
      >
        <Calendar size={16} />
        <span>{currentLabel}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          {periodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setPeriod(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                period === option.value ? 'bg-gray-700 text-purple-400' : 'text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}