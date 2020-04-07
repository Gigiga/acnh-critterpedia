import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';

@Component({
  template: '',
})
export class BaseDetailsComponent<T> implements OnInit, OnDestroy {
  item: T;
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
          return this.loadItem().pipe(finalize(() => (this.loading = false)));
        })
      )
      .subscribe(
        (item) => (this.item = item),
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

  loadItem: () => Observable<T> = () => {return of({} as T)};
}
