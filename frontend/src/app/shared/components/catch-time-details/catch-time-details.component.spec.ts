import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchTimeDetailsComponent } from './catch-time-details.component';

describe('CatchTimeDetailsComponent', () => {
  let component: CatchTimeDetailsComponent;
  let fixture: ComponentFixture<CatchTimeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchTimeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchTimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
