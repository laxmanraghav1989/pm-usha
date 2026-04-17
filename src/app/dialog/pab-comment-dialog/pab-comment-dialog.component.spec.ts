import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PabCommentDialogComponent } from './pab-comment-dialog.component';

describe('PabCommentDialogComponent', () => {
  let component: PabCommentDialogComponent;
  let fixture: ComponentFixture<PabCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PabCommentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PabCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
