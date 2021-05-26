import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from '@components/spinner/spinner.module';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { SearchModule } from '@components/search/search.module';
import { ScrollUpModule } from './shared/components/scroll-up/scroll-up.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SpinnerModule,
    HeaderModule,
    FooterModule,
    SearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
