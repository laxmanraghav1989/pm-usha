import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESignFundComponent } from './e-sign-fund.component';

describe('ESignFundComponent', () => {
  let component: ESignFundComponent;
  let fixture: ComponentFixture<ESignFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESignFundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESignFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
