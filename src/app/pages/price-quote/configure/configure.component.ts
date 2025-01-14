import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RadioComponent } from '@app/components/radio/radio.component';
import { NumberInputComponent } from '@app/components/number-input/number-input.component';
import { CheckboxComponent } from '@app/components/checkbox/checkbox.component';
import { AppTypeEnum } from '@app/types/AppType';
import { PriceService } from '@app/services/price.service';
import { CommonModule } from '@angular/common';
import { BoxType, ProjectOptionList } from '@app/models/project-option-list';
import { ProjectNumberInput } from '@app/models/project-number-input';
import { appTypeToConfigureComponents } from '@app/data/configure/appTypeToComponentData';
import { PriceQuoteService } from '@app/services/priceQuote.service';
import { Subscription } from 'rxjs';

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
export class Configure implements OnInit, OnDestroy {
  @Output() backToAppType = new EventEmitter();
  @Input() appType = AppTypeEnum.Website;
  AppTypeEnum = AppTypeEnum;

  appConfigComponents: (ProjectOptionList | ProjectNumberInput)[] = [];
  appTypeSubscription!: Subscription;

  constructor(public priceService: PriceService, private priceQuoteService: PriceQuoteService) { }


  ngOnInit(): void {
    this.appTypeSubscription = this.priceQuoteService.appType$.subscribe({
      next: (value) => (this.appType = value),
    });


    this.priceService.updatePrice();
    this.appConfigComponents = appTypeToConfigureComponents[this.appType] || [];

    console.log("Inside Configure Component. AppType: ", this.appType);
  }

  ngOnDestroy(): void {
    this.appTypeSubscription.unsubscribe();
  }

  getComponentType(component: ProjectOptionList | ProjectNumberInput): BoxType {
    if ('boxType' in component) {
      return component.boxType;
    }
    return BoxType.NumberInput;
  }


  handleSelectionChange(fieldId: string | undefined, value: any): void {
    if (!fieldId) {
      console.error('Component is missing an ID.');
      return;
    }

    const methodName = `set${this.capitalizeFirstLetter(fieldId)}`;
    if (typeof (this.priceService as any)[methodName] === 'function') {
      (this.priceService as any)[methodName](value);
    } else {
      console.error(`PriceService is missing the method: ${methodName}`);
    }
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  isOptionList(component: ProjectOptionList | ProjectNumberInput): component is ProjectOptionList {
    return (component as ProjectOptionList).options !== undefined;
  }

  isProjectOptionList(component: any): component is ProjectOptionList {
    return 'options' in component;
  }
  isProjectNumberInput(component: ProjectOptionList | ProjectNumberInput): component is ProjectNumberInput {
    return 'min' in component && 'max' in component && 'step' in component;
  }
}
