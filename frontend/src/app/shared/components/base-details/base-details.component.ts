import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  template: '',
})
export class BaseDetailsComponent<T> implements OnInit, OnDestroy {
  item: T;
  image: string;
  loading = true;
  protected destroyed$ = new Subject();
  protected name: string;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((params: ParamMap) => {
          this.name = params.get('name');
          this.loading = true;
          return combineLatest(
            this.loadItem(),
            this.loadImage()
          ).pipe(finalize(() => (this.loading = false)));
        })
      )
      .subscribe(
        ([item, image]) => (this.item = item, this.image = image),
        (error) => {
          const key =
            error.status === 404 ? 'CreatureNotFound' : 'CreatureLoadError';
          this.translate
            .get([key, 'Dismiss'], { name: this.name })
            .subscribe((translations) => {
              this.snackBar.open(translations[key], translations.Dismiss, {
                duration: 5000,
              });
              this.router.navigate(['../'], { relativeTo: this.route });
            });
        }
      );
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  loadItem: () => Observable<T> = () => {
    throw new Error();
  };

  loadImage: () => Observable<string> = () => {
    throw new Error();
  };
}
