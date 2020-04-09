import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatchTime, Months, Month } from '../../model/models';
import { ConfigurationService } from '../../service/configuration.service';

@Component({
  selector: 'app-catch-time-details',
  templateUrl: './catch-time-details.component.html',
  styleUrls: ['./catch-time-details.component.scss'],
})
export class CatchTimeDetailsComponent implements OnInit, OnDestroy {
  @Input() catchTime: CatchTime;

  allDay = false;
  dates: {startDate: Date, endDate: Date}[] = [];

  private destroyed$ = new Subject();

  monthArray: Months[];

  catchableMonths: Months[] = [];

  constructor(private configurationService: ConfigurationService) {
    this.monthArray = Object.keys(Months).map((month) => month as Months);
  }

  ngOnInit(): void {
    this.configurationService.southernHemisphere
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (southernHemisphere) =>
          (this.catchableMonths = this.mapMonths(
            southernHemisphere
              ? this.catchTime.southernHemisphereMonths
              : this.catchTime.northernHemisphereMonths
          ))
      );

    const now = new Date();
    this.dates = this.catchTime.catchHours.map((catchHour) => {
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), catchHour.startHour),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), catchHour.endHour)
      }
    });
    
    this.allDay =
      this.catchTime.catchHours.length === 1 &&
      this.catchTime.catchHours[0].endHour -
        this.catchTime.catchHours[0].startHour ===
        24;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  mapMonths(months: Month[]): Months[] {
    return months.map((month) => month.name);
  }
}
