import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallRemarkComponent } from './overall-remark.component';

describe('OverallRemarkComponent', () => {
  let component: OverallRemarkComponent;
  let fixture: ComponentFixture<OverallRemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallRemarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
