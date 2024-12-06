import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  constructor(private router: Router) {}

  handleContactButton(): void {
    this.router.navigate(['/kontakt']);
  }
}
