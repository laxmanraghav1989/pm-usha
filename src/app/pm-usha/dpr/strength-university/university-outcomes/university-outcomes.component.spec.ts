import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityOutcomesComponent } from './university-outcomes.component';

describe('UniversityOutcomesComponent', () => {
  let component: UniversityOutcomesComponent;
  let fixture: ComponentFixture<UniversityOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
