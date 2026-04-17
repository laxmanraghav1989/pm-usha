import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewEquityComponent } from './report-view-equity.component';

describe('ReportViewEquityComponent', () => {
  let component: ReportViewEquityComponent;
  let fixture: ComponentFixture<ReportViewEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportViewEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
