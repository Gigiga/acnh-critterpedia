import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fish } from 'src/app/shared/model/fish';
import { FishService } from 'src/app/shared/api/fish.service';

@Component({
  selector: 'app-fish-list',
  templateUrl: './fish-list.component.html',
  styleUrls: ['./fish-list.component.scss']
})
export class FishListComponent implements OnInit {
  fish$: Observable<Fish[]>;

  constructor(private fishService: FishService) { }

  ngOnInit(): void {
    this.fish$ = this.fishService.getAllFish();
  }

}
