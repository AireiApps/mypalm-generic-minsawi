import { TestBed } from '@angular/core/testing';

import { EngineerServiceService } from './engineer-service.service';

describe('EngineerServiceService', () => {
  let service: EngineerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
