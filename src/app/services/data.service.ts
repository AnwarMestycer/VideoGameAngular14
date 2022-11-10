import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../models/game.model';
const BASE_API = environment.url;
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${BASE_API}/games`, {
      params: params,
    });
  }
  getGameDetails(id: number): Observable<Game> {
    const gameInfoRequest = this.http.get<Game>(`${BASE_API}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${BASE_API}/games/${id}/movies`);
    const gameScreenshotRequest = this.http.get(
      `${BASE_API}/games/${id}/screenshots`
    );
    return forkJoin({
gameInfoRequest,
gameTrailersRequest,
gameScreenshotRequest
    }).pipe(
        map((resp: any )=> {
      return {
                ...resp['gameInfoRequest'],
                screenshots: resp['gameScreenshotRequest']?.results,
                trailers:resp['gameTrailersRequest']?.results, 
            }
      })
      );
  
}
}
