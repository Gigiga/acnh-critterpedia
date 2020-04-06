import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CollectibleListComponent } from './collectible-list.component';


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
