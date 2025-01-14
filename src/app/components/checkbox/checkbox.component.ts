import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxType, ProjectOptionList } from '@app/models/project-option-list';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="w-full flex flex-col justify-start mb-4">
        <h2 class="text-black font-medium text-[20px] mt-8">
          {{ list.title }}
        </h2>
        <p class="font-light mt-2">
          {{ list.description }}
        </p>
      </div>

      <fieldset>
        <legend class="sr-only">{{ list.title }}</legend>
        <div class="space-y-2">
          <label
            *ngFor="let option of list.options"
            [for]="option.id"
            class="flex cursor-pointer items-start gap-4"
          >
            <div class="flex items-center">
              &#8203;
              <input
                type="checkbox"
                class="size-4 rounded border-gray-300 custom-checkbox"
                [id]="option.id"
                [checked]="option.checked"
                (change)="onSelectionChange(option.id)"
              />
            </div>

            <div>
              <span class="text-sm text-gray-700"> {{ option.name }}</span>
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  `,
})
export class CheckboxComponent implements OnInit {
  @Input() list: ProjectOptionList = {
    id: '',
    title: '',
    description: '',
    boxType: BoxType.Checkbox,
    options: [],
  };
  @Output() selectionChange = new EventEmitter<string[]>();
  uuid: string = crypto.randomUUID();
  selectedOptions: string[] = this.list.options
    .filter((option) => option.checked)
    .map((option) => option.id);

  ngOnInit(): void {
    const values = localStorage.getItem(this.list.title);
    if (values) {
      const array: string[] = JSON.parse(values);
      if (array) {
        console.log('array: ', array);
        this.list.options.forEach((option) => {
          console.log(`${option.id} ${array.includes(option.id)}`);
          option.checked = array.includes(option.id);
          if (option.checked) {
            this.selectedOptions.push(option.id);
          }
        });
      }
    }
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
    localStorage.setItem(this.list.title, JSON.stringify(this.selectedOptions));
    this.selectionChange.emit(this.selectedOptions);
  }
}
