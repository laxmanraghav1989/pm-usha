import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmUshaComponent } from './pm-usha.component';

describe('PmUshaComponent', () => {
  let component: PmUshaComponent;
  let fixture: ComponentFixture<PmUshaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmUshaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmUshaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
