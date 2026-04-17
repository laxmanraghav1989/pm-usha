import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockConsolidatedDialogComponent } from './unlock-consolidated-dialog.component';

describe('UnlockConsolidatedDialogComponent', () => {
  let component: UnlockConsolidatedDialogComponent;
  let fixture: ComponentFixture<UnlockConsolidatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockConsolidatedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockConsolidatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
