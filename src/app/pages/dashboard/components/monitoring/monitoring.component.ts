import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '../radio/radio.component';
import { monitoringOptions } from '@app/data/monitoring';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, RadioComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Monitoring
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the monitoring option you want to use for your project.
        </p>

  <app-radio [options]="options" (selectionChange)="handleSelectionChange($event)"></app-radio>
  `,
})
export class MonitoringComponent {
  options: ProjectOption[] = monitoringOptions;

  constructor() {
    const monitoring = localStorage.getItem('monitoring');
    if (monitoring) {
      this.options = this.options.map(option => {
        option.checked = option.id === monitoring;
        return option;
      });
    } else {
      localStorage.setItem('monitoring', this.options.filter(option => option.checked).map(option => option.id)[0] || "");
    }
  }

  handleSelectionChange(selectionId: string): void {
    localStorage.setItem('monitoring', selectionId);
  }
}
