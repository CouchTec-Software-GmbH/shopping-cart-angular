import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contactOptions } from '@app/data/contact';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@app/services/product.service';
import { HeaderComponent } from '@app/components/header/header.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, RouterModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactOptions = contactOptions;
  submitted = false;
  contactForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });
  productService = inject(ProductService);

  constructor(private router: Router) { }

  submitForm() {
    this.productService.submitApplication(
      this.contactForm.value.name ?? '',
      this.contactForm.value.email ?? '',
      this.contactForm.value.message ?? '',
    );
    this.submitted = true;
  }
}
