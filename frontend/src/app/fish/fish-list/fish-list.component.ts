import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { FishService } from 'src/app/shared/api/fish.service';
import { seasonFilter } from 'src/app/shared/filters/season.filter';
import { Fish } from 'src/app/shared/model/fish';
import { ConfigurationService } from 'src/app/shared/service/configuration.service';
import { timeFilter } from 'src/app/shared/filters/time.filter';

@Component({
  selector: 'app-fish-list',
  templateUrl: './fish-list.component.html',
  styleUrls: ['./fish-list.component.scss'],
})
export class FishListComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  fish$ = new ReplaySubject<Fish[]>();
  locations = Object.values(Fish.LocationsEnum);

  seasonOnlyControl = new FormControl(false);
  timeOnlyControl = new FormControl(false);
  locationControl = new FormControl([]);

  constructor(
    private fishService: FishService,
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
      this.fishService.getAllFish()
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        ([locations, seasonOnly, timeOnly, southernHemisphere, fish]) => {
          if (locations.length) {
            fish = fish.filter((fish) => locations.includes(fish.location));
          }
          if (seasonOnly) {
            fish = seasonFilter(fish, southernHemisphere);
          }
          if (timeOnly) {
            fish = timeFilter(fish);
          }
          this.fish$.next(fish);
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
