import React from 'react';
import { Target, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import type { Goal } from '../../types';

interface GoalsTrackerProps {
  goals: Goal[];
}

export function GoalsTracker({ goals }: GoalsTrackerProps) {
  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'on-track': return 'text-green-400';
      case 'at-risk': return 'text-yellow-400';
      case 'behind': return 'text-red-400';
    }
  };

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case 'on-track': return <TrendingUp size={16} className="text-green-400" />;
      case 'at-risk': return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'behind': return <TrendingDown size={16} className="text-red-400" />;
    }
  };

  const getStatusText = (status: Goal['status']) => {
    switch (status) {
      case 'on-track': return 'No Caminho';
      case 'at-risk': return 'Em Risco';
      case 'behind': return 'Atrasado';
    }
  };

  const calculateProgress = (goal: Goal) => {
    if (goal.type === 'cpl') {
      // For CPL, lower is better, so we calculate differently
      return goal.current <= goal.target ? 100 : Math.max(0, 100 - ((goal.current - goal.target) / goal.target) * 100);
    }
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
          <Target size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Metas e Objetivos</h3>
          <p className="text-gray-400 text-sm">Acompanhe o progresso das suas metas</p>
        </div>
      </div>

      <div className="space-y-6">
        {goals.map(goal => {
          const progress = calculateProgress(goal);
          
          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{goal.name}</h4>
                  <p className="text-gray-400 text-sm capitalize">{goal.period}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(goal.status)}
                  <span className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                    {getStatusText(goal.status)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progresso</span>
                  <span className="text-white font-medium">
                    {goal.type === 'leads' ? `${goal.current}/${goal.target}` : 
                     goal.type === 'cpl' ? `R$ ${goal.current.toFixed(2)} / R$ ${goal.target.toFixed(2)}` :
                     `${goal.current.toFixed(1)}% / ${goal.target.toFixed(1)}%`}
                  </span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      goal.status === 'on-track' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      goal.status === 'at-risk' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
                
                <div className="text-right">
                  <span className={`text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {progress.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}