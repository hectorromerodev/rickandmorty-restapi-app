import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesComponent } from './episodes.component';
import { NotDataModule } from '@components/not-data/not-data.module';
import { ScrollUpModule } from '@components/scroll-up/scroll-up.module';
import { ScrollUpDirectiveModule } from '@shared/directives/scroll-up/scroll-up-directive.module';


@NgModule({
  declarations: [
    EpisodesComponent,
  ],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    NotDataModule,
    ScrollUpModule,
    InfiniteScrollModule,
    ScrollUpDirectiveModule,
  ]
})
export class EpisodesModule { }
