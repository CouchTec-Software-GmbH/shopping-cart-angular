import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
  ],
  template: `
  <main>
    <app-header></app-header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
})
export class AppComponent {
}
