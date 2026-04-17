import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeOutcomesComponent } from './college-outcomes.component';

describe('CollegeOutcomesComponent', () => {
  let component: CollegeOutcomesComponent;
  let fixture: ComponentFixture<CollegeOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
