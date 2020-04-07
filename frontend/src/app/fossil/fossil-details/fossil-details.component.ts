import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FossilService } from 'src/app/shared/api/fossil.service';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details/base-details.component';
import { Fossil } from 'src/app/shared/model/fossil';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss'],
})
export class FossilDetailsComponent extends BaseDetailsComponent<Fossil> {
  constructor(
    private fossilService: FossilService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected translate: TranslateService
  ) {
    super(route, router, snackBar, translate);
    this.loadItem = (): Observable<Fossil> => this.fossilService.getFossil(this.name);
  }
}
