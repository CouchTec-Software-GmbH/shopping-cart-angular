import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppTypeData } from '@app/data/appTypeData';
import { NavigationService } from '@app/services/navigation.service';
import { PriceService } from '@app/services/price.service';
import { Page, PriceQuoteService } from '@app/services/priceQuote.service';
import { AppTypeEnum } from '@app/types/AppType';

@Component({
  selector: 'app-type-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-type.component.html',
})
export class AppTypeComponent {
  AppTypeEnum = AppTypeEnum;
  AppTypeData = AppTypeData;

  constructor(
    private priceService: PriceService,
    private navigationService: NavigationService,
    public priceQuoteService: PriceQuoteService,
  ) { }

  handleClick(appType: AppTypeEnum) {
    this.priceService.setAppType(appType);
    this.priceQuoteService.setAppType(appType);
    this.priceQuoteService.setPage(Page.Configure);
    this.navigationService.navigateToPriceQuote();
  }
}
