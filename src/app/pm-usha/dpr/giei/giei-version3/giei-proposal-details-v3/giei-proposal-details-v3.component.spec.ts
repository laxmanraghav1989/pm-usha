import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GieiProposalDetailsV3Component } from './giei-proposal-details-v3.component';

describe('GieiProposalDetailsV3Component', () => {
  let component: GieiProposalDetailsV3Component;
  let fixture: ComponentFixture<GieiProposalDetailsV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GieiProposalDetailsV3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GieiProposalDetailsV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
