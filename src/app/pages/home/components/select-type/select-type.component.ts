import { Component } from '@angular/core';
import { AppType } from '@app/components/appType/app-type.component';

@Component({
  selector: 'app-select-type',
  standalone: true,
  imports: [AppType],
  templateUrl: './select-type.component.html',
})
export class SelectType { }
