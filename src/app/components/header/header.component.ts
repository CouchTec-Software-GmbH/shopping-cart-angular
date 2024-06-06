import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { headerOptions } from '@app/data/header';
import { HeaderOption } from '@app/models/header-option';
import { SearchService } from '@services/search.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';


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
            <div class="sm:flex sm:gap-4 text-gray-500">



</div>

<div class="relative">
  <div class="inline-flex items-center overflow-hidden ">
    <button
  (click)="onAccountClick()"
  class="group inline-block rounded-full hover:bg-gray-100 transition-colors duration-200"
>
  <span
    class="block rounded-full bg-white px-3 py-3 text-sm group-hover:bg-transparent"
  >
    <div *ngIf="name === ''">
    <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 128 128" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g>
<path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z"/>
<path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z"/>
</g>
</svg>
</div>
  <p *ngIf="name !== ''" class="text-gray-500">{{ name }}</p>
  </span>
</button>
  </div>

  <div
    *ngIf="accountShow"
    class="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
    role="menu"
  >
  <div class="p-2" *ngIf="name !== ''">
     <button
          (click)="onSignOutClick()"
          class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          role="menuitem"
        >
          <svg
           fill="currentColor" width="20px" height="20px" viewBox="0 0 128 128" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          >

<g>
<path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z"/>
<path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z"/>
</g>

          </svg>

          Sign out
        </button>

  </div>
    <div class="p-2" *ngIf="name === ''">
        <button
          (click)="onSignInClick()"
          class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
          role="menuitem"
        >
          <svg
           fill="currentColor" width="20px" height="20px" viewBox="0 0 128 128" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          >

<g>
<path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z"/>
<path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z"/>
</g>

          </svg>

          Sign in
        </button>
    </div>
      </div>
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
export class HeaderComponent implements OnInit, OnDestroy {
  headerOptions: HeaderOption[] = headerOptions;
  accountShow = false;
  name = '';
  authService = inject(AuthService);
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private searchService: SearchService,
  ) {
  }

  ngOnInit(): void {
    this.updateEmailFromCookies();
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.updateEmailFromCookies();
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSearch(value: string): void {
    this.searchService.search(value);
  }

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }

  onAccountClick(): void {
    this.accountShow = !this.accountShow;
  }
  onSignInClick(): void {
    this.router.navigate(['/auth']);
    this.accountShow = false;
  }

  onSignOutClick(): void {
    this.authService.signOut();
    this.accountShow = false;
  }

  private updateEmailFromCookies() {
    if (document.cookie.includes('sessionToken') && document.cookie.includes('email')) {
      let email = (document.cookie.split('; ').find(row => row.startsWith('email')) ?? '').split('=')[1] ?? '';
      this.name = email.split('@')[0];
    } else {
      this.name = '';
    }
  }
}
