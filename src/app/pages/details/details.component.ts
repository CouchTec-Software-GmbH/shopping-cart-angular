import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../productListing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article>
    <img class="listing-photo" [src]="product?.photo"
      alt="Exterior photo of {{product?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{product?.name}}</h2>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this product</h2>
      <ul>
        <li>Units price: {{product?.price}}</li>
        <li>Description: {{product?.description}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Get in contact</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">

        <label for="text">Text</label>
        <input id="text" type="text" formControlName="text">

        <button type="submit" class="primary">Send</button>
      </form>
      <button type="button" class="primary" (click)="addToCart()">
        Add to cart
      </button>
    </section>
  </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
 route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  product: Product | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    text: new FormControl('')
  });
  constructor() {
    this.productService.getAllProducts().then(products => {
      const productId = parseInt(this.route.snapshot.params['id'], 10);
      if (productId >= 0 && productId < products.length) {
        this.product = products[productId];
      } else {
        console.error('Invalid product ID');
      }
    });
  }
  submitApplication() {
    this.productService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.text ?? ''
    );
  }

  addToCart() {
    if (!this.product) {
      console.error('No product to add');
      return;
    }
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.includes(this.product.id)) {
      console.log('Product is already in the cart');
      console.log(JSON.stringify(cart));
      return;
    }
    cart.push(this.product.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Product added to cart');
    console.log(JSON.stringify(cart));

    alert(`Product added to cart: ${this.product.name}`);
  }
}
