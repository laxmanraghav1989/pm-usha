import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeruComponent } from './meru.component';

describe('MeruComponent', () => {
  let component: MeruComponent;
  let fixture: ComponentFixture<MeruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
