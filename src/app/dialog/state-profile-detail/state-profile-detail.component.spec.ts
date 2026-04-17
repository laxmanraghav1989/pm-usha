import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProfileDetailComponent } from './state-profile-detail.component';

describe('StateProfileDetailComponent', () => {
  let component: StateProfileDetailComponent;
  let fixture: ComponentFixture<StateProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateProfileDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
