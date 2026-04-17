import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { PmushaService } from '../../ipmr/service/pmusha.service';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-view-equity-revision',
  templateUrl: './view-equity-revision.component.html',
  styleUrls: ['./view-equity-revision.component.scss']
})
export class ViewEquityRevisionComponent implements OnInit {

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
  arrYears: any = [];
  monthList: any[];
  month: string = "4";
  modiefiedMonth: any;
  year:any = "2024";
  updateProgressData: any[]=[];
  otherInformData: any;
  isView: boolean = true;
  insType: string;
  instituteCategory: any;
  newArray: any[];
  deleteFilterArr: any;
  updateIdArrFilter: any;
  item1FilterArray: any[];
  existingRecordFilter: any;
  newFilterArr: any;
  oldIdArrFilter: any;
  totalArr: any;
  itemList: any[];
  targetNoBeneficiary: any;
  defaultValue: boolean;
  ifNoChoose: boolean;
  dprChecked: boolean;
  myFilesNameDPR: any;
  myFileArrayDPR: any;
  myFilesNameDpr: any;
  newDprFileName: any;
  variables: any;
  activityList: any;
  activityData: any;
  activityOtherList: any;
  id: any;
  myFilesNameRevisedDpr: any;
  newRevisedDprfileId: any;
  newDprfileId: null;
  districtName: string;
  totalCost1: any;
  appId: number;
  constructor(public api: ApiService, public common: Common, public sharedService: SharedService, public router: Router,
    public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, public getpmService: PmushaService, private encrypt: EncryptDecrypt) {
    this.componentId = this.sharedService.genderComponentId
    // this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    // if (this.insType === "C") {
    //   this.instituteCategory = "COLLEGE";
    // } else {
    //   this.instituteCategory = "UNIVERSITY";
    // }

    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.appId = parseInt(this.route.snapshot.paramMap.get('AppId'));
    this.districtCode = sessionStorage.getItem("districtCode")
    this.aisheCode = sessionStorage.getItem('aisheCode')
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.consultantComment = sessionStorage.getItem('consultantComment')
    this.consultantUserId = sessionStorage.getItem('consultantUserIdNmdc')
    this.consultantRemarks = sessionStorage.getItem('consultantRemarks')
    this.districtName = sessionStorage.getItem('districtNameNMDC');
    
    this.userName = sessionStorage.getItem('userName');
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id  || this.userTypeId === sharedService.userTypeList['7'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
      this.userId = sessionStorage.getItem('userName')
    }
    if(this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
      this.assignView = true
    }
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
      this.districtCode = sessionStorage.getItem('districtCodeGender');
    }
    this.arrMonths = [
      // { monthCode: '1', name: 'January', lastDate: '31' },
      // { monthCode: '2', name: 'February', lastDate: '28' },
      // { monthCode: '3', name: 'March', lastDate: '31' },
      { monthCode: '4', name: 'April', lastDate: '30' },
      // { monthCode: '5', name: 'May', lastDate: '31' },
      // { monthCode: '6', name: 'June', lastDate: '30' },
      // { monthCode: '7', name: 'July', lastDate: '31' },
      // { monthCode: '8', name: 'August', lastDate: '31' },
      // { monthCode: '9', name: 'September', lastDate: '30' },
      // { monthCode: '10', name: 'October', lastDate: '31' },
      // { monthCode: '11', name: 'November', lastDate: '30' },
      // { monthCode: '12', name: 'December', lastDate: '31' },
    ];
    this.arrYears = [
      // { year: '2023' },
      { year: '2024' },
    ]

  }
  ngOnInit(): void {
    this.getEligible();
    this.getScoreList();
    this.getCostList();
    // this.getCostData();
    this.getoverallData();
    this.route.url.subscribe(segments => {
      const lastSegmentIndex = segments.length - 1;
      const idSegment = segments[lastSegmentIndex];
      // Assuming the ID segment is the last segment in your route
      this.pmushaUniqueCode = +idSegment.path;
      
      // Now 'collegeId' contains the ID from the routing link
    });
  }

  viewEdit(e, Id) {
    this.common.scoreViewinsComment(e, Id).subscribe(res => {
      
      if (res) {
        this.getClickValue(res)
      }
    })
  }

  tabValue(e, prposalId){
    if (e === 'propsalCost') {
      this.getCostListRevision()
    }
    if ((e === 'infraConstriuction') && (prposalId === 1)) {
      this.getInfraCons()
    }
    else if ((e === 'finacialProgress') && (prposalId === 22)) {
      this.getFiniacialProgress()
    }
    else if ((e === 'infraRenovation') && (prposalId === 2)) {
      this.getRenovated()
    }
    else if ((e === 'equipmentProc') && (prposalId === 3)) {
      this.getEquipment()
    }
    else if (e === 'workshop') {
      this.getWorkshop1()
    }
    else if (e === 'remedialClass') {
      this.getRemedialData()
    }
    else if (e === 'propActivity') {
      this.getProposalEquity()
    }
    else if (e === 'vocational') {
      this.getVocational()
    }
    else if (e === 'anyOtherActivities') {
      this.getOtherActivitiesData()
    }
    else if ((e === 'timeline') && (prposalId === 33)) {
      // this.getRemarkData(prposalId)
      this.getTimelineData(prposalId)
    }
    else if ((e === 'estimates') && (prposalId === 36)) {
      // this.getRemarkData(prposalId)
      this.getDataFinancialEstimate()
    }
    else if ((e === 'actiDetails') && (prposalId === 12)) {
      this.getActivity()
    }
    else if ((e === 'apropOutcomes') && (prposalId === 11)) {
      this.getProposedOutcomeData(prposalId)
    }
    else if (e === 'otherInform') {
      this.getOtherInfData()
    }
  }

  getCostListRevision() {
    this.getService.getProposalCostRevision( this.districtCode , this.id, this.sharedService.revAddId).subscribe(res => {
      if (res && res.length) {
        this.costList = res;

        this.totalCost1 = this.costList.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getClickValue(prposalId){
    this.getRemarkData(prposalId)
    if (prposalId === 1) {
      // this.getRemarkData(prposalId)
      this.getInfraCons()
    }
    else if (prposalId === 22) {
      this.getFiniacialProgress()
    }
    else if (prposalId === 2) {
      // this.getRemarkData(prposalId)
      this.getRenovated()
    }
    else if (prposalId === 3) {
      // this.getRemarkData(prposalId)
      this.getEquipment()
    }
    // else if (prposalId === 4) {
    //   this.getRemarkData(prposalId)
    //   this.getSoftCompoenent(prposalId)
    // }
    // else if (prposalId === 9) {
    //   this.getRemarkData(prposalId)
    //   this.getProposedCourseData(prposalId)
    // }
    else if (prposalId === 12) {
      // this.getRemarkData(prposalId)
      this.getActivitiesData(prposalId)
    }
    else if (prposalId === 11) {
      // this.getRemarkData(prposalId)
      this.getProposedOutcomeData(prposalId)
    }
  }

  getInfraCons() {
      this.api.getInfraConstructionGenderRevision(this.districtCode, this.sharedService.genderComponentId, "1").subscribe(
        (res) => {
          this.processInfraResponse(res)
        },
        (err) => { }
      );
  }

  processInfraResponse(res) {
    this.isInfraConstruction = [];
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
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.isInfraConstruction = this.isInfraConstruction.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
            );
          }
          else {
              this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.isInfraConstruction = this.isInfraConstruction;
          }
    // this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.isInfraConstruction.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
    
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.description
      });
    });
    this.proposedArea = this.totalArr.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );
    this.perUnitCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCost = this.totalArr.reduce(
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
      month: this.month
    }
    
      this.getService.getFinacialProgres(payload).subscribe(res => {
          this.updateProgressData = res
      }, err => {
  
      })
  }

  getRenovated() {
      this.api.getinfrastructureRenovationGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processRenovResponse(res.data)
        },
        (err) => { }
      );
  }

  processRenovResponse(res) {
    this.infrsRenovationsData = [];
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
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.infrsRenovationsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.infrsRenovationsData = this.infrsRenovationsData.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
            );
          }
          else {
              this.infrsRenovationsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.infrsRenovationsData = this.infrsRenovationsData;
          }
    // this.infrsRenovationsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.infrsRenovationsData.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
    this.itemList = [];
    res.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.description
      });
    });
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
  getEquipment() {
      this.api.getEquipmentGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processEquoResponse(res)
        },
        (err) => { }
      );
  }

  processEquoResponse(res) {
    this.equipmentData = [];
      this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.equipmentData = this.equipmentData.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
            );
          }
          else {
              this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.equipmentData = this.equipmentData;
          }
    // this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.equipmentData.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.name
      });
    });
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


  getWorkshop1() {
      this.api.getWorkshopGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processWorkshopResponse(res)
        },
        (err) => { }
      );
  }

  processWorkshopResponse(res) {
    this.workshopsData = [];
    this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.workshopsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.workshopsData = this.workshopsData.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
            );
          }
          else {
              this.workshopsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.workshopsData = this.workshopsData;
          }
    // this.workshopsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.workshopsData.filter(item => item.activeStatus == true)
    this.itemList = []
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.theme

      })
    })

    this.proposedAreaW = this.totalArr.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.perUnitCostW = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerWorkshop),
      0
    );
    this.totalCostW = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.expectedOutcome = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNoParticipant1 = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
  }

  getRemedialData() {
      this.api.getRemedialClasssGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processremedialResponse(res)
        },
        (err) => { }
      );
  }


  processremedialResponse(res) {
    this.remedialClassesData = [];
    this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.remedialClassesData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.remedialClassesData = this.remedialClassesData.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
            );
          }
          else {
              this.remedialClassesData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.remedialClassesData = this.remedialClassesData;
          }
    // this.remedialClassesData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.remedialClassesData.filter(item => item.activeStatus == true)
    this.itemList = [];
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.detail
      })
    })
    this.proposedAreaClassReme = this.totalArr.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.numberofClass = this.totalArr.reduce(
      (sum, item) => sum + Number(item.noOfClasses),
      0
    );
    this.costPerClassReme = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerClass),
      0
    );
    this.expectedOutcomeReme = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNumberofParticipantsReme = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
    this.totalCostReme = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0); 
  }

  getDataFinancialEstimate() {
    this.api.getFinancialEstimateGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe((res) => {
      this.dataFinancialEstimateList = res;
        if (this.appId){
              this.dataFinancialEstimateList = this.dataFinancialEstimateList.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3)
            );
          }
          else {
              this.dataFinancialEstimateList = this.dataFinancialEstimateList;
          }
    })
  }

  getVocational() {
      this.api.getVocationalDataGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processVocationalResponse(res)
        },
        (err) => { }
      );
  }

  processVocationalResponse(res) {
    this.dataListVocational = [];
    this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataListVocational = this.dataListVocational.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
            );
          }
          else {
              this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataListVocational = this.dataListVocational;
          }
    // this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.dataListVocational.filter(item => item.activeStatus == true)
    this.itemList = [];
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.detail
      })
    })


    this.unitV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.costPerUnitV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.totalCostV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.expectedOutcomeV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNoParticipantV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
  }

  getOtherActivitiesData() {
      this.api.getActivitiesGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processActivityResponse(res)
        },
        (err) => { }
      );

  }

  processActivityResponse(res) {
    this.dataActivitiesList = [];
    this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataActivitiesList = this.dataActivitiesList.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
            );
          }
          else {
              this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataActivitiesList = this.dataActivitiesList;
          }
    // this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.dataActivitiesList.filter(item => item.activeStatus == true)
    this.itemList = []
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.activity
      })
    })

    this.unitActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.costPerUnitActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.targetNoBeneficiary = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoBeneficiary),
      0
    );
    this.expectedOutcomeActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.totalCostActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }
  getTimelineData(propId) {
    this.api.getDataTimeGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId)
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
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
          if (this.appId){
              this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataTimeLineList = this.dataTimeLineList.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3)
            );
          }
          else {
              this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataTimeLineList = this.dataTimeLineList;
          }
          // this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
        }),
        // switchMap(() => this.getService.getRemarkList(propId, this.componentId, this.aisheCode)),
        // tap(res => {
        //   this.getremarkData = res.data;
        //   this.getMergedData(this.courseData);
        // }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }



  getProposalEquity() {
    this.getpmService.getGenPrposelActivity(this.districtCode, this.componentId).subscribe(
      (res) => {
        this.dataActivitiesList = []
        this.dataActivitiesList = res.data;
        // if (this.equipmentData){
        //   this.getRemarkData(propId)
        //   setTimeout(() => {
        //     this.getMergedData(this.equipmentData);
        //   }, 100);
        // }
        // unit
        //costPerUnit
        // totalCost
        //targetNoBeneficiary
        this.unitActivity = this.dataActivitiesList.reduce(
          (sum, item) => sum + Number(item.unit),
          0
        );
        this.costPerUnitActivity = this.dataActivitiesList.reduce(
          (sum, item) => sum + Number(item.costPerUnit),
          0
        );
        this.totalCostActivity = this.dataActivitiesList.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
        this.targetNoBeneficiaryActivity = this.dataActivitiesList.reduce(
          (sum, item) => sum + Number(item.targetNoBeneficiary),
          0
        );
      },
      (err) => { }
    );
  }

  getProposedOutcomeData(propId) {
    this.api.getOutComeGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId)
      .pipe(
        tap(res => {
          this.outcomesData = res.data || [];
        }),
        switchMap(() => this.getService.getRemarkList(propId, this.componentId, this.aisheCode)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.outcomesData);
        }),
        catchError(err => {
          return of(null);
        })
      ).subscribe();
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
      this.getpmService.getGenActivityDetails(this.districtCode, this.componentId).subscribe(
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
                  if (this.activityList[i].equityActivity) {
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

  getActivitiesData(propId) {
    this.getpmService.getGenActivityDetails(this.districtCode, this.componentId)
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
        }),
        switchMap(() => this.getService.getRemarkList(propId, this.componentId, this.aisheCode)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.activityDetailData);
        }),
        catchError(err => {
          return of(null);
        })
      ).subscribe();
  }


  // getActivitiesData(propId) {
  //   this.getpmService.getGenActivityDetails(this.districtCode, this.componentId).subscribe((res) => {
      
  //     this.activityDetailData = []
  //     this.activityDetailData = res
  //     if (this.activityDetailData){
  //       this.getRemarkData(propId)
  //       setTimeout(() => {
  //         this.getMergedData(this.activityDetailData);
  //       }, 100);
  //     }
  //     this.activityDetailData.forEach(ele => {
  //       if (ele.proposalActivityName) {
  //         ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
  //       }
  //       if (ele.itemName) {
  //         ele.itemName = Object.values(ele.itemName).toString()
  //       }
  //     });

  //   }, (err) => { });
  // }

  getOtherInfData() {
    this.getpmService.getGenOtherInformation(this.districtCode, this.componentId).subscribe((res) => {
      
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
        if(this.otherInformData.newDprFileId){
          this.getDprDocuemnt(this.otherInformData.newDprFileId)
          this.newDprFileName = this.otherInformData.newDprFileName;
        }
        if(this.otherInformData.newDprFileId == null){
          this.getDocuments()
        }
        if (this.otherInformData.revisedProposalDprUndertaking){
          this.ifNoChoose = true;
          this.dprChecked = true
        }
       if(res.data['0'].revisedProposalDprUndertaking == true && res.data['0'].newDprFileName == null){
          this.defaultValue = false
        }
        else if(res.data['0'].newDprFileName != null){
      
          this.defaultValue = true
        }
   
      }
    }, (err) => { });
  }

  getDprDocuemnt(documentId:any){
    let payload={
      // aisheCode:this.aisheCode,
      // districtCode:this.districtCode,
      componentId: this.sharedService.genderComponentId,
      documentTypeId:13,
      documentId:documentId,
    }
    if(documentId!=null){
      this.api.getDPRDocEquity(payload).subscribe((res)=>{
        if (res.status === 200) {
          // this.notification.showSuccess()
          // this.getOtherInfo()
   
            this.myFilesNameDPR = res.data['0']?.name;
            this.myFileArrayDPR = res.data['0']?.documentFile;
          //   if (res.data['0']?.documentFile) {
          //     this.downloadPdf(res.data['0'].documentFile);
  
            
          // }
        }
      }, err => {
  
      })
    }

  }

  getMergedData(dataValue){
    
    
    dataValue.forEach(ele => {
      this.getremarkData.forEach(obj => {
        if (ele.id === obj.itemId) {
          ele['idValue'] = obj?.id,
          ele['projectStatusId'] = obj?.projectStatusId,
            ele['physicalProgress'] = obj?.physicalProgress,
            ele['progressRemarks'] = obj?.progressRemarks
        }
    });
  })
  }

  getRemarkData(propId) {
    this.getService.getRemarkList(propId, this.componentId, this.aisheCode).subscribe(
      (res) => {
        this.getremarkData = res.data
        
        // this.equipmentList = []
        // this.equipmentList = res.data;
      },
      (err) => { }
    );
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
  
  getScoreList() {
    this.getService.getScore(this.districtCode, this.componentId).subscribe(res => {
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
    this.getService.getProposalCost(this.districtCode, this.componentId).subscribe(res => {
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
      componentId: this.componentId,
      exportType: 'PDF',
      aisheCode: this.aisheCode,
      districtCode: this.districtCode,
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
    if (this.appId){
      this.router.navigate([this.routers.pmushaFinalApprove, this.sharedService.finApproveLIst])
    }
    else {
    this.router.navigate([this.routers.pmushalistRevision, this.sharedService.revPrposal])
    }
  }

  getClass(item: any): any {
    return {
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
  downloadPdf(documentFile: any) {
    throw new Error('Method not implemented.');
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
