import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-user-action-dialog',
  templateUrl: './user-action-dialog.component.html',
  styleUrls: ['./user-action-dialog.component.scss']
})
export class UserActionDialogComponent implements OnInit {
  userForm: FormGroup;
  genderList: Array<any> = [];
  emailRegex: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  mobileNoRegex: RegExp = /^[123456789]\d{9}$/;
  isFormInvalid: boolean
  oldFirstName: string = '';
  oldMobile: string = '';
  oldEmailId: string = '';
  oldGender: string = '';
  oldDesignation:string=''
  constructor(public dialogRef: MatDialogRef<UserActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public fb: FormBuilder, private encrypt: EncryptDecrypt, public postService: PostService, public notification: NotificationService) {
    this.userForm = this.fb.group({
      userId: { value: this.element.userName, disabled: true },
      emailId: [this.element.emailId, [Validators.required, Validators.pattern(this.emailRegex)]],
      gender: [this.element.gender, [Validators.required]],
      mobile: [this.element.mobile, [Validators.required, Validators.pattern(this.mobileNoRegex)]],
      firstName: [this.element.firstName.trim(), [Validators.required]],
      designation:[this.element.designation,[Validators.required]]
    })
    this.oldFirstName = this.element.firstName
    this.oldMobile = this.element.mobile
    this.oldEmailId = this.element.emailId
    this.oldGender = this.element.gender,
    this.oldDesignation = this.element.designation
  }

  ngOnInit(): void {
    // if(this.element.isSaaForwarded){
    //   this.userForm.get('firstName').disable();
    //   this.userForm.get('firstName').updateValueAndValidity()
    //   this.userForm.get('designation').disable();
    //   this.userForm.get('designation').updateValueAndValidity()
    // }
    this.genderList = this.element.genderList
  }

  update(data: any) {
    if (this.userForm.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning();
      return;
    } else {
      this.isFormInvalid = false
    }
    data.firstName = this.userForm.controls['firstName'].value.trim()
    data.designation = this.userForm.controls['designation'].value.trim()
    if (this.element.emailId === data.emailId) {
      this.oldEmailId = ''
    }
    if (this.element.mobile.toString() === data.mobile.toString()) {
      this.oldMobile = ''
    } if (this.element.firstName.trim() === data.firstName.trim()) {
      this.oldFirstName = ''
    } if (this.element.gender === data.gender) {
      this.oldGender = ''
    }if (this.element.designation === data.designation) {
      this.oldDesignation = ''
    }
    if (data.emailId === this.element.emailId && data.firstName === this.element.firstName && data.gender === this.element.gender && data.mobile === this.element.mobile && data.designation === this.element.designation) {
      this.notification.showValidationMessage('Please update');
      return;
    }
    let temp = {
      "emailId": data.emailId ? this.encrypt.getEncryptedValue(data.emailId) : '',
      "firstName": data.firstName.trim(),
      "gender": data.gender,
      "designation": data.designation,
      "mobile": data.mobile ? this.encrypt.getEncryptedValue(data.mobile.toString()) : '',
      "userName": this.element.userName,
      "userType": this.element.userType,
      "userTypeId": this.element.userTypeId,
      "oldEmailId": this.oldEmailId ? this.encrypt.getEncryptedValue(this.element.emailId) : this.oldEmailId,
      "oldFirstName": this.oldFirstName,
      "oldGender": this.oldGender,
      "oldDesignation": this.oldDesignation,
      "oldMobile": this.oldMobile ? this.encrypt.getEncryptedValue(this.oldMobile.toString()) : this.oldMobile,
    }
    this.postService.postUpdates(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.dialogRef.close(true)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  restrictNumeric(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }
  onKeypressEvent(event: any, inputLength: number) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
}