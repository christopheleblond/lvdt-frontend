import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarViewMode, CalendarGridModel } from '../model/calendar';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  Object = Object;
  CalendarViewMode = CalendarViewMode;

  viewMode = CalendarViewMode.MONTH;

  gridModel: CalendarGridModel | null = null;

  currentDate = moment();

  constructor(private readonly calendarService: CalendarService) { }

  ngOnInit(): void {
    this.gridModel = this.calendarService.buildModel(this.viewMode);
  }

}
