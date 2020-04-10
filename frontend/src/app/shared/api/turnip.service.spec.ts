import { TestBed } from '@angular/core/testing';

import { TurnipService } from './turnip.service';

describe('TurnipService', () => {
  let service: TurnipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
