import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '../radio/radio.component';

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

  <app-radio [options]="options" (selectionChange)="selectedOption = $event"></app-radio>
  `,
})
export class ProjectTypeComponent {
  @Input() options: ProjectOption[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  selectedOption: string = '';

  onSelectionChange(selectionId: string): void {
    this.selectedOption = selectionId;
    this.selectionChange.emit(selectionId);
  }
}