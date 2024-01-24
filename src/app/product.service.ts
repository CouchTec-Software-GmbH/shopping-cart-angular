import { Injectable } from '@angular/core';
import { Product } from './productListing';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://couchdb-app-service.azurewebsites.net/products/';
  apiUrl = `https://linusweigand.de/api/create-user`;
  private httpOptions: { headers: HttpHeaders };


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
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
      const response = await this.http.get<any>(`${this.url}_all_docs?include_docs=true`, this.httpOptions).toPromise();

      const productPromises = response.rows.map(async (row: any, index: number) => {
        const doc = row.doc;
        let photoUrl = null;
        if (doc._attachments) {
          photoUrl = await this.getAttachmentUrl(doc._id, Object.keys(doc._attachments)[0]);
        } else  {
          photoUrl = null;
        }
        return {
          id: index,
          name: doc.name,
          price: doc.price,
          photo: photoUrl,
          description: doc.description
        } as Product;
      });

      return await Promise.all(productPromises);
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  }
  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const response = await this.http.get<any>(`${this.url}${id}`, this.httpOptions).toPromise();

      if (!response) {
        return undefined;
      }

      let photoUrl: string| SafeUrl = '';
      if (response._attachments) {
        photoUrl = await this.getAttachmentUrl(response._id, Object.keys(response._attachments)[0]);
      }

      return {
        id: parseInt(id),
        name: response.name,
        price: response.price,
        photo: photoUrl,
        description: response.description
      } as Product;
    } catch (error) {
      console.error("Error fetching product by id: ", error);
      return undefined;
    }
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

      await this.http.post(this.apiUrl, userData, this.httpOptions).toPromise();
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  }

  async getAttachmentUrl(docId: string, attachmentName: string): Promise<SafeUrl> {
    try {
      const response = await this.http.get(`${this.url}${docId}/${attachmentName}`, {
        headers: this.httpOptions.headers,
        responseType: 'blob'
      }).toPromise();

      if (response) {
        const objectURL = URL.createObjectURL(response);
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
      } else {
        return '';
      }
    } catch (error) {
      console.error('Error fetching attachment: ', error);
      return '';
    }
  }
}
