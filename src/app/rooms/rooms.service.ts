import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from './model/rooms';


export const MOCKED_DATA = {
  rooms: [
    { 
      id: 'odalisque',
      name: 'L\'odalisque',
      tableCount: 15
    } as Room,
    {
      id: 'maison-du-savoir',
      name: 'La maison du savoir',
      tableCount: 22
    } as Room
  ]
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private readonly http: HttpClient) { }

  findAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.BACKEND_API_BASE_URL}/rooms`);
  }

  saveRoom(room: Room) {
    this.http.post(`${environment.BACKEND_API_BASE_URL}/rooms/${room.id}`, room);
  }
}
