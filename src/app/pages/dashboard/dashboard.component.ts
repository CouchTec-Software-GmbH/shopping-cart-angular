import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsComponent } from './components/steps/steps.component';
import { ProjectTypeComponent } from './components/project-type/project-type.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { DeploymentComponent } from './components/deployment/deployment.component';
import { SecurityComponent } from './components/security/security.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { ExtraComponent } from './components/extra/extra.component';
import { SummaryComponent } from './components/summary/summary.component';
import { stepsOptions } from '@app/data/steps';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StepsComponent, ProjectTypeComponent, TechStackComponent, DeploymentComponent,
  SecurityComponent, MonitoringComponent, ExtraComponent, SummaryComponent],
  template: `
<section class="bg-white">
  <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
<div
  class="absolute inset-0 w-full bg-auto bg-top bg-repeat-y"
  style="background-image: url('https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')"
></div>

    </aside>

    <main
      class="flex justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >

      <div class="max-w-xl lg:max-w-3xl">
      <app-steps [steps]="steps" [currentStep]="currentStep" (stepChange)="currentStep = $event" ></app-steps>


        <app-project-type *ngIf="currentStep === 0" ></app-project-type>
        <app-tech-stack *ngIf="currentStep === 1" ></app-tech-stack>
        <app-deployment *ngIf="currentStep === 2" ></app-deployment>
        <app-security *ngIf="currentStep === 3" ></app-security>
        <app-monitoring  *ngIf="currentStep === 4" ></app-monitoring>
        <app-extra *ngIf="currentStep === 5" ></app-extra>
        <app-summary *ngIf="currentStep === 6" ></app-summary>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4 mt-5">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              (click)="handlePreviousStep()"
              *ngIf="currentStep > 0"
            >
              Previous
            </button>

            <button
              *ngIf="currentStep < 6"
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              (click)="handleNextStep()"
            >
              Next
            </button>
          </div>
      </div>
    </main>
  </div>
</section>
  `,
})
export class DashboardComponent {
  steps = stepsOptions;
  currentStep: number = 0;

  handleNextStep(): void {
    if (this.currentStep === 6) {
      return;
    }
    this.currentStep += 1;
  }
  handlePreviousStep(): void {
    if (this.currentStep === 0) {
      return;
    }
    this.currentStep -= 1;
  }
}
