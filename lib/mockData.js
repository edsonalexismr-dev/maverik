/**
 * Datos de ejemplo para desarrollo.
 * Reemplaza este módulo con consultas reales a tu base de datos y a la API de Claude.
 */

const dashboard = {
  summary: {
    newPosts: 35,
    activeTopics: 12,
    alerts: 3,
    officialUpdates: 4
  },
  now: [
    {
      platform: 'X',
      account: '@gobierno',
      date: new Date().toISOString(),
      importance: 'Alta',
      summary: 'Nuevo comunicado sobre política de vivienda.',
      sourceUrl: 'https://x.com/gobierno/status/12345'
    }
    // Puedes añadir más objetos simulados aquí.
  ],
  trends: [
    {
      topic: 'Cambio climático',
      state: 'Emergente',
      tone: 'Negativo',
      mainAccounts: ['@activista', '@ministerio'],
      evidence: 'Aumento del 150 % de menciones en la última semana.'
    }
  ],
  governmentActivity: [
    {
      institution: 'Ministerio de Salud',
      type: 'Anuncio',
      summary: 'Lanzamiento de campaña de vacunación.',
      implication: 'Posible aumento de contenidos de salud.'
    }
  ],
  alertsList: [
    {
      priority: 'Alta',
      category: 'Desinformación',
      evidence: 'Publicación viral con datos falsos.',
      recommendedAction: 'Revisar y contrarrestar con información oficial.'
    }
  ],
  opportunities: [
    {
      proposal: 'Crear hilo explicativo sobre la nueva ley de datos.',
      reason: 'Alta demanda de información clara.',
      suggestedFormat: 'Hilo de X con infografías.',
      riskLevel: 'Bajo'
    }
  ]
  // `lastUpdated` se rellenará dinámicamente en la API.
};

module.exports = { dashboard };
