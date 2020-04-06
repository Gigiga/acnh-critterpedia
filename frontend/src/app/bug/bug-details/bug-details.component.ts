import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';
import { BugService } from 'src/app/shared/api/bug.service';
import { Bug } from 'src/app/shared/model/bug';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss'],
})
export class BugDetailsComponent implements OnInit, OnDestroy {
  bug$: Observable<Bug>;
  bugName: string;
  loading = true;

  private destroyed$ = new Subject();

  constructor(
    private bugService: BugService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.bug$ = this.route.paramMap.pipe(
      takeUntil(this.destroyed$),
      switchMap((params: ParamMap) => {
        this.bugName = params.get('name');
        this.loading = true;
        return this.bugService
          .getBug(this.bugName)
          .pipe(finalize(() => (this.loading = false)));
      })
    );

    this.bug$.subscribe({
      error: (error) => {
        const key =
          error.status === 404 ? 'CreatureNotFound' : 'CreatureLoadError';
        this.translate
          .get([key, 'Dismiss'], { name: this.bugName })
          .subscribe((translations) => {
            this.snackBar.open(translations[key], translations.Dismiss, {
              duration: 5000,
            });
            this.router.navigate(['/bugs']);
          });
      },
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
