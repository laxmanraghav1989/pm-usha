import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialLockUnlockComponent } from './partial-lock-unlock.component';

describe('PartialLockUnlockComponent', () => {
  let component: PartialLockUnlockComponent;
  let fixture: ComponentFixture<PartialLockUnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialLockUnlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialLockUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
