import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '../radio/radio.component';
import { monitoring } from '@app/data/monitoring';

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

  <app-radio [options]="options" (selectionChange)="selectedOption = $event"></app-radio>
  `,
})
export class MonitoringComponent {
  @Output() selectionChange = new EventEmitter<string>();

  options: ProjectOption[] = monitoring;

  selectedOption: string = '';

  onSelectionChange(selectionId: string): void {
    this.selectedOption = selectionId;
    this.selectionChange.emit(selectionId);
  }
}
