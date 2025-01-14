import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppTypeData } from '@app/data/appTypeData';
import { NavigationService } from '@app/services/navigation.service';
import { PriceService } from '@app/services/price.service';
import { AppTypeEnum } from '@app/types/AppType';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-type.component.html',
})
export class AppType {
  AppTypeEnum = AppTypeEnum;
  AppTypeData = AppTypeData;

  constructor(
    private priceService: PriceService,
    private navigationService: NavigationService,
  ) { }

  setAppType(appType: AppTypeEnum) {
    this.priceService.setAppType(appType);
  }

  handleClick(appType: AppTypeEnum) {
    this.setAppType(appType);
    this.navigationService.navigateToPriceQuote();
  }
}
