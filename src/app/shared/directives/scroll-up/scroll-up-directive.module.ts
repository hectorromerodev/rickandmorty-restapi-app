import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollUpDirective } from './scroll-up.directive';



@NgModule({
  declarations: [
    ScrollUpDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollUpDirective
  ]
})
export class ScrollUpDirectiveModule { }
