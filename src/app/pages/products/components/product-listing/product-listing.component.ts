import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../productListing';
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
    <a [routerLink]="['/details', product.id]">

    <img class="listing-photo" [src]="product.photo" alt="">
    <h2 class="listing-heading">{{ product.name }}</h2>
    <p class="listing-price">{{ product.price}}</p>
    <p class="learn-more">Learn More </p>
    </a>
  </section>
  `,
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent {
  @Input() product!: Product;
}
