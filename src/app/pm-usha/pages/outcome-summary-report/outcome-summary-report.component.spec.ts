import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeSummaryReportComponent } from './outcome-summary-report.component';

describe('OutcomeSummaryReportComponent', () => {
  let component: OutcomeSummaryReportComponent;
  let fixture: ComponentFixture<OutcomeSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
