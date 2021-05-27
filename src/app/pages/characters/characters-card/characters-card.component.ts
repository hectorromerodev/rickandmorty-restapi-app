import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character } from '@interfaces/character.interface';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styles: [`
    figure.card__favorite{
      background: transparent;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character!: Character;
  @Input() showFavoritebtn: boolean = true;
  constructor(private localServ: LocalStorageService) { }

  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }

  toggleFavorite(): void {
    const isFavorite = !!this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localServ.addOrRemoveFavorite(this.character);
  }
}
