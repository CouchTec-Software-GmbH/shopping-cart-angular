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
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements AfterViewInit {
  @Output() signup = new EventEmitter<boolean>();
  @ViewChild('alertMessage') alertMessage!: ElementRef;
  submitted = false;
  status = 0;
  errorTitle = '';
  errorMessage = '';
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  authService = inject(AuthService);
  isLoading = false;

  constructor(private navigationService: NavigationService) {}

  submitForm() {
    this.isLoading = true;
    this.submitted = true;
    this.authService
      .preReset(this.resetPasswordForm.value.email)
      .then((status) => {
        this.isLoading = false;
        this.status = status;
        if (status === 200) {
          this.navigationService.navigateToHome();
          return;
        }
        this.errorTitle = 'Irgendwas ist schief gelaufen';
        this.errorMessage = 'Bitte versuchen Sie es später erneut.';
      });
  }

  ngAfterViewInit() {
    document.addEventListener('click', () => {
      this.submitted = false;
    });
  }
}
