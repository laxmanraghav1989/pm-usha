import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityProposalDetailsComponent } from './university-proposal-details.component';

describe('UniversityProposalDetailsComponent', () => {
  let component: UniversityProposalDetailsComponent;
  let fixture: ComponentFixture<UniversityProposalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityProposalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityProposalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
