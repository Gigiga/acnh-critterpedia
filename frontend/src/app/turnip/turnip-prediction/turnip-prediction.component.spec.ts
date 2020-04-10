import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnipPredictionComponent } from './turnip-prediction.component';

describe('TurnipPredictionComponent', () => {
  let component: TurnipPredictionComponent;
  let fixture: ComponentFixture<TurnipPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnipPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnipPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
