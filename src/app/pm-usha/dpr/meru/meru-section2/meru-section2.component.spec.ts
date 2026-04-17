import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeruSection2Component } from './meru-section2.component';

describe('MeruSection2Component', () => {
  let component: MeruSection2Component;
  let fixture: ComponentFixture<MeruSection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeruSection2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeruSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
