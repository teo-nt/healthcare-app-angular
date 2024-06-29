import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AppointmentRequest } from '../interfaces/appointment-request';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  http = inject(HttpClient)

  bookAppointment(data: AppointmentRequest) {
    return this.http.post(`${API_URL}/appointment/book`, data)
  }
}
