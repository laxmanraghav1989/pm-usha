import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEquityNmdcRevisionV3Component } from './view-equity-nmdc-revision-v3.component';

describe('ViewEquityNmdcRevisionV3Component', () => {
  let component: ViewEquityNmdcRevisionV3Component;
  let fixture: ComponentFixture<ViewEquityNmdcRevisionV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEquityNmdcRevisionV3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEquityNmdcRevisionV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
