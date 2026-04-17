import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostBreakDialogComponent } from './cost-break-dialog.component';

describe('CostBreakDialogComponent', () => {
  let component: CostBreakDialogComponent;
  let fixture: ComponentFixture<CostBreakDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostBreakDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostBreakDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
