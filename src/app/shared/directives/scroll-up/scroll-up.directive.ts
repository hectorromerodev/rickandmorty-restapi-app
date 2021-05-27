import { DOCUMENT } from '@angular/common';
import { Directive, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[scrollUp]'
})
export class ScrollUpDirective implements OnDestroy {
  @Output() showBtn: EventEmitter<boolean> = new EventEmitter();
  private destroy = new Subject();
  private destroy$ = this.destroy.asObservable();
  private scrollHeight = 500;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.onWindowScroll())
      ).subscribe();
  }

  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showBtn.emit((yOffset || scrollTop) > this.scrollHeight);
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }
}
