import { TestBed, inject } from '@angular/core/testing';

import { TeamService } from './teams.service';

describe('TeamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamService]
    });
  });

  it('should be created', inject([TeamService], (service: TeamService) => {
    expect(service).toBeTruthy();
  }));
});
