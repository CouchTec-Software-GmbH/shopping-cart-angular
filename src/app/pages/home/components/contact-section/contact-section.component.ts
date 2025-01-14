import { Component } from '@angular/core';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [],
  templateUrl: './contact-section.component.html',
})
export class ContactSection {
  constructor(public navigationService: NavigationService) { }
}
