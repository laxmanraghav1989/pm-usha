import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmdCollegeComponent } from './nmd-college.component';

describe('NmdCollegeComponent', () => {
  let component: NmdCollegeComponent;
  let fixture: ComponentFixture<NmdCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmdCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmdCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
