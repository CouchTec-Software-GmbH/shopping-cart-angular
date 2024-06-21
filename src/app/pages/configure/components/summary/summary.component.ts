import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';
import { createDefaultProjectData } from '@app/utils/utils';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Summary
        </h1>
         <p class="mt-4 leading-relaxed text-gray-500">
            Project ID: {{ this.uuid }}
        </p>

        <div class="flow-root mt-4">
  <dl class="-my-3 divide-y divide-gray-100 text-sm">

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Project Type</dt>
      <dd class="text-gray-700 sm:col-span-2"> {{ projectData.projectType  }} </dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Tiers</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.tierOptions }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Frontend Framework</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.techStack.frontend.framework }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Styling</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.techStack.frontend.styling }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Middleware</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.techStack.middleware }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Backend</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.techStack.backend }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Database</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.techStack.database }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Provider</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.deployment.provider }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Containerization</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.deployment.containerization }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Orchestration</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.deployment.orchestration }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Environments</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.deployment.environment }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Security</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.security }}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Monitoring</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.monitoring }}</dd>
    </div>
    <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Additional Features</dt>
      <dd class="text-gray-700 sm:col-span-2">{{ projectData.extra }}</dd>
    </div>
  </dl>
</div>


  `,
})
export class SummaryComponent {
  @Input() uuid: string = localStorage.getItem('uuid') || '';
  @Input() projectData = createDefaultProjectData();
}
