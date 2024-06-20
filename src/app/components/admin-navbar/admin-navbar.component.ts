import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatMenuModule, MatIconModule, MatSnackBarModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  authService = inject(AuthService)
  matSnackBar = inject(MatSnackBar)
  
  logout() {
    this.authService.logout()
    this.matSnackBar.open('You are logged out', 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: "top"
    })
  }
}
