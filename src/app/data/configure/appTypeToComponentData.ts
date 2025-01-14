import { ProjectNumberInput } from '@app/models/project-number-input';
import { ProjectOptionList } from '@app/models/project-option-list';
import { AppTypeEnum } from '@app/types/AppType';
import {
  assets,
  auth,
  design,
  geography,
  infrastructure,
  maintenance,
  pages,
  platforms,
  timeframe,
  userTracking,
} from './componentData';

export const appTypeToConfigureComponents: Record<
  AppTypeEnum,
  (ProjectOptionList | ProjectNumberInput)[]
> = {
  [AppTypeEnum.ECommerce]: [],
  [AppTypeEnum.Website]: [
    timeframe,
    platforms,
    pages,
    infrastructure,
    design,
    assets,
    geography,
    auth,
    maintenance,
    userTracking,
  ],
  [AppTypeEnum.DataAnalytics]: [],
  [AppTypeEnum.ContentPlatform]: [],
  [AppTypeEnum.Management]: [],
  [AppTypeEnum.Digitalisierung]: [],
};
