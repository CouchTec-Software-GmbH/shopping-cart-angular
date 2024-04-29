import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioComponent } from '../radio/radio.component';
import { tierOptions } from '@app/data/tier-options';
import { frontendFrameworkOptions } from '@app/data/frontend-frameworks';
import { stylingOptions } from '@app/data/styling';
import { middlewareOptions } from '@app/data/middleware';
import { backendOptions } from '@app/data/backend';
import { databaseOptions } from '@app/data/database';

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
  <div *ngIf="includesTier('frontend')">
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

  <div *ngIf="includesTier('middleware')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Middleware
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the middleware you want to use for your project.
        </p>
      <app-radio [options]="middlewares" (selectionChange)="handleMiddlewareSelection($event)"></app-radio>

  </div>

  <div *ngIf="includesTier('backend')">
      <h2 class="mt-6 text-l font-bold text-gray-900 sm:text-xl md:text-2xl">
        Backend
        </h2>
        <p class="mt-4 leading-relaxed text-gray-500">
          Choose the backend language you want to use for your project.
        </p>
      <app-radio [options]="backend" (selectionChange)="handleBackendSelection($event)"></app-radio>

  </div>

  <div *ngIf="includesTier('database')">
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
  tierOptions: ProjectOption[] = tierOptions;
  frontendFrameworks: ProjectOption[] = frontendFrameworkOptions;
  styling: ProjectOption[] = stylingOptions;
  middlewares: ProjectOption[] = middlewareOptions;
  backend: ProjectOption[] = backendOptions;
  database: ProjectOption[] = databaseOptions;

  constructor() {
    const tiers = localStorage.getItem('tiers');
    if (tiers) {
      this.tierOptions = this.tierOptions.map(option => {
        option.checked = JSON.parse(tiers).includes(option.id);
        return option;
      });
    } else {
      localStorage.setItem('tiers', JSON.stringify(this.tierOptions.filter(option => option.checked).map(option => option.id)));
    }
    const frontendFramework = localStorage.getItem('frontendFramework');
    if (frontendFramework) {
      this.frontendFrameworks = this.frontendFrameworks.map(option => {
        option.checked = option.id === frontendFramework;
        return option;
      });
    } else {
      localStorage.setItem('frontendFramework', this.frontendFrameworks.filter(option => option.checked).map(option => option.id)[0]);
    }
    const styling = localStorage.getItem('styling');
    if (styling) {
      this.styling = this.styling.map(option => {
        option.checked = option.id === styling;
        return option;
      });
    } else {
      localStorage.setItem('styling', this.styling.filter(option => option.checked).map(option => option.id)[0]);
    }
    const middleware = localStorage.getItem('middleware');
    if (middleware) {
      this.middlewares = this.middlewares.map(option => {
        option.checked = option.id === middleware;
        return option;
      });
    } else {
      localStorage.setItem('middleware', this.middlewares.filter(option => option.checked).map(option => option.id)[0] || '');
    }
    const backend = localStorage.getItem('backend');
    if (backend) {
      this.backend = this.backend.map(option => {
        option.checked = option.id === backend;
        return option;
      });
    } else {
      localStorage.setItem('backend', this.backend.filter(option => option.checked).map(option => option.id)[0]);
    }
    const database = localStorage.getItem('database');
    if (database) {
      this.database = this.database.map(option => {
        option.checked = option.id === database;
        return option;
      });
    } else {
      localStorage.setItem('database', this.database.filter(option => option.checked).map(option => option.id)[0]);
    }
  }

  includesTier (tier: string): boolean {
    const tiers = localStorage.getItem('tiers');
    if (tiers) {
      return JSON.parse(tiers).includes(tier);
    }
    return false;
  }


  handleTierSelection (selectionId: string[]): void {
    localStorage.setItem('tiers', JSON.stringify(selectionId));
  }

  handleFrontendFrameworkSelection (selection: string): void {
    localStorage.setItem('frontendFramework', selection);
  }

  handleStylingSelection (selection: string): void {
    localStorage.setItem('styling', selection); }

  handleMiddlewareSelection (selection: string): void {
    localStorage.setItem('middleware', selection);
  }

  handleBackendSelection (selection: string): void {
    localStorage.setItem('backend', selection);
  }

  handleDatabaseSelection (selection: string): void {
    localStorage.setItem('database', selection);
  }
}
