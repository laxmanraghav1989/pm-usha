import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNoteOneComponent } from './status-note-one.component';

describe('StatusNoteOneComponent', () => {
  let component: StatusNoteOneComponent;
  let fixture: ComponentFixture<StatusNoteOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusNoteOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNoteOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
