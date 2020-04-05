import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FishListComponent } from './fish-list/fish-list.component';
import { FishDetailsComponent } from './fish-details/fish-details.component';



@NgModule({
  declarations: [FishListComponent, FishDetailsComponent],
  imports: [
    SharedModule
  ]
})
export class FishModule { }
