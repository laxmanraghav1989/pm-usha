import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadExploreComponent } from './read-explore.component';

describe('ReadExploreComponent', () => {
  let component: ReadExploreComponent;
  let fixture: ComponentFixture<ReadExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
