import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FossilDetailsComponent } from './fossil-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('FossilDetailsComponent', () => {
  let component: FossilDetailsComponent;
  let fixture: ComponentFixture<FossilDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FossilDetailsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FossilDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
