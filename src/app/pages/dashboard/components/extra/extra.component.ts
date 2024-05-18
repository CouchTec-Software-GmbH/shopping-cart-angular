import { Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOption } from '@models/project-option';
import { extraOptions } from '@app/data/extra';
import { SectionComponent } from '../section/section-component';
import { ProjectData } from '@app/models/project-data';
import { createDefaultProjectData } from '@app/utils/utils';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-extra',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  template: `

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Additional Features
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Choose additional Features.
        </p>

    <app-section
      [path]="'extra'"
      [options]="options"
      [projectData]="projectData"
      [buttonType]="'checkbox'">
      [uuid]="uuid"
      (projectDataChange)="changeProjectData($event)"
    </app-section>
  `,
})
export class ExtraComponent implements OnDestroy {
  productService = inject(ProductService);
  @Input() projectData: ProjectData = createDefaultProjectData();
  @Input() uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  options: ProjectOption[] = extraOptions;

  changeProjectData(event: ProjectData) {
    this.projectData = event;
  }

  ngOnDestroy() {
    this.productService.putProject(this.uuid, this.projectData);
  }
}
