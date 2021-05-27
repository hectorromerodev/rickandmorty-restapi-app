import { Component } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-home',
  template: `
    <h1 class="title">My favorites characters</h1>
    <section *ngIf="charactersFav$ | async as characters" class="character__list">
      <ng-container *ngIf="characters.length; else noFavorites">
        <app-characters-card *ngFor="let character of characters" [character]="character"></app-characters-card>
      </ng-container>
      <ng-template #noFavorites>
        <app-not-data message="You don't have any added favorites yet"></app-not-data>
      </ng-template>
    </section>
  `,
  styles: [`
    .character__list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class HomeComponent {
  charactersFav$ = this.localServ.favCharacter$;
  constructor(private localServ: LocalStorageService) { }
}
