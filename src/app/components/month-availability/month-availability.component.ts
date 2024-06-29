import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-month-availability',
  standalone: true,
  imports: [],
  templateUrl: './month-availability.component.html',
  styleUrl: './month-availability.component.css'
})
export class MonthAvailabilityComponent implements OnInit {
  @Input() index: number;
  @Output() onClickingDate: EventEmitter<Date> = new EventEmitter<Date>();
  monthTable = [[]]
  currentMonth: string;
  currentMonthNumber: number;
  currentYear: number;

  monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  ngOnInit() {
    this.createMonthTable()
    this.getMonthName()
    this.currentMonthNumber = this.monthNames.indexOf(this.currentMonth)
    this.getYear()
  }

  /**
   * Get a month from current date by index. 
   * If index = 0, then current month is returned,
   * if index = 1, then next month is returned etc.
   *
   * @param index The index indicating the month from current month.
   * @returns The month from current month according to index.
   */
  getMonthName() {
    this.currentMonth = this.monthNames[(new Date().getMonth() + this.index) % 12]
  }

  getYear() {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + this.index)
    this.currentYear = currentDate.getFullYear()
  }

  getDaysOfMonth() {
    let now = new Date();
    
    // Get the current year and month
    let year = now.getFullYear();
    let month = now.getMonth();

    let nextMonth = new Date(year, month + 1 + this.index, 1);
    let currentMonth = nextMonth.setDate(0)
    return new Date(currentMonth).getDate()
  }

  createMonthTable() {
    const days = this.getDaysOfMonth()

    for (let i = 1; i <= days; i++) {
      this.monthTable[this.monthTable.length - 1].push(i)
      if (i % 7 === 0) {
        this.monthTable.push([])
      }
    }
  }

  onShowingDayTimeslots(day) {
    if (this.isPast(day)) return
    const date = new Date(this.currentYear, this.currentMonthNumber, day)
    this.onClickingDate.emit(date)
  }

  isPast(day: number) {
    const checkedDate = new Date(this.currentYear, this.currentMonthNumber, day + 1)
    if (checkedDate < new Date()) {
      return true;
    }
    return false
  }
}
