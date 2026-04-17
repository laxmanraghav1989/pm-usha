import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionPmushaListComponent } from './revision-pmusha-list.component';

describe('RevisionPmushaListComponent', () => {
  let component: RevisionPmushaListComponent;
  let fixture: ComponentFixture<RevisionPmushaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionPmushaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionPmushaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
