import { CalendarGridComponent } from '../calendar-grid/calendar-grid.component';
export enum CalendarViewMode {
    MONTH,
    WEEK,
    DAY
}

export class Calendar {
}

export interface CalendarGridCell {
    
}

export interface CalendarGridModel {
    headers?: string[];
    cells?: CalendarGridCell[];
}