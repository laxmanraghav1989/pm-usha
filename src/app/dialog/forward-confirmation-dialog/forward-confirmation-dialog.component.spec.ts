import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardConfirmationDialogComponent } from './forward-confirmation-dialog.component';

describe('ForwardConfirmationDialogComponent', () => {
  let component: ForwardConfirmationDialogComponent;
  let fixture: ComponentFixture<ForwardConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
