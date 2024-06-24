import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-signin-email',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
            <form class="w-full max-w-xs" [formGroup]="signInForm" (submit)="submitForm()">
                <div class="mb-4 text-center">
                    <h2 class="text-2xl font-bold text-gray-700">Mit Email anmelden </h2>
                </div>
                <div class="mb-4">
                    <label class="block text-sm text-gray-600" for="email">Email</label>
                    <input class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none hover:border-gray-400 focus:border-blue-500"
                      id="email"
                      type="email"
                      formControlName="email">
                </div>
                <div class="mb-4">
                    <label class="block text-sm text-gray-600" for="password">Password</label>
                    <input class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none hover:border-gray-400 focus:border-blue-500"
                      id="password"
                      type="password"
                      formControlName="password">
                    <a class="text-xs text-blue-600 hover:text-blue-700 hover:cursor-pointer " (click)="resetPassword.emit()">Ich habe mein Password vergessen.</a>
                </div>
                <div class="mb-6">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                class="size-4 mr-2 rounded-md border-gray-200 bg-white shadow-sm"
              />
                    <label class="text-sm text-gray-600 " for="remember">Erinnere mich.</label>
                </div>
                <div>
                    <button class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">Anmelden</button>
                </div>

        <div role="alert" class="rounded border-s-4 border-yellow-500 bg-yellow-50 p-4 my-5" *ngIf="submitted && status !== 200">
  <div class="flex items-center gap-2 text-yellow-600">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
      <path
        fill-rule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clip-rule="evenodd"
      />
    </svg>

    <strong class="block font-medium"> {{ errorTitle }} </strong>
  </div>

  <p class="mt-2 text-sm text-yellow-600">
{{ errorMessage }}
  </p>
</div>
               <hr class="my-6 border-gray-300 w-full">
                <div class="mt-4 text-center">
                    <p class="hover:cursor-pointer text-sm">Sie haben noch kein Konto? <a class="text-blue-600" (click)="signup.emit()" >Registrieren</a></p>
                </div>
            </form>
  `,
})
export class SignInEmailComponent implements AfterViewInit {
  @Output() signup = new EventEmitter<boolean>();
  @Output() resetPassword = new EventEmitter<boolean>();
  @ViewChild('alertMessage') alertMessage!: ElementRef;
  submitted = false;
  status = 0;
  errorTitle = '';
  errorMessage = '';
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  authService = inject(AuthService);
  router = inject(Router);


  async submitForm() {
    this.status = await this.authService.login(
      this.signInForm.value.email ?? '',
      this.signInForm.value.password ?? ''
    );
    this.submitted = true;
    if (this.status === 200) {
      this.router.navigate(['/']);
    } else
    if (this.status === 401) {
      this.errorTitle = 'Invalid password';
      this.errorMessage = 'If you\'ve forgot your password, try using the Log in with Google button';
    } else
    if (this.status === 404) {
      this.errorTitle = 'Invalid username or password';
      this.errorMessage = ''
    } else {
      this.errorTitle = 'Something went wrong';
      this.errorMessage = 'Please try again later.';
    }
  }

  ngAfterViewInit() {
    document.addEventListener('click', () => {this.submitted = false});
  }





}
