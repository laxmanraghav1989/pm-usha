import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';

@Component({
  selector: 'cfs-nmdc-section1',
  templateUrl: './nmdc-section1.component.html',
  styleUrls: ['./nmdc-section1.component.scss']
})
export class NmdcSection1Component implements OnInit {
  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  formDataBasicNewModelDetails: FormGroup;
  addButton: string = "Save"
  proposalScore: Array<any> = [];
  formDataApprovalRUSA: FormGroup;
  isFormInvalid: boolean = false;
  rusa: FormGroup
  instituteTypeList: Array<any> = []
  totalC: number = 0;
  totalS: number = 0;
  totalU: number = 0;
  stateCode: any;
  universityList: Array<any> = []
  districtList: Array<any> = []
  districtCode: string;
  districtName: string;
  variables: Array<any> = [];
  selectedIndex: any = 0;
  basicId: number = 0;
  addUpdate: boolean = false;
  showPage: boolean = false
  hideButton: boolean = true;
  addUpdateButton: string = "Save";
  disabledPage: boolean = false;
  showForm: boolean = false;
  RUSADataLists: Array<any> = [];
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  tab: any;
  indicatorStatus:boolean=false
  prevValue: any;
  undertaking: boolean
  paramId: number;
  constructor(public post: PostService, public fb: FormBuilder, public notification: NotificationService, public masterService: MasterService,
    public getService: GetService, public sharedService: SharedService, public viewportScroller: ViewportScroller, public errorMatcher: CustomErrorStateMatcher, public api: ApiService, public common: Common,
    public deleteService: DeleteService, public postService: PostService, private route: ActivatedRoute) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.districtCode = sessionStorage.getItem('districtCode')
    this.districtName = sessionStorage.getItem('districtName')
    this.formDataBasicNewModelDetails = this.fb.group({
      "affiliatingUniversityId": [null, [Validators.required]],
      "aisheCode": "",
      "districtName": { value: this.districtName, disabled: true },
      "collegeName": [null, [Validators.required]],
      "componentId": 0,
      "gerOfDistrict": [null, [Validators.required]],
      "instituteCategory": [null, []],
      "isEarlierApprovedUnderRusa": [null, [Validators.required]],
      "isFocusDistrict": null,
      "proposedYearOfOpening": [null, [Validators.required]],
      "proposedYearOfPhysicalCompletion": [null, [Validators.required]],
      "rusaTotalAmountApproved": [0, [Validators.required]],
      "rusaTotalAmountReleased": [0, [Validators.required]],
      sanctionedPostRegularFaculty: [null, [Validators.required]],
      postFilledInRegularMode: [null, [Validators.required]],
      percentageOfPostFilled: { value: 0, disabled: true },
      studentTeacherRatio: [null, [Validators.required]],
      studentTeacherRatio1: [null, [Validators.required]],

    });

    // this.formDataApprovalRUSA = this.fb.group({
    //   rusaComponentName: [null, []],
    //   stateShareApproved: [0, []],
    //   stateShareReleased: [0, []],
    //   stateShareUtilised: [0, []],
    //   totalAmountApproved: {value:0,disabled:true},
    //   totalAmountReleased: {value:0,disabled:true},
    //   totalAmountUtilised: {value:0,disabled:true},
    //   id: [0, []],
    //   documentId: [0, []],
     
    //   centralShareApproved: [0, []],
    //   centralShareReleased: [0, []],
    //   centralShareUtilised: [0, []],
    //   isInstitutionApprovedUnderRusa: [null, []],
    //   isCompletionCertificateUploaded: [false, []],
    //   isWholeProjectCompleted: [false, []],
    //   percentageCompletionProject: [null, []],
    //   proposalScoreBaseIndicator: [0, [Validators.required]],

