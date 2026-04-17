import { TestBed } from '@angular/core/testing';

import { UploadDocGuard } from './upload-doc.guard';

describe('UploadDocGuard', () => {
  let guard: UploadDocGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UploadDocGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
