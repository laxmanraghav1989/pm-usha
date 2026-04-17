import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprConsolidatedComponent } from './dpr-consolidated.component';

describe('DprConsolidatedComponent', () => {
  let component: DprConsolidatedComponent;
  let fixture: ComponentFixture<DprConsolidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprConsolidatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DprConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
