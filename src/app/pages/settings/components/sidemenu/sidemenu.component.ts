import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  template: `
<div class="flex h-screen flex-col justify-between border-e bg-white px-8">
  <div class="px-0 py-6">


    <ul class="mt-6 space-y-1">
      <li>
        <a
          (click)="onStateChange('general')"
          class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:cursor-pointer"

            [ngClass]="{ 'bg-gray-100': state === 'general' }"
        >
          General
        </a>
      </li>

      <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="text-sm font-medium"> Admin </span>

            <span class="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul class="mt-2 space-y-1 px-4">
            <li>
              <a
                (click)="onStateChange('user')"
            [ngClass]="{ 'bg-gray-100': state === 'user' }"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
              >
                Users
              </a>
            </li>

            <li>
              <a
                (click)="onStateChange('roles')"
            [ngClass]="{ 'bg-gray-100': state === 'roles' }"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
              >
                Roles
              </a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <a
          (click)="onStateChange('projects')"
            [ngClass]="{ 'bg-gray-100': state === 'projects' }"
          class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
        >
          Projects
        </a>
      </li>

      <li>
        <a
          (click)="onStateChange('account')"
            [ngClass]="{ 'bg-gray-100': state === 'account' }"
          class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
        >
          Account
        </a>
      </li>

    </ul>
  </div>

  <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">


      <div>
        <p class="text-xs">
          <strong class="block font-medium">{{ name }}</strong>

          <span> {{ email }} </span>
        </p>
      </div>
    </a>
  </div>
</div>
  `,
})
export class SideMenuComponent implements OnInit {
  email: string = "";
  name: string = "";
  @Input() state: string = "general";
  @Output() stateChange = new EventEmitter<string>();

  ngOnInit(): void {
      this.email = document.cookie.split(';').find(row => row.trim().startsWith('email'))?.split('=')[1].trim() ?? "";
      let name = this.email.split('@')[0];
      this.name = `${name.charAt(0).toUpperCase()}${name.substring(1, name.length)}`;
  }

  onStateChange(state: string) {
    this.stateChange.emit(state);
    this.state = state
  }

}
