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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { emailDomainValidator } from '@app/utils/utils';
import { BannerService } from '@app/services/banner.service';
import { RoutesEnum, routes } from '@app/data/routes';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-signup-email',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-email.component.html',
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
  isHideIcon = true;
  isHideIconVerify = true;

  showPassword: boolean = false;
  password: string = '';
  passwordVerify: string = '';
  showPasswordMismatchAlert: boolean = false;
  showPasswordLengthError: boolean = false;
  showInternalError: boolean = false;
  isLoading = false;

  constructor(
    public bannerService: BannerService,
    private navigationService: NavigationService,
  ) {}

  get email() {
    return this.signUpForm.get('email')!;
  }

  async submitForm() {
    this.isLoading = true;
    if (
      this.signUpForm.value.password !== this.signUpForm.value.verifyPassword
    ) {
      this.errorTitle = 'Passwörter stimmen nicht überein';
      this.errorMessage =
        'Bitte stellen Sie sicher, dass die Passwörter übereinstimmen.';
      this.status = 400;
      this.isLoading = false;
      this.submitted = true;
      return;
    }

    this.status = await this.authService.preRegister(
      this.signUpForm.value.email ?? '',
      this.signUpForm.value.password ?? '',
    );
    this.isLoading = false;
    this.submitted = true;
    if (this.status === 200) {
      this.navigationService.navigateToHome();
    } else if (this.status === 401) {
      this.errorTitle = 'Ungültiges Password';
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

  toggleHideIcon() {
    this.isHideIcon = !this.isHideIcon;
  }

  toggleHideIconVerify() {
    this.isHideIconVerify = !this.isHideIconVerify;
  }

  ngAfterViewInit() {
    document.addEventListener('click', () => {
      this.submitted = false;
    });
  }
}
