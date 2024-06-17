export interface ProjectData {
  projectType: string;
  status: string;
  tierOptions: string[];
  techStack: {
    frontend: {
      framework: string;
      styling: string;
    };
    middleware: string;
    backend: string;
    database: string;
  };
  deployment: {
    provider: string;
    containerization: string;
    orchestration: string;
    environment: string[];
  };
  security: string[];
  monitoring: string;
  extra: string[];
}


