import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeScrutinyListComponent } from './college-scrutiny-list.component';

describe('CollegeScrutinyListComponent', () => {
  let component: CollegeScrutinyListComponent;
  let fixture: ComponentFixture<CollegeScrutinyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeScrutinyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeScrutinyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
