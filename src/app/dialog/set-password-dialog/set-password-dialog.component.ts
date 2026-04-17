import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { MustMatch } from 'src/app/utility/custome-validators';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-set-password-dialog',
  templateUrl: './set-password-dialog.component.html',
  styleUrls: ['./set-password-dialog.component.scss']
})
export class SetPasswordDialogComponent implements OnInit {
  password: FormGroup
  confirmButtonText = "YES";
  cancelButtonText = "NO"
  captchaText: any;
  encodeCaptcha: any;
  isFormInvalid: boolean = false;
  show: boolean = false;
  constructor(public dialogRef: MatDialogRef<SetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public fb: FormBuilder, private apiService: ApiService,
    public sanitizer: DomSanitizer, public encrypt: EncryptDecrypt, public router: Router, public notify: NotificationService, public getService:GetService) {
    let passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&<>`~^()-_+=|"'{}\s]{8,}$/;
    this.password = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getCaptcha();
    }, 1000)
  }
  getCaptcha() {
    this.getService.getCaptchaText().subscribe((resp: any) => {
      this.captchaText = this.sanitizer.bypassSecurityTrustUrl(resp.capcha);
      this.encodeCaptcha = resp.data;
    }, err => {
    });
  }
  verifyCaptcha(data: any) {
    if (this.password.invalid) {
      this.notify.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false
    }
    this.apiService.verifyGetCaptcha(this.password.controls['captcha'].value, this.encodeCaptcha).subscribe(res => {
      if (res.message == 'Captcha Valid') {
        this.change(data);
      }
      else {
        this.notify.showValidationMessage('Invalid Captcha !!!')
      }
    }, err => {
    })
  }
  showpassword() {
    this.show = !this.show;
  }
  change(data: any) {
    if (this.password.invalid) {
      this.notify.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
    }
    if (!this.password.controls['newPassword'].value) {
      this.notify.showValidationMessage('Please adhere to Password Policy !!!');
      return;
    }
    let payload = {
      newPassword: this.encrypt.getEncryptedValue(data.newPassword),
      confirmPassword: this.encrypt.getEncryptedValue(data.confirmPassword),
      userId: this.element,
    }
    this.apiService.reset(payload).subscribe(res => {
      let status = this.encrypt.getDecryptedValue(res.status)
      if (status === '200') {
        this.dialogRef.close(true)
        this.notify.showSuccessMessage('Password reset successfully !!!!')
      }
    }, err => {
      // if (err.error.status === 400) {
      //   this.notify.showValidationMessage('The old password you have entered is incorrect')
      // }
    })
  }
}
