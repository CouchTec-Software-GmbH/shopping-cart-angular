import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { security } from '@app/data/security';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Security
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the security options you want to use for your project.
        </p>

    <app-checkbox [options]="options" (selectionChange)="selectedOptions = $event"></app-checkbox>
  `,
})
export class SecurityComponent {
  @Output() selectionChange = new EventEmitter<string>();

  options: ProjectOption[] = security;

  selectedOptions: string[] = [];
}
