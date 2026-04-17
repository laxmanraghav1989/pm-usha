import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomesDataTargetComponent } from './outcomes-data-target.component';

describe('OutcomesDataTargetComponent', () => {
  let component: OutcomesDataTargetComponent;
  let fixture: ComponentFixture<OutcomesDataTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomesDataTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomesDataTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
