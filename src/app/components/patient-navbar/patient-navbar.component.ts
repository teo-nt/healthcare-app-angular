import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'app-patient-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatMenuModule, MatIconModule, MatSnackBarModule],
  templateUrl: './patient-navbar.component.html',
  styleUrl: './patient-navbar.component.css'
})
export class PatientNavbarComponent {
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
