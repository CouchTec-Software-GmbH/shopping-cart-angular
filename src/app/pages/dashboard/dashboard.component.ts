import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxSectionComponent } from '../components/checkboxSection.component';

import { RadioButtonSectionComponent } from '../components/radioButtonSection.component';
import { AccordionCheckboxSectionComponent } from '../components/accordionCheckboxSection.component';
import { GreenFieldComponent } from '../components/greenfield.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CheckboxSectionComponent, RadioButtonSectionComponent, AccordionCheckboxSectionComponent, GreenFieldComponent],
  template: `
    <div class="mx-auto max-w-screen-xl mt-8">
      <app-radioButtonSection [title]="'Project Type'" [options]="projectOptions" (selectionChange)="handleSelection($event)"></app-radioButtonSection>

  <p *ngIf="selectedOption === 'GreenFieldProject'">Green Field was selected</p>
      <p *ngIf="selectedOption === 'GrayFieldProject'">Gray Field was selected</p>
      <p *ngIf="selectedOption === 'InfrastructureProject'">Infra was selected</p>
      <p *ngIf="selectedOption === 'IntegrationProject'">Integration was selected</p>
      <p *ngIf="selectedOption === 'MigrationProject'">Migration was selected</p>

// <app-accordionCheckboxSection *ngIf="selectedOption === 'BrownFieldProject'" [title]="'Technology Stack'" [options]="tierOptions" ></app-accordionCheckboxSection>

      <app-greenfield *ngIf="selectedOption === 'GreenFieldProject'"></app-greenfield>
    </div>
  `,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  projectOptions = [
    {
      id: 'GreenFieldProject',
      name: 'Green Field Project',
      description: 'Starting from scratch.',
      checked: true,
    },
    {
      id: 'GrayFieldProject',
      name: 'Gray Field Project',
      description: 'Starting from a template or existing project',
      checked: false,
    },
    {
      id: 'BrownFieldProject',
      name: 'Brown Field Project',
      description: 'Modifying or integrating with existing systems.',
      checked: false,
    },
    {
      id: 'InfrastructureProject',
      name: 'Infrastructure Project',
      description: 'Focused on setting up or upgrading infrastructure.',
      checked: false,
    },
    {
      id: 'MigrationProject',
      name: 'Migration Project',
      description: 'Moving from one environment or technology to another.',
      checked: false,
    },
    {
      id: 'IntegrationProject',
      name: 'Integration Project',
      description: 'Connecting multiple systems or technologies.',
      checked: false,
    },
  ];

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

  selectedOption: string = '';

  handleSelection(selectionId: string): void {
    this.selectedOption = selectionId;
  }
}
