import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@app/services/product.service';
import { RadioComponent } from '@components/radio-new/radio.component';
import { CheckboxComponent } from '@components/checkbox-new/checkbox.component';
import { Option } from '@app/models/option';
import { setNestedValue } from '@app/utils/utils';
import { SliderComponent } from '@app/components/slider/slider.component';

@Component({
  selector: 'app-sub-section',
  standalone: true,
  imports: [CommonModule, RadioComponent, CheckboxComponent, SliderComponent],
  template: `
    <main>
      <h2 class="pt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl"
        [ngClass] = "{ 'hidden': title?.length === 0 }"
        >
        {{ title ?? '' }}

      </h2>
      <p class="pt-4 leading-relaxed text-gray-500"
        [ngClass] = "{ 'hidden': sub_title?.length === 0 }"
        >
        {{ sub_title ?? '' }}
      </p>
      <app-radio
        *ngIf="typ === 'radio'"
        [options]="options"
        (selectionChange)="changeSelection($event)"
      ></app-radio>
      <app-checkbox
        *ngIf="typ === 'checkbox'"
        [options]="options"
        (selectionChange)="changeSelection($event)"
      ></app-checkbox>
      <app-slider
        *ngIf="typ === 'slider'"
        [options]="options"
        (selectionChange)="changeSelection($event)"
      ></app-slider>
    </main>
  `,
})
export class SubSectionComponent {
  @Input() key: string = '';
  @Input() typ: string = 'radio';
  @Input() title: string = '';
  @Input() sub_title: string = '';
  @Input() options: Option[] = [];

  @Output() subSectionDataChange = new EventEmitter<any>();

  subSectionData: any = { [this.key]: {}};
  productService = inject(ProductService);

  changeSelection(selectionId: string | string[]): void {
    setNestedValue(this.subSectionData, this.key, selectionId);
     if (this.typ === 'radio') {
      this.options = this.options.map(option => {
        option.checked = option.key === selectionId;
        return option;
      });
    } else {
      if(!Array.isArray(selectionId)) {
        selectionId = [selectionId];
      }
      this.options = this.options.map(option => {
        option.checked = selectionId.includes(option.key);
        return option;
      });
    }
  }
}
