import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { extra } from '@app/data/extra';

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

    <app-checkbox [options]="options" (selectionChange)="selectedOptions = $event"></app-checkbox>
  `,
})
export class ExtraComponent {
  @Output() selectionChange = new EventEmitter<string>();

  options: ProjectOption[] = extra;

  selectedOptions: string[] = [];
}
