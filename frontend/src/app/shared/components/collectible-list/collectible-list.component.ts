import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { finalize, startWith, takeUntil, tap } from 'rxjs/operators';
import { Collectible } from '../../model/collectible';

@Component({
  selector: 'app-collectible-list',
  templateUrl: './collectible-list.component.html',
  styleUrls: ['./collectible-list.component.scss'],
})
export class CollectibleListComponent implements OnInit, OnDestroy {
  @Input() collectibles$: Observable<Collectible[]>;
  @Input() baseLink: string;
  @Input() loading = true;

  private destroyed$ = new Subject();

  searchControl = new FormControl('');
  sortControl = new FormControl();
  sortOptions: {
    [key: string]: (a: Collectible, b: Collectible) => number;
  } = {};

  collectibles: Collectible[] = [];

  private registerSortFn(
    name: string,
    comparator: (a: Collectible, b: Collectible) => number
  ) {
    this.sortOptions[name] = comparator;
  }

  constructor() {
    this.registerSortFn('Name (Asc)', (a, b) => a.name.localeCompare(b.name));
    this.registerSortFn('Name (Desc)', (a, b) => b.name.localeCompare(a.name));
    this.registerSortFn('Price (Asc)', (a, b) => a.price - b.price);
    this.registerSortFn('Price (Desc)', (a, b) => b.price - a.price);
  }

  ngOnInit() {
    combineLatest(
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
      this.sortControl.valueChanges.pipe(startWith(this.sortControl.value)),
      this.collectibles$.pipe(
        tap(() => (this.loading = false)),
        finalize(() => (this.loading = false))
      )
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([filter, sortOpt, collectibles]) => {
        filter = filter.toUpperCase();
        this.collectibles = collectibles.filter((collectible) =>
          collectible.name.toUpperCase().includes(filter)
        );
        if (this.sortOptions[sortOpt]) {
          this.collectibles.sort(this.sortOptions[sortOpt]);
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
