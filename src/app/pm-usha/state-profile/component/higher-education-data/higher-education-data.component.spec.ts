import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherEducationDataComponent } from './higher-education-data.component';

describe('HigherEducationDataComponent', () => {
  let component: HigherEducationDataComponent;
  let fixture: ComponentFixture<HigherEducationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherEducationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HigherEducationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
