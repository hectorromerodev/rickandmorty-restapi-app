import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { DataService } from '@services/data.service';
import { Character } from '@interfaces/character.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-characters-details',
  template: `
    <section class="character__details">
      <app-characters-card *ngIf="character$ | async as character" [character]="character" [showFavoritebtn]="false" ></app-characters-card>
    </section>
  `,
  styles: [`
    .character__details{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `]
})
export class CharactersDetailsComponent {
  characterId!: any;
  character$!: Observable<Character>;
  constructor(
    private dataServ: DataService,
    private route: ActivatedRoute
  ) {
    this.route.params.pipe(
      take(1),
      tap(({ id }) => this.character$ = this.dataServ.getDetails(id))
    ).subscribe();
  }
}
