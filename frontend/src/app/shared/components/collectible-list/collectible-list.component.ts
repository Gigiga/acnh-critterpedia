import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, concat, Observable, of, Subject } from 'rxjs';
import { takeUntil, tap, finalize } from 'rxjs/operators';
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

  searchControl = new FormControl();

  collectibles: Collectible[] = [];

  constructor() {}

  ngOnInit() {
    combineLatest(
      concat(of(''), this.searchControl.valueChanges),
      this.collectibles$.pipe(
        tap(() => (this.loading = false)),
        finalize(() => (this.loading = false))
      )
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([filter, collectibles]) => {
        filter = filter.toUpperCase();
        this.collectibles = collectibles.filter((collectible) =>
          collectible.name.toUpperCase().includes(filter)
        );
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
