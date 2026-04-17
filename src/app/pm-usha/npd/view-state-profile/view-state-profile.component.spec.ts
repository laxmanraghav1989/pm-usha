import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStateProfileComponent } from './view-state-profile.component';

describe('ViewStateProfileComponent', () => {
  let component: ViewStateProfileComponent;
  let fixture: ComponentFixture<ViewStateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStateProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
