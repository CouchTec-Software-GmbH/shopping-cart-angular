import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

      <sl-tooltip content="Shopping Cart">
        <sl-icon-button name="cart" label="Settings" (click)="onCartClick()">
        </sl-icon-button>
      </sl-tooltip>
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
