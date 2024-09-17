import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements AfterViewInit {
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
  authService = inject(AuthService);
  router = inject(Router);
  isHideIcon = true;
  isHideIconVerify = true;

  submitForm() {
    this.submitted = true;
    this.authService
      .reset(this.code, this.forgotPasswordForm.value.password)
      .then((status) => {
        this.status = status;
        if (status === 200) {
          this.router.navigate(['/'], { queryParams: { resetSuccess: true } });
        }
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
