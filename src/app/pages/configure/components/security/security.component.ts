import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { securityOptions } from '@app/data/security';
import { SectionComponent } from '../section/section-component';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Security
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the security options you want to use for your project.
        </p>

    <app-section
      [path]="'security'"
      [options]="options"
      [projectData]="projectData"
      [buttonType]="'checkbox'">
      [uuid]="uuid"
      (projectDataChange)="changeProjectData($event)"
    </app-section>
  `,
})
export class SecurityComponent extends BaseComponent {
  options: ProjectOption[] = securityOptions
}
