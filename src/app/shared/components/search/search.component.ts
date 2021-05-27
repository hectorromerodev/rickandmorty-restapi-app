import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { DataService } from '@services/data.service';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <section class="search__container">
      <div class="search__name">
        <label for="searchName">Search by name...</label>
        <input class="search__input" id="searchName" type="text" placeholder="Search by name..." [formControl]="search">
        <button (click)="onClear()">CLEAR</button>
      </div>
    </section>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  search: FormControl = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(
    private dataServ: DataService
  ) {
    this.onSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next([])
    this.destroy$.complete();
  }

  private onSearch(): void {
    this.search.valueChanges.pipe(
      map(search => search?.toLowerCase().trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== '' && search?.length > 2),
      tap(search => this.dataServ.filterCharacters(search)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onClear() {
    this.search.reset();
    this.dataServ.getCharacters();
  }
}
