import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedConsolidatedListComponent } from './revised-consolidated-list.component';

describe('RevisedConsolidatedListComponent', () => {
  let component: RevisedConsolidatedListComponent;
  let fixture: ComponentFixture<RevisedConsolidatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisedConsolidatedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedConsolidatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
