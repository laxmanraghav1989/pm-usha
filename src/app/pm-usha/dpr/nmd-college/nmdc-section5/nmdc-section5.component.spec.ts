import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmdcSection5Component } from './nmdc-section5.component';

describe('NmdcSection5Component', () => {
  let component: NmdcSection5Component;
  let fixture: ComponentFixture<NmdcSection5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmdcSection5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmdcSection5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
