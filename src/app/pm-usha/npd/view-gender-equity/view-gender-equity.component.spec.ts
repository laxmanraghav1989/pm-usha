import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGenderEquityComponent } from './view-gender-equity.component';

describe('ViewGenderEquityComponent', () => {
  let component: ViewGenderEquityComponent;
  let fixture: ComponentFixture<ViewGenderEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGenderEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGenderEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
