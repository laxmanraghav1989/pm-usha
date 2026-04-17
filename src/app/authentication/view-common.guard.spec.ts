import { TestBed } from '@angular/core/testing';

import { ViewCommonGuard } from './view-common.guard';

describe('ViewCommonGuard', () => {
  let guard: ViewCommonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewCommonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
