import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESignSuccessComponent } from './e-sign-success.component';

describe('ESignSuccessComponent', () => {
  let component: ESignSuccessComponent;
  let fixture: ComponentFixture<ESignSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESignSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESignSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
