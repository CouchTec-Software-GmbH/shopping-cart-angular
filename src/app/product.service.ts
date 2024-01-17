import { Injectable } from '@angular/core';
import { Product } from './productListing';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://couchdb-app-service.azurewebsites.net/products/';


  constructor(private http: HttpClient) {
    const username = 'admin';
    const password = '8RzuxhQ7';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json'
      })
    };
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await this.http.get<any>(`${this.url}?include_docs=true`, this.httpOptions).toPromise();

      return response.rows.map((row: any, index: number) => {
        const doc = row.doc;
        return {
          id: index,
          name: doc.name,
          price: doc.price,
          photo: doc.photo,
          description: doc.description
        } as Product;
      }) ?? [];
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  }
  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json() ?? {};
    } catch (error) {
      console.error("Error fetching product by id: ", error);
      return undefined;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string, text: string) {
    console.log(`Product application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, text: ${text}.`);
  }
}
