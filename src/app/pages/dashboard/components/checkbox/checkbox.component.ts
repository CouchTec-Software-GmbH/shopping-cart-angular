import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
<fieldset class="mt-4">
  <legend class="sr-only">Checkboxes</legend>
  <div class="space-y-2">
    <label
      *ngFor="let option of options"
      class="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
    >
      <div class="flex items-center">
        &#8203;
        <input type="checkbox" class="size-4 rounded border-gray-300" id="option.id"
(change)="onSelectionChange(option.id)"
/>
      </div>
      <div>
        <strong class="font-medium text-gray-900"> {{ option.name }}</strong>
        <p class="mt-1 text-pretty text-sm text-gray-700">
          {{ option.description }}
        </p>
      </div>
    </label>
  </div>
</fieldset>
  `,
})
export class CheckboxComponent {
  @Input() options: ProjectOption[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  selectedOptions: string[] = [];

  onSelectionChange(selectionId: string): void {
    if (this.selectedOptions.includes(selectionId)) {
      this.selectedOptions.splice(this.selectedOptions.indexOf(selectionId), 1);
    }else {
      this.selectedOptions.push(selectionId);
    }
  }
}
