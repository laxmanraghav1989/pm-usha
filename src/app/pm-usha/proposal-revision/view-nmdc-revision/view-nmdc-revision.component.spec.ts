import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNmdcRevisionComponent } from './view-nmdc-revision.component';

describe('ViewNmdcRevisionComponent', () => {
  let component: ViewNmdcRevisionComponent;
  let fixture: ComponentFixture<ViewNmdcRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNmdcRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNmdcRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
