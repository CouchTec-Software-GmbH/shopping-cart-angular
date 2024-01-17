import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterModule,
  ],
  template: `
  <main>
    <header class="brand-name">
      <a [routerLink]="['/']">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </a>
      <button class="cart-button" (click)="onCartClick()">
        <img class="cart-icon" src="/assets/cart.png" alt="cart" aria-hidden="true">
      </button>
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';

  constructor(private router: Router) {}

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }
}
