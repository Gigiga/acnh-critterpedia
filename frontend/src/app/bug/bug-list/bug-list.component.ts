import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { BugService } from 'src/app/shared/api/bug.service';
import { seasonFilter } from 'src/app/shared/filters/season.filter';
import { Bug } from 'src/app/shared/model/bug';
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

  seasonOnlyControl = new FormControl(false);
  locationControl = new FormControl([]);

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
      this.configurationService.southernHemisphere,
      this.bugService.getAllBugs()
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([locations, seasonOnly, southernHemisphere, bugs]) => {
        if (locations.length) {
          bugs = bugs.filter((bug) => locations.includes(bug.location));
        }
        if (seasonOnly) {
          bugs = seasonFilter(bugs, southernHemisphere);
        }
        this.bugs$.next(bugs);
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
