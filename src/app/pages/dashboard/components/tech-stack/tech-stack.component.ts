import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';
import { RadioComponent } from '@components/radio/radio.component';
import { tierOptions } from '@app/data/tier-options';
import { frontendFrameworkOptions } from '@app/data/frontend-frameworks';
import { stylingOptions } from '@app/data/styling';
import { middlewareOptions } from '@app/data/middleware';
import { backendOptions } from '@app/data/backend';
import { databaseOptions } from '@app/data/database';
import { ProjectData } from '@app/models/project-data';
import { ProductService } from '@app/services/product.service';
import { FrontendComponent } from './components/frontend-component';
import { createDefaultProjectData } from '@app/utils/utils';
import { SectionComponent } from '../section/section-component';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, RadioComponent, FrontendComponent, SectionComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Tech Stack
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the tech stack you want to use for your project.
        </p>

      <app-section
        [path]="'tierOptions'"
        [options]="tierOptions"
        [projectData]="projectData"
        [buttonType]="'checkbox'">
        [uuid]="uuid"
        (projectDataChange)="changeProjectData($event)"
      </app-section>
  <div *ngIf="includesTier('Frontend')">
      <h2 class="pt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
          Frontend
        </h2>
        <p class="pt-4 leading-relaxed text-gray-500">
          Choose the frontend framework you want to use for your project.
        </p>
    <app-section
      [path]="'techStack.frontend.framework'"
      [options]="frontendFrameworks"
      [projectData]="projectData"
      [buttonType]="'radio'">
      [uuid]="uuid"
      (projectDataChange)="changeProjectData($event)"
    </app-section>
      <h2 class="pt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Styling
        </h2>
        <p class="pt-4 leading-relaxed text-gray-500">
          Choose the styling you want to use for your project.
        </p>
        <app-section
          [path]="'techStack.frontend.styling'"
          [options]="styling"
          [projectData]="projectData"
          [buttonType]="'radio'">
          [uuid]="uuid"
          (projectDataChange)="changeProjectData($event)"
        </app-section>
  </div>

  <div *ngIf="includesTier('Middleware')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Middleware
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the middleware you want to use for your project.
        </p>
      <app-section
        [path]="'techStack.middleware'"
        [options]="middlewares"
        [projectData]="projectData"
        [buttonType]="'radio'">
        [uuid]="uuid"
        (projectDataChange)="changeProjectData($event)"
      </app-section>

  </div>

  <div *ngIf="includesTier('Backend')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Backend
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the backend language you want to use for your project.
        </p>
      <app-section
        [path]="'techStack.backend'"
        [options]="backend"
        [projectData]="projectData"
        [buttonType]="'radio'">
        [uuid]="uuid"
        (projectDataChange)="changeProjectData($event)"
      </app-section>
  </div>

  <div *ngIf="includesTier('Database')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Database
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the database you want to use for your project.
        </p>
      <app-section
        [path]="'techStack.database'"
        [options]="database"
        [projectData]="projectData"
        [buttonType]="'radio'">
        [uuid]="uuid"
        (projectDataChange)="changeProjectData($event)"
      </app-section>
  </div>

  `,
})
export class TechStackComponent implements OnDestroy {
  tierOptions: ProjectOption[] = tierOptions;
  frontendFrameworks: ProjectOption[] = frontendFrameworkOptions;
  styling: ProjectOption[] = stylingOptions;
  middlewares: ProjectOption[] = middlewareOptions;
  backend: ProjectOption[] = backendOptions;
  database: ProjectOption[] = databaseOptions;
  @Input() uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  @Input() projectData: ProjectData = createDefaultProjectData();
  productService = inject(ProductService);

  includesTier(tier: string): boolean {
    return this.projectData.tierOptions.includes(tier);
  }

  changeProjectData(event: any): void {
    this.projectData = event;
  }

  ngOnDestroy(): void {
    console.log("Tech Stack to put: ", this.projectData);
    this.productService.putProject(this.uuid, this.projectData);
  }
}
