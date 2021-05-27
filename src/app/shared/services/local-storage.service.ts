import { Injectable } from '@angular/core';
import { Character } from '@interfaces/character.interface';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

const MY_FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private favoritesCharSubject = new BehaviorSubject<Character[]>([]);
  favCharacter$ = this.favoritesCharSubject.asObservable();
  constructor(
    private toastr: ToastrService
  ) {
    this.initStorage();
  }

  private initStorage(): void {
    const currents = localStorage.getItem(MY_FAVORITES);
    !currents && localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    this.getFavoritesChar();
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Error cleaning localstorage', error);
      this.toastr.error('Error cleaning favorites');

    }
  }

  getFavoritesChar(): any {
    try {
      const favoritesChar = JSON.parse(localStorage.getItem(MY_FAVORITES) ?? '')
      this.favoritesCharSubject.next(favoritesChar);
      return favoritesChar;
    } catch (error) {
      console.warn('Error getting favorites from localstorage', error);
      this.toastr.error('Error getting favorites');
    }
  }

  addOrRemoveFavorite(character: Character): void {
    const { id, name } = character;
    const currentFavs = this.getFavoritesChar();
    const found = !!currentFavs.find((fav: Character) => fav.id === id);
    found ? this.rempoveFromFavorite(id, name) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentFavs = this.getFavoritesChar();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentFavs, character]));
      this.favoritesCharSubject.next([...currentFavs, character]);
      this.toastr.success(`${character.name} added to favorites`);
    } catch (error) {
      console.warn('Error adding favorites to localstorage', error);
      this.toastr.error('Error adding favorites');
    }
  }

  private rempoveFromFavorite(id: number, name: string): void {
    try {
      const currentFavs = this.getFavoritesChar();
      const characters = currentFavs.filter((char: Character) => char.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.favoritesCharSubject.next([...characters]);
      this.toastr.warning(`${name} removed from favorites`);
    } catch (error) {
      console.warn('Error removing favorites from localstorage', error);
      this.toastr.error('Error removing character from favorites');
    }
  }

}
