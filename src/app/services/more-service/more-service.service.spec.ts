import { TestBed } from '@angular/core/testing';

import { MoreServiceService } from './more-service.service';

describe('MoreServiceService', () => {
  let service: MoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
