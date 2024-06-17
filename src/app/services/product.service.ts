import { Injectable } from '@angular/core';
import { Product } from '@models/productListing';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { ProjectData } from '@models/project-data';
import { createDefaultProjectData } from '@utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://couchdb-app-service.azurewebsites.net/products/';
  // apiUrl = `https://couchtec.dev.linusweigand.com/api/`;
  apiUrl = `http://localhost/api/`;
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

  async putProject(uuid: string, body: Record<string, any>): Promise<void> {
    try {
      await firstValueFrom(this.http.put(`${this.apiUrl}${uuid}`, body, this.httpOptions));
    } catch (error) {
      // if 404 put default project data
      if (error instanceof HttpErrorResponse && error.status === 404) {
        await this.putProject(uuid, createDefaultProjectData());
      }
      console.log('Uh oh', error);
      console.error('Error putting project: ', error);
    }
  }

  async getProject(uuid: string): Promise<ProjectData> {
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}${uuid}`, this.httpOptions));
      return {...createDefaultProjectData(), ...response};
    } catch (error) {
      console.log("No project with that uuid found");
      const doc = createDefaultProjectData();
      await this.putProject(uuid, doc);
      return doc;
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

      await firstValueFrom(this.http.post(`${this.apiUrl}/create-user`, userData, this.httpOptions));
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  }
}
