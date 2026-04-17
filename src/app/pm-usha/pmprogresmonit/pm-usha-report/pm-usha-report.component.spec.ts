import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmUshaReportComponent } from './pm-usha-report.component';

describe('PmUshaReportComponent', () => {
  let component: PmUshaReportComponent;
  let fixture: ComponentFixture<PmUshaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmUshaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmUshaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
