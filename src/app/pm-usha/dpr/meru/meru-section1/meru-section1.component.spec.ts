import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeruSection1Component } from './meru-section1.component';

describe('MeruSection1Component', () => {
  let component: MeruSection1Component;
  let fixture: ComponentFixture<MeruSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeruSection1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeruSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
