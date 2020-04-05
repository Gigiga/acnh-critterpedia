import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fossil } from 'src/app/shared/model/fossil';
import { Observable, Subject } from 'rxjs';
import { FossilService } from 'src/app/shared/api/fossil.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss']
})
export class FossilDetailsComponent implements OnInit, OnDestroy {
  fossil$: Observable<Fossil>;

  private destroyed$ = new Subject();

  constructor(private fossilService: FossilService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fossil$ = this.route.paramMap.pipe(
      takeUntil(this.destroyed$),
      switchMap((params: ParamMap) =>
        this.fossilService.getFossil(params.get('name'))
      )
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
