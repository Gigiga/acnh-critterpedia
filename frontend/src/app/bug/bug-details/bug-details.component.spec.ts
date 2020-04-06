import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BugService } from 'src/app/shared/api/bug.service';
import { BugDetailsComponent } from './bug-details.component';

describe('BugDetailsComponent', () => {
  let component: BugDetailsComponent;
  let fixture: ComponentFixture<BugDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BugDetailsComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule],
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
