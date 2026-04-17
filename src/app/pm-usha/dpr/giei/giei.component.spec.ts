import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GIEIComponent } from './giei.component';

describe('GIEIComponent', () => {
  let component: GIEIComponent;
  let fixture: ComponentFixture<GIEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GIEIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GIEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
