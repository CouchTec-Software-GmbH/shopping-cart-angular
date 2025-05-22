import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DetailsComponent } from './components/details/details.component';

enum BookingState {
  Calendar,
  Details
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CalendarComponent,
    DetailsComponent,
  ],
  templateUrl: './booking.component.html',

})

export class BookingComponent {
  state = BookingState.Calendar;
  BookingState = BookingState;

  time = "";
  day: number | null = null;
  month: number | null = null;
  year: number | null = null;

  backToCalendar() {
    this.state = BookingState.Details;
  }

  selectTime(event: {time: string, day: number | null, month: number, year: number}) {
    this.time = event.time;
    this.day = event.day;
    this.month = event.month;
    this.year = event.year;

    console.log(event.time);
    this.state = BookingState.Details;
  }
}
