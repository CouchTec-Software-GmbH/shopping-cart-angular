import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@models/productListing';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
  <section class="listing">
    <a [routerLink]="['/configure', product.id]">

    <img class="listing-photo" [src]="product.photo" alt="">
    <h2 class="listing-heading">{{ product.name }}</h2>
    <p class="listing-price">{{product.price}}</p>
    <p class="learn-more">Configure</p>
    </a>
  </section>
  `,
  styleUrl: './cart-listing.component.css'
})
export class CartListingComponent {
  @Input() product!: Product;
}
