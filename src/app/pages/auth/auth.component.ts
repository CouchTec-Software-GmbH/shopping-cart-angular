import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/signin/signin.component';
import { SignUpEmailComponent } from './components/signup-email/signup-email.component';
import { SignUpComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthService } from '@app/services/auth.service';
import { SignInEmailComponent } from './components/signin-email/signin-email.component';

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
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  state = 'signin-email';
  signup: boolean = false;
  signin: boolean = false;
  activate: string = '';
  code: string = '';
  router = inject(Router);
  authService = inject(AuthService);

  constructor(private route: ActivatedRoute) { }

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

  handleResetPassword() {
    this.state = 'forgot-password';
  }
}
