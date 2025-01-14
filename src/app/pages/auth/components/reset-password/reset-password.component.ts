import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { RoutesEnum, routes } from '@app/data/routes';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements AfterViewInit, OnInit {
  @Output() signup = new EventEmitter<boolean>();
  @ViewChild('alertMessage') alertMessage!: ElementRef;
  @Input() code: string = '';
  submitted = false;
  status = 0;
  errorTitle = '';
  errorMessage = '';
  forgotPasswordForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    verifyPassword: new FormControl(''),
  });
  isHideIcon = true;
  isHideIconVerify = true;

  private resetCode: string = '';
  private email: string = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private navigationService: NavigationService,
  ) { }

  async ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.resetCode = decodeURIComponent(params.get('c') || '');
      this.email = decodeURIComponent(params.get('e') || '');
    });

    if (this.email) {
      this.authService.setEmail(this.email);
    }
    if (this.resetCode) {
      this.authService.setResetCode(this.resetCode);
    }
  }

  submitForm() {
    this.isLoading = true;
    this.submitted = true;
    let password = this.forgotPasswordForm.get('password')?.value;
    let verifyPassword = this.forgotPasswordForm.get('verifyPassword')?.value;
    if (password !== verifyPassword) {
      console.log('Password: ', password);
      console.log('VerifyPassword: ', verifyPassword);
      this.errorTitle = 'Passwörter stimmen nicht überein';
      this.errorMessage =
        'Bitte stellen Sie sicher, dass die Passwörter übereinstimmen.';
      this.isLoading = false;
      return;
    }

    this.authService
      .reset(this.forgotPasswordForm.value.password)
      .then((status) => {
        this.isLoading = false;
        if (status === 502) {
          this.errorTitle = 'Irgendwas ist schief gelaufen';
          this.errorMessage = 'Bitte versuchen Sie es später erneut.';
          return;
        }
        this.navigationService.navigateToHome();
      });
  }
  ngAfterViewInit() {
    document.addEventListener('click', () => {
      this.submitted = false;
    });
  }

  toggleHideIcon() {
    this.isHideIcon = !this.isHideIcon;
  }

  toggleHideIconVerify() {
    this.isHideIconVerify = !this.isHideIconVerify;
  }
}
