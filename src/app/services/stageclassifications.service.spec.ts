import { TestBed, inject } from '@angular/core/testing';

import { ClassificationsService } from './stageclassifications.service';

describe('StageclassificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassificationsService]
    });
  });

  it('should be created', inject([ClassificationsService], (service: ClassificationsService) => {
    expect(service).toBeTruthy();
  }));
});
