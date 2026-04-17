import { TestBed } from '@angular/core/testing';

import { ViewNmdcGuard } from './view-nmdc.guard';

describe('ViewNmdcGuard', () => {
  let guard: ViewNmdcGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewNmdcGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
