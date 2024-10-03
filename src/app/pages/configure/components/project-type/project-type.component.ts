import { Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { RadioComponent } from '@components/radio/radio.component';
import { projectOptions } from '@app/data/project-options';
import { ProjectData } from '@app/models/project-data';
import { createDefaultProjectData } from '@app/utils/utils';
import { SectionComponent } from '../section/section-component';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-project-type',
  standalone: true,
  imports: [CommonModule, RadioComponent, SectionComponent, SectionComponent],
  template: `
  
        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Starten Sie Ihr Projekts zu konfigurieren
        </h1>
        <app-section
          [path]="'projectType'"
          [options]="options"
          [projectData]="projectData"
          [buttonType]="'radio'">
          [uuid]="uuid"
          (projectDataChange)="changeProjectData($event)"
        </app-section>
  `,
})
export class ProjectTypeComponent implements OnDestroy {
  options: ProjectOption[] = projectOptions;
  productService = inject(ProductService);
  @Input() projectData: ProjectData = createDefaultProjectData();
  @Input() uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();

  changeProjectData(event: ProjectData) {
    this.projectData = event;
  }

  ngOnDestroy() {
    this.productService.putProject(this.uuid, this.projectData);
  }
}
