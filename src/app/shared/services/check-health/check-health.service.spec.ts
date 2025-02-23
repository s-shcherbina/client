import { TestBed } from '@angular/core/testing';

import { CheckHealthService } from './check-health.service';

describe('CheckHealthService', () => {
  let service: CheckHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
