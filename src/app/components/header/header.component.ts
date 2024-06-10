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


    <button *ngIf="name === ''"
  (click)="onAccountClick()"
  class="group inline-block rounded-full hover:bg-gray-100 transition-colors duration-200"
>
  <span
    class="block rounded-full bg-white px-3 py-3 text-sm group-hover:bg-transparent"
  >


    <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 128 128" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g>
<path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z"/>
<path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z"/>
</g>
</svg>
  </span>
</button>

<a *ngIf="name !== ''"
    class="block rounded-full bg-white px-3 py-3 text-sm group-hover:bg-transparent hover:underline hover:cursor-pointer"
    (click)="onAccountClick()"
>
  <span
    class="block rounded-full bg-white px-3 py-3 text-sm group-hover:bg-transparent"
  >
  <p class="text-gray-500">{{ name }}</p>
  </span>
</a>



  </div>

  <div
    *ngIf="accountShow"
    class="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
    role="menu"
  >



<div class="p-2">
<strong class="block p-2 text-xs font-medium uppercase text-gray-400"> Projects </strong>
      <a
        *ngFor="let uuid of uuids"
        class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
        (click)=onProjectClick(uuid)
        [ngClass]="{ 'font-bold': currentUuid === uuid}"
      >
        {{uuid}}
      </a>

          </div>
  <div class="p-2" *ngIf="name !== ''">

     <button
          (click)="onNewProjectClick()"
          class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
          role="menuitem"
        >
<svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
<rect x="0" fill="none" width="24" height="24"/>
<g>
<path d="M21 14v5c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h5v2H5v14h14v-5h2z"/>
<path d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4"/>
</g>
</svg>
          New Project
        </button>
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
  uuids: string[] = [];
  currentUuid: string = "";

  constructor(
    private router: Router,
    private searchService: SearchService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.updateEmailFromCookies();
    this.authSubscription = this.authService.isAuthenticated$.subscribe(async isAuthenticated => {
      this.updateEmailFromCookies();
      this.uuids = await this.authService.getUuids();
      if ( this.uuids.length > 0 ) {
        this.currentUuid = this.uuids[0];
      }
      console.log("Uuids:", this.uuids);
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onProjectClick(uuid: string): void {
    localStorage.setItem('uuid', uuid);
    this.currentUuid = uuid;

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'uuid',
      newValue: uuid
    }));

    this.router.navigate(['dashboard']);
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

  onNewProjectClick(): void {
    let new_uuid = crypto.randomUUID();
    this.uuids.push(new_uuid);
    this.authService.addUuid(new_uuid);
    this.onProjectClick(new_uuid);
  }

  private updateEmailFromCookies() {
    if (document.cookie.includes('sessionToken') && document.cookie.includes('email')) {
      let email = (document.cookie.split('; ').find(row => row.startsWith('email')) ?? '').split('=')[1] ?? '';
      this.name = email.split('@')[0];
      let len = this.name.length;
      this.name = `${this.name.charAt(0).toUpperCase()}${this.name.slice(1,len)}`
    } else {
      this.name = '';
    }
  }
}
