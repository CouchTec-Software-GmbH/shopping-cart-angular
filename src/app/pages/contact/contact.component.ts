import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { contactOptions } from '@app/data/contact';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@app/services/product.service';
import { HeaderComponent } from '@app/components/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  template: `
<app-header></app-header>
<section class="bg-gray-100">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div class="lg:col-span-2 lg:py-12">
        <p class="max-w-xl text-lg">
            {{ contactOptions.text }}
        </p>

        <div class="mt-8">
          <a href="#" class="text-2xl font-bold text-blue-600"> {{ contactOptions.number }}</a>

          <address class="mt-2 not-italic">{{ contactOptions.address }}</address>
        </div>
      </div>

      <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form class="space-y-4" [formGroup]="contactForm" (submit)="submitForm()" *ngIf="!submitted">
          <div>
            <label class="sr-only" for="name">Name</label>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
              formControlName="name"
            />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div>
              <label class="sr-only" for="email">Email</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
              formControlName="email"
              />
            </div>
          </div>


          <div>
            <label class="sr-only" for="message">Message</label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
              formControlName="message"
            ></textarea>
          </div>

          <div class="mt-4">
            <button
              type="submit"

                class="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Send Enquiry
            </button>
          </div>
        </form>
        <h2 *ngIf="submitted" class="text-2xl font-bold text-gray-600">Thank you for your enquiry!</h2>
        <p *ngIf="submitted" class="mt-4 text-gray-600">Please check your e-mail. </p>
      </div>
    </div>
  </div>
</section>
  `,
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


  submitForm() {
    this.productService.submitApplication(
      this.contactForm.value.name ?? '',
      this.contactForm.value.name ?? '',
      this.contactForm.value.email ?? '',
      this.contactForm.value.message ?? ''
    );
    this.submitted = true;
  }
}
