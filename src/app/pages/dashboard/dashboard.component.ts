import { Component, OnInit, inject } from '@angular/core';
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
import { ProjectData } from '@app/models/project-data';
import { createDefaultProjectData } from '@app/utils/utils';
import { ProductService } from '@app/services/product.service';
import { ProjectOption } from '@app/models/project-option';
import { projectOptions } from '@app/data/project-options';
import { SkeletonComponent } from './components/skeleton/skeleton.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StepsComponent, ProjectTypeComponent, TechStackComponent, DeploymentComponent,
  SecurityComponent, MonitoringComponent, ExtraComponent, SummaryComponent, SkeletonComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  steps = stepsOptions;
  currentStep: number = 0;
  uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  projectData: ProjectData = createDefaultProjectData();
  productService = inject(ProductService);
  projectTypeOptions: ProjectOption[] = projectOptions;
  projectDataLoaded: boolean = false;

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('uuid') === null) {
      localStorage.setItem('uuid', this.uuid);
    } else {
      this.uuid = localStorage.getItem('uuid') || crypto.randomUUID();
    }
    this.projectData = await this.productService.getProject(this.uuid);
    this.projectDataLoaded = true;
  }

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

  async loadProjectData(): Promise<void> {
    this.projectData = await this.productService.getProject(this.uuid);
  }
}
