import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeruRevisionComponent } from './view-meru-revision.component';

describe('ViewMeruRevisionComponent', () => {
  let component: ViewMeruRevisionComponent;
  let fixture: ComponentFixture<ViewMeruRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeruRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeruRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
