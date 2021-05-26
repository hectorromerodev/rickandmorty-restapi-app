import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@interfaces/character.interface';
import { Episode } from '@interfaces/episode.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor() { }




}
