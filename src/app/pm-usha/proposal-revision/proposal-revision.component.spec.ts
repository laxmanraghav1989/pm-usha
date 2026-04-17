import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalRevisionComponent } from './proposal-revision.component';

describe('ProposalRevisionComponent', () => {
  let component: ProposalRevisionComponent;
  let fixture: ComponentFixture<ProposalRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
