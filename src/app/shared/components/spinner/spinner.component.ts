import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading$ | async">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$: Subject<boolean> = this.spinnerServ.isLoading$;
  constructor(private spinnerServ: SpinnerService) { }
}
