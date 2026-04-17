import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GieiOutcomesV3Component } from './giei-outcomes-v3.component';

describe('GieiOutcomesV3Component', () => {
  let component: GieiOutcomesV3Component;
  let fixture: ComponentFixture<GieiOutcomesV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GieiOutcomesV3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GieiOutcomesV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
