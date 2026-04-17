import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedConsolidatedComponent } from './revised-consolidated.component';

describe('RevisedConsolidatedComponent', () => {
  let component: RevisedConsolidatedComponent;
  let fixture: ComponentFixture<RevisedConsolidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisedConsolidatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
