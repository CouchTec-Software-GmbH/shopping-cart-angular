import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { headerOptions } from '@app/data/header';
import { HeaderOption } from '@app/models/header-option';
import { SearchService } from '@services/search.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <header class="bg-white">
      <div
        class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        <a class="block text-teal-600" [routerLink]="['/']">
          <span class="sr-only">Home</span>
          <img
            class="brand-logo h-8"
            src="/assets/logo-blue.svg"
            alt="logo"
            aria-hidden="true"
          />
        </a>
        <a
          [routerLink]="['/']"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
        </a>

        <div class="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">

              <li *ngFor="let option of headerOptions">
                <a
                 class="text-gray-500 transition hover:text-gray-500/75"
                  [routerLink]="[option.link]"
                >
                  {{ option.title }}
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <a
                class="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                href="login"
              >
                Login
              </a>

              <a
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:text-blue-600/75 sm:block"
                href="#"
              >
                Register
              </a>
            </div>

            <button
              class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span class="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>

    </header>


<span class="relative flex justify-center ">
  <div
    class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
  ></div>

  <span class="relative z-10 bg-white px-6"></span>
</span>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  headerOptions: HeaderOption[] = headerOptions;

  constructor(
    private router: Router,
    private searchService: SearchService,
  ) {
  }

  onSearch(value: string): void {
    this.searchService.search(value);
  }

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }
}
