import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemTaggingComponent } from './project-item-tagging.component';

describe('ProjectItemTaggingComponent', () => {
  let component: ProjectItemTaggingComponent;
  let fixture: ComponentFixture<ProjectItemTaggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemTaggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemTaggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
