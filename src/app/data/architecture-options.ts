  export const architectureOptions = [
    {
      id: 'monolithic',
      name: 'Monolithic',
      description: 'Eine einzige Codebasis und Einsatzeinheit',
      checked: true,
    },
    {
      id: 'microservices',
      name: 'Microservices',
      description: 'Zerlegt in kleinere Dienste.',
      checked: false,
    },
    {
      id: 'serverless',
      name: 'Serverless',
      description: 'Funktionen als Dienstleistung',
      checked: false,
    },
    {
    id: 'hybrid',
      name: 'Hybrid',
      description: 'Kombination von Architekturen',
      checked: false,
    },
  ];
