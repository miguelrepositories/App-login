import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login';
import { LoginResult } from '../models/login-result';
import { map, windowTime } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = environment.path;

  constructor(private http: HttpClient) { }

  login(obj: Login):Observable<LoginResult> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<LoginResult>(url, obj).pipe(
      map((response: any) => {
        if(response && response.accessToken){
          window.localStorage.setItem('token', response.accessToken);
          return response;
        }
      }),
    );
  }

  logout(): boolean {
    window.localStorage.removeItem('token');
    window.localStorage.clear();
    let token = window.localStorage.getItem('token');
    if(!token){
      return true;
    } else {
      return false;
    }
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return decoded.exp; 
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
