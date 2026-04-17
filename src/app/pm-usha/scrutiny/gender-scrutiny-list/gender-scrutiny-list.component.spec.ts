import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderScrutinyListComponent } from './gender-scrutiny-list.component';

describe('GenderScrutinyListComponent', () => {
  let component: GenderScrutinyListComponent;
  let fixture: ComponentFixture<GenderScrutinyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderScrutinyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderScrutinyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
