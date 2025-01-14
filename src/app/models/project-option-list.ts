import { ProjectOption } from './project-option';

export enum BoxType {
  Checkbox,
  Radio,
  NumberInput,
}

export interface ProjectOptionList {
  id: string;
  title: string;
  description: string;
  boxType: BoxType;
  options: ProjectOption[];
}
