import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEquityRevisionComponent } from './view-equity-revision.component';

describe('ViewEquityRevisionComponent', () => {
  let component: ViewEquityRevisionComponent;
  let fixture: ComponentFixture<ViewEquityRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEquityRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEquityRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
