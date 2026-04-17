import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAchievementSummaryComponent } from './target-achievement-summary.component';

describe('TargetAchievementSummaryComponent', () => {
  let component: TargetAchievementSummaryComponent;
  let fixture: ComponentFixture<TargetAchievementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAchievementSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAchievementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
