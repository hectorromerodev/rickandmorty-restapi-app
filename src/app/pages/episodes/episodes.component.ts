import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Episode } from '@shared/interfaces/episode.interface';
import { DataService } from '@services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodes',
  template: `
    <h1 class="title">Episodes</h1>
    <section class="container" scrollUp (showBtn)="showScroll = $event">
      <ul class="episodes__list" *ngIf="episodes$ | async as episodes">
        <ng-container *ngIf="episodes.length; else noData">
          <li *ngFor="let episode of episodes">
            {{ episode.episode }} - {{ episode.name }}
          </li>
        </ng-container>
        <ng-template #noData>
          <app-not-data></app-not-data>
        </ng-template>
      </ul>
      <!-- SCROLL UP -->
      <app-scroll-up [showScrollBtn]="showScroll"></app-scroll-up>
    </section>
  `
})
export class EpisodesComponent {
  episodes$: Observable<Episode[]> = this.dataServ.episodes$;

  showScroll: boolean = false;
  private pageNum = 1;

  constructor(private dataServ: DataService) { }
}
