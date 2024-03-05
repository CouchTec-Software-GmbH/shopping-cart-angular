import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { Product } from '../productListing';
import { ProductService } from '../product.service';

import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig,
  NgcCookieConsentService,
} from 'ngx-cookieconsent';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListingComponent, NgcCookieConsentModule],
  template: `
    <div class="row ps-2">
      <div class="col-auto">
        <div class="form-floating mb-3">
          <input
            class="form-control"
            id="floatingInput"
            type="text"
            placeholder="Search"
            #filter
            (keyup.enter)="filterResults(filter.value)"
          />
          <label for="floatingInput">Search</label>
        </div>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-secondary"
          type="button"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Search"
          (click)="filterResults(filter.value)"
        >
          <img
            class="search-logo"
            src="/assets/suche.svg"
            alt="Search"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <section class="results">
      <app-product-listing
        *ngFor="let product of filteredProductList"
        [product]="product"
      >
      </app-product-listing>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
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

  ngOnInit() { }

  filterResults(text: string) {
    if (!text) {
      this.filteredProductList = this.productList;
      return;
    }

    this.filteredProductList = this.productList.filter((product) =>
      product?.name.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
