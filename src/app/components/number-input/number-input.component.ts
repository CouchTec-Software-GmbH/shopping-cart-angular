import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { ProjectOptionList } from '@app/models/project-option-list';
import { ProjectNumberInput } from '@app/models/project-number-input';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="w-full flex flex-col justify-start">
        <h2 class="text-black font-medium text-[20px] mt-8">{{ data.title }}</h2>
        <p class="font-light mt-2">
          {{ data.description }}
        </p>
      </div>

      <div class="w-full justify-start items-center flex flex-row mt-4 gap-4">
        <label for="Quantity" class="sr-only"> Quantity </label>

        <div class="flex items-center rounded border border-gray-200">
          <button
            type="button"
            class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
            (click)="decrementMonth()"
          >
            &minus;
          </button>

          <input
            id="quantity-{{uuid}}"
            value="{{ value }}"
            (keydown)="allowOnlyNumbers($event)"
            (input)="updateMonths($event)"
            (blur)="resetToDefault()"
            class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />

          <button
            type="button"
            class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
            (click)="incrementMonth()"
          >
            &plus;
          </button>
        </div>
        <p>{{ data.name }}</p>
      </div>
    </div>
  `,
})
export class NumberInputComponent implements OnInit {
  @Input() data: ProjectNumberInput = {
    title: '',
    description: '',
    name: '',
    min: 0,
    max: 1,
    step: 1,
    default: 1,
  };

  @Output() selectionChange = new EventEmitter<number>();
  uuid: string = crypto.randomUUID();
  value: number = 1;

  ngOnInit(): void {
    this.value = this.data.default;
  }

  onSelectionChange(value: number): void {
    this.selectionChange.emit(value);
  }

  decrementMonth() {
    if (this.value - this.data.step >= this.data.min) {
      let value = this.value - this.data.step;
      this.value = value;
      this.onSelectionChange(value);
    }
  }

  incrementMonth() {
    if (this.value < this.data.max) {
      let value = this.value + this.data.step;
      this.value = value;
      this.onSelectionChange(value);
    }
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const numberKeys = /^[0-9]$/;

    if (!allowedKeys.includes(event.key) && !numberKeys.test(event.key)) {
      event.preventDefault();
    }
  }

  updateMonths(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = +input.value || 0;
    this.onSelectionChange(value);
    this.value = value;
  }

  resetToDefault(): void {
    let value = this.value;
    if (this.value && this.value > this.data.max) {
      value = this.data.max;
    }
    if (!this.value || this.value < this.data.min) {
      value = this.data.min;;
    }
    this.value = value;
    this.onSelectionChange(value);
  }
}
