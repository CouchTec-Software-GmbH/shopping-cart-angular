import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '../radio/radio.component';
import { containerization, environment, orchestration, provider } from '@app/data/deployment';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-deployment',
  standalone: true,
  imports: [CommonModule, RadioComponent, CheckboxComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Deployment
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the provider.
        </p>
        <app-radio [options]="provider" (selectionChange)="onProviderSelectionChange($event)"></app-radio>


      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the containerization.
      </p>
      <app-radio [options]="containerization" (selectionChange)="onContainerizationSelectionChange($event)"></app-radio>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the orchestration.
      </p>
      <app-radio [options]="orchestration" (selectionChange)="onOrchestrationSelectionChange($event)"></app-radio>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the environment.
      </p>
      <app-checkbox [options]="environment" ></app-checkbox>
  `,
})
export class DeploymentComponent {
  @Input() options: ProjectOption[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  provider: ProjectOption[] = provider;
  containerization: ProjectOption[] = containerization;
  orchestration: ProjectOption[] = orchestration;
  environment: ProjectOption[] = environment;

  selectedProvider: string = '';
  selectedContainerization: string = '';
  selectedOrchestration: string = '';
  selectedEnvironments: string[] = [];

  onProviderSelectionChange(selectionId: string): void {
    this.selectedProvider = selectionId;
    this.selectionChange.emit(selectionId);
  }

  onContainerizationSelectionChange(selectionId: string): void {
    this.selectedContainerization = selectionId;
    this.selectionChange.emit(selectionId);
  }

  onOrchestrationSelectionChange(selectionId: string): void {
    this.selectedOrchestration = selectionId;
    this.selectionChange.emit(selectionId);
  }

  onEnvironmentSelectionChange(selectionId: string[]): void {
    this.selectedEnvironments = selectionId;
  }
}
