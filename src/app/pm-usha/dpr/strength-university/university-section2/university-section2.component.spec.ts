import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitySection2Component } from './university-section2.component';

describe('UniversitySection2Component', () => {
  let component: UniversitySection2Component;
  let fixture: ComponentFixture<UniversitySection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversitySection2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitySection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
