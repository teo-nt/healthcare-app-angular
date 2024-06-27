import { Component, OnInit, inject } from '@angular/core';
import { MonthAvailabilityComponent } from '../month-availability/month-availability.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { Timeslot } from 'src/app/interfaces/timeslot';
import { MatDialog } from '@angular/material/dialog';
import { AddAvailabilityDialogComponent } from '../add-availability-dialog/add-availability-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [MonthAvailabilityComponent],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent implements OnInit {
  doctorService = inject(DoctorService)
  monthIndexes = [0, 1, 2]  // 0: currentMonth, 1: next month...
  timeslots: Timeslot[]
  shownTimeslots: Timeslot[] = []
  router = inject(Router)
  matSnackBar = inject(MatSnackBar)

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.doctorService.getTimeSlots().subscribe({
      next: (response) => {
        this.timeslots = response
      }
    })
  }
   
  showTimeslots(date: Date) {
    this.shownTimeslots = []
    for (const slot of this.timeslots) {
      let localDate = new Date(`${slot.date}T00:00:00`)
      if (localDate.getTime() === date.getTime()) {
        this.shownTimeslots.push(slot)
      }
    }
  }

  addAvailability() {
    const dialogRef = this.dialog.open(AddAvailabilityDialogComponent, {
      maxWidth: 320
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadComponent()
        this.matSnackBar.open('Availability was inserted successfully', 'OK', {
          duration: 3500,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      }
    })
  }

  private reloadComponent() {
    this.router.navigateByUrl('/doctor/account', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/doctor'])
    })
  }
}
