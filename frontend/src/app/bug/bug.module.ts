import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BugListComponent } from './bug-list/bug-list.component';
import { BugDetailsComponent } from './bug-details/bug-details.component';



@NgModule({
  declarations: [BugListComponent, BugDetailsComponent],
  imports: [
    SharedModule
  ]
})
export class BugModule { }
