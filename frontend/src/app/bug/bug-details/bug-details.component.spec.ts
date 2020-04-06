import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BugDetailsComponent } from './bug-details.component';

describe('BugDetailsComponent', () => {
  let component: BugDetailsComponent;
  let fixture: ComponentFixture<BugDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BugDetailsComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
