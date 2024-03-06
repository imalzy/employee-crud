import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ilogin } from '../model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<Ilogin> {
    return this.httpClient.post<Ilogin>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token') || '';

    return token;
  }

  hasAccess(): boolean {
    if (!this.getToken()) {
      return false;
    }

    return true;
  }

  goLogin() {
    this.router.navigate(['auth/login'])
  }
}
