import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { CollegeService } from '../../dpr/strength-college/service/college.service';
import { PmushaService } from '../../ipmr/service/pmusha.service';

@Component({
  selector: 'cfs-view-equity-nmdc-revision-v3',
  templateUrl: './view-equity-nmdc-revision-v3.component.html',
  styleUrls: ['./view-equity-nmdc-revision-v3.component.scss'],
})
export class ViewEquityNmdcRevisionV3Component implements OnInit {


  panelOpenState = true;
  basicDetailsEditView = true;
  infraView = true;
  renvoView = true;
  equioView = true;
  softView = true;
  propView = true;
  timeView = true;
  propOutcomeView = true;
  actDetailView = true;
  otherSourceView = true;
  overallView:boolean;
  public routers: typeof routes = routes;
  basicDetails: any;
  aisheCode: any;
  instituteCategory: any;
  departmentData: any;
  courseData: any;
  data1: any;
  nonTeachingData: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;
  infrastructureData: any;
  proposedArea: any;
  perUnitCost: any;
  totalCost: any;
  infrastructureRenovationsData: any;
  infraRenoproposedArea: any;
  infraRenoperUnitCost: any;
  infraRenototalCost: any;
  equipmentData: any;
  quantity: any;
  equipmentperUnitCost: any;
  equipmenttotalCost: any;
  softComponentsData: any;
  proposedCoursesData: any;
  timelinesData: any;
  financialEstimatesData: any;
  outcomesData: any;
  institute: string;
  otherSourceOfFundsData: any;
  rusaData: any;
  otherInformationData: any;
  tentativeDate: any;
  preCollaboration: any;
  uploadedDocument: any;
  documentOfDpr: string;
  myFiles: any[];
  myFilesName: string;
  uploadedMedia: any[];
  fileSizeExceed: boolean;
  // notification: any;
  changeDoc: boolean;
  otherInfo: any;
  provideDetails: any;
  withExistringLinkage: boolean;
  withScopeForLinkage: boolean;
  withoutLinkage: boolean;
  blob: any;
  rusaDoc: any;
  documentOfDprRusa: any;
  documentFile: any;
  tab: any
  activityDetailData: any;
  componentId: any;
  total: number = 0;
  criteriaList: Array<any> = [];
  meruActivityFacilities: any;
  costList: any;
  totalCostMain: any;
  insType: string;
  RUSADataLists: any;
  indicatorStatus: boolean;
  undertaking: boolean;
  stateCode: any;
  teachingRatio: any;
  arr: any;
  formDataCollegeDetail: any;
  teachingNonTeachingRatioTS: any;
  teachingNonTeachingRatioNTS: any;
  arr1: any;
  studentRatio: any;
  teacherRatio: any;
  quantitySoft: any;
  perUnitCostSoft: any;
  totalCostSoft: any;
  targetNumberSoft: any;
  organogramDoc: any;
  organogramFile: any;
  districtCode: any;
  addRemarks: any
  userTypeId: string;
  consultantRemarks: string;
  UpdateScoreList: Array<any> = [];
  noEmptyStrings: any;
  matchValue: any;
  newArray4: any[];
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
  overallData: any;
  eligibleList:Array<any>=[];
  userName:any;
  consultantUserId: string;
  basicNaacDistrictCode: any;
  studentTeacherRatio: any;
  assignView:boolean=false
  pmushaUniqueCode: number;
  hiddenValue:boolean=true;
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
  getactivitysData: any;
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
  defaultValue:boolean;
  ifNoChoose:boolean;
  componentIdCost: any;
  aisheCodeCost: string;
  id:any;
  myFilesNameRevisedDpr: any;
  newRevisedDprfileId: any;
  newDprfileId: null;
  myFileArrayDPR: any;
  totalCost1: any;
  myFilesNameDPR1: any;
  newRevisedDprfileId1: any;
  newDprfileId1: any;
  dprUploadIsVisible1: boolean;
  isOtherDisabled1: boolean;
  justificationText: any;
  statusId: any;
  revisedProposalV3Cost: any;
  revComponentIdV3: any;
  isV3ForwardedToNpd: boolean;
  finalSubmissionDate: any;
  isV3SubmissionDate: any;
  totalSoftCost: any;
  districtNameNMDC: string;
  consultantComment: string;
  districtName: string;
  workshopDataList: any[];
  remedialClassesList: any[];
  dataListVocational: any[];
  dataActivitiesList: any[];
  NumberWorkshop: any;
  perUnitCostW: any;
  totalCostW: any;
  targetNoParticipant1: any;
  proposedAreaR: any;
  numberofClass: any;
  costPerClassReme: any;
  expectedOutcomeReme: any;
  targetNumberofParticipantsReme: any;
  totalCostReme: any;
  unitVocational: any;
  costPerUnitV: any;
  totalCostV: any;
  expectedOutcomeV: any;
  targetNoParticipantV: any;
  unitActivity: any;
  costPerUnitActivity: any;
  targetNoBeneficiary: any;
  expectedOutcomeActivity: any;
  totalCostActivity: any;
  appId: number;
  constructor(public api: ApiService, public dialog: MatDialog, public common: Common, public sharedService: SharedService, public router: Router,
    public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, public getpmService: PmushaService, private encrypt: EncryptDecrypt, private auth : CollegeService) {
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
    // this.getbasicScoreDetails();
    // this.getScoreList();
    // this.getFiniacialProgress()
    // this.getUpdateScoreList();
    // this.getCostData();
    this.getPropsalStatus()
    this.route.url.subscribe(segments => {
      const lastSegmentIndex = segments.length - 1;
      const idSegment = segments[lastSegmentIndex];
      // Assuming the ID segment is the last segment in your route
      this.pmushaUniqueCode = +idSegment.path;  
      // Now 'collegeId' contains the ID from the routing link
    });
  }

