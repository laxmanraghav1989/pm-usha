import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAisheDialogComponent } from './confirm-aishe-dialog.component';

describe('ConfirmAisheDialogComponent', () => {
  let component: ConfirmAisheDialogComponent;
  let fixture: ComponentFixture<ConfirmAisheDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAisheDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAisheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
