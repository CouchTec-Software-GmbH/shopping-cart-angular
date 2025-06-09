import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '@app/services/navigation.service';
import { HeaderComponent } from '../home/components/header/header.component';
import { FooterComponent } from '../home/components/footer/footer.component';

@Component({
  selector: 'app-heymano',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './heymano.component.html',
})
export class HeyManoComponent {
  constructor(public navigationsService: NavigationService) {}
}
