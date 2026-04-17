import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { ApiService } from "src/app/service/api.service";
import { DeleteService } from "src/app/service/delete.service";
import { GetService } from "src/app/service/get.service";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import { PostService } from "src/app/service/post.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/utility/format-datepicker.service";
import { CustomErrorStateMatcher } from "src/app/utility/validators";

@Component({
  selector: 'cfs-revised-dpr-upload',
  templateUrl: './revised-dpr-upload.component.html',
  styleUrls: ['./revised-dpr-upload.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class RevisedDprUploadComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  fileSizeUnit: number = 5120;
  isFormInvalid: boolean = false;
  myFiles: string[] = [];
  myFilesName: any = '';
  undertaking: boolean
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  tab: any;
  formDataBasicDetails: FormGroup;
  formDataApprovalRUSA: FormGroup
  url: string;
  aisheCode: any;
  addButton: string = "Add"
  universityList: Array<any>;
  RUSADataLists: Array<any> = [];
  documentName: any;
  base64Data: any;
  componentList: any;
  disabledPage: boolean = false;
  showForm: boolean = false;
  districtName: string;
  collegeName: any;
  insType: any;
  basicId: any = 0;
  stateCode: string;
  districtCode: string;
  instituteCategory: string;
  stateName: string;
  affiliatedUniersity: string;
  affliatedUniversityId: string;
  componentId: any
  collegeAddress: any;
  instituteAisheTypeManagement: any;
  proposalScore: Array<any> = [];
  selectedIndex: any = 0
  centralShareReleased: any;
  submitted = false;
  indicatorStatus: boolean = false
  prevValue: any;
  districtList:Array<any>=[];
  variables:Array<any>=[]
  myFilesNameDPR: any='';
  myFilesDPR: string[] = [];
  getDprFileStatus:any = ""
  getDprFileName:any = ""
  dprLockStatus:any = false;
  myFileArrayDPR:any;
  newDprId:any;
  dprId:any;

 
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    public notification: NotificationService,
    public common: Common,
    public masterService: MasterService,
    public sharedService: SharedService, public deleteService: DeleteService,
    public getService: GetService, public errorMatcher: CustomErrorStateMatcher, public postService: PostService
  ) {
    this.instituteAisheTypeManagement = sessionStorage.getItem('instituteAisheTypeManagement')
    this.aisheCode = sessionStorage.getItem("userName");
    this.districtName = sessionStorage.getItem("districtName");
    this.stateName = sessionStorage.getItem("stateName");
    this.collegeName = sessionStorage.getItem("insName");
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    this.stateCode = sessionStorage.getItem("stateCode");
    this.districtCode = sessionStorage.getItem("districtCode");
    this.affiliatedUniersity = sessionStorage.getItem("affliatedUniversity");
    this.collegeAddress = sessionStorage.getItem('collegeAddress')
    this.affliatedUniversityId = sessionStorage.getItem(
      "affliatedUniversityId"
    );
    if (this.insType === "C") {
      this.instituteCategory = "COLLEGE";
    } else {
      this.instituteCategory = "UNIVERSITY";
    }
  }

  ngOnInit(): void {
    this.formDataBasicDetails = this.fb.group({
      collegeName: { disabled: true, value: this.collegeName },
      collegeAddress: { value: this.collegeAddress, disabled: true },
      aisheCode: { disabled: true, value: this.aisheCode },
      districtName: { disabled: true, value: this.districtName },
      stateName: { disabled: true, value: this.stateName },
      affiliatedUniersity: { disabled: true, value: this.affiliatedUniersity },
      openingYear: [null, [Validators.required]],
      stateGove: [null, [Validators.required]],
      collegeUniversity: [null, []],
      temporaryCampus: [null, [Validators.required]],
      focusDistrict: null,
      dateofApplication: [null, [Validators.required]],
      gettingAccreditation: [null, []],
      validityofAccreditation: [null, []],
      score: [null, []],
      grade: [null, []],
      id: [0, []],
      proposalDistrictId:this.districtCode,
      isFocusProposalDistrict:null

    });
    this.getBasicDetailData();
    // this.getLockProposal()
    this.getDocumentName()
   
  
    if (this.insType === 'C') {
      this.formDataBasicDetails.get('collegeUniversity').setValidators(Validators.required);
      this.formDataBasicDetails.get('collegeUniversity').updateValueAndValidity();
    }
  }
 

  getBasicDetailData() {
    this.getService.getBasicDetails(this.aisheCode, this.instituteCategory, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId
    ).subscribe(
      (res) => {

        
        if (res.data !== null) {
          this.basicId = res.data?.id;
          this.formDataBasicDetails.get('isFocusProposalDistrict')?.setValue(res.data?.isFocusProposalDistrict)
          this.formDataBasicDetails.get('proposalDistrictId')?.setValue(res.data?.proposalDistrictId?res.data.proposalDistrictId:this.districtCode)
          this.formDataBasicDetails.get('focusDistrict')?.setValue(res.data?.isFocusDistrict)
          this.formDataBasicDetails.get('focusDistrict')?.updateValueAndValidity()
          this.formDataBasicDetails.get("id").setValue(res.data?.id);
          this.formDataBasicDetails
            .get("grade")
            .setValue(res.data?.accreditationGrade);
          this.formDataBasicDetails
            .get("score")
            .setValue(res.data?.accreditationScore);

          this.formDataBasicDetails
            .get("openingYear")
            .setValue(res.data?.yearOfOpening);
          if (this.insType === "U") {
            if (res.data?.instituteType === "true") {
              this.formDataBasicDetails.get("stateGove").setValue(true);
            } else {
              this.formDataBasicDetails.get("stateGove").setValue(false);
            }
          } else {
            this.formDataBasicDetails
              .get("stateGove")
              .setValue(res.data?.instituteType);
          }
          this.formDataBasicDetails
            .get("collegeUniversity")
            .setValue(res.data?.managementType);
          this.formDataBasicDetails
            .get("temporaryCampus")
            .setValue(res.data?.campusType);
          this.formDataBasicDetails
            .get("focusDistrict")
            .setValue(res.data?.isFocusDistrict);
          // this.formDataBasicDetails
          //   .get("validityofAccreditation")
          //   .setValue(
          //     this.formatDate(res.data?.dateOfAccreditationValidityString)
          //   );
          this.formDataBasicDetails
            .get("gettingAccreditation")
            .setValue(res.data?.isSubmittedIiqa);
          this.formDataBasicDetails
            .get("dateofApplication")
            .setValue(res.data?.accreditationStatus);
        }
      },
      (err) => { }
    );

  }



  




  getFileDetailsDpr(e: any) {
    this.myFilesDPR = [];
    this.myFilesNameDPR = '';
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.fileSizeExceed = false;
        this.myFilesDPR.push(e.target.files[i]);
        this.myFilesNameDPR += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesNameDPR += ',';
      }
    }
    const target = e.target as HTMLInputElement;
  }





  submitDocument(){
    if (this.fileSizeExceed) {
      this.notification.showValidationMessage('File size should be less than 25MB.')
      return;
    }
      const formdata: FormData = new FormData();
      for (var i = 0; i < this.myFilesDPR.length; i++) {
        formdata.append('file', this.myFilesDPR[i]);
      }
      if(this.blob){
        formdata.append('file', this.blob, this.myFilesNameDPR);
      }
      if(this.myFilesDPR.length <= 0 ){
        this.notification.showValidationMessage('Please Upload DPR File')
        return
      }

    let payload = {
      aisheCode: this.aisheCode,
      stateCode: this.stateCode,
      districtCode: this.districtCode,
      instituteCategory: this.insType === 'U' || this.insType === 'C' ? this.insType : '',
      componentId: sessionStorage.getItem('getComponentId'),
      documentTypeId:41, 
      revisedProposalDprUndertaking : false,
      documentId : this.newDprId === null ?  0 : this.newDprId
    }
    this.api.saveDocumentOtherInfoDPR(payload, this.insType === 'U' ? this.common.strengthUnivOtherInfo : this.common.strengthClgOtherInfo, formdata).subscribe(res => {
    if (res.status === 200) {
        this.notification.showSuccess()
        this.myFilesDPR = []
        this.getDocumentName()
      }
    }, err => {
    
    
    })
  }

  getDocumentName() {
    let temp = {
      documentId : '',
      documentTypeId: 41,
      aisheCode : this.aisheCode,
      componentId : sessionStorage.getItem('getComponentId')
    }
    this.getService.viewRevisedDocument(temp).subscribe((res) => {
      if (res) {
        const documentFilter = res.data.filter(item => item.aisheCode === this.aisheCode)
        this.getDprFileName = documentFilter[0]?.name
        this.newDprId = documentFilter[0]?.id
        this.getLockProposal()
      }
    })
  }



  LockProposal(){
  
    let temp = {
        aisheCode: this.aisheCode,
        componentId: sessionStorage.getItem('getComponentId'),
        constant: 'revisedProposalRevisedDprUploaded',
        districtCode: sessionStorage.getItem("districtCode"),
        // instituteCategory: characters,
        stateCode: this.stateCode,
        status: true
      }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res?.data === "done") {
        this.notification.showSuccessMessage(`DPR Revised has been Loked successfully!!!`);
        this.getLockProposal()
       
      }
    });
  }


  getLockProposal(){
    let aisheCode = this.aisheCode;
    let componentId = sessionStorage.getItem('getComponentId')
    this.getService.getLockListStatus(aisheCode, componentId).subscribe((res) => {
      if(res[0]?.revisedProposalRevisedDprUploaded === true){
        this.dprLockStatus = true
      }
    else{
      // this.dprLockStatus = false
      }

});


}

 


  view() {
    let temp = {
      documentId : this.newDprId,
      documentTypeId: 41,
      
    }
    this.getService.viewDocument(temp).subscribe((res) => {
      if (res) {
      this.viewPdf(res.data[0].documentFile, res.data[0].name)
      }
    })
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
    // let file = new Blob([data], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }

 


}
