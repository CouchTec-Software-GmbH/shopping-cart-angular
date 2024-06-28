import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './project.service';
import { get_basic_http_header, get_email_from_cookie, get_http_header, get_session_token_from_cookie } from '@app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://couchdb-app-service.azurewebsites.net/products/';
  apiUrl = `/api/`;

  sessionToken: string = '';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasSessionToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private projectService: any;

  constructor(private http: HttpClient, private injector: Injector) {
  }

  async login(email: string, password: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}login`, { email, password }, get_basic_http_header()));
      this.sessionToken = response.toString().trim();
      this.setSessionCookie('sessionToken', this.sessionToken);
      this.setSessionCookie('email', email);
      this.isAuthenticatedSubject.next(true);
      return 200;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return 401;
      }
      if (error instanceof HttpErrorResponse) {
        return error.status;
      } else {
        return 500;
      }
    }
  }

  async preRegister(email: string, password: string, newsletter: boolean): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}pre-register`, { email, password, newsletter }, get_basic_http_header()));
      return 200;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        return 409;
      }
      if (error instanceof HttpErrorResponse) {
        return error.status;
      } else {
        return 500;
      }
    }
  }

  async register(uuid: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}register`, { uuid }, get_basic_http_header()));
      return 200;
    }catch (error) {
      if (error instanceof HttpErrorResponse) {
        return error.status;
      } else {
        return 500;
      }
    }
  }

  async preReset(email: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}pre-reset`, { email }, get_basic_http_header()));
      return 200;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return 404;
      }
      if (error instanceof HttpErrorResponse) {
        return error.status;
      } else {
        return 500;
      }
    }
  }

  async reset(uuid: string, password: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}reset`, { uuid, password }, get_basic_http_header()));
      return 200;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return 404;
      }
      if (error instanceof HttpErrorResponse) {
        return error.status;
      } else {
        return 500;
      }
    }
  }

  async addUuid(uuid: String): Promise<number> {
    try {
      let session_token = get_session_token_from_cookie();
      let email = get_email_from_cookie();
      if (!email && !session_token) {
        return 500;
      }
      const response = await firstValueFrom(this.http.post<any>(`${this.apiUrl}uuids/${email}`, { uuid }, get_http_header(session_token ?? '')));
      return response;
    } catch (error) {
      return 500;
    }
  }

  async remove_uuid(uuid: String): Promise<number> {
    try {
      let session_token = get_session_token_from_cookie();
      let email = get_email_from_cookie();
      if (!email && !session_token) {
        return 500;
      }
      const response = await firstValueFrom(this.http.delete<any>(`${this.apiUrl}uuids/${email}/${uuid}`, get_http_header(session_token ?? '')));
      return response;
    } catch (error) {
      return 500;
    }
  }

  async getUuids(): Promise<string[]> {
    try {
      let session_token = get_session_token_from_cookie();
      let email = get_email_from_cookie();
      if (!email && !session_token) {
        return [];
      }
      const response = await firstValueFrom(this.http.get<any>(`${this.apiUrl}uuids/${email}`, get_http_header(session_token ?? '')));
      return response;
    } catch (error) {
      return [];
    }
  }

  async deleteAccount(): Promise<number> {
    try {
      let session_token = get_session_token_from_cookie();
      let email = get_email_from_cookie();
      if (!email && session_token) {
        return 404;
      }
      const response = await firstValueFrom(this.http.delete<any>(`${this.apiUrl}user/${email}`, get_http_header(session_token ?? '')));
      return response;
    } catch (error) {
      return 500;
      }
  }

  private setSessionCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }

  signOut(): void {
    this.clearSessionCookies();
    this.isAuthenticatedSubject.next(false);
    if(!this.projectService) {

      this.projectService = this.injector.get(ProjectService);
    }
    this.projectService.clearUuids();
  }


  private clearSessionCookies() {
    this.deleteCookie('sessionToken');
    this.deleteCookie('email');
  }

  private deleteCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  }

  private hasSessionToken(): boolean {
    return document.cookie.includes('sessionToken');
  }
}
