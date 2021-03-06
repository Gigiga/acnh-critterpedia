import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemisphereSelectorComponent } from './hemisphere-selector.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HemisphereSelectorComponent', () => {
  let component: HemisphereSelectorComponent;
  let fixture: ComponentFixture<HemisphereSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HemisphereSelectorComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HemisphereSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
