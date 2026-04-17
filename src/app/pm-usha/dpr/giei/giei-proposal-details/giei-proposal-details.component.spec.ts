import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GieiProposalDetailsComponent } from './giei-proposal-details.component';

describe('GieiProposalDetailsComponent', () => {
  let component: GieiProposalDetailsComponent;
  let fixture: ComponentFixture<GieiProposalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GieiProposalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GieiProposalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
