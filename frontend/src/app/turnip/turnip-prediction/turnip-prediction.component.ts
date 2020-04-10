import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  finalize,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { TurnipService } from 'src/app/shared/api/turnip.service';
import { TurnipCalculationRequest } from 'src/app/shared/model/turnipCalculationRequest';
import { TurnipPatternMap } from 'src/app/shared/model/turnipPatternMap';
import { TurnipPrice } from 'src/app/shared/model/turnipPrice';
import { ConfigurationService } from 'src/app/shared/service/configuration.service';

@Component({
  selector: 'app-turnip-prediction',
  templateUrl: './turnip-prediction.component.html',
  styleUrls: ['./turnip-prediction.component.scss'],
})
export class TurnipPredictionComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  loading = false;
  initialized = false;

  private timings = [
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

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['pattern', ...this.timings];

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

  constructor(
    private turnipService: TurnipService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.loadConfig();
    this.setupForm();
  }

  private setupForm() {
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
        takeUntil(this.destroyed$),
        debounceTime(2000)
      )
      .subscribe(() => {
        this.requestPatterns();
      });
  }

  private requestPatterns() {
    this.loading = true;
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
    this.configurationService.turnipRequest.next(request);
    this.turnipService
      .getPatterns(request)
      .pipe(finalize(() => ((this.loading = false), (this.initialized = true))))
      .subscribe((patternmap) => {
        this.mapPattern(patternmap);
      });
  }

  private loadConfig() {
    this.configurationService.turnipRequest
      .pipe(
        take(1),
        filter((request) => request !== null)
      )
      .subscribe((request) => {
        this.firstTimeBuyerControl.setValue(request.firstTime);
        this.basePriceControl.setValue(request.basePrice);
        this.formControls.forEach((formControl, index) => {
          formControl.setValue({
            am: request.seenPrices[index * 2],
            pm: request.seenPrices[index * 2 + 1],
          });
        });
        this.requestPatterns();
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
      dataSource = dataSource.concat(
        patternMap[pattern].map((value) =>
          value.prices.reduce(
            (value, price, index) => ({
              ...value,
              [this.timings[index]]: this.formatPrice(price),
            }),
            { pattern }
          )
        )
      );
    }
    console.log(this.dataSource);
    this.dataSource.data = dataSource;
  }
}
