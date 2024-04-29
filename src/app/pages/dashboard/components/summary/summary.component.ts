import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Summary
        </h1>

        <div class="flow-root mt-4">
  <dl class="-my-3 divide-y divide-gray-100 text-sm">

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Project Type</dt>
      <dd class="text-gray-700 sm:col-span-2"> {{ projectTypeSelection  }} </dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Tiers</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ tierSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Frontend Framework</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ frontendFrameworkSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Styling</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ stylingSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Middleware</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ middlewareSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Backend</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ backendSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Database</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ databaseSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Provider</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ providerSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Containerization</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ containerizationSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Orchestration</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ orchestrationSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Environments</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ environmentSelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Security</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ securitySelection }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Monitoring</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ monitoringSelection }}</dd>
    </div>
    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Additional Features</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ additionalFeaturesSelection }}</dd>
    </div>
  </dl>
</div>


  `,
})
export class SummaryComponent {

  projectTypeSelection: string = localStorage.getItem('projectType') || '';
  tierSelection: string[] = localStorage.getItem('tiers') ? JSON.parse(localStorage.getItem('tiers') || '') : [];
  frontendFrameworkSelection: string = localStorage.getItem('frontendFramework') || '';
  stylingSelection: string = localStorage.getItem('styling') || '';
  middlewareSelection: string = localStorage.getItem('middleware') || '';
  backendSelection: string = localStorage.getItem('backend') || '';
  databaseSelection: string = localStorage.getItem('database') || '';
  providerSelection: string = localStorage.getItem('provider') || '';
  containerizationSelection: string = localStorage.getItem('containerization') || '';
  orchestrationSelection: string = localStorage.getItem('orchestration') || '';
  environmentSelection: string[] = localStorage.getItem('environment') ? JSON.parse(localStorage.getItem('environment') || '') : [];
  securitySelection: string[] = localStorage.getItem('security') ? JSON.parse(localStorage.getItem('security') || '') : [];
  monitoringSelection: string = localStorage.getItem('monitoring') || '';
  additionalFeaturesSelection: string[] = localStorage.getItem('extra') ? JSON.parse(localStorage.getItem('extra') || '') : [];

  constructor() {
    const tiers = localStorage.getItem('tiers');
    if (tiers) {
      console.log(tiers);
      this.tierSelection = JSON.parse(tiers);
      console.log(this.tierSelection);
    }
    const environment = localStorage.getItem('environment');
    if (environment) {
      console.log(environment);
      this.environmentSelection = JSON.parse(environment);
      console.log(this.environmentSelection);
    }
    const security = localStorage.getItem('security');
    if (security) {
      console.log(security);
      this.securitySelection = JSON.parse(security);
      console.log(this.securitySelection);
    }
    const additionalFeatures = localStorage.getItem('extra');
    if (additionalFeatures) {
      this.additionalFeaturesSelection = JSON.parse(additionalFeatures);
    }
  }
}
