import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../product-listing/product-listing.component';
import { Product } from '../productListing';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
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
export class HomeComponent {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);
  filteredProductList: Product[] = [];

  constructor() {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList;
      this.filteredProductList = productList;
    });
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
