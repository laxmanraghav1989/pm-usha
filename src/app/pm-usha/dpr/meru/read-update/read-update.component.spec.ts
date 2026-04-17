import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUpdateComponent } from './read-update.component';

describe('ReadUpdateComponent', () => {
  let component: ReadUpdateComponent;
  let fixture: ComponentFixture<ReadUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
