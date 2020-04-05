import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bug } from 'src/app/shared/model/bug';
import { BugService } from 'src/app/shared/api/bug.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {
  bugs$: Observable<Bug[]>;

  constructor(private bugService: BugService) { }

  ngOnInit(): void {
    this.bugs$ = this.bugService.getAllBugs();
  }

}
