import { Component } from '@angular/core';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [],
  templateUrl: './mobile.component.html',
})
export class MobileSection {
  constructor(public navigationService: NavigationService) { }
}
