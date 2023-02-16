import { TestBed } from '@angular/core/testing';

import { PreloadingserviceService } from './preloadingservice.service';

describe('PreloadingserviceService', () => {
  let service: PreloadingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
