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
import { ExcelService } from 'src/app/service/excel.service';
import { ApiService } from 'src/app/service/api.service';
import { DeleteService } from 'src/app/service/delete.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { UpdationRusaDialogComponent } from 'src/app/dialog/updation-rusa-dialog/updation-rusa-dialog.component';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'cfs-rusa-progress-updation',
  templateUrl: './rusa-progress-updation.component.html',
  styleUrls: ['./rusa-progress-updation.component.scss']
})
export class RusaProgressUpdationComponent implements OnInit {
  passValue: number;
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
  rusaPhase: string = 'ALL';
  state: string = 'ALL';
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
  disabledViewPage: boolean = false
  lockHidden: boolean;
  rusaProgressList: any = [];
  isFormInvalid: boolean = false;
  tempList: Array<any> = []
  tempListStatus: Array<any> = [];
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
  centralShareUtilisedPercentage: any;
  stateShareUtilisedPercentage: any;
  dueToShare: any;
  shortFall: any;
  totalPercentage: any;
  editItem: any;
  pirUploadVisible: boolean = false
  pirDocName: any;
  pirdocNameVisible: boolean = false
  picDocName: any;
  picdocNameVisible: boolean = false;
  pirId: any;
  picId: any;
  pirUploadIsVisible: boolean = false
  pirArr: any = []
  picArr: any = []
  previousReportArr: any = []
  rusaId: any;
  centralShareUtilisedVisible: boolean;
  stateShareUtilisedVisible: boolean;
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
  state1: any;
    displayedColumns: string[] = [
    'sno', 'stateName', 'action'
  ];

