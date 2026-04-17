import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsCollegeComponent } from './view-ins-college.component';

describe('ViewInsCollegeComponent', () => {
  let component: ViewInsCollegeComponent;
  let fixture: ComponentFixture<ViewInsCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInsCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInsCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
