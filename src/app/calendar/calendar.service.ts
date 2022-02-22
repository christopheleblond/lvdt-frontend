import { Injectable } from '@angular/core';
import { CalendarViewMode, CalendarGridModel, CalendarGridCell } from './model/calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  buildModel(viewMode: CalendarViewMode): CalendarGridModel {

    return {
      headers: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      cells: new Array(30)
    } as CalendarGridModel;
  }
}
