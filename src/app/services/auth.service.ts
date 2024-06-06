import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://couchdb-app-service.azurewebsites.net/products/';
  // apiUrl = `https://couchtec.dev.linusweigand.com/api/`;
  apiUrl = `http://localhost/api/`;
  private httpOptions: { headers: HttpHeaders };
  sessionToken: string = '';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasSessionToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


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

  async signIn(email: string, password: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}signin`, { email, password }, this.httpOptions));
      this.sessionToken = response.toString().trim();
      console.log('Session token: ', this.sessionToken);
      this.setSessionCookie('sessionToken', this.sessionToken);
      this.setSessionCookie('email', email);
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

  async signUp(email: string, password: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}signup`, { email, password }, this.httpOptions));
      // this.sessionToken = response.toString().trim();
      // console.log('Session token: ', this.sessionToken);
      // this.setSessionCookie('sessionToken', this.sessionToken);
      // this.setSessionCookie('email', email);
      console.log('Response: ', response);
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

  async getUuids(): Promise<string[]> {
    try {
      let email = (document.cookie.split(';').find(row => row.startsWith('email')) ?? '').split('=')[1];
      const response = await firstValueFrom(this.http.get<any>(`${this.apiUrl}uuids`, this.httpOptions));
      return response.uuids;
    } catch (error) {
      console.error('Error getting uuids: ', error);
      return [];
    }
  }
  private setSessionCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }

  signOut(): void {
    this.clearSessionCookies();
    this.isAuthenticatedSubject.next(false);
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