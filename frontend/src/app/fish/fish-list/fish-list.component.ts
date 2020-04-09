import { Component, OnInit } from '@angular/core';
import { combineLatest, ReplaySubject, concat, of } from 'rxjs';
import { FishService } from 'src/app/shared/api/fish.service';
import { Fish } from 'src/app/shared/model/fish';
import { FormControl } from '@angular/forms';
import { ConfigurationService } from 'src/app/shared/service/configuration.service';
import { seasonFilter } from 'src/app/shared/filters/season.filter';

@Component({
  selector: 'app-fish-list',
  templateUrl: './fish-list.component.html',
  styleUrls: ['./fish-list.component.scss'],
})
export class FishListComponent implements OnInit {
  fish$ = new ReplaySubject<Fish[]>();

  seasonOnlyControl = new FormControl(false);

  constructor(
    private fishService: FishService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    combineLatest(
      concat(
        of(this.seasonOnlyControl.value),
        this.seasonOnlyControl.valueChanges
      ),
      this.configurationService.southernHemisphere,
      this.fishService.getAllFish()
    ).subscribe(([seasonOnly, southernHemisphere, fish]) => {
      if(seasonOnly) {
        fish = seasonFilter(fish, southernHemisphere);
      }
      this.fish$.next(fish);
    });
  }
}
