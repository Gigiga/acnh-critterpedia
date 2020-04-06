import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Fish } from 'src/app/shared/model/fish';
import { FishService } from 'src/app/shared/api/fish.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil, switchMap, finalize, combineAll } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fish-details',
  templateUrl: './fish-details.component.html',
  styleUrls: ['./fish-details.component.scss'],
})
export class FishDetailsComponent implements OnInit, OnDestroy {
  fish$: Observable<Fish>;
  fishName: string;
  loading = true;

  private destroyed$ = new Subject();

  constructor(
    private fishService: FishService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.fish$ = this.route.paramMap.pipe(
      takeUntil(this.destroyed$),
      switchMap((params: ParamMap) => {
        this.fishName = params.get('name');
        this.loading = true;
        return this.fishService
          .getFish(this.fishName)
          .pipe(finalize(() => (this.loading = false)));
      })
    );

    this.fish$.subscribe({
      error: (error) => {
        const key =
          error.status === 404 ? 'CreatureNotFound' : 'CreatureLoadError';
        this.translate
          .get([key, 'Dismiss'], { name: this.fishName })
          .subscribe((translations) => {
            this.snackBar.open(translations[key], translations.Dismiss, {
              duration: 5000,
            });
            this.router.navigate(['/fish']);
          });
      },
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
