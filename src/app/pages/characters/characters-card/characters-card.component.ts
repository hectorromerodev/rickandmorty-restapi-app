import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss']
})
export class CharactersCardComponent implements OnInit {
  @Input() character: any;
  constructor() { }

  ngOnInit(): void {
  }

}
