import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfdChecklistComponent } from './ifd-checklist.component';

describe('IfdChecklistComponent', () => {
  let component: IfdChecklistComponent;
  let fixture: ComponentFixture<IfdChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfdChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfdChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
