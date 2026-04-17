import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeruSection4Component } from './meru-section4.component';

describe('MeruSection4Component', () => {
  let component: MeruSection4Component;
  let fixture: ComponentFixture<MeruSection4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeruSection4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeruSection4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
