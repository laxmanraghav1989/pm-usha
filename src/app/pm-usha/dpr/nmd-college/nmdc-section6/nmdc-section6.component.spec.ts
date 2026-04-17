import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmdcSection6Component } from './nmdc-section6.component';

describe('NmdcSection6Component', () => {
  let component: NmdcSection6Component;
  let fixture: ComponentFixture<NmdcSection6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmdcSection6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmdcSection6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
