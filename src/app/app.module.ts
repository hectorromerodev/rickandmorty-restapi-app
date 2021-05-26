import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotDataComponent } from './shared/components/not-found/not-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
    NotDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    NotDataComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
