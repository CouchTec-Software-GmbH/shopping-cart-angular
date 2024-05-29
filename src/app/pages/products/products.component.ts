import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from '@pages/products/components/product-listing/product-listing.component';
import { Product } from '@models/productListing';
import { ProductService } from '@services/product.service';
import { Subscription } from 'rxjs';
import { SearchService } from '@services/search.service';
import { HeaderComponent } from '@app/components/header/header.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductListingComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    <section class="results">
      <app-product-listing
        *ngFor="let product of filteredProductList"
        [product]="product"
      >
      </app-product-listing>
    </section>
  `,
  styleUrl: './products.component.css',
})

export class ProductsComponent implements OnInit{
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
