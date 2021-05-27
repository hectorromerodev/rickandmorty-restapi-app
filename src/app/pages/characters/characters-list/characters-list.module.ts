import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersListComponent } from './characters-list.component';
import { CharactersCardModule } from '@characters/characters-card/characters-card.module';
import { NotDataModule } from '@components/not-data/not-data.module';
import { SearchModule } from '@components/search/search.module';
import { ScrollUpModule } from '@components/scroll-up/scroll-up.module';
import { ScrollUpDirectiveModule } from '@shared/directives/scroll-up/scroll-up-directive.module';


@NgModule({
  declarations: [
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    CharactersListRoutingModule,
    CharactersCardModule,
    SearchModule,
    NotDataModule,
    ScrollUpModule,
    InfiniteScrollModule,
    ScrollUpDirectiveModule
  ]
})
export class CharactersListModule { }
