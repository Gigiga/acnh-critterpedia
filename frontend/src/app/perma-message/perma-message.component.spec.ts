import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermaMessageComponent } from './perma-message.component';

describe('PermaMessageComponent', () => {
  let component: PermaMessageComponent;
  let fixture: ComponentFixture<PermaMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermaMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermaMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
