import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  ProposalSelectionComponent } from './proposal-selection.component';

describe('OverallUcComponent', () => {
  let component: ProposalSelectionComponent;
  let fixture: ComponentFixture<ProposalSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
