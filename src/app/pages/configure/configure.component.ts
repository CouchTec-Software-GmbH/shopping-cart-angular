import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsComponent } from './components/steps/steps.component';
import { ProjectTypeComponent } from './components/project-type/project-type.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { DeploymentComponent } from './components/deployment/deployment.component';
import { SecurityComponent } from './components/security/security.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { ExtraComponent } from './components/extra/extra.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ProjectData } from '@app/models/project-data';
import { createDefaultProjectData } from '@app/utils/utils';
import { ProductService } from '@app/services/product.service';
import { ProjectOption } from '@app/models/project-option';
import { projectOptions } from '@app/data/project-options';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '@app/services/config.service';
import { Section } from '@app/models/section';
import { SectionComponent } from './components/section-new/section-component';


@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [CommonModule, StepsComponent, ProjectTypeComponent, TechStackComponent, DeploymentComponent,
  SecurityComponent, MonitoringComponent, ExtraComponent, SummaryComponent, SkeletonComponent, HeaderComponent, SectionComponent],
  templateUrl: './configure.component.html',
})
export class ConfigureComponent implements OnDestroy, OnInit {

  sections: Section[] = [];

  currentStep: number = 1;
  uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();

  projectData: ProjectData = createDefaultProjectData();

  projectTypeOptions: ProjectOption[] = projectOptions;
  productService = inject(ProductService);
  projectDataLoaded: boolean = false;
  authService = inject(AuthService);
  changeDetectorRef = inject(ChangeDetectorRef);

  constructor(private config_service: ConfigService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.config_service.getConfig().subscribe(config => {
      this.sections = this.config_service.getSections();
      console.log("Sections: ", this.sections);
      this.sections.forEach(key => {
          key.sub_sections.forEach(sub_section => {
            console.log(sub_section.sub_title);
          });
        });
      });

    if (!localStorage.getItem('uuid')) {
      this.router.navigate(['/'], { queryParams: { newProject: true }});
    }
    this.loadUuid();
    this.loadProjectData();

    window.addEventListener('storage', this.handleStorageChange);

  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChange);
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
