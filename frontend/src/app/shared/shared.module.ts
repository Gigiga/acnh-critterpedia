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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '../app-routing.module';
import { CatchTimeDetailsComponent } from './components/catch-time-details/catch-time-details.component';
import { CollectibleListComponent } from './components/collectible-list/collectible-list.component';
import { HemisphereSelectorComponent } from './components/hemisphere-selector/hemisphere-selector.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SellingPriceComponent } from './components/selling-price/selling-price.component';
import { MatIconModule } from '@angular/material/icon';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [CollectibleListComponent, CatchTimeDetailsComponent, HemisphereSelectorComponent, SellingPriceComponent, LoadingSpinnerComponent],
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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
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
    LoadingSpinnerComponent,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
