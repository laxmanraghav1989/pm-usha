import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockStatusDialogComponent } from './unlock-status-dialog.component';

describe('UnlockStatusDialogComponent', () => {
  let component: UnlockStatusDialogComponent;
  let fixture: ComponentFixture<UnlockStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockStatusDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
