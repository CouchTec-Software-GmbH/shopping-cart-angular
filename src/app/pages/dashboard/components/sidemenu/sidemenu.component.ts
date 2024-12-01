import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div class="inline-flex size-16 items-center justify-center">
          <span
            class="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            {{ letter }}
          </span>
        </div>

        <div class="border-t border-gray-100">
          <div class="px-2">
            <div class="py-4">
              <div
                class="group relative flex justify-center rounded px-2 py-1.5"
                [ngClass]="{ 'bg-blue-50 text-blue-700': state === 'general' }"
                (click)="onStateChange('general')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span
                  class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Allgemein
                </span>
              </div>
            </div>

            <ul class="space-y-1 border-t border-gray-100 pt-4"></ul>
          </div>
        </div>
      </div>

      <div
        class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2"
      >
        <div>
          <button
            class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            (click)="onSignOut()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span
              class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
            >
              Ausloggen
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class SideMenuComponent implements OnInit {
  email: string = '';
  letter: string = '';
  authService = inject(AuthService);
  @Input() state: string = 'general';
  @Output() stateChange = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.email =
      document.cookie
        .split(';')
        .find((row) => row.trim().startsWith('email'))
        ?.split('=')[1]
        .trim() ?? '';
    let name = this.email.split('@')[0];
    this.letter = name.charAt(0).toUpperCase();
  }

  onStateChange(state: string) {
    this.stateChange.emit(state);
    this.state = state;
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
