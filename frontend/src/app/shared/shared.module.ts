import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '../app-routing.module';
import { CollectibleListComponent } from './components/collectible-list/collectible-list.component';
import { CatchTimeDetailsComponent } from './components/catch-time-details/catch-time-details.component';
import { HemisphereSelectorComponent } from './components/hemisphere-selector/hemisphere-selector.component';
import { SellingPriceComponent } from './components/selling-price/selling-price.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [CollectibleListComponent, CatchTimeDetailsComponent, HemisphereSelectorComponent, SellingPriceComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  exports: [
    AppRoutingModule,
    CommonModule,
    CollectibleListComponent,
    CatchTimeDetailsComponent,
    HemisphereSelectorComponent,
    SellingPriceComponent,
    TranslateModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
  ],
})
export class SharedModule {}
