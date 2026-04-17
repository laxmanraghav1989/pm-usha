import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GieiSection1Component } from './giei-section1.component';

describe('GieiSection1Component', () => {
  let component: GieiSection1Component;
  let fixture: ComponentFixture<GieiSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GieiSection1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GieiSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
