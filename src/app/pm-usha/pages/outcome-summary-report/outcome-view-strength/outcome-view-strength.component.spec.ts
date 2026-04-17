import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeViewStrengthComponent } from './outcome-view-strength.component';

describe('OutcomeViewStrengthComponent', () => {
  let component: OutcomeViewStrengthComponent;
  let fixture: ComponentFixture<OutcomeViewStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeViewStrengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeViewStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
