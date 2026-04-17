import { DatePipe, ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialog/message-dialog/message-dialog.component';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';
import { ConfirmDialogComponent } from '../../../dialog/confirm-dialog/confirm-dialog.component';
import { ExcelService } from 'src/app/service/excel.service';
import { ApiService } from 'src/app/service/api.service';
import { DeleteService } from 'src/app/service/delete.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmAisheDialogComponent } from 'src/app/dialog/confirm-aishe-dialog/confirm-aishe-dialog.component';
import { aisheCodeValidator } from 'src/app/utility/aishe-code.validator.component';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'cfs-rusa-progess-monitering',
  templateUrl: './rusa-progess-monitering.component.html',
  styleUrls: ['./rusa-progess-monitering.component.scss']
})
export class RusaProgessMoniteringComponent implements OnInit {
  passValue:number;
  arrMonths: any = [];
  filterYearMonths: any = [];
  arrMonthsCondition: any = [];
  monthList: any[] = []
  projectCompleted: string = 'ALL';
  rusaprogressForm: FormGroup;
  componentId: any;
  digitallyLaunched: string = "ALL";
  reason: boolean = false;
  year: any;
  selectedIndex: any = 0;
  month1: any;
  month2: Array<any> = [];
  month: any;
  rusaPhase: string = '';
  state: any;
  component: any;
  blob: any;
  gerPage: boolean;
  totalExpenditure1: any;
  ProgressTotal: any;
  concatenatedValue: any;
  preYear: any;
  preMonth: any;
  yearValue: string;
  preYearMonthLastDate: any;
  componentNameMainList: Array<any> = [];
  districtList: Array<any> = [];
  districtCode: string = 'ALL';
  variables: Array<any> = [];
  isUpdated: string = 'ALL';
  disabledPage: boolean = false;
  disabledViewPage:boolean = false
  lockHidden: boolean;
  rusaProgressList: any = [];
  isFormInvalid: boolean = false;
  tempList: Array<any> = []
  tempListStatus:Array<any>= [];
  searchText: any;
  stateCode: any;
  addUpdate: string = 'Add';
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  myFiles1: string[] = [];
  myFilesName1: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0;
  userTypeId: any;
  filterDistrictList: Array<any>[] = [];
  totalAmountAppr: any = 0;
  stateShareApproved: any = 0;
  centralShareApproved: any = 0;
  totalExpend: any = 0;
  totalPhysicalProgress: any = 0;
  projectStatusList: Array<any> = [];
  componentNameList: Array<any> = [];
  filterStateList: Array<any> = [];
  stateList: Array<any> = [];
  getLockList: Array<any> = [];
  previousyear: any
  previousmonth: any;
  userId: string | null;
  assignView: boolean = false;
  arrYears: Array<any> = [];
  variableLength: any;
  yearNames: Array<any> = [];
  monthNames: Array<any> = [];
  filterArr: any = []
  statusFilterArr: any = []
  rusaStatusFilter: any = []
  rusaCompStatus: any = []
  modiefiedMonth: any;
  updateStatus: string = 'ALL';
  updateProjectStatus: any = 'ALL';
  getenabValue: any;
  formattedDate: any;
  dateFromString: Date;
  totalExpend1: any;
  totalPhysicalProgress1: any;
  totalExpenditure2: number;
  ProgressTotal1: number;
  userNpdTypeList: any;
  userNotNpdList: boolean;
  stateName: any = 'ALL';
  prStatusValue: any;
  rusaStatueValue: any;
  centralShareUtilisedPercentage:any;
  stateShareUtilisedPercentage:any;
  dueToShare:any;
  shortFall:any;
  totalPercentage:any;
  editItem:any;
  pirUploadVisible:boolean = false
  pirDocName: any;
  pirdocNameVisible:boolean = false
  picDocName: any;
  picdocNameVisible: boolean = false;
  pirId:any;
  picId:any;
  pirUploadIsVisible:boolean = false
  pirArr:any = []
  picArr:any = []
  previousReportArr:any = []
  rusaId:any;
  centralShareUtilisedVisible:boolean;
  stateShareUtilisedVisible:boolean;
  projectStatusListUpdate: any;
  FixedPeviousMonth: any;
  editCurrentMonth: boolean = true;
  centralShareApprovedUpdate: any;
  stateShareApprovedUpdate: any;
  totalAmountApprovedUpdate: any;
  centralShareReleasedVisible: boolean;
  stateShareReleasedVisible: boolean;
  changeDoc1: boolean;
  fileSizeExceed1: boolean;
  PirDocumentVisible: boolean;
  PirDocumentVisibleCft: boolean;
  previousStateCode: any;
  previousMonth: any;
  previousYear: any;
  filterItemLength: any;
  pageSize = 15;
  pageIndex = 0;
  paginatedgetLockList = [];
  stateFilter: boolean;
  isRunning = true;
  deadlineDate: string = '';
  hideButton: any;
  message: string;
  disableAisheCode:boolean;
  instituteItemName: any;
  componentIdValue: any;
  rusaPhaseValue: any;
  diablesOptAisheCode: boolean;
  disableDelete: boolean;
  getDateTime: any;
  latestRecord: any;
  constructor(public sharedService: SharedService, public dialog: MatDialog, private masterService: MasterService, public getService: GetService, public fb: FormBuilder, public errorMatcher: CustomErrorStateMatcher, public postService: PostService, public common: Common, public notification: NotificationService, public viewportScroller: ViewportScroller, private datepipe: DatePipe, private excelService: ExcelService, public api : ApiService, public deleteApi : DeleteService) {
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userId = sessionStorage.getItem('userName');
    this.arrMonths = [
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
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
    this.arrYears = [
      { year: '2023' },
      { year: '2024' },
      { year: '2025' },
      { year: '2026' },
    ]


  }


  toggleMarquee() {
    this.isRunning = !this.isRunning;
  }

  ngOnInit(): void {
    this.getDateData()
    this.monthList = this.arrMonths;
    this.arrYears = [
      { year: '2023' },
      { year: '2024' },
      { year: '2025' },
      { year: '2026' },
    ]
    this.userNpdTypeList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id

    this.userNotNpdList = this.userTypeId !== this.sharedService.userTypeList['0'].id || this.userTypeId !== this.sharedService.userTypeList['6'].id || this.userTypeId !== this.sharedService.userTypeList['7'].id || this.userTypeId !== this.sharedService.userTypeList['8'].id || this.userTypeId !== this.sharedService.userTypeList['9'].id || this.userTypeId !== this.sharedService.userTypeList['10'].id

    if (this.userNpdTypeList) {
      this.assignView = true
      this.state = 'ALL'
      let state = this.state == 'ALL' ? '' : this.state;
      this.getRusaProgressListUpdateNpd(state, '', '', '', '', '', '');


    } else {
      this.getRusaProgressListUpdate('', '', this.projectCompleted, this.stateCode, 'ALL', '-1', this.digitallyLaunched);

    }

    this.getSateData();
    this.lasteDate();
    this.getProjectStatus();
    // this.getProjectStatusBottom()
    // this.getComponentId('ALL')
    this.stateCode = sessionStorage.getItem('stateCode');
    this.rusaprogressForm = this.fb.group({
      componentName: [{ value: '', disabled: true },],
      institutionName: [{ value: '', disabled: true }, []],
      id: 0,
      aisheCode: ['', []],
      stateCode: [{ value: '', disabled: true }, [Validators.required]],
      stateName: ['', []],
      districtName: ['', []],
      rusaPhase: [{ value: '', disabled: true }, [Validators.required]],
      pabMeetingNumber: [{ value: '', disabled: true }, [Validators.required]],
      pabDate: [{ value: '', disabled: true }, [Validators.required]],
      activityCurrentMonth: ['', [Validators.required]],
      expenditureCurrentMonth: ['', []],
      expenditurePreviousMonth: [{ value: true, disabled: true }, []],
      expenditureTotal: [{ value: '', disabled: true }, []],
      physicalProgressCurrentMonth: [''],
      physicalProgressPreviousMonth: [{ value: '', disabled: true }],
      activityPreviousMonth: ['', [Validators.required]],
      activitiesYetToBeUnderTaken: ['', [Validators.required]],
      physicalProgressTotal: ['', [Validators.required]],
      whetherPmDigitallyLaunchedProject: [false, [Validators.required]],
      projectInaugrationStatus: ['', []],
      inaugratedByWhomAndWhen: ['', []],
      tentativeDateOfCompletion: ['', []],
      projectStatusId: ['', [Validators.required]],
      projectNotFunctionalReason: ['', [Validators.required]],
      benfitsFromTheProject: ['', [Validators.required]],
      studentsBenefitedThroughProject: ['', [Validators.required]],
      numberOfResearchWorkBeingUnderTaken: ['', [Validators.required]],
      facultyBenefitted: ['', [Validators.required]],
      year: ['', []],
      month: ['', []],
      state: ['', []],
      projectCompleted: ['', []],
      rusaId: ['', [Validators.required]],
      documentId: [0, [Validators.required]],
      whetherProjectIsFunctionalOrIdle: [false, [Validators.required]],
      centralShareApproved: ['', [Validators.required]],
      centralShareReleased: [{ value: '' }, [Validators.required]],
      centralShareUtilised: [{ value: '' }, [Validators.required]],
      stateShareApproved: [{ value: '' }, [Validators.required]],
      stateShareReleased: [{ value: '' }, [Validators.required]],
      stateShareUtilised: [{ value: '' }, [Validators.required]],
      totalAmountApproved: [{ value: '' }, [Validators.required]],
      totalAmountReleased: [{ value: '' }, [Validators.required]],
      totalUtilisation: [{ value: '' }, [Validators.required]],
      whetherPploadingPhysicalInspectionReport: ['', []],
      outcomeOfReport: ['', []],
      whetherOutcomeReportIsSatisfactory: ['', []],
      whetherReportSignedByCommitteeMemberForInspection: ['', []]
    })

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
     this.message = `You can only submit data from ${fromDate}, to ${this.deadlineDate}.`;
    
  }


  updateChanges(updateValue: any) {
    this.updateProjectStatus = ""
    this.rusaPhase = ""
    this.componentId = ""
    this.digitallyLaunched = ""

    if (updateValue == true) {
        this.rusaProgressList = this.tempList.filter(m => m.id !== null || m.projectStatusId === 1);
        this.filterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
   
    }
    else if (updateValue == false) {
        this.rusaProgressList = this.tempList.filter(m => m.id === null && m.projectStatusId !== 1);
        this.filterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
   
    }
    else {
        this.rusaProgressList = this.tempList
        this.filterArr = this.tempList
        this.handlePageChange(this.sharedService.page = 1)
   
    }
  }




  async getpirFileDetails(e: any) {

    this.myFiles = [];
    this.myFilesName = '';
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles1.push(e.target.files[i]);
        this.myFilesName1 += e.target.files[i].name;
        this.uploadpirDocuments(this.editItem, 'Physical_Inspection_Report')
      }
    }
  }







  async getcertificateFileDetails(e: any) {
    
        this.myFiles = [];
        this.myFilesName = '';
        for (var i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size > 26214400) {
            this.fileSizeExceed1 = true;
            this.notification.showValidationMessage('File size should be less than 25MB.')
            return;
          }
          else {
            this.changeDoc1 = true;
            this.fileSizeExceed1 = false;
            this.myFiles.push(e.target.files[i]);
            this.myFilesName += e.target.files[i].name;
            this.uploadpirDocumentsCft(this.editItem, 'Physical_Inspection_Certificate')
          }
        }
    
    
      }



uploadpirDocuments(item, docymentType){
  const formdata: FormData = new FormData();
  for (var i = 0; i < this.myFiles1.length; i++) {
       formdata.append("file", this.myFiles1[i]);
     }
 

  let payload = {
    aisheCode: item.aisheCode,
    componentId: item.componentId,
    documentType: docymentType,
    id: 0,
    stateCode : item.stateCode,
    districtCode : item.districtId,
    instituteCategory : "",
    rusaLegacyDataId: item.rusaId,
    year : this.year,
    month : this.month,


  }
this.postService.uploadpirDocuments(payload, formdata).subscribe(res =>{
  if (res.status === 200) {
    this.notification.showSuccessMessage('Document Uploaded');
    this.PirDocumentVisible = true
    this.myFiles1 = [];
    this.myFilesName1=''
    
  }
}, err => {

})

}

