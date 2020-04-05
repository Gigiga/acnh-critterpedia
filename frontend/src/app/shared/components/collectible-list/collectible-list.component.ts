import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, merge, combineLatest, concat, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Collectible } from '../../model/collectible';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-collectible-list',
  templateUrl: './collectible-list.component.html',
  styleUrls: ['./collectible-list.component.scss'],
})
export class CollectibleListComponent implements OnInit, OnDestroy {
  @Input() collectibles$: Observable<Collectible[]>;
  @Input() routerLink: string;

  private destroyed$ = new Subject();

  searchControl = new FormControl();

  collectibles: Collectible[] = [];

  constructor(private router: Router) {}

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

  showDetails(collectibleName: string) {
    this.router.navigate([this.routerLink, collectibleName]);
  }
}
