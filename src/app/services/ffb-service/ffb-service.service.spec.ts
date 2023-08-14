import { TestBed } from '@angular/core/testing';

import { FfbServiceService } from './ffb-service.service';

describe('FfbServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FfbServiceService = TestBed.get(FfbServiceService);
    expect(service).toBeTruthy();
  });
});
