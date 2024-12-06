import { Component, EventEmitter, Output } from '@angular/core';
import { PriceService } from '@app/services/price.service';
import { AppTypeEnum } from '@app/types/AppType';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [],
  templateUrl: './app-type.component.html',
})
export class AppType {
  @Output() next = new EventEmitter<AppTypeEnum>();
  AppTypeEnum = AppTypeEnum;

  constructor(
    private priceService: PriceService
  ) {}

  setAppType(appType: AppTypeEnum) {
    this.priceService.setAppType(appType);
  }

  handleClick(appType: AppTypeEnum) {
    this.priceService.setAppType(appType);
    this.next.emit(appType)
  }
}
