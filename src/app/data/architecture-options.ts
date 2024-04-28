  export const architectureOptions = [
    {
      id: 'monolithic',
      name: 'Monolithic',
      description: 'Single codebase and deployment unit.',
      checked: true,
    },
    {
      id: 'microservices',
      name: 'Microservices',
      description: 'Decomposed into smaller services.',
      checked: false,
    },
    {
      id: 'serverless',
      name: 'Serverless',
      description: 'Functions as a service.',
      checked: false,
    },
    {
    id: 'hybrid',
      name: 'Hybrid',
      description: 'Combination of architectures.',
      checked: false,
    },
  ];
