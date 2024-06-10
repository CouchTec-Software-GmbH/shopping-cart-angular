import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, ɵɵpureFunction7 } from '@angular/core';
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
import { HeaderComponent } from '@app/components/header/header.component';
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StepsComponent, ProjectTypeComponent, TechStackComponent, DeploymentComponent,
  SecurityComponent, MonitoringComponent, ExtraComponent, SummaryComponent, SkeletonComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy, OnInit {
  steps = stepsOptions;
  currentStep: number = 0;
  uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  projectData: ProjectData = createDefaultProjectData();
  productService = inject(ProductService);
  projectTypeOptions: ProjectOption[] = projectOptions;
  projectDataLoaded: boolean = false;
  authService = inject(AuthService);
  changeDetectorRef = inject(ChangeDetectorRef);

  async ngOnInit(): Promise<void> {
    this.loadUuid();
    this.loadProjectData();

    window.addEventListener('storage', this.handleStorageChange);
  }

  ngOnDestroy(): void {
  }

  handleStorageChange = (event: StorageEvent) => {
    if(event.key === 'uuid') {
      this.projectDataLoaded = false;
      this.uuid = localStorage.getItem('uuid') ?? "";
      if (!this.uuid) {
        this.loadUuid();
      }
      this.loadProjectData();
    }
  }

  async loadUuid(): Promise<void> {
    let uuid = localStorage.getItem('uuid');
    if (uuid) {
      this.uuid = uuid;
      return;
    }
    let uuids = await this.authService.getUuids();
    if (uuids.length > 0) {
      this.uuid = uuids[0];
      localStorage.setItem('uuid', this.uuid);
      return;
    }
    this.uuid = crypto.randomUUID();
  }

  async loadProjectData(): Promise<void> {
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

}
