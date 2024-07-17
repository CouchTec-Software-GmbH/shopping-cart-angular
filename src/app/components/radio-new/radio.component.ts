import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '@app/models/option';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule],
  template: `

<fieldset class="space-y-4">
  <legend class="sr-only">Delivery</legend>

  <div *ngFor="let option of options">
    <label
      class="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
    >
      <div>
        <p class="text-gray-700">{{ option.display_name }}</p>

        <p class="mt-1 text-gray-900"> {{ option.description }}</p>
      </div>

      <input
        type="radio"
        name="radio-{{uuid}}"
        [value]="option.key"
        [id]="option.key"
        class="size-5 border-gray-300 text-blue-500"
        [checked]="option.checked"
        (change)="onSelectionChange(option.key)"
      />
    </label>
  </div>
</fieldset>
  `,
})
export class RadioComponent {
  @Input() options: Option[] = [];
  @Output() selectionChange = new EventEmitter<string>();
  uuid: string = crypto.randomUUID();

  onSelectionChange(selectionId: string): void {
    this.selectionChange.emit(selectionId);
  }
}
