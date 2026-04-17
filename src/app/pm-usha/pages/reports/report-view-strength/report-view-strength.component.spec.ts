import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewStrengthComponent } from './report-view-strength.component';

describe('ReportViewStrengthComponent', () => {
  let component: ReportViewStrengthComponent;
  let fixture: ComponentFixture<ReportViewStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportViewStrengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
