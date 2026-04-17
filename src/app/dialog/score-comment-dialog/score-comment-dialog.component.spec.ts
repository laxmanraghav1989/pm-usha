import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCommentDialogComponent } from './score-comment-dialog.component';

describe('ScoreCommentDialogComponent', () => {
  let component: ScoreCommentDialogComponent;
  let fixture: ComponentFixture<ScoreCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreCommentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
