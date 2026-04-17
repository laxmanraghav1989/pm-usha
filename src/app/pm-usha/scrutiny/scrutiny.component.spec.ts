import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyComponent } from './scrutiny.component';

describe('ScrutinyComponent', () => {
  let component: ScrutinyComponent;
  let fixture: ComponentFixture<ScrutinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrutinyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrutinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
