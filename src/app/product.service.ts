import { Injectable } from '@angular/core';
import { Product } from './productListing';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private productsUrl = 'https://couchtec.dev.linusweigand.de/api/products';
  // private createUserUrl = 'https://couchtec.dev.linusweigand.de/api/create-user';
  private url = 'http://localhost:80';
  private productsUrl = `${this.url}/api/products`;
  private createUserUrl = `${this.url}/api/create-user`;

  constructor(private http: HttpClient) {}

  // Fetch all products from the backend
  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.http.get<Product[]>(this.productsUrl).toPromise() || [];
      products.forEach(product => {
        product.photo = this.constructPhotoUrl(product.id);
      });
      return products;
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  }

  // Fetch a single product by ID from the backend
  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const product = await this.http.get<Product>(`${this.productsUrl}/${id}`).toPromise();
      if (product) {
        product.photo = this.constructPhotoUrl(product.id);
      }
      return product;
    } catch (error) {
      console.error("Error fetching product by id: ", error);
      return undefined;
    }
  }

  private constructPhotoUrl(productId: number): string {
    return `${this.productsUrl}/${productId}/image/image.jpg`;
  }

   async submitApplication(firstName: string, lastName: string, email: string, text: string): Promise<void> {
    try {
      const userData = {
        username: email,
        email: email,
        firstName: firstName,
        lastName: lastName,
        enabled: true
      };

      await this.http.post(this.createUserUrl, userData).toPromise();
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  }
}
