import { TestBed } from '@angular/core/testing';

import { BugService } from './bug.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BugService', () => {
  let service: BugService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
