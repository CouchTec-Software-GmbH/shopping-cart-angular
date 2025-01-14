import { Component } from '@angular/core';
import { RoutesEnum, routes } from '@app/data/routes';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-stack-section',
  standalone: true,
  imports: [],
  templateUrl: './stack-section.component.html',
})
export class StackSection {
  constructor(public navigationService: NavigationService) { }
}
