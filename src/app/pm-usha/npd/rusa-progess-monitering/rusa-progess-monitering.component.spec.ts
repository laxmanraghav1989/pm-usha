import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RusaProgessMoniteringComponent } from './rusa-progess-monitering.component';

describe('RusaProgessMoniteringComponent', () => {
  let component: RusaProgessMoniteringComponent;
  let fixture: ComponentFixture<RusaProgessMoniteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RusaProgessMoniteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RusaProgessMoniteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
