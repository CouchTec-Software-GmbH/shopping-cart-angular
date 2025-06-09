import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-heymano',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './heymano.component.html',
})
export class HeyManoComponent {
  constructor(public navigationsService: NavigationService) {}
}
