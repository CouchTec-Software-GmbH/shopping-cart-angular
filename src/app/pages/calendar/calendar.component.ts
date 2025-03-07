
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CalendarDay {
  dayNumber: number | null;
  isBookable: boolean;
  isSelected: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  // The calendar starts on the current system month/year
  month: number;
  year: number;

  // For highlighting "today"
  todayDay: number;
  todayMonth: number;
  todayYear: number;

  /**
   * Bookable dates map, keyed by "YYYY-MM-DD".
   * Each entry: date => array of time strings for that date.
   */
  bookableDatesMap: { [isoDate: string]: string[] } = {};

  // Which day/time are currently selected
  selectedDay: number | null = null;
  selectedTime: string | null = null;

  // Toggle between 12h and 24h
  timeFormat12 = false;

  // German month names
  monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  // Weekday labels (getDay() => 0: Sunday, 1: Monday, ...)
  weekdays = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'];

  constructor() {
    // Capture today's real date
    const now = new Date();
    this.month = now.getMonth();          // 0..11
    this.year = now.getFullYear();        // e.g. 2025
    this.todayDay = now.getDate();        // 1..31
    this.todayMonth = now.getMonth();     // 0..11
    this.todayYear = now.getFullYear();
  }

  ngOnInit() {
    // Dynamically generate exactly four future weekdays after "today"
    this.generateNextFourBookableDates();

    // Select the first bookable day in the initial month (if any)
    this.selectFirstBookableDay();
  }

  /**
   * Finds exactly four future weekdays (Mon=1, Tue=2, Thu=4, Fri=5)
   * starting tomorrow and stores them in bookableDatesMap with:
   *   1st day => ["16:00"]
   *   2nd day => ["16:30"]
   *   3rd day => ["16:00", "17:00"]
   *   4th day => ["16:00"]
   */
  private generateNextFourBookableDates(): void {
    // Clear any old data
    this.bookableDatesMap = {};

    const now = new Date();
    // Start from tomorrow
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // Allowed weekdays: Monday=1, Tuesday=2, Thursday=4, Friday=5
    const allowedWeekdays = [1, 2, 4, 5];
    const timeSlots = [
      ['16:00'],          // for the 1st bookable day
      ['16:30'],          // for the 2nd bookable day
      ['16:00', '17:00'], // for the 3rd bookable day
      ['16:00']           // for the 4th bookable day
    ];

    let found = 0;
    // Keep incrementing day until we've found 4 valid days
    while (found < 4) {
      const dayOfWeek = candidate.getDay(); // 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
      if (allowedWeekdays.includes(dayOfWeek)) {
        // Build "YYYY-MM-DD"
        const yyyy = candidate.getFullYear();
        const mm = String(candidate.getMonth() + 1).padStart(2, '0');
        const dd = String(candidate.getDate()).padStart(2, '0');
        const iso = `${yyyy}-${mm}-${dd}`;

        // Assign the time slots
        this.bookableDatesMap[iso] = timeSlots[found];
        found++;
      }
      // Move to next day
      candidate.setDate(candidate.getDate() + 1);
    }
  }

  /**
   * The calendar days for the current month/year, with placeholders for empty slots,
   * marking any date in `bookableDatesMap` as "isBookable".
   */
  get daysInCalendar(): CalendarDay[] {
    const days: CalendarDay[] = [];

    // 1) Empty slots before the 1st day
    const firstOfMonth = new Date(this.year, this.month, 1);
    const firstDayOfWeek = firstOfMonth.getDay(); // 0=Sun,1=Mon,2=Tue...
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({
        dayNumber: null,
        isBookable: false,
        isSelected: false,
        isToday: false
      });
    }

    // 2) Actual days in this month
    const lastOfMonth = new Date(this.year, this.month + 1, 0);
    const numDaysInMonth = lastOfMonth.getDate();

    for (let d = 1; d <= numDaysInMonth; d++) {
      const isSelected = d === this.selectedDay;
      const isToday = (
        d === this.todayDay &&
        this.month === this.todayMonth &&
        this.year === this.todayYear
      );

      // Build the "YYYY-MM-DD" key
      const isoDate = this.toIsoDate(this.year, this.month, d);
      // Bookable if we have any times in bookableDatesMap for that date
      const isBookable = !!this.bookableDatesMap[isoDate];

      days.push({
        dayNumber: d,
        isBookable,
        isSelected,
        isToday
      });
    }

    return days;
  }

  /**
   * When the user clicks on a day, if it's bookable, select it
   * and pick its first available time.
   */
  onDayClick(day: CalendarDay) {
    if (!day.dayNumber || !day.isBookable) return;

    this.selectedDay = day.dayNumber;

    // Retrieve times from the bookableDatesMap
    const isoDate = this.toIsoDate(this.year, this.month, day.dayNumber);
    const times = this.bookableDatesMap[isoDate] || [];
    this.selectedTime = times.length ? times[0] : null;
  }

  /** Return the weekday label (e.g. "Mo", "Di", etc.) for the currently selected day. */
  get selectedDayOfWeek(): string {
    if (!this.selectedDay) return '';
    const date = new Date(this.year, this.month, this.selectedDay);
    const weekdayIndex = date.getDay(); // 0=Sunday,...
    return this.weekdays[weekdayIndex];
  }

  /** User clicked a time button */
  onTimeClick(time: string) {
    this.selectedTime = time;
  }

  /** Convert a "16:00" string to 12h or 24h format. */
  formatTime(time: string): string {
    if (!this.timeFormat12) {
      // 24h format => just return
      return time;
    } else {
      // 12h format => "16:00" => "4:00 pm"
      const [hourStr, minStr] = time.split(':');
      const hour24 = parseInt(hourStr, 10);
      const suffix = hour24 >= 12 ? 'pm' : 'am';
      let hour12 = hour24 % 12;
      if (hour12 === 0) hour12 = 12;
      return `${hour12}:${minStr} ${suffix}`;
    }
  }

  // Previous month button
  prevMonth() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.selectFirstBookableDay();
  }

  // Next month button
  nextMonth() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.selectFirstBookableDay();
  }

  /** Pick the first bookable day (if any) in the current month, and choose its first time. */
  private selectFirstBookableDay(): void {
    const firstBookable = this.daysInCalendar.find(d => d.isBookable);
    if (firstBookable?.dayNumber) {
      this.selectedDay = firstBookable.dayNumber;

      const isoDate = this.toIsoDate(this.year, this.month, firstBookable.dayNumber);
      const times = this.bookableDatesMap[isoDate] || [];
      this.selectedTime = times.length ? times[0] : null;
    } else {
      // If no bookable day in this month, clear selection
      this.selectedDay = null;
      this.selectedTime = null;
    }
  }

  /** Helper to build a "YYYY-MM-DD" string from a year, zero-based month, and day. */
  private toIsoDate(year: number, month0: number, day: number): string {
    const mm = String(month0 + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }

  isDayBookable(dayNumber: number): boolean {
    const isoDate = this.toIsoDate(this.year, this.month, dayNumber);
    return !!this.bookableDatesMap[isoDate];
  }

  getTimesForDay(dayNumber: number): string[] {
    const isoDate = this.toIsoDate(this.year, this.month, dayNumber);
    return this.bookableDatesMap[isoDate] || [];
  }
}
