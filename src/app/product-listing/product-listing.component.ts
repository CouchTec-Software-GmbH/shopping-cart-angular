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
    <img class="listing-photo" [src]="product.photo" alt="Exterior photo of {{product.name}}">
    <h2 class="listing-heading">{{ product.name }}</h2>
    <p class="listing-price">{{ product.price}}</p>
    <a [routerLink]="['/details', product.id]">Learn More</a>
  </section>
  `,
  styleUrl: './product-listing.component.css'
})
export class HousingLocationComponent {
  @Input() product!: Product;
}
