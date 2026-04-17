import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'cfs-meru-section2',
  templateUrl: './meru-section2.component.html',
  styleUrls: ['./meru-section2.component.scss']
})
export class MeruSection2Component implements OnInit {
  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  tab: any;
  addDepartmentData: boolean = false;
  showButton: boolean = true;
  formDataDepartment: FormGroup;
  formDataCollegeDetail: FormGroup;
  formDataNonTeachingStaff: FormGroup;
  formDataCourse: FormGroup;
  departmentList: any;
  aisheCode: string;
  programmeList: Array<any> = [];
  levelList: Array<any> = [];
  courseData: Array<any> = [];
  departmentName: any;
  sanctionedPostsTotal: any;
  instituteCategory: any;
  selectedIndex: any = 0;
  tabIndex = 0;
  disabledPage: boolean = false
  hideButton: boolean = true;
  addUpdateButton: string = "Save";
  addUpdateButtonD: string = 'Add'
  districtName: string;
  collegeName: string;
  insType: string;
  stateCode: string;
  districtCode: string;
  variables: Array<any> = []
  variables1: Array<any> = [];
  activityFacilities: Array<any> = [];
  isFormInvalid: boolean = false
  isOrganogramUploaded: boolean = false
  organogramDoc: string
  organogramFile: any
  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    public notification: NotificationService,
    public common: Common, public sharedService: SharedService,
    public getService: GetService, public deleteService: DeleteService,
    public masterService: MasterService, public post: PostService, public errorMatcher: CustomErrorStateMatcher
  ) {
    this.aisheCode = sessionStorage.getItem("userName");
    this.districtName = sessionStorage.getItem('districtName')
    this.collegeName = sessionStorage.getItem('insName')
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    this.stateCode = sessionStorage.getItem("stateCode")
    this.districtCode = sessionStorage.getItem("districtCode");
    if (this.insType === 'U') {

      this.instituteCategory = 'UNIVERSITY'
    }
  }

  ngOnInit(): void {
    this.formDataDepartment = this.fb.group({
      departmentName: [null, [Validators.required]],
      departmentId: [0, []],
    });
    this.formDataCollegeDetail = this.fb.group({
      visionMission: [null, [Validators.required]],
      broadObjective: [null, [Validators.required]],
      organizationalStructure: [null, [Validators.required]],
      roleAndResponsibility: [null, [Validators.required]],
      teachingNonTeachingRatioTS: [null, [Validators.required]],
      teachingNonTeachingRatioNTS: [null, [Validators.required]],
      boardOfGovernance: [null, [Validators.required]],
      pmuDetail: [null, [Validators.required]],
      totalEnrollment: [null, [Validators.required]],
      infraExistingLandAvailability: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      sanctionedPostRegularFaculty: [null, [Validators.required]],
      postFilledInRegularMode: [null, [Validators.required]],
      percentageOfPostFilled: { value: 0, disabled: true },
      studentTeacherRatio: [null, [Validators.required]],
      studentTeacherRatio1: [null, [Validators.required]],
    });
    this.formDataCourse = this.fb.group({
      courseId: [0, []],
      departmentId: [null, [Validators.required]],
      level: [null, [Validators.required]],
      programme: [null, [Validators.required]],
      courseOffered: [null, [Validators.required]],
      year: [null, [Validators.required]],
      month: [null, [Validators.required]]
    });
    this.formDataNonTeachingStaff = this.fb.group({
      adminDeptSanctionedPost: [null, [Validators.required]],
      adminDeptPostYetToBeSanctioned: [null, [Validators.required]],
      technicalDeptPostYetToBeSanctioned: [null, [Validators.required]],
      technicalDeptSanctionedPost: [null, [Validators.required]],
      othersDeptSanctionedPost: [null, [Validators.required]],
      othersDeptPostYetToBeSanctioned: [null, [Validators.required]],
      id: [0, []],

    });
    this.getDepartmentData();
    this.getLevelData();
    this.getCourseData();
    this.getNonTeacher();
    this.getDataCollegeDetails();
    this.getPageStatusList()
  }
  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.meruComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.meruFinal) {
            this.disabledPage = true
          }

        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  tabSelected(event: any) {
    this.selectedIndex = event.index
    this.addUpdateButton = "Save";
    this.hideButton = true
    if (this.selectedIndex === 0) {
      this.isFormInvalid = false;
      this.formDataDepartment.reset()
    }
    if (this.selectedIndex === 1) {
      this.addDepartmentData = false;
      this.isFormInvalid = false;
    }
    if (this.selectedIndex === 2) {
      this.addDepartmentData = false;
      this.isFormInvalid = false;
      this.formDataDepartment.reset()
    }
    if (this.selectedIndex === 3) {
      this.addDepartmentData = false;
      this.isFormInvalid = false;
      this.formDataDepartment.reset()
    } if (this.selectedIndex === 4) {
      this.addDepartmentData = false;
      this.isFormInvalid = false;
      this.getActivityFacility();
      this.formDataDepartment.reset()
    }

  }
  getActivityFacility() {
    this.getService.activityFacility(this.aisheCode).subscribe(res => {
      if (res && res.length) {
        this.activityFacilities = res;
      } else {
        this.getActivity()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getActivity() {
    this.masterService.getActivityList().subscribe(res => {
      this.activityFacilities = []
      res.forEach(element => {
        if (element.meruUniversityAvailableFacility) {
          this.activityFacilities.push({
            id: 0,
            activityId: element.id,
            remarks: '',
            activityName: element.activityName,
            aisheCode: this.aisheCode,
            componentId: this.sharedService.meruComponentId,
            districtCode: this.districtCode,
            instituteCategory: this.insType,
            stateCode: this.stateCode,
            isAvailable: false,
            isDocumentUploaded: element.isDocumentUploaded
          })
        }
      });

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveActFacility() {
    for (let index = 0; index < this.activityFacilities.length; index++) {
      if (this.activityFacilities[index].isAvailable) {
        if (!this.activityFacilities[index].isDocumentUploaded) {
          this.notification.showValidationMessage('Please upload document !!!');
          return;
        }
      }

    }
    this.post.saveActivityFacility(this.activityFacilities,this.common.meruAvailableFacility).subscribe(res => {
      if (res.status === 200) {
        this.getActivityFacility();
        this.notification.showSuccess()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  arr: any
  getDataCollegeDetails() {
    this.api.getCollegeDetails(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe(
      (res) => {
        if (res.data !== null) {
          this.isOrganogramUploaded = res.data.isOrganogramUploaded
          if (this.isOrganogramUploaded) {
            this.getDocument()
          }
          this.formDataCollegeDetail.patchValue(res.data)
          this.arr = res.data.teachingNonTeachingRatio?.split(":");
          this.formDataCollegeDetail.get('teachingNonTeachingRatioTS')?.setValue(this.arr?.[0]);
          this.formDataCollegeDetail.get('teachingNonTeachingRatioNTS')?.setValue(this.arr?.[1]);
          let split = res.data.studentTeacherRatio?.split(":");
          if (split?.['1']) {
            this.formDataCollegeDetail.get('studentTeacherRatio').setValue(split?.[0])
            this.formDataCollegeDetail.get('studentTeacherRatio1')?.setValue(split?.[1])

          }
        }

      },
      (err) => { }
    );
  }
  getDocument() {
    let payload = {
      aisheCode: this.aisheCode,
      componentId: this.sharedService.meruComponentId,
      documentType: this.common.organogram,
    }
    this.common.downloadPDFProposal(payload).then((result: any) => {
      this.organogramDoc = result.name
      this.organogramFile = result.file
    })
  }
  downloadProposal() {
    this.common.viewPdf(this.organogramFile, this.organogramDoc)
  }
  getNonTeacher() {
    this.api.getNonTeacherStaff(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe((res) => {
      if (res.data.length > 0 && res.data.length) {
        this.formDataNonTeachingStaff.patchValue(res.data["0"]);
      }
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }

  getDepartmentData() {
    this.api.getDepartment(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe((res) => {
      this.departmentList = res.data;
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }

  getLevelData() {
    this.api.getLevel().subscribe((res) => {
      this.variables = res;
      this.levelList = this.variables.slice();
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getProgramData() {
    this.api.getProgramme(this.formDataCourse.value.level).subscribe((res) => {
      this.variables1 = res;
      this.programmeList = this.variables1.slice();
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }

  getCourseData() {
    this.api.getCourse(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe((res) => {
      this.courseData = res.data;
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  add() {
    this.addDepartmentData = true;
    this.hideButton = false;
    this.addUpdateButton = "Save";
    this.addUpdateButtonD = 'Add'
  }

  //COLLEGE_DEPARTMENT_DETAILS
  save() {
    if (this.formDataDepartment.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning()
      return;
    } else {
      this.isFormInvalid = false;
    }
    if (this.formDataDepartment.controls['departmentName'].value.trim() === "") {
      this.notification.showValidationMessage('Please enter department');
      return;
    }

    for (let index = 0; index < this.departmentList.length; index++) {
      if (this.addUpdateButtonD !== 'Update') {
        if (this.departmentList[index].name.trim().toUpperCase() === this.formDataDepartment.controls['departmentName'].value.trim().toUpperCase()) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      } else {
        if (this.departmentList[index].id !== this.formDataDepartment.controls['departmentId'].value){
          if (this.departmentList[index].name.trim().toUpperCase() === this.formDataDepartment.controls['departmentName'].value.trim().toUpperCase()) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }
      }
    }
    let temp = [];
    temp = [
      {
        aisheCode: this.aisheCode,
        component: {
          id: this.sharedService.meruComponentId,
        },
        id: this.formDataDepartment.value.departmentId,
        instituteCategory: this.insType,
        name: this.formDataDepartment.value.departmentName,
        stateCode: this.stateCode,
        districtCode: this.districtCode,

      },
    ];
    if (this.formDataDepartment.valid) {
      this.api
        .postDepartmentData(temp, this.common.meruDepartment)
        .subscribe((res) => {
          if (res.status === 200) {
            this.notification.showSuccess();
            this.formDataDepartment.reset();
            this.formDataDepartment.get("departmentId")?.setValue(0);
            this.addUpdateButtonD = 'Add'
            this.getDepartmentData();
          }
        });
    }
  }
  validationLatLong(latitude, longitude) {
    // latitude 6-38
    // longitude 68 - 98
    if (latitude) {
      var lat = latitude.toString().split('.');
      let l = 0;
      if (lat[1]) {
        l = lat[1].length;
      }
      if (parseInt(lat[0]) < 6 || parseInt(lat[0]) > 38 || l < 5) {
        this.notification.showValidationMessage('Latitude [Range: 6.00000 - 38.00000] ,Values must contain minimum of 5 digits after the decimal point.')
        return false;
      }
    } if (longitude) {
      var long = longitude.toString().split('.');

      let lg = 0;

      if (long[1]) {
        lg = long[1].length;
      }
      if (parseInt(long[0]) < 68 || parseInt(long[0]) > 98 || lg < 5) {
        this.notification.showValidationMessage('Longitude [Range: 68.00000 - 98.00000] ,Values must contain minimum of 5 digits after the decimal point.')

        return false;
      }
    }

    return true;
  }
  saveCollegeDetail() {
    const input1 = document.getElementById(
      'visionMission',
    ) as HTMLInputElement | null;

    if (input1 != null) {
      var visionMission = input1.value
      // var c =input.value.replace(/\n/g, '<br />')
    }
    const input2 = document.getElementById(
      'broadObjectives',
    ) as HTMLInputElement | null;

    if (input2 != null) {
      var broadObjectives = input2.value
    }
    const input3 = document.getElementById(
      'organizationalStructure',
    ) as HTMLInputElement | null;

    if (input3 != null) {
      var organizationalStructure = input3.value
    }
    const input4 = document.getElementById(
      'roleAndResponsibility',
    ) as HTMLInputElement | null;

    if (input4 != null) {
      var roleAndResponsibility = input4.value
    }
    const input5 = document.getElementById(
      'boardOfGovernance',
    ) as HTMLInputElement | null;

    if (input5 != null) {
      var boardOfGovernance = input5.value
    }
    const input6 = document.getElementById(
      'pmuDetail',
    ) as HTMLInputElement | null;

    if (input6 != null) {
      var pmuDetail = input6.value
    }
    if (this.formDataCollegeDetail.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning()
      return;
    } else {
      this.isFormInvalid = false;
    }
    var latitude = null;
    var longitude = null;
    if (this.formDataCollegeDetail.value.latitude || this.formDataCollegeDetail.value.longitude) {
      let c: boolean = this.validationLatLong(this.formDataCollegeDetail.value.latitude, this.formDataCollegeDetail.value.longitude);
      if (!c) {
        return;
      } else {
        latitude = this.formDataCollegeDetail.value.latitude
        longitude = this.formDataCollegeDetail.value.longitude
      }
    }
    let studentTeacherRatio = null;
    studentTeacherRatio = this.formDataCollegeDetail.value.studentTeacherRatio + ':' + this.formDataCollegeDetail.value.studentTeacherRatio1
    let teacherRatioNT = this.formDataCollegeDetail.value.teachingNonTeachingRatioTS + ':' + this.formDataCollegeDetail.value.teachingNonTeachingRatioNTS
    let temp = {
      isOrganogramUploaded: this.isOrganogramUploaded,
      aisheCode: this.aisheCode,
      boardOfGovernance: boardOfGovernance,
      broadObjective: broadObjectives,
      visionMission: visionMission,
      roleAndResponsibility: roleAndResponsibility,
      organizationalStructure: organizationalStructure,
      pmuDetail: pmuDetail,
      componentId: this.sharedService.meruComponentId,
      infraExistingLandAvailability: this.formDataCollegeDetail.value.infraExistingLandAvailability,
      instituteCategory: this.insType,
      latitude: latitude,
      longitude: longitude,
      teachingNonTeachingRatio: teacherRatioNT,
      totalEnrollment: this.formDataCollegeDetail.value.totalEnrollment,
      studentTeacherRatio: studentTeacherRatio,
      sanctionedPostRegularFaculty: this.formDataCollegeDetail.value.sanctionedPostRegularFaculty,
      percentageOfPostFilled: this.formDataCollegeDetail.controls['percentageOfPostFilled'].value,
      postFilledInRegularMode: this.formDataCollegeDetail.value.postFilledInRegularMode,
    };

    this.api.postCollegeDetail(temp, this.common.meruDetailsUniversity).subscribe(
      (res) => {
        if (res.status === 200) {
          this.getDataCollegeDetails()
          this.notification.showSuccess()
        }
      },
      (err) => { }
    );
  }
  // couese data save institute/basic-detail
  saveCourse(data:any) {
    if (this.formDataCourse.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning()
      return;
    } else {
      this.isFormInvalid = false;
    }
    let temp = [];
    let characters = this.aisheCode.split(/[\W\d]+/).join("");

    if (this.formDataCourse.controls['courseOffered'].value.trim() === "") {
      this.notification.showValidationMessage('Please enter course !!!');
      return;
    }

    for (let index = 0; index < this.courseData.length; index++) {
      if (this.addUpdateButton !== 'Update') {
        if (this.courseData[index].departmentId === data.departmentId && this.courseData[index].courseLevelId === data.level && this.courseData[index].programmeId === data.programme && this.courseData[index].name.trim().toUpperCase() === data.courseOffered.trim().toUpperCase()) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      } else {
        if (this.courseData[index].id !== data.courseId){
          if (this.courseData[index].departmentId === data.departmentId && this.courseData[index].courseLevelId === data.level && this.courseData[index].programmeId === data.programme && this.courseData[index].name.trim().toUpperCase() === data.courseOffered.trim().toUpperCase()) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }
      }
    }
    temp = [
      {
        aisheCode: this.aisheCode,
        component: {
          id: this.sharedService.meruComponentId,
        },
        courseLevelId: {
          id: this.formDataCourse.value.level,
        },
        departmentId: this.formDataCourse.value.departmentId,
        districtCode: sessionStorage.getItem("districtCode"),
        durationMonth: this.formDataCourse.value.month,
        durationYear: this.formDataCourse.value.year,
        programmeId: this.formDataCourse.value.programme,
        id: this.formDataCourse.value.courseId,
        instituteCategory: characters,
        name: this.formDataCourse.value.courseOffered,
        stateCode: sessionStorage.getItem("stateCode"),
        totalEnrollment: this.formDataCourse.value.totalEnrollment,
      },
    ];
    this.api.postCourse(temp, this.common.meruCourse).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getCourseData();
        this.formDataCourse.reset();
        this.addUpdateButton = 'Save'
        this.formDataCourse.get("courseId")?.setValue(0);
      }
    });
  }
  saveNonTeacher() {
    if (this.formDataNonTeachingStaff.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning()
      return;
    } else {
      this.isFormInvalid = false;
    }
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = [
      {
        adminDeptPostYetToBeSanctioned:
          this.formDataNonTeachingStaff.value.adminDeptPostYetToBeSanctioned,
        adminDeptSanctionedPost:
          this.formDataNonTeachingStaff.value.adminDeptSanctionedPost,
        aisheCode: this.aisheCode,
        componentId: this.sharedService.meruComponentId,
        districtCode: sessionStorage.getItem("districtCode"),
        id: this.formDataNonTeachingStaff.value.id,
        instituteCategory: characters,
        othersDeptPostYetToBeSanctioned:
          this.formDataNonTeachingStaff.value.othersDeptPostYetToBeSanctioned,
        othersDeptSanctionedPost:
          this.formDataNonTeachingStaff.value.othersDeptSanctionedPost,
        stateCode: sessionStorage.getItem("stateCode"),
        technicalDeptPostYetToBeSanctioned:
          this.formDataNonTeachingStaff.value
            .technicalDeptPostYetToBeSanctioned,
        technicalDeptSanctionedPost:
          this.formDataNonTeachingStaff.value.technicalDeptSanctionedPost,
      },
    ];
    this.api.postNonTeachingSaff(temp, this.common.meruNonTechibg).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getNonTeacher()
      }
    });
  }

  editCourse(data: any) {
    this.addUpdateButton = "Update";
    this.hideButton = false
    this.addDepartmentData = true;
    this.formDataCourse.get("courseId")?.setValue(data.id);
    this.formDataCourse.get("departmentId")?.setValue(data.departmentId);
    this.formDataCourse.get("programme")?.setValue(data.programmeId);
    this.formDataCourse.get("courseOffered")?.setValue(data.name);
    this.formDataCourse.get("year")?.setValue(data.durationYear);
    this.formDataCourse.get("month")?.setValue(data.durationMonth);
    this.formDataCourse.get("totalEnrollment")?.setValue(data.totalEnrollment);
    this.formDataCourse.get("level")?.setValue(data.courseLevelId);
    this.getProgramData();
  }

  editRow(item: any) {
    this.addUpdateButtonD = 'Update'
    this.hideButton = false
    this.addDepartmentData = true;
    this.showButton = true;
    this.formDataDepartment.get("departmentName")?.setValue(item.name);
    this.formDataDepartment
      .get("teacherRatio")
      ?.setValue(item.studentTeacherRatio);
    this.formDataDepartment
      .get("teacherRatio1")
      ?.setValue(item.studentTeacherRatio1);
    this.formDataDepartment
      .get("regularFaculty")
      ?.setValue(item.sanctionedPostRegularFaculty);
    this.formDataDepartment.get("departmentId")?.setValue(item.id);
    this.formDataDepartment
      .get("postFilled")
      ?.setValue(item.percentageOfPostFilled);
    this.formDataDepartment
      .get("regularMode")
      ?.setValue(item.postFilledInRegularMode);
  }
  close() {
    this.addUpdateButton = "Save";
    this.hideButton = true
    this.addDepartmentData = false;
    this.formDataDepartment.reset();
    this.formDataCourse.reset();
    this.formDataDepartment.get("departmentId")?.setValue(0);
    this.formDataCourse.get("courseId")?.setValue(0);

  }

  reset() {
    if (this.selectedIndex === 3) {
      this.formDataNonTeachingStaff.reset();
    } if (this.selectedIndex === 2) {
      this.formDataCourse.get("courseId")?.setValue(0);
      this.formDataCourse.reset();
    }
    if (this.selectedIndex === 1) {
      this.formDataDepartment.get("departmentId")?.setValue(0);
      this.formDataDepartment.reset();
      this.addUpdateButtonD = 'Add'
    }
    if (this.selectedIndex === 0) {
      this.formDataCollegeDetail.reset();
    } if (this.selectedIndex === 4) {
      this.activityFacilities.forEach(element => {
        element.remarks = ''
      });
    }
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  delete(id: any) {
    this.common.delete().subscribe(res => {
      if (res) {
        if (this.selectedIndex === 1) {
          this.deleteService.deleteDepartment(id, this.sharedService.meruComponentId).subscribe(res => {
            if (res.status === 200) {
              this.getDepartmentData();
            }
          }, err => {

          })
        } if (this.selectedIndex === 2) {
          this.deleteService.deleteCourse(id).subscribe(res => {
            if (res.status === 200) {
              this.getCourseData();
            }
          }, err => {

          })
        }

      }
    })
  }
  calculatePercentage() {
    if (this.formDataCollegeDetail.controls['sanctionedPostRegularFaculty'].value < this.formDataCollegeDetail.controls['postFilledInRegularMode'].value) {
      this.notification.showValidationMessage('Post filled in Regular Mode should be equal or less then sanctioned post !!!');
      return;
    }
    if (!this.formDataCollegeDetail.controls['postFilledInRegularMode'].value) {
      this.formDataCollegeDetail.get('percentageOfPostFilled').setValue(0)
    }
    if (this.formDataCollegeDetail.controls['sanctionedPostRegularFaculty'].value && this.formDataCollegeDetail.controls['postFilledInRegularMode'].value) {

      let percentage = ((this.formDataCollegeDetail.controls['postFilledInRegularMode'].value / this.formDataCollegeDetail.controls['sanctionedPostRegularFaculty'].value) * 100);
      let a = percentage.toFixed(2)
      this.formDataCollegeDetail.get('percentageOfPostFilled').setValue(a)
    }

  }
  async getFileDetails(e: any, activityId, index) {
    this.myFiles = [];
    this.myFilesName = '';
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles.push(e.target.files[i]);
        this.myFilesName += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName += ',';
      }
    }
    const target = e.target as HTMLInputElement;
    if (this.myFiles && this.myFiles.length) {
      this.uploadDocument(activityId, index)

    }
  }
  uploadDocument(activityId, index) {
    const formdata: FormData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formdata.append('file', this.myFiles[i]);
    }
    let payload = {
      aisheCode: this.aisheCode,
      componentId: this.sharedService.meruComponentId,
      documentType: this.common.meruDoc,
      id: 0,
      meruActivityId: activityId
    }
    this.post.uploadDocuments(payload, formdata).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage('Document Uploaded');
        this.myFiles = [];
        this.activityFacilities[index].isDocumentUploaded = true
        this.activityFacilities[index].documentName=this.myFilesName
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // downloadPdf(data: any) {
  //   let uint8_data = _base64ToArrayBuffer(data);
  //   var ba = new Uint8Array(uint8_data);
  //   this.blob = new Blob([ba], { type: 'application/pdf' });
  //   function _base64ToArrayBuffer(base64: any) {
  //     var binary_string = window.atob(base64);
  //     var len = binary_string.length;
  //     var bytes = new Uint8Array(len);
  //     for (var i = 0; i < len; i++) {
  //       bytes[i] = binary_string.charCodeAt(i);
  //     }
  //     return bytes.buffer;
  //   }
  // }
  download(activityId) {
    let payload = {
      meruActivityId: activityId,
      aisheCode: this.aisheCode,
      componentId: this.sharedService.meruComponentId,
      documentType: this.common.meruDoc,
    }
    this.common.downloadPDF(payload)
  }
  async getFileDetails1(e: any) {
    this.myFiles = [];
    this.myFilesName = '';
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles.push(e.target.files[i]);
        this.myFilesName += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName += ',';
      }
    }
    const target = e.target as HTMLInputElement;
    if (this.myFiles && this.myFiles.length) {
      this.uploadDocument1()

    }
  }
  uploadDocument1() {
    const formdata: FormData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formdata.append('file', this.myFiles[i]);
    }
    let payload = {
      aisheCode: this.aisheCode,
      componentId: this.sharedService.meruComponentId,
      documentType: this.common.organogram,
      id: 0,
    }
    this.post.uploadDocumentsProposal(payload, formdata).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage('Document Uploaded');
        this.myFiles = [];
        this.myFilesName=''
        this.getDocument() 
        this.isOrganogramUploaded = true
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }


  
}
