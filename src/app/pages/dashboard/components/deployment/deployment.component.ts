import { Component, Input, OnDestroy, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { containerizationOptions, environmentOptions, orchestrationOptions, providerOptions } from '@app/data/deployment';
import { SectionComponent } from '../section/section-component';
import { ProjectData } from '@app/models/project-data';
import { createDefaultProjectData } from '@app/utils/utils';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-deployment',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Deployment
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the provider.
        </p>

        <app-section
          [path]="'deployment.provider'"
          [options]="provider"
          [projectData]="projectData"
          [buttonType]="'radio'">
          [uuid]="uuid"
          (projectDataChange)="changeProjectData($event)"
        </app-section>



      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the containerization.
      </p>
      <app-section
        [path]="'deployment.containerization'"
        [options]="containerization"
        [projectData]="projectData"
        [buttonType]="'radio'">
        [uuid]="uuid"
        (projectDataChange)="changeProjectData($event)"
      </app-section>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the orchestration.
      </p>
      <app-section
        [path]="'deployment.orchestration'"
        [options]="orchestration"
        [projectData]="projectData"
        [buttonType]="'radio'">
        [uuid]="uuid"
        (projectDataChange)="changeProjectData($event)"
      </app-section>

      <p class="mt-4 leading-relaxed text-gray-500">
        Choose the environment.
      </p>
      <app-section
        [path]="'deployment.environment'"
        [options]="environment"
        [projectData]="projectData"
        [buttonType]="'checkbox'">
        [uuid]="uuid"
        (projectDataChange)="changeProjectData($event)"
      </app-section>
  `,
})
export class DeploymentComponent implements OnDestroy {
  productService = inject(ProductService);
  @Input() projectData: ProjectData = createDefaultProjectData()
  @Input() uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  provider: ProjectOption[] = providerOptions;
  containerization: ProjectOption[] = containerizationOptions;
  orchestration: ProjectOption[] = orchestrationOptions;
  environment: ProjectOption[] = environmentOptions;

  ngOnDestroy() {
    this.productService.putProject(this.uuid, this.projectData);
  }

  changeProjectData(event: ProjectData) {
    this.projectData = event;
  }
}
