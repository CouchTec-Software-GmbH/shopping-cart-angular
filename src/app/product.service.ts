import { Injectable } from '@angular/core';
import { Product } from './productListing';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:3000/products';
  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string, text: string) {
    console.log(`Product application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, text: ${text}.`);
  }
  constructor() { }
}
