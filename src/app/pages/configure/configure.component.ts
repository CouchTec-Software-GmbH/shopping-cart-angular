import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
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
import { AuthService } from '@app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StepsComponent,
    ProjectTypeComponent,
    TechStackComponent,
    DeploymentComponent,
    SecurityComponent,
    MonitoringComponent,
    ExtraComponent,
    SummaryComponent,
    SkeletonComponent,
  ],
  templateUrl: './configure.component.html',
})
export class ConfigureComponent implements OnDestroy, OnInit {
  steps = stepsOptions;
  currentStep: number = 0;
  uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  projectData: ProjectData = createDefaultProjectData();
  productService = inject(ProductService);
  projectTypeOptions: ProjectOption[] = projectOptions;
  projectDataLoaded: boolean = false;
  authService = inject(AuthService);
  changeDetectorRef = inject(ChangeDetectorRef);

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    if (!localStorage.getItem('uuid')) {
      this.router.navigate(['/'], { queryParams: { newProject: true } });
    }
    this.loadUuid();
    this.loadProjectData();

    window.addEventListener('storage', this.handleStorageChange);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'uuid') {
      this.projectDataLoaded = false;
      this.uuid = localStorage.getItem('uuid') ?? '';
      if (!this.uuid) {
        this.loadUuid();
      }
      this.loadProjectData();
    }
  };

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
