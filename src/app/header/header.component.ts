import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
      <header class="brand-name">
      <a [routerLink]="['/']" data-bs-toggle="tooltip"  data-bs-html="true" title="Home">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </a>
      <button type="button" class="btn btn-secondary" (click)="onCartClick()">
        <img class="cart-icon" src="/assets/cart.png" alt="cart" aria-hidden="true">
      </button>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }

}
