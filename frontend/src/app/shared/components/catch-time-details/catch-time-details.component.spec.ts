import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchTimeDetailsComponent } from './catch-time-details.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CatchTimeDetailsComponent', () => {
  let component: CatchTimeDetailsComponent;
  let fixture: ComponentFixture<CatchTimeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchTimeDetailsComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchTimeDetailsComponent);
    component = fixture.componentInstance;
    component.catchTime = {
      startHour: 6,
      endHour: 12,
      northernHemisphereMonths: ["AUG"],
      southernHemisphereMonths: ["JUL"]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
