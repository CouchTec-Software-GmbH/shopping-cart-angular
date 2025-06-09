import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../home/components/footer/footer.component';
import { HeaderComponent } from '../home/components/header/header.component';
import { NavigationService } from '@app/services/navigation.service';
@Component({
    selector: 'app-bosch',
    standalone: true,
    imports: [CommonModule, FooterComponent, HeaderComponent],
    templateUrl: './bosch.component.html',
})
export class BoschComponent {
  constructor(public navigationsService: NavigationService) {}
}
