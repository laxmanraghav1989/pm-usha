import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProfileScrutinyComponent } from './state-profile-scrutiny.component';

describe('StateProfileScrutinyComponent', () => {
  let component: StateProfileScrutinyComponent;
  let fixture: ComponentFixture<StateProfileScrutinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateProfileScrutinyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateProfileScrutinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
