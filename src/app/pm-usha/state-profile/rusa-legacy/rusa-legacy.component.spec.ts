import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RusaLegacyComponent } from './rusa-legacy.component';

describe('RusaLegacyComponent', () => {
  let component: RusaLegacyComponent;
  let fixture: ComponentFixture<RusaLegacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RusaLegacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RusaLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
