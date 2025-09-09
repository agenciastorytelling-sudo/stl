import React from 'react';
import { Target, Users, DollarSign, Calendar, Download, Lightbulb } from 'lucide-react';
import type { StrategicPlan } from '../../types';

export function StrategicPlanning() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    clientName: '',
    industry: '',
    budget: 0,
    objectives: [] as string[],
    targetAudience: '',
    currentChallenges: '',
    timeline: '3-months'
  });
  const [generatedPlan, setGeneratedPlan] = React.useState<StrategicPlan | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const industries = [
    'E-commerce', 'Saúde e Bem-estar', 'Educação', 'Tecnologia', 'Alimentação',
    'Moda e Beleza', 'Imobiliário', 'Serviços Financeiros', 'Turismo', 'Outros'
  ];

  const objectiveOptions = [
    'Aumentar vendas online',
    'Gerar mais leads qualificados',
    'Melhorar reconhecimento da marca',
    'Reduzir custo de aquisição',
    'Expandir para novos mercados',
    'Aumentar engajamento nas redes sociais'
  ];

  const handleObjectiveToggle = (objective: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter(obj => obj !== objective)
        : [...prev.objectives, objective]
    }));
  };

  const generateStrategicPlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const mockPlan: StrategicPlan = {
        id: Date.now().toString(),
        clientName: formData.clientName,
        industry: formData.industry,
        budget: formData.budget,
        objectives: formData.objectives,
        recommendations: {
          mediaStrategy: `Para ${formData.industry}, recomendamos uma abordagem multicanal focada em Meta Ads (60%) e Google Ads (40%). O Meta Ads será ideal para awareness e engajamento, enquanto Google Ads capturará intenção de compra.`,
          contentStrategy: `Estratégia de conteúdo baseada em educação e entretenimento, com 70% de posts educativos, 20% promocionais e 10% de bastidores. Frequência de 5 posts por semana com foco em horários de maior engajamento.`,
          budgetAllocation: {
            metaAds: formData.budget * 0.6,
            googleAds: formData.budget * 0.3,
            content: formData.budget * 0.1
          },
          timeline: `Plano estruturado em 3 fases: Fase 1 (Mês 1) - Setup e testes iniciais, Fase 2 (Mês 2-3) - Otimização e escala, Fase 3 (Mês 4+) - Expansão e diversificação.`
        },
        createdAt: new Date()
      };
      
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Nome do Cliente/Empresa</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Digite o nome da empresa"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Segmento/Indústria</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Selecione o segmento</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">Orçamento Mensal (R$)</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Ex: 5000"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Objetivos e Metas</h3>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-4">Selecione os principais objetivos:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {objectiveOptions.map(objective => (
                  <label key={objective} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.objectives.includes(objective)}
                      onChange={() => handleObjectiveToggle(objective)}
                      className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
                    />
                    <span className="text-white">{objective}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Público-Alvo Principal</label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                placeholder="Descreva seu público-alvo (idade, interesses, comportamentos, etc.)"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contexto e Desafios</h3>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Principais Desafios Atuais</label>
              <textarea
                value={formData.currentChallenges}
                onChange={(e) => setFormData({...formData, currentChallenges: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                placeholder="Descreva os principais desafios que a empresa enfrenta atualmente..."
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Timeline do Projeto</label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="1-month">1 mês</option>
                <option value="3-months">3 meses</option>
                <option value="6-months">6 meses</option>
                <option value="12-months">12 meses</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
            <Target size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Planejamento Estratégico com IA</h2>
            <p className="text-gray-400 text-sm">Diagnóstico inteligente e plano estratégico personalizado</p>
          </div>
        </div>

        {!generatedPlan ? (
          <>
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map(step => (
                <React.Fragment key={step}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    step <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-purple-600' : 'bg-gray-600'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-700">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={generateStrategicPlan}
                  disabled={isGenerating}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium disabled:opacity-50"
                >
                  <Lightbulb size={16} />
                  <span>{isGenerating ? 'Gerando Plano...' : 'Gerar Plano Estratégico'}</span>
                </button>
              )}
            </div>
          </>
        ) : (
          /* Generated Strategic Plan */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">✨ Plano Estratégico Gerado</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                <span>Exportar PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="text-purple-400" size={20} />
                  <h4 className="text-white font-medium">Cliente</h4>
                </div>
                <p className="text-gray-300">{generatedPlan.clientName}</p>
                <p className="text-gray-400 text-sm">{generatedPlan.industry}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="text-green-400" size={20} />
                  <h4 className="text-white font-medium">Orçamento</h4>
                </div>
                <p className="text-gray-300">R$ {generatedPlan.budget.toLocaleString()}/mês</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="text-blue-400" size={20} />
                  <h4 className="text-white font-medium">Objetivos</h4>
                </div>
                <p className="text-gray-300 text-sm">{generatedPlan.objectives.length} objetivos definidos</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-3">📊 Estratégia de Mídia</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{generatedPlan.recommendations.mediaStrategy}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-3">📝 Estratégia de Conteúdo</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{generatedPlan.recommendations.contentStrategy}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4">💰 Alocação de Orçamento</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      R$ {generatedPlan.recommendations.budgetAllocation.metaAds.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">Meta Ads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      R$ {generatedPlan.recommendations.budgetAllocation.googleAds.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">Google Ads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      R$ {generatedPlan.recommendations.budgetAllocation.content.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">Conteúdo</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-3">⏱️ Timeline de Execução</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{generatedPlan.recommendations.timeline}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setGeneratedPlan(null);
                  setCurrentStep(1);
                  setFormData({
                    clientName: '',
                    industry: '',
                    budget: 0,
                    objectives: [],
                    targetAudience: '',
                    currentChallenges: '',
                    timeline: '3-months'
                  });
                }}
                className="px-6 py-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Criar Novo Plano
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}