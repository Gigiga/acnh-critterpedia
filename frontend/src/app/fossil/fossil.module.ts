import { NgModule } from '@angular/core';
import { FossilListComponent } from './fossil-list/fossil-list.component';
import { SharedModule } from '../shared/shared.module';
import { FossilDetailsComponent } from './fossil-details/fossil-details.component';



@NgModule({
  declarations: [FossilListComponent, FossilDetailsComponent],
  imports: [
    SharedModule,
  ]
})
export class FossilModule { }
