import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radioButtonSection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mx-auto max-w-lg text-center">
      <h2 class="text-3xl font-bold sm:text-4xl text-gray-600">
        {{ title }}
      </h2>
    </div>
    <fieldset class="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto my-8">
      <legend class="sr-only">ProjectType</legend>
      <div *ngFor="let option of options">
        <label
          [attr.for]="option.id"
          class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-red-600 has-[:checked]:ring-1 has-[:checked]:ring-red-600"
        >
          <div>
            <p class="text-gray-700">{{ option.name }}</p>
            <p class="mt-1 text-gray-900">{{ option.description }}</p>
          </div>
          <input
            type="radio"
            name="ProjectOption"
            [value]="option.id"
            [id]="option.id"
            class="sr-only"
            [checked]="option.id === selectedOption"
            (change)="onSelectionChange(option.id)"
          />
        </label>
      </div>
    </fieldset>
  `,
})
export class RadioButtonSectionComponent {
  @Input() options: any[] = [];
  @Input() title: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  selectedOption: string = '';

  onSelectionChange(selectionId: string): void {
    this.selectedOption = selectionId;
    this.selectionChange.emit(selectionId);
  }
}
