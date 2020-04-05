import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fossil } from 'src/app/shared/model/fossil';
import { FossilService } from 'src/app/shared/api/fossil.service';

@Component({
  selector: 'app-fossil-list',
  templateUrl: './fossil-list.component.html',
  styleUrls: ['./fossil-list.component.scss']
})
export class FossilListComponent implements OnInit {
  fossils$: Observable<Fossil[]>;

  constructor(private fossilService: FossilService) { }

  ngOnInit(): void {
    this.fossils$ = this.fossilService.getAllFossils();
  }

}
