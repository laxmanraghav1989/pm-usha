import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefilledComponent } from './prefilled.component';

describe('PrefilledComponent', () => {
  let component: PrefilledComponent;
  let fixture: ComponentFixture<PrefilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefilledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
