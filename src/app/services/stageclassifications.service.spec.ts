import { TestBed, inject } from '@angular/core/testing';

import { StageclassificationsService } from './stageclassifications.service';

describe('StageclassificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StageclassificationsService]
    });
  });

  it('should be created', inject([StageclassificationsService], (service: StageclassificationsService) => {
    expect(service).toBeTruthy();
  }));
});
