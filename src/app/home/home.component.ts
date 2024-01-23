import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { Product } from '../productListing';
import { ProductService } from '../product.service';

import { NgcCookieConsentModule, NgcCookieConsentConfig, NgcCookieConsentService } from 'ngx-cookieconsent';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductListingComponent,
    NgcCookieConsentModule
],
  template: `
     <section>
      <form (submit)="$event.preventDefault()">
        <input type="text" placeholder="Filter by name" #filter (keyup.enter)="filterResults(filter.value)">
      <button class="primary" type="button" (click)="filterResults(filter.value)">
        <img class="search-logo" src="/assets/suche.svg" alt="Search" aria-hidden="true">
    </button>
    </form>
  </section>
  <section class="results">
    <app-product-listing
      *ngFor="let product of filteredProductList"
    [product]="product">
  </app-product-listing>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);
  filteredProductList: Product[] = [];

  private ccService: NgcCookieConsentService = inject(NgcCookieConsentService);

  constructor() {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList;
      this.filteredProductList = productList;
    });
  }

  ngOnInit() {
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredProductList = this.productList;
      return;
    }

    this.filteredProductList = this.productList.filter(
      product => product?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
