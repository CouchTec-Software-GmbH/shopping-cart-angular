import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { get_http_header, get_session_token_from_cookie } from '@utils/utils';
import { ConfigService } from './config.service';
import { Section } from '@app/models/section';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = `/api/`;
  defaultProject: any = {};


  constructor(private configService: ConfigService, private http: HttpClient) {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    await this.configService.waitForConfig();
    this.defaultProject = this.configService.createDefaultProjectData();
  }

  async putProject(uuid: string, body: Record<string, any>): Promise<void> {
    try {
      let session_token = get_session_token_from_cookie();
      await firstValueFrom(this.http.put(`${this.apiUrl}${uuid}`, body, get_http_header(session_token ?? '')));
    } catch (error) {
      console.error("Error while putting project");
    }
  }

  async putSection(uuid: string, section: Section): Promise<void> {
    try {
      let session_token = get_session_token_from_cookie();
      await firstValueFrom(this.http.put(`${this.apiUrl}${uuid}`, section, get_http_header(session_token ?? '')));
    } catch (error) {
      console.error("Error while putting section: ", error);
    }

  }

  async getProject(uuid: string): Promise<any> {
    try {
      let session_token = get_session_token_from_cookie();
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}${uuid}`, get_http_header(session_token ?? '')));
      return {...this.defaultProject, ...response};
    } catch (error) {
      let doc = this.defaultProject;
      if (error instanceof HttpErrorResponse && error.status === 404) {
        await this.putProject(uuid, doc);
      }
      return doc;
    }
  }
}
