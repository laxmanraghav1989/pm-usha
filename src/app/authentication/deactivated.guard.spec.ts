import { TestBed } from '@angular/core/testing';

import { DeactivatedGuard } from './deactivated.guard';

describe('DeactivatedGuard', () => {
  let guard: DeactivatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeactivatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
