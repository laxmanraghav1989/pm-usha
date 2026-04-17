import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionFinalListComponent } from './revision-final-list.component';

describe('RevisionFinalListComponent', () => {
  let component: RevisionFinalListComponent;
  let fixture: ComponentFixture<RevisionFinalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionFinalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionFinalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
