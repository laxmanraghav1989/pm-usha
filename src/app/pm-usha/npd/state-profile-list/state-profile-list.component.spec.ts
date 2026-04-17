import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProfileListComponent } from './state-profile-list.component';

describe('StateProfileListComponent', () => {
  let component: StateProfileListComponent;
  let fixture: ComponentFixture<StateProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateProfileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
