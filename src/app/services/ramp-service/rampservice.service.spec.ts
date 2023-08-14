import { TestBed } from '@angular/core/testing';

import { RampserviceService } from './rampservice.service';

describe('RampserviceService', () => {
  let service: RampserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RampserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
