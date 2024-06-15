import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/interfaces/login-request';
import { jwtDecode } from 'jwt-decode';
import { LoggedInUser } from 'src/app/interfaces/logged-in-user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)
  hide = true;
  invalidLogin = false;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login() {
    this.authService.login(this.form.value as LoginRequest).subscribe({
      next: (response) => {
        const access_token = response.token;
        localStorage.setItem('auth_token', access_token)
        const decodedToken = jwtDecode(access_token) as unknown as LoggedInUser
        
        switch (decodedToken.role) {
          case 'Admin':
            this.router.navigate(['/admin-home'])
            break
          case 'Doctor':
            this.router.navigate(['/doctor-home'])
            break
          case 'Patient':
            this.router.navigate(['/home'])
            break
          default:
            
        }
      },
      error: (response) => {
        this.invalidLogin = true;
        this.form.reset()  
        setTimeout(() => this.resetError(), 3000)            
      }
    })
  }

  resetError() {
    this.invalidLogin = false
  }
}