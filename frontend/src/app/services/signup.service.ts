import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResult } from '../models/login-result';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseUrl: string = environment.path;

  constructor(private http: HttpClient) { }

  register(obj: Register):Observable<LoginResult> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<LoginResult>(url, obj);
  }
}
