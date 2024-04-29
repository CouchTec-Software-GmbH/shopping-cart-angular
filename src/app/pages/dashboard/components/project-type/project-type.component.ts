import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '../radio/radio.component';
import { projectOptions } from '@app/data/project-options';

@Component({
  selector: 'app-project-type',
  standalone: true,
  imports: [CommonModule, RadioComponent],
  template: `
        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Start configuring your project
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the type of project you want to develop / expand.
        </p>
        <app-radio [options]="options" (selectionChange)="onSelectionChange($event)"></app-radio>
  `,
})
export class ProjectTypeComponent {
  options: ProjectOption[] = projectOptions;

  constructor() {
    const projectType = localStorage.getItem('projectType');
    if (projectType) {
      this.options = this.options.map(option => {
        option.checked = option.id === projectType;
        return option;
      });
    } else {
      localStorage.setItem('projectType', this.options.filter(option => option.checked).map(option => option.id)[0]);
    }
  }

  onSelectionChange(selectionId: string): void {
    localStorage.setItem('projectType', selectionId);
  }
}
