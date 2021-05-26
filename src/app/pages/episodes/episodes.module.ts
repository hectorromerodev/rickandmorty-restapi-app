import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesComponent } from './episodes.component';
import { NotDataModule } from '@app/shared/components/not-data/not-data.module';
import { scrollUpDirective } from '@app/shared/directives/scroll-up.directive';
import { ScrollUpModule } from '@app/shared/components/scroll-up/scroll-up.module';


@NgModule({
  declarations: [
    EpisodesComponent,
    scrollUpDirective
  ],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    NotDataModule,
    ScrollUpModule
  ]
})
export class EpisodesModule { }
