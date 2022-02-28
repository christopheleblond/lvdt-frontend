import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ESSearchResponse<T> {
  hits: {
    total: {
      value: number
    },
    hits: ESHit<T>[]
  }
}

export interface ESUpdateResponse {
  _id?: string;
  result?: string;
  _shards: {
    total?: number;
    successful?: number;
    failed?: number;
  }
}

export interface ESHit<T> {
  _id: string;
  _score: number;
  _source: T;
}

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  elasticsearchHost = environment.ELASTICSEARCH_HOST;

  constructor(private readonly http: HttpClient) { }

  private formatUrl(index: string): string {
    return `${this.elasticsearchHost}/${index}`;
  }

  search<T>(index: string, query: any): Observable<ESSearchResponse<T>> {
    return this.http.post<ESSearchResponse<T>>(`${this.formatUrl(index)}/_search`, query, { responseType: 'json' });
  }

  update<T>(index: string, id: string | undefined, data: T): Observable<ESUpdateResponse> {
    let url = `${this.formatUrl(index)}/_doc`;
    if(id != undefined) {
      // new doc
      url = `${this.formatUrl(index)}/_doc/${id}`;
    }
    return this.http.post<ESUpdateResponse>(url, data, { responseType: 'json', params: { 'refresh': 'true'}});
  }

  delete(index: string, id: string): Observable<boolean> {
    const url =  `${this.formatUrl(index)}/_doc/${id}`;
    return this.http.delete(url, { params: { 'refresh': 'true' }}).pipe(map(resp => !!resp));
  }
}
