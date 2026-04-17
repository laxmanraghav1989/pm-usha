import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputOutcomesReportComponent } from './output-outcomes-report.component';

describe('OutputOutcomesReportComponent', () => {
  let component: OutputOutcomesReportComponent;
  let fixture: ComponentFixture<OutputOutcomesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputOutcomesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputOutcomesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
