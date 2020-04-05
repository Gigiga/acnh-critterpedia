import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { BugService } from 'src/app/shared/api/bug.service';
import { Bug } from 'src/app/shared/model/bug';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss'],
})
export class BugDetailsComponent implements OnInit, OnDestroy {
  bug$: Observable<Bug>;

  private destroyed$ = new Subject();

  constructor(private bugService: BugService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bug$ = this.route.paramMap.pipe(
      takeUntil(this.destroyed$),
      switchMap((params: ParamMap) =>
        this.bugService.getBug(params.get('name'))
      )
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