  ChangesCurrentMonth(changeValue: any) {
    let modyMonth = this.arrMonths.filter(m => parseInt(m.monthCode) === parseInt(changeValue));
    this.modiefiedMonth = modyMonth[0].name
  }

  loadAllMeruData() {
      forkJoin([
        this.getInfraCons$(),
        this.getRenovated$(),
        this.getEquipment$(),
        this.getWorkshop1$(),
        this.getRemidalClass1$(),
        this.getVocational1$(),
        this.getActivity1$()
        // this.getSoftCompoenent$()
      ]).subscribe({
         next: (res) => {
        this.costList = res; // [{schemeName, totalCost}, ...]
        this.totalCost = this.costList.reduce((sum, item) => sum + item.totalCost, 0);
      },
      error: (err) => {
        console.error('Error fetching cost data:', err);
      }
    });
    }



    getInfraCons$() {
      return this.api.getInfraConstructionGenderRevision(
        this.districtCode,
        this.componentId,
        this.sharedService.pabStatus
      ).pipe(
        map((res) => {
          this.infraConstructionList = [];
          this.newArray = [];
          this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2);
          this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
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
    
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
          if (this.appId){
            this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.infraConstructionList = this.infraConstructionList.filter(item =>
            // ❌ hide deleted
            !(item?.rsV3?.id === 2) &&
            // ❌ hide existing (old v2 only)
            !((item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
          );
          }
          else {
            this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.infraConstructionList = this.infraConstructionList;
          }
          // this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.infraConstructionList.filter(
            item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
    
    
          this.itemList = res.data.map(ele => ({
            id: ele.id,
            name: ele.description
          }));
    
          this.infraproposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
          this.infraperUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
          const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
          this.infratotalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
          return { schemeName: 'Infrastructure Construction', totalCost };
        })
      );
      }
    
    getRenovated$() {
      return this.api.getRenovatedListRevisionV3(
        this.componentId,
        this.districtCode,
        this.sharedService.pabStatus
      ).pipe(
        map((res) => {
          this.renovatedList = [];
          this.newArray = [];
          this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2);
          this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
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
    
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
          if (this.appId){
            this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.renovatedList = this.renovatedList.filter(item =>
            // ❌ hide deleted
            !(item?.rsV3?.id === 2) &&
            // ❌ hide existing (old v2 only)
            !((item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
          );
          }
          else {
            this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.renovatedList = this.renovatedList;
          }
          // this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    
          this.totalArr = this.renovatedList.filter(
            item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
    
    
          this.itemList = res.data.map(ele => ({
            id: ele.id,
            name: ele.description
          }));
    
          this.infraRenoproposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
          this.infraRenoperUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
          const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
          this.infraRenototalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
          return { schemeName: 'Infrastructure Renovation', totalCost };
        })
      );
      }
    
    getEquipment$() {
      return this.api.getEquipmentListRevisionV3(
        this.componentId,
        this.districtCode,
        this.sharedService.pabStatus
      ).pipe(
        map((res) => {
          this.equipmentList = [];
          this.newArray = [];
          this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2);
          this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
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
    
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
            if (this.appId){
            this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.equipmentList = this.equipmentList.filter(item =>
            // ❌ hide deleted
            !(item?.rsV3?.id === 2) &&
            // ❌ hide existing (old v2 only)
            !((item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
          );
          }
          else {
            this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.equipmentList = this.equipmentList;
          }
          // this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    
          this.totalArr = this.equipmentList.filter(
            item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
    
    
          this.itemList = res.data.map(ele => ({
            id: ele.id,
            name: ele.description
          }));
    
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
        if (this.appId){
            this.workshopDataList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.workshopDataList = this.workshopDataList.filter(item =>
            // ❌ hide deleted
            !(item?.rsV3?.id === 2) &&
            // ❌ hide existing (old v2 only)
            !((item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
          );
        }
        else {
            this.workshopDataList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.workshopDataList = this.workshopDataList;
        }
        // this.workshopDataList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
        this.totalArr = this.workshopDataList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


        this.itemList = res.data.map(ele => ({
          id: ele.id,
          name: ele.description
        }));

       this.NumberWorkshop = this.totalArr.reduce(
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
      this.targetNoParticipant1 = this.totalArr.reduce(
              (sum, item) => sum + Number(item.targetNoParticipant),
              0
       );
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
        if (this.appId){
            this.remedialClassesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.remedialClassesList = this.remedialClassesList.filter(item =>
            // ❌ hide deleted
            !(item?.rsV3?.id === 2) &&
            // ❌ hide existing (old v2 only)
            !((item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
          );
        }
        else {
            this.remedialClassesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.remedialClassesList = this.remedialClassesList;
        }
      // this.remedialClassesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.remedialClassesList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    this.proposedAreaR = this.totalArr.reduce(
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
    this.totalCostReme = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0) 
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
      this.dataListVocational = [];
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
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
        if (this.appId){
            this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.dataListVocational = this.dataListVocational.filter(item =>
            // ❌ hide deleted
            !(item?.rsV3?.id === 2) &&
            // ❌ hide existing (old v2 only)
            !((item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
          );
        }
        else {
            this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.dataListVocational = this.dataListVocational;
        }
      this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataListVocational.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      this.unitVocational = this.totalArr.reduce(
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
      )
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
      this.dataActivitiesList = [];
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
        if (this.appId){
            this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.dataActivitiesList = this.dataActivitiesList.filter(item =>
            // ❌ hide deleted
            !(item?.rsV3?.id === 2) &&
            // ❌ hide existing (old v2 only)
            !((item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
          );
        }
        else {
            this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
            this.dataActivitiesList = this.dataActivitiesList;
        }
      // this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataActivitiesList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));
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
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Activities', totalCost };
    })
  );
  }
    
    getSoftCompoenent$() {
      return this.auth.getSoftCompoenentListRevision(
        this.aisheCode,
        this.componentId,
        this.sharedService.pabStatus
      ).pipe(
        map((res) => {
          this.softComponentList = [];
          this.newArray = [];
          this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2);
          this.updateIdArrFilter = res.data.filter(item => (item.v2 && item.v3) && item.rsV3?.id === 3);
          this.existingRecordFilter = res.data.filter(item => (item.v2 || item.v3) && item.rsV3 == null);
          this.newFilterArr = res.data.filter(item => (item.v2 || item.v3) && item.rsV3?.id === 1);
          this.oldIdArrFilter = res.data.filter(item => (item.v2 && !item.v3) && item.rsV3?.id === 3);
    
          this.updateIdArrFilter.forEach(item1 => {
            this.oldIdArrFilter.forEach(item2 => {
              if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
              }
            });
          });
    
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
          this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    
          this.totalArr = this.softComponentList.filter(
            item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null));
    
    
          this.itemList = res.data.map(ele => ({
            id: ele.id,
            name: ele.description
          }));
    
          this.quantitySoft = this.totalArr.reduce(
             (sum, item) => sum + Number(item.unit),
                0
          );
          this.perUnitCost = this.totalArr.reduce(
             (sum, item) => sum + Number(item.costPerUnit),
                0
          );
          this.totalSoftCost = this.totalArr.reduce(
             (sum, item) => sum + Number(item.totalCost),
                0
          );
          this.targetNumber = this.totalArr.reduce(
             (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
                0
          );
    
          const totalCost = this.totalArr.reduce(
             (sum, item) => sum + Number(item.totalCost),
                0
          );
          return { schemeName: 'Soft Component', totalCost };
        })
      );
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

  // download() {
  //   this.common.viewPdf(this.organogramFile, this.organogramDoc)
  // }

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

  printThisPage() {
    window.print();
  };

   downloadPdfAisheCode() {
    let payload = {
      componentId: this.componentId,
      exportType: 'PDF',
      // aisheCode: this.aisheCode,
      districtCode: (this.id === this.sharedService.genderComponentId || this.id === this.sharedService.nmdcComponentId) ? this.districtCode : '',
      // revisedProposal: true
    }
    this.getService.downloadByAisheCodeReRevisionEquity(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
    
  }

  // downloadPdfAisheCode() {
  //   let payload = {
  //     componentId: this.componentId,
  //     exportType: 'PDF',
  //     aisheCode: this.aisheCode,
  //     districtCode: '',
  //     revisedProposal : true
  //   }
  //   this.getService.downloadByAisheCodeRevision(payload).subscribe(res => {
  //     if (res) {
  //       this.common.viewPdf(res.byteData, res.name)
        
  //     }
  //      }, err => {
  //     console.error('Error fetching page status:', err);
  //   })
  // }

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
        this.districtCode = res?.data?.districtCode
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
  // toggleOverallComment() {
  //   let dialogRef = this.dialog.open(RemarksComponent, {
  //     data: {

  //     }
  //   });
  // }

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

  tabValue(e, prposalId){
      if ((e === 'timeline') && (prposalId === 33)) {
        // this.getRemarkData(prposalId)
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
        this.getActivitiesData(prposalId)
      }
      else if ((e === 'apropOutcomes') && (prposalId === 11)) {
        this.getProposedOutcomeData(prposalId)
      }
      else if (e === 'otherInform') {
        this.getOtherInfData()
        this.getDocumentsVer3()
        // this.getDprDocuemnt()
      }
    
  }

  getClickValue(prposalId){
    if (prposalId === 9) {
      // this.getRemarkData(prposalId)
      this.getProposedCourseData(prposalId)
    }
    else if (prposalId === 12) {
      // this.getRemarkData(prposalId)
      this.getActivitiesData(prposalId)
    }
    else if (prposalId === 11) {
      // this.getRemarkData(prposalId)
      this.getProposedOutcomeData(prposalId)
    }
  }

  getProposedCourseData(propId) {
    this.getService.getProposedCourse(this.aisheCode, this.componentId)
      .pipe(
        tap(res => {
          this.courseData = res || [];
        }),
        switchMap(() => this.getService.getRemarkList(propId, this.componentId, this.aisheCode)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.courseData);
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
    this.getService.getOutComeRevision(this.aisheCode, this.instituteCategory, this.componentId, null, "1")
      .pipe(
        tap(res => {
          this.getpropOutcomeData = res.data || [];
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
        switchMap(() => this.getService.getRemarkList(propId, this.componentId, this.aisheCode)),
        tap(res => {
          this.getremarkData = res.data;
          this.getMergedData(this.activityData);
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
  }

  getOtherInfData() {
    this.getService.getOtherInfoDetailsGender(this.districtCode, this.componentId).subscribe((res) => {
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
  getDprDocuemnt(newDprFileId:any){
    let payload:any={
      districtCode:this.districtCode,
      documentTypeId:13,
      documentId:newDprFileId
    }
    this.getpmService.getDPRDocEquityV3(payload).subscribe((res) => {
      this.otherDPRReviseData = res.data[0]
      if (res.data && res.data.length) {
        this.myFilesNameDpr = this.otherDPRReviseData.name;
        this.documentOfDpr = this.otherDPRReviseData.documentFile;
      }
    }, (err) => { });
  }
  // getDprDocuemnt(){
  //   this.getpmService.getDprDocumentRevision(this.aisheCode, null, this.componentId, 13, '').subscribe((res) => {
  //     this.otherDPRReviseData = res.data[0]
  //     if (res.data && res.data.length) {
        
  //     }
  //   }, (err) => { });
  // }

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
    this.router.navigate([this.routers.pmushalistReRevision, this.sharedService.revPrposalV3])
    }
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
    return {
      'delete-row': item?.rsV3?.id === 2 && (item?.v3 === false),
      'update-row': item?.rsV3?.id === 3 && (item?.v3 === true),
      'old-update-row': item?.rsV3?.id === 3 && (item?.v3 === false),
      'disabled-row1': item?.rsV3?.id === 1,


    };
  }

  getTitle(item: any): string {
    if (item?.rsV3?.id === 3 && item?.v3 === true) {
      return 'Existing Record Updated';
    } else if (item?.rsV3?.id === 1) {
      return 'New Addition';
    }
    else if (item?.rsV3?.id === 2 && item?.v3 === false) {
      return 'Deleted Record';
    }
    else if (item?.rsV3?.id === 3 && item?.v3 === false) {
      return 'Old Existing Record';
    }
    return '';
  }



  getDocuments(){
    let payload={
      // aisheCode:this.aisheCode,
      districtCode:this.districtCode,
      componentId: this.componentId,
      documentTypeId:41,
      documentId:'',
    }

    this.api.getDPRDocDistrict(payload).subscribe((res)=>{
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
      // aisheCode:this.aisheCode,
      districtCode:this.districtCode,
      componentId: this.componentId,
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

     getDocumentsVer3(){
      let payload={
        // aisheCode:this.aisheCode,
        districtCode:this.districtCode,
        componentId: this.componentId,
        documentTypeId:42,
        documentId:'',
      }
      this.api.getDPRDocDistrict(payload).subscribe((res)=>{
        if (res.status === 200 && res.data.length > 0) {
            this.myFilesNameDPR1 = res.data['0']?.name;
            this.newRevisedDprfileId1 = res.data['0']?.id;
            this.newDprfileId1 = res.data['0']?.document_type_Id
            this.dprUploadIsVisible1 = res.data['0']?.name ? true : false
            this.isOtherDisabled1 = this.myFilesNameDPR1 ? true : false
         
        }
        else if (res.status === 200 && res.data.length === 0) {
          this.myFilesNameDPR1 = ''
          this.isOtherDisabled1 = this.myFilesNameDPR1 ? true : false
        }
      }, err => {
  
      })
     
    }

getDPRDocV3(documentId:any, newRevisedDprfileId){
    let payload={
      // aisheCode:this.aisheCode,
      districtCode:this.districtCode,
      componentId: this.componentId,
      documentTypeId:documentId,
      documentId:newRevisedDprfileId,
    }
      this.api.getDPRDocV3(payload).subscribe((res)=>{
        if (res.status === 200) {
          // this.notification.showSuccess()
          // this.getOtherInfo()
            this.myFilesNameDPR1 = res.data['0']?.name;
            this.myFileArrayDPR = res.data['0']?.documentFile;
            this.viewNewDPRPdf(this.myFileArrayDPR, this.myFilesNameDPR1)
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

  getPropsalStatus() {
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe
    }
    this.getService.getfinalSubmitProposal(payload).subscribe(res => {
        if (res.data.length && res.data) {
          const StatusFilter = res.data.filter(e=> (e.isV3Locked && this.componentId == e.componentId));
          this.statusId = StatusFilter[0]?.id;
          this.isV3ForwardedToNpd = StatusFilter[0].isV3ForwardedToNpd ? true : false;
          this.isV3SubmissionDate = StatusFilter[0]?.v3ForwardedToNpdOnString
          this.revisedProposalV3Cost = StatusFilter[0]?.revisedProposalV3Cost;
          this.justificationText = StatusFilter[0]?.v3Justification;
          this.undertaking = StatusFilter[0].isV3ForwardedToNpd;
          this.loadAllMeruData()
        }
      },
      (err) => {}
    );
    //   this.progressMonitoring = res[0]
    // })
  }

  FwdNPD(){
    if (!this.undertaking) {
          this.notification.showValidationMessage('Please select undertaking!');
          return;
        }
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '25%',
                data: {
                  message: 'Are you sure all data are correct?',
                }
      })
          
      dialogRef.afterClosed().subscribe(res =>{
        if(res){
          const payload = [
          {
          id: this.statusId,
          isV3ForwardedToNpd: true,
          revisedProposalV3Cost: this.revisedProposalV3Cost,
          v3Justification: this.justificationText.trim(),
          },
        ];
    
        this.api.postFinalProposelV3(payload, this.common.proposalRevisionApprovedByStateV3).subscribe(
          (res) => {
            if (res.status === 200) {
              this.notification.showSuccessMessage(`${this.aisheCode} has been forwarded successfully!`);
              this.getPropsalStatus();
            }
          },
          (err) => {
            console.error(err);
          }
        );
        }});
  }

    download(doc, name) {
    if (doc) {
      this.common.viewPdf(doc, name)
    }
  }

}

