import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '@components/radio/radio.component';
import { monitoringOptions } from '@app/data/monitoring';
import { SectionComponent } from '../section/section-component';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, RadioComponent, SectionComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Monitoring
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the monitoring option you want to use for your project.
        </p>

  <app-section
    [path]="'monitoring'"
    [options]="options"
    [projectData]="projectData"
    [buttonType]="'radio'">
    [uuid]="uuid"
    (projectDataChange)="changeProjectData($event)"
  </app-section>
  `,
})
export class MonitoringComponent extends BaseComponent {
  options: ProjectOption[] = monitoringOptions;
}
