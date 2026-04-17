import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmdcSection1Component } from './nmdc-section1.component';

describe('NmdcSection1Component', () => {
  let component: NmdcSection1Component;
  let fixture: ComponentFixture<NmdcSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmdcSection1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmdcSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
