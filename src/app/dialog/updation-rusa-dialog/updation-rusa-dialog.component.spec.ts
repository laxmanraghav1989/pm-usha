import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdationRusaDialogComponent } from './updation-rusa-dialog.component';

describe('UpdationRusaDialogComponent', () => {
  let component: UpdationRusaDialogComponent;
  let fixture: ComponentFixture<UpdationRusaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdationRusaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdationRusaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
