import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { LoggedInUser } from './interfaces/logged-in-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService)

  constructor() {
    const token = this.authService.getToken()  
    if (token && this.authService.isLoggedIn()) {
      const decodedToken = jwtDecode(token) as unknown as LoggedInUser
      this.authService.user.set({
        nameid: decodedToken.nameid,
        unique_name: decodedToken.unique_name,
        role: decodedToken.role,
        email: decodedToken.email
      })
    } else {
      this.authService.logout()
    }
  }
}
