import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectibleListComponent } from './components/collectible-list/collectible-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatList } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [CollectibleListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
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
  exports: [CommonModule, CollectibleListComponent, TranslateModule, MatDividerModule, MatListModule]
})
export class SharedModule { }
