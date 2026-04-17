import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-forward-confirmation-dialog',
  templateUrl: './forward-confirmation-dialog.component.html',
  styleUrls: ['./forward-confirmation-dialog.component.scss']
})
export class ForwardConfirmationDialogComponent implements OnInit {
mobileNo:string=''
emailId:string='';
latestId: number = 0;
emailOtpV:string;
mobileOtpV:string;
successVerifyOTP: boolean = false;
successVerifyMobileOTP: boolean = false;
hide: boolean = true;
hideE: boolean = true;
displayE: any;
display: any;
emailOtp: boolean = false;
mobileOtp: boolean = false;
  constructor(public dialogRef: MatDialogRef<ForwardConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public sharedService: SharedService, public api: ApiService, 
    public notification: NotificationService, public postService:PostService,public encrypt: EncryptDecrypt) { }

  ngOnInit(): void {
    this.mobileNo=sessionStorage.getItem('mobile')
    this.emailId=sessionStorage.getItem('emailId')
    this.timer(1)
    this.timerE(1)
  }

save(){
  if(this.emailId&&this.mobileNo){
    this.verifyEmailOTP()
    this.verifyMobileOTP()
  }
 
}

  verifyEmailOTP() {
    let email = this.encrypt.getEncryptedValue(this.emailId);
    this.postService.verifyEOTP(email, this.emailOtpV).subscribe((res) => {
      let status = this.encrypt.getDecryptedValue(res.status)
      if (status === '200') {
        this.notification.showSuccessMessage('Email OTP verify successfully!!!');
        this.successVerifyOTP = true;
        this.hideE = false;
        this.emailOtp = false;
      }
    },
      (err) => { }
    );
  }

  verifyMobileOTP() {
    this.postService.verifyMOTP(this.encrypt.getEncryptedValue(this.mobileNo), this.mobileOtpV).subscribe((res) => {
      let status = this.encrypt.getDecryptedValue(res.status)
      if (status === '200') {
        this.notification.showSuccessMessage('Mobile OTP verify successfully!!!');
        this.successVerifyMobileOTP = true;
        this.hide = false;
        this.mobileOtp = false;

      }
    },
      (err) => { }
    );
  }

  sendEmailOTP() {

    this.postService.sendEmail(this.encrypt.getEncryptedValue(this.emailId), this.latestId).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(`OTP has been sent successfully to ${this.emailId}.Please enter the same OTP.`)
        this.timerE(1);
        this.sendMobileOTP();
        this.emailOtp = true;
        this.latestId = res.data;
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

    
  }

  sendMobileOTP() {
    this.postService.sendMobile(this.encrypt.getEncryptedValue(this.mobileNo), this.latestId).subscribe((res) => {
      if (res.status === 200) {
        this.latestId = res.data;
        this.mobileOtp = true;
        this.notification.showSuccessMessage(`OTP has been sent successfully to ${this.mobileNo}.Please enter the same OTP.`)
       this.timer(1);
      }
    },
      (err) => { }
    );
  }

  timer(minute: any) {
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
  
  
}
