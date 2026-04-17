import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeViewEquityComponent } from './outcome-view-equity.component';

describe('OutcomeViewEquityComponent', () => {
  let component: OutcomeViewEquityComponent;
  let fixture: ComponentFixture<OutcomeViewEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeViewEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeViewEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
