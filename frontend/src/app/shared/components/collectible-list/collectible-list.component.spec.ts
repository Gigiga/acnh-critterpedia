import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { CollectibleListComponent } from './collectible-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of } from 'rxjs';

describe('CollectibleListComponent', () => {
  let component: CollectibleListComponent;
  let fixture: ComponentFixture<CollectibleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectibleListComponent],
      imports: [
        MatAutocompleteModule,
        TranslateModule.forRoot(),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectibleListComponent);
    component = fixture.componentInstance;
    component.collectibles$ = of([
      {
        name: 'Pale Chub',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
      }
    ])
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
