import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBreakupDialogComponent } from './score-breakup-dialog.component';

describe('ScoreBreakupDialogComponent', () => {
  let component: ScoreBreakupDialogComponent;
  let fixture: ComponentFixture<ScoreBreakupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreBreakupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBreakupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
