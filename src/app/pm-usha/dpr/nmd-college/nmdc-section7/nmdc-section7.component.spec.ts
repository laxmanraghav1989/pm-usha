import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmdcSection7Component } from './nmdc-section7.component';

describe('NmdcSection7Component', () => {
  let component: NmdcSection7Component;
  let fixture: ComponentFixture<NmdcSection7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmdcSection7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmdcSection7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
