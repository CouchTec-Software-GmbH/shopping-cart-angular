import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/signin/signin.component';
import { SignInEmailComponent } from './components/signin-email/signin-email-component';
import { SignUpEmailComponent } from './components/signup-email/signup-email.component';
import { SignUpComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SignInComponent,
    SignUpComponent,
    SignInEmailComponent,
    SignUpEmailComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  template: `
    <div class="bg-gray-000">
      <div class="flex h-screen">
        <div
          class="w-full sm:w-1/2 bg-gray-800 text-white flex justify-center items-center p-10 sm:flex hidden"
        >
          <div>
            <h1 class="text-5xl font-bold mb-4">CouchTec</h1>
            <p class="text-xl">Kundenportal</p>
          </div>
        </div>

        <div class="sm:w-1/2 flex w-full justify-between">
          <div class="relative top-0 left-0 m-6">
            <a [hidden]="signup || signin" (click)="switchToSignIn()">
              <div class="hover:bg-gray-100 rounded-md">
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 1024 1024"
                  fill="#000000"
                  class="icon p-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                    fill=""
                  />
                </svg>
              </div>
            </a>
          </div>

          <div class="grid ">
            <div class="place-self-center ">
              <app-signin-email
                *ngIf="state === 'signin-email'"
                (signup)="switchToSignUp()"
                (resetPassword)="state = 'forgot-password'"
              ></app-signin-email>
              <app-signin
                *ngIf="state === 'signin'"
                (signinemail)="switchToSignInEmail()"
                (signup)="switchToSignUp()"
              ></app-signin>
              <app-signup-email
                *ngIf="state === 'signup-email'"
                (signin)="switchToSignIn()"
              ></app-signup-email>
              <app-signup
                *ngIf="state === 'signup'"
                (signin)="switchToSignIn()"
                (signupemail)="switchToSignUpEmail()"
              ></app-signup>
              <app-reset-password
                *ngIf="state === 'reset-password'"
                [code]="code"
              ></app-reset-password>
              <app-forgot-password
                *ngIf="state === 'forgot-password'"
              ></app-forgot-password>
            </div>
          </div>

          <a class="relative top-0 right-0 m-6" [routerLink]="['/']">
            <div class="hover:bg-gray-100 rounded-md">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="_x37_12-_close__x2C__cross__x2C__cancel__x2C_">
                  <g>
                    <line
                      style="fill:none;stroke:#000000;stroke-width:29.4167;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:2.6131;"
                      x1="736.21"
                      x2="276.739"
                      y1="326.814"
                      y2="786.139"
                    />
                    <line
                      style="fill:none;stroke:#000000;stroke-width:29.4167;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:2.6131;"
                      x1="736.21"
                      x2="276.739"
                      y1="786.139"
                      y2="326.814"
                    />
                  </g>
                </g>
                <g id="Layer_1" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
})
export class AuthComponent implements OnInit {
  state = 'signin';
  signup: boolean = false;
  signin: boolean = false;
  activate: string = '';
  code: string = '';
  router = inject(Router);
  authService = inject(AuthService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['code']) {
        this.state = 'reset-password';
        this.code = params['code'];
        this.signin = false;
        this.signup = false;
      } else if (params['activate']) {
        this.activate = params['activate'];
        this.router.navigate(['/'], { queryParams: { registerSuccess: true } });
        this.authService.register(this.activate);
      }
    });
  }

  switchToSignIn(): void {
    this.state = 'signin';
    this.signin = true;
    this.signup = false;
  }

  switchToSignUp(): void {
    this.state = 'signup';
    this.signup = true;
    this.signin = false;
  }

  switchToSignInEmail(): void {
    this.state = 'signin-email';
    this.signin = false;
    this.signup = false;
  }

  switchToSignUpEmail(): void {
    this.state = 'signup-email';
    this.signup = false;
    this.signin = false;
  }
}
