import { Input, OnDestroy, inject, Directive } from '@angular/core';
import { ProjectOption } from '@models/project-option';
import { ProjectData } from '@app/models/project-data';
import { createDefaultProjectData } from '@app/utils/utils';
import { ProductService } from '@app/services/product.service';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  productService = inject(ProductService);
  @Input() projectData: ProjectData = createDefaultProjectData();
  @Input() uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  abstract options: ProjectOption[];

  changeProjectData(event: ProjectData) {
    this.projectData = event;
  }

  ngOnDestroy() {
    this.productService.putProject(this.uuid, this.projectData);
  }
}
