import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailManagementSubmitComponent } from './email-management-submit.component';

describe('EmailManagementSubmitComponent', () => {
  let component: EmailManagementSubmitComponent;
  let fixture: ComponentFixture<EmailManagementSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailManagementSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailManagementSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
