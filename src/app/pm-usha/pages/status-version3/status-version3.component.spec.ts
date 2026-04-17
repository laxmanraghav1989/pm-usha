import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusVersion3Component } from './status-version3.component';

describe('StatusVersion3Component', () => {
  let component: StatusVersion3Component;
  let fixture: ComponentFixture<StatusVersion3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusVersion3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusVersion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
