import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatMenuModule, MatIconModule, MatSnackBarModule],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css'
})
export class DoctorNavbarComponent {
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
