import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ElasticsearchService, ESHit } from '../shared/elasticsearch.service';
import { Play } from './play';

export const FIND_ALL_PLAYS_QUERY = {
  query: {
    match_all: {}
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlaysService {

  playIndex = environment.PLAY_INDEX;

  constructor(private readonly es: ElasticsearchService) { }

  private static rowMapper: (hit: ESHit<Play>) => Play = hit => {
    return {
      id: hit._id,
      ...hit._source
    }
  }

  findAllPlays(): Observable<Play[]> {
    return this.es.search<Play>(this.playIndex, FIND_ALL_PLAYS_QUERY).pipe(
      map(resp => resp.hits.hits.map(PlaysService.rowMapper))
    );
  }

  savePlay(play: Play): Observable<Play> {
    return this.es.update(this.playIndex, play.id, play).pipe(
      map(resp => ({ id: resp._id, ...play } as Play))
      )
  }

  deletePlay(play: Play): Observable<boolean> {
    if(play !== null && play.id !== undefined) {
      return this.es.delete(this.playIndex, play.id);
    }else{
      return of(false);
    }  
  }
}
