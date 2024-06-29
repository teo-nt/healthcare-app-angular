import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DoctorRequest } from 'src/app/interfaces/doctor-request';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { Doctor } from 'src/app/interfaces/user-details';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patient-homepage',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './patient-homepage.component.html',
  styleUrl: './patient-homepage.component.css'
})
export class PatientHomepageComponent {
  doctorService = inject(DoctorService)
  authService = inject(AuthService)
  speciality: string;
  city: string;
  doctors: Doctor[] = []
  errorMessage: string

  searchDoctors() {
    const data = {speciality: this.speciality, city: this.city} as DoctorRequest
    this.doctorService.getDoctors(data).subscribe({
      next: (response) => {
        this.errorMessage = ''
        this.doctors = response
      },
      error: (err: HttpErrorResponse) => {
        this.doctors = []
        if (err.status === HttpStatusCode.Unauthorized) {
          this.authService.logout()
        }
        this.errorMessage = ((err.error) as ErrorResponse).message
      }
    })
  }

  onSeeAvailability(id: number) {
    
  }
}
