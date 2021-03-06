import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugListComponent } from './bug/bug-list/bug-list.component';
import { FishListComponent } from './fish/fish-list/fish-list.component';
import { FossilListComponent } from './fossil/fossil-list/fossil-list.component';
import { FishDetailsComponent } from './fish/fish-details/fish-details.component';
import { BugDetailsComponent } from './bug/bug-details/bug-details.component';
import { FossilDetailsComponent } from './fossil/fossil-details/fossil-details.component';
import { TurnipPredictionComponent } from './turnip/turnip-prediction/turnip-prediction.component';
import { PermaComponent } from './perma/perma.component';

const routes: Routes = [
  {
    path: 'fish',
    component: FishListComponent,
    data: {
      shouldReuse: true,
    },
  },
  {
    path: 'fish/:name',
    component: FishDetailsComponent,
  },
  {
    path: 'bugs',
    component: BugListComponent,
    data: {
      shouldReuse: true,
    },
  },
  {
    path: 'bugs/:name',
    component: BugDetailsComponent,
  },
  {
    path: 'fossils',
    component: FossilListComponent,
    data: {
      shouldReuse: true,
    },
  },
  {
    path: 'fossils/:name',
    component: FossilDetailsComponent,
  },
  {
    path: 'turnips',
    component: TurnipPredictionComponent,
    data: {
      shouldReuse: true,
    },
  },
  {
    path: 'perma/:link',
    component: PermaComponent,
  },
  {
    path: '',
    redirectTo: '/fish',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/fish',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
