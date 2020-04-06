import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FossilListComponent } from './fossil-list.component';


describe('FossilListComponent', () => {
  let component: FossilListComponent;
  let fixture: ComponentFixture<FossilListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FossilListComponent ],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FossilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
