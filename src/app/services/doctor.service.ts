import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Timeslot } from '../interfaces/timeslot';
import { AvailabilityRequest } from '../interfaces/availability-request';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  http = inject(HttpClient)
  
  getTimeSlots() {
    return this.http.get<Timeslot[]>(`${API_URL}/doctor/timeslots`)
  }

  addAvailability(data: AvailabilityRequest) {
    return this.http.post(`${API_URL}/doctor/availability`, data)
  }
}
