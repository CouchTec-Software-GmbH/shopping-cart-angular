import { Component, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectData } from '@app/models/project-data';
import { ProjectOption } from '@app/models/project-option';
import { ProductService } from '@app/services/product.service';
import { createDefaultProjectData, setNestedValue, getNestedValue } from '@app/utils/utils';
import { RadioComponent } from '@components/radio/radio.component';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    CommonModule,
    RadioComponent,
    CheckboxComponent,
  ],
  template: `
  <main>
      <app-radio *ngIf="buttonType === 'radio'" [options]="options" (selectionChange)="changeSelection($event)"></app-radio>
      <app-checkbox *ngIf="buttonType === 'checkbox'" [options]="options" (selectionChange)="changeSelection($event)"></app-checkbox>
  </main>
  `,
})
export class SectionComponent implements OnInit {
  productService = inject(ProductService);
  @Input() options: ProjectOption[] = [];
  @Input() uuid: string = localStorage.getItem('uuid') || crypto.randomUUID();
  @Input() projectData: ProjectData = createDefaultProjectData();
  @Input() path: string = '';
  @Input() buttonType: 'radio' | 'checkbox' = 'radio';
  @Output() projectDataChange = new EventEmitter<ProjectData>();

  ngOnInit(): void {
    this.changeSelection(getNestedValue(this.projectData, this.path));
  }


  changeSelection(selectionId: string | string[]): void {
    setNestedValue(this.projectData, this.path, selectionId);
    if (this.buttonType === 'radio') {
      this.options = this.options.map(option => {
        option.checked = option.id === selectionId;
        return option;
      });
    } else if (this.buttonType === 'checkbox') {
      if(!Array.isArray(selectionId)) {
        selectionId = [selectionId];
      }
      this.options = this.options.map(option => {
        option.checked = selectionId.includes(option.id);
        return option;
      });
    }
    this.projectDataChange.emit(this.projectData);
  }
}
