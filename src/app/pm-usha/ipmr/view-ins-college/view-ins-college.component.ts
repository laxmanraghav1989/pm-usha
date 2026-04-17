import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { PostService } from 'src/app/service/post.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PmushaService } from '../service/pmusha.service';
import { catchError, tap, switchMap, concatMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { forkJoin} from 'rxjs';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/service/excel.service';
import { saveAs } from 'file-saver';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { CollegeUnivValidationService } from 'src/app/service/college-univ-validation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'cfs-view-ins-college',
  templateUrl: './view-ins-college.component.html',
  styleUrls: ['./view-ins-college.component.scss']
})
export class ViewInsCollegeComponent implements OnInit {
  basicDetailsEditView = true;
  public routers: typeof routes = routes;
  basicDetails: any;
  aisheCode: any;
  instituteCategory: any;
  courseData: any;
  proposedArea: any;
  perUnitCost: any;
  totalCost: any;
  infraRenoproposedArea: any;
  infraRenoperUnitCost: any;
  infraRenototalCost: any;
  quantity: any;
  equipmentperUnitCost: any;
  equipmenttotalCost: any;
  rusaData: any;
  tentativeDate: any;
  documentOfDpr: string;
  myFiles: any[];
  myFilesName: string;
  otherInfo: any;
  provideDetails: any;
  withExistringLinkage: boolean;
  withScopeForLinkage: boolean;
  withoutLinkage: boolean;
  blob: any;
  documentFile: any;
  tab: any
  componentId: any;
  total: number = 0;
  criteriaList: Array<any> = [];
  insType: string;
  stateCode: any;
  teachingRatio: any;
  arr: any;
  teacherRatio: any;
  quantitySoft: any;
  organogramDoc: any;
  organogramFile: any;
  districtCode: any;
  userTypeId: string;
  consultantRemarks: string;
  UpdateScoreList: Array<any> = [];
  sumConsutant: any;
  costData: any;
  infraconstructionData: Array<any> = [];
  infrarenovationData: Array<any> = [];
  equipmentProcData: Array<any> = [];
  softcompData: Array<any> = [];
  propcourseData: Array<any> = [];
  timelineData: Array<any> = [];
  propOutcomeData: Array<any> = [];
  activityDetailsData: Array<any> = [];
  activityNegativeRemrk: Array<any> = [];
  rusaApprovalDetails: Array<any> = [];
  basicNaacScoreDetails: any;
  userId: string;
  userName:any;
  consultantUserId: string;
  basicNaacDistrictCode: any;
  studentTeacherRatio: any;
  assignView:boolean=false
  pmushaUniqueCode: number;
  infraConstructionList: any;
  itemList: any[];
  renovatedList: any;
  equipmentList: any;
  softComponentList: any;
  targetNumber: any;
  infraproposedArea:any;
  infraperUnitCost:any;
  infratotalCost:any;
  getpropOutcomeData: any;
  activityData: any;
  otherInformData: any;
  instituteName: string;
  getremarkData:  any[]=[];
  arrMonths: any = [];
  arrYears: any = [];
  instuteNameUpdate: any;
  monthList: any[];
  month: any = "";
  modiefiedMonth: any;
  year:any = "";
  isView: boolean = false;
  updateProgressData: any[]=[];
  isPanelOpen: boolean;
  isPanelOpenScore: boolean;
  isPanelOpenCost: boolean;
  isPanelOpenFinc: boolean;
  isPanelOpenInfra: boolean;
  isPanelOpenReno: boolean;
  isPanelOpenEquip: boolean;
  isPanelOpenActivity: boolean;
  isPanelOpenOutcome: boolean;
  isPanelOpenAct: boolean;
  isPanelOpenSoft: boolean;
  isPanelOpenCourse: boolean;
  isPanelOpenOther: boolean;
  lockHidden: boolean;
  lockHiddenTag: boolean;
  uniqueId: string;
  uniqueYear: string;
  uniqueMonth: string;
  infraconditions: any[];
  renvoconditions: any[];
  equpconditions:any[];
  softconditions: any[];
  proposedconditions: any[];
  outcomeconditions: any[];
  activityconditions: any[];
  Progressconditions: any[];
  tagId: any;
  isRunning = true;
  deadlineDate: string;
  message: string;
  lockId: any;
  dataOutComeList: Array<any> = [];
  isAllSelected: boolean;
  isAllSelected1: boolean;
  isAllSelected2: boolean;
  isAllSelected3: boolean;
  districName: any;
  stateName: any;
  reportId: string;
  tabIndexId: string;
  uniqueStateCode: string;
  accreditationStatus: any;
  accreditationScore: any;
  accreditationGrade: any;
  dateOfAccreditationValidity: any;
  monthList1: string[];
  getDateTime: any;
  V3Elegibal: boolean;
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  totalArr:any = []
  existingRecordFilter:any = []
  item1FilterArray:any = []
  monthArray: { monthCode: string; name: string; lastDate: string; }[];
  constructor(public api: ApiService, public dialog: MatDialog, public common: Common, public sharedService: SharedService, public router: Router, public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, public getpmService: PmushaService, private excelService: ExcelService, private encrypt: EncryptDecrypt, public ValidationService: CollegeUnivValidationService, private sanitizer: DomSanitizer) {
    this.componentId = this.route.snapshot.paramMap.get('id');
    this.uniqueId = this.route.snapshot.paramMap.get('uniqueId');
    this.uniqueYear = this.route.snapshot.paramMap.get('year');
    this.uniqueMonth = this.route.snapshot.paramMap.get('month');
    this.tagId = this.route.snapshot.paramMap.get('tagId');
    this.reportId = this.route.snapshot.paramMap.get('reportId');
    this.tabIndexId = this.route.snapshot.paramMap.get('tabIndex');
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.stateCode = sessionStorage.getItem("stateCode")
    this.uniqueStateCode = this.route.snapshot.paramMap.get('stateCode')
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    if (this.insType === "C") {
      this.instituteCategory = "COLLEGE";
    } else {
      this.instituteCategory = "UNIVERSITY";
    }
    this.districtCode = sessionStorage.getItem("districtCode");
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.userName = sessionStorage.getItem('userName');
    this.consultantUserId = sessionStorage.getItem('consultantUserName')
    this.consultantRemarks = sessionStorage.getItem('consultantRemarks')
    this.instituteName = sessionStorage.getItem('insName')
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
      this.userId = sessionStorage.getItem('userName')
    }
    if(this.userTypeId === sharedService.userTypeList['0'].id  || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
      this.assignView = true
    }
    this.arrMonths = [
      // { monthCode: '1', name: 'January', lastDate: '31' },
      // { monthCode: '2', name: 'February', lastDate: '28' },
      // { monthCode: '3', name: 'March', lastDate: '31' },
      // { monthCode: '4', name: 'April', lastDate: '30' },
      // { monthCode: '5', name: 'May', lastDate: '31' },
      // { monthCode: '6', name: 'June', lastDate: '30' },
      // { monthCode: '7', name: 'July', lastDate: '31' },
      // { monthCode: '8', name: 'August', lastDate: '31' },
      // { monthCode: '9', name: 'September', lastDate: '30' },
      { monthCode: '10', name: 'October', lastDate: '31' },
      { monthCode: '11', name: 'November', lastDate: '30' },
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
    this.monthArray = [
        { monthCode: '1', name: 'January', lastDate: '31' },
        { monthCode: '2', name: 'February', lastDate: '28' },
        { monthCode: '3', name: 'March', lastDate: '31' },
        { monthCode: '4', name: 'April', lastDate: '30' },
        { monthCode: '5', name: 'May', lastDate: '31' },
        { monthCode: '6', name: 'June', lastDate: '30' },
        { monthCode: '7', name: 'July', lastDate: '31' },
        { monthCode: '8', name: 'August', lastDate: '31' },
        { monthCode: '9', name: 'September', lastDate: '30' },
        { monthCode: '10', name: 'October', lastDate: '31' },
        { monthCode: '11', name: 'November', lastDate: '30' },
        { monthCode: '12', name: 'December', lastDate: '31' }
      ];
    this.arrYears = [
      { year: '2024' },
      { year: '2025' },
      { year: '2026' }

    ]

    this.monthList1 = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

  }

