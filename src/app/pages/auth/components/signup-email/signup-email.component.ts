import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { emailDomainValidator } from '@app/utils/utils';

@Component({
  selector: 'app-signup-email',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
            <form class="w-full max-w-xs" [formGroup]="signUpForm" (submit)="submitForm()">
                <div class="mb-4 text-center">
                    <h2 class="text-2xl font-bold text-gray-700">Sign up with email</h2>
                </div>
                <div class="">
                    <label class="block text-sm text-gray-600" for="email">Email </label>
                    <input class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none hover:border-gray-400 focus:border-blue-500"
                      id="email"
                      type="email"
                      formControlName="email"
                      required>
                </div>
  <div *ngIf="email.invalid && (email.dirty || email.touched)" class="text-red-500 text-sm mb-1">
          <div *ngIf="email.errors?.['required']">Email is required.</div>
          <div *ngIf="email.errors?.['invalidDomain']">Please enter a valid email address.</div>
        </div>
                <div class="my-4">
                    <label class="block text-sm text-gray-600" for="password">Password</label>
                    <input class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none hover:border-gray-400 focus:border-blue-500"
                      id="password"
                      type="password"
                      formControlName="password"
                      required>
                </div>
                <div class="mb-4">
                    <label class="block text-sm text-gray-600" for="password">Verify Password</label>
                    <input class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none hover:border-gray-400 focus:border-blue-500"
                      id="verifyPassword"
                      type="password"
                      formControlName="verifyPassword"
                      required>
                </div>

                <div class="mb-6">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                checked
                formControlName="marketing_accept"
                class="size-4 mr-2 rounded-md border-gray-200 bg-white shadow-sm"
              />
                    <label class="text-sm text-gray-600 " for="remember">Newsletter</label>
                </div>
                <div>
                    <button class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white" [disabled]="signUpForm.invalid">Create account</button>
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
                    <p class="hover:cursor-pointer text-sm">
        Already have an account?
      <a class="text-blue-600" (click)="signin.emit()">
            Sign in</a>
</p>

                </div>
            </form>
  `,
})
export class SignUpEmailComponent implements AfterViewInit {
  @Output() signin = new EventEmitter<boolean>();
 @ViewChild('alertMessage') alertMessage!: ElementRef;
  submitted = false;
  status = 0;
  errorTitle = '';
  errorMessage = '';
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, emailDomainValidator()]),
    password: new FormControl('', [Validators.required]),
    verifyPassword: new FormControl('', [Validators.required]),
    marketing_accept: new FormControl(true),
  });
  authService = inject(AuthService);
  router = inject(Router);
 get email() {
    return this.signUpForm.get('email')!;
  }


  async submitForm() {
    if (this.signUpForm.value.password !== this.signUpForm.value.verifyPassword) {
      this.errorTitle = 'Passwords do not match';
      this.errorMessage = 'Please make sure your passwords match.';
      this.status = 400;
      this.submitted = true;
      return;
    }

    this.status = await this.authService.preRegister(
      this.signUpForm.value.email ?? '',
      this.signUpForm.value.password ?? '',
      this.signUpForm.value.marketing_accept ?? false
    );
    console.log(this.status);
    this.submitted = true;
    if (this.status === 200) {
      this.router.navigate(['/'], { queryParams: { verifyEmail: true } });
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
