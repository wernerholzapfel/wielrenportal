import { TestBed, inject } from '@angular/core/testing';

import { EtappeService } from './etappe.service';

describe('EtappeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtappeService]
    });
  });

  it('should be created', inject([EtappeService], (service: EtappeService) => {
    expect(service).toBeTruthy();
  }));
});
