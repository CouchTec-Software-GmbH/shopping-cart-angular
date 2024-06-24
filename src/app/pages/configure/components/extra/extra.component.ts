import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { extraOptions } from '@app/data/extra';
import { SectionComponent } from '../section/section-component';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-extra',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Additional Features
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose additional Features.
        </p>

    <app-section
      [path]="'extra'"
      [options]="options"
      [projectData]="projectData"
      [buttonType]="'checkbox'">
      [uuid]="uuid"
      (projectDataChange)="changeProjectData($event)"
    </app-section>
  `,
})
export class ExtraComponent extends BaseComponent {
  options: ProjectOption[] = extraOptions
}
