import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { RoutesEnum, routes } from '@app/data/routes';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-signin-email',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
  isHideIcon = true;
  isLoading = false;

  constructor(private navigationService: NavigationService) {}

  async submitForm() {
    this.isLoading = true;
    this.status = await this.authService.login(
      this.signInForm.value.email ?? '',
      this.signInForm.value.password ?? '',
    );
    this.isLoading = false;
    this.submitted = true;
    if (this.status === 200) {
      this.navigationService.navigateToHome();
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
