import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloginDialogComponent } from './relogin-dialog.component';

describe('ReloginDialogComponent', () => {
  let component: ReloginDialogComponent;
  let fixture: ComponentFixture<ReloginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloginDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
