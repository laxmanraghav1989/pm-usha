import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeruSection5Component } from './meru-section5.component';

describe('MeruSection5Component', () => {
  let component: MeruSection5Component;
  let fixture: ComponentFixture<MeruSection5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeruSection5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeruSection5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
