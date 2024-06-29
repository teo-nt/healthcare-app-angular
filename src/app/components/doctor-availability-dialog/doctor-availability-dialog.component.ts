import { DIALOG_DATA } from '@angular/cdk/dialog';
import { KeyValuePipe } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { groupBy } from 'lodash-es';
import { Timeslot } from 'src/app/interfaces/timeslot';
import { Doctor } from 'src/app/interfaces/user-details';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-availability-dialog',
  standalone: true,
  imports: [MatIconModule, KeyValuePipe],
  templateUrl: './doctor-availability-dialog.component.html',
  styleUrl: './doctor-availability-dialog.component.css'
})
export class DoctorAvailabilityDialogComponent implements OnInit {
  doctorService = inject(DoctorService)
  selectedDate = ''
  selectedTimeslot: number = 0
  timeslots: Timeslot[]
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
        console.log(this.groupedByDate)
      }
    )
  }
  
  close() {
    this.dialogRef.close()
  }

  selectDate(date: string) {
    this.selectedDate = this.selectedDate === date ? '' : date
  }

  selectTimeslot(id: number) {
    this.selectedTimeslot = id
  }

  onBook() {
    // doctorId
    // timeslotId
    // patientId
  }
}
