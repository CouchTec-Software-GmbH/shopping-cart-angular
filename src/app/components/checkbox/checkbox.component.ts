import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOptionList } from '@app/models/project-option-list';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="w-full flex flex-col justify-start">
        <h2 class="text-black font-medium text-[20px] mt-8">
          {{ list.title }}
        </h2>
        <p class="font-light mt-2">
          {{ list.description }}
        </p>
      </div>

      <fieldset class="flex flex-col gap-3 w-full mt-4 ml-2">
        <legend class="sr-only">Infrastruktur</legend>
        <label
          *ngFor="let option of list.options"
          [for]="option.id"
          class="flex items-center gap-4 cursor-pointer"
        >
          <input
            type="checkbox"
            name="checkbox-{{ uuid }}"
            [value]="option.id"
            [id]="option.id"
            [checked]="option.checked"
            class="sr-only peer"
            (change)="onSelectionChange(option.id)"
          />
          <span
            class="block size-[10px] rounded-full bg-none ring-1 ring-black ring-offset-[3px] peer-checked:bg-black peer-checked:ring-offset-[3px]"
          ></span>
          <span class="text-sm text-gray-700">{{ option.name }}</span>
        </label>
      </fieldset>
    </div>
  `,
})
export class CheckboxComponent {
  @Input() list: ProjectOptionList = {
    title: '',
    description: '',
    options: [],
  };
  @Output() selectionChange = new EventEmitter<string[]>();
  uuid: string = crypto.randomUUID();
  selectedOptions: string[] = this.list.options
    .filter((option) => option.checked)
    .map((option) => option.id);

  constructor() {
    this.selectionChange.emit(
      this.list.options
        .filter((option) => option.checked)
        .map((option) => option.id),
    );
  }

  onSelectionChange(selectionId: string): void {
    if (this.selectedOptions.includes(selectionId)) {
      this.selectedOptions = this.selectedOptions.filter(
        (option) => option !== selectionId,
      );
    } else {
      this.selectedOptions.push(selectionId);
    }
    this.selectionChange.emit(this.selectedOptions);
  }
}
