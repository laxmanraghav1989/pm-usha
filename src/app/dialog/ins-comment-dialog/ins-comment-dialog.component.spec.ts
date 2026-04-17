import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsCommentDialogComponent } from './ins-comment-dialog.component';

describe('InsCommentDialogComponent', () => {
  let component: InsCommentDialogComponent;
  let fixture: ComponentFixture<InsCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsCommentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
