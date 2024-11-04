import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-signin-email',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signin-email.component.html',
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
  isHideIcon = true;
  isLoading = false;

  async submitForm() {
    this.isLoading = true;
    this.status = await this.authService.login(
      this.signInForm.value.email ?? '',
      this.signInForm.value.password ?? '',
    );
    this.isLoading = false;
    this.submitted = true;
    console.log('Status: ', this.status);
    if (this.status === 200) {
      this.router.navigate(['/']);
    } else if (this.status === 403) {
      this.errorTitle = 'Ungültiges Passwort';
      this.errorMessage =
        'Falls Sie Ihr Passwort vergessen haben, versuchen Sie es zurückzusetzen';
    } else if (this.status === 404) {
      this.errorTitle = 'Ungültiger Nutzer und Passwort';
      this.errorMessage = '';
    } else {
      this.errorTitle = 'Irgendwas ist schief gelaufen';
      this.errorMessage = 'Bitte versuchen Sie es später erneut.';
    }
  }

  ngAfterViewInit() {
    document.addEventListener('click', () => {
      this.submitted = false;
    });
  }

  toggleHideIcon() {
    this.isHideIcon = !this.isHideIcon;
  }
}
