import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RadioComponent } from '@app/components/radio/radio.component';
import { NumberInputComponent } from '@app/components/number-input/number-input.component';
import { CheckboxComponent } from '@app/components/checkbox/checkbox.component';
import { AppTypeEnum } from '@app/types/AppType';
import { PriceService } from '@app/services/price.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'configure',
  standalone: true,
  imports: [
    RadioComponent,
    NumberInputComponent,
    CheckboxComponent,
    CommonModule,
  ],
  templateUrl: './configure.component.html',
})
export class Configure implements OnInit {
  @Output() backToAppType = new EventEmitter();
  @Input() appType = AppTypeEnum.Website;
  AppTypeEnum = AppTypeEnum;

  constructor(public priceService: PriceService) { }

  ngOnInit(): void {
    this.priceService.updatePrice();
  }

}