  ngOnInit(): void {
    this.getDateData()
    this.getV3Elegibal()
    if (this.uniqueId){
      this.month = this.uniqueMonth;
      this.year = this.uniqueYear;
      this.stateCode = this.uniqueStateCode
      this.findNpd(this.uniqueMonth, this.uniqueYear)
    }
    else if (this.tagId){
      this.isView = true
      this.tabValueAllTag()
      this.getLockTagStatus()
    }
    else if (this.reportId){
      this.isView = true
    }
    this.getbasicScoreDetails();
    this.route.url.subscribe(segments => {
      const lastSegmentIndex = segments.length - 1;
      const idSegment = segments[lastSegmentIndex];
      // Assuming the ID segment is the last segment in your route
      this.pmushaUniqueCode = +idSegment.path;  
      // Now 'collegeId' contains the ID from the routing link
    });
    const today = new Date();
    const day = today.getDate();
  
    let deadlineMonth = today.getMonth(); // 0-indexed (0 = Jan)
    let deadlineYear = today.getFullYear();
  
    // If today is 15 or later, shift to next month
    if (day >= 16) {
      deadlineMonth++;
      if (deadlineMonth > 11) {
        deadlineMonth = 0;
        deadlineYear++;
      }
    }
  
    // Format date as "15 Apr 2025"
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.deadlineDate = `16 ${monthNames[deadlineMonth]} ${deadlineYear}`;
     const fromDate = `16 ${monthNames[deadlineMonth - 1]} ${deadlineYear}`;
    //  this.message = `You can only submit data from ${fromDate}, to ${this.deadlineDate}.`
  }


   toggleMarquee() {
    this.isRunning = !this.isRunning;
  }

  ChangesCurrentMonth(changeValue: any) {
    let modyMonth = this.arrMonths.filter(m => parseInt(m.monthCode) === parseInt(changeValue));
    this.modiefiedMonth = modyMonth[0]?.name
  }


  ChangesYears(data: any) {
    this.monthList = [];
    this.month = '';
    if (data.value === '2024') {
      this.monthList = this.arrMonths;
    }
    else if (data.value === '2025') {
      this.monthList = this.monthArray;
      // this.monthList = this.arrMonths
   }
    else if (data.value === '2026') {
       this.monthList = this.monthArray;
      //  this.monthList==this.arrMonths
    }
  }

find(month: number, year: number) {
  if (!month || !year) {
    this.notification.showValidationMessage("Month and Year fields are mandatory!");
    this.isView = false;
    return;
  }

  forkJoin({
    dateApi1: this.getService.getDate().pipe(catchError(() => of(null))),
    dateApi2: this.getService.getDate1().pipe(catchError(() => of(null)))
  }).subscribe(({ dateApi1, dateApi2 }) => {

    let isAllowed = false;

    // ✅ Agar koi bhi API se response mil gaya
    if (dateApi1 || dateApi2) {
      const apiDateTime = dateApi1 || dateApi2;
      isAllowed = this.checkSubmissionPeriod(month, year, apiDateTime);
    }
    // ❌ Agar dono API fail ho gayi
    else {
      isAllowed = this.checkSubmissionPeriod1(month, year);
    }

    if (!isAllowed) {
      this.notification.showValidationMessage(
        "You can only submit data from 16th of that month to 15th of next month only!"
      );
      this.isView = false;
      return;
    }

    // ✅ Allowed case
    this.isView = true;
    this.closeAllPanels();
    this.getLock1();
  });
}



findNpd(month, year) {
  if (month && year){
      this.isView = true;
      this.closeAllPanels();
      this.getLock1();
  } else {
      this.notification.showValidationMessage("Month and Year fields are mandatory!");
      this.isView = false;
  }
}

getDateData(){
   this.getService.getDate().subscribe(
      (res) => {
        this.getDateTime = res;
      },
      (err) => { }
    );
}

checkSubmissionPeriod(
  month: number,
  year: number,
  apiDateTime: string
  ): boolean {

  if (!apiDateTime) {
    return false;
  }

  // ---------- Parse API Date (DD/MM/YYYY hh:mm:ss AM/PM) ----------
  const [datePart, timePart, meridian] = apiDateTime.split(' ');
  const [day, apiMonth, apiYear] = datePart.split('/').map(Number);
  let [hours, minutes, seconds] = timePart.split(':').map(Number);

  if (meridian === 'PM' && hours < 12) hours += 12;
  if (meridian === 'AM' && hours === 12) hours = 0;

  const apiDate = new Date(apiYear, apiMonth - 1, day, hours, minutes, seconds);

  // ---------- Allowed Period ----------
  const selectedMonth = month - 1;
  const selectedYear = year;

  // Start: 16th of selected month (00:00:00)
  const startDate = new Date(selectedYear, selectedMonth, 16, 0, 0, 0);

  // End: 15th of next month (23:59:59)
  let nextMonth = selectedMonth + 1;
  let nextMonthYear = selectedYear;

  if (nextMonth > 11) {
    nextMonth = 0;
    nextMonthYear++;
  }

  const endDate = new Date(nextMonthYear, nextMonth, 16, 23, 59, 59);

  // ---------- Validation ----------
  return apiDate >= startDate && apiDate <= endDate;
}

checkSubmissionPeriod1(month: number, year: number): boolean {
  const selectedMonth = month - 1;  
  const selectedYear = year;

  // Define start date (16th of selected month)
  const startDate = new Date(selectedYear, selectedMonth, 16);

  // Define end date (15th of the next month)
  let nextMonth = selectedMonth + 1;
  let nextMonthYear = selectedYear;

  // Handle December to January transition
  if (nextMonth > 11) {
      nextMonth = 0; // January
      nextMonthYear++;
  }

  const endDate = new Date(nextMonthYear, nextMonth, 16);

  // Get today's date for comparison
  const today = new Date();

  // Check if today's date is within the allowed range
  return today >= startDate && today <= endDate;
}



// Utility function to close all panels
closeAllPanels() {
    this.isPanelOpen = false;
    this.isPanelOpenScore = false;
    this.isPanelOpenCost = false;
    this.isPanelOpenFinc = false;
    this.isPanelOpenInfra = false;
    this.isPanelOpenReno = false;
    this.isPanelOpenEquip = false;
    this.isPanelOpenActivity = false;
    this.isPanelOpenOutcome = false;
    this.isPanelOpenAct = false;
    this.isPanelOpenSoft = false;
    this.isPanelOpenCourse = false;
    this.isPanelOpenOther = false;
}

// tabValueAll() {
//   forkJoin([
//     this.getFiniacialProgress$(),
//     this.getInfraCons$(1),
//     this.getRenovated$(2),
//     this.getEquipment$(3),
//     this.getSoftCompoenent$(4),
//     this.getProposedCourseData$(9),
//     this.getActivitiesData$(12),
//     this.getProposedOutcomeData$(11)
//   ]).subscribe({
//     next: (res) => {
//       this.checkValidation()

//   }});
// }


  tabValueAllTag() {
    forkJoin([
      this.getInfraCons(1),
      this.getRenovated(2),
      this.getEquipment(3),
      this.getSoftCompoenent(4),
    ])
    .pipe(
      tap((results) => {
       
        // this.checkValidation();  // Run after all observables have completed
      })
    )
  }


