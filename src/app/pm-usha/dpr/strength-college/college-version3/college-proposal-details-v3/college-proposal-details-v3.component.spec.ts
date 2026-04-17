import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeProposalDetailsV3Component } from './college-proposal-details-v3.component';

describe('CollegeProposalDetailsV3Component', () => {
  let component: CollegeProposalDetailsV3Component;
  let fixture: ComponentFixture<CollegeProposalDetailsV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeProposalDetailsV3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeProposalDetailsV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
