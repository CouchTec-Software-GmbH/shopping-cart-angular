import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectData } from '@models/project-data';
import { get_http_header, get_session_token_from_cookie } from '@utils/utils';
import { ConfigService } from './config.service';

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
      // if 404 put default project data
      if (error instanceof HttpErrorResponse && error.status === 404) {
        await this.putProject(uuid, this.defaultProject);
      }
    }
  }

  async getProject(uuid: string): Promise<ProjectData> {
    try {
      let session_token = get_session_token_from_cookie();
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}${uuid}`, get_http_header(session_token ?? '')));
      return {...this.defaultProject, ...response};
    } catch (error) {
      const doc = this.defaultProject;
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
