import {  Component, Input, OnInit, inject } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-verified-email',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
            <div class="w-full max-w-xs">
                <div class="mb-4 text-center">
                    <h2 class="text-2xl font-bold text-gray-700">Email Verified</h2>
                </div>
            </div>
  `,
})
export class VerifiedEmailComponent implements OnInit {
  authService = inject(AuthService);
  @Input() code: string = "";

  ngOnInit(): void {
  }
}
