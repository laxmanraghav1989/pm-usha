import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RusaProgressUpdationComponent } from './rusa-progress-updation.component';

describe('RusaProgressUpdationComponent', () => {
  let component: RusaProgressUpdationComponent;
  let fixture: ComponentFixture<RusaProgressUpdationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RusaProgressUpdationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RusaProgressUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
