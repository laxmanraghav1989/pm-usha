import { Component, OnInit } from '@angular/core';
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
import { catchError, tap, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { PmushaService } from 'src/app/pm-usha/ipmr/service/pmusha.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { CachedDataService } from '../../reports/report-services/cached-data.service';

@Component({
  selector: 'cfs-outcome-view-meru',
  templateUrl: './outcome-view-meru.component.html',
  styleUrls: ['./outcome-view-meru.component.scss']
})
export class OutcomeViewMeruComponent implements OnInit {

subscription!: Subscription;
  panelOpenState = true;
  basicDetailsEditView = true;
  public routers: typeof routes = routes;
  basicDetails: any;
  aisheCode: any;
  instituteCategory: any;
  departmentData: any;
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
  undertaking: boolean;
  stateCode: any;
  teachingRatio: any;
  arr: any;
  teacherRatio: any;
  quantitySoft: any;
  organogramDoc: any;
  organogramFile: any;
  districtCode: any;
  addRemarks: any
  userTypeId: string;
  consultantRemarks: string;
  UpdateScoreList: Array<any> = [];
  sumConsutant: any;
  timelineData: Array<any> = [];
  propOutcomeData: Array<any> = [];
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
  month: string = "4";
  modiefiedMonth: any;
  year:any = "2024";
  isView: boolean = false;
  updateProgressData: any[]=[];
  dataTimeLineList: any;
  dataFinancialEstimateList: any;
  otherDPRReviseData: any;
  documentUpload: any;
  myFilesNameDpr: any;
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  totalArr:any = []
  existingRecordFilter:any = []
  item1FilterArray:any = []
  dprChecked:any;
  defaultValue:boolean = true;
  ifNoChoose:boolean;
  tabIndex:any;
  newDprfileId: null;
  myFilesNameRevisedDpr: any;
  newRevisedDprfileId: any;
  myFileArrayDPR: any;
  dataOutComeList: any[];
  outcomeconditions: any[];
  achYear: string;
  achMonth: string;
  achKey: string;
  data: any;
  dataTag: any;
  variables: any;
  activityList: any;
  activityOtherList: any;
  constructor(public api: ApiService, public dialog: MatDialog, public common: Common, public sharedService: SharedService, public router: Router,
    public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, public getpmService: PmushaService, private encrypt: EncryptDecrypt, public cachedData: CachedDataService) {
    this.componentId = +this.route.snapshot.paramMap.get('id');
    this.aisheCode = this.route.snapshot.paramMap.get('aisheCode');
    this.stateCode = sessionStorage.getItem("stateCodeP")
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    if (this.insType === "C") {
      this.instituteCategory = "COLLEGE";
    } else {
      this.instituteCategory = "UNIVERSITY";
    }
    this.tabIndex = this.route.snapshot.paramMap.get('tabIndex');
    this.districtCode = sessionStorage.getItem("districtCode");
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.userName = sessionStorage.getItem('userName');
    this.consultantUserId = sessionStorage.getItem('consultantUserName')
    this.consultantRemarks = sessionStorage.getItem('consultantRemarks')
    this.instituteName = sessionStorage.getItem('insName')
    this.achYear = this.route.snapshot.paramMap.get('year');
    this.achMonth = this.route.snapshot.paramMap.get('month');
    this.achKey = this.route.snapshot.paramMap.get('key');
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
      this.userId = sessionStorage.getItem('userName')
    }
    if(this.userTypeId === sharedService.userTypeList['0'].id  || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
      this.assignView = true
    }
    this.arrMonths = [
      { monthCode: '4', name: 'April', lastDate: '30' },
    ];
    this.arrYears = [
      { year: '2024' },
    ]

  }

  ngOnInit(): void {
    this.getbasicScoreDetails();
    this.getScoreList();
    this.route.url.subscribe(segments => {
      const lastSegmentIndex = segments.length - 1;
      const idSegment = segments[lastSegmentIndex];
      // Assuming the ID segment is the last segment in your route
      this.pmushaUniqueCode = +idSegment.path;  
      // Now 'collegeId' contains the ID from the routing link
    });
  this.subscription = this.cachedData.getData('TagData').subscribe((data) => {
      if (data) {
       this.dataTag = data; // always get latest value
      }
    });
  }

  ngOnDestroy(): void {
    this.dataTag = [];
    if(this.subscription){
      this.subscription.unsubscribe()
    }
}


  ChangesCurrentMonth(changeValue: any) {
    let modyMonth = this.arrMonths.filter(m => parseInt(m.monthCode) === parseInt(changeValue));
    this.modiefiedMonth = modyMonth[0].name
  }

  ChangesYears(data: any) {

    this.monthList = [];
    this.month = '';
    if (data.value === '2024') {

      this.monthList = this.arrMonths;
    }
    else if (data.value === '2023') {
      this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
    }

  }

  find(month, year){
    if (month && year){
      this.isView = true;
    }
    else {
      this.notification.showValidationMessage("Month and Year Field are Mandantory !!!")
      this.isView = false;
    }
  }
  download1(activityId) {
    let payload = {
      meruActivityId: activityId,
      aisheCode: this.aisheCode,
      componentId: this.sharedService.meruComponentId,
      documentType: this.common.meruDoc,
    }
    this.common.downloadPDF(payload)
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

  getRusaListById(id) {
    this.getService.getRusaLisDoc(id).subscribe(res => {
      if (res?.document?.documentFile) {
        this.viewPdf(res?.document?.documentFile, res?.document?.name);

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
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
      month: this.month
    }
    
      this.getService.getFinacialProgres(payload).subscribe(res => {
          this.updateProgressData = res
          
          // this.UpdateScoreList = res.data;
          // this.getValue()
  
      }, err => {
  
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

  printThisPage() {
    window.print();
  };

  handlePageChange(arg0: number) {
    throw new Error('Method not implemented.');
  }

  downloadPdfAisheCode() {
    let payload = {
      componentId: this.componentId,
      exportType: 'PDF',
      aisheCode: this.aisheCode,
      districtCode: '',
      revisedProposal : true
    }
    this.getService.downloadByAisheCodeRevision(payload).subscribe(res => {
      if (res) {
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
        this.studentTeacherRatio = res?.data?.studentTeacherRatio;
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
  isDisplay = true;
  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
  }

  isDisplay2 = true;
  toggleDisplay2() {
    this.isDisplay2 = !this.isDisplay2;
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

  viewEdit(e, Id) {
    this.common.scoreViewinsComment(e, Id).subscribe(res => {
      if (res) {
        this.getClickValue(res)
      }
    })
  }

  tabValue(e, prposalId){
      if ((e === 'infraConstriuction') && (prposalId === 1)) {
        this.getInfraCons(prposalId)
      }
      else if ((e === 'finacialProgress') && (prposalId === 22)) {
        this.getFiniacialProgress()
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
      else if ((e === 'timeline') && (prposalId === 33)) {
        this.getTimelineData(prposalId)
      }
      else if ((e === 'financialEstimate') && (prposalId === 34)) {
        // this.getRemarkData(prposalId)
        // this.getDataFinancialEstimate(prposalId)
      }
      else if ((e === 'propCourse') && (prposalId === 9)) {
        this.getProposedCourseData(prposalId)
      }
      else if ((e === 'actiDetails') && (prposalId === 12)) {
        this.getActivity()
      }
      else if ((e === 'apropOutcomes') && (prposalId === 11)) {
        this.getOutComeIndicator(prposalId)
      }
      else if (e === 'otherInform') {
        this.getOtherInfData()
      }
    
  }


  getClickValue(prposalId){
    this.getRemarkData(prposalId)
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
    this.getpmService.getInfraCnstructionRevision(this.aisheCode, this.instituteCategory, this.componentId, null, "1")
      .pipe(
        tap(res => {
          this.infraConstructionList = []
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.infraConstructionList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          this.updateAggregateValues();
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }
  
  updateAggregateValues() {
    this.infraproposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
    this.infraperUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
    this.infratotalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
  }
  

  getRenovated(propId) {
    this.getpmService.getRenovatedListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, "1")
      .pipe(
        tap(res => {
          this.renovatedList = []
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.renovatedList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          this.updaterenvoValues();
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }
  
  updaterenvoValues() {
    this.infraRenoproposedArea = this.totalArr.reduce(
          (sum, item) => sum + Number(item.proposedArea),
          0
        );
    this.infraRenoperUnitCost = this.totalArr.reduce(
          (sum, item) => sum + Number(item.perUnitCost),
          0
        );
    this.infraRenototalCost = this.totalArr.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
  }


  getEquipment(propId) {
    this.getpmService.getEquipmentListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, "1")
      .pipe(
        tap(res => {
          this.equipmentList = []
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.equipmentList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          this.updateEquiValues();
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  updateEquiValues() {
    this.quantity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    this.equipmentperUnitCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.equipmenttotalCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }

  getSoftCompoenent(propId) {
    this.getpmService.getSoftCompoenentListRevision(this.aisheCode, this.instituteCategory, this.componentId, null, "1")
      .pipe(
        tap(res => {
          this.softComponentList = [];
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.softComponentList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          this.updateSoftValues();
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  updateSoftValues() {
    this.quantitySoft = this.totalArr.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.perUnitCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.totalCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.targetNumber = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
      0
    );
  }

  getProposedCourseData(propId) {
    this.getService.getProposedCourse(this.aisheCode, this.componentId)
      .pipe(
        tap(res => {
          this.courseData = res || [];
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  getTimelineData(propId) {
    this.getService.getDataTimeRevision(this.aisheCode, this.componentId, null, "1")
      .pipe(
        tap(res => {
          this.dataTimeLineList = []
          this.newArray = []
          this.deleteFilterArr = res.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.filter(item => item.activeStatus == true && item.recordStatus == null)
          this.newFilterArr = res.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
          this.oldIdArrFilter = res.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
              this.updateIdArrFilter.forEach(item1 => {
            this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
            });
        });
        this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
        this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  getProposedOutcomeData(propId) {
    if (this.achKey) {
        this.year = this.achYear;
        this.month = this.achMonth;
      }
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
            // if (item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0) {
            //   this.outcomeconditions.push(item);
            // }
             if (item?.targetFor2024 === null || item?.targetFor2024 === undefined || item?.targetFor2024 === '' && item?.targetFor2025 === null || item?.targetFor2025 === undefined || item?.targetFor2025 === '' && item?.targetFor2026 === null || item?.targetFor2026 === undefined || item?.targetFor2026 === '') {
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
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
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
          this.documentUpload = this.otherInformData.documentOfDpr;
        }
        if(this.otherInformData.newDprFileId){
          this.getDprDocuemnt(this.otherInformData.newDprFileId)
        }
        if(this.otherInformData.newDprFileId == null){
          this.getDocuments()
        }
        if (this.otherInformData.revisedProposalDprUndertaking){
          this.defaultValue = false;
          this.ifNoChoose = true;
          this.dprChecked = true
        }
   
      }
    }, (err) => { });
  }


  getDprDocuemnt(newDprFileId:any){
    let payload:any={
      aisheCode:this.aisheCode,
      documentTypeId:13,
      documentId:newDprFileId
    }
    this.getpmService.getDPRDoc(payload).subscribe((res) => {
      this.otherDPRReviseData = res.data[0]
      if (res.data && res.data.length) {
        this.myFilesNameDpr = this.otherDPRReviseData.name;
        this.documentOfDpr = this.otherDPRReviseData.documentFile;
      }
    }, (err) => { });
  }

  getActivity() {
    this.masterService.getActivityList().subscribe(
      (res) => {
        this.variables = res;
        this.activityList = this.variables.slice();
        this.getActivityData();
      },
      (err) => { }
    );
  }

  getActivityData() {
      this.api.getActivityDetails(this.aisheCode, this.componentId).subscribe(
        (res) => {
          if (res && res.length) {
            this.activityData = res;
            this.activityData.forEach(ele => {
              if (ele.proposalActivityName) {
                ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
              }
              if (ele.itemName) {
                ele.itemName = Object.values(ele.itemName).toString()
              }

            })

            for (let i = 0; i < this.activityList.length; i++) {
              for (let j = 0; j < this.activityData.length; j++) {
                if (
                  this.activityList[i].id === this.activityData[j].activityId
                ) {
                  this.activityList.splice(i, 1);
                }
                else {
                  if (this.activityList[i].meruActivity) {
                  this.activityOtherList = this.activityList
                  }
                }
              }
            }
          } else {
            this.activityData = []
          }
        },
        (err) => { }
      );

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
            ele['targetFor2026'] = obj?.targetFor2026
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
      this.router.navigate([this.routers.ReportsOutcome])
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

   downloadPdfAisheCodeExcel() {
    let payload = {
      year: this.achYear,
      month: this.achMonth,
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

  getClass(item: any): any {
    return {
      // 'disabled-row': item?.recordStatus?.id === 3 && item?.activeStatus === true,
      // 'disabled-row1': item?.recordStatus?.id === 1,
      'delete-row': item?.recordStatus?.id === 2 && (item?.activeStatus === false),
      'update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === true),
      'old-update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === false),
      'disabled-row1': item?.recordStatus?.id === 1,
    };
  }


  getTitle(item: any): string {
    if (item?.recordStatus?.id === 3 && item?.activeStatus === true) {
      return 'Existing Record Updated';
    } else if (item?.recordStatus?.id === 1) {
      return 'New Addition';
    }
    else if (item?.recordStatus?.id === 2 && (item?.activeStatus === false)) {
      return 'Deleted Record';
    }
    else if (item?.recordStatus?.id === 3 && (item?.activeStatus === false)) {
      return 'Old Existing Record';
    }
    return '';
  }


  getDocuments(){
    let payload={
      aisheCode:this.aisheCode,
      // districtCode:this.districtCode,
      componentId: this.sharedService.collegeComponentId,
      documentTypeId:41,
      documentId:'',
    }

    this.api.getDPRDoc(payload).subscribe((res)=>{
      if (res.status === 200 && res.data.length > 0) {
          this.myFilesNameRevisedDpr = res.data['0']?.name;
          this.newRevisedDprfileId = res.data['0']?.id;
         
       
      }
    }, err => {

    })
   
  }




  getDPRDoc(documentId:any, newRevisedDprfileId){
    let Id = documentId == null ? newRevisedDprfileId : documentId 

    let payload={
      aisheCode:this.aisheCode,
      // districtCode:this.districtCode,
      componentId: this.sharedService.collegeComponentId,
      documentTypeId:this.newDprfileId == null ? 41 : 13,
      documentId:Id,
    }
 
      this.api.getDPRDoc(payload).subscribe((res)=>{
        if (res.status === 200) {
   
            this.myFilesNameRevisedDpr = res.data['0']?.name;
            this.myFileArrayDPR = res.data['0']?.documentFile;
            this.viewNewDPRPdf(this.myFileArrayDPR, this.myFilesNameRevisedDpr)
            if (res.data['0']?.documentFile) {
              this.downloadPdf(res.data['0'].documentFile);
  
            
          }
        }
      }, err => {
  
      })
    

  }

 viewNewDPRPdf(data: any, fileName: string) {
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


