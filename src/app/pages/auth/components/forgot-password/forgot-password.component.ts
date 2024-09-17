import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html'
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
  router = inject(Router);

  submitForm() {
    this.submitted = true;
    this.authService.preReset(this.resetPasswordForm.value.email).then((status) => {
      this.status = status;
      if (status === 200) {
        this.router.navigate(['/'], { queryParams: { forgotPassword: true } });
      }
    });
  }



  ngAfterViewInit() {
    document.addEventListener('click', () => { this.submitted = false });
  }





}
