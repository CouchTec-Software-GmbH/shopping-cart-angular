import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectData } from '@models/project-data';
import {
  createDefaultProjectData,
  get_basic_http_header,
  get_http_header,
  get_session_token_from_cookie,
} from '@utils/utils';
import { BannerService } from './banner.service';
import { BannerType } from '@app/types/BannerType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = `/api/`;

  constructor(
    private http: HttpClient,
    private bannerService: BannerService,
    private router: Router
  ) { }

  async putProject(uuid: string, body: Record<string, any>): Promise<void> {
    try {
      let session_token = get_session_token_from_cookie();
      await firstValueFrom(
        this.http.put(
          `${this.apiUrl}${uuid}`,
          body,
          get_http_header(session_token ?? ''),
        ),
      );
    } catch (error) {
      // if 404 put default project data
      if (error instanceof HttpErrorResponse && error.status === 404) {
        await this.putProject(uuid, createDefaultProjectData());
      }
    }
  }

  async getProject(uuid: string): Promise<ProjectData> {
    try {
      let session_token = get_session_token_from_cookie();
      const response = await firstValueFrom(
        this.http.get(
          `${this.apiUrl}${uuid}`,
          get_http_header(session_token ?? ''),
        ),
      );
      return { ...createDefaultProjectData(), ...response };
    } catch (error) {
      const doc = createDefaultProjectData();
      await this.putProject(uuid, doc);
      return doc;
    }
  }

  async submitApplication(
    name: string,
    email: string,
    text: string,
  ): Promise<any> {
    try {
      let body = { name: name, email: email, message: text };
      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}contact`, body, get_basic_http_header()),
      );
      console.log('Kontaktformular eingereicht.');
      this.bannerService.setBanner(BannerType.EmailSent);
      this.router.navigate(['/']);
      return response;
    } catch (error) {
      this.bannerService.setBanner(BannerType.InternalServerError);
      this.router.navigate(['/']);
    }
  }
}