uploadpirDocumentsCft(item, docymentType){
  const formdata: FormData = new FormData();
  for (var i = 0; i < this.myFiles.length; i++) {
       formdata.append("file", this.myFiles[i]);
     }
 

  let payload = {
    aisheCode: item.aisheCode,
    componentId: item.componentId,
    documentType: docymentType,
    id: 0,
    stateCode : item.stateCode,
    districtCode : item.districtId,
    instituteCategory : "",
    rusaLegacyDataId: item.rusaId,
    year : this.year,
    month : this.month,


  }
this.postService.uploadpirDocuments(payload, formdata).subscribe(res =>{
  if (res.status === 200) {
    this.notification.showSuccessMessage('Document Uploaded');
    this.PirDocumentVisibleCft = true
    this.myFiles = [];
    this.myFilesName=''
    
  }
}, err => {

})

}



  ChangesProjectStatus(statusValue: any) {
    this.prStatusValue = statusValue == '' ? 'ALL' : statusValue
    this.rusaPhase = ""
    this.componentId = ""
    this.digitallyLaunched = "ALL"
    this.updateStatus = "ALL"
    this.filterArr = this.tempList
    if (statusValue == '1') {
      if (this.filterArr == "") {
          this.rusaProgressList = this.tempList.filter(m => m.projectStatusId === 1);
          this.statusFilterArr = this.rusaProgressList
          this.handlePageChange(this.sharedService.page = 1)

      }
      else {
        this.rusaProgressList = this.filterArr.filter(m => m.projectStatusId == '1');
        this.statusFilterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
      }
    }
    else if (statusValue == '2') {
      if (this.filterArr == "") {
          this.rusaProgressList = this.tempList.filter(m => m.projectStatusId === 2)
          this.handlePageChange(this.sharedService.page = 1)

      }
      else {
        this.rusaProgressList = this.filterArr.filter(m => m.projectStatusId == '2');
        this.statusFilterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
      }
    }
    else if (statusValue == '3') {
      if (this.filterArr == "") {
          this.rusaProgressList = this.tempList.filter(m => m.projectStatusId === 3)
          this.statusFilterArr = this.rusaProgressList
          this.handlePageChange(this.sharedService.page = 1)

      }
      else {
        this.rusaProgressList = this.filterArr.filter(m => m.projectStatusId == '3');
        this.statusFilterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
      }

    }
    else if (statusValue == '4') {
      if (this.filterArr == "") {
          this.rusaProgressList = this.tempList.filter(m => m.projectStatusId === 4);
          this.statusFilterArr = this.rusaProgressList
          this.handlePageChange(this.sharedService.page = 1)

      }
      else {
        this.rusaProgressList = this.filterArr.filter(m => m.projectStatusId == '4');
        this.statusFilterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
      }

    }
    else {
      if (this.filterArr == "") {
        this.rusaProgressList = this.tempList;
        this.statusFilterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
      }
      else {
        this.rusaProgressList = this.filterArr
        this.statusFilterArr = this.rusaProgressList
        this.handlePageChange(this.sharedService.page = 1)
      }
    }


  }

  RusaStatus(statusValue: any) {
    this.rusaStatueValue = statusValue == '' ? 'ALL' : statusValue;
    this.componentId = ""
    this.digitallyLaunched = "ALL"
    this.updateStatus = "ALL"
    this.filterArr = this.tempList
    this.getComponentId(statusValue)
    if (statusValue == 'RUSA 1') {

      if ((this.filterArr == "" && this.statusFilterArr == "") && (this.prStatusValue == undefined)) {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 1');
        this.rusaStatusFilter = this.rusaProgressList;
     
      }
      else if ((this.filterArr == "" && this.statusFilterArr == "") && (this.prStatusValue != undefined)) {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 1' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
     
      }
      else if ((this.filterArr != "" && this.statusFilterArr == "") && (this.prStatusValue != undefined)) {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 1' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
        
      }
      else if ((this.filterArr != "" && this.statusFilterArr == "") && (this.prStatusValue == undefined)) {
        this.rusaProgressList = this.filterArr.filter(m => m.rusaPhase == 'RUSA 1');
        this.rusaStatusFilter = this.rusaProgressList
   
      }
      else if (this.filterArr != "" && this.statusFilterArr == "") {
        this.rusaProgressList = this.filterArr.filter(m => m.rusaPhase == 'RUSA 1');
        this.rusaStatusFilter = this.rusaProgressList
      
      }

      else if ((this.filterArr != "" && this.statusFilterArr != "") && (this.prStatusValue != 'ALL')) {
        this.rusaProgressList = this.filterArr.filter(m => m.rusaPhase == 'RUSA 1' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
      }

      else if ((this.filterArr == "" && this.statusFilterArr != "") && (this.prStatusValue != 'ALL')) {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 1' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
       

      }
      else {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 1');
        this.rusaStatusFilter = this.rusaProgressList
        
      }
      this.handlePageChange(this.sharedService.page = 1)
      let totalCentralAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.centralShareApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.centralShareApproved = totalCentralAmountAppr1

      let totalStateAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.stateShareApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.stateShareApproved = totalStateAmountAppr1

      let totalAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.totalAmountApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.totalAmountAppr = totalAmountAppr1
      this.totalExpend1 = this.rusaProgressList.reduce(
        (sum, item) => sum + (item.expenditureTotal),
        0
      );
      this.totalExpend = this.totalExpend1
      this.totalPhysicalProgress1 = this.rusaProgressList.reduce(
        (sum, item) => sum + (item.physicalProgressTotal),
        0
      );
      this.totalPhysicalProgress = this.totalPhysicalProgress1
    }
    else if (statusValue == 'RUSA 2') {

      if ((this.filterArr == "" && this.statusFilterArr == "") && (this.prStatusValue == undefined)) {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 2');
        this.rusaStatusFilter = this.rusaProgressList
     
      }
      else if ((this.filterArr == "" && this.statusFilterArr == "") && (this.prStatusValue != undefined)) {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 2' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
     
      }
      else if ((this.filterArr != "" && this.statusFilterArr == "") && (this.prStatusValue != undefined)) {

        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 2' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
     
      }
      else if ((this.filterArr != "" && this.statusFilterArr == "") && (this.prStatusValue == undefined)) {
        this.rusaProgressList = this.filterArr.filter(m => m.rusaPhase == 'RUSA 2');
        this.rusaStatusFilter = this.rusaProgressList
  
      }
      else if (this.filterArr != "" && this.statusFilterArr == "") {
        this.rusaProgressList = this.filterArr.filter(m => m.rusaPhase == 'RUSA 2');
        this.rusaStatusFilter = this.rusaProgressList
  
      }
      else if (this.filterArr != "" && this.statusFilterArr != "") {
        this.rusaProgressList = this.filterArr.filter(m => m.rusaPhase == 'RUSA 2' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
       
      }
      else if ((this.filterArr == "" && this.statusFilterArr != "") && (this.prStatusValue != 'ALL')) {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 2' && m.projectStatusId == this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
       

      }
      else {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 2');
        this.rusaStatusFilter = this.rusaProgressList
       
      }
      this.handlePageChange(this.sharedService.page = 1)
      let totalCentralAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.centralShareApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.centralShareApproved = totalCentralAmountAppr1

      let totalStateAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.stateShareApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.stateShareApproved = totalStateAmountAppr1

      let totalAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.totalAmountApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.totalAmountAppr = totalAmountAppr1
      this.totalExpend1 = this.rusaProgressList.reduce(
        (sum, item) => sum + (item.expenditureTotal),
        0
      );
      this.totalExpend = this.totalExpend1
      this.totalPhysicalProgress1 = this.rusaProgressList.reduce(
        (sum, item) => sum + (item.physicalProgressTotal),
        0
      );
      this.totalPhysicalProgress = this.totalPhysicalProgress1
    }
    else {
      if (this.filterArr == "" && this.statusFilterArr == "") {
        this.rusaProgressList = this.prStatusValue == undefined ? this.tempList : this.tempList.filter(m => m.projectStatusId === this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
      }
      else if ((this.filterArr == "" && this.statusFilterArr == "") && (this.prStatusValue != undefined)) {
        this.rusaProgressList = this.prStatusValue == undefined ? this.tempList : this.tempList.filter(m => m.projectStatusId === this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
      }
      else if ((this.filterArr != "" && this.statusFilterArr == "") && (this.prStatusValue != undefined)) {
        this.rusaProgressList = this.prStatusValue == undefined ? this.tempList : this.tempList.filter(m => m.projectStatusId === this.prStatusValue);
        this.rusaStatusFilter = this.rusaProgressList
      }
      else if ((this.filterArr != "" && this.statusFilterArr == "") && (this.prStatusValue == undefined)) {
        this.rusaProgressList = this.filterArr;
        this.rusaStatusFilter = this.rusaProgressList
      }


      else if (this.filterArr != "" && this.statusFilterArr == "") {
        this.rusaProgressList = this.filterArr
        this.rusaStatusFilter = this.rusaProgressList
      }
      else {
        if (this.prStatusValue == 'ALL' && this.rusaStatueValue == 'ALL') {
          this.rusaProgressList = this.tempList
          this.rusaStatusFilter = this.rusaProgressList
        }
        else {
          this.rusaProgressList = this.tempList.filter(m => m.projectStatusId === this.prStatusValue);
          this.rusaStatusFilter = this.rusaProgressList
        }

      }
      this.handlePageChange(this.sharedService.page = 1)
      let totalCentralAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.centralShareApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.centralShareApproved = totalCentralAmountAppr1

      let totalStateAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.stateShareApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.stateShareApproved = totalStateAmountAppr1

      let totalAmountAppr1 = this.rusaProgressList.reduce((sum, item) => {
        const amount = parseFloat(item.totalAmountApproved);
        if (!isNaN(amount)) {
          return sum + amount;
        } else {
          return sum;
        }
      }, 0);
      this.totalAmountAppr = totalAmountAppr1
      this.totalExpend1 = this.rusaProgressList.reduce(
        (sum, item) => sum + (item.expenditureTotal),
        0
      );
      this.totalExpend = this.totalExpend1
      this.totalPhysicalProgress1 = this.rusaProgressList.reduce(
        (sum, item) => sum + (item.physicalProgressTotal),
        0
      );
      this.totalPhysicalProgress = this.totalPhysicalProgress1
    }
  }

  RusaCompStatus(statusValues: any[]) {
    this.digitallyLaunched = ""
    this.updateStatus = "ALL"
    this.filterArr = this.tempList
    let value = statusValues

 if (this.rusaProgressList != "" && statusValues.length > 0) {
      this.rusaProgressList = this.rusaStatusFilter.filter(m => value.includes(m.componentId)).map(item => { return item; });
      this.rusaCompStatus = this.rusaProgressList

      this.handlePageChange(this.sharedService.page = 1)
    }
    else {
      this.rusaProgressList = this.rusaStatusFilter;
      this.handlePageChange(this.sharedService.page = 1)
    }
  }

  digitallyStatus(statusValue: any) {
    this.filterArr = this.tempList
    if (this.filterArr != "" && this.statusFilterArr == "" && this.rusaStatusFilter == "") {
      if (statusValue === false || statusValue === true) {
        this.rusaProgressList = this.filterArr.filter(m => m.whetherPmDigitallyLaunchedProject === statusValue)
      }
      else {
        this.rusaProgressList = this.filterArr
      }
    }
    else if (this.filterArr != "" && this.statusFilterArr != "") {
      if (statusValue === false || statusValue === true) {
        this.rusaProgressList = this.statusFilterArr.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue)
      }
      else {
        this.rusaProgressList = this.statusFilterArr
      }
    }
    else if (this.filterArr == "" && this.statusFilterArr != "" && this.rusaStatusFilter == "") {
      if (statusValue === false || statusValue === true) {
        this.rusaProgressList = this.statusFilterArr.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue)
      }
      else {
        this.rusaProgressList = this.statusFilterArr
      }
    }

    else if (this.filterArr != "" && this.rusaStatusFilter != "") {
      if (statusValue === false || statusValue === true) {
        this.rusaProgressList = this.rusaStatusFilter.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue)
      }
      else {
        this.rusaProgressList = this.statusFilterArr
      }
    }
    else if (this.filterArr == "" && this.statusFilterArr == "" && this.rusaStatusFilter != "") {
      if (statusValue === false || statusValue === true) {
        this.rusaProgressList = this.rusaStatusFilter.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue)
      }
      else {
        this.rusaProgressList = this.rusaStatusFilter
      }
    }

    else if (this.statusFilterArr != "" && this.rusaStatusFilter != "") {
      if (statusValue === false || statusValue === true) {
        if(this.rusaStatueValue == 'ALL' && this.prStatusValue == 'ALL'){
            this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue) 
          }
        else if(this.prStatusValue == "ALL"){
          this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue && m.rusaPhase == this.rusaStatueValue)
        }
        else if(this.rusaStatueValue == 'ALL'){
          this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue && m.projectStatusId == this.prStatusValue)
        }
        else{

          this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue && m.projectStatusId == this.prStatusValue && m.rusaPhase == this.rusaStatueValue) 
        }
      }

      // this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue && m.projectStatusId == this.prStatusValue && m.rusaPhase == this.rusaStatueValue)

      else {
        if(this.rusaStatueValue == 'ALL' && this.prStatusValue == 'ALL'){
          this.rusaProgressList = this.tempList
  
        }
        else if(this.prStatusValue == "ALL"){
          this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == this.rusaStatueValue)

        }
          else if(this.rusaStatueValue == 'ALL'){
            this.rusaProgressList = this.tempList.filter(m => m.projectStatusId == this.prStatusValue)

          }
          else{
            this.rusaProgressList = this.tempList.filter(m => m.projectStatusId == this.prStatusValue && m.rusaPhase == this.rusaStatueValue)
          }



        
      }
    }

    else if (this.filterArr != "" && this.statusFilterArr != "" && this.rusaStatusFilter != "") {
      
      if (statusValue === false || statusValue === true) {
        this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue && m.projectStatusId == this.prStatusValue && m.rusaPhase == this.rusaStatueValue)
      }
      else {
        this.rusaProgressList = this.statusFilterArr
      }
    }

    else {
      if (statusValue === false || statusValue === true) {
        this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject == statusValue)
      }
      else {
        this.rusaProgressList = this.tempList
      }
    }

  }

  ChangesState(data:any){
    this.stateName = data.value;
    this.year = '';
    this.month = '';
    this.findState()
    this.updatePaginatedData()
    
  }

  ChangesCurrentMonth(changeValue: any) {
    let modyMonth = this.arrMonths.filter(m => parseInt(m.monthCode) === parseInt(changeValue));
    this.modiefiedMonth = modyMonth[0].name

    if(this.year && changeValue){
      this.findState()
      this.getLockList = this.getLockList.filter(m => parseInt(m.month) === parseInt(changeValue)); 
    }
    this.updatePaginatedData()
    
  }

  ChangesCurrentMonth1(changeValue: any) {
    this.month = changeValue; // Store selected month
  
    if (this.year && this.month) {
      // Filter based on selected year, month, and state
      // this.getLockList = this.tempListStatus.filter(m => 
      //   m.year == this.year && parseInt(m.month) === parseInt(this.month) && 
      //   (this.stateName === 'ALL' || m.stateCode === this.stateName)
      // );
      this.findState()
    }
    this.updatePaginatedData()
  }

  ChangesYears1(data: any) {
    this.monthList = [];
    this.month = '';
    this.year = data.value; // Store selected year
  
    if (this.year) {
      // Ensure months are compared as strings
      let filteredMonths = this.tempListStatus
        .filter(entry => entry.year == this.year && (this.stateName === 'ALL' || entry.stateCode === this.stateName))
        .map(entry => entry.month.toString()) // Convert to string to match `monthCode`
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
  
      // Assign month list dynamically based on filtered months
      if (this.year === '2023') {
        this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
      }
      else if (this.year === '2024') {
        this.monthList = this.arrMonths;
      } else if (this.year === '2025') {
        this.monthList = this.arrMonths;
      } else if (this.year === '2026') {
        this.monthList = this.arrMonths;
      }
    }

    this.updatePaginatedData()
  }

  ChangesYears(data: any) {
    this.monthList = [];
    this.month = '';
    if (data.value === '2024') {
      this.monthList = this.arrMonths;
      this.findState()
      this.getLockList = this.getLockList.filter(m => m.year == '2024');   
        
    }
    else if (data.value === '2025') {
      this.monthList = this.arrMonths;
      this.findState()
      this.getLockList = this.getLockList.filter(m => m.year == '2025');   
        
    }
    else if (data.value === '2026') {
      this.monthList = this.arrMonths;
      this.findState()
      this.getLockList = this.getLockList.filter(m => m.year == '2026');   
        
    }
    else if (data.value === '2023') {
      this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
      this.findState()
      this.getLockList = this.getLockList.filter(m => m.year == '2023');
    
    }
    this.updatePaginatedData()

  }
  ChangesRusa(data: any) {
    this.variables = [];
    this.getService.getComponentName(this.rusaPhase).subscribe(res => {
      this.componentNameList = res;
      this.variables = this.componentNameList.slice()

      if (data == '1') {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 1');
        this.handlePageChange(this.sharedService.page = 1)
      }
      else if (data == '2') {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 2');
        this.handlePageChange(this.sharedService.page = 1)
      }
      else if (data == '-1') {
        this.rusaProgressList = this.tempList.filter(m => m.rusaPhase == 'RUSA 1' || m.rusaPhase == 'RUSA 2');
        this.handlePageChange(this.sharedService.page = 1)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  ChangesRusaComponent(data: any) {
    // Convert data.value to a number
    const componentId = parseInt(data);
    this.rusaProgressList = this.tempList.filter(m => m.componentId === componentId);
    this.handlePageChange(this.sharedService.page = 1)
  }
  getComponentId(getValue: any) {
    let phaseRUSA1 = getValue === 'RUSA 1' ? '1' : getValue === 'RUSA 2' ? '2' : '-1'
    this.getService.getComponentName(phaseRUSA1)?.subscribe(res => {
      this.componentNameList = res;
      this.variables = this.componentNameList.slice()
                }, err => {
      console.error('Error fetching page status:', err);
    })
  }



  ChangesPmDigit(data: any) {
    if (data) {
      this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject === true)
    }
    else {
      this.rusaProgressList = this.tempList.filter(m => m.whetherPmDigitallyLaunchedProject === false)
    }
  }



  ChangesMonths(Data: any) {
    this.month1 = this.arrMonths.find((ele) => ele.monthCode === Data.value).name;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.rusaprogressForm.controls;
  }
  addition(forms) {
    let centralShareUtilised =  +forms.controls['centralShareUtilised'].value
    let centralShareReleased = +forms.controls['centralShareReleased'].value
    let stateShareUtilised =  +forms.controls['stateShareUtilised'].value
    let stateShareReleased = +forms.controls['stateShareReleased'].value
    let centralShareApproved = this.centralShareApprovedUpdate;
    let stateShareApproved = this.stateShareApprovedUpdate;
    let totalAmountApproved = this.totalAmountApprovedUpdate;
    if (stateShareReleased > stateShareApproved) {
      this.stateShareReleasedVisible = true
    }
    else {
      this.stateShareReleasedVisible = false
    }

    if(centralShareReleased > centralShareApproved) {
      if (this.componentId === 11) {
        this.centralShareReleasedVisible = false
      }
      else {
        this.centralShareReleasedVisible = true
      }
    }
    else {
      this.centralShareReleasedVisible = false
    }
    if(centralShareUtilised >  centralShareReleased){
      this.centralShareUtilisedVisible = true
    }
    else{
      this.centralShareUtilisedVisible = false
    }
  
    if(stateShareUtilised >  stateShareReleased){
      this.stateShareUtilisedVisible = true
    }
    else{
      this.stateShareUtilisedVisible = false
    }
    
    const x = parseFloat(forms.controls['centralShareApproved'].value ? forms.controls['centralShareApproved'].value : 0) + parseFloat(forms.controls['stateShareApproved'].value ? forms.controls['stateShareApproved'].value : 0);
    const y = parseFloat(forms.controls['centralShareReleased'].value ? forms.controls['centralShareReleased'].value : 0) + parseFloat(forms.controls['stateShareReleased'].value ? forms.controls['stateShareReleased'].value : 0);
    const z = parseFloat(forms.controls['centralShareUtilised'].value ? forms.controls['centralShareUtilised'].value : 0) + parseFloat(forms.controls['stateShareUtilised'].value ? forms.controls['stateShareUtilised'].value : 0);
    this.rusaprogressForm.get('totalAmountApproved').setValue(x)
    this.rusaprogressForm.get('totalAmountReleased').setValue(y)
    this.rusaprogressForm.get('totalUtilisation').setValue(z)

      // --- Percentages ---
    this.centralShareUtilisedPercentage = centralShareReleased > 0 
        ? ((centralShareUtilised / centralShareReleased) * 100).toFixed(2) 
        : 0;

    this.stateShareUtilisedPercentage = stateShareReleased > 0 
        ? ((stateShareUtilised / stateShareReleased) * 100).toFixed(2) 
        : 0;

    this.totalPercentage = y > 0 
        ? ((z / y) * 100).toFixed(2) 
        : 0;

    if (this.centralShareUtilisedPercentage > 75) {
      this.pirUploadIsVisible = true
      this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').setValidators([Validators.required]);
      this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').updateValueAndValidity();
    }
    else {
      this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').clearValidators();
      this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').updateValueAndValidity();
      this.pirUploadIsVisible = false
    }
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }
  async updateResults() {
    this.rusaProgressList = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }






  replaceSpecialCharactersWithEncoded(input) {
    var pattern = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~]/g;
    var encodedString = input.replace(pattern, function (match) {
      return encodeURIComponent(match);
    });

    return encodedString;
  }

  // ***
 onAisheCodeBlur() {
  const control = this.rusaprogressForm.get('aisheCode');
  if (!control?.value || control.value.trim() === '') {
    control?.setErrors({ required: true });
    return;
  }

  // Optional: validate the format if not already done by a validator
  const aishePattern = /^(C-|U-|S-)\d{1,7}$/;
  if (!aishePattern.test(control.value.trim())) {
    control?.setErrors({ invalidAisheCode: true });
    return;
  }

  // If valid, clear any existing errors
  control.setErrors(null);

  const payload = {
    aisheCode: control.value.trim(),
    rusaPhase: this.rusaPhase,
    componentId: this.editItem?.componentId,
    // add more if needed
  };

  this.openConfirmAisheDialog(payload, 'blurValue');
}


  openConfirmAisheDialog(payload: any, value:any) {
  this.api.getAisheCode(payload).subscribe((res) => {
    if (res) {
      const dialogRef = this.dialog.open(ConfirmAisheDialogComponent, {
        width: '45%',
        data: {
          responseData: res[0],
          instituteName: this.instituteItemName
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          let phaseRUSA = this.rusaPhase == '1' ? 'RUSA 1' : this.rusaPhase == '2' ? 'RUSA 2' : 'ALL';

          this.getService.getRusaProfressData(
            this.state ? this.state : this.stateCode,
            this.year,
            this.month,
            this.projectCompleted,
            phaseRUSA,
            "-1",
            this.digitallyLaunched
          ).subscribe(res => {
            if (res.status === 200) {
                if (res.data && res.data.length) {
                    if (this.rusaprogressForm.value.aisheCode) {
                        const formValue = this.rusaprogressForm.value;
                        const enteredAisheCode = formValue.aisheCode;
                        const enteredPhase = this.editItem?.rusaPhase;
                        const enteredComponentId = this.editItem?.componentId;
                        const enteredInstituteName = this.editItem?.institutionName?.trim()?.toLowerCase();
                        const rusaData = res.data.find(e => 
                          e.aisheCode === enteredAisheCode &&
                          e.rusaPhase === enteredPhase &&
                          e.componentId === enteredComponentId &&
                          e.institutionName?.trim()?.toLowerCase() === enteredInstituteName
                        );
                        // const rusaData = res.data.find(e => e.aisheCode === this.rusaprogressForm.value.aisheCode)
                            //  && (e.rusaPhase === this.editItem.rusaPhase) && (e.componentId === this.editItem.componentId)
                        if (rusaData){
                          this.notification.showValidationMessage('Duplicate Entry: This AISHE Code with same Component, RUSA Phase, and Institute already exists.');
                        }
                        else {
                          if (value === 'saveValue') {
                          this.saveRusaProgressUpdate1()
                          }
                          // this.updateAisheCode(formValue)
                        }
                    }
                    else {
                      if (value === 'saveValue') {
                          this.saveRusaProgressUpdate()
                      }
                    }
                }
            }
            })
                
        }
      })
      }})
    }

  updateAisheCode(data:any){
    let  temp = {
      "id": data?.rusaId,
      "aisheCode": data?.aisheCode,
    }

    this.api.updateAisheCode(temp).subscribe(res => {
      if (res) {
        this.notification.showSuccessMessage("AISHE Code has been updated");
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  saveRusaProgress() {
  if (this.disableAisheCode) {
    const payload = {
      aisheCode: this.rusaprogressForm.value.aisheCode,
    };
    if (this.diablesOptAisheCode && !this.rusaprogressForm.value.aisheCode) {
      this.rusaprogressForm.get('aisheCode')?.clearValidators();
      this.rusaprogressForm.get('aisheCode')?.updateValueAndValidity();
      this.saveRusaProgressUpdate()
    } else {
      this.openConfirmAisheDialog(payload, 'saveValue'); // <- Use the new method here
      this.rusaprogressForm.get('aisheCode')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('aisheCode')?.updateValueAndValidity();
    }
  }
   else {

    this.saveRusaProgressUpdate()
   }

  }

  saveRusaProgressUpdate(){
      if (this.rusaprogressForm.invalid) {
        this.isFormInvalid = true;
        if (this.rusaprogressForm.controls.whetherPploadingPhysicalInspectionReport.status === 'INVALID') {
          this.notification.showValidationMessage('Please Choose Physical Inspection Reports !');
        }
        else {
        this.notification.mandatory();
        }
        return;
      } 
      if((!this.PirDocumentVisible&&this.pirUploadIsVisible) || (!this.PirDocumentVisibleCft&&this.pirUploadIsVisible)) {
        this.notification.showValidationMessage('PIR && Certificate Upload are mandatory !');
        return
      }
      if (this.rusaprogressForm.controls['physicalProgressTotal'].value < 100 && this.rusaprogressForm.value.projectStatusId === 1) {
        this.notification.showValidationMessage("Percentage Physical Progress Total should be equal to 100")
        return
      }
      this.isFormInvalid = false
      if (this.rusaprogressForm.value.tentativeDateOfCompletion) {
        const inputDate = new Date(this.rusaprogressForm.value.tentativeDateOfCompletion);
        const adjustedDate = new Date(inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000));
        this.formattedDate = this.datepipe.transform(adjustedDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
      }
      else {
        this.formattedDate = '';
      }
      if(this.componentId !== 11 ? +this.rusaprogressForm.controls['centralShareReleased'].value > +this.rusaprogressForm.controls['centralShareApproved'].value: ''){
        this.notification.showValidationMessage('Central Share Released value should not be greater than the central share approved amount')
        return
      }
      if(+this.rusaprogressForm.controls['stateShareReleased'].value > +this.rusaprogressForm.controls['stateShareApproved'].value){
        this.notification.showValidationMessage('State Share Released value should not be greater than the state share approved amount')
        return
      }
      if(+this.rusaprogressForm.controls['centralShareUtilised'].value > +this.rusaprogressForm.controls['centralShareReleased'].value){
        this.notification.showValidationMessage('Central Share Utilised value should not be greater than the central share released amount')
        return
      }
      if(+this.rusaprogressForm.controls['stateShareUtilised'].value > +this.rusaprogressForm.controls['stateShareReleased'].value){
        this.notification.showValidationMessage('State Share Utilised value should not be greater than the state share released amount')
        return
      }
      let data=this.rusaprogressForm.getRawValue();
        let payload = [
        {
          // "aisheCode": this.rusaprogressForm.value.aisheCode ? this.rusaprogressForm.value.aisheCode : '',
          "activityCurrentMonth": this.rusaprogressForm.value.activityCurrentMonth,
          "activityPreviousMonth": data.activityPreviousMonth,
          "activitiesYetToBeUnderTaken": this.rusaprogressForm.value.activitiesYetToBeUnderTaken,
          "expenditureCurrentMonth": parseFloat(this.rusaprogressForm.value.expenditureCurrentMonth),
          "expenditurePreviousMonth": parseFloat(this.rusaprogressForm.controls['expenditurePreviousMonth'].value),
          "expenditureTotal": parseFloat(this.totalExpenditure1 ? this.totalExpenditure1 : this.rusaprogressForm.value.expenditureTotal),
          "id": parseInt(this.rusaprogressForm.value.id !== null ? this.rusaprogressForm.value.id : 0),
          "inaugratedByWhomAndWhen": this.rusaprogressForm.value.inaugratedByWhomAndWhen,
          "month": parseInt(this.month),
          "physicalProgressCurrentMonth": (this.rusaprogressForm.value.physicalProgressCurrentMonth),
          "physicalProgressPreviousMonth": (this.FixedPeviousMonth ? this.FixedPeviousMonth : this.rusaprogressForm.controls['physicalProgressPreviousMonth'].value),
          "physicalProgressTotal": (this.ProgressTotal ? this.ProgressTotal : this.rusaprogressForm.value.physicalProgressTotal),
          "projectInaugrationStatus": this.rusaprogressForm.value.projectInaugrationStatus,
          "projectNotFunctionalReason": this.rusaprogressForm.value.projectNotFunctionalReason,
          "rusaId": this.rusaprogressForm.value.rusaId,
          "stateCode": this.stateCode,
          "districtName": this.rusaprogressForm.value.districtName ? this.rusaprogressForm.value.districtName : '',
          "stateName": this.rusaprogressForm.value.stateName ? this.rusaprogressForm.value.stateName : '',
          "benfitsFromTheProject": this.rusaprogressForm.value.benfitsFromTheProject,
          "studentsBenefitedThroughProject": this.rusaprogressForm.value.studentsBenefitedThroughProject,
          "facultyBenefitted": this.rusaprogressForm.value.facultyBenefitted,
          "numberOfResearchWorkBeingUnderTaken": this.rusaprogressForm.value.numberOfResearchWorkBeingUnderTaken,
          "tentativeDateOfCompletion": this.formattedDate,
          "whetherPmDigitallyLaunchedProject": this.rusaprogressForm.value.whetherPmDigitallyLaunchedProject,
          "projectStatusId": this.rusaprogressForm.value.projectStatusId,
          "whetherProjectIsFunctionalOrIdle": this.rusaprogressForm.value.whetherProjectIsFunctionalOrIdle,
          "year": parseInt(this.year),
          "centralShareApproved": parseFloat(this.rusaprogressForm.value.centralShareApproved),
          "centralShareReleased": parseFloat(this.rusaprogressForm.value.centralShareReleased),
          "centralShareUtilised": parseFloat(this.rusaprogressForm.value.centralShareUtilised),
          "stateShareApproved": parseFloat(this.rusaprogressForm.value.stateShareApproved),
          "stateShareReleased": parseFloat(this.rusaprogressForm.value.stateShareReleased),
          "stateShareUtilised": parseFloat(this.rusaprogressForm.value.stateShareUtilised),
          "totalAmountApproved": parseFloat(this.rusaprogressForm.value.totalAmountApproved),
          "totalAmountReleased": parseFloat(this.rusaprogressForm.value.totalAmountReleased),
          "totalUtilisation": parseFloat(this.rusaprogressForm.value.totalUtilisation),
          "centralShareUtilizedPercentAge" : this.centralShareUtilisedPercentage,
          "stateShareUtilizedPercentAge" : this.stateShareUtilisedPercentage,
          "totalUtilizedPercentAge" : this.totalPercentage,
          "stateShareDueUnderScheme" : this.dueToShare,
          "shortfallInStateShareUnderScheme" : this.shortFall,
          "whetherPploadingPhysicalInspectionReport" : this.rusaprogressForm.value.whetherPploadingPhysicalInspectionReport,
          "outcomeOfReport" : this.rusaprogressForm.value.outcomeOfReport,
          "whetherOutcomeReportIsSatisfactory" : this.rusaprogressForm.value.whetherOutcomeReportIsSatisfactory,
          "whetherReportSignedByCommitteeMemberForInspection" : this.rusaprogressForm.value.whetherReportSignedByCommitteeMemberForInspection,

        }]
        if (this.rusaprogressForm.controls['physicalProgressTotal'].value <= 100) {
        this.postService.saveRusaProgress(payload).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccess();
            let phaseRUSA = this.rusaPhase == '1' ? 'RUSA 1' : this.rusaPhase == '2' ? 'RUSA 2' : 'ALL'
            this.getRusaProgressList(this.year, this.month, this.projectCompleted, this.state ? this.state : this.stateCode, phaseRUSA, '-1', this.digitallyLaunched)
            this.addUpdate = "Add"
            this.ProgressTotal = '';
            this.totalExpenditure1 = '';

            this.reset();
            this.getProjectStatus();
            // this.getProjectStatusBottom()
            this.resetDropDown();
          }
        }, err => {

        })
      }
      else {
        if (this.rusaprogressForm.controls['physicalProgressTotal'].value > 100) {
          this.notification.showValidationMessage("Percentage Physical Progress must be less than or equal to 100")
        }
      }
  }

    saveRusaProgressUpdate1(){
      if (this.rusaprogressForm.invalid) {
        this.isFormInvalid = true;
        if (this.rusaprogressForm.controls.whetherPploadingPhysicalInspectionReport.status === 'INVALID') {
          this.notification.showValidationMessage('Please Choose Physical Inspection Reports !');
        }
        else {
        this.notification.mandatory();
        }
        return;
      } 
      if((!this.PirDocumentVisible&&this.pirUploadIsVisible) || (!this.PirDocumentVisibleCft&&this.pirUploadIsVisible)) {
        this.notification.showValidationMessage('PIR && Certificate Upload are mandatory !');
        return
      }
      if (this.rusaprogressForm.controls['physicalProgressTotal'].value < 100 && this.rusaprogressForm.value.projectStatusId === 1) {
        this.notification.showValidationMessage("Percentage Physical Progress Total should be equal to 100")
        return
      }
      this.isFormInvalid = false
      if (this.rusaprogressForm.value.tentativeDateOfCompletion) {
        const inputDate = new Date(this.rusaprogressForm.value.tentativeDateOfCompletion);
        const adjustedDate = new Date(inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000));
        this.formattedDate = this.datepipe.transform(adjustedDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
      }
      else {
        this.formattedDate = '';
      }
      if(this.componentId !== 11 ? +this.rusaprogressForm.controls['centralShareReleased'].value > +this.rusaprogressForm.controls['centralShareApproved'].value: ''){
        this.notification.showValidationMessage('Central Share Released value should not be greater than the central share approved amount')
        return
      }
      if(+this.rusaprogressForm.controls['stateShareReleased'].value > +this.rusaprogressForm.controls['stateShareApproved'].value){
        this.notification.showValidationMessage('State Share Released value should not be greater than the state share approved amount')
        return
      }
      if(+this.rusaprogressForm.controls['centralShareUtilised'].value > +this.rusaprogressForm.controls['centralShareReleased'].value){
        this.notification.showValidationMessage('Central Share Utilised value should not be greater than the central share released amount')
        return
      }
      if(+this.rusaprogressForm.controls['stateShareUtilised'].value > +this.rusaprogressForm.controls['stateShareReleased'].value){
        this.notification.showValidationMessage('State Share Utilised value should not be greater than the state share released amount')
        return
      }
      let data=this.rusaprogressForm.getRawValue();
        let payload = [
        {
          // "aisheCode": this.rusaprogressForm.value.aisheCode ? this.rusaprogressForm.value.aisheCode : '',
          "activityCurrentMonth": this.rusaprogressForm.value.activityCurrentMonth,
          "activityPreviousMonth": data.activityPreviousMonth,
          "activitiesYetToBeUnderTaken": this.rusaprogressForm.value.activitiesYetToBeUnderTaken,
          "expenditureCurrentMonth": parseFloat(this.rusaprogressForm.value.expenditureCurrentMonth),
          "expenditurePreviousMonth": parseFloat(this.rusaprogressForm.controls['expenditurePreviousMonth'].value),
          "expenditureTotal": parseFloat(this.totalExpenditure1 ? this.totalExpenditure1 : this.rusaprogressForm.value.expenditureTotal),
          "id": parseInt(this.rusaprogressForm.value.id !== null ? this.rusaprogressForm.value.id : 0),
          "inaugratedByWhomAndWhen": this.rusaprogressForm.value.inaugratedByWhomAndWhen,
          "month": parseInt(this.month),
          "physicalProgressCurrentMonth": (this.rusaprogressForm.value.physicalProgressCurrentMonth),
          "physicalProgressPreviousMonth": (this.FixedPeviousMonth ? this.FixedPeviousMonth : this.rusaprogressForm.controls['physicalProgressPreviousMonth'].value),
          "physicalProgressTotal": (this.ProgressTotal ? this.ProgressTotal : this.rusaprogressForm.value.physicalProgressTotal),
          "projectInaugrationStatus": this.rusaprogressForm.value.projectInaugrationStatus,
          "projectNotFunctionalReason": this.rusaprogressForm.value.projectNotFunctionalReason,
          "rusaId": this.rusaprogressForm.value.rusaId,
          "stateCode": this.stateCode,
          "districtName": this.rusaprogressForm.value.districtName ? this.rusaprogressForm.value.districtName : '',
          "stateName": this.rusaprogressForm.value.stateName ? this.rusaprogressForm.value.stateName : '',
          "benfitsFromTheProject": this.rusaprogressForm.value.benfitsFromTheProject,
          "studentsBenefitedThroughProject": this.rusaprogressForm.value.studentsBenefitedThroughProject,
          "facultyBenefitted": this.rusaprogressForm.value.facultyBenefitted,
          "numberOfResearchWorkBeingUnderTaken": this.rusaprogressForm.value.numberOfResearchWorkBeingUnderTaken,
          "tentativeDateOfCompletion": this.formattedDate,
          "whetherPmDigitallyLaunchedProject": this.rusaprogressForm.value.whetherPmDigitallyLaunchedProject,
          "projectStatusId": this.rusaprogressForm.value.projectStatusId,
          "whetherProjectIsFunctionalOrIdle": this.rusaprogressForm.value.whetherProjectIsFunctionalOrIdle,
          "year": parseInt(this.year),
          "centralShareApproved": parseFloat(this.rusaprogressForm.value.centralShareApproved),
          "centralShareReleased": parseFloat(this.rusaprogressForm.value.centralShareReleased),
          "centralShareUtilised": parseFloat(this.rusaprogressForm.value.centralShareUtilised),
          "stateShareApproved": parseFloat(this.rusaprogressForm.value.stateShareApproved),
          "stateShareReleased": parseFloat(this.rusaprogressForm.value.stateShareReleased),
          "stateShareUtilised": parseFloat(this.rusaprogressForm.value.stateShareUtilised),
          "totalAmountApproved": parseFloat(this.rusaprogressForm.value.totalAmountApproved),
          "totalAmountReleased": parseFloat(this.rusaprogressForm.value.totalAmountReleased),
          "totalUtilisation": parseFloat(this.rusaprogressForm.value.totalUtilisation),
          "centralShareUtilizedPercentAge" : this.centralShareUtilisedPercentage,
          "stateShareUtilizedPercentAge" : this.stateShareUtilisedPercentage,
          "totalUtilizedPercentAge" : this.totalPercentage,
          "stateShareDueUnderScheme" : this.dueToShare,
          "shortfallInStateShareUnderScheme" : this.shortFall,
          "whetherPploadingPhysicalInspectionReport" : this.rusaprogressForm.value.whetherPploadingPhysicalInspectionReport,
          "outcomeOfReport" : this.rusaprogressForm.value.outcomeOfReport,
          "whetherOutcomeReportIsSatisfactory" : this.rusaprogressForm.value.whetherOutcomeReportIsSatisfactory,
          "whetherReportSignedByCommitteeMemberForInspection" : this.rusaprogressForm.value.whetherReportSignedByCommitteeMemberForInspection,

        }]
        if (this.rusaprogressForm.controls['physicalProgressTotal'].value <= 100) {
        this.postService.saveRusaProgress(payload).subscribe(res => {
          if (res.status === 200) {
            this.updateAisheCode(this.rusaprogressForm.value)
            this.notification.showSuccess();
            this.find()
            let phaseRUSA = this.rusaPhase == '1' ? 'RUSA 1' : this.rusaPhase == '2' ? 'RUSA 2' : 'ALL'
            this.getRusaProgressList(this.year, this.month, this.projectCompleted, this.state ? this.state : this.stateCode, phaseRUSA, '-1', this.digitallyLaunched)
            this.addUpdate = "Add"
            this.ProgressTotal = '';
            this.totalExpenditure1 = '';
            this.reset();
            this.getProjectStatus();
            // this.getProjectStatusBottom()
            this.resetDropDown();
          }
        }, err => {

        })
      }
      else {
        if (this.rusaprogressForm.controls['physicalProgressTotal'].value > 100) {
          this.notification.showValidationMessage("Percentage Physical Progress must be less than or equal to 100")
        }
      }
  }
  private formatDate(date) {
    if (date) {
      const [datePart, timePart] = date.split('T');
      let split_dateAsString1 = datePart.split('-')
      let final_format1 = new Date('2023/11/22');
      this.rusaprogressForm.get('tentativeDateOfCompletion').setValue(final_format1);

    }
  }
  date: any
  lasteDate() {
    const date = new Date();
    let currentYear = date.getFullYear();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let lastDate = lastDay.getDate();
    let lastMonth = lastDay.getMonth() - 1
    let previousYear = date.getFullYear() - 1;

  }

  uploadingPhysical(event){
  if(event.value == true){
    this.pirUploadVisible = true
    this.rusaprogressForm.get('outcomeOfReport').setValidators([Validators.required]);
    this.rusaprogressForm.get('outcomeOfReport').updateValueAndValidity();
    this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').setValidators([Validators.required]);
    this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').updateValueAndValidity();
    this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').setValidators([Validators.required]);
    this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').updateValueAndValidity();
    this.pirUploadVisible = true
    this.PirDocumentVisible = false;
    this.PirDocumentVisibleCft = false;

  }
  else{
    this.rusaprogressForm.get('outcomeOfReport').setValidators([]);
    this.rusaprogressForm.get('outcomeOfReport').updateValueAndValidity();

    this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').setValidators([]);
    this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').updateValueAndValidity();

    this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').setValidators([]);
    this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').updateValueAndValidity();
    this.rusaprogressForm.get('outcomeOfReport').clearValidators();
    this.rusaprogressForm.get('outcomeOfReport').updateValueAndValidity();

    this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').clearValidators();
    this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').updateValueAndValidity();

    this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').clearValidators();
    this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').updateValueAndValidity();
    this.PirDocumentVisible = true;
    this.PirDocumentVisibleCft = true;
    this.pirUploadVisible = false
  }
  }





  getPIRDoc(pirId, item){
    
    let payload={
        aisheCode:item.aisheCode,
        componentId: item.componentId,
        documentTypeId:16,
        documentId: pirId,
      }
        this.api.getPIRDoc(payload).subscribe((res)=>{
          if (res.status === 200) {
            this.PirDocumentVisible = true;
            this.pirArr = res.data
            this.pirDocName = res.data[0].name
            this.pirdocNameVisible = res.data[0].name == "" ? false : res.data[0].name == null ? false : true
          }
        })
       
  }

  getPICDoc(picId, item){
    let payload={
      aisheCode:item.aisheCode,
      componentId: item.componentId,
      documentTypeId:17,
      documentId:picId,
    }
      this.api.getPIRDoc(payload).subscribe((res)=>{
        if (res.status === 200) {
          this.PirDocumentVisibleCft = true;
          this.picArr = res.data
          this.picDocName = res.data[0]?.name
          this.picdocNameVisible = res.data[0]?.name == "" ? false : res.data[0]?.name == null ? false : true
        }
      })
  
  }


  deletePirDoc(){
    
    this.deleteApi.deleteDocuments(this.pirId).subscribe(res =>{
      if(res.status == 200){
        this.notification.showSuccessMessage(res.message)
        this.pirDocName = ""
        this.pirdocNameVisible = false
        this.PirDocumentVisible = false;
      }
    })
  
    }

    deletePicDoc(){
      this.deleteApi.deleteDocuments(this.picId).subscribe(res =>{
        if(res.status == 200){
          this.notification.showSuccessMessage(res.message)
          this.picDocName = ""
          this.picdocNameVisible = false;
          this.PirDocumentVisibleCft = false;
        }
      })
    
      }
  



  find() {

    this.rusaProgressList = [];
    this.tempList = [];
    this.close();

    var previousmonthYear;
    var previousmonth;
    var previousyear;
    var lastDate;
    // this.resetDropDown()
    this.resetFilter()
    this.preMonth = previousmonth;
    if (this.year && this.month && this.projectCompleted) {
      var m = parseInt(this.month);
      lastDate = new Date(this.year, m === 1 ? 0 + 1 : m - 1, 0).getDate();
      if (this.month === '1') {
        previousmonthYear = new Date(this.year, -1, lastDate)
        previousmonth = previousmonthYear.toLocaleString('default', { month: 'long' });
        previousyear = previousmonthYear.getFullYear();

        this.preYear = previousyear;
        this.preMonth = previousmonth;
        this.preYearMonthLastDate = previousmonthYear.getDate();
      } else {
        var month = m - 2
        previousmonthYear = new Date(this.year, m - 2, lastDate)
        previousmonth = previousmonthYear.toLocaleString('default', { month: 'long' });
        previousyear = previousmonthYear.getFullYear();

        this.preYear = previousyear;
        this.preMonth = previousmonth;
        this.preYearMonthLastDate = previousmonthYear.getDate();

      }
      const fy = this.arrMonths.findIndex(month => parseInt(month.monthCode) === parseInt(this.month));
      if (fy > 0) {
        this.month1 = this.arrMonths[fy - 1];
      } else if (fy === 0) {
        this.month1 = this.arrMonths[11]
      }
      let phaseRUSA = this.rusaPhase == '1' ? 'RUSA 1' : this.rusaPhase == '2' ? 'RUSA 2' : 'ALL'
      if (this.userNpdTypeList) {
        let state = this.state == 'ALL' ? '' : this.state;
        this.getRusaProgressListNpd(state, this.year, this.month, '', '', '', '');
      }
      else {
        this.getRusaProgressList(this.year, this.month, this.projectCompleted, this.state ? this.state : this.stateCode, phaseRUSA, this.componentId ? this.componentId : '-1', this.digitallyLaunched);
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
              this.hideButton = false;
              return;
            }
        
            // ✅ Allowed case
            this.hideButton = true;
          });
        // const apiDateTime = this.getDateTime;
        // const isAllowed = this.checkSubmissionPeriod(this.month, this.year, apiDateTime);
        // if (!isAllowed) {
        //       this.notification.showValidationMessage(
        //       "You can only submit data from 16th of that month to 15th of next month only!"
        //     );
        //       this.hideButton = false;
        //       // return; // Stop execution if submission is not allowed
        //   }
        //   else {
        //     this.hideButton = true;
        //   }
      }

     

    }
    else {
      if (this.year != undefined) {
        this.notification.showValidationMessage("Please select 'Month' from the drop-down list");
      }
      else if (this.month != undefined) {
        this.notification.showValidationMessage("Please select 'Year' from the drop-down list");
      }
      else {
        var m = parseInt(this.month);
        lastDate = new Date(this.year, m === 1 ? 0 + 1 : m - 1, 0).getDate();
        if (this.month === '1') {
          previousmonthYear = new Date(this.year, -1, lastDate)
          previousmonth = previousmonthYear.toLocaleString('default', { month: 'long' });
          previousyear = previousmonthYear.getFullYear();

          this.preYear = previousyear;
          this.preMonth = previousmonth;
          this.preYearMonthLastDate = previousmonthYear.getDate();
        } else {
          var month = m - 2
          previousmonthYear = new Date(this.year, m - 2, lastDate)
          previousmonth = previousmonthYear.toLocaleString('default', { month: 'long' });
          previousyear = previousmonthYear.getFullYear();

          this.preYear = previousyear;
          this.preMonth = previousmonth;
          this.preYearMonthLastDate = previousmonthYear.getDate();

        }
        const fy = this.arrMonths.findIndex(month => parseInt(month.monthCode) === parseInt(this.month));
        if (fy > 0) {
          this.month1 = this.arrMonths[fy - 1];
        } else if (fy === 0) {
          this.month1 = this.arrMonths[11]
        }
        let phaseRUSA = this.rusaPhase == '1' ? 'RUSA 1' : this.rusaPhase == '2' ? 'RUSA 2' : 'ALL'
        if (this.userNpdTypeList) {

          let state = this.state == 'ALL' ? '' : this.state;
          let year = this.year == undefined ? '' : this.year;
          let month = this.month == undefined ? '' : this.month;
          this.getRusaProgressListNpd(state, year, month, '', '', '', '');
        }
        else {
          this.getRusaProgressList(this.year, this.month, this.projectCompleted, this.state ? this.state : this.stateCode, phaseRUSA, this.componentId ? this.componentId : '-1', this.digitallyLaunched);
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
              this.hideButton = false;
              return;
            }
        
            // ✅ Allowed case
            this.hideButton = true;
          });
          // const apiDateTime = this.getDateTime;
          // const isAllowed = this.checkSubmissionPeriod(this.month, this.year, apiDateTime);
          // if (!isAllowed) {
          //        this.notification.showValidationMessage(
          //     "You can only submit data from 16th of that month to 15th of next month only!"
          //   );
          //       this.hideButton = false;
          //       // return; // Stop execution if submission is not allowed
          //   }
          //   else {
          //     this.hideButton = true;
          //   }
        }
      }
    }


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


