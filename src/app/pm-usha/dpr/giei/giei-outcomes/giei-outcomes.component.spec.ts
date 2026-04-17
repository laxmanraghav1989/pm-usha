import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GieiOutcomesComponent } from './giei-outcomes.component';

describe('GieiOutcomesComponent', () => {
  let component: GieiOutcomesComponent;
  let fixture: ComponentFixture<GieiOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GieiOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GieiOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
