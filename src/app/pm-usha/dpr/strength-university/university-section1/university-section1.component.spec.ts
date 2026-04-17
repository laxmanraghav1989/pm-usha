import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitySection1Component } from './university-section1.component';

describe('UniversitySection1Component', () => {
  let component: UniversitySection1Component;
  let fixture: ComponentFixture<UniversitySection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversitySection1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitySection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