   lock() {
    forkJoin({
    dateApi1: this.getService.getDate().pipe(catchError(() => of(null))),
    dateApi2: this.getService.getDate1().pipe(catchError(() => of(null)))
    }).subscribe(({ dateApi1, dateApi2 }) => {

    let isAllowed = false;

    // ✅ Agar koi bhi API se response mil gaya
    if (dateApi1 || dateApi2) {
      const apiDateTime = dateApi1 || dateApi2;
      isAllowed = this.checkSubmissionPeriod(this.month, this.year, apiDateTime);
    }
    // ❌ Agar dono API fail ho gayi
    else {
      isAllowed = this.checkSubmissionPeriod1(this.month, this.year);
    }

    if (!isAllowed) {
      this.notification.showValidationMessage(
        "You can only submit data from 16th of that month to 15th of next month only!"
      );
      return;
    }

    // ✅ Allowed case
    });
      // const apiDateTime = this.getDateTime;
      // const isAllowed = this.checkSubmissionPeriod(this.month, this.year, apiDateTime);
      //   if (!isAllowed) {
      //       this.notification.showValidationMessage("You can only submit data from 16th of that month to 15th of next month only!");
      //       return; // Stop execution if submission is not allowed
      //     }
        if (!this.districtCode) {
          this.notification.showValidationMessage("District Code is missing.");
          return;
        }
      const context = {
        districtCode: this.districtCode,
        instituteCategory : this.instituteCategory,
        componentId: this.componentId,
        pabStatus: this.sharedService.pabStatus,
        aisheCode: this.aisheCode,
        month: this.month,
        year: this.year,
        V3Elegibal: this.V3Elegibal,
        stateCode: this.stateCode
      };
      from([
        () => this.ValidationService.getFiniacialProgressVal(context),
        () => this.ValidationService.getInfraConsval(1, context),
        () => this.ValidationService.getRenovatedVal(2, context),
        () => this.ValidationService.getEquipmentVal(3, context),
        () => this.ValidationService.getSoftCompoenentVal(4, context),
        () => this.ValidationService.getProposedCourseDataVal(9, context),
        () => this.ValidationService.getActivitiesDataVal(12, context),
        () => this.ValidationService.getOutComeIndicatorVal(11, context),
      ]).pipe(
  
        concatMap(fn =>
          fn().pipe(
            tap(hasError => {
              if (hasError) {
                throw new Error('STOP');
              }
            })
          )
        )
  
      ).subscribe({
        complete: () => {
         this.finalLock()
        }
      });
    }

    finalLock() {
      let payload = {
          "lockStatus": true,
          "month": parseInt(this.month),
          "stateCode": this.stateCode,
          "districtCode": this.districtCode,
          "stateName": this.stateName,
          "year": parseInt(this.year),
          "componentId": this.componentId,
          "userId": this.aisheCode,
          "id": this.lockId ? this.lockId : 0,
      };
      this.postService.lockPmUshaProgress(payload).subscribe(res => {
        if (res.status === 200) {
            this.notification.showSuccess();
            this.getLock1();
        }
        }, err => {
                // Handle error here if needed
        });
          
    }


  lockTag() {
  
    this.tabValueAllTag();
      if (
        (this.infraconditions?.length !== 0) &&
        (this.renvoconditions?.length !== 0) &&
        (this.equpconditions?.length !== 0) &&
        (this.softconditions?.length !== 0)
      ) {
        this.notification.showValidationMessage("Please fill-in at least one component detail!");
      } else {
        // At least one condition has data — proceed with the API call
        let payload = {
          proposalItemTaggingStatus: true,
          componentId: this.componentId,
          aisheCode: this.aisheCode,
        };

        this.postService.lockTagging(payload).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccessMessage(res.data);
            this.getLockTagStatus();
          }
        }, err => {
          // Handle error if needed
        });
      }
    }

  

getLock1() {

  this.getService.getLockPMUshaProgress1(this.stateCode, this.month, this.year, this.aisheCode).subscribe(res => {
      if (res.data.length > 0) {
         res.data.forEach((v, i) => {
          this.lockId = res.data[i].id;
           if (res.data[i].lockStatus === true && res.data[i].userId === this.userName && res.data[i].componentId === +this.componentId) {
             this.lockHidden = false;
           } else {
             this.lockHidden = true;
           }

         });

       } else {
         this.lockHidden = true;
      }

    });
}

getV3Elegibal() {
  let payload = null
  const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
  payload = {
    componentId: this.componentId,
    aisheCode: encryptedAishe
  }
  this.getService.getfinalSubmitProposal(payload).subscribe(res => {

      if (res.data.length > 0) {
        if (res?.data[0]?.isV3ForwardedToNpd) {
          this.V3Elegibal = true;
        }
        else {
          this.V3Elegibal = false;
        }
       } 

    });
}



