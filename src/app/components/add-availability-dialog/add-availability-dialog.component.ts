import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AvailabilityRequest } from 'src/app/interfaces/availability-request';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-add-availability-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './add-availability-dialog.component.html',
  styleUrl: './add-availability-dialog.component.css'
})
export class AddAvailabilityDialogComponent {
  doctorService = inject(DoctorService)
  date: Date
  startTime: Time
  endTime: Time
  availabilityRequest: AvailabilityRequest
  error = ''
  errors = []

  constructor(private dialogRef: MatDialogRef<AddAvailabilityDialogComponent>) {}

  onCancel() {
    this.dialogRef.close(false)
  }

  onConfirm() {
    if (!this.date || !this.startTime || !this.endTime) {
      this.error = "Provide valid date and times"
      return
    }
    this.availabilityRequest = {
      date: this.date,
      startTime: this.startTime + ':00',
      endTime: this.endTime + ':00'
    }

    this.doctorService.addAvailability(this.availabilityRequest).subscribe({
      next: (response) => {
        this.dialogRef.close(true)
      },
      error: (err: HttpErrorResponse) => {
        this.errors = []
        this.error = err.error.message
        for (const error in err.error.errors) {
          for (const errorItem of err.error.errors[error]) {
            this.errors.push(errorItem)
          }
        }
        if (Array.isArray(err.error)) {
          for (const error of err.error) {
            this.errors.push(error.message)
          }
        }      
      }
    })
  }
}
