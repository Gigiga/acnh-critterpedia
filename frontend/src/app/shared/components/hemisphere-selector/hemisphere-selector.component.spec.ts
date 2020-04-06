import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemisphereSelectorComponent } from './hemisphere-selector.component';

describe('HemisphereSelectorComponent', () => {
  let component: HemisphereSelectorComponent;
  let fixture: ComponentFixture<HemisphereSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HemisphereSelectorComponent ]
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
