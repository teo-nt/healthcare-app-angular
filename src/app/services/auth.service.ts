import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  constructor() { }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${API_URL}/user/login`, data)
  }
}
