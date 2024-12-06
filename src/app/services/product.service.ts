import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { get_basic_http_header } from '@utils/utils';
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
    private router: Router,
  ) {}

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
