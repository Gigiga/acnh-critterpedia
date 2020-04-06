import { TestBed } from '@angular/core/testing';

import { FishService } from './fish.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FishService', () => {
  let service: FishService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
