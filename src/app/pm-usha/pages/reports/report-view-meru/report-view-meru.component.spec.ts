import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewMeruComponent } from './report-view-meru.component';

describe('ReportViewMeruComponent', () => {
  let component: ReportViewMeruComponent;
  let fixture: ComponentFixture<ReportViewMeruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportViewMeruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewMeruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
