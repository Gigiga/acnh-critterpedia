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
import { TurnipPatterns } from 'src/app/shared/model/turnip-patterns.enum';

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

  TurnipPatterns = TurnipPatterns;

  patternProbabilities = {
    [TurnipPatterns.FLUCTUATING]: {
      [TurnipPatterns.FLUCTUATING]: 20,
      [TurnipPatterns.HIGH_SPIKE]: 30,
      [TurnipPatterns.DECREASING]: 15,
      [TurnipPatterns.SPIKE]: 35,
    },
    [TurnipPatterns.HIGH_SPIKE]: {
      [TurnipPatterns.FLUCTUATING]: 50,
      [TurnipPatterns.HIGH_SPIKE]: 5,
      [TurnipPatterns.DECREASING]: 20,
      [TurnipPatterns.SPIKE]: 25,
    },
    [TurnipPatterns.DECREASING]: {
      [TurnipPatterns.FLUCTUATING]: 25,
      [TurnipPatterns.HIGH_SPIKE]: 45,
      [TurnipPatterns.DECREASING]: 5,
      [TurnipPatterns.SPIKE]: 25,
    },
    [TurnipPatterns.SPIKE]: {
      [TurnipPatterns.FLUCTUATING]: 45,
      [TurnipPatterns.HIGH_SPIKE]: 25,
      [TurnipPatterns.DECREASING]: 15,
      [TurnipPatterns.SPIKE]: 15,
    },
  };

  probabilityDataSource = [];
  probabilityColumns = ['pattern', 'probability'];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['pattern', 'sun', ...this.timings];

  basePriceControl = new FormControl();
  firstTimeBuyerControl = new FormControl(false);
  mondayPriceControl = new FormControl();
  tuesdayPriceControl = new FormControl();
  wednesdayPriceControl = new FormControl();
  thursdayPriceControl = new FormControl();
  fridayPriceControl = new FormControl();
  saturdayPriceControl = new FormControl();
  lastPatternControl = new FormControl();

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

    this.lastPatternControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (pattern) =>
          (this.probabilityDataSource = Object.keys(
            this.patternProbabilities[pattern]
          ).map((value) => ({
            pattern: value,
            probability: this.patternProbabilities[pattern][value],
          })))
      );
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
        this.mapPattern(request, patternmap);
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
        if (request.firstTime) {
          this.basePriceControl.disable();
        }
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

  private formatPrice(turnipPrice: TurnipPrice, seenPrice: number): string {
    let text;
    if (turnipPrice.min === turnipPrice.max) {
      text = `${turnipPrice.min}`;
    } else {
      text = `${turnipPrice.min}-${turnipPrice.max}`;
    }

    if (seenPrice) {
      return `${seenPrice} (${text})`;
    }
    return text;
  }

  private mapPattern(
    request: TurnipCalculationRequest,
    patternMap: TurnipPatternMap
  ) {
    let dataSource = [];
    for (const pattern of Object.keys(patternMap)) {
      dataSource = dataSource.concat(
        patternMap[pattern].map((value) =>
          value.prices.reduce(
            (value, price, index) => ({
              ...value,
              [this.timings[index]]: this.formatPrice(
                price,
                request.seenPrices[index]
              ),
            }),
            { pattern, sun: value.basePrice }
          )
        )
      );
    }
    console.log(this.dataSource);
    this.dataSource.data = dataSource;
  }
}
