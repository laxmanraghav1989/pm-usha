import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeAchivementSummaryComponent } from './outcome-achivement-summary.component';

describe('OutcomeAchivementSummaryComponent', () => {
  let component: OutcomeAchivementSummaryComponent;
  let fixture: ComponentFixture<OutcomeAchivementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeAchivementSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeAchivementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
