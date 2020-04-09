import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { BugModule } from './bug/bug.module';
import { FishModule } from './fish/fish.module';
import { FossilModule } from './fossil/fossil.module';
import { BugMockService } from './shared/api/bug-mock.service';
import { BugService } from './shared/api/bug.service';
import { FishMockService } from './shared/api/fish-mock.service';
import { FishService } from './shared/api/fish.service';
import { FossilMockService } from './shared/api/fossil-mock.service';
import { FossilService } from './shared/api/fossil.service';
import { SharedModule } from './shared/shared.module';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingReuseStrategy } from './app-routing-reuse-strategy';

export function getProviders() {
  if(environment.useMocks) {
    return [
      {
        provide: FossilService,
        useClass: FossilMockService,
      },
      {
        provide: FishService,
        useClass: FishMockService,
      },
      {
        provide: BugService,
        useClass: BugMockService,
      },
    ];
  }
  return [];
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
    HttpClientModule,
    FossilModule,
    FishModule,
    BugModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: AppRoutingReuseStrategy}, ...getProviders()],
  bootstrap: [AppComponent],
})
export class AppModule {}
