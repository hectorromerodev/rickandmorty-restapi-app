import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1 class="title">My favorites characters</h1>
    <section *ngIf="charactersFav$ | async as characters" class="character__list">
      <ng-container *ngIf="characters.length; else noFavorites">
        <app-characters-card *ngFor="let character of characters" [character]="character"></app-characters-card>
      </ng-container>
      <ng-template #noFavorites>
        <app-not-data title="" message="You don't have any favorites yet"></app-not-data>
      </ng-template>
    </section>
  `,
  styles: [`
    .character__list{
      display: flex;
      flex- wrap: wrap;
      justify- content: center;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
