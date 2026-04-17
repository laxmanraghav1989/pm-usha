import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeProposalDetailsComponent } from './college-proposal-details.component';

describe('CollegeProposalDetailsComponent', () => {
  let component: CollegeProposalDetailsComponent;
  let fixture: ComponentFixture<CollegeProposalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeProposalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeProposalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
