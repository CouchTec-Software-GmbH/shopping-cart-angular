import { ProjectData } from '@models/project-data';

export function createDefaultProjectData(): ProjectData {
  return {
    projectType: 'GreenFieldProject',
    tierOptions: [],
    techStack: {
      frontend: {
        framework: 'React',
        styling: '',
      },
      middleware: '',
      backend: '',
      database: '',
    },
    deployment: {
      provider: 'AWS',
      containerization: 'Docker',
      orchestration: 'Kubernetes',
      environment: [],
    },
    security: [],
    monitoring: '',
    extra: [],
  };
}

export function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

export function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (!current[keys[i]]) {
      return null;
    }
    current = current[keys[i]];
  }
  return current;
}
