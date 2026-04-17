import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMmerComponent } from './view-mmer.component';

describe('ViewMmerComponent', () => {
  let component: ViewMmerComponent;
  let fixture: ComponentFixture<ViewMmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
