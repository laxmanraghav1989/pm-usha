import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStrengthRevisionComponent } from './view-strength-revision.component';

describe('ViewStrengthRevisionComponent', () => {
  let component: ViewStrengthRevisionComponent;
  let fixture: ComponentFixture<ViewStrengthRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStrengthRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStrengthRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
