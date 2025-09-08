import React from 'react';
import { Plus, X } from 'lucide-react';

interface Widget {
  id: string;
  label: string;
  value: string;
}

interface WidgetSelectorProps {
  availableWidgets: Widget[];
  selectedWidgets: string[];
  onToggleWidget: (widgetId: string) => void;
}

export function WidgetSelector({ availableWidgets, selectedWidgets, onToggleWidget }: WidgetSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedWidgetData = availableWidgets.filter(widget => 
    selectedWidgets.includes(widget.id)
  );

  const unselectedWidgets = availableWidgets.filter(widget => 
    !selectedWidgets.includes(widget.id)
  );

  return (
    <div className="space-y-4">
      {/* Selected Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedWidgetData.map(widget => (
          <div key={widget.id} className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-colors group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{widget.label}</p>
                <p className="text-2xl font-bold text-white mt-2">{widget.value}</p>
              </div>
              <button
                onClick={() => onToggleWidget(widget.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Widget Button */}
        {unselectedWidgets.length > 0 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-purple-500 hover:bg-gray-700 transition-all group"
          >
            <div className="flex flex-col items-center justify-center space-y-2 text-gray-400 group-hover:text-purple-400">
              <Plus size={24} />
              <span className="text-sm font-medium">Adicionar Widget</span>
            </div>
          </button>
        )}
      </div>

      {/* Widget Selection Modal */}
      {isOpen && unselectedWidgets.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Adicionar Widgets</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              {unselectedWidgets.map(widget => (
                <button
                  key={widget.id}
                  onClick={() => {
                    onToggleWidget(widget.id);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 text-left bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <span className="text-white font-medium">{widget.label}</span>
                  <span className="text-gray-400 text-sm">{widget.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}