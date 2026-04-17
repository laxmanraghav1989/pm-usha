import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeSection2Component } from './college-section2.component';

describe('CollegeSection2Component', () => {
  let component: CollegeSection2Component;
  let fixture: ComponentFixture<CollegeSection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeSection2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
