import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  @Output() back = new EventEmitter();
  @Input() time: string | null = null;
  @Input() day: number | null = null;
  @Input() month: number | null = null;
  @Input() year: number | null = null;


  isLoading = false;
  submitted = false;
  contactForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });
  productService = inject(ProductService);

  async submitForm() {
    this.isLoading = true;

    console.log(this.time);
    console.log(this.day);
    console.log(this.month);
    console.log(this.year);
    await this.productService.submitApplication(
      this.contactForm.value.name ?? '',
      this.contactForm.value.email ?? '',
      this.contactForm.value.message ?? '',
      this.time ?? '',
      this.day ?? 0,
      this.month ?? 0,
      this.year ?? 0,
    );
    this.isLoading = false;
    this.submitted = true;
  }
}
