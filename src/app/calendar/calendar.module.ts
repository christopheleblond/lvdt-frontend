import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';



@NgModule({
  declarations: [
    CalendarComponent,
    CalendarGridComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