searchByValue(items: any[]) {
  const searchText = (this.searchText || '').trim().toLowerCase();
  const keysToSearch = [
    'institutionName', 'aisheCode', 'districtName', 'rusaPhase',
    'pabMeetingNumber', 'pabDate', 'inaugratedByWhomAndWhen',
    'activityCurrentMonth', 'activityPreviousMonth', 'activitiesYetToBeUnderTaken',
    'expenditureCurrentMonth', 'physicalProgressTotal', 'physicalProgressPreviousMonth',
    'physicalProgressCurrentMonth', 'expenditureTotal', 'studentsBenefitedThroughProject',
    'benfitsFromTheProject', 'facultyBenefitted', 'numberOfResearchWorkBeingUnderTaken',
    'whetherPmDigitallyLaunchedProject', "componentName"
  ];

  return items.filter(item =>
    searchText === '' ||
    keysToSearch.some(key =>
      item[key]?.toString().trim().toLowerCase().includes(searchText)
    )
  );
}




  totalExpenditure(): void {
    // const previousMonthValue = this.rusaprogressForm.controls['physicalProgressPreviousMonth'].value;
    // const ChnagedataP: any = previousMonthValue == null ? 0 : +previousMonthValue;
    // this.FixedPeviousMonth = (ChnagedataP).toFixed(2)
    // this.rusaprogressForm.get('physicalProgressPreviousMonth').setValue(this.FixedPeviousMonth);
    // const currentMonthValue = this.rusaprogressForm.controls['physicalProgressCurrentMonth'].value;
    // const dataP: any = previousMonthValue == null ? 0 : +previousMonthValue;
    // const data11P: any = currentMonthValue == null ? 0 : +currentMonthValue;
    // this.ProgressTotal = (dataP + data11P).toFixed(2);
    this.ProgressTotal = this.rusaprogressForm.controls['physicalProgressTotal'].value
    if (this.ProgressTotal > 100) {
      this.notification.showValidationMessage("Percentage Physical Progres must be less than or equal to 100")
    }
    // this.rusaprogressForm.get('physicalProgressTotal').setValue(this.ProgressTotal);
  }


  formatAmount(){
    const amountphysicalProgres = this.rusaprogressForm.get('physicalProgressPreviousMonth');
    const amountphysicalProgressTotal = this.rusaprogressForm.get('physicalProgressTotal');
    if (amountphysicalProgres) {
      const value = parseFloat(amountphysicalProgres.value).toFixed(2);
      amountphysicalProgres.setValue(value);
    }
    else if (amountphysicalProgressTotal) {
      const value = parseFloat(amountphysicalProgressTotal.value).toFixed(2);
      amountphysicalProgressTotal.setValue(value);
    }
  }
  resetSearch() {

    this.lockHidden = false;
    this.year = ''
    this.month = '';
    this.monthList = [];
    this.searchText = '';
    this.state = '';
    this.stateName = 'ALL';
    this.rusaProgressList = [];
    this.getLockList = [];
    this.projectCompleted = 'ALL';
    this.addUpdate = 'false';
    this.updateProjectStatus = 'ALL';
    this.updateStatus = 'ALL';
    this.rusaPhase = '';
    this.componentId = -1;
    this.findState()
    this.updatePaginatedData()
  }

  resetState(){
     this.lockHidden = false;
    this.year = ''
    this.month = '';
    this.monthList = [];
    this.searchText = '';
    this.state = 'ALL';
    this.stateName = 'ALL';
    this.rusaProgressList = [];
    this.getLockList = [];
    this.projectCompleted = 'ALL';
    this.addUpdate = 'false';
    this.updateProjectStatus = 'ALL';
    this.updateStatus = 'ALL';
    this.rusaPhase = '';
    this.componentId = -1;
    this.updatePaginatedData()
  }
  reasonProjectC(data: any) {
    this.rusaprogressForm.controls['whetherProjectIsFunctionalOrIdle'].reset();
    if (data.value) {
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
    } else {
      this.reason = false;
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.clearValidators();
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.clearValidators();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.updateValueAndValidity();
    }
  }
  reasonProject(data: any) {
    this.rusaprogressForm.controls['projectNotFunctionalReason'].reset();
    if (data.value === false) {
      this.reason = false;
      this.isFormInvalid = true
      this.rusaprogressForm.get('projectNotFunctionalReason').setValidators([Validators.required]);
      this.rusaprogressForm.get('projectNotFunctionalReason').updateValueAndValidity();
    } else {
      this.rusaprogressForm.get('projectNotFunctionalReason').clearValidators();
      this.rusaprogressForm.get('projectNotFunctionalReason').updateValueAndValidity();

    }
  }
  launchedProject(data: any) {
    this.rusaprogressForm.controls['projectInaugrationStatus'].reset();
    this.rusaprogressForm.controls['inaugratedByWhomAndWhen'].reset();
    if (data.value === true) {
      this.rusaprogressForm.get('projectInaugrationStatus')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('projectInaugrationStatus')?.updateValueAndValidity();
      this.rusaprogressForm.get('inaugratedByWhomAndWhen')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('inaugratedByWhomAndWhen')?.updateValueAndValidity();
    } else {
      this.reason = false;
      this.rusaprogressForm.get('projectInaugrationStatus')?.clearValidators();
      this.rusaprogressForm.get('projectInaugrationStatus')?.updateValueAndValidity();
      this.rusaprogressForm.get('inaugratedByWhomAndWhen')?.clearValidators();
      this.rusaprogressForm.get('inaugratedByWhomAndWhen')?.updateValueAndValidity();
    }
  }
  projectStatus(data: any) {
    if (data !== 1) {
    this.rusaprogressForm.controls['whetherProjectIsFunctionalOrIdle'].reset();
    this.rusaprogressForm.controls['projectNotFunctionalReason'].reset();
    this.rusaprogressForm.controls['benfitsFromTheProject'].reset();
    this.rusaprogressForm.controls['studentsBenefitedThroughProject'].reset();
    this.rusaprogressForm.controls['facultyBenefitted'].reset();
    this.rusaprogressForm.controls['numberOfResearchWorkBeingUnderTaken'].reset();
    }
   
    if (data === 1) {
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('projectNotFunctionalReason')?.updateValueAndValidity();
      this.rusaprogressForm.get('benfitsFromTheProject')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('benfitsFromTheProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('facultyBenefitted')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('facultyBenefitted')?.updateValueAndValidity();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.updateValueAndValidity();
      if (this.rusaprogressForm.controls['physicalProgressTotal'].value) {
        if (this.rusaprogressForm.controls['physicalProgressTotal'].value < 100) {
          this.notification.showValidationMessage("Percentage Physical Progress Total should be equal to 100")
        }
      }
     
      
    } else {
      this.reason = false;
      // this.rusaprogressForm.get('projectStatusId')?.clearValidators();
      // this.rusaprogressForm.get('projectStatusId')?.updateValueAndValidity();
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.clearValidators();
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.clearValidators();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.updateValueAndValidity();
      this.rusaprogressForm.get('benfitsFromTheProject')?.clearValidators();
      this.rusaprogressForm.get('benfitsFromTheProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.clearValidators();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('facultyBenefitted')?.clearValidators();
      this.rusaprogressForm.get('facultyBenefitted')?.updateValueAndValidity();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.clearValidators();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.updateValueAndValidity();
    }
  }
  reset() {
    this.rusaprogressForm.controls['activityCurrentMonth'].reset();
    this.rusaprogressForm.controls['expenditureCurrentMonth'].reset();
    this.rusaprogressForm.controls['expenditurePreviousMonth'].reset();
    this.rusaprogressForm.controls['expenditureTotal'].reset();
    this.rusaprogressForm.controls['physicalProgressCurrentMonth'].reset();
    this.rusaprogressForm.controls['physicalProgressPreviousMonth'].reset();
    this.rusaprogressForm.controls['activityPreviousMonth'].reset();
    this.rusaprogressForm.controls['activitiesYetToBeUnderTaken'].reset();
    this.rusaprogressForm.controls['physicalProgressTotal'].reset();
    this.rusaprogressForm.controls['whetherPmDigitallyLaunchedProject'].reset();
    this.rusaprogressForm.controls['projectInaugrationStatus'].reset();
    this.rusaprogressForm.controls['inaugratedByWhomAndWhen'].reset();
    this.rusaprogressForm.controls['tentativeDateOfCompletion'].reset();
    this.rusaprogressForm.controls['projectStatusId'].reset();
    this.rusaprogressForm.controls['projectNotFunctionalReason'].reset();
    this.rusaprogressForm.controls['studentsBenefitedThroughProject'].reset();
    this.rusaprogressForm.controls['facultyBenefitted'].reset();
    this.rusaprogressForm.controls['numberOfResearchWorkBeingUnderTaken'].reset();
    this.rusaprogressForm.controls['whetherProjectIsFunctionalOrIdle'].reset();
    this.rusaprogressForm.controls['benfitsFromTheProject'].reset();
    this.rusaprogressForm.get('id')?.setValue(0);
    this.reason = false;
  }
  close() {
    this.rusaprogressForm.reset();
    this.rusaprogressForm.get('id')?.setValue(0)
    this.rusaprogressForm.get('isWholeProjectCompleted')?.setValue(false)
    this.rusaprogressForm.get('isCompletionCertificateUploaded')?.setValue(false)
    this.rusaprogressForm.get('documentId')?.setValue(0)
    this.addUpdate = 'Add'
    this.getProjectStatus()
    // this.getProjectStatusBottom()
  }

  viewRusaProgress(item, value, key) {
    this.rusaprogressForm.get('aisheCode')?.disable()
    this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport')?.disable()
    this.disabledViewPage = true
    this.componentId = item.componentId
    // this.componentId = -1
    this.editItem = item
    this.rusaId = item.rusaId
    this.getEnaDisable(value)
    this.getRusaProfressDataById(item);
    const months = [
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
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
    this.addUpdate = "Update";
    this.rusaprogressForm.patchValue(item);
    this.previousStateCode = this.rusaprogressForm.get('stateCode').value;
    this.previousMonth = this.rusaprogressForm.get('month').value;
    this.previousYear = this.rusaprogressForm.get('year').value;
    let whetherPmDigitallyLaunch = item.whetherPmDigitallyLaunchedProject === null ? false : item.whetherPmDigitallyLaunchedProject
    this.rusaprogressForm.get('whetherPmDigitallyLaunchedProject').setValue(whetherPmDigitallyLaunch)
    if (item.componentId === 11) {
      let stateShareReleased = item.stateShareReleased === null ? 0 : item.stateShareReleased;
      let stateShareUtilized = item.stateShareUtilised === null ? 0 : item.stateShareUtilised;
      this.rusaprogressForm.get('stateShareReleased')?.setValue(stateShareReleased);
      this.rusaprogressForm.get('stateShareUtilised')?.setValue(stateShareUtilized);
      this.rusaprogressForm.get('stateShareReleased')?.clearValidators();
      this.rusaprogressForm.get('stateShareReleased')?.updateValueAndValidity();
      this.rusaprogressForm.get('stateShareUtilized')?.clearValidators();
      this.rusaprogressForm.get('stateShareUtilized')?.updateValueAndValidity();

    }
    
    const fy = this.arrMonths.findIndex(month => parseInt(month) === parseInt(this.month));
    if (fy > -1) {
      this.month1 = this.arrMonths[fy - 1];
    }


    this.rusaprogressForm.get('expenditureTotal').setValue(item.expenditureTotal)
    this.rusaprogressForm.get('physicalProgressTotal').setValue(item.physicalProgressTotal)
    if (item.tentativeDateOfCompletion) {
      const [datePart, timePart] = item?.tentativeDateOfCompletion?.split('T');
      let split_dateAsString1 = datePart?.split("-");
      let final_format1 =
        `${split_dateAsString1[1]}/${split_dateAsString1[2]}/${split_dateAsString1[0]}`
        ;
      this.rusaprogressForm.get('tentativeDateOfCompletion')?.setValue(new Date(final_format1));
    }


    this.totalExpenditure();

    if (item.projectStatusId === 1) {
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('projectNotFunctionalReason')?.updateValueAndValidity();
      this.rusaprogressForm.get('benfitsFromTheProject')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('benfitsFromTheProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('facultyBenefitted')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('facultyBenefitted')?.updateValueAndValidity();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.updateValueAndValidity();
    } else {
      this.reason = false;
      // this.rusaprogressForm.get('projectStatusId')?.clearValidators();
      // this.rusaprogressForm.get('projectStatusId')?.updateValueAndValidity();
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.clearValidators();
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.clearValidators();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.updateValueAndValidity();
      this.rusaprogressForm.get('benfitsFromTheProject')?.clearValidators();
      this.rusaprogressForm.get('benfitsFromTheProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.clearValidators();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('facultyBenefitted')?.clearValidators();
      this.rusaprogressForm.get('facultyBenefitted')?.updateValueAndValidity();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.clearValidators();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.updateValueAndValidity();
    }
    if (item.projectNotFunctionalReason === false) {

      this.rusaprogressForm.get('projectNotFunctionalReason').setValidators([Validators.required]);
      this.rusaprogressForm.get('projectNotFunctionalReason').updateValueAndValidity();
    } else {
      this.rusaprogressForm.get('projectNotFunctionalReason').clearValidators();
      this.rusaprogressForm.get('projectNotFunctionalReason').updateValueAndValidity();
    }

    // const institutionName = this.rusaprogressForm.controls['institutionName'].value;
    // const aisheCode = this.rusaprogressForm.controls['aisheCode'].value;
    // const updateInstituteName = institutionName ? institutionName : '';
    // const updateAisheCode = aisheCode ? ' (' + aisheCode + ')' : '';
    // // this.concatenatedValue = (institutionName || '') + (aisheCode ? ` (${aisheCode})` : '');
    // this.concatenatedValue = updateInstituteName + updateAisheCode;
    // this.rusaprogressForm.get('institutionName').setValue(this.concatenatedValue);
    // this.rusaprogressForm.disable();
    this.disableDelete = true
    
  

  }



  editRusaProgress(item, value) {
    // this.rusaprogressForm.get('aisheCode')?.disable()
    this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport')?.enable()
    if (!item.aisheCode) {
      const componentId = item.componentId;
      const rusaPhase = item.rusaPhase;  // assuming this is available on `item`
      this.componentIdValue = item.componentId;
      this.rusaPhaseValue = item.rusaPhase;
      const control = this.rusaprogressForm.get('aisheCode');

      const enableForRusa1 = ['RUSA 1'].includes(rusaPhase) && [1, 2, 3, 4, 6, 9, 10, 16].includes(componentId);
      const enableForRusa2 = ['RUSA 2'].includes(rusaPhase) && [1, 2, 3, 4, 6, 9, 10, 16].includes(componentId);

      const enableOptForRusa = ['RUSA 1'].includes(rusaPhase) && [7,12,13].includes(componentId);
      const enableOptForRusa2 = ['RUSA 2'].includes(rusaPhase) && [7,12,13].includes(componentId);

      if (enableForRusa1 || enableForRusa2) {
        control?.enable();
        control?.setValidators([Validators.required, aisheCodeValidator]);
        this.disableAisheCode = true;
        this.diablesOptAisheCode = false
      }
      else if (enableOptForRusa || enableOptForRusa2) {
        control?.enable();
        control?.clearValidators();
        this.disableAisheCode = true;
        this.diablesOptAisheCode = true
      }
      else {
        control?.disable();
        control?.clearValidators();
        this.disableAisheCode = false;
      }
      // Apply validation changes
      control?.updateValueAndValidity();
    }
    else if (item.aisheCode) {
      this.rusaprogressForm.get('aisheCode')?.disable()
      item.aisheCode ? this.disableAisheCode = false : this.disableAisheCode = true;
    }
    this.instituteItemName = item?.institutionName;
    this.disabledViewPage = false
    this.componentId = item.componentId
    // this.componentId = -1
    this.editItem = item
    this.rusaId = item.rusaId
    this.projectStatus(item.projectStatusId)
    this.getEnaDisable(value)
    this.getRusaProfressDataById(item);
    const months = [
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
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
    this.addUpdate = "Update";
    this.rusaprogressForm.patchValue(item);
    //null Value Handle Code-
    let whetherPmDigitallyLaunch = item.whetherPmDigitallyLaunchedProject === null ? false : item.whetherPmDigitallyLaunchedProject
    this.rusaprogressForm.get('whetherPmDigitallyLaunchedProject').setValue(whetherPmDigitallyLaunch)
    if (item.componentId === 11) {
      let stateShareReleased = item.stateShareReleased === null ? 0 : item.stateShareReleased;
      let stateShareUtilized = item.stateShareUtilised === null ? 0 : item.stateShareUtilised;
      this.rusaprogressForm.get('stateShareReleased')?.setValue(stateShareReleased);
      this.rusaprogressForm.get('stateShareUtilised')?.setValue(stateShareUtilized);
      this.rusaprogressForm.get('stateShareReleased')?.clearValidators();
      this.rusaprogressForm.get('stateShareReleased')?.updateValueAndValidity();
      this.rusaprogressForm.get('stateShareUtilized')?.clearValidators();
      this.rusaprogressForm.get('stateShareUtilized')?.updateValueAndValidity();

    }
    const fy = this.arrMonths.findIndex(month => parseInt(month) === parseInt(this.month));
    if (fy > -1) {
      this.month1 = this.arrMonths[fy - 1];
    }


    this.rusaprogressForm.get('expenditureTotal').setValue(item.expenditureTotal)
    this.rusaprogressForm.get('physicalProgressTotal').setValue(item.physicalProgressTotal)
    if (item.tentativeDateOfCompletion) {
      const [datePart, timePart] = item?.tentativeDateOfCompletion?.split('T');
      let split_dateAsString1 = datePart?.split("-");
      let final_format1 =
        `${split_dateAsString1[1]}/${split_dateAsString1[2]}/${split_dateAsString1[0]}`
        ;
      this.rusaprogressForm.get('tentativeDateOfCompletion')?.setValue(new Date(final_format1));
    }


    this.totalExpenditure();

    if (item.projectStatusId === 1) {
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('projectNotFunctionalReason')?.updateValueAndValidity();
      this.rusaprogressForm.get('benfitsFromTheProject')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('benfitsFromTheProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('facultyBenefitted')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('facultyBenefitted')?.updateValueAndValidity();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.setValidators([Validators.required]);
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.updateValueAndValidity();
    } else {
      this.reason = false;
      // this.rusaprogressForm.get('projectStatusId')?.clearValidators();
      // this.rusaprogressForm.get('projectStatusId')?.updateValueAndValidity();
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.clearValidators();
      this.rusaprogressForm.get('whetherProjectIsFunctionalOrIdle')?.updateValueAndValidity();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.clearValidators();
      this.rusaprogressForm.get('projectNotFunctionalReason')?.updateValueAndValidity();
      this.rusaprogressForm.get('benfitsFromTheProject')?.clearValidators();
      this.rusaprogressForm.get('benfitsFromTheProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.clearValidators();
      this.rusaprogressForm.get('studentsBenefitedThroughProject')?.updateValueAndValidity();
      this.rusaprogressForm.get('facultyBenefitted')?.clearValidators();
      this.rusaprogressForm.get('facultyBenefitted')?.updateValueAndValidity();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.clearValidators();
      this.rusaprogressForm.get('numberOfResearchWorkBeingUnderTaken')?.updateValueAndValidity();
    }
    if (item.projectNotFunctionalReason === false) {

      this.rusaprogressForm.get('projectNotFunctionalReason').setValidators([Validators.required]);
      this.rusaprogressForm.get('projectNotFunctionalReason').updateValueAndValidity();
    } else {
      this.rusaprogressForm.get('projectNotFunctionalReason').clearValidators();
      this.rusaprogressForm.get('projectNotFunctionalReason').updateValueAndValidity();
    }
    // const institutionName = this.rusaprogressForm.controls['institutionName'].value;
    // const aisheCode = this.rusaprogressForm.controls['aisheCode'].value;
    // const updateInstituteName = institutionName ? institutionName : '';
    // const updateAisheCode = aisheCode ? ' (' + aisheCode + ')' : '';
    // // this.concatenatedValue = (institutionName || '') + (aisheCode ? ` (${aisheCode})` : '');
    // this.concatenatedValue = updateInstituteName + updateAisheCode;
    // this.rusaprogressForm.get('institutionName').setValue(this.concatenatedValue);
  

  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.rusaProgressList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.rusaProgressList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.rusaProgressList.length - 1);
    }
  }

  getInputValue(){

  }

  calculate(dataUpdated: any): void {
    let y = 0.0;
    if (dataUpdated.centralShareReleased && dataUpdated.centralShareApproved) {
      const x = (Number(dataUpdated.centralShareReleased) / Number(dataUpdated.centralShareApproved)) * 100;
      y = (Number(dataUpdated.stateShareApproved) * x) / 100;
      dataUpdated.stateShareDueUnderScheme = y.toFixed(2);
    }

    // Shortfall in State Share
    if (dataUpdated.stateShareReleased) {
      const shortfallInStateUnderScheme = y - Number(dataUpdated.stateShareReleased);
      dataUpdated.shortfallInStateShareUnderScheme = shortfallInStateUnderScheme.toFixed(2);
    }

    // Central Share Utilized Percentage
    if (dataUpdated.centralShareUtilised && dataUpdated.centralShareReleased) {
      const csup = (Number(dataUpdated.centralShareUtilised) / Number(dataUpdated.centralShareReleased)) * 100;
      dataUpdated.centralShareUtilizedPercentAge = csup.toFixed(2);
    }

    // State Share Utilized Percentage
    if (dataUpdated.stateShareUtilised && dataUpdated.stateShareReleased) {
      const ssup = (Number(dataUpdated.stateShareUtilised) / Number(dataUpdated.stateShareReleased)) * 100;
      dataUpdated.stateShareUtilizedPercentAge = ssup.toFixed(2);
    }

    // Total Utilized Percentage
    if (dataUpdated.totalUtilisation && dataUpdated.totalAmountReleased) {
      const tup = (Number(dataUpdated.totalUtilisation) / Number(dataUpdated.totalAmountReleased)) * 100;
      dataUpdated.totalUtilizedPercentAge = tup.toFixed(2);
    }
  }


  getRusaProfressDataById(item){
    // let id = item.rusaId
    // let year = item.year == null ? 0 : item.year
    // let month = item.month == null ? 0 : item.month
    // this.getService.getRusaProfressDataById(id, year, month).subscribe(res =>{
      this.calculate(item);
      this.centralShareApprovedUpdate = '';
      this.stateShareApprovedUpdate = '';
      this.totalAmountApprovedUpdate = '';
      this.centralShareApprovedUpdate = item?.centralShareApproved;
      this.stateShareApprovedUpdate = item?.stateShareApproved;
      this.totalAmountApprovedUpdate = item?.totalAmountApproved;
      let percentageVar = item?.centralShareUtilizedPercentAge == null ? 0 : item?.centralShareUtilizedPercentAge.split('.')[0]
      this.centralShareUtilisedPercentage = item?.centralShareUtilizedPercentAge
      this.stateShareUtilisedPercentage = item?.stateShareUtilizedPercentAge
      this.totalPercentage = item?.totalUtilizedPercentAge
      this.shortFall = item?.shortfallInStateShareUnderScheme
      this.dueToShare = item?.stateShareDueUnderScheme

      // const pirId = item?.pirId;
      // const picId = item?.pirCertificateId;
      this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').setValue(item?.whetherPploadingPhysicalInspectionReport)
      this.rusaprogressForm.get('outcomeOfReport').setValue(item?.outcomeOfReport)
      this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').setValue(item?.whetherOutcomeReportIsSatisfactory)
      this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').setValue(item?.whetherReportSignedByCommitteeMemberForInspection)
      this.PirDocumentVisible = false;
      this.PirDocumentVisibleCft = false;
      this.pirArr = [];
      this.picArr = [];
      this.pirDocName = '';
      this.picDocName = '';
      this.pirdocNameVisible = false;
      this.picdocNameVisible = false;

      // ✅ STEP 2: CHECK + CALL
      this.pirId = item?.pirId
      this.picId = item?.pirCertificateId
      const pirId = item?.pirId;
      const picId = item?.pirCertificateId;

      if (pirId != null) {
        this.getPIRDoc(pirId, item);
      }

      if (picId != null) {
        this.getPICDoc(picId, item);
      }
      // if (pirId !== null && pirId !== undefined && picId !== null && picId !== undefined) {
      //       this.getPIRDoc(item)
      //       this.getPICDoc(item)
      // }

      if(percentageVar > 75 ){
        this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').setValidators([Validators.required]);
        this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').updateValueAndValidity();
        this.pirUploadIsVisible = true
        if(item.whetherPploadingPhysicalInspectionReport === true){
          this.rusaprogressForm.get('outcomeOfReport').setValidators([Validators.required]);
          this.rusaprogressForm.get('outcomeOfReport').updateValueAndValidity();
  
          this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').setValidators([Validators.required]);
          this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').updateValueAndValidity();
  
          this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').setValidators([Validators.required]);
          this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').updateValueAndValidity();
  
          this.pirUploadVisible = true;
          this.PirDocumentVisibleCft = false;
          this.PirDocumentVisible = false;
        }
        if(item.whetherPploadingPhysicalInspectionReport === false){
          this.rusaprogressForm.get('outcomeOfReport').setValidators([]);
          this.rusaprogressForm.get('outcomeOfReport').updateValueAndValidity();
      
          this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').setValidators([]);
          this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').updateValueAndValidity();
      
          this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').setValidators([]);
          this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').updateValueAndValidity();
          this.rusaprogressForm.get('outcomeOfReport').clearValidators();
          this.rusaprogressForm.get('outcomeOfReport').updateValueAndValidity();
      
          this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').clearValidators();
          this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').updateValueAndValidity();
      
          this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').clearValidators();
          this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').updateValueAndValidity();
  
          this.pirUploadVisible = false
          this.PirDocumentVisibleCft = true;
          this.PirDocumentVisible = true;
        }
      }
      else{
        this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').clearValidators();
        this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').updateValueAndValidity();
        this.pirUploadIsVisible = false
      }
 
  }

  getEnaDisable(getValue: any) {
    if (getValue == true) {
      this.rusaprogressForm.get('activityPreviousMonth')?.disable();
      this.rusaprogressForm.get('expenditurePreviousMonth')?.disable();
      this.rusaprogressForm.get('physicalProgressPreviousMonth')?.disable();
    }
    else {
      this.rusaprogressForm.get('activityPreviousMonth')?.enable();
      this.rusaprogressForm.get('expenditurePreviousMonth')?.enable();
      this.rusaprogressForm.get('physicalProgressPreviousMonth')?.enable();
    }
  }

  resetDropDown() {
    this.updateProjectStatus = 'ALL';
    this.updateStatus = 'ALL';
    this.rusaPhase = 'Select Phase';
    this.componentId = -1;
    this.ChangesProjectStatus('ALL')
    this.RusaStatus('')
  }


  
  resetFilter() {
    this.updateProjectStatus = 'ALL';
    this.updateStatus = 'ALL';
    this.rusaPhase = 'Select Phase';
    this.componentId = -1;
    // this.ChangesProjectStatus('ALL')
    this.RusaStatus('')
  }


  getRusaProgressListUpdate(year: any, months, projectCompleted: any, state: any, phase: any, componentId: any, digitallyLaunchedProject: any) {
    this.getService.getRusaProfressData(state, year, months, projectCompleted, phase, componentId, digitallyLaunchedProject).subscribe(res => {
      if (res.status === 200) {
        this.getenabValue = res.previousDataSubmit;
        if (res.data && res.data.length) {
          this.rusaProgressList = res.data;          
          let value = this.rusaProgressList.filter(e => e.year !== null)
          if (value && value.length) {
            this.year = value['0'].year.toString(),
              this.month = value['0'].month.toString();
            if (this.year === '2023') {
              this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
            }
            this.rusaProgressList = res.data.map((item, index) => {
              if (item?.month == this.month && item?.year == this.year && item.projectStatusId === 1) {
                return {
                  ...item,
                  diableCompleteValue: true
                };
              }
              else {
                return {
                  ...item,
                  diableCompleteValue: false
                } 
              }
              
            });

            this.getLock1()
            this.ChangesCurrentMonth(this.month)
            // this.resetDropDown()
          } else {
            this.lockHidden = true
          }
          this.tempList = [...this.rusaProgressList];

          let totalCentralAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.centralShareApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.centralShareApproved = totalCentralAmountAppr1

          let totalStateAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.stateShareApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.stateShareApproved = totalStateAmountAppr1

          let totalAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.totalAmountApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.totalAmountAppr = totalAmountAppr1
          this.totalExpend1 = this.tempList.reduce(
            (sum, item) => sum + (item.expenditureTotal),
            0
          );
          this.totalExpend = this.totalExpend1
          this.totalPhysicalProgress1 = this.tempList.reduce(
            (sum, item) => sum + (item.physicalProgressTotal),
            0
          );
          this.totalPhysicalProgress = this.totalPhysicalProgress1
          
          this.resetDropDown()
        } else {
          this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];

          this.year = this.arrYears.find(e => e.year === '2023').year
          this.month = this.monthList.find(o => o.monthCode === '10').monthCode
          this.getRusaProgressListUpdate(this.year, this.month, this.projectCompleted, this.stateCode, 'ALL', '-1', this.digitallyLaunched)
          this.ChangesCurrentMonth(this.month)
          this.resetDropDown()
        }

      }
      this.handlePageChange(this.sharedService.page = 1)
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getRusaProgressListUpdateNpd(state: any, year: any, month: any, projectCompleted: any, phase: any, componentId: any, digitallyLaunchedProject: any) {

    this.getService.getRusaProfressDataNpd(state, year, month, projectCompleted, phase, componentId, digitallyLaunchedProject).subscribe((res: any) => {
      if (res.status === 200) {
        this.getenabValue = res.previousDataSubmit;
        if (res.data && res.data.length) {
          this.rusaProgressList = res.data;

          let value = this.rusaProgressList.filter(e => e.year !== null)
          if (value && value.length) {
          }
          else {
            this.lockHidden = true
          }
          this.tempList = [...this.rusaProgressList];
          let totalCentralAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.centralShareApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.centralShareApproved = totalCentralAmountAppr1
          let totalStateAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.stateShareApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.stateShareApproved = totalStateAmountAppr1
          let totalAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.totalAmountApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.totalAmountAppr = totalAmountAppr1
          this.totalExpend1 = this.tempList.reduce(
            (sum, item) => sum + (item.expenditureTotal),
            0
          );
          this.totalExpend = this.totalExpend1
          this.totalPhysicalProgress1 = this.tempList.reduce(
            (sum, item) => sum + (item.physicalProgressTotal),
            0
          );
          this.totalPhysicalProgress = this.totalPhysicalProgress1

        } else {

        }

      }
      this.handlePageChange(this.sharedService.page = 1)
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getRusaProgressList(year: any, months, projectCompleted: any, state: any, phase: any, componentId: any, digitallyLaunched: any) {
  
    this.getService.getRusaProfressData(state, year, months, projectCompleted, phase, componentId, digitallyLaunched).subscribe(res => {
      if (res.status === 200) {

        this.getenabValue = res.previousDataSubmit;
        if (res.data && res.data.length) {
          this.rusaProgressList = res.data;
          this.rusaProgressList = res.data.map((item, index) => {
            if (item?.month == this.month && item?.year == this.year && item.projectStatusId === 1) {
              return {
                ...item,
                diableCompleteValue: true
              };
            }
            else {
              return {
                ...item,
                diableCompleteValue: false
              } 
            }
            
          });
          this.getLock1();
          this.tempList = [...this.rusaProgressList];
          let totalCentralAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.centralShareApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.centralShareApproved = totalCentralAmountAppr1

          let totalStateAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.stateShareApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.stateShareApproved = totalStateAmountAppr1

          let totalAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.totalAmountApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.totalAmountAppr = totalAmountAppr1
          this.totalExpend1 = this.tempList.reduce(
            (sum, item) => sum + (item.expenditureTotal),
            0
          );
          this.totalExpend = this.totalExpend1
          this.totalPhysicalProgress1 = this.tempList.reduce(
            (sum, item) => sum + (item.physicalProgressTotal),
            0
          );
          this.totalPhysicalProgress = this.totalPhysicalProgress1
        } else {
          this.rusaProgressList = [];
          this.tempList = [];
        }
      }

      if (res.status === 422) {
        this.openDialog();
      }
      this.handlePageChange(this.sharedService.page = 1)
    }, err => {
      this.lockHidden = false;
    })
  }
  getRusaProgressListNpd(state: any, year: any, month: any, projectCompleted: any, phase: any, componentId: any, digitallyLaunchedProject: any) {
    this.getService.getRusaProfressDataNpd(state, year, month, projectCompleted, phase, componentId, digitallyLaunchedProject).subscribe(res => {
      if (res.status === 200) {
        this.getenabValue = res.previousDataSubmit;
        if (res.data && res.data.length) {
          this.rusaProgressList = res.data;
          this.getLock1();
          this.tempList = [...this.rusaProgressList];
          let totalCentralAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.centralShareApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.centralShareApproved = totalCentralAmountAppr1
          let totalStateAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.stateShareApproved);

            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.stateShareApproved = totalStateAmountAppr1
          let totalAmountAppr1 = this.tempList.reduce((sum, item) => {
            const amount = parseFloat(item.totalAmountApproved);
            if (!isNaN(amount)) {
              return sum + amount;
            } else {
              return sum;
            }
          }, 0);
          this.totalAmountAppr = totalAmountAppr1
          this.totalExpend1 = this.tempList.reduce(
            (sum, item) => sum + (item.expenditureTotal),
            0
          );
          this.totalExpend = this.totalExpend1
          this.totalPhysicalProgress1 = this.tempList.reduce(
            (sum, item) => sum + (item.physicalProgressTotal),
            0
          );
          this.totalPhysicalProgress = this.totalPhysicalProgress1
          this.resetDropDown();
        } else {
          this.rusaProgressList = [];
          this.tempList = [];
        }
      }

      if (res.status === 422) {
        this.openDialog();
      }
      this.handlePageChange(this.sharedService.page = 1)
    }, err => {
      this.lockHidden = false;
    })
  }
  getProjectStatus() {
    this.getService.getprojectStatusList().subscribe(res => {
      if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['11'].id || this.userTypeId === this.sharedService.userTypeList['12'].id){
        this.projectStatusListUpdate = res.data;
        let filterArr = res.data.filter(item => item.id != 4)
        this.projectStatusList = filterArr;
      }
      else {
        this.projectStatusListUpdate = res.data;
        this.projectStatusList = res.data;
      }
    
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // getProjectStatusBottom() {
  //   this.getService.getprojectStatusList().subscribe(res => {
  //       this.projectStatusListUpdate = res.data;

    
  //      }, err => {
  //     console.error('Error fetching page status:', err);
  //   })
  // }
  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
  }

  lock() {
    let StatusValue = this.tempList.filter(item => item.id === null && item.projectStatusId !== 1);

    if (StatusValue.length > 0) {
      this.notification.showValidationMessage("Please Update All of the Records !!!");;
    }
    else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '25%',
        data: {
          message: 'Are you sure you want to Lock ?',

        }
      })
      let payload = {
        "lockStatus": true,
        "month": parseInt(this.month),
        "stateCode": this.stateCode,
        "year": parseInt(this.year),
        "rusaPmusha": this.sharedService.rusaKey
      }
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.postService.lockRusaProgress(payload).subscribe(res => {
            if (res.status === 200) {
              this.notification.showSuccess();
              this.getLock1()
            }
          }, err => {

          });

        }
      })


    }

  }

  getLock1() {
    let state = this.state ? this.state : this.stateCode
    if (this.year && this.month && state) {

      this.getService.getLockRusaProgress1(state, this.month, this.year, this.sharedService.rusaKey).subscribe(res => {
        if (res.data.length > 0) {


          res.data.forEach((v, i) => {
            if (res.data[i].lockStatus === true) {
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
  }


  getLock() {
    let state = this.state ? this.state : this.stateCode
    if (this.year && this.month && state) {

      this.getService.getLockRusaProgress1(state, this.month, this.year, this.sharedService.rusaKey).subscribe(res => {
        if (res.data.length > 0) {
          res.data.forEach((v, i) => {
            if (res.data[i].lockStatus === true) {
              this.lockHidden = false;
            } else {
              this.lockHidden = true;
              this.openDialog();
              if (this.userTypeId !== this.sharedService.userTypeList['0'].id ||
                this.userTypeId !== this.sharedService.userTypeList['6'].id ||
                this.userTypeId !== this.sharedService.userTypeList['7'].id ||
                this.userTypeId !== this.sharedService.userTypeList['8'].id ||
                this.userTypeId !== this.sharedService.userTypeList['9'].id ||
                this.userTypeId !== this.sharedService.userTypeList['10'].id) {
                this.rusaProgressList = [];
              }
            }

          });
        } else {
          this.openDialog();
          this.lockHidden = true;
          if (this.userTypeId === this.sharedService.userTypeList['0'].id ||
            this.userTypeId === this.sharedService.userTypeList['6'].id ||
            this.userTypeId === this.sharedService.userTypeList['7'].id ||
            this.userTypeId === this.sharedService.userTypeList['8'].id ||
            this.userTypeId === this.sharedService.userTypeList['9'].id ||
            this.userTypeId === this.sharedService.userTypeList['10'].id) {
            this.rusaProgressList = [];
          }
        }

      });

    }
  }


  getLockStatus() {
    this.filterYearMonths = [];
    let state = this.stateName == 'ALL' ? this.stateCode : '';
    this.getService.getLockRusaProgress(state, this.sharedService.rusaKey).subscribe(res => {
      this.getLockList = res.data;
      this.getLockList.sort((a, b) => {
        if (a.year === b.year) {
          return a.month - b.month;
        }
        return a.year - b.year;
      });
      if (res.data.length > 0) {
        res.data.forEach((v, i) => {
          this.filterYearMonths.push({
            monthlock: res.data[i].monthName,
            yearLock: res.data[i].year
          })


        })
        this.updatePaginatedData()
      }
      else {
        this.filterYearMonths = [];
        this.updatePaginatedData()
      }
    }
    );
    
  }


  findState() {
    this.getLockList = [];
  
    if (this.stateName === 'ALL') {
      // let resultUnique = this.filterStateUnique(this.tempListStatus);
      // let resu = this.filterState(this.stateList, this.tempListStatus);
      // this.getLockList = [...resultUnique, ...resu];
      this.getLockStatus1()
    } else {
      // let filteredState = this.tempListStatus.filter(item => 
      //   item.stateCode === this.stateName && item.lockStatus
      // );
      this.getLockFilter()
      this.stateFilter = true;
  
      // if (filteredState.length <= 0) {
      //   let unlockedState = this.tempListStatus.filter(item => 
      //     item.stateCode === this.stateName && !item.lockStatus
      //   );
      //   this.getLockList = [...unlockedState];
      // } else {
      //   this.getLockList = [...filteredState];
      // }
    }
  }

  getLockStatus1() {
    this.filterYearMonths = [];
    this.year = this.year ? this.year : '';
    this.month = this.month ? this.month : '';
    let state = this.stateName == 'ALL' ? null : this.stateName
    this.getService.getLockRusaProgressNpdPMUsha(state, this.sharedService.rusaKey, this.year, this.month).subscribe(res => {
      let resultUnique = this.filterStateUnique(res.data)
      let resu = this.filterState( this.stateList,res.data)
      this.getLockList =[...resultUnique,...resu];
      this.tempListStatus = [...res.data,...resu];
      if (res.data.length > 0) {
        res.data.forEach((v, i) => {
          this.filterYearMonths.push({
            monthlock: res.data[i].monthName,
            yearLock: res.data[i].year
          })
        })
        this.updatePaginatedData()
      }
      else {
        this.filterYearMonths = [];
        this.updatePaginatedData()
      }
    }
    );
   
  }

  getLockFilter() {
    this.filterYearMonths = [];
    this.year = this.year ? this.year : '';
    this.month = this.month ? this.month : '';
    let state = this.stateName == 'ALL' ? null : this.stateName
    this.getService.getLockRusaProgressNpdPMUsha(state, this.sharedService.rusaKey, this.year, this.month).subscribe(res => {
      this.getLockList = res.data;
      if (res.data.length > 0) {
        res.data.forEach((v, i) => {
          this.filterYearMonths.push({
            monthlock: res.data[i].monthName,
            yearLock: res.data[i].year
          })


        })
        this.updatePaginatedData()
      }
      else {
        this.filterYearMonths = [];
        this.updatePaginatedData()
      }
    }
    );
  }

  filterStateUnique(data: any[]) {
    let stateMap = new Map<string, any>();
  
    data.forEach(item => {
      const stateName = item.stateName;
      const existing = stateMap.get(stateName);
  
      // Store only the latest (max year and month) entry for each stateName
      if (!existing || item.year > existing.year || (item.year === existing.year && item.month > existing.month)) {
        stateMap.set(stateName, item);
      }
    });
  
    return Array.from(stateMap.values());
  }

  filterState(stateList, getLockList) {
   
    const filteredArray = stateList.filter(item => {
        // Check if the item is not in arr by comparing stateCode to all stCode
        return !getLockList.some(r1 => r1.stateCode === item.stCode);
        
    });
    
    return filteredArray.map((res)=>{
        return {...res,
          stateName:res.name,
          stateCode:res.stCode,
          lockStatus:false,
        }
        
    }); // Return the filtered array
    this.updatePaginatedData()
    
}



  tabSelected(value) {
    this.selectedIndex = value.index;

    this.projectCompleted = 'ALL';
    if (this.selectedIndex === 0) {
      this.passValue = 0;
      this.year = undefined;
      this.month = undefined;
      this.state = '';
      this.isFormInvalid = false
      this.rusaProgressList = [];
      this.getLockList = [];
      if (this.assignView) {
        this.getRusaProgressListUpdateNpd('', '', '', '', '', '', '')
      }
      else {
        this.getRusaProgressListUpdate('', '', this.projectCompleted, this.stateCode, 'ALL', '-1', this.digitallyLaunched);
        this.monthList = this.arrMonths;
        this.arrYears = [
          { year: '2023' },
          { year: '2024' },
          { year: '2025' },
          { year: '2026' },
        ]
      }
      this.reset()
    } else if (this.selectedIndex === 1) {
      this.pageIndex = 0;
      this.passValue = 0;
      this.state = 'ALL';
      this.rusaProgressList = [];
      this.getLockList = [];
      this.resetState()
      this.assignView ? this.getLockStatus1() : this.getLockStatus();



    }
   else if (this.selectedIndex === 2) {
   this.passValue = this.selectedIndex;


  }
  }

  openDialog() {
    this.dialog.open(MessageDialogComponent, {
      width: "25%",
    });

  }

  exportToExcel() {


    if (this.rusaProgressList.length != 0) {
      let customHeader: any = `Activities that have been already undertaken in ${this.modiefiedMonth}, ${this.year} Current Month`;
      //  this.arrMonths
      let filterItem = this.rusaProgressList.filter(item => item.projectStatusId !== 4);
      this.filterItemLength = this.rusaProgressList.filter(item => item.projectStatusId !== 4);
     if(this.userNpdTypeList){
      let custom_data = filterItem.map((item, index) => ({
        'S.No': index + 1,
        'State': item.stateName,
        'District': item.districtName,
        // 'Update Status': item.id != null ? 'Updated' : 'Not Updated',
        'Months': this.arrMonths.find(e => parseInt(e.monthCode) === item.month)?.name || '',
        "Year": item.year,
        'Component Name': item.componentName,
        'RUSA Phase': item.rusaPhase,
        'Institution Name': item.institutionName,
        'Aishe Code':  item.aisheCode ||
                                        (
                                        (
                                            item.rusaPhase === 'RUSA 1' && [5,8,11,14,15,17].includes(item.componentId)
                                        ) ||
                                        (
                                            item.rusaPhase === 'RUSA 2' && [5,8,11,14,15,17].includes(item.componentId)
                                        )
                                        ? 'Not Applicable' : ''
                                        ),
        'PAB Meeting Number': item.pabMeetingNumber,
        'PAB Date': item.pabDate,
        'Central Share Approved': +item.centralShareApproved.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
        'Central Share Released': +item.centralShareReleased,
        'Central Share Utilised': +item.centralShareUtilised,
        'State Share Approved': +item.stateShareApproved,
        'State Share Released': +item.stateShareReleased,
        'State Share Utilised': +item.stateShareUtilised,
        'Total Amount Approved': item.totalAmountApproved == 'NaN' ? '0' : +item.totalAmountApproved,
        'Total Amount Released': item.totalAmountReleased == 'NaN' ? '0' : +item.totalAmountReleased,
        'Total Amount Utilised': item.totalUtilisation == 'NaN' ? '0' : +item.totalUtilisation,
        'Activities that have been already undertaken in Current Month': item.activityCurrentMonth,
        'Activities that have been undertaken till Previous Month': item.activityPreviousMonth,
        'Activities yet to be undertaken': item.activitiesYetToBeUnderTaken,
        // 'Expenditure of in Current Month': +item.expenditureCurrentMonth,
        // 'Expenditure of Till Previous Month': +item.expenditurePreviousMonth,
        // 'Expenditure of Month Total': +item.expenditureTotal,
        // 'Percentage Physical Progress in Current Month': item.physicalProgressCurrentMonth,
        // 'Percentage Physical Progress Till Previous Month': item.physicalProgressPreviousMonth,
        'Percentage Physical Progress Total': item.physicalProgressTotal,
        'Whether PM Digitally Launched Project (Yes/ No)': item.whetherPmDigitallyLaunchedProject === true ? "Yes" : item.whetherPmDigitallyLaunchedProject !== null ? "No " : "",
        'Project Inauguration status [Inaugurated/ Not Inaugurated]': item.projectInaugrationStatus === true ? "Yes" : item.projectInaugrationStatus === null ? "" : "No",
        'If Inaugurated, then, by whom and when': item.inaugratedByWhomAndWhen,
        'Tentative Date of completion': item.tentativeDateOfCompletion,
        'Project Status': item.projectStatusName,
        'Whether the project is Functional[ or Lying idle/Not Functional]*': item.whetherProjectIsFunctionalOrIdle === true ? "Yes" : item.whetherProjectIsFunctionalOrIdle === null ? "" : "No",
        'If the Project is completed but not functional, Please state the reason(s):': item.projectNotFunctionalReason,
        'Benfits from the projects (Please provide details)': item.benfitsFromTheProject,
        'Number of students benefitted': item.studentsBenefitedThroughProject,
        'Number of faculties benefitted': item.facultyBenefitted,
        'Number of research works being undertaken': item.numberOfResearchWorkBeingUnderTaken,
        'Physical Inspection Reports (PIR)': +(((item.centralShareUtilised / item.centralShareReleased) * 100).toFixed(2)) > 75 ? 'Yes' : 'No',
        'PIR Uploaded (Yes/No/Not Selected)': +(((item.centralShareUtilised / item.centralShareReleased) * 100).toFixed(2)) > 75
                                        ? (item.whetherPploadingPhysicalInspectionReport === true
                                            ? 'Yes'
                                            : item.whetherPploadingPhysicalInspectionReport === false
                                                ? 'No'
                                                : 'Not Selected (Option)')
                                        : ''
      
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `${this.state == 'ALL' ? this.state : this.tempList[0].stateName}_${this.year ? this.year : 'Year'}_${this.modiefiedMonth ? this.modiefiedMonth : 'Month'}`);
      }

    else{
      let custom_data = filterItem.map((item, index) => ({
        'S.No': index + 1,
        'Update Status': item.id != null ? 'Updated' : 'Not Updated',
        'State': item.stateName,
        'District': item.districtName,
        'Months': this.arrMonths.find(e => parseInt(e.monthCode) === item.month)?.name || '',
        "Year": item.year,
        'Component Name': item.componentName,
        'RUSA Phase': item.rusaPhase,
        'Institution Name': item.institutionName,
        'Aishe Code':  item.aisheCode ||
                                        (
                                        (
                                            item.rusaPhase === 'RUSA 1' && [5,8,11,14,15,17].includes(item.componentId)
                                        ) ||
                                        (
                                            item.rusaPhase === 'RUSA 2' && [5,8,11,14,15,17].includes(item.componentId)
                                        )
                                        ? 'Not Applicable' : ''
                                        ),
        'PAB Meeting Number': item.pabMeetingNumber,
        'PAB Date': item.pabDate,
        'Central Share Approved': +item.centralShareApproved,
        'Central Share Released': +item.centralShareReleased,
        'Central Share Utilised': +item.centralShareUtilised,
        'State Share Approved': +item.stateShareApproved,
        'State Share Released': +item.stateShareReleased,
        'State Share Utilised': +item.stateShareUtilised,
        'Total Amount Approved': item.totalAmountApproved == 'NaN' ? '0' : +item.totalAmountApproved,
        'Total Amount Released': item.totalAmountReleased == 'NaN' ? '0' : +item.totalAmountReleased,
        'Total Amount Utilised': item.totalUtilisation == 'NaN' ? '0' : +item.totalUtilisation,
        'Activities that have been already undertaken in Current Month': item.activityCurrentMonth,
        'Activities that have been undertaken till Previous Month': item.activityPreviousMonth,
        'Activities yet to be undertaken': item.activitiesYetToBeUnderTaken,
        // 'Expenditure of in Current Month': +item.expenditureCurrentMonth,
        // 'Expenditure of Till Previous Month': +item.expenditurePreviousMonth,
        // 'Expenditure of Month Total': +item.expenditureTotal,
        // 'Percentage Physical Progress in Current Month': item.physicalProgressCurrentMonth,
        // 'Percentage Physical Progress Till Previous Month': item.physicalProgressPreviousMonth,
        'Percentage Physical Progress Total': item.physicalProgressTotal,
        'Whether PM Digitally Launched Project (Yes/ No)': item.whetherPmDigitallyLaunchedProject === true ? "Yes" : item.whetherPmDigitallyLaunchedProject !== null ? "No " : "",
        'Project Inauguration status [Inaugurated/ Not Inaugurated]': item.projectInaugrationStatus === true ? "Yes" : item.projectInaugrationStatus === null ? "" : "No",
        'If Inaugurated, then, by whom and when': item.inaugratedByWhomAndWhen,
        'Tentative Date of completion': item.tentativeDateOfCompletion,
        'Project Status': item.projectStatusName,
        'Whether the project is Functional[ or Lying idle/Not Functional]*': item.whetherProjectIsFunctionalOrIdle === true ? "Yes" : item.whetherProjectIsFunctionalOrIdle === null ? "" : "No",
        'If the Project is completed but not functional, Please state the reason(s):': item.projectNotFunctionalReason,
        'Benfits from the projects (Please provide details)': item.benfitsFromTheProject,
        'Number of students benefitted': item.studentsBenefitedThroughProject,
        'Number of faculties benefitted': item.facultyBenefitted,
        'Number of research works being undertaken': item.numberOfResearchWorkBeingUnderTaken,
        'Physical Inspection Reports (PIR)': +(((item.centralShareUtilised / item.centralShareReleased) * 100).toFixed(2)) > 75 ? 'Yes' : 'No',
        'PIR Uploaded (Yes/No/Not Selected)': +(((item.centralShareUtilised / item.centralShareReleased) * 100).toFixed(2)) > 75
                                        ? (item.whetherPploadingPhysicalInspectionReport === true
                                            ? 'Yes'
                                            : item.whetherPploadingPhysicalInspectionReport === false
                                                ? 'No'
                                                : 'Not Selected (Option)')
                                        : ''
      
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `${this.state == 'ALL' ? this.state : this.tempList[0].stateName}_${this.year ? this.year : 'Year'}_${this.modiefiedMonth ? this.modiefiedMonth : 'Month'}`);
      }


    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }

  updateExpenditure() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '441px',
      data: { message: 'Are you sure you want to update Physical Progress record?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // If user confirms
        let payload = {
          stateCode: this.stateCode,
          year: this.year,
          month: this.month
        };
        this.postService.updateExp(payload).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccessMessage('Record updated !!!');
          }
        }, err => {
          console.error('Error fetching page status:', err);
        });
      }
    });
  }


 tab: any
  viewPdf(data: any, fileName: any) {
    let uint8_data = _base64ToArrayBuffer(data[0]?.documentFile);
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
    // let file = new Blob([data[0]?.documentFile], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }

  viewPicPdf(data: any, fileName: any) {
    let uint8_data = _base64ToArrayBuffer(data[0]?.documentFile);
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

  getPreviousRusaMonthlyReport(){
  if (this.userNpdTypeList) {
    this.getService.getRusaPreviousMonthlyReport(this.previousStateCode,this.previousYear,this.previousMonth, this.rusaId).subscribe(res =>{
      if(res.status == 200){
        // this.calculate(res.data)
        this.previousReportArr = res.data
  
      }
      else{
        this.previousReportArr = []
      }
      
    })   
  }
  else {
    this.getService.getRusaPreviousMonthlyReport(this.stateCode,this.year,this.month, this.rusaId).subscribe(res =>{
      if(res.status == 200){
        // this.calculate(res.data)
        this.previousReportArr = res.data
  
      }
      else{
        this.previousReportArr = []
      }
      
    })   
  }
   
  }


  panelOpen(evnt){
    if(evnt == true){
      this.getPreviousRusaMonthlyReport() 
    }
  }

  @ViewChild('picker')
  datepicker!: MatDatepicker<Date>
  dateOpen() {
    this.datepicker.open();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  showLatestCurrentMonthRecord(response: any[]) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Jan = 1
  const currentYear = currentDate.getFullYear();

  // 1️⃣ Filter current month & year
  const filteredData = response.filter(item =>
    item.month === currentMonth &&
    item.year === currentYear
  );

  if (filteredData.length === 0) {
    return null; // nothing to show
  }

  // 2️⃣ Sort by latest dateTime
  filteredData.sort((a, b) => {
    const dateA = this.parseDate(a.dateTime);
    const dateB = this.parseDate(b.dateTime);
    return dateB.getTime() - dateA.getTime(); // latest first
  });

  // 3️⃣ Latest record
  return filteredData[0];
}

parseDate(item: any): Date {

  // ✅ Priority 1: dateTime (with time)
  if (item?.dateTime) {
    const parts = item.dateTime.split(' ');
    if (parts.length === 3) {

      const [datePart, timePart, meridian] = parts;
      const [day, month, year] = datePart.split('-').map(Number);
      let [hours, minutes, seconds] = timePart.split(':').map(Number);

      if (meridian === 'PM' && hours < 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;

      return new Date(year, month - 1, day, hours, minutes, seconds);
    }
  }

  // ✅ Priority 2: dateTimeInString (only date)
  if (item?.dateTimeInString) {
    const parts = item.dateTimeInString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
  }

  // ❌ If both missing → very old date
  return new Date(0);
}




  updatePaginatedData() {
   this.getLockList.sort((a: any, b: any) => {
    return this.parseDate(b).getTime()
         - this.parseDate(a).getTime();
  });
    // this.latestRecord = this.showLatestCurrentMonthRecord(this.getLockList);
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedgetLockList = this.getLockList.slice(startIndex, endIndex);
  }

  unlock(data:any){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '25%',
      data: {
        message: 'Are you sure you want to Unlock ?',

      }
    })
    let payload = {
      "lockStatus": false,
      "month": parseInt(data.month),
      "stateCode": data.stateCode,
      "year": parseInt(data.year),
      "rusaPmusha": 'R'
    }
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.postService.lockRusaProgress(payload).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccess();
            this.assignView ? this.getLockStatus1() : this.getLockStatus();
          }
        }, err => {

        });

      }
    })
  }

  getDateData(){
   this.getService.getDate().subscribe(
      (res) => {
        this.getDateTime = res;
      },
      (err) => { }
    );
  }

}
