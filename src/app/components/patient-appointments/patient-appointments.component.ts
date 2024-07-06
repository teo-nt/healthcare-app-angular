import { Component, inject, OnInit } from '@angular/core';
import { AppointmentResponse } from 'src/app/interfaces/appointment-response';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit {
  appointmentService = inject(AppointmentService)
  appointments: AppointmentResponse[] = []
  
  ngOnInit() {
    this.appointmentService.getAppointments().subscribe((response) => {
      this.appointments = response
    })
  }
}
