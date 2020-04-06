import { TestBed } from '@angular/core/testing';

import { FossilService } from './fossil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FossilService', () => {
  let service: FossilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FossilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
