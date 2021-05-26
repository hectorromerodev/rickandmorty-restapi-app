import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NotDataComponent } from '@app/shared/components/not-data/not-data.component';
import { CharactersCardModule } from '../characters/characters-card/characters-card.module';
import { NotDataModule } from '@app/shared/components/not-data/not-data.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CharactersCardModule,
    NotDataModule
  ]
})
export class HomeModule { }
