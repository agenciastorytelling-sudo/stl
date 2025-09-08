import type { Campaign, AIAnalysis } from '../types';

export function generateAIAnalysis(campaign: Campaign): AIAnalysis {
  // Simulated AI analysis based on campaign metrics
  const previousPeriodLeads = Math.floor(campaign.leads * (0.8 + Math.random() * 0.4));
  const leadsChange = ((campaign.leads - previousPeriodLeads) / previousPeriodLeads) * 100;
  
  const previousCTR = campaign.ctr * (0.9 + Math.random() * 0.2);
  const ctrChange = campaign.ctr - previousCTR;
  
  const isPerformingWell = campaign.ctr >= 2.5 && campaign.cpl <= 20;
  const hasLowCTR = campaign.ctr < 2;
  const hasHighCPL = campaign.cpl > 25;

  let diagnosis = '';
  let causeAnalysis = '';
  let recommendedAction = '';
  let confidence = 0;
  let priority: AIAnalysis['priority'] = 'medium';
  let estimatedImpact = '';

  if (isPerformingWell) {
    confidence = 85;
    priority = 'low';
    estimatedImpact = 'Manter performance atual pode gerar +20-30% leads com escala adequada';
    
    diagnosis = `A campanha "${campaign.name}" está apresentando excelente performance, com ${campaign.leads} leads gerados e CPL de R$ ${campaign.cpl.toFixed(2)}. Em comparação com o período anterior, houve um crescimento de ${leadsChange.toFixed(1)}% no volume de leads.`;
    
    causeAnalysis = `O bom desempenho está sendo impulsionado principalmente pelo CTR elevado de ${campaign.ctr}%, que está acima da média do mercado. A segmentação de audiência está bem ajustada e os criativos estão gerando boa resposta do público-alvo.`;
    
    recommendedAction = `Continue com a estratégia atual e considere aumentar o investimento em 20-30% para escalar os resultados. Teste novos criativos similares aos que estão performando bem e monitore a saturação da audiência.`;
  } else if (hasLowCTR) {
    confidence = 78;
    priority = 'high';
    estimatedImpact = 'Otimização pode melhorar CTR em 40-60% e reduzir CPL em 25-35%';
    
    diagnosis = `A campanha "${campaign.name}" gerou ${campaign.leads} leads com CTR baixo de ${campaign.ctr}%. Houve uma ${leadsChange >= 0 ? 'melhora' : 'queda'} de ${Math.abs(leadsChange).toFixed(1)}% em comparação com o período anterior.`;
    
    causeAnalysis = `O CTR baixo (${campaign.ctr}%) indica que os criativos não estão gerando engajamento suficiente com a audiência. Isso pode estar relacionado a fadiga criativa, segmentação muito ampla ou criativos que não ressoam com o público-alvo.`;
    
    recommendedAction = `Pause os anúncios com pior performance e teste novos criativos com abordagens diferentes. Refine a segmentação da audiência focando em interesses mais específicos e considere usar lookalike audiences baseadas nos melhores leads convertidos.`;
  } else if (hasHighCPL) {
    confidence = 82;
    priority = 'high';
    estimatedImpact = 'Otimização pode reduzir CPL em 30-45% mantendo volume de leads';
    
    diagnosis = `A campanha "${campaign.name}" apresenta CPL elevado de R$ ${campaign.cpl.toFixed(2)}, gerando ${campaign.leads} leads. O custo por lead está ${campaign.cpl > 30 ? 'significativamente' : 'moderadamente'} acima do ideal para este segmento.`;
    
    causeAnalysis = `O CPL alto está relacionado à baixa qualidade do tráfego ou competição elevada no leilão de anúncios. A combinação de CTR de ${campaign.ctr}% e o número atual de impressões (${campaign.impressions.toLocaleString()}) sugere que a audiência pode estar saturada.`;
    
    recommendedAction = `Reduza o investimento diário em 30% e teste novas audiências similares. Optimize a página de destino para melhorar a conversão e considere ajustar a oferta do leilão. Teste campanhas com objetivos de conversão em vez de tráfego.`;
  } else {
    confidence = 75;
    priority = 'medium';
    estimatedImpact = 'Otimizações podem melhorar performance geral em 15-25%';
    
    diagnosis = `A campanha "${campaign.name}" está com performance mediana, gerando ${campaign.leads} leads com CPL de R$ ${campaign.cpl.toFixed(2)} e CTR de ${campaign.ctr}%. Há oportunidades claras de otimização.`;
    
    causeAnalysis = `A performance está sendo limitada por uma combinação de fatores: criativos que precisam de refresh, segmentação que pode ser mais precisa e possível necessidade de ajustes na estratégia de lances.`;
    
    recommendedAction = `Implemente testes A/B com novos criativos, refine a segmentação da audiência e ajuste a estratégia de lances para 'Conversões' se ainda não estiver utilizando. Monitore métricas de qualidade da página de destino.`;
  }

  return {
    diagnosis,
    causeAnalysis,
    recommendedAction,
    confidence,
    priority,
    estimatedImpact
  };
}