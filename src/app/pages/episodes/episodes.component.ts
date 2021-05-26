import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { Episode } from '@shared/interfaces/episode.interface';
import { DataService } from '@services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodes',
  template: `
    <h1 class="title">Episodes</h1>
    <section class="container">
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
      <figure *ngIf="showScrollBtn" class="scroll">
        <img (click)="onScrollUp()" src="assets/imgs/scroll_up.svg" alt="Scroll up" rel="preload" as="image" width="45" height="45">
      </figure>
    </section>
  `,
  styles: [`
    .scroll{
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 3;
      padding: 1rem;
      border-radius: 50%;
      font-size: 1.5rem;
      height: 45px;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        cursor:pointer;
        transform: scale(1.2);
        background-color: #f1f1f154;
        transition: all .6s ease-in-out;
      }
    }
  `]
})
export class EpisodesComponent {
  episodes$: Observable<Episode[]> = this.dataServ.episodes$;

  showScrollBtn: boolean = false;
  private scrollHeight = 500;
  private pageNum = 1;

  constructor(
    private dataServ: DataService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showScrollBtn = (yOffset || scrollTop) > this.scrollHeight;
  }

  onScrollUp(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    this.pageNum++;
    this.dataServ.getEpisodes(this.pageNum);
  }
}
