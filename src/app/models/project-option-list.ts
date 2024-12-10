import { ProjectOption } from './project-option';

export interface ProjectOptionList {
  id: string;
  title: string;
  description: string;
  options: ProjectOption[];
}
