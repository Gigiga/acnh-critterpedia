import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingPriceComponent } from './selling-price.component';

describe('SellingPriceComponent', () => {
  let component: SellingPriceComponent;
  let fixture: ComponentFixture<SellingPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
