import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmprogresmonitComponent } from './pmprogresmonit.component';

describe('PmprogresmonitComponent', () => {
  let component: PmprogresmonitComponent;
  let fixture: ComponentFixture<PmprogresmonitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmprogresmonitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmprogresmonitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
