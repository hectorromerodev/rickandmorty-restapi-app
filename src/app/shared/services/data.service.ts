import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, pluck, take, tap, throttleTime, withLatestFrom } from 'rxjs/operators'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Character } from '@interfaces/character.interface';
import { Episode } from '@interfaces/episode.interface';
import { environment } from '@environment/environment';
import { LocalStorageService } from './local-storage.service';

const ENDPOINT: string = `${environment.BASE_URL}/`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  private oneCharacterSubject = new BehaviorSubject<Character>({} as Character);
  oneCharacter$ = this.oneCharacterSubject.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private localServ: LocalStorageService
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
          this.parseCharactersData([...characters, ...responseApi]);
        }),
        throttleTime(1000),
        catchError(error => {
          return this.showToastr(error, 'No more characters to load');
        }),
      ).subscribe();
  }

  filterCharacters(valueToSearch: string): void {
    const params = new HttpParams().set('name', valueToSearch);
    this.http.get<any>(ENDPOINT.concat(environment.CHARACTERS), { params })
      .pipe(
        take(1),
        pluck('results'),
        tap((apiResponse) => this.parseCharactersData(apiResponse)),
        catchError(error => {
          console.warn(error.message);
          this.charactersSubject.next([]);
          return of(error);
        })
      ).subscribe();
  }

  getDetails(id: number): Observable<Character> {
    console.log(`${ENDPOINT}${environment.CHARACTERS}/${id}`)
    this.http.get<any>(`${ENDPOINT}${environment.CHARACTERS}/${id}`)
      .pipe(
        take(1),
        tap((character: Character) => this.oneCharacterSubject.next(character))
      ).subscribe();
    return this.oneCharacter$;
  }

  private parseCharactersData(characters: Character[]): void {
    const currentFavs: Character[] = this.localServ.getFavoritesChar();
    const newData = characters.map((character: Character) => {
      const found = !!currentFavs.find((fav: Character) => fav.id === character.id);
      return { ...character, isFavorite: found }
    });
    this.charactersSubject.next(newData);
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
