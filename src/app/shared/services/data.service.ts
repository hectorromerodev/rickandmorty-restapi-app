import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@interfaces/character.interface';
import { Episode } from '@interfaces/episode.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environment/environment';
import { pluck, take, tap, withLatestFrom } from 'rxjs/operators'

const ENDPOINT: string = `${environment.BASE_URL}/`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getEpisodes();
    this.getCharacters();
  }

  getEpisodes(pageNum = 1) {
    const params = new HttpParams()
      .set('page', pageNum);
    this.http.get<any>(ENDPOINT.concat(environment.EPISODES), { params })
      .pipe(
        take(1),
        pluck('results'),
        withLatestFrom(this.episodes$),
        tap(([apiResponse, episodes]) => this.episodesSubject.next([...apiResponse, ...episodes]))
      ).subscribe();
  }

  getCharacters(pageNum = 1) {
    const params = new HttpParams()
      .set('page', pageNum);
    this.http.get<any>(ENDPOINT.concat(environment.CHARACTERS), { params })
      .pipe(
        take(1),
        pluck('results'),
        withLatestFrom(this.characters$),
        tap(([apiResponse, characters]) => this.charactersSubject.next([...apiResponse, ...characters]))
      ).subscribe();
  }


}
