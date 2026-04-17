import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeViewMeruComponent } from './outcome-view-meru.component';

describe('OutcomeViewMeruComponent', () => {
  let component: OutcomeViewMeruComponent;
  let fixture: ComponentFixture<OutcomeViewMeruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeViewMeruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeViewMeruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
