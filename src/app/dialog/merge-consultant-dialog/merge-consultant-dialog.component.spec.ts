import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeConsultantDialogComponent } from './merge-consultant-dialog.component';

describe('MergeConsultantDialogComponent', () => {
  let component: MergeConsultantDialogComponent;
  let fixture: ComponentFixture<MergeConsultantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeConsultantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeConsultantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