    // });
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.getBasicNewModelData();
    this.getUniversityData();
    this.getProposalScoreIndicator()
    this.getPageStatusList();
  }
  tabSelected(value) {
    this.selectedIndex = value.index;
    this.isFormInvalid=false
    if (this.selectedIndex === 1) {
      this.getRUSAData()
    }if(this.selectedIndex === 2){
      this.getInstituteTypeList();
    }
  }
  getUniversityData() {
    this.masterService.getUniversity().subscribe((res) => {
      this.variables = res;
      this.universityList = this.variables.slice()

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getProposalScoreIndicator() {
    this.masterService.getProposalScore(this.sharedService.nmdcComponentId).subscribe(res => {
      this.proposalScore = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstituteTypeList() {
    this.getService.getHEIInstituteList(this.districtCode).subscribe(res => {
      if (res && res.length) {
        this.instituteTypeList = []
        this.instituteTypeList = res;
        this.instituteTypeList.forEach(ele => {
          parseInt(ele.noCollege)
          parseInt(ele.noStandaloneInstitution)
          parseInt(ele.noUniversity)
        })
        this.totalValue('total')
      } else {
        this.getInstituteType()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstituteType() {
    this.getService.getNMDCInstitute().subscribe(res => {
      this.instituteTypeList = res;
      this.instituteTypeList = this.instituteTypeList.map((v) => ({
        ...v,
        ndmcInstitutionTypeId: v.id,
        ndmcInstitutionTypeName: v.name,
        id: 0,
        noUniversity: 0,
        noStandaloneInstitution: 0,
        noCollege: 0,
      }));
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  save() {
    let temp = [];
    for (let index = 0; index < this.instituteTypeList.length; index++) {
      if (this.instituteTypeList[index].noStandaloneInstitution === null || this.instituteTypeList[index].noUniversity === null || this.instituteTypeList[index].noCollege === null) {
        this.notification.showWarning();
        this.isFormInvalid=true
        return;
      } else {
        this.isFormInvalid=false
        temp.push({
          "aisheCode": "",
          "componentId": this.sharedService.nmdcComponentId,
          "districtCode": this.districtCode,
          "id": this.instituteTypeList[index].id,
          "ndmcInstitutionTypeId": this.instituteTypeList[index].ndmcInstitutionTypeId,
          "noCollege": this.instituteTypeList[index].noCollege,
          "noStandaloneInstitution": this.instituteTypeList[index].noStandaloneInstitution,
          "noUniversity": this.instituteTypeList[index].noUniversity,
          "stateCode": this.stateCode
        })
      }
    }

    this.post.saveNMDCHEIData(temp, this.common.nmdcHigher).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getInstituteTypeList()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  totalValue(value: any) {
    this.totalC = this.instituteTypeList.reduce(
      (sum, item) => sum + Number(item.noCollege),
      0
    );
    this.totalS = this.instituteTypeList.reduce(
      (sum, item) => sum + Number(item.noStandaloneInstitution),
      0
    );
    this.totalU = this.instituteTypeList.reduce(
      (sum, item) => sum + Number(item.noUniversity),
      0
    );
  }

  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.nmdcComponentId).subscribe(
      (res) => {
        if (res.data && res.data.length) {
          for (let index = 0; index < res.data.length; index++) {
            if (res.data[index].moduleName === this.common.nmdcFinal) {
              this.disabledPage = true;
             
            }
            if(res.data[index].moduleName === this.common.module[5]){
              if(res.data[index].page === this.common.rusaPage){
                this.undertaking=true
              }
            }

          }
        }
      },
      (err) => { }
    );
  }
  calculatePercentage() {
    if (this.formDataBasicNewModelDetails.controls['sanctionedPostRegularFaculty'].value < this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value) {
      this.notification.showValidationMessage('Post filled in Regular Mode should be equal or less then sanctioned post !!!');
      return;
    }
    if (this.formDataBasicNewModelDetails.controls['sanctionedPostRegularFaculty'].value && this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value) {

      let percentage = ((this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value / this.formDataBasicNewModelDetails.controls['sanctionedPostRegularFaculty'].value) * 100);
      let a = percentage.toFixed(2)
      this.formDataBasicNewModelDetails.get('percentageOfPostFilled').setValue(a)
    }

  }
  getBasicNewModelData() {
    this.getService.getNmdcBasic(this.districtCode, this.sharedService.nmdcComponentId).subscribe(res => {
      if (res && res.length) {
        this.formDataBasicNewModelDetails.patchValue(res['0'])
        // this.formDataApprovalRUSA.get('proposalScoreBaseIndicator')?.setValue(res['0'].proposalScoreBaseIndicator === null?'0':res['0'].proposalScoreBaseIndicator)
        // this.prevValue=this.formDataApprovalRUSA.controls['proposalScoreBaseIndicator'].value
        let ratio = res['0'].studentTeacherRatio.split(':');
        this.formDataBasicNewModelDetails.get('studentTeacherRatio').setValue(ratio[0]);
        this.formDataBasicNewModelDetails.get('studentTeacherRatio1').setValue(ratio[1]);
        this.basicId = res['0'].id
        // if (res['0'].isEarlierApprovedUnderRusa) {
        //   this.formDataApprovalRUSA.get('isInstitutionApprovedUnderRusa').setValue(true);
        //   this.showForm = true
        // } else {
        //   this.formDataApprovalRUSA.get('isInstitutionApprovedUnderRusa').setValue(false)
        //   this.showForm = false
        // }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }



  saveBasicNewModelData() {
    if (this.formDataBasicNewModelDetails.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning()
      return;
    } else {
      this.isFormInvalid = false;
    }
    let openingYear = this.formDataBasicNewModelDetails.controls['proposedYearOfOpening'].value;
    if (openingYear.toString().length !== 4) {
      this.notification.showValidationMessage('Please enter openning year in YYYY format !!!');
      return;
    }
    let proposedYearOfPhysicalCompletion = this.formDataBasicNewModelDetails.controls['proposedYearOfPhysicalCompletion'].value;
    if (proposedYearOfPhysicalCompletion.toString().length !== 4) {
      this.notification.showValidationMessage('Please enter proposed year in YYYY format !!!');
      return;
    }
    let studentTeacherRatio = null;
    studentTeacherRatio = this.formDataBasicNewModelDetails.value.studentTeacherRatio + ':' + this.formDataBasicNewModelDetails.value.studentTeacherRatio1
    let affliatedUniversity = this.universityList.find(ele => ele.id === this.formDataBasicNewModelDetails.controls['affiliatingUniversityId'].value)
    let payload = {
      "affiliatingUniversityId": affliatedUniversity?.id,
      "affiliatingUniversityName": affliatedUniversity?.name,
      //"aisheCode": "",
      "collegeName": this.formDataBasicNewModelDetails.controls['collegeName'].value,
      "componentId": this.sharedService.nmdcComponentId,
      "districtCode": this.districtCode,
      "gerOfDistrict": this.formDataBasicNewModelDetails.controls['gerOfDistrict'].value,
      "id": this.basicId,
      "isEarlierApprovedUnderRusa": this.formDataBasicNewModelDetails.controls['isEarlierApprovedUnderRusa'].value,
      "isFocusDistrict": this.formDataBasicNewModelDetails.controls['isFocusDistrict'].value,
      "mdcDistrictCode": this.districtCode,
      "proposedYearOfOpening": this.formDataBasicNewModelDetails.controls['proposedYearOfOpening'].value,
      "proposedYearOfPhysicalCompletion": this.formDataBasicNewModelDetails.controls['proposedYearOfPhysicalCompletion'].value,
      "rusaTotalAmountApproved": this.formDataBasicNewModelDetails.controls['rusaTotalAmountApproved'].value,
      "rusaTotalAmountReleased": this.formDataBasicNewModelDetails.controls['rusaTotalAmountReleased'].value,
      "stateCode": this.stateCode,
      sanctionedPostRegularFaculty: this.formDataBasicNewModelDetails.controls['sanctionedPostRegularFaculty'].value,
      postFilledInRegularMode: this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value,
      percentageOfPostFilled: this.formDataBasicNewModelDetails.controls['percentageOfPostFilled'].value,
      studentTeacherRatio: studentTeacherRatio,
    }

    this.post.saveNmdcBasic(payload, this.common.nmdcBasic).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getBasicNewModelData();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // calculatePercentage() {
  //   if (this.formDataBasicNewModelDetails.controls['sanctionedPostRegularFaculty'].value < this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value) {
  //     this.notification.showValidationMessage('Post filled in Regular Mode should be equal or less then sanctioned post !!!');
  //     return;
  //   }
  //   if (!this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value) {
  //     this.formDataBasicNewModelDetails.get('percentageOfPostFilled').setValue(0)
  //   }
  //   if (this.formDataBasicNewModelDetails.controls['sanctionedPostRegularFaculty'].value && this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value) {

  //     let percentage = ((this.formDataBasicNewModelDetails.controls['postFilledInRegularMode'].value / this.formDataBasicNewModelDetails.controls['sanctionedPostRegularFaculty'].value) * 100);
  //     let a = percentage.toFixed(2)
  //     this.formDataBasicNewModelDetails.get('percentageOfPostFilled').setValue(a)
  //   }

  // }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  reset() {
    if (this.selectedIndex === 0) {
      this.formDataBasicNewModelDetails.reset();
    } 
    else if (this.selectedIndex === 1) {
      // this.formDataApprovalRUSA.reset();
      // this.formDataApprovalRUSA.get('proposalScoreBaseIndicator')?.setValue('0')
      // this.addButton = "Save"
    } else {
      this.instituteTypeList.forEach(e => {
        e.noCollege = 0,
          e.noUniversity = 0,
          e.noStandaloneInstitution = 0
      })
      this.totalC = 0,
        this.totalS = 0,
        this.totalU = 0
    }
  }
  // close(){
  //   this.addUpdateButton = "Save";
  //   this.addUpdate = false;
  //   this.hideButton = true;
  //   this.reset();
  // }
  // add(){
  //   this.addUpdate = true;
  //   this.hideButton = false;
  //   this.addUpdateButton = "Save";
  // }
  // editRow(item: any) {
  //   this.hideButton = false
  //   this.viewportScroller.scrollToPosition([0, 0]);
  //   this.addUpdate = true;
  //   this.addUpdateButton = "Update";
  // }
  saveTab1() {

  }
  // checkCondition(value) {
  //   if (value) {
  //     this.showForm = true
  //   } else {
  //     this.showForm = false
  //   }
  // }
  // isListBlank(event) {
  //   if (this.RUSADataLists && this.RUSADataLists.length) {
  //     this.notification.showValidationMessage('Please delete row one by one !!!');
  //     event.preventDefault();
  //   }
  // }
  // get f(): { [key: string]: AbstractControl } {
  //   return this.formDataApprovalRUSA.controls;
  // }

  // getProposalIndicator(value) {
  //   if (value === 92) {
  //     if (this.RUSADataLists && this.RUSADataLists.length) {
  //       this.formDataApprovalRUSA.get('proposalScoreBaseIndicator')?.setValue(this.prevValue)
  //       this.notification.showValidationMessage('Please delete list data one by one !!!');
  //       return;
  //     }
  //   }else{
  //     this.prevValue = value
  //   }
  //   if (value === 92) {
  //     this.indicatorStatus=false
  //     this.formDataApprovalRUSA.get('rusaComponentName').clearValidators();
  //     this.formDataApprovalRUSA.get('rusaComponentName').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('stateShareApproved').clearValidators();
  //     this.formDataApprovalRUSA.get('stateShareApproved').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('stateShareReleased').clearValidators();
  //     this.formDataApprovalRUSA.get('stateShareReleased').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('stateShareUtilised').clearValidators();
  //     this.formDataApprovalRUSA.get('stateShareUtilised').updateValueAndValidity();
     
  //     this.formDataApprovalRUSA.get('centralShareApproved').clearValidators();
  //     this.formDataApprovalRUSA.get('centralShareApproved').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('centralShareReleased').clearValidators();
  //     this.formDataApprovalRUSA.get('centralShareReleased').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('centralShareUtilised').clearValidators();
  //     this.formDataApprovalRUSA.get('centralShareUtilised').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('percentageCompletionProject').clearValidators();
  //     this.formDataApprovalRUSA.get('percentageCompletionProject').updateValueAndValidity();
      
  //   } else {
  //     this.indicatorStatus=true
  //     this.formDataApprovalRUSA.get('rusaComponentName').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('rusaComponentName').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('stateShareApproved').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('stateShareApproved').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('stateShareReleased').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('stateShareReleased').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('stateShareUtilised').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('stateShareUtilised').updateValueAndValidity();
     
  //     this.formDataApprovalRUSA.get('centralShareApproved').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('centralShareApproved').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('centralShareReleased').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('centralShareReleased').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('centralShareUtilised').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('centralShareUtilised').updateValueAndValidity();
  //     this.formDataApprovalRUSA.get('percentageCompletionProject').setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get('percentageCompletionProject').updateValueAndValidity();
  //   }
  // }
  // public addValidators() {
  //   for (const key in this.formDataApprovalRUSA.controls) {
  //     this.formDataApprovalRUSA.get(key).setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get(key).updateValueAndValidity();
  //   }
  // }
  // public clearValidator() {
  //   for (const key in this.formDataApprovalRUSA.controls) {
  //     this.formDataApprovalRUSA.get(key).setValidators(Validators.required);
  //     this.formDataApprovalRUSA.get(key).updateValueAndValidity();
  //   }
  // }


  saveRUSA(e:any){
    if (!this.undertaking) {
      this.notification.showValidationMessage('Please confirm !!!');
      return;
    }
this.postService.postRUSAData(e).subscribe((res)=>{
  if(res.status === 200){
    this.notification.showSuccess();
  }
}, err=>{})
}
  getRUSAData() {
    this.getService.getRusaLegacyData('', this.stateCode, this.districtCode, '').subscribe((res) => {
      this.RUSADataLists = res;
      if(this.RUSADataLists && this.RUSADataLists.length){
        this.indicatorStatus=true
      }else{
        this.indicatorStatus=false
      }
    }, (error) => { });
  }
  getRusaListById(id) {
    this.getService.getRusaLisDoc(id).subscribe(res => {
      if (res?.document?.documentFile) {
        this.viewPdf(res?.document?.documentFile, res?.document?.name);

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
 
  downloadPdf(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: 'application/pdf' });
    function _base64ToArrayBuffer(base64: any) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }
  viewPdf(data: any, fileName: string) {

    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    var blob = new Blob([ba], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    this.tab = window.open(url, fileName);
    this.tab.location.href = url;

    function _base64ToArrayBuffer(base64: string) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  
}


