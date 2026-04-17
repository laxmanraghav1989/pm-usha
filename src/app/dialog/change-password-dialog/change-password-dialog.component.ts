import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { Common } from 'src/app/shared/common';
import { MustMatch } from 'src/app/utility/custome-validators';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  cancelButtonText: string = 'Close';
  confirmButtonText = "Change Password";
  userId: string | null;
  password: FormGroup;
  captchaText: any;
  encodeCaptcha: any;
  show: boolean | undefined;
  show1: boolean | undefined;
  isFormInvalid: boolean = false;
  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public fb: FormBuilder,
    public userService: UserService, public apiService: ApiService, public common: Common,
    public sanitizer: DomSanitizer, public encrypt: EncryptDecrypt, public router: Router, public notify: NotificationService, public getService: GetService) {
    this.userId = sessionStorage.getItem('userName');
    let passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&<>`~^()-_+=|"'{}\s]{8,}$/;
    this.password = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: ['', [Validators.required]],
      userId: [this.userId, []],
      captcha: ['', [Validators.required]]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });

  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getCaptcha();
    }, 1000);

  }
  change(data: any) {

    let payload = {
      oldPassword: this.encrypt.getEncryptedValue(data.oldPassword),
      newPassword: this.encrypt.getEncryptedValue(data.newPassword),
      // confirmPassword: this.encrypt.getEncryptedValue(data.confirmPassword),
      userId: data.userId,
    }
    this.userService.changePassword(payload).subscribe(res => {
      let status = this.encrypt.getDecryptedValue(res.status)
      if (status === '200') {
        let message = this.encrypt.getDecryptedValue(res.message);
        this.notify.showValidationMessage(message);
        this.dialogRef.close(true)
        let ele = {
          changePass: true
        }
        this.common.reLogin(ele);
        sessionStorage.removeItem('token');
      }
    }, err => {
      let status = this.encrypt.getDecryptedValue(err.error.status)
      if (status === "400") {
        this.getCaptcha();
        this.notify.showValidationMessage('The old password you have entered is incorrect')
      }
    })


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
  showpassword1() {
    this.show1 = !this.show1;
  }
}
