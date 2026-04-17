import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { PmushaService } from '../service/pmusha.service';
import { catchError, tap, switchMap, concatMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { forkJoin, from } from 'rxjs';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { GenderEquityValidationService } from 'src/app/service/gender-equity-validation.service';


@Component({
  selector: 'cfs-view-ins-gender-equity',
  templateUrl: './view-ins-gender-equity.component.html',
  styleUrls: ['./view-ins-gender-equity.component.scss']
})
export class ViewInsGenderEquityComponent implements OnInit {
  public routers: typeof routes = routes;
  districtCode: string;
  basicDetails: any;
  proposedArea: any;
  perUnitCost: any;
  totalCost: any;
  infrsRenovationsData: any;
  infraRenoproposedArea: any;
  infraRenoperUnitCost: any;
  infraRenototalCost: any;
  equipmentData: any;
  quantity: any;
  equipmentperUnitCost: any;
  equipmenttotalCost: any;
  workshopsData: any;
  totalCostW: any;
  proposedAreaW: any;
  perUnitCostW: any;
  expectedOutcome: any;
  targetNoParticipant1: any;
  remedialClassesData: any;
  numberofClass: any;
  costPerClassReme: any;
  expectedOutcomeReme: any;
  targetNumberofParticipantsReme: any;
  totalCostReme: any;
  proposedAreaClassReme: any;
  stemCoursesData: any;
  dataListVocational: any;
  unitV: any;
  costPerUnitV: any;
  totalCostV: any;
  expectedOutcomeV: any;
  targetNoParticipantV: any;
  dataActivitiesList: any;
  unitActivity: any;
  costPerUnitActivity: any;
  targetNoBeneficiaryActivity: any;
  expectedOutcomeActivity: any;
  totalCostActivity: any;
  dataTimeLineList: any;
  dataFinancialEstimateList: any;
  listData: any;
  searchText: any;
  componentId: any;
  outcomesData: any;
  otherSourceOfFundsData: any;
  rusaData: any;
  otherInformationData: any;
  tentativeDate: any;
  provideDetails: any;
  withExistringLinkage: boolean;
  otherInfo: string;
  withScopeForLinkage: boolean;
  withoutLinkage: boolean;
  myFilesName: any;
  documentOfDpr: any;
  tab: Window;
  activityDetailData: any;
  total: number = 0;
  criteriaList: any;
  costList: any;
  totalCostMain: any;
  aisheCode: string;
  addRemarks: any
  userTypeId: string;
  consultantComment: string;
  infraconstructionData: Array<any> = [];
  infrarenovationData: Array<any> = [];
  equipmentProcData: Array<any> = [];
  stemCourseData: Array<any> = [];
  workShopData: Array<any> = [];
  remClassData: Array<any> = [];
  vocationalData: Array<any> = [];
  timelineData: Array<any> = [];
  propOutcomeData: Array<any> = [];
  activityDetailsData:Array<any> = [];
  rusaApprovalDetails:Array<any> = [];
  consultantUserId: any;
  userName:any;
  overallData:any;
  userId: any;
  assignView: boolean=false;
  costData: any;
  panelOpenState = true;
  UpdateScoreList: Array<any> = [];
  sumConsutant:any;
  overallView: boolean;
  otherSourceView= true;
  consultantRemarks: string;
  eligibleList:Array<any>=[];
  activityNegativeRemrk: Array<any> = [];
  hiddenValue:boolean=true;
  pmushaUniqueCode: number;
  isInfraConstruction: any;
  getremarkData: any[]=[];
  arrMonths: any = [];
  arrMonths1: any = [];
  arrYears: any = [];
  monthList: any[];
  month: any = "";
  modiefiedMonth: any;
  year:any = "";
  updateProgressData: any[]=[];
  otherInformData: any;
  isView: boolean = false;
  isPanelOpen: boolean;
  isPanelOpenScore: boolean;
  isPanelOpenCost: boolean;
  isPanelOpenFinc: boolean;
  isPanelOpenInfra: boolean;
  isPanelOpenReno: boolean;
  isPanelOpenEquip: boolean;
  isPanelOpenWork: boolean;
  isPanelOpenActivity: boolean;
  isPanelOpenOutcome: boolean;
  isPanelOpenAct: boolean;
  stateCode: any;
  Progressconditions: any[];
  uniqueId: any;
  uniqueYear: any;
  uniqueMonth: any;
  lockHidden: boolean;
  infraconditions: any[];
  renvoconditions: any[];
  equpconditions:any[];
  outcomeconditions: any[];
  activityconditions: any[];
  uniqueDistrictCode: any;
  isPanelOpenClass: boolean;
  isPanelOpenVocational: boolean;
  workconditions:any[];
  remidalconditions: any[];
  vocationalconditions: any[];
  proposedconditions: any[];
  uniqueIdValue: string;
  uniqueStateCode: string;
  tagId: any;
  tagDistrictId: string;
  lockHiddenTag: boolean;
  isRunning = true;
  deadlineDate: string;
  message: string;
  lockId:any
  dataOutComeList: Array<any> = [];
  isAllSelected: boolean;
  isAllSelected1: boolean;
  isAllSelected2: boolean;
  reportId: string;
  tabIndexId: string;
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
  @Output() validationSuccess = new EventEmitter<void>();
  infraConstructionList: any[];
  itemList: any;
  renovatedList: any[];
  equipmentList: any[];
  workshopDataList: any[];
  remedialClassesList: any[];
  dataListVocational1: any[];
  dataActivitiesList1: any[];
  constructor(public api: ApiService, public common: Common, public sharedService: SharedService, public router: Router,
    public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, public getpmService: PmushaService, private encrypt: EncryptDecrypt, public ValidationService: GenderEquityValidationService) {
    // this.componentId = this.sharedService.genderComponentId

    this.componentId = this.route.snapshot.paramMap.get('id');
    this.uniqueId = this.route.snapshot.paramMap.get('uniqueId');
    this.uniqueYear = this.route.snapshot.paramMap.get('year');
    this.uniqueMonth = this.route.snapshot.paramMap.get('month');
    this.tagId = this.route.snapshot.paramMap.get('tagId');
    this.reportId = this.route.snapshot.paramMap.get('reportId');
    this.tabIndexId = this.route.snapshot.paramMap.get('tabIndex');
    this.tagDistrictId = this.route.snapshot.paramMap.get('districtCode');

    // this.uniqueIdValue = this.route.snapshot.paramMap.get('idvalue');
    // this.uniqueStateCode = this.route.snapshot.paramMap.get('stateCode');
    this.districtCode = sessionStorage.getItem("districtCode")
    this.aisheCode = sessionStorage.getItem('aisheCode')
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.stateCode = sessionStorage.getItem("stateCode")
    this.consultantComment = sessionStorage.getItem('consultantComment')
    this.consultantUserId = sessionStorage.getItem('consultantUserIdNmdc')
    this.consultantRemarks = sessionStorage.getItem('consultantRemarks')
    this.userName = sessionStorage.getItem('userName');
    this.uniqueStateCode = this.route.snapshot.paramMap.get('stateCode')
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id  || this.userTypeId === sharedService.userTypeList['7'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
      this.userId = sessionStorage.getItem('userName')
    }
    if(this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
      this.assignView = true
    }
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
      this.districtCode = sessionStorage.getItem('districtCodeGender');
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
    this.arrMonths1 = [
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
    ]
    this.arrYears = [
      { year: '2024' },
      { year: '2025' },
      { year: '2026' }
    ];

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
    // this.getCostData();
    this.getDateData();
    this.getV3Elegibal();
    if (this.uniqueId){
      this.month = this.uniqueMonth;
      this.year = this.uniqueYear;
      this.stateCode = this.uniqueStateCode;
      this.findNpd(this.uniqueMonth, this.uniqueYear)
    }
    else if (this.tagId){
      this.isView = true;
      this.tabValueAllTag()
      this.getLockTagStatus()
    }
    else if (this.reportId){
      this.isView = true;
    }
    
    this.getoverallData();
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
     this.message = `You can only submit data from ${fromDate}, to ${this.deadlineDate}.`;
  }

  toggleMarquee() {
    this.isRunning = !this.isRunning;
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
    else if ((e === 'propActivity') && (prposalId === 99)) {
      this.getProposalEquity(prposalId)
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
    else if ((e === 'workshop') && (prposalId === 5)) {
      this.getWorkshop1(prposalId)
    }
    else if ((e === 'remedialClass') && (prposalId === 6)) {
      this.getRemedialData(prposalId)
    }
    else if ((e === 'vocational') && (prposalId === 8)) {
      this.getVocational(prposalId)
    }

    else if ((e === 'proposalCost')) {
      this.loadAllMeruData1()
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
    else if (prposalId === 12) {
      this.getActivitiesData(prposalId)
    }
    else if (prposalId === 11) {
      this.getOutComeIndicator(prposalId)
    }
    else if (prposalId === 5) {
      this.getWorkshop1(prposalId)
    }
    else if (prposalId === 6) {
      this.getRemedialData(prposalId)
    }
    else if (prposalId === 8) {
      this.getVocational(prposalId)
    }
    else if (prposalId === 99) {
      this.getProposalEquity(prposalId)
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
        });
         this.getProposedOutcomeData(propId)
      },
      (error) => { }
    );

  }


  getInfraCons(propId) {
    if (this.tagId || this.reportId) {
      this.api.getInfraConstructionGenderRevision(this.tagDistrictId, this.componentId, this.sharedService.pabStatus)
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
            this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];

          }
          else {
            this.isInfraConstruction = infraData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true)
          }
             if (this.isInfraConstruction.length > 0) {
              this.infraconditions = []
              this.isInfraConstruction?.forEach((item)=>{
                if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0){
                  this.infraconditions.push(item);
                }
              })
            }

            this.isInfraConstruction = this.isInfraConstruction.map(item => ({
               ...item,
                month: this.month,
                year: this.year,
                totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
                (sum, tag) => sum + Number(tag.costBreakup || 0),
                0
              ) || 0
            }));
          // this.isInfraConstruction = res.data || [];
          // this.isInfraConstruction = this.isInfraConstruction.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          // if (this.isInfraConstruction.length > 0) {
          //   this.infraconditions = []
          //   this.isInfraConstruction?.forEach((item)=>{
          //     if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){

          //       this.infraconditions.push(item);

          //     }
          //   })
          //   if (this.isInfraConstruction) {
          //     this.isInfraConstruction = res.data.map(item => {
          //       item.month = this.month;
          //       item.year = this.year;
          //       return item;
          //     });
          //   }
          // }
         
          this.isAllSelected = false;
          this.updateAggregateValues();
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
    else {
      this.api.getInfraConstructionGenderRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus)
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
            this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
            this.isInfraConstruction = infraData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true)
          }

            this.isInfraConstruction = this.isInfraConstruction.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          this.updateAggregateValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.isInfraConstruction);
          this.infraconditions = []
          this.isInfraConstruction?.forEach((item)=>{
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
    ? this.isInfraConstruction   // ✅ V3 me sab allow
    : this.isInfraConstruction.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    // this.isInfraConstruction = this.isInfraConstruction.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.proposedArea = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );
    this.perUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }

  getFiniacialProgress(){
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe,
      componentId: this.componentId,
      year: this.year,
      month: this.month,
      stateCode : this.stateCode,
      districtCode : this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode
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
              'districtId' : this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode,
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
              'physicalProgressTotal':item.physicalProgressTotal,
              'totalUtilisation' : item.totalUtilisation,
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
              'districtId' : this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode,
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
              'physicalProgressTotal':item.physicalProgressTotal,
              'totalUtilisation' : item.totalUtilisation,
              'rusaProjectStatusId': item.rusaProjectStatusId,
              'year' : this.year

            }
         });

         this.Progressconditions = []
         this.updateProgressData?.forEach((item)=>{
           if(item?.centralShareReleased && item?.centralShareUtilised && item?.stateShareReleased && item?.stateShareUtilised && (item?.physicalProgressTotal !== null && item?.physicalProgressTotal >= 0) && item.rusaProjectStatusId){
             this.Progressconditions.push(item);

           }
         })

      }, err => {
  
      })


  }

  getRenovated(propId) {
    if (this.tagId || this.reportId) {
      this.getpmService.getGenRenovatedListStatus(this.tagDistrictId, this.componentId, this.sharedService.pabStatus)
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
          this.infrsRenovationsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.infrsRenovationsData = renovatedData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
          }
           if (this.infrsRenovationsData.length > 0) {
              this.renvoconditions = []
              this.infrsRenovationsData?.forEach((item)=>{
                if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){
                  this.renvoconditions.push(item);
                }
              })
            }

            this.infrsRenovationsData = this.infrsRenovationsData.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          // this.infrsRenovationsData = res.data || [];
          // this.infrsRenovationsData = this.infrsRenovationsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          // if (this.infrsRenovationsData.length > 0) {
          //   this.renvoconditions = []
          //   this.infrsRenovationsData?.forEach((item,i)=>{
          //   if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0 && item?.proposalItemTagging === null || item?.proposalItemTagging === undefined){

          //     this.renvoconditions.push(item);

          //   }
          // })
          // if (this.infrsRenovationsData) {
          //   this.infrsRenovationsData = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
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
      this.getpmService.getGenRenovatedListStatus(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus)
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
          this.infrsRenovationsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.infrsRenovationsData = renovatedData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
          }

            this.infrsRenovationsData = this.infrsRenovationsData.map(item => ({
               ...item,
                month: this.month,
                year: this.year,
                totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
                (sum, tag) => sum + Number(tag.costBreakup || 0),
                0
              ) || 0
            }));
          // this.infrsRenovationsData = res.data || [];
          // this.infrsRenovationsData = this.infrsRenovationsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          // if (this.infrsRenovationsData) {
          //   this.infrsRenovationsData = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updaterenvoValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.infrsRenovationsData = this.infrsRenovationsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.infrsRenovationsData);
          this.renvoconditions = []
          this.infrsRenovationsData?.forEach((item,i)=>{
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
    ? this.infrsRenovationsData   // ✅ V3 me sab allow
    : this.infrsRenovationsData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.infrsRenovationsData = this.infrsRenovationsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
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
      this.getpmService.getGenEquipmentListRevision(this.tagDistrictId, this.componentId, this.sharedService.pabStatus)
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

          this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
            this.equipmentData = equipmentData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
          }
             if (this.equipmentData.length > 0) {
              this.equpconditions = []
              this.equipmentData?.forEach((item)=>{
                if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0){
                  this.equpconditions.push(item);
                }
              })
            }

            this.equipmentData = this.equipmentData.map(item => ({
               ...item,
                month: this.month,
                year: this.year,
                totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
                (sum, tag) => sum + Number(tag.costBreakup || 0),
                0
              ) || 0
            }));
          // this.equipmentData = res.data || [];
          // this.equipmentData = this.equipmentData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          // if (this.equipmentData.length > 0) {
          //   this.equpconditions = []
          //   this.equipmentData?.forEach((item,i)=>{
          //   if(item?.proposalItemTagging === null || item?.proposalItemTagging === undefined || item?.proposalItemTagging === 0){

          //     this.equpconditions.push(item);

          //   }
          // })
          // if (this.equipmentData) {
          //   this.equipmentData = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          // }
          
          this.isAllSelected2 = false;
          this.updateEquiValues();
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }
    else {
      this.getpmService.getGenEquipmentListRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus)
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
          this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.equipmentData = equipmentData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
          }

            this.equipmentData = this.equipmentData.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          // this.equipmentData = res.data || [];
          // this.equipmentData = this.equipmentData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          // if (this.equipmentData) {
          //   this.equipmentData = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updateEquiValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.equipmentData = this.equipmentData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.equipmentData);
          this.equpconditions = []
          this.equipmentData?.forEach((item,i)=>{
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
    ? this.equipmentData   // ✅ V3 me sab allow
    : this.equipmentData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.equipmentData = this.equipmentData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
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


  getWorkshop1(propId) {
    this.api.getWorkshopGenderEquityRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const workshopsData = res?.data || [];
          // this.workshopsData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = workshopsData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = workshopsData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = workshopsData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = workshopsData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.workshopsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.workshopsData = workshopsData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
          }
           this.workshopsData = this.workshopsData.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
            // this.workshopsData = this.workshopsData.map(item => {
            //   item.month = this.month; // Months are zero-based, so add 1
            //   item.year = this.year;
            //   return item;
            // });
          this.updateWorkValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.workshopsData = this.workshopsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.workshopsData);
          this.workconditions = []
          this.workshopsData?.forEach((item,i)=>{
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if(item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 || isMonthOrYearDifferent){

              this.workconditions.push(item);

            }
          })
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  updateWorkValues() {
     const dataForAggregate = this.V3Elegibal
    ? this.workshopsData   // ✅ V3 me sab allow
    : this.workshopsData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.workshopsData = this.workshopsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.proposedAreaW = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.perUnitCostW = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerWorkshop),
      0
    );
    this.totalCostW = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.expectedOutcome = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNoParticipant1 = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
  }

  getRemedialData(propId) {
    this.api.getRemedialClasssGenderEquityRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const remedialClassesData = res?.data || [];
          // this.remedialClassesData = res.data || [];
        if (this.V3Elegibal) {
           this.updateIdArrFilter = remedialClassesData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = remedialClassesData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = remedialClassesData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = remedialClassesData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.remedialClassesData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
        }
        else {
          this.remedialClassesData = remedialClassesData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true));
        }
         this.remedialClassesData = this.remedialClassesData.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          // if (this.remedialClassesData) {
          //   this.remedialClassesData = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updateClassValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.remedialClassesData = this.remedialClassesData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.remedialClassesData);
          this.remidalconditions = []
          this.remedialClassesData?.forEach((item,i)=>{
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if(item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 || isMonthOrYearDifferent){

              this.remidalconditions.push(item);

            }
          })
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  updateClassValues() {
     const dataForAggregate = this.V3Elegibal
    ? this.remedialClassesData   // ✅ V3 me sab allow
    : this.remedialClassesData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.remedialClassesData = this.remedialClassesData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.proposedAreaClassReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.numberofClass = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.noOfClasses),
      0
    );
    this.costPerClassReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerClass),
      0
    );
    this.expectedOutcomeReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNumberofParticipantsReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
    this.totalCostReme = dataForAggregate.reduce((sum, item) => sum + Number(item.totalCost), 0); 
  }


  getVocational(propId) {
    // getGenRenovatedList
    this.api.getVocationalDataGenderEquityRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          // this.dataListVocational = res.data || [];
          const dataListVocational = res?.data || [];
           if (this.V3Elegibal) {
            this.updateIdArrFilter = dataListVocational.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = dataListVocational.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = dataListVocational.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = dataListVocational.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
        }
        else {
          this.dataListVocational = dataListVocational.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
        }
           this.dataListVocational = this.dataListVocational.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          // if (this.dataListVocational) {
          //   this.dataListVocational = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updateVocationalValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.dataListVocational = this.dataListVocational.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.dataListVocational);
          this.vocationalconditions = []
        //   this.dataListVocational?.forEach((item,i)=>{
        //   const isProgressMissing = item?.projectStatusId == null || item?.projectStatusId === 0;
        //   const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
        //     if(isProgressMissing || isMonthOrYearDifferent){

        //       this.equpconditions.push(item);

        //     }
        //   })
        // }),
          this.dataListVocational?.forEach((item,i)=>{
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if(item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 && item?.physicalProgress === null || item?.physicalProgress === undefined || isMonthOrYearDifferent){

              this.vocationalconditions.push(item);

            }
          })
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }
  
  updateVocationalValues() {
    const dataForAggregate = this.V3Elegibal
    ? this.dataListVocational   // ✅ V3 me sab allow
    : this.dataListVocational.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.dataListVocational = this.dataListVocational.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.unitV = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.costPerUnitV = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.totalCostV = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.expectedOutcomeV = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNoParticipantV = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
  }


  getProposalEquity(propId) {
    // getGenRenovatedList
    this.api.getActivitiesGenderEquityRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          // this.dataActivitiesList = res.data || [];
          const dataActivitiesList = res?.data || [];
          if (this.V3Elegibal) {
           this.updateIdArrFilter = dataActivitiesList.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = dataActivitiesList.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = dataActivitiesList.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = dataActivitiesList.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
        }
        else {
          this.dataActivitiesList = dataActivitiesList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
        }
        
            this.dataActivitiesList = this.dataActivitiesList.map(item => ({
               ...item,
                month: this.month,
                year: this.year
            }));
          // if (this.dataActivitiesList) {
          //   this.dataActivitiesList = res.data.map(item => {
          //     item.month = this.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updateProposedValues();
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.dataActivitiesList = this.dataActivitiesList.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.dataActivitiesList);
          this.proposedconditions = []
          this.dataActivitiesList?.forEach((item,i)=>{
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if(item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 && item?.physicalProgress === null || item?.physicalProgress === undefined || isMonthOrYearDifferent){

              this.proposedconditions
              .push(item);

            }
          })
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }
  
  updateProposedValues() {
     const dataForAggregate = this.V3Elegibal
    ? this.dataActivitiesList   // ✅ V3 me sab allow
    : this.dataActivitiesList.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.dataActivitiesList = this.dataActivitiesList.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.unitActivity = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.costPerUnitActivity = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.totalCostActivity = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.targetNoBeneficiaryActivity = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNoBeneficiary),
      0
    );
  }

  getProposedOutcomeData(propId) {
    this.api.getOutComeGenderEquityRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.revAddId)
      .pipe(
        tap(res => {
          this.outcomesData = res.data || [];
          if (this.outcomesData) {
            this.outcomesData = res.data.map(item => {
              item.month = this.month; // Months are zero-based, so add 1
              item.year = this.year;
              return item;
            });
          }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.outcomesData);
            this.outcomesData.forEach(element => {
            this.dataOutComeList.forEach(e=>{
              if (e.id === element.outcomeIndicatorId) {
                element['indicatorInfo'] = e.indicatorInfo
              }
            })
          });
          this.outcomeconditions = [];
          this.outcomesData?.forEach((item) => {
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
              if (item?.targetFor2024 === null || item?.targetFor2024 === undefined || item?.targetFor2024 === '' && item?.targetFor2025 === null || item?.targetFor2025 === undefined || item?.targetFor2025 === '' && item?.targetFor2026 === null || item?.targetFor2026 === undefined || item?.targetFor2026 === '' || isMonthOrYearDifferent) {
              this.outcomeconditions.push(item);
            }
          });
        }),
        catchError(err => {
          return of(null);
        })
      ).subscribe();
  }

  getActivitiesData(propId) {
    this.getpmService.getGenActivityDetails(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId)
      .pipe(
        tap(res => {
          this.activityDetailData = res || [];
          this.activityDetailData.forEach(ele => {
            if (ele.proposalActivityName) {
              ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
            }
            if (ele.itemName) {
              ele.itemName = Object.values(ele.itemName).toString()
            }
          });
          if (this.activityDetailData) {
            this.activityDetailData = res.map(item => {
              item.month = this.month; // Months are zero-based, so add 1
              item.year = this.year;
              return item;
            });
          }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(propId, this.componentId, this.aisheCode, this.month, this.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.activityDetailData);
          this.activityconditions = [];
          this.activityDetailData?.forEach((item) => {
          const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
            if (item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 || isMonthOrYearDifferent) {
              this.activityconditions.push(item);
            }
          });
        }),
        catchError(err => {
          return of(null);
        })
      ).subscribe();
  }

  getOtherInfData() {
    this.getpmService.getGenOtherInformation(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId).subscribe((res) => {
      
      this.otherInformData = res.data[0]
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
          ele['progressRemarks'] = obj?.progressRemarks,
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
      this.monthList = this.arrMonths1;
      // this.monthList==this.arrMonths
   }
       else if (data.value === '2026') {
       this.monthList = this.arrMonths1;;
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
      this.isPanelOpenWork = false;
      this.isPanelOpenClass = false;
      this.isPanelOpenVocational = false;
      this.isPanelOpenActivity = false;
      this.isPanelOpenOutcome = false;
      this.isPanelOpenAct = false;
}


  tabValueAllTag() {
    forkJoin([
      this.getInfraCons(1),
      this.getRenovated(2),
      this.getEquipment(3),
    ])
    .pipe(
      tap((results) => {
       
        // this.checkValidation();  // Run after all observables have completed
      })
    )
  }

  finalLock() {
    let payload = {
      "lockStatus": true,
      "month": parseInt(this.month),
      "stateCode": this.stateCode,
      "year": parseInt(this.year),
      "componentId": +this.componentId,
      "userId": this.aisheCode,
      "id": this.lockId ? this.lockId : 0,
      "districtCode": this.districtCode
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

  // if (!isAllowed) {
  //   this.notification.showValidationMessage(
  //     "You can only submit data from 16th of that month to 15th of next month only!"
  //   );
  //   return;
  // }

  if (!this.districtCode) {
    this.notification.showValidationMessage("District Code is missing.");
    return;
  }

  const context = {
    districtCode: this.districtCode,
    uniqueDistrictCode: this.uniqueDistrictCode,
    componentId: this.componentId,
    pabStatus: this.sharedService.pabStatus,
    aisheCode: this.aisheCode,
    month: this.month,
    year: this.year,
    V3Elegibal: this.V3Elegibal,
    stateCode: this.stateCode
  };

  /** 🔹 All validations */
  const allValidations: Array<() => any> = [
    () => this.ValidationService.getFiniacialProgressVal(context),
    () => this.ValidationService.getInfraConsval(1, context),
    () => this.ValidationService.getRenovatedVal(2, context),
    () => this.ValidationService.getEquipmentVal(3, context),
    () => this.ValidationService.getWorkshop1Val(5, context),
    () => this.ValidationService.getRemedialDataVal(6, context),
    () => this.ValidationService.getVocationalVal(8, context),
    () => this.ValidationService.getProposalEquityVal(99, context),
    () => this.ValidationService.getOutComeIndicatorVal(11, context),
    () => this.ValidationService.getActivitiesDataVal(12, context)
  ];

  /** 🔹 NMDC-only validations */
  const nmdcValidations: Array<() => any> = [
    () => this.ValidationService.getFiniacialProgressVal(context),
    () => this.ValidationService.getInfraConsval(1, context),
    () => this.ValidationService.getEquipmentVal(3, context),
    () => this.ValidationService.getOutComeIndicatorVal(11, context)
  ];

  /** 🔹 Decide which validations to run */
  const validationsToRun =
    this.componentId == this.sharedService.nmdcComponentId
      ? nmdcValidations
      : allValidations; // Gender + all other components
  from(validationsToRun)
    .pipe(
      concatMap(fn =>
        fn().pipe(
          tap(hasError => {
            if (hasError) {
              throw new Error('STOP');
            }
          })
        )
      )
    )
    .subscribe({
      complete: () => {
        this.finalLock();
      }
    });
}


  lockTag() {
  
    this.tabValueAllTag()
        // if (this.infraconditions?.length !== 0) {
        //   this.notification.showValidationMessage("Please fill-in the details in 'Infra Construction'!");
        // } else if (this.renvoconditions?.length !== 0) {
        //   this.notification.showValidationMessage("Please fill-in the details in 'Infra Renovation'!");
        // } else if (this.equpconditions?.length !== 0) {
        //   this.notification.showValidationMessage("Please fill-in the details in 'Equipment Procured'!");
        // } else {
          // All conditions are met, proceed with the API call
          if (
            (this.infraconditions?.length !== 0) &&
            (this.renvoconditions?.length !== 0) && (this.equpconditions?.length !== 0)
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
        // }
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
  

  
  resetSearch() {
    this.year = '';
    this.month = ''
    this.isView = false;
  }

  getScoreList() {
    this.getService.getScore(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId).subscribe(res => {
      if (res && res.length) {
        this.criteriaList = res;
        this.getUpdateScoreList();
        this.total = this.criteriaList.reduce(
          (sum, item) => sum + Number(item.score),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getCostList() {
    this.getService.getProposalCostRevision(this.uniqueDistrictCode ? this.uniqueDistrictCode : this.districtCode, this.componentId, this.sharedService.pabStatus).subscribe(res => {
      if (res && res.length) {
        this.costList = res;
        this.totalCostMain = this.costList.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getEligible() {
    this.getService.getEligibleList().subscribe(res => {
      this.eligibleList = res;
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


  getCostData() {
    this.getService.getCostData(this.aisheCode, this.componentId).subscribe(res => {
      if (res.status == 200) {
        this.costData = res.data;
        this.infraconstructionData = this.costData.filter(x => x?.proposalActivityId === 1);
        this.infrarenovationData = this.costData.filter(x => x?.proposalActivityId === 2);
        this.equipmentProcData = this.costData.filter(x => x?.proposalActivityId === 3);
        this.workShopData = this.costData.filter(x => x?.proposalActivityId === 5);
        this.remClassData =  this.costData.filter(x => x?.proposalActivityId === 6);
        this.stemCourseData = this.costData.filter(x => x?.proposalActivityId === 7);
        this.vocationalData = this.costData.filter(x => x?.proposalActivityId === 8);
        this.timelineData = this.costData.filter(x => x?.proposalActivityId === 10);
        this.propOutcomeData = this.costData.filter(x => x?.proposalActivityId === 11);
        this.activityDetailsData = this.costData.filter(x => x?.proposalActivityId === 12);
        this.rusaApprovalDetails = this.costData.filter(x => x?.proposalActivityId === 13);
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
    // let file = new Blob([data], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }
  printThisPage() {
    window.print();
  };
  private formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  downloadPdfAisheCode() {
    let payload = {
      stateCode: '',
      componentId: this.componentId,
      type: 'PDF',
      aisheCode: '',
      districtCode: this.districtCode,
    }
    this.getService.downloadByAisheCode(payload).subscribe(res => {
      if (res) {
        this.downloadPdfAisheCode2()
        this.common.viewPdf(res.byteData, res.name)
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
      aisheCode: '',
      districtCode: this.districtCode,
    }
    this.getService.downloadByAisheCode1(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  download(doc, name) {
    if (doc) {
      this.common.viewPdf(doc, name)
    }
  }

  getoverallData() {
    this.getService.getOverallData(this.aisheCode, this.componentId).subscribe(res => {
      if (res.status === 200) {
        this.overallData = res.data[0];
        this.uniqueDistrictCode = res.data[0]?.districtCode;
        if (this.uniqueDistrictCode) {
        this.getEligible();
        this.getScoreList();
        // this.getCostList();
        }
       
        if(this.overallData?.consultantUserId){
          this.overallView = true
        }else{
          this.overallView = false
        }
        if (this.overallData?.otherSourceOfFundGoi == null && this.overallData?.otherSourceOfFundGoiRemark == null) {
          this.otherSourceView = false;
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  remarks() {
    let payload = {
     aisheCode: this.aisheCode,
      componentId: this.componentId,
      consultantStatus:true,
      consultantRemarks: this.consultantRemarks,
      eligibleList:this.eligibleList,
      isProposalEligibleAsGuideline: this.overallData?.isProposalEligibleAsGuideline,
      proposalNotEligibleRemarkId: this.overallData?.proposalNotEligibleRemarkId,
      scoreCorrect: this.overallData?.isScoreCorrect?true:false,
      consultantScore: this.sumConsutant,
      proposalStrength: this.overallData?.proposalStrength,
      proposalWeakness: this.overallData?.proposalWeakness,
    }
    this.common.remarks(payload).subscribe(res => {
      if (res) {
        sessionStorage.removeItem('addRemarks');
        this.getoverallData();
        this.router.navigate([this.routers.genderscrutinylist, this.componentId])

      }
    })
  }
  // remarks() {
  //   let payload = {
  //     aisheCode: this.aisheCode,
  //     componentId: this.componentId,
  //     consultantStatus: this.addRemarks === 'true'?true:false,
  //     consultantComment:this.consultantComment
  //   }
  //   this.common.remarks(payload).subscribe(res => {
  //     if (res) {
  //       sessionStorage.removeItem('addRemarks');
  //       this.router.navigate([this.routers.genderscrutinylist, this.componentId])

  //     }
  //   })
  // }

  getValue() {
    this.criteriaList.forEach(ele => {
      this.UpdateScoreList.forEach(obj => {
        if (ele.criteriaId === obj.baseId) {
          ele['consultantScore'] = obj?.consultantScore,
            ele['consultantValue'] = obj?.consultantValue,
            ele['consultantRemarks'] = obj?.consultantRemarks
          //  ele['showIcon'] = true
        }
        if ((ele.criteriaId == 7)) {
          // ele['showIcon'] = false
        }
      });
    });
    //Compare two array object data with criteriaId and baseId and insert new 3 object value


    // this.criteriaList = this.criteriaList.map((item) => {
    //   const matchingItem = this.UpdateScoreList.find((item1) => item1.baseId === item.criteriaId);
    //   return {...item, ...matchingItem};
    // });
    // this.sumConsutant = this.criteriaList.reduce(
    //   (sum, item) => sum + Number(item.consultantScore == null ? '0' : item.consultantScore),
    //   0
    // );
    this.sumConsutant = this.criteriaList.reduce((sum, item) => sum + item?.consultantScore, 0);
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
      this.router.navigate([this.routers.collegeProjectItemTag, this.sharedService.revPrposal])
  }

  backReport(){
    sessionStorage.setItem('report', 'true')
    sessionStorage.setItem('back','true')
    this.router.navigate([this.routers.Reports])
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

  getTagNames(tags: any[]): string {
  return tags?.map(tag => tag.name).join(', ') || '';
}

 toggleSelectAll(isChecked: boolean) {
    this.isAllSelected = isChecked; // Update global select status
    this.isInfraConstruction.forEach(item => {
 
        item.checked = isChecked;
    });
  }
  toggleSelectAll1(isChecked: boolean) {
    this.isAllSelected1 = isChecked; // Update global select status
    this.infrsRenovationsData.forEach(item => {
 
        item.checked = isChecked;
    });
  }
  toggleSelectAll2(isChecked: boolean) {
    this.isAllSelected2 = isChecked; // Update global select status
    this.equipmentData.forEach(item => {
 
        item.checked = isChecked;
    });
  }

  selectedCheckboxCount(value:any): number {
      if (value === '1'){
        return this.isInfraConstruction?.filter(item => item.checked)?.length || 0;
      }
      else if (value === '2'){
        return this.infrsRenovationsData?.filter(item => item.checked)?.length || 0;
      }
      else if (value === '3'){
        return this.equipmentData?.filter(item => item.checked)?.length || 0;
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

// shouldHighlight(item: any, current: any, previous: any): boolean {
//   return this.isPreviousData(item) && this.isSameValue(current, previous);
// }

getMonthName(monthNumber: number): string {
  return monthNumber ? this.monthList1[monthNumber - 1] : '';
}

getDateData(){
   this.getService.getDate().subscribe(
      (res) => {
        this.getDateTime = res;
      },
      (err) => { }
    );
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

 loadAllMeruData1() {
    forkJoin([
      this.getInfraCons1$(),
      this.getRenovated1$(),
      this.getEquipment1$(),
      this.getWorkshop1$(),
      this.getRemidalClass1$(),
      this.getVocational1$(),
      this.getActivity1$()
    ]).subscribe({
       next: (res) => {
      this.costList = res; // [{schemeName, totalCost}, ...]
      this.totalCostMain = this.costList.reduce((sum, item) => sum + item.totalCost, 0);
    },
    error: (err) => {
      console.error('Error fetching cost data:', err);
    }
  });
  }

    getInfraCons1$() {
  return this.api.getInfraCnstructionRevisionV3(
    this.componentId,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.infraConstructionList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.infraConstructionList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))

      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      // this.proposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
      // this.perUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
      const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      // this.totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      return { schemeName: 'Infrastructure Construction', totalCost };
    })
  );
  }

  getRenovated1$() {
  return this.api.getRenovatedListRevisionV3(
    this.componentId,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.renovatedList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.renovatedList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      // this.proposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
      // this.perUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
      const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      // this.totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      return { schemeName: 'Infrastructure Renovation', totalCost };
    })
  );
  }

   getEquipment1$() {
  return this.api.getEquipmentListRevisionV3(
    this.componentId,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.equipmentList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.equipmentList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Equipment', totalCost };
    })
  );
  }

  getWorkshop1$() {
  return this.api.getWorkshopListRevisionV3(
    this.componentId,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.workshopDataList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.workshopDataList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.workshopDataList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Workshop Programme', totalCost };
    })
  );
  }

  getRemidalClass1$() {
  return this.api.getRemidalClassRevisionV3(
    this.componentId,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.remedialClassesList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.remedialClassesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.remedialClassesList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Remedial Class', totalCost };
    })
  );
  }

  getVocational1$() {
  return this.api.getVocationalRevisionV3(
    this.componentId,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.dataListVocational1 = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.dataListVocational1 = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataListVocational1.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Vocational', totalCost };
    })
  );
  }
  getActivity1$() {
  return this.api.getActivityRevisionV3(
    this.componentId,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.dataActivitiesList1 = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.dataActivitiesList1 = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataActivitiesList1.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Activities', totalCost };
    })
  );
  }



}
