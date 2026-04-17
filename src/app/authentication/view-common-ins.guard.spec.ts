import { TestBed } from '@angular/core/testing';

import { ViewCommonInsGuard } from './view-common-ins.guard';

describe('ViewCommonInsGuard', () => {
  let guard: ViewCommonInsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewCommonInsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
