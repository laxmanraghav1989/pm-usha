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
  selector: "cfs-college-section1",
  templateUrl: "./college-section1.component.html",
  styleUrls: ["./college-section1.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class CollegeSection1Component implements OnInit {
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
    this.getPageStatusList();
    this.getRUSAData();
    this.getProposalScoreIndicator();
    this.getDistrict()
    if (this.insType === 'C') {
      this.formDataBasicDetails.get('collegeUniversity').setValidators(Validators.required);
      this.formDataBasicDetails.get('collegeUniversity').updateValueAndValidity();
    }
  }
  getDistrict() {
    this.masterService.getDistrictList(this.stateCode).subscribe(res => {
      this.variables = res;
      this.districtList = this.variables.slice();
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  tabSelected(event) {
    this.selectedIndex = event.index;
  }
  getProposalScoreIndicator() {
    this.masterService.getProposalScore(this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(res => {
      this.proposalScore = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getUniversityData() {
    this.masterService.getUniversity().subscribe(
      (res) => {
        this.universityList = res;
      },
      (err) => { }
    );
  }
  getPageStatusList() {
    this.api.getPageStatus(this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(
      (res) => {
        if (res.data && res.data.length) {
          for (let index = 0; index < res.data.length; index++) {
            if (this.insType === "C") {
              if (res.data[index].moduleName === this.common.strengthClgFinal) {
                this.disabledPage = true;

              }
              if (res.data[index].moduleName === this.common.module[1]) {
                if (res.data[index].page === this.common.rusaPage) {
                  this.undertaking = true
                }
              }
            } else {
              if (res.data[index].moduleName === this.common.strengthUniv) {
                this.disabledPage = true;
              }
              if (res.data[index].moduleName === this.common.module[2]) {
                if (res.data[index].page === this.common.rusaPage) {
                  this.undertaking = true
                }
              }
            }
          }
        }
      },
      (err) => { }
    );
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
          this.formDataBasicDetails
            .get("validityofAccreditation")
            .setValue(
              this.formatDate(res.data?.dateOfAccreditationValidityString)
            );
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

  private formatDate(date) {
    if (date) {
      let split_dateAsString1 = date.split("/");
      let final_format1 = new Date(
        `${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`
      );
      return final_format1;
    }
  }

  saveBasicDetail() {
    if (this.formDataBasicDetails.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
    }
    let openingYear = this.formDataBasicDetails.controls['openingYear'].value;
    if (openingYear.toString().length !== 4) {
      this.notification.showValidationMessage('Please enter openning year in YYYY format !!!');
      return;
    }
    let validityofAccreditation = null;
    let stateGove = null;
    if (this.formDataBasicDetails.value.validityofAccreditation) {
      let day: string = this.formDataBasicDetails.value.validityofAccreditation
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.formDataBasicDetails.value.validityofAccreditation.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year =
        this.formDataBasicDetails.value.validityofAccreditation.getFullYear();
      validityofAccreditation = `${day}/${month}/${year}`;
      validityofAccreditation.toString();
    } else {
      validityofAccreditation = null;
    }
    let temp = {
      proposalDistrictId:this.formDataBasicDetails.value.proposalDistrictId,
      isFocusProposalDistrict:this.formDataBasicDetails.value.isFocusProposalDistrict,
      instituteAisheTypeManagement: this.instituteAisheTypeManagement,
      accreditationGrade: this.formDataBasicDetails.value.grade,
      accreditationScore: this.formDataBasicDetails.value.score,
      accreditationStatus: this.formDataBasicDetails.value.dateofApplication,
      address: this.collegeAddress,
      affiliatingUniversityId: this.affliatedUniversityId,
      affiliatingUniversityName:
        this.affiliatedUniersity,
      aisheCode: this.aisheCode,
      campusType: this.formDataBasicDetails.value.temporaryCampus,
      componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
      dateOfAccreditationValidityString: validityofAccreditation,
      districtCode: this.districtCode,
      id: this.basicId,
      instituteCategory: this.insType,
      instituteType: this.formDataBasicDetails.value.stateGove,
      isFocusDistrict: this.formDataBasicDetails.value.focusDistrict,
      isSubmittedIiqa: this.formDataBasicDetails.value.gettingAccreditation,
      managementType: this.formDataBasicDetails.value.collegeUniversity,
      name: this.collegeName,
      stateCode: this.stateCode,
      yearOfOpening: this.formDataBasicDetails.value.openingYear,
    };
    this.api
      .postBasicDetail(
        temp,
        this.insType === "U"
          ? this.common.strengthUnivPreamble
          : this.common.strengthClgPreamble
      )
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.notification.showSuccess();
            if (validityofAccreditation === null) {
              this.formDataBasicDetails.get('validityofAccreditation').setValue('')
            }
            this.getBasicDetailData();
          }
        },
        (err) => { }
      );
  }
  accreditationStatus(value) {
    if (value) {

      this.formDataBasicDetails.get("score").setValidators(Validators.required);
      this.formDataBasicDetails.get("grade").setValidators(Validators.required);
      this.formDataBasicDetails.get("validityofAccreditation").setValidators(Validators.required);

      this.formDataBasicDetails.get("score").updateValueAndValidity()
      this.formDataBasicDetails.get("grade").updateValueAndValidity()
      this.formDataBasicDetails.get("validityofAccreditation").updateValueAndValidity()
    } else {

      this.formDataBasicDetails.get("gettingAccreditation").setValidators(Validators.required);
      this.formDataBasicDetails.get("gettingAccreditation").updateValueAndValidity()
      this.formDataBasicDetails.get("gettingAccreditation").setValue(null);
      this.formDataBasicDetails.get("score").setValue(null);
      this.formDataBasicDetails.get("grade").setValue(null);
      this.formDataBasicDetails.get("validityofAccreditation").setValue(null);

      this.formDataBasicDetails.get("score").clearValidators();
      this.formDataBasicDetails.get("grade").clearValidators();
      this.formDataBasicDetails.get("validityofAccreditation").clearValidators();

      this.formDataBasicDetails.get("score").updateValueAndValidity()
      this.formDataBasicDetails.get("grade").updateValueAndValidity()
      this.formDataBasicDetails.get("validityofAccreditation").updateValueAndValidity()
    }
  }

  reset() {
    if (this.selectedIndex === 0) {
      this.formDataBasicDetails.reset();
      this.formDataBasicDetails.get('collegeName').setValue(this.collegeName),
      this.formDataBasicDetails.get('collegeAddress').setValue(this.collegeAddress),
      this.formDataBasicDetails.get('aisheCode').setValue(this.aisheCode),
      this.formDataBasicDetails.get('districtName').setValue(this.districtName),
      this.formDataBasicDetails.get('stateName').setValue(this.stateName),
      this.formDataBasicDetails.get('affiliatedUniersity').setValue(this.affiliatedUniersity),
      this.formDataBasicDetails.get('proposalDistrictId').setValue(this.districtCode)
    }
    this.addButton = "Add"
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  saveRUSA(e: any) {
    if (!this.undertaking) {
      this.notification.showValidationMessage('Please confirm !!!');
      return;
    }
    this.postService.postRUSAData(e).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
      }
    }, err => { })
  }
  getRUSAData() {
    this.getService.getRusaLegacyData(this.aisheCode, '', '', '').subscribe((res) => {
      this.RUSADataLists = res;
      if (this.RUSADataLists && this.RUSADataLists.length) {
        this.indicatorStatus = true
      } else {
        this.indicatorStatus = false
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

  getFileSizeUnit(fileSize: number) {
    let fileSizeInWords = 'bytes';

    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit) {
        fileSizeInWords = 'bytes';
      } else if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSizeInWords = 'KB';
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSizeInWords = 'MB';
      }
    }

    return fileSizeInWords;
  }
  removeImage(idx: number) {
    this.uploadedMedia = this.uploadedMedia.filter((u, index) => index !== idx);
  }
}