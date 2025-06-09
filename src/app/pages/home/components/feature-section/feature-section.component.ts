import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-feature-section',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './feature-section.component.html',
})
export class FeatureSection {
  constructor(public navigationsService: NavigationService) {}
}
