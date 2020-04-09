import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, concat, of, ReplaySubject } from 'rxjs';
import { BugService } from 'src/app/shared/api/bug.service';
import { seasonFilter } from 'src/app/shared/filters/season.filter';
import { Bug } from 'src/app/shared/model/bug';
import { ConfigurationService } from 'src/app/shared/service/configuration.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss'],
})
export class BugListComponent implements OnInit {
  bugs$ = new ReplaySubject<Bug[]>();

  seasonOnlyControl = new FormControl(false);

  constructor(
    private bugService: BugService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    combineLatest(
      concat(
        of(this.seasonOnlyControl.value),
        this.seasonOnlyControl.valueChanges
      ),
      this.configurationService.southernHemisphere,
      this.bugService.getAllBugs()
    ).subscribe(([seasonOnly, southernHemisphere, bugs]) => {
      if(seasonOnly) {
        bugs = seasonFilter(bugs, southernHemisphere);
      }
      this.bugs$.next(bugs);
    });
  }
}
