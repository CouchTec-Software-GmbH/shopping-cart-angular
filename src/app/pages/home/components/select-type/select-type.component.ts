import { Component } from '@angular/core';
import { AppTypeComponent } from '@app/components/appType/app-type.component';

@Component({
  selector: 'app-select-type',
  standalone: true,
  imports: [AppTypeComponent],
  templateUrl: './select-type.component.html',
})
export class SelectType { }
