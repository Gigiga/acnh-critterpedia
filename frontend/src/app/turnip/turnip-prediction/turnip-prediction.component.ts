import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Subject } from 'rxjs';
import { debounceTime, finalize, takeUntil, tap } from 'rxjs/operators';
import { TurnipService } from 'src/app/shared/api/turnip.service';
import { TurnipCalculationRequest } from 'src/app/shared/model/turnipCalculationRequest';
import { TurnipPatternMap } from 'src/app/shared/model/turnipPatternMap';
import { TurnipPrice } from 'src/app/shared/model/turnipPrice';

@Component({
  selector: 'app-turnip-prediction',
  templateUrl: './turnip-prediction.component.html',
  styleUrls: ['./turnip-prediction.component.scss'],
})
export class TurnipPredictionComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  loading = false;
  initialized = false;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = [
    'pattern',
    'monAm',
    'monPm',
    'tueAm',
    'tuePm',
    'wedAm',
    'wedPm',
    'thuAm',
    'thuPm',
    'friAm',
    'friPm',
    'satAm',
    'satPm',
  ];

  basePriceControl = new FormControl();
  firstTimeBuyerControl = new FormControl(false);
  mondayPriceControl = new FormControl();
  tuesdayPriceControl = new FormControl();
  wednesdayPriceControl = new FormControl();
  thursdayPriceControl = new FormControl();
  fridayPriceControl = new FormControl();
  saturdayPriceControl = new FormControl();

  formControls = [
    this.mondayPriceControl,
    this.tuesdayPriceControl,
    this.wednesdayPriceControl,
    this.thursdayPriceControl,
    this.fridayPriceControl,
    this.saturdayPriceControl,
  ];

  constructor(private turnipService: TurnipService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    merge(
      this.basePriceControl.valueChanges,
      this.firstTimeBuyerControl.valueChanges.pipe(
        tap((checked) =>
          checked
            ? this.basePriceControl.disable()
            : this.basePriceControl.enable()
        )
      ),
      ...this.formControls.map((fc) => fc.valueChanges)
    )
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(2000),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        const request: TurnipCalculationRequest = {
          basePrice: this.basePriceControl.value,
          firstTime: this.firstTimeBuyerControl.value,
          seenPrices: this.formControls.reduce(
            (prices, fc) =>
              fc.value
                ? prices.concat([fc.value.am, fc.value.pm])
                : prices.concat([null, null]),
            []
          ),
        };
        this.turnipService
          .getPatterns(request)
          .pipe(finalize(() => (this.loading = false, this.initialized = true)))
          .subscribe((patternmap) => {
            this.mapPattern(patternmap);
          });
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private formatPrice(turnipPrice: TurnipPrice) {
    return `${turnipPrice.min}-${turnipPrice.max}`;
  }

  private mapPattern(patternMap: TurnipPatternMap) {
    let dataSource = [];
    for (const pattern of Object.keys(patternMap)) {
      let i = 0;
      dataSource = dataSource.concat(
        patternMap[pattern].map(
          (value) => (
            (i = 0),
            {
              pattern,
              monAm: this.formatPrice(value.prices[i++]),
              monPm: this.formatPrice(value.prices[i++]),
              tueAm: this.formatPrice(value.prices[i++]),
              tuePm: this.formatPrice(value.prices[i++]),
              wedAm: this.formatPrice(value.prices[i++]),
              wedPm: this.formatPrice(value.prices[i++]),
              thuAm: this.formatPrice(value.prices[i++]),
              thuPm: this.formatPrice(value.prices[i++]),
              friAm: this.formatPrice(value.prices[i++]),
              friPm: this.formatPrice(value.prices[i++]),
              satAm: this.formatPrice(value.prices[i++]),
              satPm: this.formatPrice(value.prices[i]),
            }
          )
        )
      );
    }
    console.log(this.dataSource);
    this.dataSource.data = dataSource;
  }
}
