import { Component } from '@angular/core';
import { Character } from '@interfaces/character.interface';
import { DataService } from '@services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  characters$: Observable<Character[]> = this.dataServ.characters$;
  showScroll: boolean = false;
  private pageNum: number = 1;

  constructor(private dataServ: DataService) { }

  onScrollDown(): void {
    this.pageNum++;
    this.dataServ.getCharacters(this.pageNum);
  }
}
