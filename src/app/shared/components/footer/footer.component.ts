import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p>
        © 2021, created by
        <a rel="noopener" href="https://merakideveloper.com/" target="_blank" rel="noopener">Meraki Developer</a>.
      </p>
    </footer>
  `,
  styles: [`
    a{
      color: #f5f5f6
    }
  `]
})
export class FooterComponent { }
