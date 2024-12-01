import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './configure.component.html',
})
export class ConfigureSection {
  constructor(private router: Router) { }
  handleContactButton() {
    this.router.navigate(['kontakt']);
  }
}
