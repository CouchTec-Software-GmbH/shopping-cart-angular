import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SkeletonComponent } from '@app/pages/dashboard/components/skeleton/skeleton.component';
import { AuthService } from '@app/services/auth.service';
import { NotificationService } from '@app/services/notification.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [RouterModule, CommonModule, SkeletonComponent],
  template: `
    <div class="p-20">
      <a
        class="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        (click)="onDelete()"
      >
        <span
          class="absolute inset-0 border border-red-600 group-active:border-red-500"
        ></span>
        <span
          class="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
        >
          Konto löschen
        </span>
      </a>
    </div>
  `,
})
export class AccountSettingsComponent {
  authService = inject(AuthService);
  notificatonService = inject(NotificationService);

  constructor(private router: Router){}

  async onDelete() {
    await this.authService.deleteAccount();
    this.authService.signOut();
    this.router.navigate(['/']);
    this.notificatonService.showSuccess("Konto wurde erfolgreich gelöscht");
  }
}
