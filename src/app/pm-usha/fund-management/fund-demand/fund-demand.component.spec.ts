import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundDemandComponent } from './fund-demand.component';

describe('FundDemandComponent', () => {
  let component: FundDemandComponent;
  let fixture: ComponentFixture<FundDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundDemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
