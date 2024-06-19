import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response';
import { jwtDecode } from 'jwt-decode';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { Router } from '@angular/router';
import { RegisterPatient } from '../interfaces/register-patient';
import { RegisterDoctor } from '../interfaces/register-doctor';
import { UserDetails } from '../interfaces/user-details';
import { UserUpdate } from '../interfaces/user-update';

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

  registerPatient(data: RegisterPatient) {
    return this.http.post(`${API_URL}/user/register-patient`, data)
  }

  registerDoctor(data: RegisterDoctor) {
    return this.http.post(`${API_URL}/user/register-doctor`, data)
  }

  getUserDetails() {
    return this.http.get<UserDetails>(`${API_URL}/user/details/${this.user().nameid}`)
  }

  updateEmailAndPassword(data: UserUpdate) {
    return this.http.patch(`${API_URL}/user/update`, data)
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
