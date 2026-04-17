import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionLockUnlockComponent } from './revision-lock-unlock.component';

describe('RevisionLockUnlockComponent', () => {
  let component: RevisionLockUnlockComponent;
  let fixture: ComponentFixture<RevisionLockUnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionLockUnlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionLockUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
