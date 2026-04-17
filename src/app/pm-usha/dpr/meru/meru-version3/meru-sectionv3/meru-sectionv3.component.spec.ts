import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeruSectionv3Component } from './meru-sectionv3.component';

describe('MeruSectionv3Component', () => {
  let component: MeruSectionv3Component;
  let fixture: ComponentFixture<MeruSectionv3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeruSectionv3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeruSectionv3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
