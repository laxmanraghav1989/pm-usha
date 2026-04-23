import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import { EncryptDecrypt } from "src/app/utility/encrypt-decrypt";

@Component({
  selector: "cfs-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  emailRegex: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  userTYpeList: any[] = [];
  stateList: Array<any> = [];
  districtList: any[] = [];
  componentList: Array<any> = [];
  idDNO: any;
  stateCode: any;
  instituteCategory: any;
  componentId: any
  dataList: Array<any> = [];
  filterdataList: Array<any> = [];
  showSAA: any;
  showSAANone: any;
  showRUSA: any;
  adButton: string = "Save"
  filterStateList: Array<any> = [];
  filterDistrictList: Array<any> = [];
  componentNameList: Array<any> = [];
  rusaInstituteList: Array<any> = [];
  variables: Array<any> = [];
  data1: any[]
  stateName: any;
  chechdata: any;
  submitted = false;
  formData: FormGroup;
  formDataSAA: FormGroup;
  formDataDNO: FormGroup;
  usertypeId: any
  genderList: Array<any> = []
  infraconstructionData: any;
  SaanoneMouState: any[];
  showSPD: string;
  userTypeIds: string;
  rusaPhase: any;
  constructor(
    public api: ApiService,
    public fb: FormBuilder,
    public notification: NotificationService,
    public common: Common,
    private route: ActivatedRoute,
    private masterService: MasterService,
    public sharedService: SharedService,
    public getService: GetService, private encrypt: EncryptDecrypt
  ) { }

  reg = /^[A-Za-z]{4}[0-9]{6,7}$/;
  userIdRegex: RegExp = /^[a-zA-Z0-9.]{8,20}$/;
  ngOnInit(): void {
    this.getSateData();
    this.getGender()
    this.idDNO = this.route.snapshot.paramMap.get('DNO');
    this.showSAA = this.route.snapshot.paramMap.get('SAA');
    this.showSPD = this.route.snapshot.paramMap.get('SPD');
    console.log(this.showSPD, 'showSPD')
    this.showRUSA = this.route.snapshot.paramMap.get('RUSAUser');
    console.log(this.showRUSA, 'showRUSA')
    this.stateName = sessionStorage.getItem("stateName");
    this.stateCode = sessionStorage.getItem("stateCode");
    this.userTypeIds = sessionStorage.getItem('userTypeId');
    // if (this.sharedService.userTypeList['0'].id){
    //   this.idDNO = 'SPDUserNone';
    //   this.chechdata = this.sharedService.userTypeList['12'].userType;
    //   this.usertypeId = this.sharedService.userTypeList['12'].id;
    // }


    this.formData = this.fb.group({
      stateName: [{ value: this.stateName, disabled: true }, Validators.required],
      stateNameSAA: ['', []],
      userType: [{ value: this.chechdata, disabled: true }, Validators.required],
      instituteName: ['', []],
      rusaPhase: ['', []],
      componentNameId: ['', []],
      componentsId: ['', []],
      instituteNameId: ['', []],
      district: ['', []],
      firstName: ["", [Validators.required]],
      userId: ["", []],
      gender: ["", Validators.required],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ["", [Validators.required, Validators.pattern(this.emailRegex)]],
      designation1: ['', [Validators.required]]
    });
    // if (this.idDNO === 'TSGUser') {
    //   this.chechdata = 'TSG';
    //   this.formData.get('userType').enable()
    //   this.formData.get('userType').setValue(null)
    //   this.formData.get('userId').setValidators(Validators.required)
    //   this.formData.get('userId').setValidators(Validators.pattern(this.userIdRegex))
    //   this.formData.get('userType').updateValueAndValidity();
    //   this.formData.get('userId').updateValueAndValidity();
    //   this.formData.get('userId').setValue('');
    // }
    if (this.idDNO === 'OtherUser') {
      this.chechdata = 'Other';
      this.formData.get('userType').enable()
      this.formData.get('userType').setValue(null)
      this.formData.get('userId').setValidators(Validators.required)
      this.formData.get('userId').setValidators(Validators.pattern(this.userIdRegex))
      this.formData.get('userType').updateValueAndValidity();
      this.formData.get('userId').updateValueAndValidity();
      this.formData.get('userId').setValue('');
      this.getUserTypeList()
    }
    else if (this.idDNO === 'UNOUser') {
      // this.getComponentList();
      this.getUniversity();
      this.chechdata = this.sharedService.userTypeList['4'].userType;
      this.usertypeId = this.sharedService.userTypeList['4'].id;
      this.formData.controls['instituteName'].setValidators([Validators.required]);
      this.formData.get('instituteName').updateValueAndValidity();
      this.formData.get('userId').clearValidators();
      this.formData.get('userId').updateValueAndValidity();
      this.formData.get('userId').setValue('');
      // this.formData.controls['componentsId'].setValidators([Validators.required])
      // this.formData.get('componentsId').updateValueAndValidity();
    } else if (this.idDNO === 'CNOUser') {

      this.instituteCategory = 'C'
      this.componentId = this.sharedService.collegeComponentId
      this.chechdata = this.sharedService.userTypeList['5'].userType;
      this.usertypeId = this.sharedService.userTypeList['5'].id;
      this.getuniversityCollegeData();
      this.formData.controls['instituteName'].setValidators([Validators.required]);
      this.formData.get('instituteName').updateValueAndValidity();
      this.formData.get('userId').clearValidators();
      this.formData.get('userId').updateValueAndValidity();
      this.formData.get('userId').setValue('');

    } else if (this.idDNO === 'DNOUser') {
      this.formData.controls['district'].setValidators([Validators.required]);
      this.formData.get('district').updateValueAndValidity();
      this.formData.controls['componentsId'].setValidators([Validators.required])
      this.formData.get('componentsId').updateValueAndValidity();
      this.chechdata = this.sharedService.userTypeList['3'].userType;
      this.usertypeId = this.sharedService.userTypeList['3'].id;
      this.formData.get('userId').clearValidators();
      this.formData.get('userId').updateValueAndValidity();
      this.formData.get('userId').setValue('');
      //this.getDistrictData();
      this.getComponentList()
    } else if (this.showSAA === 'AddSAA') {
      this.chechdata = this.sharedService.userTypeList['1'].userType;
      this.formData.controls['stateNameSAA'].setValidators([Validators.required]);
      this.formData.get('stateNameSAA').updateValueAndValidity();
      this.usertypeId = this.sharedService.userTypeList['1'].id;
      this.formData.get('userId').clearValidators();
      this.formData.get('userId').updateValueAndValidity();
      this.formData.get('userId').setValue('');
    } 
    else if (this.showSAA === 'AddSAANone') {
      this.chechdata = this.sharedService.userTypeList['11'].userType;
      // this.formData.controls['stateNameSAA'].setValidators([Validators.required]);
      // this.formData.get('stateNameSAA').updateValueAndValidity();
      this.usertypeId = this.sharedService.userTypeList['11'].id;
      // this.formData.get('userId').clearValidators();
      // this.formData.get('userId').updateValueAndValidity();
      // this.formData.get('userId').setValue('');
    } 
    else if (this.showSAA === 'AddSPD') {
      this.chechdata = this.sharedService.userTypeList['12'].userType;
      this.usertypeId = this.sharedService.userTypeList['12'].id;
    }
    // else if (this.idDNO === 'SPDUser') {
    //   this.chechdata = this.sharedService.userTypeList['12'].userType;
    //   this.usertypeId = this.sharedService.userTypeList['12'].id;
    // }
    else {
      this.chechdata = this.sharedService.userTypeList['2'].userType;
      this.usertypeId = this.sharedService.userTypeList['2'].id;
      this.formData.get('userId').clearValidators();
      this.formData.get('userId').updateValueAndValidity();
      this.formData.get('userId').setValue('');
    }
    this.formData.get("userType").setValue(this.chechdata);
    this.formData.get("stateName").setValue(this.stateName);
    this.formData.get('userId').setValue('');

  }
  getUserTypeList() {
    this.api.getUserTypeData().subscribe(res => {
      this.userTYpeList = res;
      this.userTYpeList = this.userTYpeList.filter(e => e.id !== 1 && e.id !== 2 && e.id !== 3 && e.id !== 4 && e.id !== 5 && e.id !== 6 && e.id !== 99 && e.id !==12)
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getUserType(value) {
    this.usertypeId = value
  }
  getGender() {
    this.masterService.getGenderList().subscribe(res => {
      this.genderList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  reset() {
    this.formData.controls['firstName'].reset();
    this.formData.controls['email'].reset();
    this.formData.controls['mobile'].reset();
    this.formData.controls['gender'].reset();
    this.formData.controls['district'].reset();
    this.formData.controls['stateNameSAA'].reset();
    this.formData.controls['designation1'].reset()
    this.formData.get('userId').setValue('');
  }
  get f() {
    return this.formData.controls;
  }

  alphaOnly(e: any) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }
  specialChar(e: any) { // Special character
    e.preventDefault();
    return false;
  }
  getuniversityCollegeData() {
    this.getService.getDataList(this.instituteCategory, this.componentId).subscribe((res) => {
      this.dataList = [];
      res.forEach(obj => {
        if (obj['checked']) {
          this.dataList.push({
            instituteName: obj['instituteName'],
            insAishe: obj['instituteName']?.concat(" ", '(', obj['instituteId'], ')'),
            id: obj['id'],
            aisheCode: obj['instituteId'],
            districtId: obj['districtId']
          })

        }

      });
      this.filterdataList = this.dataList.slice()
    }, (err) => { });
  }
  getComponentList() {
    this.getService.getComponent().subscribe(res => {
      this.componentList = res.filter((ele) => ele.id === 4 || ele.id === 5);

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getUniversity() {
    let instituteCategory = 'U'
    let arr = [this.sharedService.meruComponentId, this.sharedService.universityComponentId];
    this.getService.getDataList(instituteCategory, arr).subscribe((res) => {
      this.dataList = [];
      res.forEach(obj => {
        if (obj['checked'] && obj['instituteName']) {
          this.dataList.push({
            instituteName: obj['instituteName'],
            insAishe: obj['instituteName']?.concat(" ", '(', obj['instituteId'], ')'),
            id: obj['id'],
            aisheCode: obj['instituteId'],
            districtId: obj['districtId']
          })

        }

      });
      this.filterdataList = this.dataList.slice()
    }, (err) => { });
  }
  compareFn1(user1: any, user2: any) {
    return user1 && user2 ? user1 === user2 : user1 === user2;
  }

  compareFn(user1: any, user2: any) {
    return user1 && user2 ? user1 === user2 : user1 === user2;
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
      this.SaanoneMouState = this.stateList.filter(x => x?.hasProfileFilled === false);
    }, () => { })
  }
  getDistrictData(e: any) {
    let arr = [this.sharedService.genderComponentId, this.sharedService.nmdcComponentId];

    this.getService.getDataList('', e.value).subscribe((res) => {
      this.districtList = res;
      this.filterDistrictList = this.districtList.slice();
    }, (err) => { });

    // arr.forEach((ele)=>{
    //   this.getService.getDataList('',ele).subscribe((res)=>{
    //     this.districtList=[];
    //     for(let i=0;i<res.length;i++ ){
    //       this.districtList.push({
    //         districtId:  res[i].districtId,
    //         districtName:  res[i].districtName,
    //         id:  res[i].id

    //       })
    //     }

    //        this.filterDistrictList = this.districtList.slice();
    //      }, (err) => { });
    // });

  }
  getDistrictCode(value) {
    let a = this.filterdataList.find(e => e.aisheCode === value)
    this.formData.get('instituteName').setValue(value);
    this.formData.get('district').setValue(a.districtId);
  }

  Save() {
    if (this.formData.invalid) {
      this.notification.showWarning();
      return;
    }
   const value = this.formData.value.instituteNameId;
const aisheCode = value?.match(/[A-Z]-\d+/)?.[0];
console.log(aisheCode);
    this.submitted = true;
    let temp = {
      districtId: this.idDNO === 'DNOUser' ? this.formData.value.district : this.formData.value.district,
      emailId: this.encrypt.getEncryptedValue(this.formData.value.email),
      firstName: this.formData.value.firstName,
      gender: this.formData.value.gender,
      mobile: this.encrypt.getEncryptedValue(this.formData.value.mobile.toString()),
      stateCode: this.showSAA === 'AddSAA' || this.showSAA === 'AddSAANone' || (this.showSAA === 'AddSPD' && this.userTypeIds === this.sharedService.userTypeList['0'].id) ? this.formData.value.stateNameSAA : this.stateCode,
      userName: this.showRUSA==='RUSAUser'?aisheCode:this.formData.value.instituteName ? this.formData.value.instituteName : this.formData.value.userId,
      userTypeId: this.showRUSA === 'RUSAUser'? 13 : parseInt(this.usertypeId),
      componentIdForUser: this.formData.value.componentsId,
      designation: this.formData.controls['designation1'].value,
    };
    this.api.postUserData(temp).subscribe(
      (res) => {
        if (res.status === 200) {
          let value = {
            alreadyExist: true,
            message: res.message,
          };
          this.common.error(value).subscribe((whatever: boolean) => {
            this.reset();
            if (whatever) {
              this.reset();
            }
          })



        }
      },
      (err) => { }
    );
  }
  changesRusa(data: any) {
    this.variables = [];
    this.rusaPhase=data
    let phaseRUSA1 = data === 'RUSA 1' ? '1' : data === 'RUSA 2' ? '2' : '-1'

    this.getService.getComponentName(phaseRUSA1).subscribe(res => {
        // item.rusaPhase === 'RUSA 1' && [5,8,11,14,15,17].includes(item.componentId)
      this.componentNameList = res;
      if(data === 'RUSA 1'){
        this.componentNameList = this.componentNameList.filter(item => ![5,8,11,14,15,17].includes(item.id))
      } 
      if(data === 'RUSA 2'){
        this.componentNameList = this.componentNameList.filter(item => ![5,8,11,14,15,17].includes(item.id))
      }
      this.variables = this.componentNameList.slice()

    }),err =>{
        console.error('Error fetching page status:', err);
    }

}
  
changeComponentidInst(data:any){
  this.rusaInstituteList = [];
  let payload = {
    componentId: data,
    rusaPhase: this.rusaPhase,
    stateId: this.stateCode
  }


  this.getService.rusaInstitute(payload).subscribe(res=>{
    this.rusaInstituteList = res.InstituteList;
    this.rusaInstituteList = this.rusaInstituteList.filter(item =>
  /[A-Z]-\d+/.test(item)
);

  })
}
  
}
