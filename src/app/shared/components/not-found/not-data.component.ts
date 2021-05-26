import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../interfaces/image.interface';

@Component({
  selector: 'app-not-data',
  templateUrl: './not-data.component.html',
  styleUrls: ['./not-data.component.scss']
})
export class NotDataComponent implements OnInit {
  @Input() title: string = '404';
  @Input() message: string = 'Oh no! You are lost.';
  @Input() img: Image = {
    height: 400,
    width: 600,
    src: 'assets/imgs/404.svg'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
