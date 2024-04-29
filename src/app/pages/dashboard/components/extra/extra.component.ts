import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { extraOptions } from '@app/data/extra';

@Component({
  selector: 'app-extra',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Additional Features
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose additional Features.
        </p>

    <app-checkbox [options]="options" (selectionChange)="handleSelectionChange($event)"></app-checkbox>
  `,
})
export class ExtraComponent {
  options: ProjectOption[] = extraOptions;

  constructor() {
    const extra = localStorage.getItem('extra');
    if (extra) {
      this.options = this.options.map(option => {
        option.checked = extra.includes(option.id);
        return option;
      });
    } else {
      localStorage.setItem('extra', this.options.filter(option => option.checked).map(option => option.id)[0] || "");
    }
  }

  handleSelectionChange(selectionId: string[]): void {
    localStorage.setItem('extra', JSON.stringify(selectionId));
  }
}
