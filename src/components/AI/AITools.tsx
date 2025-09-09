import React from 'react';
import { Bot, Zap, Target, TrendingUp, Lightbulb, Wand2 } from 'lucide-react';
import type { CampaignTemplate } from '../../types';

export function AITools() {
  const [selectedPlatform, setSelectedPlatform] = React.useState<'Meta Ads' | 'Google Ads'>('Meta Ads');
  const [campaignObjective, setCampaignObjective] = React.useState('conversion');
  const [budget, setBudget] = React.useState(1000);
  const [targetAudience, setTargetAudience] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedCampaign, setGeneratedCampaign] = React.useState<CampaignTemplate | null>(null);

  const handleGenerateCampaign = async () => {
    setIsGenerating(true);
    
    // Simulate AI campaign generation
    setTimeout(() => {
      const mockCampaign: CampaignTemplate = {
        id: Date.now().toString(),
        name: `Campanha ${selectedPlatform} - ${campaignObjective}`,
        platform: selectedPlatform,
        type: campaignObjective as any,
        budget,
        objective: campaignObjective,
        structure: {
          adSets: selectedPlatform === 'Meta Ads' ? [
            {
              name: 'Público Principal',
              budget: budget * 0.6,
              targeting: {
                name: 'Audiência Principal',
                demographics: {
                  ageMin: 25,
                  ageMax: 45,
                  genders: ['all'],
                  locations: ['Brasil']
                },
                interests: targetAudience.split(',').map(i => i.trim()),
                behaviors: ['Compradores online']
              },
              placements: ['Facebook Feed', 'Instagram Feed', 'Instagram Stories']
            },
            {
              name: 'Lookalike',
              budget: budget * 0.4,
              targeting: {
                name: 'Lookalike 1%',
                demographics: {
                  ageMin: 25,
                  ageMax: 45,
                  genders: ['all'],
                  locations: ['Brasil']
                },
                interests: [],
                behaviors: []
              },
              placements: ['Facebook Feed', 'Instagram Feed']
            }
          ] : undefined,
          keywords: selectedPlatform === 'Google Ads' ? [
            targetAudience,
            `${targetAudience} online`,
            `comprar ${targetAudience}`,
            `${targetAudience} preço`
          ] : undefined,
          creatives: [
            {
              type: 'image',
              headline: `Descubra os Melhores ${targetAudience}`,
              description: 'Oferta especial por tempo limitado. Não perca!',
              callToAction: 'Saiba Mais'
            },
            {
              type: 'video',
              headline: `${targetAudience} que Você Precisa`,
              description: 'Veja como nossos produtos podem transformar sua vida.',
              callToAction: 'Comprar Agora'
            }
          ]
        }
      };
      
      setGeneratedCampaign(mockCampaign);
      setIsGenerating(false);
    }, 3000);
  };

  const aiFeatures = [
    {
      icon: <Target className="text-purple-400" size={24} />,
      title: 'Criação Automática de Campanhas',
      description: 'IA cria estrutura completa de campanhas com grupos de anúncios, palavras-chave e criativos',
      action: 'Criar Campanha'
    },
    {
      icon: <TrendingUp className="text-blue-400" size={24} />,
      title: 'Otimização Preditiva',
      description: 'Análise preditiva para identificar oportunidades de melhoria antes que afetem o desempenho',
      action: 'Analisar Campanhas'
    },
    {
      icon: <Lightbulb className="text-yellow-400" size={24} />,
      title: 'Sugestões de Teste A/B',
      description: 'IA sugere testes automáticos baseados em padrões de performance do mercado',
      action: 'Gerar Testes'
    },
    {
      icon: <Wand2 className="text-green-400" size={24} />,
      title: 'Copy e Criativos Automáticos',
      description: 'Geração automática de textos de anúncios e sugestões de criativos otimizados',
      action: 'Gerar Conteúdo'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Features Overview */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Ferramentas de IA</h2>
            <p className="text-gray-400 text-sm">Automação inteligente para criação e otimização de campanhas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium text-sm">
                    {feature.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Generator */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">🚀 Gerador de Campanhas com IA</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Plataforma</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as 'Meta Ads' | 'Google Ads')}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Meta Ads">Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Objetivo</label>
            <select
              value={campaignObjective}
              onChange={(e) => setCampaignObjective(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="conversion">Conversões</option>
              <option value="traffic">Tráfego</option>
              <option value="awareness">Reconhecimento</option>
              <option value="lead_generation">Geração de Leads</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Orçamento (R$)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Público-Alvo/Palavras-Chave</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Ex: roupas femininas, fitness, tecnologia"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateCampaign}
          disabled={isGenerating || !targetAudience}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap size={16} />
          <span>{isGenerating ? 'Gerando Campanha...' : 'Gerar Campanha com IA'}</span>
        </button>

        {/* Generated Campaign Preview */}
        {generatedCampaign && (
          <div className="mt-6 p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
            <h4 className="text-white font-semibold mb-4">✨ Campanha Gerada</h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="text-purple-400 font-medium mb-2">Estrutura</h5>
                  <p className="text-gray-300 text-sm">
                    {generatedCampaign.structure.adSets?.length || 0} grupos de anúncios
                  </p>
                  <p className="text-gray-300 text-sm">
                    {generatedCampaign.structure.keywords?.length || 0} palavras-chave
                  </p>
                  <p className="text-gray-300 text-sm">
                    {generatedCampaign.structure.creatives?.length || 0} criativos
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="text-blue-400 font-medium mb-2">Orçamento</h5>
                  <p className="text-gray-300 text-sm">
                    Total: R$ {generatedCampaign.budget.toLocaleString()}
                  </p>
                  {generatedCampaign.structure.adSets?.map((adSet, index) => (
                    <p key={index} className="text-gray-400 text-xs">
                      {adSet.name}: R$ {adSet.budget.toLocaleString()}
                    </p>
                  ))}
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="text-green-400 font-medium mb-2">Criativos</h5>
                  {generatedCampaign.structure.creatives?.map((creative, index) => (
                    <p key={index} className="text-gray-300 text-xs mb-1">
                      {creative.headline}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                  Editar
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium">
                  Criar Campanha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}