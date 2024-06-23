import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/interfaces/login-request';
import { jwtDecode } from 'jwt-decode';
import { LoggedInUser } from 'src/app/interfaces/logged-in-user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)
  hide = true;
  invalidLogin = false;
  loadingImage = false

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login() {
    this.loadingImage = true
    this.authService.login(this.form.value as LoginRequest).subscribe({
      next: (response) => {
        this.loadingImage = false
        const access_token = response.token;
        localStorage.setItem('auth_token', access_token)
        const decodedToken = jwtDecode(access_token) as unknown as LoggedInUser

        this.authService.user.set({
          nameid: decodedToken.nameid,
          unique_name: decodedToken.unique_name,
          role: decodedToken.role,
          email: decodedToken.email
        })
  
        switch (decodedToken.role) {
          case 'Admin':
            this.router.navigate(['/admin'])
            break
          case 'Doctor':
            this.router.navigate(['/doctor'])
            break
          case 'Patient':
            this.router.navigate(['/patient'])
            break
          default:
          
        }
      },
      error: (response: HttpErrorResponse) => {
        this.loadingImage = false
        if (response.status === HttpStatusCode.Locked) {
          this.router.navigate(['welcome', 'error'])
        }
        if ((response.error as ErrorResponse).message === 'This account is not activated yet') {
          this.router.navigate(['welcome', 'error'])
        }
        this.invalidLogin = true;
        this.form.reset()  
        setTimeout(() => this.resetError(), 3500)            
      }
    })
  }

  resetError() {
    this.invalidLogin = false
  }
}
