import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVeiwComponent } from './report-veiw.component';

describe('ReportVeiwComponent', () => {
  let component: ReportVeiwComponent;
  let fixture: ComponentFixture<ReportVeiwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportVeiwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVeiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
