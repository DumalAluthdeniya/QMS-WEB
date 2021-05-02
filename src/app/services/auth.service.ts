import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44329/api';

  register(user) {
    return this.http.post(this.BaseURI + '/auth/register', user);
  }

  login(user) {
    return this.http.post(this.BaseURI + '/auth/login', user);
  }
}
