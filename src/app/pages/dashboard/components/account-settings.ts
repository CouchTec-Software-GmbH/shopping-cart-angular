import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SkeletonComponent } from '@app/pages/configure/components/skeleton/skeleton.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [RouterModule, CommonModule, SkeletonComponent],
  template: `
    <div class="p-20">
      <button
        class="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        (click)="show_confirm = true"
      >
        <span
          class="absolute inset-0 border border-red-600 group-active:border-red-500"
        ></span>
        <span
          class="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
        >
          Konto löschen
        </span>
      </button>
    </div>
    <div
      class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog "
      *ngIf="show_confirm"
    >
      <div
        class="relative px-4 min-h-screen md:flex md:items-center md:justify-center"
      >
        <div class=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div
          class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg"
        >
          <div class="md:flex items-center">
            <div
              class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto"
            >
              <i class="bx bx-error text-3xl"> &#9888; </i>
            </div>
            <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p class="font-bold">Warnung!</p>
              <p class="text-sm text-gray-700 mt-1">
                Durch das Löschen gehen alle Ihre Daten verloren. Diese Aktion
                kann nicht rückgängig gemacht werden.
              </p>
            </div>
          </div>
          <div class="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              id="confirm-delete-btn"
              class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              (click)="onDelete()"
            >
              Löschen
            </button>
            <button
              id="confirm-cancel-btn"
              class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
              (click)="show_confirm = false"
            >
              Abrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccountSettingsComponent {
  authService = inject(AuthService);
  show_confirm = false;

  constructor(private router: Router) {}

  async onDelete() {
    this.show_confirm = false;
    await this.authService.deleteAccount();
    this.authService.signOut();
    this.router.navigate(['/'], { queryParams: { deleteAccount: true } });
  }
}
