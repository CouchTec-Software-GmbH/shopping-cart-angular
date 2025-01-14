import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxType, ProjectOptionList } from '@app/models/project-option-list';

@Component({
  selector: 'app-radio',
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
            type="radio"
            name="radio-{{ uuid }}"
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
export class RadioComponent implements OnInit {
  @Input() list: ProjectOptionList = {
    id: '',
    title: '',
    description: '',
    boxType: BoxType.Radio,
    options: [],
  };

  @Output() selectionChange = new EventEmitter<string>();
  uuid: string = crypto.randomUUID();

  ngOnInit(): void {
    const value = localStorage.getItem(this.list.title);
    if (value) {
      this.list.options.forEach(option => {
        option.checked = option.id === value
      });
      this.selectionChange.emit(value);
    }
  }

  onSelectionChange(selectionId: string): void {
    localStorage.setItem(this.list.title, selectionId);
    this.selectionChange.emit(selectionId);
  }
}
