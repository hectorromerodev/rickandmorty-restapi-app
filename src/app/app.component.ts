import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-spinner></app-spinner>
    <app-header></app-header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class AppComponent { }
