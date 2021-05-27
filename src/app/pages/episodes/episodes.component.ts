import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Episode } from '@interfaces/episode.interface';
import { DataService } from '@services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodesComponent {
  episodes$: Observable<Episode[]> = this.dataServ.episodes$;
  showScroll: boolean = false;
  private pageNum = 1;

  constructor(private dataServ: DataService) { }

  onScrollDown(): void {
    this.pageNum++;
    this.dataServ.getEpisodes(this.pageNum);
  }
}