getLockTagStatus() {
  let payload = null
  const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
  payload = {
    componentId: this.componentId,
    aisheCode: encryptedAishe
  }
  this.getService.getfinalSubmitProposal(payload).subscribe(res => {

      if (res.data.length > 0) {
         res.data.forEach((v, i) => {
           if (res.data[i].proposalItemTaggingStatus === true && res.data[i].componentId === +this.componentId) {
             this.lockHiddenTag = false;
           } else {
             this.lockHiddenTag = true;
           }

         });
       } else {
         this.lockHiddenTag = true;
      }

    });
}




  getDocument() {
    let payload = {
      aisheCode: this.aisheCode,
      componentId: this.componentId,
      documentType: this.common.organogram,
    }
    this.common.downloadPDFProposal(payload).then((result: any) => {
      this.organogramDoc = result.name
      this.organogramFile = result.file
    })
  }

  download() {
    this.common.viewPdf(this.organogramFile, this.organogramDoc)
  }

  downloadPdf(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: "application/pdf" });
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

  getScoreList() {
    this.getService.getScores(this.aisheCode, this.componentId).subscribe(res => {
      if (res && res.length) {
        this.criteriaList = res;
        this.getUpdateScoreList()
        this.total = this.criteriaList.reduce(
          (sum, item) => sum + Number(item.score),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getUpdateScoreList() {
    this.getService.getUpdateScore(this.aisheCode, this.componentId).subscribe(res => {
      if (res.data && res.data.length) {
        this.UpdateScoreList = res.data;
        this.getValue()
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getFiniacialProgress(){
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe,
      componentId: this.componentId,
      year: this.year,
      month: this.month,
      stateCode : this.stateCode,
      districtCode : this.districtCode ? this.districtCode : 'ALL'
    }
      this.getService.getFinacialDetails(payload).subscribe(res => {
        let arr = res.data
        this.updateProgressData = arr.map(item => {
          const monthNumber = item?.month ? item?.month : this.month;
          const yearValue = item?.year ? item?.year : this.year;
           return {
              'aisheCode': item.aisheCode,
              'centralShareApproved': item.centralShareApproved,
              'centralShareReleased': item.centralShareReleased,
              'centralShareUtilised' : item.centralShareUtilised,
              'componentId' : this.componentId,
              'componentName' : '',
              'districtId' : this.districtCode,
              'districtName' : '',
              'id' : item.id,
              'month' : this.month,
              'previousMonth' : monthNumber,
              'monthName': this.getMonthName(monthNumber),
              'rusaLegacyDataId' : item.rusaLegacyDataId,
              'stateId' : this.stateCode,
              'stateName' : '',
              'stateShareApproved' : item.stateShareApproved,
              'stateShareReleased' : item.stateShareReleased,
              'stateShareUtilised' : item.stateShareUtilised,
              'totalAmountApproved' : item.totalAmountApproved,
              'totalAmountReleased' : item.totalAmountReleased,
              'totalUtilisation' : item.totalUtilisation,
              'physicalProgressTotal' : item.physicalProgressTotal,
              'rusaProjectStatusId': item.rusaProjectStatusId,
              'prevYear': yearValue,
              'year' : this.year

            }
         });
         this.Progressconditions = []
         this.updateProgressData?.forEach((item)=>{
          const isMonthOrYearDifferent = Number(item?.previousMonth) === Number(item?.month) && Number(item?.prevYear) === Number(item?.year);
           if(item?.centralShareReleased && item?.centralShareUtilised && item?.stateShareReleased && item?.stateShareUtilised && (item?.physicalProgressTotal !== null && item?.physicalProgressTotal >= 0) && item.rusaProjectStatusId && isMonthOrYearDifferent){

             this.Progressconditions.push(item);

           }
         })
      
      }, err => {
  
      })

  }

  getFiniacialProgressNPD(){
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe,
      componentId: this.componentId,
      year: this.year,
      month: this.month,
      stateCode : 'ALL',
      districtCode : 'ALL'
    }
      this.getService.getFinacialDetails(payload).subscribe(res => {
        let arr = res.data
        this.updateProgressData = arr.map(item => {
           return {
              'aisheCode': item.aisheCode,
              'centralShareApproved': item.centralShareApproved,
              'centralShareReleased': item.centralShareReleased,
              'centralShareUtilised' : item.centralShareUtilised,
              'componentId' : this.componentId,
              'componentName' : '',
              'districtId' : this.districtCode,
              'districtName' : '',
              'id' : item.id,
              'month' : this.month,
              'rusaLegacyDataId' : item.rusaLegacyDataId,
              'stateId' : this.stateCode,
              'stateName' : '',
              'stateShareApproved' : item.stateShareApproved,
              'stateShareReleased' : item.stateShareReleased,
              'stateShareUtilised' : item.stateShareUtilised,
              'totalAmountApproved' : item.totalAmountApproved,
              'totalAmountReleased' : item.totalAmountReleased,
              'totalUtilisation' : item.totalUtilisation,
              'physicalProgressTotal' : String(item.physicalProgressTotal),
              'rusaProjectStatusId': item.rusaProjectStatusId,
              'year' : this.year

            }
         });
         this.Progressconditions = []
         this.updateProgressData?.forEach((item)=>{
         
           if(item?.centralShareReleased && item?.centralShareUtilised && item?.stateShareReleased && item?.stateShareUtilised && item?.physicalProgressTotal >= '0' && item.rusaProjectStatusId){

             this.Progressconditions.push(item);

           }
         })

      }, err => {
  
      })

  }

  getCostData() {
    this.getService.getCostData(this.aisheCode, this.componentId).subscribe(res => {
      if (res.status == 200) {
        this.costData = res.data;
        this.infraconstructionData = this.costData.filter(x => x?.proposalActivityId === 1);
        this.infrarenovationData = this.costData.filter(x => x?.proposalActivityId === 2);
        this.equipmentProcData = this.costData.filter(x => x?.proposalActivityId === 3);
        this.softcompData = this.costData.filter(x => x?.proposalActivityId === 4);
        this.propcourseData = this.costData.filter(x => x?.proposalActivityId === 9);
        this.timelineData = this.costData.filter(x => x?.proposalActivityId === 10);
        this.propOutcomeData = this.costData.filter(x => x?.proposalActivityId === 11);
        this.activityDetailsData = this.costData.filter(x => x?.proposalActivityId === 12);
        this.rusaApprovalDetails = this.costData.filter(x => x?.proposalActivityId === 13)
        this.activityNegativeRemrk = this.costData.filter(x => x?.proposalActivityId === 14)
        
      }

       }, err => {
      console.error('Error fetching page status:', err);
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
  }


  handlePageChange(arg0: number) {
    throw new Error('Method not implemented.');
  }

  downloadPdfAisheCode() {
    let payload = {
      year: this.uniqueYear,
      month: this.uniqueMonth,
      componentId: this.componentId,
      type: 'EXCEL',
      aisheCode: this.aisheCode,
    }
    this.getService.downloadPMUshaReports(payload).subscribe(res => {
      if (res) {
        this.common.viewExcel(res.byteData, res.name)
        // this.downloadPdfAisheCode2();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  downloadPdfAisheCode2() {
    let payload = {
      stateCode: '',
      componentId: this.componentId,
      type: 'PDF',
      aisheCode: this.aisheCode,
      districtCode: '',
    }
    this.getService.downloadByAisheCode1(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }


  getbasicScoreDetails() {
    this.getService.getBasicDetails(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      if (res.status == 200) {
        this.instuteNameUpdate = res?.data.name;
        this.basicNaacScoreDetails = res?.data
        this.basicNaacDistrictCode = res?.data?.proposalDistrictId;
        this.districName = res?.data?.proopsalDistrictName;
        this.stateName = res?.data?.stateName;
        this.studentTeacherRatio = res?.data?.studentTeacherRatio;
        this.accreditationStatus = res?.data?.accreditationStatus;
        this.accreditationScore = res?.data?.accreditationScore;
        this.accreditationGrade = res?.data?.accreditationGrade;
        this.dateOfAccreditationValidity = res?.data?.dateOfAccreditationValidityString;
        if (this.basicNaacScoreDetails?.accrediationScoreWebsite == null && this.basicNaacScoreDetails?.multiDisciplinaryComment == null) {
          this.basicDetailsEditView = false;
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  private formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  scoreEdit(e, Id) {
    this.common.scoreViewComment(e, Id).subscribe(res => {
      if (res) {
        this.getScoreList();
        this.getUpdateScoreList();
      }
    })
  }

  // Code by date 28-12-2023


  getValue() {
    this.criteriaList.forEach(ele => {
      this.UpdateScoreList.forEach(obj => {
        if (ele.criteriaId === obj.baseId) {
          ele['consultantScore'] = obj?.consultantScore,
            ele['consultantValue'] = obj?.consultantValue,
            ele['consultantRemarks'] = obj?.consultantRemarks
        }
        if ((ele.criteriaId == 7)) {
        }
      });
    });
    this.sumConsutant = this.criteriaList.reduce(
      (sum, item) => sum + Number(item.consultantScore == null ? '0' : item.consultantScore),
      0
    );
  }

  resetSearch() {
    this.year = '';
    this.month = ''
    this.isView = false;
  }

  handlePanelOpened(id){
    
  }

  viewEdit(e, Id) {
    this.common.scoreViewinsComment(e, Id).subscribe(res => {
      if (res) {
        this.getClickValue(res)
      }
    })
  }

  openUploadDialog(e, id) {
    if (!e?.idValue) {
    this.notification.showValidationMessage('Please update the row details before uploading the image.');
    return;
    }

    this.common.imageMultipleUpload(e, id).subscribe(res => {
      if (res) {
        this.getClickValue(res);
      }
    });
  }

  viewTag(e, Id) {
    this.common.tagViewinsComment(e, Id).subscribe(res => {
      if (res) {
        this.getClickValue(res)
      }
    })
  }

    fwdmultiTag(e, Id) {
    let selectedItems = e.filter(item => item.checked);
    // Check if all selectable items are selected
    if (selectedItems.length < 2) {
        this.notification.showValidationMessage('Please select at least two item.');
        return;
    }
    this.common.tagViewinsComment(selectedItems, Id).subscribe(res => {
      if (res) {
        this.getClickValue(res)
      }
    })
  }

  
  
  tabValue(e, prposalId){
      if ((e === 'ScorePanel') && (prposalId === 33)) {
        this.getScoreList();
        this.getCostData();
      }
      else if ((e === 'infraConstriuction') && (prposalId === 1)) {
        this.getInfraCons(prposalId)
      }
      else if ((e === 'finacialProgress') && (prposalId === 22) && !this.uniqueId) {
        this.getFiniacialProgress()
      }
      else if ((e === 'finacialProgress') && (prposalId === 22) && this.uniqueId) {
        this.getFiniacialProgressNPD()
      }
      else if ((e === 'infraRenovation') && (prposalId === 2)) {
        this.getRenovated(prposalId)
      }
      else if ((e === 'equipmentProc') && (prposalId === 3)) {
        this.getEquipment(prposalId)
      }
      else if ((e === 'softComp') && (prposalId === 4)) {
        this.getSoftCompoenent(prposalId)
      }
      else if ((e === 'propCourse') && (prposalId === 9)) {
        this.getProposedCourseData(prposalId)
      }
      else if ((e === 'actiDetails') && (prposalId === 12)) {
        this.getActivitiesData(prposalId)
      }
      else if ((e === 'apropOutcomes') && (prposalId === 11)) {
        this.getOutComeIndicator(prposalId)
      }
      else if (e === 'otherInform') {
        this.getOtherInfData()
      }
    
  }


  getClickValue(prposalId){
    if (!this.tagId || !this.reportId){
    this.getRemarkData(prposalId)
    }
    if (prposalId === 1) {
      this.getInfraCons(prposalId)
    }
    else if (prposalId === 22) {
      this.getFiniacialProgress()
    }
    else if (prposalId === 2) {
      this.getRenovated(prposalId)
    }
    else if (prposalId === 3) {
      this.getEquipment(prposalId)
    }
    else if (prposalId === 4) {
      this.getSoftCompoenent(prposalId)
    }
    else if (prposalId === 9) {
      this.getProposedCourseData(prposalId)
    }
    else if (prposalId === 12) {
      this.getActivitiesData(prposalId)
    }
    else if (prposalId === 11) {
        this.getOutComeIndicator(prposalId)
    }
  }

    getOutComeIndicator(propId:any) {
    this.getService.getProposedCome().subscribe(
      (res) => {
        this.dataOutComeList = []
        res.forEach((e: any) => {
          if (e.targetType === 'float') {
            e.targetType = 'number'
          } if (e.baseYearType === 'float') {
            e.baseYearType = 'number'
          }
          if (this.insType === 'C') {
            if (e.isStrengthenCollegeIndicator) {

              this.dataOutComeList.push({
                indicatorName: e.indicatorName,
                id: e.id,
                baseYear: '',
                outId: 0,
                isProjectCompletedTarget31032024: '',
                isProjectCompletedTarget31032025: '',
                isProjectCompletedTarget31032026: '',
                targetLength: e.targetLength,
                targetRegex: e.targetRegex,
                targetType: e.targetType,
                baseYearLength: e.baseYearLength,
                baseYearRegex: e.baseYearRegex,
                baseYearType: e.baseYearType,
                indicatorInfo:e.indicatorInfo,
                disabled:1,
                saveButton:false,
                justification:e.justification,
              });
            }
          } else {
            if (e.isStrengthenUniversityIndicator) {
              this.dataOutComeList.push({
                indicatorName: e.indicatorName,
                id: e.id,
                baseYear: '',
                outId: 0,
                isProjectCompletedTarget31032024: '',
                isProjectCompletedTarget31032025: '',
                isProjectCompletedTarget31032026: '',
                targetLength: e.targetLength,
                targetRegex: e.targetRegex,
                targetType: e.targetType,
                baseYearLength: e.baseYearLength,
                baseYearRegex: e.baseYearRegex,
                baseYearType: e.baseYearType,
                indicatorInfo:e.indicatorInfo,
                disabled:1,
                saveButton:false,
                justification:e.justification,
              });
            }
            else {
               this.dataOutComeList.push({
                indicatorName: e.indicatorName,
                id: e.id,
                baseYear: '',
                outId: 0,
                isProjectCompletedTarget31032024: '',
                isProjectCompletedTarget31032025: '',
                isProjectCompletedTarget31032026: '',
                targetLength: e.targetLength,
                targetRegex: e.targetRegex,
                targetType: e.targetType,
                baseYearLength: e.baseYearLength,
                baseYearRegex: e.baseYearRegex,
                baseYearType: e.baseYearType,
                indicatorInfo:e.indicatorInfo,
                disabled:1,
                saveButton:false,
                justification:e.justification,
              });
            }
          }

        });
         this.getProposedOutcomeData(propId)
      },
      (error) => { }
    );

  }


  getInfraCons(propId:any) {
    if (this.tagId || this.reportId) {
      this.getpmService.getInfraCnstructionRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus).subscribe(res => {
        if (res) {
          const infraData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = infraData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = infraData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = infraData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = infraData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.infraConstructionList = infraData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }
             if (this.infraConstructionList.length > 0) {
              this.infraconditions = []
              this.infraConstructionList?.forEach((item)=>{
                if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){
                  this.infraconditions.push(item);
                }
              })
            }

            this.infraConstructionList = this.infraConstructionList.map(item => ({
               ...item,
                month: this.month,
                year: this.year,
                totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
                (sum, tag) => sum + Number(tag.costBreakup || 0),
                0
              ) || 0
            }));
          // this.infraConstructionList = res.data || [];
          // this.infraConstructionList = this.infraConstructionList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
         
          // if (this.infraConstructionList.length > 0) {
          //   this.infraconditions = []
          //   this.infraConstructionList?.forEach((item)=>{
          //     if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){
          //       this.infraconditions.push(item);
          //     }
          //   })
          //    if (this.infraConstructionList) {
          //   this.infraConstructionList = res.data.map(item => {
          //     item.month = this.month;
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // }
         
          this.isAllSelected = false;
          this.updateAggregateValues();
        }
      }, err => {
  
      })
    }
    else {
      this.getpmService.getInfraCnstructionRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const infraData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = infraData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = infraData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = infraData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = infraData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.infraConstructionList = infraData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.infraConstructionList = this.infraConstructionList.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          this.updateAggregateValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.infraConstructionList = this.infraConstructionList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          this.getMergedData(this.infraConstructionList);
          this.infraconditions = []
          this.infraConstructionList?.forEach((item)=>{
            const isProgressMissing = item?.projectStatusId == null || item?.projectStatusId === 0 || item?.physicalProgress == null;
            const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if(isProgressMissing || isMonthOrYearDifferent){

              this.infraconditions.push(item);

            }
          })
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
    
  }
  
  updateAggregateValues() {
    const dataForAggregate = this.V3Elegibal
    ? this.infraConstructionList   // ✅ V3 me sab allow
    : this.infraConstructionList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
    this.infraproposedArea = dataForAggregate.reduce((sum, item) => sum + Number(item.proposedArea), 0);
    this.infraperUnitCost = dataForAggregate.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
    this.infratotalCost = dataForAggregate.reduce((sum, item) => sum + Number(item.totalCost), 0);
  }
  

  getRenovated(propId) {
    if (this.tagId || this.reportId) {
      this.getpmService.getRenovatedListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const renovatedData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = renovatedData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = renovatedData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = renovatedData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = renovatedData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.renovatedList = renovatedData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }
           if (this.renovatedList.length > 0) {
              this.renvoconditions = []
              this.renovatedList?.forEach((item)=>{
                if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){
                  this.renvoconditions.push(item);
                }
              })
            }

            this.renovatedList = this.renovatedList.map(item => ({
               ...item,
                month: this.month,
                year: this.year,
                totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
                                (sum, tag) => sum + Number(tag.costBreakup || 0),
                                0
                              ) || 0
            }));
          // this.renovatedList = res.data || [];
          // this.renovatedList = this.renovatedList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // if (this.renovatedList.length > 0) {
          // this.renvoconditions = []
          // this.renovatedList?.forEach((item,i)=>{
          //   if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){

          //     this.renvoconditions.push(item);

          //   }
          //   })
          //    if (this.renovatedList) {
          //     this.renovatedList = res.data.map(item => {
          //     item.month = this.month;
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // }

       
          this.isAllSelected1 = false;
          this.updaterenvoValues();
        }),
        catchError(err => {
         // Handle errors here, perhaps logging them or showing a user-friendly message.
         return of(null);
       })
     ).subscribe();
      
     }
    else {
      this.getpmService.getRenovatedListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const renovatedData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = renovatedData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = renovatedData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = renovatedData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = renovatedData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.renovatedList = renovatedData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.renovatedList = this.renovatedList.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          this.updaterenvoValues();
          // this.renovatedList = res.data || [];
          // this.renovatedList = this.renovatedList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // if (this.renovatedList) {
          //   this.renovatedList = res.data.map(item => {
          //     item.month = this.month;
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // this.updaterenvoValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.renovatedList = this.renovatedList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          this.getMergedData(this.renovatedList);
          this.renvoconditions = []
          this.renovatedList?.forEach((item,i)=>{
            const isProgressMissing = item?.projectStatusId == null || item?.projectStatusId === 0 || item?.physicalProgress == null;
            const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if(isProgressMissing || isMonthOrYearDifferent){

              this.renvoconditions.push(item);

            }
          })
          
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
   
  }
  
  updaterenvoValues() {
     const dataForAggregate = this.V3Elegibal
    ? this.renovatedList   // ✅ V3 me sab allow
    : this.renovatedList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
      // this.renovatedList = this.renovatedList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
      this.infraRenoproposedArea = dataForAggregate.reduce(
            (sum, item) => sum + Number(item.proposedArea),
            0
          );
      this.infraRenoperUnitCost = dataForAggregate.reduce(
            (sum, item) => sum + Number(item.perUnitCost),
            0
          );
      this.infraRenototalCost = dataForAggregate.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
    }


  getEquipment(propId) {
    if (this.tagId || this.reportId) {
      this.getpmService.getEquipmentListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const equipmentData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = equipmentData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = equipmentData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = equipmentData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = equipmentData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });

          this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
            this.equipmentList = equipmentData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }
             if (this.equipmentList.length > 0) {
              this.equpconditions = []
              this.equipmentList?.forEach((item)=>{
                if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){
                  this.equpconditions.push(item);
                }
              })
            }

            this.equipmentList = this.equipmentList.map(item => ({
               ...item,
                month: this.month,
                year: this.year,
                totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
                                (sum, tag) => sum + Number(tag.costBreakup || 0),
                                0
                              ) || 0
            }));
          this.isAllSelected2 = false;
          this.updateEquiValues();

          // this.equipmentList = res.data || [];
          // this.equipmentList = this.equipmentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // if (this.equipmentList.length > 0) {
          // this.equpconditions = []
          // this.equipmentList?.forEach((item,i)=>{
          //   if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0){
          //     this.equpconditions.push(item);
          //   }
          // })
          // if (this.equipmentList) {
          //   this.equipmentList = res.data.map(item => {
          //     item.month = this.month;
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // }
          
          // this.isAllSelected2 = false;
          // this.updateEquiValues();
        }),
         catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
    else {
      this.getpmService.getEquipmentListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const equipmentData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = equipmentData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = equipmentData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = equipmentData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = equipmentData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.equipmentList = equipmentData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.equipmentList = this.equipmentList.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          this.updateEquiValues();

          // this.equipmentList = res.data || [];
          // this.equipmentList = this.equipmentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // if (this.equipmentList) {
          //   this.equipmentList = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // this.updateEquiValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          
          this.getremarkData = res.data;
          // this.equipmentList = this.equipmentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          this.getMergedData(this.equipmentList);
          this.equpconditions = []
          this.equipmentList?.forEach((item,i)=>{
            const isProgressMissing = item?.projectStatusId == null || item?.projectStatusId === 0;
            const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if(isProgressMissing || isMonthOrYearDifferent){

              this.equpconditions.push(item);

            }
          })
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
   
  }

  updateEquiValues() {
  const dataForAggregate = this.V3Elegibal
    ? this.equipmentList   // ✅ V3 me sab allow
    : this.equipmentList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
    this.quantity = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    this.equipmentperUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.equipmenttotalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }

  getSoftCompoenent(propId) {
    if (this.tagId || this.reportId) { 
      this.getpmService.getSoftCompoenentListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const softData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = softData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = softData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = softData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = softData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
            this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
            this.softComponentList = softData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }
             if (this.softComponentList.length > 0) {
              this.softconditions = []
              this.softComponentList?.forEach((item)=>{
                if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){
                  this.softconditions.push(item);
                }
              })
            }

            this.softComponentList = this.softComponentList.map(item => ({
               ...item,
                month: this.month,
                year: this.year,
                totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
                                (sum, tag) => sum + Number(tag.costBreakup || 0),
                                0
                              ) || 0
            }));
          this.updateSoftValues();
          this.isAllSelected3 = false;

          // this.softComponentList = res.data || [];
          // this.softComponentList = this.softComponentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // //  this.getTagDropValue(propId)
          // if (this.softComponentList.length > 0) {
          // this.softconditions = []
          // this.softComponentList?.forEach((item,i)=>{
          //   if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0){
          //     this.softconditions.push(item);
          //   }
          // })
          // if (this.softComponentList) {
          //   this.softComponentList = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // }
          // this.isAllSelected3 = false;
          // this.updateSoftValues();
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
    else {
      this.getpmService.getSoftCompoenentListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const softData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = softData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = softData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = softData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = softData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
            this.softComponentList = softData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.softComponentList = this.softComponentList.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          this.updateSoftValues();

          // this.softComponentList = res.data || [];
          // this.softComponentList = this.softComponentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // if (this.softComponentList) {
          //   this.softComponentList = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // this.updateSoftValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.softComponentList = this.softComponentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          this.getMergedData(this.softComponentList);
          this.softconditions = []
          this.softComponentList?.forEach((item,i)=>{
          const isProgressMissing = item?.projectStatusId == null || item?.projectStatusId === 0;
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
          if(isProgressMissing || isMonthOrYearDifferent){

              this.softconditions.push(item);

            }
          })
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
   
  }

  updateSoftValues() {
    const dataForAggregate = this.V3Elegibal
    ? this.softComponentList   // ✅ V3 me sab allow
    : this.softComponentList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
    // this.softComponentList = this.softComponentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
    this.quantitySoft = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.perUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.totalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.targetNumber = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
      0
    );
  }

  getProposedCourseData(propId) {
    this.getService.getProposedCourse(this.aisheCode, this.componentId)
      .pipe(
        tap(res => {
          this.courseData = res || [];
          if (this.courseData) {
            this.courseData = res.map(item => {
              item.month = this.month; // Months are zero-based, so add 1
              item.year = this.year;
              return item;
            });
          }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.courseData);
          this.proposedconditions = [];
          this.courseData?.forEach((item) => {
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if (item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 || isMonthOrYearDifferent) {
              this.proposedconditions.push(item);
            }
          });
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  getProposedOutcomeData(propId) {
    this.getService.getOutComeRevision(this.aisheCode, this.instituteCategory, this.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {

          this.getpropOutcomeData = res.data || [];
          if (this.getpropOutcomeData) {
            this.getpropOutcomeData = res.data.map(item => {
              item.month = this.month; // Months are zero-based, so add 1
              item.year = this.year;
              return item;
            });
          }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.getpropOutcomeData);
          this.getpropOutcomeData.forEach(element => {
            this.dataOutComeList.forEach(e=>{
              if (e.id === element.outcomeIndicatorId) {
                element['indicatorInfo'] = e.indicatorInfo
              }
            })
          });
          this.outcomeconditions = [];
          this.getpropOutcomeData?.forEach((item) => {
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
             if (item?.targetFor2024 === null || item?.targetFor2024 === undefined || item?.targetFor2024 === '' && item?.targetFor2025 === null || item?.targetFor2025 === undefined || item?.targetFor2025 === '' && item?.targetFor2026 === null || item?.targetFor2026 === undefined || item?.targetFor2026 === '' || isMonthOrYearDifferent) {
              this.outcomeconditions.push(item);
            }

          });
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  getActivitiesData(propId) {
    this.getService.getActivityDetails(this.aisheCode, this.componentId)
      .pipe(
        tap(res => {
          this.activityData = res || [];
          this.activityData.forEach(ele => {
            if (ele.proposalActivityName) {
              ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
            }
            if (ele.itemName) {
              ele.itemName = Object.values(ele.itemName).toString()
            }
          });
          if (this.activityData) {
            this.activityData = res.map(item => {
              item.month = this.month; // Months are zero-based, so add 1
              item.year = this.year;
              return item;
            });
          }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.activityData);
          this.activityconditions = [];
          this.activityData?.forEach((item) => {
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if (item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 || isMonthOrYearDifferent) {
              this.activityconditions.push(item);
            }
          });
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  getActivitiesDataDownload(propId): Observable<any> {
  return this.getService.getActivityDetails(this.aisheCode, this.componentId).pipe(
    tap(res => {
      this.activityData = res || [];
      this.activityData.forEach(ele => {
        if (ele.proposalActivityName) {
          ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
        }
        if (ele.itemName) {
          ele.itemName = Object.values(ele.itemName).toString()
        }
      });
      this.activityData = this.activityData.map(item => {
        item.month = this.month;
        item.year = this.year;
        return item;
      });
    }),
    switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
    tap(res => {
      this.getremarkData = res.data;
      this.getMergedData(this.activityData);
      this.activityconditions = [];
      this.activityData?.forEach((item) => {
        if (!item?.projectStatusId) {
          this.activityconditions.push(item);
        }
      });
    }),
    catchError(err => {
      console.error(err);
      return of(null);
    })
  );
  }

  getOtherInfData() {
    this.getpmService.getOtherInformation(this.aisheCode, this.componentId).subscribe((res) => {
      this.otherInformData = res.data[0]
      this.itemList = []
      this.tentativeDate = this.otherInformData.tenatativeDateCompletionOfProject;
      this.provideDetails = this.otherInformData.provideDetails;
      if (res.data && res.data.length) {
        if (this.otherInformData.withExistringLinkage) {
          this.withExistringLinkage = true
          this.otherInfo = 'With existing Linkages';
        } if (this.otherInformData.withScopeForLinkage) {
          this.withScopeForLinkage = true
          this.otherInfo = 'With scope for linkage';
        } if (this.otherInformData.withoutLinkage) {
          this.withoutLinkage = true
          this.otherInfo = 'Without Linkages';
        }
        if (this.otherInformData.documentOfDpr) {
          this.myFilesName = this.otherInformData.dprFileName;
          this.documentOfDpr = this.otherInformData.documentOfDpr;
        }
      }
    }, (err) => { });
  }

  getMergedData(dataValue){
    dataValue.forEach(ele => {
      this.getremarkData.forEach(obj => {
        if (ele.id === obj.itemId) {
          ele['idValue'] = obj?.id,
          ele['projectStatusId'] = obj?.projectStatusId,
            ele['physicalProgress'] = obj?.physicalProgress,
            ele['progressRemarks'] = obj?.progressRemarks
            ele['targetFor2024'] = obj?.targetFor2024,
            ele['targetFor2025'] = obj?.targetFor2025,
            ele['targetFor2026'] = obj?.targetFor2026,
            ele['activityPhoto'] = obj?.activityPhoto,
            ele['previousMonth'] = obj?.month ? obj?.month : this.month,
            ele['prevYear'] = obj?.year ? obj?.year : this.year,
            ele['monthName'] = this.getMonthName(obj?.month)
        }
    });
  })
  }

  getRemarkData(propId) {
    this.getService.getRemarkList(propId, this.componentId, this.aisheCode).subscribe(
      (res) => {
        this.getremarkData = res.data
      },
      (err) => { }
    );
  }


  ScoreBasedSave() {
    const outputArray = this.UpdateScoreList.map(({ aisheCode, baseId, componentId, consultantRemarks, consultantScore, consultantStatus, consultantUserId, consultantValue, score, value }) => ({
      aisheCode,
      baseId,
      componentId,
      consultantRemark: consultantRemarks,
      consultantScore,
      consultantStatus,
      consultantUserId,
      consultantValue,
      score,
      value
    }));
    this.postService.saveScoreComment(outputArray).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getUpdateScoreList();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  back(){
    sessionStorage.setItem('back','true')
      this.router.navigate([this.routers.collegepmushalistlock])
  }

  backTag(){
    sessionStorage.setItem('back','true')
      this.router.navigate([this.routers.collegeProjectItemTag,this.sharedService.revPrposal])
  }
  backReport(){
    sessionStorage.setItem('report', 'true')
    sessionStorage.setItem('back','true')
    this.router.navigate([this.routers.Reports])
  }

  downloadReport(){
    let payload = {
      stateCode: '',
      componentId: this.componentId,
      type: 'PDF',
      aisheCode: this.aisheCode,
      districtCode: '',
    }
    this.getService.downloadReportUniversity(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getClass(item: any): any {
     // 🔹 Jab V3 applicable ho
  if (this.V3Elegibal) {
    return {
      'delete-row': item?.rsV3?.id === 2 && item?.v3 === false,
      'update-row': item?.rsV3?.id === 3 && item?.v3 === true,
      'old-update-row': item?.rsV3?.id === 3 && item?.v3 === false,
      'disabled-row1': item?.rsV3?.id === 1
    };
  }

  // 🔹 Jab V3 applicable NA ho (old logic)
  return {
    'update-row': item?.recordStatus?.id === 3 && item?.activeStatus === true,
    'disabled-row1': item?.recordStatus?.id === 1
  };
    // return {
    //   'update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === true),
    //   'disabled-row1': item?.recordStatus?.id === 1,
    // };
  }


  getTitle(item: any): string {
     // 🔹 V3 logic
  if (this.V3Elegibal) {

    if (item?.rsV3?.id === 3 && item?.v3 === true) {
      return 'Existing Record Updated';
    }

    if (item?.rsV3?.id === 1) {
      return 'New Addition';
    }

    if (item?.rsV3?.id === 2 && item?.v3 === false) {
      return 'Deleted Record';
    }

    if (item?.rsV3?.id === 3 && item?.v3 === false) {
      return 'Old Existing Record';
    }

    return '';
  }

  // 🔹 Old logic (non-V3)
  if (item?.recordStatus?.id === 3 && item?.activeStatus === true) {
    return 'Existing Record Updated';
  }

  if (item?.recordStatus?.id === 1) {
    return 'New Addition';
  }

  return '';
    // if (item?.recordStatus?.id === 3 && item?.activeStatus === true) {
    //   return 'Existing Record Updated';
    // } else if (item?.recordStatus?.id === 1) {
    //   return 'New Addition';
    // }
    // return '';
  }

  isValidNumber(value: any): boolean {
    return value !== null && value !== undefined && !isNaN(parseFloat(value));
  }

exportToExcel() {
  this.getActivitiesDataDownload(12).subscribe(() => {
    if (this.activityData?.length) {
      let custom_data = this.activityData.map((item, index) => ({
        'S.No': index + 1,
        'Activity': item.activityName,
        'Proposed Sub-Activity': item.proposalActivityName,
        'Item': item.itemName,
        'How Activity has been included': item.howHasItBeenIncluded,
        'Details of how activity to be undertaken': item.detailOfHowActivityToBeUndertaken,
        'Cost for the activity (₹)': item?.costForActivity?.toLocaleString('en-IN'),
        'Timeline for implementation of the activity': item.timelineForImplementationOfActivity,
        'Status': item?.projectStatusId === 1 ? 'Completed' : item?.projectStatusId === 2 ? 'Ongoing' : item?.projectStatusId === 3 ? 'Not yet started' : '',
        'Progress Remarks': item.progressRemarks
      }));
      this.excelService.exportToExcel(custom_data, `Activity_Report_${this.aisheCode}_${this.uniqueMonth}_${this.uniqueYear}`);
    } else {
      this.notification.showValidationMessage("NO Data Found");
    }
  });
}

exportTagDataToExcel() {
      // this.tabValueAll()
      const workbook = XLSX.utils.book_new();
      const totalInfraAreaFeet = this.infraConstructionList.reduce((sum, x) => sum + (parseFloat(x.proposedArea) || 0), 0);
      const totalInfraCost = this.infraConstructionList.reduce((sum, x) => sum + (parseFloat(x.totalCost) || 0), 0);
      const cleanedData = this.infraConstructionList.map((x,i) => ({
        'S.No': i+1,
        'Description of Infrastructure': x.description,
        'Purpose of Infrastructure': x.purpose,
        'Proposed Area Sq. feet': x.proposedArea,
        'Total Cost per Sq. feet (₹)': x.perUnitCost,
        'Total cost (₹)': x.totalCost,
        'Justification': x.justification,
        'Project Tag': this.getTagNames(x.proposalTaggingName, x.proposalItemTaggingCapacity) || "N/A",
        'Project Capacity': x.capacity,

      }));
       cleanedData.push({
        'S.No': '',
        'Description of Infrastructure': 'Total',
        'Purpose': '',
        'Proposed Area Sq. feet': totalInfraAreaFeet,
        'Total Cost per Sq. feet (₹)': '',
        'Total cost (₹)': totalInfraCost,
        'Justification': '',
        'Project Tag': '',
        'Project Capacity': '',
      });
      const renovAreaFeet = this.renovatedList.reduce((sum, x) => sum + (parseFloat(x.proposedArea) || 0), 0);
      const renovTotalCost = this.renovatedList.reduce((sum, x) => sum + (parseFloat(x.totalCost) || 0), 0);
      const cleanedData1 = this.renovatedList.map((x,i) => ({
        'S.No': i+1,
        'Description of Infrastructure': x.description,
        'Detail of renovation/upgradation proposed': x.detail,
        'Proposed Area Sq. feet': x.proposedArea,
        'Total Cost per Sq. feet (₹)': x.perUnitCost,
        'Total cost (₹)': x.totalCost,
        'Justification': x.justification,
        'Project Tag': this.getTagNames(x.proposalTaggingName, x.proposalItemTaggingCapacity) || "N/A",
        'Project Capacity': x.capacity,

      }));
       cleanedData1.push({
        'S.No': '',
        'Description of Infrastructure': 'Total',
        'Detail of renovation/upgradation proposed': '',
        'Proposed Area Sq. feet': renovAreaFeet,
        'Total Cost per Sq. feet (₹)': '',
        'Total cost (₹)': renovTotalCost,
        'Justification': '',
        'Project Tag': '',
        'Project Capacity': '',
      });
      
      const equipQuantity = this.equipmentList.reduce((sum, x) => sum + (parseFloat(x.quantity) || 0), 0);
      const equipTotalCost = this.equipmentList.reduce((sum, x) => sum + (parseFloat(x.totalCost) || 0), 0);
      const cleanedData2 = this.equipmentList.map((x,i) => ({
        'S.No': i+1,
        'Name of the Equipment': x.name,
        'Quantity': x.quantity,
        'Cost per Unit (₹)': x.perUnitCost,
        'Total Cost (₹)': x.totalCost,
        'Project Tag': this.getTagNames(x.proposalTaggingName, x.proposalItemTaggingCapacity) || "N/A",
        'Project Capacity': x.capacity,
      }));
       cleanedData2.push({
        'S.No': '',
        'Name of the Equipment': 'Total',
        'Quantity': equipQuantity,
        'Cost per Unit (₹)': '',
        'Total Cost (₹)': equipTotalCost,
        'Project Tag': '',
        'Project Capacity': '',
      });
      const softUnit = this.softComponentList.reduce((sum, x) => sum + (parseFloat(x.unit) || 0), 0);
      const softTotalCost = this.softComponentList.reduce((sum, x) => sum + (parseFloat(x.totalCost) || 0), 0);
      const softTargetNumber = this.softComponentList.reduce((sum, x) => sum + (parseFloat(x.targetNumberOfBeneficiary) || 0), 0);
      const cleanedData3 = this.softComponentList.map((x,i) => ({
        'S.No': i+1,
        'Activity': x.activity,
        'Purpose': x.purpose,
        'Details': x.detail,
        'Unit': x.unit,
        'Cost per unit': x.costPerUnit,
        'Total Cost': x.totalCost,
        'Target number of beneficiaries': x.targetNumberOfBeneficiary,
        'Expected outcome': x.expectedOutcome,
        'Project Tag': this.getTagNames(x.proposalTaggingName, x.proposalItemTaggingCapacity) || "N/A",
        'Project Capacity': x.capacity,

      }));
      cleanedData3.push({
        'S.No': '',
        'Activity': '',
        'Purpose': '',
        'Details': 'Total',
        'Unit': softUnit,
        'Cost per unit': '',
        'Total Cost': softTotalCost,
        'Target number of beneficiaries': softTargetNumber,
        'Expected outcome': '',
        'Project Tag': '',
        'Project Capacity': '',
      });
      // Convert each dataset to worksheet
      const ws1 = XLSX.utils.json_to_sheet(cleanedData);
      const ws2 = XLSX.utils.json_to_sheet(cleanedData1);
      const ws3 = XLSX.utils.json_to_sheet(cleanedData2);
      const ws4 = XLSX.utils.json_to_sheet(cleanedData3);

      // Add worksheets to workbook
      XLSX.utils.book_append_sheet(workbook, ws1, 'Infra Construction');
      XLSX.utils.book_append_sheet(workbook, ws2, 'Infra Renovation');
      XLSX.utils.book_append_sheet(workbook, ws3, 'Equipment Procured');
      XLSX.utils.book_append_sheet(workbook, ws4, 'Soft Component');

      // Export to Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const blob = new Blob([excelBuffer], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `Strengthen College_${this.aisheCode}_${this.instuteNameUpdate}.xlsx`);
    }

getTagNames(tags: any[], capacityTags: any[]): SafeHtml {

  let result = '';

  if (capacityTags && capacityTags.length > 0) {
    result = capacityTags.map(tag => {
      return tag.capacity
        ? `${tag.proposalItemTagName} (<b>${tag.capacity}</b>)`
        : `${tag.proposalItemTagName}`;
    }).join(', ');
  } else {
    result = tags?.map(tag => tag.name).join(', ') || '';
  }

  return this.sanitizer.bypassSecurityTrustHtml(result);
}

getTags(tags: any[], capacityTags: any[]) {

  if (capacityTags && capacityTags.length > 0) {
    return capacityTags.map(tag => ({
      name: tag.proposalItemTagName,
      capacity: tag.capacity
    }));
  }

  return tags?.map(tag => ({
    name: tag.name,
    capacity: null
  })) || [];
}


getTotalCapacity(capacityTags: any[]): number {

  if (!capacityTags || capacityTags.length === 0) {
    return 0;
  }

  return capacityTags.reduce((sum, tag) => sum + (Number(tag.capacity) || 0), 0);
}
 toggleSelectAll(isChecked: boolean) {
    this.isAllSelected = isChecked; // Update global select status
    this.infraConstructionList.forEach(item => {
 
        item.checked = isChecked;
    });
  }
  toggleSelectAll1(isChecked: boolean) {
    this.isAllSelected1 = isChecked; // Update global select status
    this.renovatedList.forEach(item => {
 
        item.checked = isChecked;
    });
  }
  toggleSelectAll2(isChecked: boolean) {
    this.isAllSelected2 = isChecked; // Update global select status
    this.equipmentList.forEach(item => {
 
        item.checked = isChecked;
    });
  }
  toggleSelectAll3(isChecked: boolean) {
    this.isAllSelected3 = isChecked; // Update global select status
    this.softComponentList.forEach(item => {
 
        item.checked = isChecked;
    });
  }

  selectedCheckboxCount(value:any): number {
  if (value === '1'){
    return this.infraConstructionList?.filter(item => item.checked)?.length || 0;
  }
  else if (value === '2'){
    return this.renovatedList?.filter(item => item.checked)?.length || 0;
  }
  else if (value === '3'){
    return this.equipmentList?.filter(item => item.checked)?.length || 0;
  }
  else if (value === '4'){
    return this.softComponentList?.filter(item => item.checked)?.length || 0;
  }
  }

  trackById(index: number, item: any) {
  return item.id;
}

view(item) {
  let temp = {
    documentId: item.documentId,
   
  }
  this.getService.viewUCDocument(temp).subscribe((res) => {
    if (res) {
      this.viewPdfInNewTab(res.data[0].documentFile, res.data[0].name)
    }
  })
}


downloadFile(item) {
  let temp = {
    documentId: item.documentId,
   
  }
  this.getService.viewUCDocument(temp).subscribe((res) => {
    if (res) {
      this.downloadPdf1(res.data[0].documentFile, res.data[0].name)
    }
  })
}


viewPdfInNewTab(data, fileName) {
  // Convert base64 string to Uint8Array
  let uint8_data = this.base64ToUint8Array(data);

  // Create a Blob from the Uint8Array data
  let blob = new Blob([uint8_data], { type: 'image/jpeg' });

  // Create a URL for the Blob
  let url = URL.createObjectURL(blob);

  // Open the URL in a new tab
  window.open(url, '_blank');

  // Optionally, revoke the object URL after some time to free memory
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

downloadPdf1(data, fileName) {
  // Convert base64 string to Uint8Array
  let uint8_data = this.base64ToUint8Array(data);

  // Create a Blob from the Uint8Array data
  let blob = new Blob([uint8_data], { type: 'image/jpeg' });

  // Create a URL for the Blob
  let url = URL.createObjectURL(blob);

  // Create a link element to trigger the download
  let a = document.createElement('a');
  a.href = url;
  a.download = fileName; // You can set the filename here
  document.body.appendChild(a);

  // Trigger the download
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
  
base64ToUint8Array(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

isPreviousMonth(item: any): boolean {

  if (!item?.prevYear || !item?.previousMonth) {
    return false;
  }

  const currentDate = new Date(Number(this.year), Number(this.month) - 1, 1);
  const itemDate = new Date(Number(item.prevYear), Number(item.previousMonth) - 1, 1);

  return itemDate < currentDate;
}

getMonthName(monthNumber: number): string {
  return monthNumber ? this.monthList1[monthNumber - 1] : '';
}



}
