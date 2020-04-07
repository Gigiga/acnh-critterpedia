import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BugService } from 'src/app/shared/api/bug.service';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details/base-details.component';
import { Bug } from 'src/app/shared/model/bug';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss'],
})
export class BugDetailsComponent extends BaseDetailsComponent<Bug>
  implements OnInit {
  constructor(
    private bugService: BugService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected translate: TranslateService
  ) {
    super(route, router, snackBar, translate);
    this.loadItem = (): Observable<Bug> => {
      return this.bugService.getBug(this.name);
    };
  }
}
