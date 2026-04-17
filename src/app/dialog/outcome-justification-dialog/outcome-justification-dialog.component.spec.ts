import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeJustificationDialogComponent } from './outcome-justification-dialog.component';

describe('OutcomeJustificationDialogComponent', () => {
  let component: OutcomeJustificationDialogComponent;
  let fixture: ComponentFixture<OutcomeJustificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeJustificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeJustificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
