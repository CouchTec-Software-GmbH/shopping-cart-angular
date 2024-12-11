import { Injectable } from '@angular/core';
import { AppTypeEnum } from '@app/types/AppType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  appTypePrice: Record<AppTypeEnum, number> = {
    [AppTypeEnum.Management]: 5000,
    [AppTypeEnum.UserFacing]: 4000,
    [AppTypeEnum.DataAnalytics]: 6000,
    [AppTypeEnum.IntegrationAutomation]: 10000,
    [AppTypeEnum.SecurityCompliance]: 20000,
    [AppTypeEnum.Other]: 10000,
  };

  platformPrice: Record<string, number> = {
    ['web']: 4000,
    ['ios']: 10000,
    ['android']: 10000,
    ['linux']: 4000,
    ['macos']: 4000,
    ['windows']: 4000,
    ['']: 0,
  };

  designPrice: Record<string, number> = {
    ['basic-design']: 1,
    ['good-design']: 1.2,
    ['existing-design']: 1.1,
    ['']: 1,
  };

  infrastructurePrice: Record<string, number> = {
    ['cloud']: 1.1,
    ['own-server']: 1.5,
    ['couchtec-server']: 1,
    ['']: 1,
  };

  maintenancePrice: Record<string, number> = {
    ['cloud']: 1.2,
    ['own-server']: 2,
    ['couchtec-server']: 1,
    ['']: 1,
  };

  geopgraphyPrice: Record<string, number> = {
    ['regions']: 2000,
    ['language']: 1000,
    ['']: 0,
  };

  encryptionPrice: Record<string, number> = {
    ['transit']: 100,
    ['rest']: 200,
    ['e2e']: 900,
    ['']: 0,
  };

  dataProcessingPrice: Record<string, number> = {
    ['batch']: 1,
    ['real-time']: 2,
    ['']: 1,
  };

  mobile = ['ios', 'android'];
  desktop = ['web', 'linux', 'windows', 'macos'];

  private priceSubject = new BehaviorSubject<number>(0);
  price$ = this.priceSubject.asObservable();

  private monthyPriceSubject = new BehaviorSubject<number>(0);
  monthyPrice$ = this.monthyPriceSubject.asObservable();

  appType: AppTypeEnum = AppTypeEnum.UserFacing;
  totalUsers: number = 1000;
  concurrentUsers: number = 1000;
  platforms: string[] = [];
  timeframe: number = 9;
  design: string = '';
  infrastructure: string = '';
  initialStorage: number = 100;
  newStoragePerMonth: number = 1;
  geography: string[] = [];
  training: string[] = [];
  maintenance: string[] = [];
  auth: string[] = [];
  encryption: string = '';


  managementCompliance: string[] = [];
  managementIntegration: string[] = [];

  userTracking: string[] = [];

  dataSourcesWithAPI: number = 0;
  dataSourcesWithoutAPI: number = 0;
  dataProcessing: string = '';

  updatePrice() {
    let result = 0;
    result += this.appTypePrice[this.appType];
    result += this.totalUsers * 0.001;
    result += this.concurrentUsers * 0.01;
    result *= this.infrastructurePrice[this.infrastructure];

    let mobile = false;
    let desktop = false;
    let ui_cost = 0;
    for (const platform of this.platforms) {
      let cost = this.platformPrice[platform];
      if (this.mobile.includes(platform)) {
        if (mobile) {
          cost /= 5;
        }
        mobile = true;
      }
      if (this.desktop.includes(platform)) {
        if (desktop) {
          cost /= 5;
        }
        desktop = true;
      }
      ui_cost += cost;
    }
    result += ui_cost * this.designPrice[this.design];

    if (this.auth.length > 0) {
      result += (this.auth.length - 1) * 200;
      result += 1000;
    }

    result += this.encryptionPrice[this.encryption];

    for (const geographyOption of this.geography) {
      result += this.geopgraphyPrice[geographyOption];
    }

    result += result * (1 / this.timeframe);

    if (this.training.includes('training')) {
      result += 1000;
    }

    if (this.appType === AppTypeEnum.Management) {
      result += this.managementCompliance.length * 2000;
      result += this.managementIntegration.length * 5000;
    }

    if (this.appType === AppTypeEnum.UserFacing) {
      result += this.userTracking.length * 2000;
    }

    if (this.appType === AppTypeEnum.DataAnalytics) {
      result += this.dataSourcesWithAPI * 200 * this.dataProcessingPrice[this.dataProcessing];
      result += this.dataSourcesWithoutAPI * 600 * this.dataProcessingPrice[this.dataProcessing];
    }

    this.priceSubject.next(result);

    if (!this.maintenance.includes('maintenance')) {
      this.monthyPriceSubject.next(0);
      return;
    }

    let monthyPrice = 0;
    monthyPrice +=
      this.initialStorage * 0.001 +
      (this.newStoragePerMonth + this.concurrentUsers) *
      this.maintenancePrice[this.infrastructure] *
      0.01;

    if (this.geography.includes('regions')) {
      monthyPrice *= 2;
    }

    if (this.auth.length > 1) {
      monthyPrice += this.totalUsers * 0.1;
    }

    this.monthyPriceSubject.next(monthyPrice);
  }

  setTotalUsers(totalUsers: number) {
    this.totalUsers = totalUsers;
    this.updatePrice();
  }

  setConcurrentUsers(concurrentUsers: number) {
    this.concurrentUsers = concurrentUsers;
    this.updatePrice();
  }

  setPlatforms(platforms: string[]) {
    this.platforms = platforms;
    this.updatePrice();
  }

  setTimeframe(months: number) {
    this.timeframe = months;
    this.updatePrice();
  }

  setDesign(design: string) {
    this.design = design;
    this.updatePrice();
  }

  setInfrastructure(infrastructure: string) {
    this.infrastructure = infrastructure;
    this.updatePrice();
  }

  setInitialStorage(initialStorage: number) {
    this.initialStorage = initialStorage;
    this.updatePrice();
  }

  setnewStoragePerMonth(newStoragePerMonth: number) {
    this.newStoragePerMonth = newStoragePerMonth;
    this.updatePrice();
  }

  setGeography(geography: string[]) {
    this.geography = geography;
    this.updatePrice();
  }

  setTraining(training: string[]) {
    this.training = training;
    this.updatePrice();
  }

  setMaintenance(maintenance: string[]) {
    this.maintenance = maintenance;
    this.updatePrice();
  }

  setAuth(auth: string[]) {
    this.auth = auth;
    this.updatePrice();
  }

  setEncryption(encryption: string) {
    this.encryption = encryption;
    this.updatePrice();
  }

  setManagementIntegration(value: string[]) {
    this.managementIntegration = value;
    this.updatePrice();
  }

  setManagementCompliance(compliance: string[]) {
    this.managementCompliance = compliance;
    this.updatePrice();
  }

  setUserTracking(value: string[]) {
    this.userTracking = value;
    this.updatePrice();
  }

  setDataSourcesWithAPI(value: number) {
    this.dataSourcesWithAPI = value;
    this.updatePrice();
  }

  setDataSourcesWithoutAPI(value: number) {
    this.dataSourcesWithoutAPI = value;
    this.updatePrice();
  }

  setDataProcessing(value: string) {
    this.dataProcessing = value;
    this.updatePrice();
  }

  setAppType(appType: AppTypeEnum) {
    this.appType = appType;
    this.updatePrice();
  }
}
