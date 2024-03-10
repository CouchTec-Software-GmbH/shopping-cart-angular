import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { Product } from '../productListing';
import { ProductService } from '../product.service';

import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductListingComponent
],
  template: `
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
  private productList: Product[] = [];
  private productService: ProductService = inject(ProductService);
  filteredProductList: Product[] = [];
  searchSubscription: Subscription = new Subscription();


  constructor(private searchService: SearchService) {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList;
      this.filteredProductList = productList;
    });
  }

  ngOnInit() {
 this.searchSubscription = this.searchService.searchObservable.subscribe((query: string) => {
      this.filterResults(query);
    });
  }

  ngOnChanges() {
    this.searchSubscription = this.searchService.searchObservable.subscribe((query: string) => {
      this.filterResults(query);
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
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
