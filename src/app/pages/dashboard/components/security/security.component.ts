import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { securityOptions } from '@app/data/security';

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

    <app-checkbox [options]="options" (selectionChange)="handleSelectionChange($event)"></app-checkbox>
  `,
})
export class SecurityComponent {
  options: ProjectOption[] = securityOptions

  constructor() {
    const security = localStorage.getItem('security');
    if (security) {
      this.options = this.options.map(option => {
        option.checked = security.includes(option.id);
        return option;
      });
    } else {
      localStorage.setItem('security', JSON.stringify(this.options.filter(option => option.checked).map(option => option.id)));
    }
  }

  handleSelectionChange(selectionId: string[]): void {
    localStorage.setItem('security', JSON.stringify(selectionId));
  }
}
