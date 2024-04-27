import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxSectionComponent } from './checkboxSection.component';

@Component({
  selector: 'app-brownfield',
  standalone: true,
  imports: [CommonModule, CheckboxSectionComponent],
  template: `
    <div class="mx-auto max-w-screen-xl mt-8">
      <app-checkboxSection [title]="'Technology Stack'" [options]="tierOptions" ></app-checkboxSection>
    </div>
  `,
})
export class BrownFieldComponent {

  tierOptions = [
    {
      id: 'Option1',
      name: 'Frontend',
      description: 'Front facing user interface.',
      checked: true,
    },
    {
      id: 'Option2',
      name: 'Frontend Middleware',
      description: 'Connection and data orchestration hub.',
      checked: false,
    },
    {
      id: 'Option3',
      name: 'Backend',
      description: 'Data processing and storage core.',
      checked: false,
    },
  ];
}