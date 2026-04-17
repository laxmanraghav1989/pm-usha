import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
@Component({
  selector: 'cfs-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.scss']
})
export class EditRegistrationComponent implements OnInit {
  isFormInvalid: boolean
  userDetail: FormGroup
  adButton: string = "Update";
  userTypeId: any;
  userName: any;
  emailRegex: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  genderList: Array<any> = []
  constructor(public fb: FormBuilder, public api: ApiService, public masterService: MasterService, public getService: GetService,
     public postService: PostService, public notification: NotificationService,private encrypt: EncryptDecrypt) {

    this.userDetail = this.fb.group({
      addressLine1: ({ value: '', disabled: true }),
      addressLine2: ({ value: '', disabled: true }),
      aisheCode: ({ value: '', disabled: true }),
      city: ({ value: '', disabled: true }),
      districtCode: ({ value: '', disabled: true }),
      districtName: ({ value: '', disabled: true }),
      emailId: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      gender: ['', [Validators.required]],
      firstName: ({ value: '', disabled: true }),
      name: ['', [Validators.required]],
      instituteName: ({ value: '', disabled: true }),
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      roleId: ({ value: '', disabled: true }),
      stateCode: ({ value: '', disabled: true }),
      stateName: ({ value: '', disabled: true }),
      userName: ['',[Validators.required]],
      userType: ({ value: '', disabled: true })
    })
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getGender();
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  
  getUserDetails() {
    this.postService.getUser(sessionStorage.getItem('userName')).subscribe(res => {
      if (res && res.length) {
        this.userDetail.patchValue(res['0'])
        let name = res['0'].firstName.concat(" ", res['0'].middleName ? res['0'].middleName : '', " ", res['0'].lastName ? res['0'].lastName : '');
        this.userDetail.get('name')?.setValue(name)

        this.userName = res['0'].userName
        this.userDetail.get('userName')?.setValue(this.userName);
        this.userDetail.get('userName')?.disable();
        this.userDetail.get('userName')?.updateValueAndValidity();
        this.userTypeId = res['0'].userTypeId

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getGender() {
    this.masterService.getGenderList().subscribe(res => {
      this.genderList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  Update() {
    if (this.userDetail.invalid) {
      this.notification.showWarning();
      this.isFormInvalid=true;
      return;
    }else{
      this.isFormInvalid=false;
    }
      let temp = {
        "emailId": this.encrypt.getEncryptedValue(this.userDetail.value.emailId),
        "firstName": this.userDetail.value.name,
        "gender": this.userDetail.value.gender,
        "mobile": this.encrypt.getEncryptedValue((this.userDetail.value.mobile).toString()),
        "userName": this.userName,
        "userType": this.userDetail.value.userType,
        "userTypeId": this.userTypeId
    } 
    this.postService.postUpdates(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
      }
    },err=>{

    })
  }
  reset() { }

  
}
