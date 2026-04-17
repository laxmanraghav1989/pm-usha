import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeruCollegeUniversityV3Component } from './view-meru-college-university-v3.component';

describe('ViewMeruCollegeUniversityV3Component', () => {
  let component: ViewMeruCollegeUniversityV3Component;
  let fixture: ComponentFixture<ViewMeruCollegeUniversityV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeruCollegeUniversityV3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeruCollegeUniversityV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
