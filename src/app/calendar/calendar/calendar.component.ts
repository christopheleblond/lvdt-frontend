import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarViewMode } from '../model/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  CalendarViewMode = CalendarViewMode;

  viewMode = CalendarViewMode.MONTH;

  currentDate = moment();

  constructor() { }

  ngOnInit(): void {
    
  }

}
