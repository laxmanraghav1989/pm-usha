import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMprDataComponent } from './latest-mpr-data.component';

describe('LatestMprDataComponent', () => {
  let component: LatestMprDataComponent;
  let fixture: ComponentFixture<LatestMprDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestMprDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestMprDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