  dataSource = new MatTableDataSource<any>();
  constructor(public sharedService: SharedService, public dialog: MatDialog, private masterService: MasterService, public getService: GetService, public fb: FormBuilder, public errorMatcher: CustomErrorStateMatcher, public postService: PostService, public common: Common, public notification: NotificationService, public viewportScroller: ViewportScroller, private datepipe: DatePipe, private excelService: ExcelService, public api: ApiService, public deleteApi: DeleteService) {
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
    ]


  }

  ngOnInit(): void {
    this.getRusaProgressListUpdateNpd();
    this.getSateData();
    this.lasteDate();
    this.getProjectStatusBottom()
    this.stateCode = sessionStorage.getItem('stateCode');
    this.rusaprogressForm = this.fb.group({
      componentName: [{ value: '', disabled: true },],
      institutionName: [{ value: '', disabled: true }, []],
      id: 0,
      aisheCode: ['', { value: '', disabled: true },],
      stateCode: [{ value: '', disabled: true }, [Validators.required]],
      districtName: [{ value: '', disabled: true }, [Validators.required]],
      rusaPhase: [{ value: '', disabled: true }, [Validators.required]],
      pabMeetingNumber: [{ value: '', disabled: true }, [Validators.required]],
      pabDate: [{ value: '', disabled: true }, [Validators.required]],
      activityCurrentMonth: [{ value: '', disabled: true }, [Validators.required]],
      expenditureCurrentMonth: [{ value: '', disabled: true }, []],
      expenditurePreviousMonth: [{ value: true, disabled: true }, []],
      expenditureTotal: [{ value: '', disabled: true }, []],
      physicalProgressCurrentMonth: [{ value: '', disabled: true }, [Validators.required]],
      physicalProgressPreviousMonth: [{ value: '', disabled: true }, [Validators.required]],
      activityPreviousMonth: [{ value: '', disabled: true }, [Validators.required]],
      activitiesYetToBeUnderTaken: ['', [Validators.required]],
      physicalProgressTotal: [{ value: '', disabled: true }, [Validators.required]],
      whetherPmDigitallyLaunchedProject: [false, [Validators.required]],
      projectInaugrationStatus: [{ value: '', disabled: true }, []],
      inaugratedByWhomAndWhen: [{ value: '', disabled: true }, []],
      tentativeDateOfCompletion: [{ value: '', disabled: true }, []],
      projectStatusId: [{ value: '' }, [Validators.required]],
      projectNotFunctionalReason: [{ value: '', disabled: true }, [Validators.required]],
      benfitsFromTheProject: [{ value: '', disabled: true }, [Validators.required]],
      studentsBenefitedThroughProject: [{ value: '', disabled: true }, [Validators.required]],
      numberOfResearchWorkBeingUnderTaken: [{ value: '', disabled: true }, [Validators.required]],
      facultyBenefitted: [{ value: '', disabled: true }, [Validators.required]],
      year: [{ value: '', disabled: true }, []],
      month: [{ value: '', disabled: true }, []],
      state: [{ value: '', disabled: true }, []],
      projectCompleted: [{ value: '', disabled: true }, []],
      rusaId: [{ value: '', disabled: true }, [Validators.required]],
      documentId: [0, [Validators.required]],
      whetherProjectIsFunctionalOrIdle: [{ value: '', disabled: true }, false, [Validators.required]],
      centralShareApproved: [{ value: '', disabled: true }, [Validators.required]],
      centralShareReleased: [{ value: '', disabled: true }, [Validators.required]],
      centralShareUtilised: [{ value: '', disabled: true }, [Validators.required]],
      stateShareApproved: [{ value: '', disabled: true }, [Validators.required]],
      stateShareReleased: [{ value: '', disabled: true }, [Validators.required]],
      stateShareUtilised: [{ value: '', disabled: true }, [Validators.required]],
      totalAmountApproved: [{ value: '', disabled: true }, [Validators.required]],
      totalAmountReleased: [{ value: '', disabled: true }, [Validators.required]],
      totalUtilisation: [{ value: '', disabled: true }, [Validators.required]],
      whetherPploadingPhysicalInspectionReport: [{ value: '', disabled: true }, []],
      outcomeOfReport: [{ value: '', disabled: true }, []],
      whetherOutcomeReportIsSatisfactory: [{ value: '', disabled: true }, []],
      whetherReportSignedByCommitteeMemberForInspection: [{ value: '', disabled: true }, []]
    })

  }


  updateChanges(updateValue: any) {
    this.updateProjectStatus = ""
    this.rusaPhase = ""
    this.componentId = ""
    this.digitallyLaunched = ""

    if (updateValue == true) {
      this.rusaProgressList = this.tempList.filter(m => m.id != null);
      this.filterArr = this.rusaProgressList
      this.handlePageChange(this.sharedService.page = 1)

    }
    else if (updateValue == false) {
      this.rusaProgressList = this.tempList.filter(m => m.id == null);
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



  uploadpirDocuments(item, docymentType) {
    const formdata: FormData = new FormData();
    for (var i = 0; i < this.myFiles1.length; i++) {
      formdata.append("file", this.myFiles1[i]);
    }


    let payload = {
      aisheCode: item.aisheCode,
      componentId: item.componentId,
      documentType: docymentType,
      id: 0,
      stateCode: item.stateCode,
      districtCode: item.districtId,
      instituteCategory: "",
      rusaLegacyDataId: item.rusaId,
      year: this.year,
      month: this.month,


    }
    this.postService.uploadpirDocuments(payload, formdata).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage('Document Uploaded');
        this.PirDocumentVisible = true
        this.myFiles1 = [];
        this.myFilesName1 = ''

      }
    }, err => {

    })

  }

  uploadpirDocumentsCft(item, docymentType) {
    const formdata: FormData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formdata.append("file", this.myFiles[i]);
    }


    let payload = {
      aisheCode: item.aisheCode,
      componentId: item.componentId,
      documentType: docymentType,
      id: 0,
      stateCode: item.stateCode,
      districtCode: item.districtId,
      instituteCategory: "",
      rusaLegacyDataId: item.rusaId,
      year: this.year,
      month: this.month,


    }
    this.postService.uploadpirDocuments(payload, formdata).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage('Document Uploaded');
        this.PirDocumentVisibleCft = true
        this.myFiles = [];
        this.myFilesName = ''

      }
    }, err => {

    })

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
    let centralShareUtilised = +forms.controls['centralShareUtilised'].value
    let centralShareReleased = +forms.controls['centralShareReleased'].value
    let stateShareUtilised = +forms.controls['stateShareUtilised'].value
    let stateShareReleased = +forms.controls['stateShareReleased'].value
    let centralShareApproved = this.centralShareApprovedUpdate
    let stateShareApproved = this.stateShareApprovedUpdate
    let totalAmountApproved = this.totalAmountApprovedUpdate
    // let itemObject = {
    //   centralShareApproved,
    //   stateShareApproved,
    //   totalAmountApproved,
    //   centralShareReleased,
    //   centralShareUtilised,
    //   stateShareUtilised,
    //   stateShareReleased,
    //   centralShareUtilizedPercentAge : 0,
    //   stateShareUtilizedPercentAge : 0,
    //   totalUtilizedPercentAge: 0,
    //   shortfallInStateShareUnderScheme: 0,
    //   stateShareDueUnderScheme: 0
    // }
    // this.calculate(itemObject)
    // let percentageVar = itemObject?.centralShareUtilizedPercentAge == null ? 0 : itemObject?.centralShareUtilizedPercentAge.split('.')[0]
    // this.centralShareUtilisedPercentage = itemObject?.centralShareUtilizedPercentAge
    // this.stateShareUtilisedPercentage = itemObject?.stateShareUtilizedPercentAge
    // this.totalPercentage = itemObject?.totalUtilizedPercentAge
    // this.shortFall = itemObject?.shortfallInStateShareUnderScheme
    // this.dueToShare = itemObject?.stateShareDueUnderScheme
    if (stateShareReleased > stateShareApproved) {
      this.stateShareReleasedVisible = true
    }
    else {
      this.stateShareReleasedVisible = false
    }

    if (centralShareReleased > centralShareApproved) {
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
    if (centralShareUtilised > centralShareReleased) {
      this.centralShareUtilisedVisible = true
    }
    else {
      this.centralShareUtilisedVisible = false
    }

    if (stateShareUtilised > stateShareReleased) {
      this.stateShareUtilisedVisible = true
    }
    else {
      this.stateShareUtilisedVisible = false
    }






    const x = parseFloat(forms.controls['centralShareApproved'].value ? forms.controls['centralShareApproved'].value : 0) + parseFloat(forms.controls['stateShareApproved'].value ? forms.controls['stateShareApproved'].value : 0);
    const y = parseFloat(forms.controls['centralShareReleased'].value ? forms.controls['centralShareReleased'].value : 0) + parseFloat(forms.controls['stateShareReleased'].value ? forms.controls['stateShareReleased'].value : 0);
    const z = parseFloat(forms.controls['centralShareUtilised'].value ? forms.controls['centralShareUtilised'].value : 0) + parseFloat(forms.controls['stateShareUtilised'].value ? forms.controls['stateShareUtilised'].value : 0);
    this.rusaprogressForm.get('totalAmountApproved').setValue(x)
    this.rusaprogressForm.get('totalAmountReleased').setValue(y)
    this.rusaprogressForm.get('totalUtilisation').setValue(z)
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
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
  saveRusaProgress() {
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
    if ((!this.PirDocumentVisible && this.pirUploadIsVisible) || (!this.PirDocumentVisibleCft && this.pirUploadIsVisible)) {
      this.notification.showValidationMessage('PIR && Certificate Upload are mandatory !');
      return
    }
    if (this.rusaprogressForm.controls['physicalProgressTotal'].value < 100 && this.rusaprogressForm.value.projectStatusId === 1) {
      this.notification.showValidationMessage("Percentage Physical Progress Total should be equal to 100")
      return
    }
    this.isFormInvalid = false
    var res;
    if (this.rusaprogressForm.value.tentativeDateOfCompletion) {
      const inputDate = new Date(this.rusaprogressForm.value.tentativeDateOfCompletion);
      const adjustedDate = new Date(inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000));
      this.formattedDate = this.datepipe.transform(adjustedDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
    }
    else {
      this.formattedDate = '';
    }
    if (this.componentId !== 11 ? +this.rusaprogressForm.controls['centralShareReleased'].value > +this.rusaprogressForm.controls['centralShareApproved'].value : '') {
      this.notification.showValidationMessage('Central Share Released value should not be greater than the central share approved amount')
      return
    }
    if (+this.rusaprogressForm.controls['stateShareReleased'].value > +this.rusaprogressForm.controls['stateShareApproved'].value) {
      this.notification.showValidationMessage('State Share Released value should not be greater than the state share approved amount')
      return
    }
    if (+this.rusaprogressForm.controls['centralShareUtilised'].value > +this.rusaprogressForm.controls['centralShareReleased'].value) {
      this.notification.showValidationMessage('Central Share Utilised value should not be greater than the central share released amount')
      return
    }
    if (+this.rusaprogressForm.controls['stateShareUtilised'].value > +this.rusaprogressForm.controls['stateShareReleased'].value) {
      this.notification.showValidationMessage('State Share Utilised value should not be greater than the state share released amount')
      return
    }
    let data = this.rusaprogressForm.getRawValue();
    let payload = [
      {
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
        "centralShareUtilizedPercentAge": this.centralShareUtilisedPercentage,
        "stateShareUtilizedPercentAge": this.stateShareUtilisedPercentage,
        "totalUtilizedPercentAge": this.totalPercentage,
        "stateShareDueUnderScheme": this.dueToShare,
        "shortfallInStateShareUnderScheme": this.shortFall,
        "whetherPploadingPhysicalInspectionReport": this.rusaprogressForm.value.whetherPploadingPhysicalInspectionReport,
        "outcomeOfReport": this.rusaprogressForm.value.outcomeOfReport,
        "whetherOutcomeReportIsSatisfactory": this.rusaprogressForm.value.whetherOutcomeReportIsSatisfactory,
        "whetherReportSignedByCommitteeMemberForInspection": this.rusaprogressForm.value.whetherReportSignedByCommitteeMemberForInspection,

      }]
    if (this.rusaprogressForm.controls['physicalProgressTotal'].value <= 100) {
      this.postService.saveRusaProgress(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          let phaseRUSA = this.rusaPhase == '1' ? 'RUSA 1' : this.rusaPhase == '2' ? 'RUSA 2' : 'ALL'
          this.addUpdate = "Add"
          this.ProgressTotal = '';
          this.totalExpenditure1 = '';

          this.reset();
          this.getProjectStatus();
          this.getProjectStatusBottom()
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

  uploadingPhysical(event) {
    if (event.value == true) {
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
    else {
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

clearSearch() {
  this.searchText = '';
  this.updateResults(); // manually trigger filter
}

  // async updateResults() {
  //   this.rusaProgressList = this.searchByValue(this.tempList);
  //   this.handlePageChange(this.sharedService.page = 1)
  // }


  async updateResults() {
    this.state = 'ALL'
    this.updateProjectStatus = 'ALL';
    this.rusaPhase = 'ALL'
    this.rusaProgressList = []
    this.rusaProgressList = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
            } else {
        return (item.institutionName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.aisheCode?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.rusaPhase?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.pabMeetingNumber?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.pabDate?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.inaugratedByWhomAndWhen?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.activityCurrentMonth?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.activityPreviousMonth?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.activitiesYetToBeUnderTaken?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.expenditureCurrentMonth?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.physicalProgressTotal?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.physicalProgressPreviousMonth?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.physicalProgressCurrentMonth?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.expenditureTotal?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.studentsBenefitedThroughProject?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.benfitsFromTheProject?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.facultyBenefitted?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.numberOfResearchWorkBeingUnderTaken?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.whetherPmDigitallyLaunchedProject?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.remarks?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
      }
    })
  }



  totalExpenditure(): void {
    const previousMonthValue = this.rusaprogressForm.controls['physicalProgressPreviousMonth'].value;
    const ChnagedataP: any = previousMonthValue == null ? 0 : +previousMonthValue;
    this.FixedPeviousMonth = (ChnagedataP).toFixed(2)
    this.rusaprogressForm.get('physicalProgressPreviousMonth').setValue(this.FixedPeviousMonth);
    const currentMonthValue = this.rusaprogressForm.controls['physicalProgressCurrentMonth'].value;
    const dataP: any = previousMonthValue == null ? 0 : +previousMonthValue;
    const data11P: any = currentMonthValue == null ? 0 : +currentMonthValue;
    this.ProgressTotal = (dataP + data11P).toFixed(2);
    if (this.ProgressTotal > 100) {
      this.notification.showValidationMessage("Percentage Physical Progres must be less than or equal to 100")
    }
    this.rusaprogressForm.get('physicalProgressTotal').setValue(this.ProgressTotal);
  }


  formatAmount() {
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
      this.rusaprogressForm.get('projectStatusId')?.clearValidators();
      this.rusaprogressForm.get('projectStatusId')?.updateValueAndValidity();
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
    this.getProjectStatusBottom()
  }

  rusaProgressUpdation(item: any) {
    this.dialog.open(UpdationRusaDialogComponent, {
      width: '40%',
      data: item
    }).afterClosed().subscribe(result => {
      if (result) { // Optional: Check if dialog returned data
        // this.getRusaProfressDataNpdUpdate();
        this.getRusaProgressListUpdateNpd();
       
      }
    });
  }

  viewRusaProgress(item, value, key) {
    this.disabledViewPage = true
    this.componentId = item.componentId
    // this.componentId = -1
    this.editItem = item
    this.rusaId = item.rusaPhase=='RUSA 1'?1:item.rusaPhase==='RUSA 2'?2:item.rusaPhase==='PM-USHA' ?3:''
    this.getEnaDisable(value)
    this.getRusaProfressDataById(item);
    this.projectStatus(item.rusaProjectStatusId)
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
   
    this.rusaprogressForm.get('projectStatusId').setValue(item.rusaProjectStatusId)
    this.previousStateCode = item.stateId;
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
      this.rusaprogressForm.get('projectStatusId')?.clearValidators();
      this.rusaprogressForm.get('projectStatusId')?.updateValueAndValidity();
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

    const institutionName = this.rusaprogressForm.controls['institutionName'].value;
    const aisheCode = this.rusaprogressForm.controls['aisheCode'].value;
    const updateInstituteName = institutionName ? institutionName : '';
    const updateAisheCode = aisheCode ? ' (' + aisheCode + ')' : '';
    // this.concatenatedValue = (institutionName || '') + (aisheCode ? ` (${aisheCode})` : '');
    this.concatenatedValue = updateInstituteName + updateAisheCode;
    this.rusaprogressForm.get('institutionName').setValue(this.concatenatedValue);




  }



  editRusaProgress(item, value) {
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
    // let whetherPploadingPhysicalInspectionReport = item.whetherPploadingPhysicalInspectionReport === null ? false : item.whetherPploadingPhysicalInspectionReport
    // this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').setValue(whetherPploadingPhysicalInspectionReport)
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
      this.rusaprogressForm.get('projectStatusId')?.clearValidators();
      this.rusaprogressForm.get('projectStatusId')?.updateValueAndValidity();
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

    const institutionName = this.rusaprogressForm.controls['institutionName'].value;
    const aisheCode = this.rusaprogressForm.controls['aisheCode'].value;
    const updateInstituteName = institutionName ? institutionName : '';
    const updateAisheCode = aisheCode ? ' (' + aisheCode + ')' : '';
    // this.concatenatedValue = (institutionName || '') + (aisheCode ? ` (${aisheCode})` : '');
    this.concatenatedValue = updateInstituteName + updateAisheCode;
    this.rusaprogressForm.get('institutionName').setValue(this.concatenatedValue);


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

  getInputValue() {

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


  getRusaProfressDataById(item) {
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
    this.pirId = item?.pirId
    this.picId = item?.pirCertificateId
    this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').setValue(item?.whetherPploadingPhysicalInspectionReport)
    this.rusaprogressForm.get('outcomeOfReport').setValue(item?.outcomeOfReport)
    this.rusaprogressForm.get('whetherOutcomeReportIsSatisfactory').setValue(item?.whetherOutcomeReportIsSatisfactory)
    this.rusaprogressForm.get('whetherReportSignedByCommitteeMemberForInspection').setValue(item?.whetherReportSignedByCommitteeMemberForInspection)

    // this.getPIRDoc(item)
    // this.getPICDoc(item)
    if (percentageVar > 75) {
      this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').setValidators([Validators.required]);
      this.rusaprogressForm.get('whetherPploadingPhysicalInspectionReport').updateValueAndValidity();
      this.pirUploadIsVisible = true
      if (item.whetherPploadingPhysicalInspectionReport === true) {
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
      if (item.whetherPploadingPhysicalInspectionReport === false) {
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
    else {
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
  }



  resetFilter() {
    this.updateProjectStatus = 'ALL';
    this.updateStatus = 'ALL';
    this.rusaPhase = 'Select Phase';
    this.componentId = -1;
    // this.ChangesProjectStatus('ALL')
 
  }




  changesData() {
    this.rusaProgressList=[];
    if (!this.state.includes('ALL') && this.updateProjectStatus === 'ALL' && this.rusaPhase === 'ALL') {
      this.rusaProgressList = this.tempList.filter(item => this.state.includes(item.stateId));
    }
    else if (!this.state.includes('ALL') && this.updateProjectStatus !== 'ALL' && this.rusaPhase === 'ALL') {
      this.rusaProgressList = this.tempList.filter(item =>
        this.state.includes(item.stateId) && item.rusaProjectStatusId === this.updateProjectStatus
      );
    } else if (!this.state.includes('ALL') && this.updateProjectStatus !== 'ALL' && this.rusaPhase !== 'ALL') {
      this.rusaProgressList = this.tempList.filter(item =>
        this.state.includes(item.stateId) && item.rusaProjectStatusId === this.updateProjectStatus && item.rusaPhase === this.rusaPhase
      );
    } else if (this.state.includes('ALL') && this.updateProjectStatus !== 'ALL' && this.rusaPhase === 'ALL') {
      this.rusaProgressList = this.tempList.filter(item =>
        item.rusaProjectStatusId === this.updateProjectStatus
      );
    } else if (this.state.includes('ALL') && this.updateProjectStatus !== 'ALL' && this.rusaPhase !== 'ALL') {
      this.rusaProgressList = this.tempList.filter(item =>
        item.rusaProjectStatusId === this.updateProjectStatus && item.rusaPhase === this.rusaPhase
      );
    } else if (this.state.includes('ALL') && this.updateProjectStatus === 'ALL' && this.rusaPhase !== 'ALL') {
      this.rusaProgressList = this.tempList.filter(item =>
        item.rusaPhase === this.rusaPhase
      );
    } else {
      this.rusaProgressList = this.tempList
    }
    this.chnageTotalValueDedaction()



  }

  chnageTotalValueDedaction() {
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


 getRusaProgressListUpdateNpd(): void {
  this.getService.getRusaProfressDataNpdUpdate().subscribe(
    (res: any[]) => {
      if (res && res.length > 0) {
        this.rusaProgressList = res;
        this.tempList = [...res];  // 🔁 Used for filters or resets
        this.chnageTotalValueDedaction(); // 🧮 Update totals or aggregates
      } else {
        this.rusaProgressList = [];
        this.dataSource.data = [];
      }
    },
    error => {
      console.error('Failed to fetch RUSA data', error);
    }
  );
}


  
  getProjectStatus() {
    this.getService.getprojectStatusList().subscribe(res => {
      if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['11'].id) {
        let filterArr = res.data.filter(item => item.id != 4)
        this.projectStatusList = filterArr;
      }
      else {
        this.projectStatusList = res.data;
      }

    }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getProjectStatusBottom() {
    this.getService.getprojectStatusList().subscribe(res => {
      this.projectStatusListUpdate = res.data;


    }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
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
        this.getRusaProgressListUpdateNpd()
      }

      this.reset()
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
      let filterItem = this.rusaProgressList.filter(item => item.projectStatusId !== 4);
      this.filterItemLength = this.rusaProgressList.filter(item => item.projectStatusId !== 4);
        let custom_data = this.rusaProgressList.map((item, index) => ({
          'S.No': index + 1,
          'State': item.stateName,
          'Component Name': item.componentName,
          'RUSA Phase': item.rusaPhase,
          'Institution Name': item.institutionName + (item.aisheCode ? ' (' + item.aisheCode + ')' : ''),
          'District': item.districtName,
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
          // 'Percentage Physical Progress in Current Month': item.physicalProgressCurrentMonth,
          // 'Percentage Physical Progress Till Previous Month': item.physicalProgressPreviousMonth,
          'Percentage Physical Progress Total': item.physicalProgressTotal,
          'Whether PM Digitally Launched Project (Yes/ No)': item.whetherPmDigitallyLaunchedProject === true ? "Yes" : item.whetherPmDigitallyLaunchedProject !== null ? "No " : "",
          'Project Inauguration status [Inaugurated/ Not Inaugurated]': item.projectInaugrationStatus === true ? "Yes" : item.projectInaugrationStatus === null ? "" : "No",
          'If Inaugurated, then, by whom and when': item.inaugratedByWhomAndWhen,
          'Tentative Date of completion': item.tentativeDateOfCompletion,
          'Project Status': item.projectStatusName,
          'If Project is completed, whether the project is Functional[ or Lying idle/Not Functional]*': item.whetherProjectIsFunctionalOrIdle === true ? "Yes" : item.whetherProjectIsFunctionalOrIdle === null ? "" : "No",
          'If the Project is completed but not functional, Please state the reason(s):': item.projectNotFunctionalReason,
          'Benfits from the projects (Please provide details)': item.benfitsFromTheProject,
          'Number of students benefitted': item.studentsBenefitedThroughProject,
          'Number of faculties benefitted': item.facultyBenefitted,
          'Number of research works being undertaken': item.numberOfResearchWorkBeingUnderTaken,
          'Project Updation Remarks': item.remarks,
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
        this.excelService.exportToExcel(custom_data, `${this.state == 'ALL' ? this.state : this.rusaProgressList[0].stateName}_RUSA_Progress_Updation`);


    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }

  updateExpenditure() {
    let payload = {
      stateCode: this.stateCode,
      year: this.year,
      month: this.month
    }
    this.postService.updateExp(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage('Record updated !!!')
      }
    }, err => {
      console.error('Error fetching page status:', err);
    })
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

  getPreviousRusaMonthlyReport() {
   
      this.getService.getRusaPreviousMonthlyReport(this.previousStateCode, this.previousYear, this.previousMonth, this.rusaId).subscribe(res => {
        if (res.status == 200) {
          // this.calculate(res.data)
          this.previousReportArr = res.data

        }
        else {
          this.previousReportArr = []
        }

      })

  }


  panelOpen(evnt) {
    if (evnt == true) {
      this.getPreviousRusaMonthlyReport()
    }
  }

  @ViewChild('picker')
  datepicker!: MatDatepicker<Date>
  dateOpen() {
    this.datepicker.open();
  }

  clear() {
    this.getRusaProgressListUpdateNpd();
    this.getSateData();
    this.getProjectStatusBottom()
    this.state = 'ALL'
    this.updateProjectStatus = 'ALL';
    this.searchText = ''
    this.rusaPhase = 'ALL'
    // this.updateResults();
  }



}

