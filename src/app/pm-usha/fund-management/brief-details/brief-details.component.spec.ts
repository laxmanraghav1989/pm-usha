import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDetailsComponent } from './brief-details.component';

describe('ProposalDetailsComponent', () => {
  let component: BriefDetailsComponent;
  let fixture: ComponentFixture<BriefDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriefDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
