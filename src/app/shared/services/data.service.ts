import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, pluck, take, tap, throttleTime, withLatestFrom } from 'rxjs/operators'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Character } from '@interfaces/character.interface';
import { Episode } from '@interfaces/episode.interface';
import { environment } from '@environment/environment';

const ENDPOINT: string = `${environment.BASE_URL}/`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.getEpisodes();
    this.getCharacters();
  }

  getEpisodes(pageNum = 1): void {
    const params = new HttpParams().set('page', pageNum);
    this.http.get<any>(ENDPOINT.concat(environment.EPISODES), { params })
      .pipe(
        take(1),
        pluck('results'),
        withLatestFrom(this.episodes$),
        tap(([responseApi, episodes]) => this.episodesSubject.next([...episodes, ...responseApi])),
        catchError(error => {
          return this.showToastr(error, 'No more episodes to load');
        })
      ).subscribe();
  }

  getCharacters(pageNum = 1): void {
    const params = new HttpParams().set('page', pageNum);
    this.http.get<any>(ENDPOINT.concat(environment.CHARACTERS), { params })
      .pipe(
        take(1),
        pluck('results'),
        withLatestFrom(this.characters$),
        tap(([responseApi, characters]) => {
          this.charactersSubject.next([...characters, ...responseApi]);
        }),
        throttleTime(1000),
        catchError(error => {
          return this.showToastr(error, 'No more characters to load');
        }),
      ).subscribe();
  }

  showToastr(error: any, message: string): Observable<any> {
    if (error.status === 404) {
      this.toastr.info(message);
    } else {
      console.log(error)
      this.toastr.error(error.message)
    }
    return of([]);
  }
}
