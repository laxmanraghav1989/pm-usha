import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeSummaryComponent } from './outcome-summary.component';

describe('OutcomeSummaryComponent', () => {
  let component: OutcomeSummaryComponent;
  let fixture: ComponentFixture<OutcomeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
