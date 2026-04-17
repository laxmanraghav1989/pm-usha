import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionModelComponent } from './sanction-model.component';

describe('SanctionModelComponent', () => {
  let component: SanctionModelComponent;
  let fixture: ComponentFixture<SanctionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
