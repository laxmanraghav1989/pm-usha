import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateIssuesComponent } from './state-issues.component';

describe('StateIssuesComponent', () => {
  let component: StateIssuesComponent;
  let fixture: ComponentFixture<StateIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
