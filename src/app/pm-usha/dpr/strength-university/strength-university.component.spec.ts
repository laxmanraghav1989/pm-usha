import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthUniversityComponent } from './strength-university.component';

describe('StrengthUniversityComponent', () => {
  let component: StrengthUniversityComponent;
  let fixture: ComponentFixture<StrengthUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthUniversityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
