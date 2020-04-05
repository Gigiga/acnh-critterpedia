import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Fish } from 'src/app/shared/model/fish';
import { FishService } from 'src/app/shared/api/fish.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-fish-details',
  templateUrl: './fish-details.component.html',
  styleUrls: ['./fish-details.component.scss']
})
export class FishDetailsComponent implements OnInit, OnDestroy {
  fish$: Observable<Fish>;

  private destroyed$ = new Subject();

  constructor(private fishService: FishService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fish$ = this.route.paramMap.pipe(
      takeUntil(this.destroyed$),
      switchMap((params: ParamMap) =>
        this.fishService.getFish(params.get('name'))
      )
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
