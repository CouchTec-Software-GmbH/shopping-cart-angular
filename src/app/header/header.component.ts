import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
          <a
            [routerLink]="['/']"
            class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img
              class="brand-logo"
              src="/assets/logo.svg"
              alt="logo"
              aria-hidden="true"
            />
          </a>


            <input
              type="text"
              #searchInput
              (keyup.enter)="onSearch(searchInput.value)"
            />
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private searchService: SearchService,
  ) { }

  onSearch(value: string): void {
    this.searchService.search(value);
  }

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }
}
