import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioComponent } from '../radio/radio.component';
import { frontendFrameworks } from '@app/data/frontend-frameworks';
import { styling } from '@app/data/styling';
import { backend } from '@app/data/backend';
import { database } from '@app/data/database';
import { middlewares } from '@app/data/middleware';
import { tierOptions } from '@app/data/tier-options';

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

      <app-checkbox [options]="tierOptions" (selectionChange)="handleTierSelection($event)"></app-checkbox>
  <div *ngIf="selectedTiers.includes('frontend')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Frontend
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the frontend framework you want to use for your project.
        </p>
      <app-radio [options]="frontendFrameworks" (selectionChange)="handleFrontendFrameworkSelection($event)"></app-radio>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the styling you want to use for your project.
        </p>

      <app-radio [options]="styling" (selectionChange)="handleStylingSelection($event)"></app-radio>
  </div>

  <div *ngIf="selectedTiers.includes('middleware')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Middleware
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the middleware you want to use for your project.
        </p>
      <app-radio [options]="middlewares" (selectionChange)="handleMiddlewareSelection($event)"></app-radio>

  </div>

  <div *ngIf="selectedTiers.includes('backend')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Backend
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the backend language you want to use for your project.
        </p>
      <app-radio [options]="backend" (selectionChange)="handleBackendSelection($event)"></app-radio>

  </div>

  <div *ngIf="selectedTiers.includes('database')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Database
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the database you want to use for your project.
        </p>
      <app-radio [options]="database" (selectionChange)="handleDatabaseSelection($event)"></app-radio>

  </div>

  `,
})
export class TechStackComponent {
  @Output() tierOutput = new EventEmitter<string[]>();
  @Output() frontendFrameworkOutput = new EventEmitter<string>();
  @Output() stylingOutput = new EventEmitter<string>();
  @Output() middlewareOutput = new EventEmitter<string>();
  @Output() backendOutput = new EventEmitter<string>();
  @Output() databaseOutput = new EventEmitter<string>();

  tierOptions: ProjectOption[] = tierOptions;
  frontendFrameworks: ProjectOption[] = frontendFrameworks;
  styling: ProjectOption[] = styling;
  middlewares: ProjectOption[] = middlewares;
  backend: ProjectOption[] = backend;
  database: ProjectOption[] = database;

  selectedTiers: string[] = [];
  selectedFrontendFramework: string = '';
  selectedStyling: string = '';
  selectedMiddleware: string = '';
  selectedBackend: string = '';
  selectedDatabase: string = ''

  handleTierSelection (selection: string[]): void {
    this.selectedTiers = selection;
    this.tierOutput.emit(selection);
  }

  handleFrontendFrameworkSelection (selection: string): void {
    this.selectedFrontendFramework = selection;
    this.frontendFrameworkOutput.emit(this.selectedFrontendFramework);
  }

  handleStylingSelection (selection: string): void {
    this.selectedStyling = selection;
    this.stylingOutput.emit(selection);
  }

  handleMiddlewareSelection (selection: string): void {
    this.selectedMiddleware = selection;
    this.middlewareOutput.emit(selection);
  }

  handleBackendSelection (selection: string): void {
    this.selectedBackend = selection;
    this.backendOutput.emit(selection);
  }

  handleDatabaseSelection (selection: string): void {
    this.selectedDatabase = selection;
    this.databaseOutput.emit(selection);
  }
}
