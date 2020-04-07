import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FishService } from 'src/app/shared/api/fish.service';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details/base-details.component';
import { Fish } from 'src/app/shared/model/fish';

@Component({
  selector: 'app-fish-details',
  templateUrl: './fish-details.component.html',
  styleUrls: ['./fish-details.component.scss'],
})
export class FishDetailsComponent extends BaseDetailsComponent<Fish> {
  constructor(
    private fishService: FishService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected translate: TranslateService
  ) {
    super(route, router, snackBar, translate);
    this.loadItem = (): Observable<Fish> => this.fishService.getFish(this.name);
  }
}
