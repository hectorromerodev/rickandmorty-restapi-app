import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-up',
  template: `
    <figure *ngIf="showScrollBtn" class="scroll">
      <img (click)="onScrollUp()" src="assets/imgs/scroll_up.svg" alt="Scroll up" rel="preload" as="image" width="45" height="45">
    </figure>
  `,
  styleUrls: ['./scroll-up.component.scss']
})
export class ScrollUpComponent {
  @Input() showScrollBtn: boolean = false;
  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) { }

  onScrollUp(): void {
    this.doc.documentElement.scrollTop = 0;
  }
}
