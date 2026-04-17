import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeSection1Component } from './college-section1.component';

describe('CollegeSection1Component', () => {
  let component: CollegeSection1Component;
  let fixture: ComponentFixture<CollegeSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeSection1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
