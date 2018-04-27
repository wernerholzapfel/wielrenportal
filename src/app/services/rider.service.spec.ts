import { TestBed, inject } from '@angular/core/testing';

import { RiderService } from './rider.service';

describe('RiderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiderService]
    });
  });

  it('should be created', inject([RiderService], (service: RiderService) => {
    expect(service).toBeTruthy();
  }));
});
