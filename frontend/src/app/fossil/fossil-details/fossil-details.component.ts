import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fossil } from 'src/app/shared/model/fossil';
import { Observable, Subject } from 'rxjs';
import { FossilService } from 'src/app/shared/api/fossil.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss'],
})
export class FossilDetailsComponent implements OnInit, OnDestroy {
  fossil$: Observable<Fossil>;
  fossilName: string;
  loading = true;

  private destroyed$ = new Subject();

  constructor(
    private fossilService: FossilService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.fossil$ = this.route.paramMap.pipe(
      takeUntil(this.destroyed$),
      switchMap((params: ParamMap) => {
        this.fossilName = params.get('name');
        this.loading = true;
        return this.fossilService
          .getFossil(this.fossilName)
          .pipe(finalize(() => (this.loading = false)));
      })
    );

    this.fossil$.subscribe({
      error: (error) => {
        const key =
          error.status === 404 ? 'CreatureNotFound' : 'CreatureLoadError';
        this.translate
          .get([key, 'Dismiss'], { name: this.fossilName })
          .subscribe((translations) => {
            this.snackBar.open(translations[key], translations.Dismiss, {
              duration: 5000,
            });
            this.router.navigate(['/fossils']);
          });
      },
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
