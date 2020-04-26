import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { BugService } from 'src/app/shared/api/bug.service';
import { monthFilter } from 'src/app/shared/filters/month.filter';
import { seasonFilter } from 'src/app/shared/filters/season.filter';
import { timeFilter } from 'src/app/shared/filters/time.filter';
import { Bug } from 'src/app/shared/model/bug';
import { Months } from 'src/app/shared/model/months';
import { ConfigurationService } from 'src/app/shared/service/configuration.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss'],
})
export class BugListComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  bugs$ = new ReplaySubject<Bug[]>();
  locations = Object.values(Bug.LocationsEnum);
  months = Object.values(Months);

  seasonOnlyControl = new FormControl(false);
  timeOnlyControl = new FormControl(false);
  locationControl = new FormControl([]);
  monthsControl = new FormControl([]);

  constructor(
    private bugService: BugService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    combineLatest(
      this.locationControl.valueChanges.pipe(
        startWith(this.locationControl.value)
      ),
      this.seasonOnlyControl.valueChanges.pipe(
        startWith(this.seasonOnlyControl.value)
      ),
      this.timeOnlyControl.valueChanges.pipe(
        startWith(this.timeOnlyControl.value)
      ),
      this.configurationService.southernHemisphere,
      this.bugService.getAllBugs(),
      this.monthsControl.valueChanges.pipe(startWith(this.monthsControl.value))
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        ([
          locations,
          seasonOnly,
          timeOnly,
          southernHemisphere,
          bugs,
          months,
        ]) => {
          if (locations.length) {
            bugs = bugs.filter((bug) => locations.includes(bug.location));
          }
          if (months.length) {
            bugs = monthFilter(bugs, southernHemisphere, months);
          }
          if (seasonOnly) {
            bugs = seasonFilter(bugs, southernHemisphere);
          }
          if (timeOnly) {
            bugs = timeFilter(bugs);
          }
          this.bugs$.next(bugs);
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
