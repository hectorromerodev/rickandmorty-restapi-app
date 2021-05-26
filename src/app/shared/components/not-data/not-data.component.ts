import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@interfaces/image.interface';

@Component({
  selector: 'app-not-data',
  template: `
    <section class="page__notFound">
        <h1>{{title}}</h1>
        <P>{{message}}</P>
        <img height="{{img.height}}" width="{{img.width}}" src="{{img.src}}" alt="404"  rel="preload" as="image"/>
    </section>
  `,
  styleUrls: ['./not-data.component.scss']
})
export class NotDataComponent implements OnInit {
  @Input() title: string = 'Not data found';
  @Input() message: string = 'Sorry, we can\'t find what you wanted to look for';
  @Input() img: Image = {
    height: 400,
    width: 600,
    src: 'assets/imgs/404.svg'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
