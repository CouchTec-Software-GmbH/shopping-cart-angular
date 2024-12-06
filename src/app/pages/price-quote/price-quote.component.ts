import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../home/components/header/header.component';
import { ConfigureMode } from './mode/configure-mode.component';
import { CommonModule } from '@angular/common';
import { AppType } from './app-type/app-type.component';
import { Page3 } from './page3/page3.component';
import { PriceService } from '@app/services/price.service';
import { Subscription } from 'rxjs';
import { AppTypeEnum } from '@app/types/AppType';

export enum Page {
  AppType,
  Mode,
  Page3,
}


export enum Mode {
  Manager = 'Normaler Modus',
  Expert = 'Erweiterter Modus',
}

@Component({
  selector: 'price-quote-type',
  standalone: true,
  imports: [HeaderComponent, ConfigureMode, CommonModule, AppType, Page3],
  templateUrl: './price-quote.component.html',
})
export class PriceQuote
  implements OnInit, OnDestroy
{
  Page = Page;
  AppTypeEnum = AppTypeEnum;
  Mode = Mode;

  state = Page.Page3;
  appType = AppTypeEnum.UserFacing;
  mode = Mode.Manager;

  price: number = 0;
  monthlyPrice: number = 0;
  private priceSubscription!: Subscription;


  constructor(
     public priceService: PriceService,
  ) {}

  ngOnInit(): void {
    this.priceSubscription = this.priceService.price$.subscribe({
      next: (value) => (this.price = value),
    });

    this.priceSubscription = this.priceService.monthyPrice$.subscribe({
      next: (value) => (this.monthlyPrice = value),
    });
  }

  ngOnDestroy(): void {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
    }
  }

  selectAppType(appType: AppTypeEnum): void {
    this.appType = appType;
    this.state = Page.Mode;
  }

  selectMode(mode: Mode): void {
    this.mode = mode;
    this.state = Page.Page3;
  }
}
