import { TestBed } from '@angular/core/testing';

import { CeoServiceService } from './ceo-service.service';

describe('CeoServiceService', () => {
  let service: CeoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CeoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
