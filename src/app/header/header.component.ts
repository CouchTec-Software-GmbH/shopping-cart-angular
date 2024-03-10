import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="p-3 ">
      <div class="container-fluid border-bottom">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
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

          <ul
            class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
          >
            <li>
              <a href="#" class="nav-link px-2 link-secondary">Overview</a>
            </li>
            <li>
              <a href="#" class="nav-link px-2 link-body-emphasis">Inventory</a>
            </li>
            <li>
              <a href="#" class="nav-link px-2 link-body-emphasis">Customers</a>
            </li>
            <li>
              <a href="#" class="nav-link px-2 link-body-emphasis">Products</a>
            </li>
          </ul>

          <form
            class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
            (submit)="$event.preventDefault()"
          >
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Search..."
              aria-label="Search"
              #searchInput
              (keyup.enter)="onSearch(searchInput.value)"
            />
          </form>

          <div class="text-end">
            <button type="button" class="btn btn-outline-primary me-2">
              Login
            </button>
            <button type="button" class="btn btn-primary">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
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
