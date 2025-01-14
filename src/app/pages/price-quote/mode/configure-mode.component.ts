import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppTypeEnum } from '@app/types/AppType';

enum Mode {
  Manager,
  Expert,
}

@Component({
  selector: 'configure-mode',
  standalone: true,
  imports: [],
  templateUrl: './configure-mode.component.html',
})
export class ConfigureMode {
  @Output() backToAppType = new EventEmitter();
  @Output() next = new EventEmitter<Mode>();
  @Input() appType = AppTypeEnum.Website;
  Mode = Mode;
}
