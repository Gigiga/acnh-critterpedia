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
  startDate = new Date();
  endDate = new Date();

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
          (this.catchableMonths = this.mapMonths(southernHemisphere
            ? this.catchTime.southernHemisphereMonths
            : this.catchTime.northernHemisphereMonths))
      );

    this.startDate.setHours(this.catchTime.startHour, 0);
    this.endDate.setHours(this.catchTime.endHour, 0);
    this.allDay = (this.catchTime.endHour - this.catchTime.startHour === 24);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  mapMonths(months: Month[]): Months[] {
    return months.map((month) => month.name);
  }
}
