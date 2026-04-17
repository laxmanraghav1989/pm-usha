import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsGenderEquityComponent } from './view-ins-gender-equity.component';

describe('ViewInsGenderEquityComponent', () => {
  let component: ViewInsGenderEquityComponent;
  let fixture: ComponentFixture<ViewInsGenderEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInsGenderEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInsGenderEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
