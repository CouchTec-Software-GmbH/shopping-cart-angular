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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
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
  router = inject(Router);
  isHideIcon = true;
  isHideIconVerify = true;

  private resetCode: string = "";
  private email: string = "";
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ){}

  async ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
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
    this.authService
      .reset(this.forgotPasswordForm.value.password)
      .then((status) => {
        this.isLoading = false;
        this.router.navigate(['/']);
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
