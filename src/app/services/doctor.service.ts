import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Timeslot } from '../interfaces/timeslot';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  http = inject(HttpClient)
  
  getTimeSlots() {
    return this.http.get<Timeslot[]>(`${API_URL}/doctor/timeslots`)
  }
}
