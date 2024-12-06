import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mode } from '../price-quote.component';
import { AppTypeEnum } from '@app/types/AppType';

@Component({
  selector: 'configure-mode',
  standalone: true,
  imports: [],
  templateUrl: './configure-mode.component.html',
})
export class ConfigureMode {
  @Output() backToAppType = new EventEmitter();
  @Output() next = new EventEmitter<Mode>();
  @Input() appType = AppTypeEnum.UserFacing;
  Mode = Mode;
}
