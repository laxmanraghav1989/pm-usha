import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedProposalComponent } from './consolidated-proposal.component';

describe('ConsolidatedProposalComponent', () => {
  let component: ConsolidatedProposalComponent;
  let fixture: ComponentFixture<ConsolidatedProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
