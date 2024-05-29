import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@services/product.service';
import { Product } from '@models/productListing';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '@app/components/header/header.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    <article>
      <img class="listing-photo" [src]="product?.photo"
        alt="Exterior photo of {{product?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{product?.name}}</h2>
      </section>
      <section class="listing-features">
        <h3 class="section-heading">Configure product</h3>
        <ul>
          <li>TODO</li>
        </ul>
      </section>

      <button type="button" class="primary" (click)="removeFromCart()">
        Remove from cart
      </button>
    </article>
  `,
  styleUrl: './configure.component.css'
})
export class ConfigureComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  product: Product | undefined;
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

  removeFromCart() {
    if (!this.product) {
      console.error('No product to remove');
      return;
    }
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.indexOf(this.product.id);
    if (productIndex === -1) {
      console.log('Product is not in the cart');
      return;
    }
    cart.splice(productIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Product removed from cart: ${this.product.name}`);
    console.log('Product removed from cart');
  }
}
