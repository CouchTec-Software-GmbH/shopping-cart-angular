import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '../radio/radio.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { containerizationOptions, environmentOptions, orchestrationOptions, providerOptions } from '@app/data/deployment';

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
        <app-radio [options]="provider" (selectionChange)="handleProviderSelectionChange($event)"></app-radio>


      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the containerization.
      </p>
      <app-radio [options]="containerization" (selectionChange)="handleContainerizationSelectionChange($event)"></app-radio>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the orchestration.
      </p>
      <app-radio [options]="orchestration" (selectionChange)="handleOrchestrationSelectionChange($event)"></app-radio>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the environment.
      </p>
      <app-checkbox [options]="environment" (selectionChange)="handleEnvironmentSelectionChange($event)"></app-checkbox>
  `,
})
export class DeploymentComponent {
  provider: ProjectOption[] = providerOptions;
  containerization: ProjectOption[] = containerizationOptions;
  orchestration: ProjectOption[] = orchestrationOptions;
  environment: ProjectOption[] = environmentOptions;

  constructor() {
    const provider = localStorage.getItem('provider');
    if (provider) {
      this.provider = this.provider.map(option => {
        option.checked = option.id === provider;
        return option;
      });
    } else {
      localStorage.setItem('provider', this.provider.filter(option => option.checked).map(option => option.id)[0]);
    }
    const containerization = localStorage.getItem('containerization');
    if (containerization) {
      this.containerization = this.containerization.map(option => {
        option.checked = option.id === containerization;
        return option;
      });
    } else {
      localStorage.setItem('containerization', this.containerization.filter(option => option.checked).map(option => option.id)[0]);
    }
    const orchestration = localStorage.getItem('orchestration');
    if (orchestration) {
      this.orchestration = this.orchestration.map(option => {
        option.checked = option.id === orchestration;
        return option;
      });
    } else {
      localStorage.setItem('orchestration', this.orchestration.filter(option => option.checked).map(option => option.id)[0]);
    }
    const environment = localStorage.getItem('environment');
    if (environment) {
      this.environment = this.environment.map(option => {
        option.checked = environment.includes(option.id);
        return option;
      });
    } else {
      localStorage.setItem('environment', JSON.stringify(this.environment.filter(option => option.checked).map(option => option.id)));
    }
  }

  handleProviderSelectionChange(selectionId: string): void {
    localStorage.setItem('provider', selectionId);
  }

  handleContainerizationSelectionChange(selectionId: string): void {
    localStorage.setItem('containerization', selectionId);
  }

  handleOrchestrationSelectionChange(selectionId: string): void {
    localStorage.setItem('orchestration', selectionId);
  }

  handleEnvironmentSelectionChange(selectionId: string[]): void {
    localStorage.setItem('environment', JSON.stringify(selectionId));
  }
}
