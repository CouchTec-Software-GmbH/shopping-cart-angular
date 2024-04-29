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
        <app-radio [options]="provider" (providerOutput)="handleProviderSelectionChange($event)"></app-radio>


      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the containerization.
      </p>
      <app-radio [options]="containerization" (containerizationOutput)="handleContainerizationSelectionChange($event)"></app-radio>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the orchestration.
      </p>
      <app-radio [options]="orchestration" (orchestrationOutput)="handleOrchestrationSelectionChange($event)"></app-radio>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the environment.
      </p>
      <app-checkbox [options]="environment" (environmentOutput)="handleEnvironmentSelectionChange($event)"></app-checkbox>
  `,
})
export class DeploymentComponent {
  @Input() options: ProjectOption[] = [];
  @Output() providerOutput = new EventEmitter<string>();
  @Output() containerizationOutput = new EventEmitter<string>();
  @Output() orchestrationOutput = new EventEmitter<string>();
  @Output() environmentOutput = new EventEmitter<string[]>();

  provider: ProjectOption[] = provider;
  containerization: ProjectOption[] = containerization;
  orchestration: ProjectOption[] = orchestration;
  environment: ProjectOption[] = environment;

  selectedProvider: string = '';
  selectedContainerization: string = '';
  selectedOrchestration: string = '';
  selectedEnvironments: string[] = [];

  handleProviderSelectionChange(selectionId: string): void {
    this.selectedProvider = selectionId;
    this.providerOutput.emit(selectionId);
  }

  handleContainerizationSelectionChange(selectionId: string): void {
    this.selectedContainerization = selectionId;
    this.containerizationOutput.emit(selectionId);
  }

  handleOrchestrationSelectionChange(selectionId: string): void {
    this.selectedOrchestration = selectionId;
    this.orchestrationOutput.emit(selectionId);
  }

  handleEnvironmentSelectionChange(selectionId: string[]): void {
    this.selectedEnvironments = selectionId;
    this.environmentOutput.emit(selectionId);
  }
}
