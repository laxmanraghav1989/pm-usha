import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmdcSection2Component } from './nmdc-section2.component';

describe('NmdcSection2Component', () => {
  let component: NmdcSection2Component;
  let fixture: ComponentFixture<NmdcSection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmdcSection2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmdcSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
