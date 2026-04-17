import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictHigherEducationComponent } from './district-higher-education.component';

describe('DistrictHigherEducationComponent', () => {
  let component: DistrictHigherEducationComponent;
  let fixture: ComponentFixture<DistrictHigherEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictHigherEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictHigherEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
