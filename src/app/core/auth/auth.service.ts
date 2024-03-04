import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  login(authenticate: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, authenticate);
  }
}
