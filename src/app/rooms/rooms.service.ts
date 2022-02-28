import { Injectable } from '@angular/core';
import { _MAT_HINT } from '@angular/material/form-field';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ElasticsearchService, ESHit } from '../shared/elasticsearch.service';
import { Room } from './model/rooms';


export const FIND_ALL_ROOMS_QUERY = {
  query: {
    match_all: {}
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomIndex = environment.ROOM_INDEX;

  constructor(private readonly es: ElasticsearchService) { }

  private roomMapper: (hit: ESHit<Room>) => Room = hit =>{
    return {
      id: hit._id,
      ...hit._source
    }
  }

  findAllRooms(): Observable<Room[]> {
    return this.es.search<Room>(this.roomIndex, FIND_ALL_ROOMS_QUERY)
    .pipe(map(resp => resp.hits.hits.map(this.roomMapper)));
  }

  findRoomById(roomId: string): Observable<Room> {
    return of({});
  }

  saveRoom(room: Room): Observable<Room> {
    return this.es.update(this.roomIndex, room.id, room).pipe(
      map(res => ({
        id: res._id,
        ...room
      }))
    );
  }

  removeRoom(room: Room): Observable<boolean> {
    if(room.id) {
      return this.es.delete(this.roomIndex, room.id);
    }else{
      return of(false);
    }
  }
}
