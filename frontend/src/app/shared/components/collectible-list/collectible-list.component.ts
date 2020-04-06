import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, concat, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Collectible } from '../../model/collectible';

@Component({
  selector: 'app-collectible-list',
  templateUrl: './collectible-list.component.html',
  styleUrls: ['./collectible-list.component.scss'],
})
export class CollectibleListComponent implements OnInit, OnDestroy {
  @Input() collectibles$: Observable<Collectible[]>;
  @Input() baseLink: string;

  private destroyed$ = new Subject();

  searchControl = new FormControl();

  collectibles: Collectible[] = [];

  constructor() {}

  ngOnInit() {
    combineLatest(
      concat(of(''), this.searchControl.valueChanges.pipe(takeUntil(this.destroyed$))),
      this.collectibles$.pipe(takeUntil(this.destroyed$))
    ).subscribe(([filter, collectibles]) => {
      this.collectibles = collectibles.filter((collectible) => collectible.name.includes(filter));
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
