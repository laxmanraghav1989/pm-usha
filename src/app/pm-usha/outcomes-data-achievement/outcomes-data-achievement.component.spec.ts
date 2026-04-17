import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomesDataAchievementComponent } from './outcomes-data-achievement.component';

describe('OutcomesDataAchievementComponent', () => {
  let component: OutcomesDataAchievementComponent;
  let fixture: ComponentFixture<OutcomesDataAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomesDataAchievementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomesDataAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
