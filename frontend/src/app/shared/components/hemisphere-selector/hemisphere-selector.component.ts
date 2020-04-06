import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ConfigurationService } from '../../service/configuration.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-hemisphere-selector',
  templateUrl: './hemisphere-selector.component.html',
  styleUrls: ['./hemisphere-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HemisphereSelectorComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();

  southernHemisphere = false;

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.southernHemisphere
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (southernHemisphere) => (this.southernHemisphere = southernHemisphere)
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onChange(event: MatSlideToggleChange) {
    this.configurationService.southernHemisphere.next(event.checked);
  }
}
