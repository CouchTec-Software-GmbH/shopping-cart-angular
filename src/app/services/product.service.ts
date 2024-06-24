import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectData } from '@models/project-data';
import { createDefaultProjectData, get_http_header, get_session_token_from_cookie } from '@utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // apiUrl = `https://couchtec.dev.linusweigand.com/api/`;
  apiUrl = `http://localhost/api/`;


  constructor(private http: HttpClient) {
  }

  async putProject(uuid: string, body: Record<string, any>): Promise<void> {
    try {
      let session_token = get_session_token_from_cookie();
      await firstValueFrom(this.http.put(`${this.apiUrl}${uuid}`, body, get_http_header(session_token ?? '')));
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
      let session_token = get_session_token_from_cookie();
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}${uuid}`, get_http_header(session_token ?? '')));
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

    } catch (error) {
    }
  }
}
