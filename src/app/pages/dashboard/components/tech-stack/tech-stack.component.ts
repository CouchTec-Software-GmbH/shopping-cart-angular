import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioComponent } from '../radio/radio.component';
import { frontendFrameworks } from '@app/data/frontend-frameworks';
import { styling } from '@app/data/styling';
import { backend } from '@app/data/backend';
import { database } from '@app/data/database';
import { middlewares } from '@app/data/middleware';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, RadioComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Tech Stack
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the tech stack you want to use for your project.
        </p>

      <app-checkbox [options]="options" (selectionChange)="selectedOptions = $event"></app-checkbox>
  <div *ngIf="selectedOptions.includes('frontend')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Frontend
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the frontend framework you want to use for your project.
        </p>
      <app-radio [options]="frontendFrameworks" (selectionChange)="selectedFrontendFramework = $event"></app-radio>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the styling you want to use for your project.
        </p>

      <app-radio [options]="styling" (selectionChange)="selectedStyling = $event"></app-radio>
  </div>

  <div *ngIf="selectedOptions.includes('middleware')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Middleware
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the middleware you want to use for your project.
        </p>
      <app-radio [options]="middlewares" (selectionChange)="selectedMiddleware = $event"></app-radio>

  </div>

  <div *ngIf="selectedOptions.includes('backend')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Backend
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the backend language you want to use for your project.
        </p>
      <app-radio [options]="backend" (selectionChange)="selectedBackend = $event"></app-radio>

  </div>

  <div *ngIf="selectedOptions.includes('database')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Database
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the database you want to use for your project.
        </p>
      <app-radio [options]="database" (selectionChange)="selectedDatabase = $event"></app-radio>

  </div>

  `,
})
export class TechStackComponent {
  @Input() options: ProjectOption[] = [];
  frontendFrameworks: ProjectOption[] = frontendFrameworks;
  styling: ProjectOption[] = styling;
  backend: ProjectOption[] = backend;
  database: ProjectOption[] = database;
  middlewares: ProjectOption[] = middlewares;

  selectedOptions: string[] = [];
  selectedFrontendFramework: string = '';
  selectedStyling: string = '';
  selectedBackend: string = '';
  selectedDatabase: string = ''
  selectedMiddleware: string = '';

}
