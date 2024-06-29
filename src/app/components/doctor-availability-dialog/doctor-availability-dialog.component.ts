import { DIALOG_DATA } from '@angular/cdk/dialog';
import { KeyValuePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { groupBy } from 'lodash-es';
import { AppointmentRequest } from 'src/app/interfaces/appointment-request';
import { Timeslot } from 'src/app/interfaces/timeslot';
import { Doctor } from 'src/app/interfaces/user-details';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-availability-dialog',
  standalone: true,
  imports: [MatIconModule, KeyValuePipe],
  templateUrl: './doctor-availability-dialog.component.html',
  styleUrl: './doctor-availability-dialog.component.css'
})
export class DoctorAvailabilityDialogComponent implements OnInit {
  doctorService = inject(DoctorService)
  authService = inject(AuthService)
  patientService = inject(PatientService)
  matSnackBar = inject(MatSnackBar)
  selectedDate = ''
  selectedTimeslotId: number = 0
  selectedTimeslot: Timeslot
  timeslots: Timeslot[]
  confirmWindow = false
  groupedByDate: {   
      [key: string]: Timeslot[]
  } = {}

  constructor(private dialogRef: MatDialogRef<DoctorAvailabilityDialogComponent>,
    @Inject(DIALOG_DATA) public doctor: Doctor
  ) {}

  ngOnInit() {
    this.doctorService.getFutureAvailableTimeslots(this.doctor.id).subscribe(
      (response) => {
        this.timeslots = response
        this.groupedByDate = groupBy(this.timeslots, 'date')
      }
    )
  }
  
  close() {
    this.dialogRef.close()
  }

  selectDate(date: string) {
    this.selectedDate = this.selectedDate === date ? '' : date
    this.selectedTimeslot = null
    this.selectedTimeslotId = 0
  }

  selectTimeslot(timeslot: Timeslot) {
    this.selectedTimeslotId = timeslot.id
    this.selectedTimeslot = timeslot
  }

  onBook() {
    this.confirmWindow = true;
  }

  onCancel() {
    this.confirmWindow = false;
  }

  onConfirm() {
    const data = {
      patientUserId: this.authService.user().nameid,
      doctorId: this.doctor.id,
      timeslotId: this.selectedTimeslot.id
    } as AppointmentRequest
    this.patientService.bookAppointment(data).subscribe({
      next: (response) => {
        this.close()
        this.matSnackBar.open("Appointment is on wait to be approved by doctor", "OK", {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      },
      error: (err: HttpErrorResponse) => {
        this.close()
        this.matSnackBar.open("Error booking the appointment", "Close", {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      }
    })
  }
}
