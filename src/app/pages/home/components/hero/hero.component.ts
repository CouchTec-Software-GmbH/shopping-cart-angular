import { Component } from '@angular/core';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  constructor(public navigationService: NavigationService) { }
}
