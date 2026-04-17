import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSmsDialogComponent } from './email-sms-dialog.component';

describe('EmailSmsDialogComponent', () => {
  let component: EmailSmsDialogComponent;
  let fixture: ComponentFixture<EmailSmsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSmsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSmsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
