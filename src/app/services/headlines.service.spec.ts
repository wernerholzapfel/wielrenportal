import { TestBed } from '@angular/core/testing';

import { HeadlinesService } from './headlines.service';

describe('HeadlinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadlinesService = TestBed.get(HeadlinesService);
    expect(service).toBeTruthy();
  });
});
