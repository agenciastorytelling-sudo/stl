import React from 'react';
import { Calendar, Plus, Instagram, Linkedin, Hash, Clock, TrendingUp } from 'lucide-react';
import type { ContentPost, ContentCalendar, AIContentSuggestion } from '../../types';

interface ContentManagerProps {
  calendar: ContentCalendar;
  socialAccounts: any[];
  onSchedulePost: (post: Partial<ContentPost>) => void;
}

export function ContentManager({ calendar, socialAccounts, onSchedulePost }: ContentManagerProps) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [newPost, setNewPost] = React.useState({
    platform: 'Instagram',
    content: '',
    hashtags: [] as string[],
    scheduledDate: new Date()
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date: Date | null) => {
    if (!date) return [];
    return calendar.posts.filter(post => 
      post.scheduledDate.toDateString() === date.toDateString()
    );
  };

  const handleCreatePost = () => {
    onSchedulePost(newPost);
    setShowCreateModal(false);
    setNewPost({
      platform: 'Instagram',
      content: '',
      hashtags: [],
      scheduledDate: new Date()
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Content Suggestions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🤖 Sugestões de Conteúdo IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calendar.suggestions.map(suggestion => (
            <div key={suggestion.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {suggestion.platform === 'Instagram' && <Instagram size={16} className="text-pink-400" />}
                  {suggestion.platform === 'LinkedIn' && <Linkedin size={16} className="text-blue-400" />}
                  <span className="text-white font-medium">{suggestion.platform}</span>
                </div>
                <span className="text-xs text-gray-400">{suggestion.confidence}% confiança</span>
              </div>
              
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">{suggestion.content}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {suggestion.hashtags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
                {suggestion.hashtags.length > 3 && (
                  <span className="text-xs text-gray-400">+{suggestion.hashtags.length - 3}</span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>{suggestion.bestTime}</span>
                </div>
                <button
                  onClick={() => {
                    setNewPost({
                      platform: suggestion.platform,
                      content: suggestion.content,
                      hashtags: suggestion.hashtags,
                      scheduledDate: new Date()
                    });
                    setShowCreateModal(true);
                  }}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-xs font-medium"
                >
                  Usar Sugestão
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">📅 Calendário de Conteúdo</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
          >
            <Plus size={16} />
            <span>Novo Post</span>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="text-center text-gray-400 font-medium py-2">
              {day}
            </div>
          ))}
          
          {getDaysInMonth(selectedDate).map((date, index) => {
            const posts = getPostsForDate(date);
            return (
              <div
                key={index}
                className={`min-h-[80px] p-2 border border-gray-700 rounded-lg ${
                  date ? 'bg-gray-700 hover:bg-gray-600 cursor-pointer' : 'bg-gray-900'
                } transition-colors`}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <div className="text-white text-sm font-medium mb-1">
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {posts.slice(0, 2).map(post => (
                        <div
                          key={post.id}
                          className={`text-xs px-2 py-1 rounded-full truncate ${
                            post.platform === 'Instagram' ? 'bg-pink-900 text-pink-200' :
                            post.platform === 'LinkedIn' ? 'bg-blue-900 text-blue-200' :
                            'bg-purple-900 text-purple-200'
                          }`}
                        >
                          {post.content.substring(0, 20)}...
                        </div>
                      ))}
                      {posts.length > 2 && (
                        <div className="text-xs text-gray-400">+{posts.length - 2} mais</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Criar Novo Post</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Plataforma</label>
                <select
                  value={newPost.platform}
                  onChange={(e) => setNewPost({...newPost, platform: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Conteúdo</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Digite o conteúdo do post..."
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Hashtags</label>
                <input
                  type="text"
                  placeholder="Digite as hashtags separadas por vírgula"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  onChange={(e) => setNewPost({...newPost, hashtags: e.target.value.split(',').map(tag => tag.trim())})}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
              >
                Agendar Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}