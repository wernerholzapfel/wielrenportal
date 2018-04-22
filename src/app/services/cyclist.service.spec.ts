import { TestBed, inject } from '@angular/core/testing';

import { CyclistService } from './cyclist.service';

describe('CyclistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CyclistService]
    });
  });

  it('should be created', inject([CyclistService], (service: CyclistService) => {
    expect(service).toBeTruthy();
  }));
});
