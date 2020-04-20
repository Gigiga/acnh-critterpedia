import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  finalize,
  flatMap,
  startWith,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { TurnipService } from 'src/app/shared/api/turnip.service';
import { TurnipPatterns } from 'src/app/shared/model/turnip-patterns.enum';
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
  private request: TurnipCalculationRequest;

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

  PATTERN_PROBABILITIES = {
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
  patternDataSource = [];
  patternColumns = [
    'pattern',
    'probability',
    'sun',
    ...this.timings,
    'guaranteedMin',
    'potentialMax',
  ];

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
    this.setupForm();
    this.loadConfig();
  }

  private setupForm() {
    const patternMap$ = merge(
      this.basePriceControl.valueChanges,
      this.firstTimeBuyerControl.valueChanges.pipe(
        tap((checked) =>
          checked
            ? this.basePriceControl.disable()
            : this.basePriceControl.enable()
        )
      ),
      ...this.formControls.map((fc) => fc.valueChanges)
    ).pipe(
      tap(() => (this.loading = true)),
      debounceTime(2000),
      flatMap(() => this.requestPatterns()),
      startWith(null)
    );

    const lastPattern$ = this.lastPatternControl.valueChanges;

    combineLatest(patternMap$, lastPattern$)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([patternMap, lastPattern]) => {
        const patternProbabilities = this.mapProbabilities(
          patternMap,
          lastPattern
        );
        if (patternMap) {
          this.mapPattern(this.request, patternMap, patternProbabilities);
        }
      });
  }

  private requestPatterns(): Observable<TurnipPatternMap> {
    this.request = {
      basePrice: this.basePriceControl.value,
      firstTime: this.firstTimeBuyerControl.value,
      seenPrices: this.formControls.flatMap(
        (fc) =>
          fc.value
            ? [fc.value.am, fc.value.pm]
            : [null, null],
        []
      ),
    };
    this.configurationService.turnipRequest.next(this.request);
    return this.turnipService
      .getPatterns(this.request)
      .pipe(
        finalize(() => ((this.loading = false), (this.initialized = true)))
      );
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
      });

    this.configurationService.lastTurnipPattern
      .pipe(take(1))
      .subscribe((lastPattern) =>
        this.lastPatternControl.setValue(lastPattern)
      );
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

  private mapProbabilities(
    patternMap: TurnipPatternMap,
    lastPattern: TurnipPatterns
  ): { [key: string]: number } {
    this.configurationService.lastTurnipPattern.next(lastPattern);
    if (lastPattern) {
      if (patternMap) {
        const patternProbabilities = this.PATTERN_PROBABILITIES[lastPattern];
        const maxPercent = Object.keys(patternMap).reduce(
          (percent, pattern) => percent + patternProbabilities[pattern],
          0
        );
        this.probabilityDataSource = Object.keys(patternMap).map((pattern) => ({
          pattern,
          probability: patternProbabilities[pattern] / maxPercent,
        }));
        return Object.keys(patternMap).reduce(
          (probabilities, pattern) => ({
            ...probabilities,
            [pattern]:
              patternProbabilities[pattern] /
              patternMap[pattern].length /
              maxPercent,
          }),
          {}
        );
      } else {
        this.probabilityDataSource = Object.keys(
          this.PATTERN_PROBABILITIES[lastPattern]
        ).map((value) => ({
          pattern: value,
          probability: this.PATTERN_PROBABILITIES[lastPattern][value] / 100,
        }));
      }
    } else {
      this.probabilityDataSource = [];
    }
    return {};
  }

  private mapPattern(
    request: TurnipCalculationRequest,
    patternMap: TurnipPatternMap,
    patternProbabilities
  ) {
    let patternDataSource = [];
    for (const pattern of Object.keys(patternMap)) {
      patternDataSource = patternDataSource.concat(
        patternMap[pattern].map((value) =>
          value.prices.reduce(
            (value, price, index) => ({
              ...value,
              [this.timings[index]]: this.formatPrice(
                price,
                request.seenPrices[index]
              ),
              guaranteedMin: Math.max(
                value.guaranteedMin,
                price.min,
                request.seenPrices[index] || 0
              ),
              potentialMax: Math.max(value.potentialMax, price.max),
            }),
            {
              pattern,
              sun: value.basePrice,
              guaranteedMin: 0,
              potentialMax: 0,
              probability: patternProbabilities[pattern] ?? '-',
            }
          )
        )
      );
    }
    this.patternDataSource = patternDataSource;
  }
}
