import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { DeleteService } from "src/app/service/delete.service";
import { GetService } from "src/app/service/get.service";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import { PostService } from "src/app/service/post.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import { CustomErrorStateMatcher } from "src/app/utility/validators";

@Component({
  selector: 'cfs-nmdc-section5',
  templateUrl: './nmdc-section5.component.html',
  styleUrls: ['./nmdc-section5.component.scss']
})
export class NmdcSection5Component implements OnInit {
  addUpdate: boolean = false;
  disabledPage: boolean = false;
  formDataDepartment: FormGroup;
  formDataNonTeachingStaff: FormGroup;
  facility: FormGroup
  tif: FormGroup
  programme: FormGroup
  addUpdateButton: string = "Save";
  AddDepartment:string="Add"
  departmentList: any;
  instituteCategory: any;
  aisheCode: any;
  selectedIndex: any = 0;
  hideButton: boolean = true;
  showButton: boolean = true;
  insType: string;
  instituteTypeList: Array<any> = [];
  levelList: Array<any> = [];
  programmeList: Array<any> = [];
  variables: Array<any> = []
  variables1: Array<any> = []
  districtCode: any;
  stateCode: any
  courseData: Array<any> = [];
  dataOutComeList: Array<any> = [];
  outComeDataList: Array<any> = [];
  facilityId: any = 0
  anticipated: FormGroup;
  courseList: Array<any> = [];
  variables2: Array<any> = []
  anticipatedList: Array<any> = [];
  isFormInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    public get: GetService,
    public notification: NotificationService,
    public common: Common,
    public api: ApiService,
    public post: PostService, public sharedService: SharedService,public deleteService:DeleteService,
    public masterService: MasterService, public errorMatcher: CustomErrorStateMatcher, public getService: GetService, public postService: PostService
  ) {
    this.stateCode = sessionStorage.getItem("stateCode")
    this.districtCode = sessionStorage.getItem("districtCode");
    this.formDataDepartment = this.fb.group({
      name: [null, [Validators.required]],
      id: [0, []],
    });
    this.programme = this.fb.group({
      courseLevelId: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
      districtCode: '',
      durationMonth: [null, [Validators.required]],
      durationYear: [null, [Validators.required]],
      enrolmentTargetFifthYear: 0,
      enrolmentTargetFirstYear: 0,
      enrolmentTargetFourthYear: 0,
      enrolmentTargetSecondYear: 0,
      enrolmentTargetThirdYear: 0,
      id: 0,
      isApprovedByUgc: true,
      name: [null, [Validators.required]],
      programmeId: [null, [Validators.required]],
      stateCode: '',
    })
    this.formDataNonTeachingStaff = this.fb.group({
      adminDeptSanctionedPost: ["", [Validators.required]],
      adminDeptPostYetToBeSanctioned: ["", [Validators.required]],
      technicalDeptPostYetToBeSanctioned: ["", [Validators.required]],
      technicalDeptSanctionedPost: ["", [Validators.required]],
      othersDeptSanctionedPost: ["", [Validators.required]],
      othersDeptPostYetToBeSanctioned: ["", [Validators.required]],
      id: [0, []],
      departmentId: null,

    });
    this.tif = this.fb.group({
      "assistantProfessorPostYetToBeSanctioned": 0,
      "assistantProfessorSanctionedPost": 0,
      "associateProfessorPostYetToBeSanctioned": 0,
      "associateProfessorSanctionedPost": 0,
      "id": 0,
      "professorPostYetToBeSanctioned": 0,
      "professorSanctionedPost": 0,
    });
    this.facility = this.fb.group({
      isElectricity: [null, [Validators.required]],
      isWaterFacility: [null, [Validators.required]],
      isInternetConnectivityThroughLan: [null, [Validators.required]],
      isWithin100mDistanceFromPuccaRoad: [null, [Validators.required]],
      isNearHabitation: [null, [Validators.required]],
      preCollebePPP: [null, [Validators.required]],
      preCollebe: [null, [Validators.required]],

      // isWithExistingLinkageLocalIndustry: [null,[Validators.required]],
      // isWithExistingLinkagePpp: [null,[Validators.required]],
      // isWithScopeForLinkageLocalIndustry: [null,[Validators.required]],
      // isWithScopeForLinkagePpp: [null,[Validators.required]],
      // isWithoutLinkageLocalIndustry: [null,[Validators.required]],
      // isWithoutLinkagePpp: [null,[Validators.required]],


    });
    this.anticipated = this.fb.group({
      "courseLevelId": [null, [Validators.required]],
      "id": 0,
      "programmeId": [null, [Validators.required]],
      "females1823Population": [0, [Validators.required]],
      "femalesAnticipatedEnrollment": [0, [Validators.required]],
      "gen1823Population": [0, [Validators.required]],
      "genAnticipatedEnrollment": [0, [Validators.required]],
      "obc1823Population": [0, [Validators.required]],
      "obcAnticipatedEnrollment": [0, [Validators.required]],
      "sc1823Population": [0, [Validators.required]],
      "scAnticipatedEnrollment": [0, [Validators.required]],
      "st1823Population": [0, [Validators.required]],
      "stAnticipatedEnrollment": [0, [Validators.required]],
      "courseId": [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getDepartmentData();
    this.getLevelData()
    // this.getTIF();
    this.getPageStatusList();


  }

  tabSelected(event: any) {
    this.selectedIndex = event.index
    this.close()
    if (this.selectedIndex === 0) {
      this.getDepartmentData();
     
    }
    if (this.selectedIndex === 1) {
      this.getProgramList()
    } if (this.selectedIndex === 2) {
      this.getTIF()
    }
    if (this.selectedIndex === 3) {
      this.getNonTeacher()
    } if (this.selectedIndex === 4) {
      this.getOutComeIndicator();

    } if (this.selectedIndex === 5) {
      this.getProgramList();
      this.getLevelData()
      this.getAnticipated()
    } if (this.selectedIndex === 6) {
      this.getFacility()
    }

  }

  add() {
    this.addUpdate = true;
    this.hideButton = false;
    this.addUpdateButton = "Save";
  }
  onKeypressEvent1(event, inputLength) {
    if (!((event.keyCode > 95 && event.keyCode < 106)
      || (event.keyCode > 47 && event.keyCode < 58)
      || event.keyCode == 8)) {
      event.preventDefault();
      return false;
    }

    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.nmdcComponentId).subscribe(
      (res) => {
        if (res.data && res.data.length) {
          for (let index = 0; index < res.data.length; index++) {

            if (res.data[index].moduleName === this.common.nmdcFinal) {
              this.disabledPage = true;
            }

          }
        }
      },
      (err) => { }
    );
  }

  getLevelData() {
    this.masterService.getLevel().subscribe((res) => {
      this.variables = res;
      this.levelList = this.variables.slice();
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getProgramDataAnticipated() {
    this.programmeList = this.courseData.filter((ele) => ele.courseLevelId === this.anticipated.value.courseLevelId)
  }
  getProgramData() {


    this.masterService
      .getProgramme(this.programme.value.courseLevelId || this.anticipated.value.courseLevelId)
      .subscribe((res) => {
        this.variables1 = res,
          this.variables2 = res;
        this.programmeList = this.variables1.slice();
        this.programmeList = this.variables2.slice();

      }, err => {

      });
  }
  getDepartmentData() {
    this.get.getDepartmentData(this.sharedService.nmdcComponentId, this.districtCode).subscribe((res) => {
      this.departmentList = res.data;
      this.departmentList.forEach(element => {
        let split = element.studentTeacherRatio?.split(":");
        if (split?.['1']) {
          element.studentTeacherRatio = split?.[0];
          element['studentTeacherRatio1'] = split?.[1]

        }
      });
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getProgramList() {
    this.get.getProposedProgramme(this.districtCode, this.sharedService.nmdcComponentId).subscribe(res => {
      this.courseData = res;

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getFilterData(value) {
    this.courseList = this.courseData.filter(e => e.programmeId === value)
  }
  getTIF() {
    this.get.getTeacher(this.districtCode, this.sharedService.nmdcComponentId).subscribe((res) => {
      if (res && res.length) {
        if (res['0']) {
          this.tif.patchValue(res['0']);
          this.tif.get('assistantProfessorSanctionedPost').setValue(res['0'].assistantProfessorSanctionedPost);
          this.tif.get('assistantProfessorPostYetToBeSanctioned').setValue(res['0'].assistantProfessorPostYetToBeSanctioned);
        } if (res['1']) {
          this.tif.get('departmentId2').setValue(res['1'].departmentId);
          this.tif.get('associateProfessorSanctionedPost').setValue(res['1'].associateProfessorSanctionedPost);
          this.tif.get('associateProfessorPostYetToBeSanctioned').setValue(res['1'].associateProfessorPostYetToBeSanctioned);
        } if (res['2']) {
          this.tif.get('departmentId3').setValue(res['2'].departmentId);
          this.tif.get('professorSanctionedPost').setValue(res['2'].professorSanctionedPost);
          this.tif.get('professorPostYetToBeSanctioned').setValue(res['2'].professorPostYetToBeSanctioned);
        }

      }
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getNonTeacher() {
    this.get.getNonTeacherStaff(this.districtCode, this.sharedService.nmdcComponentId).subscribe((res) => {
      if (res.data && res.data.length) {
        this.formDataNonTeachingStaff.patchValue(res.data["0"]);
      }
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getOutComeIndicator() {
    this.get.getProposedCome().subscribe(
      (res) => {
        this.dataOutComeList = []
        res.forEach((e: any) => {
          if (e.targetType === 'character') {
            e.targetType = 'text'
          } if (e.baseYearType === 'character') {
            e.baseYearType = 'text'
          } if (e.targetType === 'float') {
            e.targetType = 'number'
          } if (e.baseYearType === 'float') {
            e.baseYearType = 'number'
          }
          if (e.isNdmcIndicator) {
            this.dataOutComeList.push({
              indicatorName: e.indicatorName,
              id: e.id,
              baseYear: 0,
              outId: 0,
              isProjectCompletedTarget31032024: '',
              isProjectCompletedTarget31032025: '',
              isProjectCompletedTarget31032026: '',
              targetLength: e.targetLength,
              targetRegex: e.targetRegex,
              targetType: e.targetType,
              baseYearLength: e.baseYearLength,
              baseYearRegex: e.baseYearRegex,
              baseYearType: e.baseYearType
            });
          }
        });
        this.getOutComeData();
      },
      (error) => { }
    );

  }
  getOutComeData() {
    this.get.getOutComeNMDC(this.districtCode, this.sharedService.nmdcComponentId).subscribe((res) => {
      this.outComeDataList = res.data
      this.dataOutComeList.forEach(element => {
        this.outComeDataList.forEach(e => {
          if (e.outcomeIndicatorId === element.id) {
            element.id = e.outcomeIndicatorId
            element.outId = e.id
            element.baseYear = e.baseYear
            element.isProjectCompletedTarget31032024 = e.isProjectCompletedTarget31032024
            element.isProjectCompletedTarget31032025 = e.isProjectCompletedTarget31032025
            element.isProjectCompletedTarget31032026 = e.isProjectCompletedTarget31032026
            element.baseYear = e.baseYear
          }
        })
      });
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  saveTab1() {
    if (this.formDataDepartment.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    if (this.formDataDepartment.controls['name'].value.trim() === "") {
      this.notification.showValidationMessage('Please enter department');
      return;
    }

    for (let index = 0; index < this.departmentList.length; index++) {
      if (this.AddDepartment !== 'Update') {
        if (this.departmentList[index].name.trim().toUpperCase() === this.formDataDepartment.controls['name'].value.trim().toUpperCase()) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      } else {
        if (this.departmentList[index].id !== this.formDataDepartment.controls['id'].value){
          if (this.departmentList[index].name.trim().toUpperCase() === this.formDataDepartment.controls['name'].value.trim().toUpperCase()) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }
      }
    }
    let temp = [];
    temp.push({
      component: {
        id: this.sharedService.nmdcComponentId,
      },
      id: this.formDataDepartment.value.id,
      name: this.formDataDepartment.value.name,
      stateCode: this.stateCode,
      districtCode: this.districtCode,
    })
    this.post.saveDepartment(temp, this.common.nmdcDepartment).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getDepartmentData()
        this.AddDepartment="Add";
        this.reset()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

  }
  saveTab2(data:any) {
    let temp = [];
    if (this.programme.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning();
      return;
    } else {
      this.isFormInvalid = false;
    }
    if (this.programme.controls['name'].value.trim() === "") {
      this.notification.showValidationMessage('Please enter course !!!');
      return;
    }

    for (let index = 0; index < this.courseData.length; index++) {
      if (this.addUpdateButton !== 'Update') {
        if (this.courseData[index].departmentId === data.departmentId && this.courseData[index].courseLevelId === data.courseLevelId && this.courseData[index].programmeId === data.programmeId && this.courseData[index].name.trim().toUpperCase() === data.name.trim().toUpperCase()) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      } else {
        if (this.courseData[index].id !== data.id){
          if (this.courseData[index].departmentId === data.departmentId && this.courseData[index].courseLevelId === data.courseLevelId && this.courseData[index].programmeId === data.programmeId && this.courseData[index].name.trim().toUpperCase() === data.name.trim().toUpperCase()) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }
      }
    }
    temp.push({
      "componentId": this.sharedService.nmdcComponentId,
      "courseLevelId": this.programme.controls['courseLevelId'].value,
      "departmentId": this.programme.controls['departmentId'].value,
      "districtCode": this.districtCode,
      "durationMonth": this.programme.controls['durationMonth'].value,
      "durationYear": this.programme.controls['durationYear'].value,
      "enrolmentTargetFifthYear": this.programme.controls['enrolmentTargetFifthYear'].value,
      "enrolmentTargetFirstYear": this.programme.controls['enrolmentTargetFirstYear'].value,
      "enrolmentTargetFourthYear": this.programme.controls['enrolmentTargetFourthYear'].value,
      "enrolmentTargetSecondYear": this.programme.controls['enrolmentTargetSecondYear'].value,
      "enrolmentTargetThirdYear": this.programme.controls['enrolmentTargetThirdYear'].value,
      "id": this.programme.controls['id'].value,
      "isApprovedByUgc": this.programme.controls['isApprovedByUgc'].value,
      "name": this.programme.controls['name'].value,
      "programmeId": this.programme.controls['programmeId'].value,
      "stateCode": this.stateCode
    })
    this.post.postProposalCourse(temp, this.common.nmdcProgram).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getProgramList()
        this.reset()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveTab4() {
    if (this.formDataNonTeachingStaff.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning()
      return;
    } else {
      this.isFormInvalid = false;
    }
    let temp = [
      {
        adminDeptPostYetToBeSanctioned:
          this.formDataNonTeachingStaff.value.adminDeptPostYetToBeSanctioned,
        adminDeptSanctionedPost:
          this.formDataNonTeachingStaff.value.adminDeptSanctionedPost,
        aisheCode: this.aisheCode,
        componentId: this.sharedService.nmdcComponentId,
        districtCode: this.districtCode,
        id: this.formDataNonTeachingStaff.value.id,
        othersDeptPostYetToBeSanctioned:
          this.formDataNonTeachingStaff.value.othersDeptPostYetToBeSanctioned,
        othersDeptSanctionedPost:
          this.formDataNonTeachingStaff.value.othersDeptSanctionedPost,
        stateCode: this.stateCode,
        technicalDeptPostYetToBeSanctioned:
          this.formDataNonTeachingStaff.value
            .technicalDeptPostYetToBeSanctioned,
        technicalDeptSanctionedPost:
          this.formDataNonTeachingStaff.value.technicalDeptSanctionedPost,
      },
    ];
    this.post.postNonTeachingSaff(temp, this.common.nmdcNonTIF).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getNonTeacher();
      }
    });
  }
  saveTab3() {
    let temp = []
    // temp.push({
    //   "assistantProfessorPostYetToBeSanctioned": this.tif.controls['assistantProfessorPostYetToBeSanctioned'].value,
    //   "assistantProfessorSanctionedPost": this.tif.controls['assistantProfessorSanctionedPost'].value,
    //   "componentId": this.sharedService.nmdcComponentId,
    //   "districtCode": this.districtCode,
    //   "id": this.tif.controls['id'].value,
    //   "stateCode": this.stateCode,
    // })
    // temp.push({
    //   "associateProfessorPostYetToBeSanctioned": this.tif.controls['associateProfessorPostYetToBeSanctioned'].value,
    //   "associateProfessorSanctionedPost": this.tif.controls['associateProfessorSanctionedPost'].value,
    //   "componentId": this.sharedService.nmdcComponentId,
    //   "districtCode": this.districtCode,
    //   "id": this.tif.controls['id'].value,
    //   "stateCode": this.stateCode,
    //  // "departmentId": this.tif.controls['departmentId2'].value
    // })
    // temp.push({
    //   "professorPostYetToBeSanctioned": this.tif.controls['professorPostYetToBeSanctioned'].value,
    //   "professorSanctionedPost": this.tif.controls['professorSanctionedPost'].value,
    //   "componentId": this.sharedService.nmdcComponentId,
    //   "districtCode": this.districtCode,
    //   "id": this.tif.controls['id'].value,
    //   "stateCode": this.stateCode,
    //   //"departmentId": this.tif.controls['departmentId3'].value
    // })

    if (this.tif.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning();
      return;
    } else {
      this.isFormInvalid = false
    }
    temp = [
      {

        "assistantProfessorPostYetToBeSanctioned": this.tif.controls['assistantProfessorPostYetToBeSanctioned'].value,
        "assistantProfessorSanctionedPost": this.tif.controls['assistantProfessorSanctionedPost'].value,
        "associateProfessorPostYetToBeSanctioned": this.tif.controls['associateProfessorPostYetToBeSanctioned'].value,
        "associateProfessorSanctionedPost": this.tif.controls['associateProfessorSanctionedPost'].value,
        "componentId": this.sharedService.nmdcComponentId,
        "districtCode": this.districtCode,
        "id": this.tif.controls['id'].value,
        "professorPostYetToBeSanctioned": this.tif.controls['professorPostYetToBeSanctioned'].value,
        "professorSanctionedPost": this.tif.controls['professorSanctionedPost'].value,
        "stateCode": this.stateCode
      }
    ]
    this.post.saveTIF(temp, this.common.nmdcTeaching).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getTIF()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveTab5() {
    let temp = [];
    for (let index = 0; index < this.dataOutComeList.length; index++) {
      //   if(this.dataOutComeList[index].id === 3){
      //     if (this.dataOutComeList[index].baseYear === '' || this.dataOutComeList[index].isProjectCompletedTarget31032024 === '0' || this.dataOutComeList[index].isProjectCompletedTarget31032025 === '0' || this.dataOutComeList[index].isProjectCompletedTarget31032026 === '0') {
      //       this.notification.showValidationMessage('Please choose YES/NO !!!');
      //       this.isFormInvalid = true
      //       return;
      //     }
      //   }
      //   if (this.dataOutComeList[index].baseYear === '' || this.dataOutComeList[index].isProjectCompletedTarget31032024 === '' || this.dataOutComeList[index].isProjectCompletedTarget31032025 === '' || this.dataOutComeList[index].isProjectCompletedTarget31032026 === '') {
      //     this.notification.showWarning();
      //     this.isFormInvalid = true
      //     return;
      //   } else {
      //     this.isFormInvalid = false
      temp.push({
        baseYear: Number(this.dataOutComeList[index].baseYear),
        districtCode: this.districtCode,
        id: this.dataOutComeList[index].outId,
        componentId: this.sharedService.nmdcComponentId,
        isProjectCompletedTarget31032024:
          this.dataOutComeList[index].isProjectCompletedTarget31032024,
        isProjectCompletedTarget31032025:
          this.dataOutComeList[index].isProjectCompletedTarget31032025,
        isProjectCompletedTarget31032026:
          this.dataOutComeList[index].isProjectCompletedTarget31032026,
        outcomeIndicatorId: this.dataOutComeList[index].id,
        stateCode: this.stateCode,
      })
      // }
    }

    this.post.postOutCome(temp, this.common.nmdcOutcome).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.getOutComeData();
        }
      },
      (error) => { }
    );
  }

  saveTab6(data) {
    if (this.anticipated.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning();
      return;
    } else {
      this.isFormInvalid = false
    }
    for (let index = 0; index < this.anticipatedList.length; index++) {
      if (this.addUpdateButton !== 'Update') {
        if (this.anticipatedList[index].courseLevelId === data.courseLevelId && this.anticipatedList[index].programmeId === data.programmeId && this.anticipatedList[index].courseId === data.courseId) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      } else {
        if (this.anticipatedList[index].id !== data.id){
          if (this.anticipatedList[index].courseLevelId === data.courseLevelId && this.anticipatedList[index].programmeId === data.programmeId && this.anticipatedList[index].courseId === data.courseId) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }
      }
    }
    let payload = [{
      "componentId": this.sharedService.nmdcComponentId,
      "courseLevelId": this.anticipated.controls['courseLevelId'].value,
      "id": this.anticipated.controls['id'].value,
      "districtCode": this.districtCode,
      "stateCode": this.stateCode,
      "courseId": this.anticipated.controls['courseId'].value,
      "programmeId": this.anticipated.controls['programmeId'].value,
      "females1823Population": this.anticipated.controls['females1823Population'].value,
      "femalesAnticipatedEnrollment": this.anticipated.controls['femalesAnticipatedEnrollment'].value,
      "gen1823Population": this.anticipated.controls['gen1823Population'].value,
      "genAnticipatedEnrollment": this.anticipated.controls['genAnticipatedEnrollment'].value,
      "obc1823Population": this.anticipated.controls['obc1823Population'].value,
      "obcAnticipatedEnrollment": this.anticipated.controls['obcAnticipatedEnrollment'].value,
      "sc1823Population": this.anticipated.controls['sc1823Population'].value,
      "scAnticipatedEnrollment": this.anticipated.controls['scAnticipatedEnrollment'].value,
      "st1823Population": this.anticipated.controls['st1823Population'].value,
      "stAnticipatedEnrollment": this.anticipated.controls['stAnticipatedEnrollment'].value,
    }]

    this.post.postAnticipated(payload, this.common.nmdcEnrol).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.getAnticipated();
          this.reset();
        }
      },
      (error) => { }
    );
  }
  getAnticipated() {
    this.get.getAnticipatedList(this.districtCode, this.sharedService.nmdcComponentId).subscribe(res => {
      this.anticipatedList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }



  saveTab7() {
    if (this.facility.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning();
      return;
    } else {
      this.isFormInvalid = false
    }
    let payload = {
      "componentId": this.sharedService.nmdcComponentId,
      "id": this.facilityId,
      "isInternetConnectivityThroughLan": this.facility.controls['isInternetConnectivityThroughLan'].value,
      "isElectricity": this.facility.controls['isElectricity'].value,
      "isNearHabitation": this.facility.controls['isNearHabitation'].value,
      "isWaterFacility": this.facility.controls['isWaterFacility'].value,
      "isWithExistingLinkageLocalIndustry": this.facility.controls['preCollebe'].value === 'With existing Linkages' ? true : false,
      "isWithScopeForLinkageLocalIndustry": this.facility.controls['preCollebe'].value === 'With scope for linkage' ? true : false,
      "isWithoutLinkageLocalIndustry": this.facility.controls['preCollebe'].value === 'Without Linkages' ? true : false,
      "isWithExistingLinkagePpp": this.facility.controls['preCollebePPP'].value === 'With existing Linkages' ? true : false,
      "isWithScopeForLinkagePpp": this.facility.controls['preCollebePPP'].value === 'With scope for linkage' ? true : false,
      "isWithoutLinkagePpp": this.facility.controls['preCollebePPP'].value === 'Without Linkages' ? true : false,
      "isWithin100mDistanceFromPuccaRoad": this.facility.controls['isWithin100mDistanceFromPuccaRoad'].value,
      "districtCode": this.districtCode,
      "stateCode": this.stateCode
      //"preCollaborationWithLocalIndustryDetail": "string",
      //  "preCollaborationWithPppDetail": "string"


    }
    this.post.postNmdcFacility(payload, this.common.nmdcFacility).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getFacility()
      }
    }, err => {
    })
  }
  getFacility() {
    this.get.getNmdcBasic(this.districtCode, this.sharedService.nmdcComponentId).subscribe(res => {
      this.facility.patchValue(res['0'])
      if (res['0'].isWithExistingLinkageLocalIndustry) {
        this.facility.get('preCollebe').setValue('With existing Linkages')
      } if (res['0'].isWithScopeForLinkageLocalIndustry) {
        this.facility.get('preCollebe').setValue('With scope for linkage')
      } if (res['0'].isWithoutLinkageLocalIndustry) {
        this.facility.get('preCollebe').setValue('Without Linkages')
      } if (res['0'].isWithExistingLinkagePpp) {
        this.facility.get('preCollebePPP').setValue('With existing Linkages')
      } if (res['0'].isWithScopeForLinkagePpp) {
        this.facility.get('preCollebePPP').setValue('With scope for linkage')
      } if (res['0'].isWithoutLinkagePpp) {
        this.facility.get('preCollebePPP').setValue('Without Linkages')
      }
      this.facilityId = res['0']?.id
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  editRow(item: any) {
    this.addUpdateButton = "Update";
    this.AddDepartment="Update";
    this.hideButton = false
    this.addUpdate = true;
    this.showButton = true;
    if (this.selectedIndex === 0) {
      this.formDataDepartment.patchValue(item)
    } if (this.selectedIndex === 1) {
      this.programme.patchValue(item);
      this.getProgramData();
    } if (this.selectedIndex === 5) {
      this.anticipated.patchValue(item);
      this.getProgramData();
      this.getFilterData(this.anticipated.value.programmeId)
    }
  }

  close() {
    this.addUpdateButton = "Save";
    this.AddDepartment="Add";
    this.hideButton = true
    this.addUpdate = false;
    this.reset()
  }
  reset() {
    this.isFormInvalid = false
    this.addUpdateButton = "Save";
    if (this.selectedIndex === 0) {
      this.formDataDepartment.reset();
      this.formDataDepartment.get("id")?.setValue(0);
    } if (this.selectedIndex === 1) {
      this.programme.reset();
      this.programme.get("id")?.setValue(0);
    } if (this.selectedIndex === 2) {
      this.tif.reset();
      this.tif.get("id")?.setValue(0);
    } if (this.selectedIndex === 3) {
      this.formDataNonTeachingStaff.reset();
      this.formDataNonTeachingStaff.get("id")?.setValue(0);
    } if (this.selectedIndex === 4) {
      this.dataOutComeList.forEach((e: any, index) => {
        this.dataOutComeList[index].baseYear = 0
        this.dataOutComeList[index].isProjectCompletedTarget31032024 = 0
        this.dataOutComeList[index].isProjectCompletedTarget31032025 = 0
        this.dataOutComeList[index].isProjectCompletedTarget31032026 = 0
      })
    } if (this.selectedIndex === 5) {
      this.anticipated.reset();
      this.anticipated.get('id')?.setValue(0)
    } if (this.selectedIndex === 6) {
      this.facility.reset()
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.tif.controls;
  }
  delete(item) {
  
    this.common.delete().subscribe(res => {
      if (res) {
        if(this.selectedIndex === 0){
          this.deleteService.deleteDepartment(item.id,this.sharedService.nmdcComponentId).subscribe(res => {
            this.notification.showDelete();
            this.getDepartmentData()
          }, err => {
  
          })
        }
        if(this.selectedIndex === 1){
          this.deleteService.deleteProposedCourseNMDC(item,this.sharedService.nmdcComponentId).subscribe(res => {
            this.notification.showDelete();
            this.getProgramList()
          }, err => {
  
          })
        }if(this.selectedIndex === 5){
          this.deleteService.deleteAnticipated(item).subscribe(res => {
            this.notification.showDelete();
            this.getAnticipated()
          }, err => {
  
          })
        }
        
      }
    })
  }


}
