import { Component, OnInit, inject } from '@angular/core';
import { MonthAvailabilityComponent } from '../month-availability/month-availability.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { Timeslot } from 'src/app/interfaces/timeslot';

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

  ngOnInit(): void {
    this.doctorService.getTimeSlots().subscribe({
      next: (response) => {
        this.timeslots = response
        console.log(this.timeslots)
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
}
