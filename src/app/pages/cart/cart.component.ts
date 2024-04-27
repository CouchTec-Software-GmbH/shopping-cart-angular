import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListingComponent } from '../cart-listing/cart-listing.component';
import { Product } from '../productListing';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartListingComponent,
  ],
  template: `
    <h2>Your Cart</h2>
    <section class="cart">
      <div *ngIf="cartProducts.length === 0">Your cart is empty.</div>
      <app-product-listing
        *ngFor="let product of cartProducts"
        [product]="product">
      </app-product-listing>
    </section>
  `,
  styleUrl: './cart.component.css'
})

export class CartComponent {
  cartProducts: Product[] = [];
  productService: ProductService = inject(ProductService);

  constructor() {
    this.loadCartProducts();
  }

  async loadCartProducts() {
    const cartIds: string[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartProducts = [];

    for (const id of cartIds) {
      const product = await this.productService.getProductById(id);
      if (product) {
        this.cartProducts.push(product);
      }
    }
  }
}
