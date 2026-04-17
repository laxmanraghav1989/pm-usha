import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUtilizationComponent } from './view-utilization.component';

describe('ViewUtilizationComponent', () => {
  let component: ViewUtilizationComponent;
  let fixture: ComponentFixture<ViewUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUtilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
