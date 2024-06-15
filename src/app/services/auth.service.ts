import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response';
import { jwtDecode } from 'jwt-decode';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  user = signal<LoggedInUser | null>(null)
  router = inject(Router)

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${API_URL}/user/login`, data)
  }

  logout() {
    localStorage.removeItem('auth_token')
    this.user.set(null)
    this.router.navigate(['welcome', 'login'])
  }

  getToken() {
    return localStorage.getItem('auth_token') || ''
  }

  isLoggedIn() {
    const token = this.getToken()
    if (!token) return false;

    if (this.isJwtExpired()){
      this.logout()
      return false
    }
    return true
  }

  isJwtExpired() {
    const token = this.getToken()
    if (!token) return true;

    const decodedToken = jwtDecode(token)
    return Date.now() >= decodedToken.exp * 1000
  }
}
