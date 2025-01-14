import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../home/components/header/header.component';
import { ConfigureMode } from './mode/configure-mode.component';
import { CommonModule } from '@angular/common';
import { AppType } from './app-type/app-type.component';
import { PriceService } from '@app/services/price.service';
import { Subscription } from 'rxjs';
import { AppTypeEnum } from '@app/types/AppType';
import { Page, PriceQuoteService } from '@app/services/priceQuote.service';
import { Configure } from './configure/configure.component';


@Component({
  selector: 'price-quote-type',
  standalone: true,
  imports: [HeaderComponent, ConfigureMode, CommonModule, AppType, Configure],
  templateUrl: './price-quote.component.html',
})
export class PriceQuote implements OnInit, OnDestroy {
  Page = Page
  AppTypeEnum = AppTypeEnum;

  page = Page.AppType;
  appType = AppTypeEnum.Website;
  price: number = 0;
  monthlyPrice: number = 0;

  private priceSubscription!: Subscription;
  private monthlyPriceSubscription!: Subscription;
  private pageSubscription!: Subscription;
  private appTypeSubscription!: Subscription;

  constructor(public priceService: PriceService, private PriceQuoteService: PriceQuoteService) {}

  async ngOnInit(): Promise<void> {
    this.pageSubscription = this.PriceQuoteService.page$.subscribe({
      next: (value) => (this.page = value),
    });

    this.appTypeSubscription = this.PriceQuoteService.appType$.subscribe({
      next: (value) => (this.appType = value),
    });

    this.priceSubscription = this.priceService.price$.subscribe({
      next: (value) => (this.price = value),
    });

    this.monthlyPriceSubscription = this.priceService.monthyPrice$.subscribe({
      next: (value) => (this.monthlyPrice = value),
    });
  }

  ngOnDestroy(): void {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
    }
    if (this.monthlyPriceSubscription) {
      this.monthlyPriceSubscription.unsubscribe();
    }
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    if (this.appTypeSubscription) {
      this.appTypeSubscription.unsubscribe();
    }
  }

  selectAppType(appType: AppTypeEnum): void {
    this.appType = appType;
    this.page = Page.Configure;
  }
}
