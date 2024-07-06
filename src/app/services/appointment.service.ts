import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AppointmentResponse } from '../interfaces/appointment-response';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  http = inject(HttpClient)

  getAppointments() {
    return this.http.get<AppointmentResponse[]>(`${API_URL}/appointment/my-appointments`)
  }
}
