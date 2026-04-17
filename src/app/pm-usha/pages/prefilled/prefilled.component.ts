import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-prefilled',
  templateUrl: './prefilled.component.html',
  styleUrls: ['./prefilled.component.scss']
})
export class PrefilledComponent implements OnInit {
  userDetail:FormGroup
  constructor(public fb:FormBuilder,public api:ApiService, public post:PostService,private encrypt: EncryptDecrypt, public sharedService: SharedService) {
    this.userDetail = this.fb.group({
      addressLine1: ({ value: '', disabled: true }),
      addressLine2: ({ value: '', disabled: true }),
      aisheCode: ({ value: '', disabled: true }),
      city: ({ value: '', disabled: true }),
      districtCode: ({ value: '', disabled: true }),
      districtName: ({ value: '', disabled: true }),
      emailId: ({ value: '', disabled: true }),
      firstName: ({ value: '', disabled: true }),
      name:({value:'',disabled:true}),
      instituteName: ({ value: '', disabled: true }),
      mobile: ({ value: '', disabled: true }),
      roleId: ({ value: '', disabled: true }),
      stateCode: ({ value: '', disabled: true }),
      stateName: ({ value: '', disabled: true }),
      userName: ({ value: '', disabled: true }),
      userType: ({ value: '', disabled: true }),
      designation:({value:'',disabled:true})
    })
     const data = sessionStorage.getItem('userData');
      if (data) {
       this.sharedService.setUserData(JSON.parse(data)) // ✅ restore after refresh
      }
   }

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    this.sharedService.userData$.subscribe(res => {
      if (res && res.length) {
       this.userDetail.patchValue(res['0'])
       const email=this.encrypt.getDecryptedValue(res['0']?.emailId);
       const mobile=this.encrypt.getDecryptedValue(res['0']?.mobile);
       let name = res['0'].firstName.concat(" ", res['0'].middleName?res['0'].middleName:'', " ", res['0'].lastName?res['0'].lastName:'');
       this.userDetail.get('name')?.setValue(name);
       this.userDetail.get('emailId')?.setValue(email)
       this.userDetail.get('mobile')?.setValue(mobile)

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
}
