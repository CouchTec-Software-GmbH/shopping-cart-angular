import {
  Component,
  OnInit,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@app/services/product.service';
import { RadioComponent } from '@components/radio-new/radio.component';
import { CheckboxComponent } from '@components/checkbox-new/checkbox.component';
import { Option } from '@app/models/option';

@Component({
  selector: 'app-sub-section',
  standalone: true,
  imports: [CommonModule, RadioComponent, CheckboxComponent],
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
        *ngIf="button === 'radio'"
        [options]="options"
        (selectionChange)="changeSelection($event)"
      ></app-radio>
      <app-checkbox
        *ngIf="button === 'checkbox'"
        [options]="options"
        (selectionChange)="changeSelection($event)"
      ></app-checkbox>
    </main>
  `,
})
export class SubSectionComponent implements OnInit {
  @Input() key: string = '';
  @Input() button: 'radio' | 'checkbox' = 'radio';
  @Input() title: string = '';
  @Input() sub_title: string = '';
  @Input() options: Option[] = [];

  productService = inject(ProductService);

  ngOnInit(): void {
  }

  changeSelection(selectionId: string | string[]): void {
  }

}
