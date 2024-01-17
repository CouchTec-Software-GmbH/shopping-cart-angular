import { Injectable } from '@angular/core';
import { Product } from './productListing';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://couchdb-app-service.azurewebsites.net/products/';
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
          console.log("Attachment name: ",Object.keys(doc._attachments)[0]);
          console.log("Attachment url: ", photoUrl);
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
