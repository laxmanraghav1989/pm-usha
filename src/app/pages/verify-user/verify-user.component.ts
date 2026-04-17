import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { MustMatch } from 'src/app/utility/custome-validators';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  public routers: typeof routes = routes;
  forgotPass: FormGroup;
  password: FormGroup
  isFormInvalid: boolean = false;
  captchaText: any;
  encodeCaptcha: any;
  showForgot: boolean;
  successVerifyOTP: boolean = false;
  hideE: boolean = true;
  displayE: any;
  emailOtp: boolean = false;
  mobileOtp: boolean = false;
  successVerifyMobileOTP: boolean = false;
  hide: boolean = true;
  display: any;
  show: boolean = false;
  latestId: number = 0;
  constructor(public fb: FormBuilder, public cdRef: ChangeDetectorRef, public api: ApiService,
    public notification: NotificationService, public sanitizer: DomSanitizer, public encrypt: EncryptDecrypt,
    public getService: GetService, public router: Router, public route: ActivatedRoute, public postService: PostService, public common: Common) {
    let passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&<>`~^()-_+=|"'{}\s]{8,}$/;
    this.forgotPass = this.fb.group({
      userId: ['', [Validators.required]]
    });
    this.password = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      email: ['', []],
      emailOtp: ['', []],
      emailX: { value: '', disabled: true },
      mobile: ['', []],
      mobileOtp: ['', []],
      mobileX: { value: '', disabled: true }

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }


  ngOnInit(): void {
    this.getCaptcha();
  }
  getCaptcha() {
    this.getService.getCaptchaText().subscribe((resp: any) => {
      this.captchaText = this.sanitizer.bypassSecurityTrustUrl(resp.capcha);
      this.encodeCaptcha = resp.data;
    }, err => {
    });
  }
  verifyCaptcha() {
    this.api.verifyGetCaptcha(this.password.controls['captcha'].value, this.encodeCaptcha).subscribe(res => {
      if (res.message == 'Captcha Valid') {
        if (this.password.controls['emailOtp'].value) {
          this.verifyEmailOTP();
        } if (this.password.controls['mobileOtp'].value) {
          this.verifyMobileOTP()
        }
      }
      else {
        this.notification.showValidationMessage('Invalid Captcha !!!')
      }
    }, err => {
    })
  }
  verifyUser() {
    if (this.forgotPass.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return
    } else {
      this.isFormInvalid = false;
    }
    this.postService.getUserVerify(this.forgotPass.controls['userId'].value).subscribe(res => {
      if (res && res.length) {
        let x = this.forgotPass.controls['userId'].value
        if (x.toLowerCase() === res['0'].userName.toLowerCase()) {
          this.showForgot = true;
          let str = this.encrypt.getDecryptedValue(res['0'].emailId)
          str = str.split('');
          let finalArr = [];
          let len = str.indexOf('@');
          str.forEach((item, pos) => {
            (pos >= 1 && pos <= len - 2) ? finalArr.push('*') : finalArr.push(str[pos]);
          })
          let finalVal = finalArr.join('');
          this.password.get('emailX').setValue(finalVal)
          this.password.get('email').setValue(this.encrypt.getDecryptedValue(res['0']?.emailId))

          let textMobile = this.encrypt.getDecryptedValue(res['0']?.mobile?.toString());
          let resultMobile = textMobile.substring(2, 7).replace('XXXXX');
          let mobileX = textMobile.replace(resultMobile, 'XXXXX')
          this.password.get('mobileX').setValue(mobileX)
          this.password.get('mobile').setValue(this.encrypt.getDecryptedValue(res['0']?.mobile))
        } else {
          this.notification.showValidationMessage('Invalid user id/password')
        }
      } else {
        this.notification.showValidationMessage('Invalid user id/password')
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  sendEmailOTP() {
    this.postService.sendEmail(this.encrypt.getEncryptedValue(this.password.controls['email'].value), this.latestId).subscribe(res => {
      const status = this.encrypt.getDecryptedValue(res.status)
      if (status === "200") {
        const data12 = this.encrypt.getDecryptedValue(res.data)
        this.notification.showSuccessMessage(`OTP has been sent successfully to ${this.password.controls['emailX'].value}.Please enter the same OTP.`)
        this.timerE(1);
        this.emailOtp = true;
        this.latestId = data12;
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  verifyEmailOTP() {
    const email=this.encrypt.getEncryptedValue(this.password.controls['email'].value)
    const emailOTP=this.encrypt.getEncryptedValue(this.password.controls['emailOtp'].value)
    this.postService.verifyEOTP(email, emailOTP).subscribe((res) => {
      let status = this.encrypt.getDecryptedValue(res.status);

      if (status === '200') {
        this.notification.showSuccessMessage('Email OTP verify successfully!!!');
        this.successVerifyOTP = true;
        this.hideE = false;
        this.emailOtp = false;
        this.forgot();
      }
    },
      (err) => {
        let status = this.encrypt.getDecryptedValue(err.error.status)
        this.getCaptcha()
      }
    );
  }
  sendMobileOTP() {
    this.postService.sendMobile(this.encrypt.getEncryptedValue(this.password.controls['mobile'].value), this.latestId).subscribe((res) => {
      const status = this.encrypt.getDecryptedValue(res.status);
      const message = this.encrypt.getDecryptedValue(res.message);
    //  const status = this.encrypt.getDecryptedValue(res.status);
      if (status === "200") {
        const data12 = this.encrypt.getDecryptedValue(res.data)
        this.latestId = +data12;
        this.mobileOtp = true;
        this.notification.showSuccessMessage(`OTP has been sent successfully to ${this.password.controls['mobileX'].value}.Please enter the same OTP.`)
        this.timer(1);
      }
    },
      (err) => {
        let status = this.encrypt.getDecryptedValue(err.error.status)
        this.getCaptcha()
      }
    );
  }
  verifyMobileOTP() {

    const mobile=this.encrypt.getEncryptedValue(this.password.controls['mobile'].value);
    const mobileOTP =this.encrypt.getEncryptedValue(this.password.controls['mobileOtp'].value)
    this.postService.verifyMOTP(mobile, mobileOTP).subscribe((res) => {
      let status = this.encrypt.getDecryptedValue(res.status)
      const mobile = this.encrypt.getDecryptedValue(res.message)
      if (status === '200') {
        this.notification.showSuccessMessage('Mobile OTP verify successfully!!!');
        this.successVerifyMobileOTP = true;
        this.hide = false;
        this.mobileOtp = false;
        this.forgot();

      }
    },
      (err) => {
        this.getCaptcha()
        let status = this.encrypt.getDecryptedValue(err.error.status)
        this.latestId=0;
        if(status){
          this.notification.showSuccessMessage('Invalid OTP');
        }
      }
    );
  }
  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  timerE(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.displayE = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        clearInterval(timer);
      }

    }, 1000);
  }

  forgot() {
    if (this.password.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      this.getCaptcha()
      return
    } else {
      this.isFormInvalid = false;
    }
    let payload = {
      "password": this.encrypt.getEncryptedValue(this.password.controls['password'].value),
      "confirmPassword": this.encrypt.getEncryptedValue(this.password.controls['confirmPassword'].value),
      "email": this.encrypt.getEncryptedValue(this.password.controls['email'].value),
      "emailOtp": this.encrypt.getEncryptedValue(this.password.controls['emailOtp'].value),
      "mobile": this.encrypt.getEncryptedValue(this.password.controls['mobile'].value),
      "mobileOtp": this.encrypt.getEncryptedValue(this.password.controls['mobileOtp'].value),
      "loginId": this.forgotPass.controls['userId'].value
    }
    this.postService.forgot(payload).subscribe(res => {
      let status = this.encrypt.getDecryptedValue(res.status)
        if (status === '200') {
          this.latestId=0;
        this.successVerifyOTP = true;
        let ele = {
          resetPass: true
        }
        this.common.reLogin(ele)


      }
    }, err => {
      this.notification.showValidationMessage(err.error.message)
      this.getCaptcha()
    })
  }
  showpassword() {
    this.show = !this.show;
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  restrictNumeric(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }
}
