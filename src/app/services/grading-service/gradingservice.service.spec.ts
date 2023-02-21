import { TestBed } from '@angular/core/testing';

import { GradingserviceService } from './gradingservice.service';

describe('GradingserviceService', () => {
  let service: GradingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
