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

@Component({
  selector: 'cfs-view-gender-equity',
  templateUrl: './view-gender-equity.component.html',
  styleUrls: ['./view-gender-equity.component.scss']
})
export class ViewGenderEquityComponent implements OnInit {
  public routers: typeof routes = routes;
  districtCode: string;
  institute: string;
  instituteCategory: string;
  genderEquityList: any;
  tempList: any[];
  basicDetails: any;
  equityGerData: any = {};
  infrsConstructionData: any;
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
  pabActionIdValue:any;
  updateConsultantStatus:any;
  myFilesNameDPR1: any;
  myFileArrayDPR: any;
  blob: Blob;
  newRevisedDprfileId1: any;
  newDprfileId1: any;
  dprUploadIsVisible1: boolean;
  isOtherDisabled1: boolean;
  constructor(public api: ApiService, public common: Common, public sharedService: SharedService, public router: Router,
    public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, private pmUshaService : PmushaService) {
    this.componentId = this.sharedService.genderComponentId
    this.districtCode = sessionStorage.getItem("districtCodeGender")
    this.aisheCode = sessionStorage.getItem('aisheCode')
    this.institute = sessionStorage.getItem("instituteCategory")
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.consultantComment = sessionStorage.getItem('consultantComment')
    this.consultantUserId = sessionStorage.getItem('consultantUserIdNmdc')
    this.consultantRemarks = sessionStorage.getItem('consultantRemarks')
    this.userName = sessionStorage.getItem('userName');
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id  || this.userTypeId === sharedService.userTypeList['7'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
      this.userId = sessionStorage.getItem('userName')
    }
    if(this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
      this.assignView = true
    }
    // if (this.institute === "C") {
    //   this.instituteCategory = "COLLEGE"
    // } else {
    //   this.instituteCategory = "UNIVERSITY"
    // }

  }
  ngOnInit(): void {
    this.getEligible();
    // this.getGenderEquityData();
    this.getEquityList()
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


  tabValue(evnt:any){
    if(evnt == 'Scoring'){
      this.getScoreList();
    }
    else if(evnt == "ProposalCost"){
      this.getCostList();

    }
    else if(evnt == 'HigherEducation'){
      this.getGenderInclusion()
    }
    else if(evnt == 'InfraConstruction'){
      this.getInfraCnstruction()
    }
    else if(evnt == 'InfraRenovation'){
      this.getGenRenovatedList()
    }
    else if(evnt == 'EquipmentProcured'){
      this.getGenEquipmentList()
    }
    else if(evnt == 'WorkshopProgramme'){
      this.getWorkshopGenderEquity()
    }
    else if(evnt == 'RemedialClass'){
      this.getRemedialClasssGenderEquity()
    }
    else if(evnt == 'STEMCourse'){
      this.getStemCourseDataGenderEquity()
    }
    else if(evnt == 'Vocational'){
      this.getVocationalDataGenderEquity()
    }
    else if(evnt == 'ProposedActivities'){
      this.getActivitiesGenderEquity()
    }
    else if(evnt == 'Timeline'){
      this.getDataTimeGenderEquity()
    }
    else if(evnt == 'FinancialEstimates'){
      this.getFinancialEstimateGenderEquity()
    }
    else if(evnt == 'ProposedOutcomes'){
      this.getOutComeGenderEquity()
    }
    else if(evnt == 'Activity'){
      this.getActivityDetails()
    }
    else if(evnt == 'OtherSourcesOfFund'){
      this.getOtherSourceListGen()
    }
    else if(evnt == 'OtherInformation'){
      this.getGenOtherInformation()
    }
  }




  getInfraCnstruction(){
    this.getService.getInfraCnstruction(this.districtCode, this.sharedService.genderComponentId).subscribe(res => {
      this.infrsConstructionData = res.data;
      this.proposedArea = this.infrsConstructionData.reduce(
        (sum, item) => sum + Number(item.proposedArea), 0);
      this.perUnitCost = this.infrsConstructionData.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.totalCost = this.infrsConstructionData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
    })
  }

  getGenRenovatedList(){
      this.pmUshaService.getGenRenovatedList(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{

        this.infrsRenovationsData = res.data;
        this.infraRenoproposedArea = this.infrsRenovationsData.reduce(
          (sum, item) => sum + Number(item.proposedArea),
          0
        );
        this.infraRenoperUnitCost = this.infrsRenovationsData.reduce(
          (sum, item) => sum + Number(item.perUnitCost),
          0
        );
        this.infraRenototalCost = this.infrsRenovationsData.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
  
      })
  }


  getGenEquipmentList(){
    this.pmUshaService.getGenEquipmentList(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.equipmentData = res.data;
      this.quantity = this.equipmentData.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
      );
      this.equipmentperUnitCost = this.equipmentData.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.equipmenttotalCost = this.equipmentData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
    })

  }

  getWorkshopGenderEquity(){
    this.api.getWorkshopGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
    
      this.workshopsData = res.data;

      this.proposedAreaW = this.workshopsData.reduce(
        (sum, item) => sum + Number(item.noWorkshop),
        0
      );
      this.perUnitCostW = this.workshopsData.reduce(
        (sum, item) => sum + Number(item.costPerWorkshop),
        0
      );
      this.totalCostW = this.workshopsData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
      this.expectedOutcome = this.workshopsData.reduce(
        (sum, item) => sum + Number(item.expectedOutcome),
        0
      );
      this.targetNoParticipant1 = this.workshopsData.reduce(
        (sum, item) => sum + Number(item.targetNoParticipant),
        0
      );
      

    })
  }

  getRemedialClasssGenderEquity(){
    this.api.getRemedialClasssGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.remedialClassesData = res.data;
      this.proposedAreaClassReme = this.remedialClassesData.reduce(
        (sum, item) => sum + Number(item.noWorkshop),
        0
      );
      this.numberofClass = this.remedialClassesData.reduce(
        (sum, item) => sum + Number(item.noOfClasses),
        0
      );
      this.costPerClassReme = this.remedialClassesData.reduce(
        (sum, item) => sum + Number(item.costPerClass),
        0
      );
      this.expectedOutcomeReme = this.remedialClassesData.reduce(
        (sum, item) => sum + Number(item.expectedOutcome),
        0
      );
      this.targetNumberofParticipantsReme = this.remedialClassesData.reduce(
        (sum, item) => sum + Number(item.targetNoParticipant),
        0
      );
      this.totalCostReme = this.remedialClassesData.reduce((sum, item) => sum + Number(item.totalCost), 0);

    })
  }

  getStemCourseDataGenderEquity(){
    this.api.getStemCourseDataGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.stemCoursesData = res.data
      
    })
  }
  

  getVocationalDataGenderEquity(){
    this.api.getVocationalDataGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.dataListVocational = res.data;

      this.unitV = this.dataListVocational.reduce(
        (sum, item) => sum + Number(item.unit),
        0
      );
      this.costPerUnitV = this.dataListVocational.reduce(
        (sum, item) => sum + Number(item.costPerUnit),
        0
      );
      this.totalCostV = this.dataListVocational.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
      this.expectedOutcomeV = this.dataListVocational.reduce(
        (sum, item) => sum + Number(item.expectedOutcome),
        0
      );
      this.targetNoParticipantV = this.dataListVocational.reduce(
        (sum, item) => sum + Number(item.targetNoParticipant),
        0
      );
    })
  }


  getActivitiesGenderEquity(){
    this.api.getActivitiesGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.dataActivitiesList = res.data;
      this.unitActivity = this.dataActivitiesList.reduce(
        (sum, item) => sum + Number(item.unit),
        0
      );
      this.costPerUnitActivity = this.dataActivitiesList.reduce(
        (sum, item) => sum + Number(item.costPerUnit),
        0
      );
      this.targetNoBeneficiaryActivity = this.dataActivitiesList.reduce(
        (sum, item) => sum + Number(item.targetNoBeneficiary),
        0
      );
      this.expectedOutcomeActivity = this.dataActivitiesList.reduce(
        (sum, item) => sum + Number(item.expectedOutcome),
        0
      );
      this.totalCostActivity = this.dataActivitiesList.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
    })
  }     

  
  getDataTimeGenderEquity(){
    this.api.getDataTimeGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      
      this.dataTimeLineList = res;
    })
  }

  getFinancialEstimateGenderEquity(){
    this.api.getFinancialEstimateGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.dataFinancialEstimateList = res;
    })
  }


  getOutComeGenderEquity(){
    this.api.getOutComeGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.outcomesData = res.data;

    })
  }

  getActivityDetails(){
    this.pmUshaService.getGenActivityDetails(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.activityDetailData = res;

      this.activityDetailData.forEach(ele => {
        if (ele.proposalActivityName) {
          ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
        }
        if (ele.itemName) {
          ele.itemName = Object.values(ele.itemName).toString()
        }
      });
    })
  }


  getGenOtherInformation(){
    this.pmUshaService.getGenOtherInformation(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.otherInformationData = res.data;
      this.tentativeDate = this.otherInformationData[0]?.tenatativeDateCompletionOfProject;
      this.provideDetails = this.otherInformationData[0]?.provideDetails;


      if (res.data && res.data.length) {

        if (res.data['0'].documentOfDpr) {
          this.myFilesName = res.data['0'].dprFileName;
          this.documentOfDpr = res.data['0'].documentOfDpr;

        }
      }
    })
  }


  getOtherSourceListGen(){
    this.getService.getOtherSourceListGen(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.otherSourceOfFundsData = res.data;
    })
  }


  getGenderInclusion(){
    this.api.getGenderInclusion(this.districtCode, this.sharedService.genderComponentId).subscribe(res =>{
      this.equityGerData = res.data
    })
  }


  getEquityList(){
    this.api.getEquityList(this.districtCode, this.sharedService.genderComponentId).subscribe((res) => {
      this.basicDetails = res.data
    })
  }



  
  // getGenderEquityData() {
  //   this.getService.getGenderEquityData(this.districtCode, this.sharedService.genderComponentId).subscribe((res) => {
      
      // this.basicDetails = res.basicDetails;

      // this.equityGerData = res.equityGerData;
      // this.infrsConstructionData = res.infrastructureConstructions;
      // this.proposedArea = this.infrsConstructionData.reduce(
      //   (sum, item) => sum + Number(item.proposedArea), 0);
      // this.perUnitCost = this.infrsConstructionData.reduce(
      //   (sum, item) => sum + Number(item.perUnitCost),
      //   0
      // );
      // this.totalCost = this.infrsConstructionData.reduce(
      //   (sum, item) => sum + Number(item.totalCost),
      //   0
      // );

      // this.infrsRenovationsData = res.infrastructureRenovations;
      // this.infraRenoproposedArea = this.infrsRenovationsData.reduce(
      //   (sum, item) => sum + Number(item.proposedArea),
      //   0
      // );
      // this.infraRenoperUnitCost = this.infrsRenovationsData.reduce(
      //   (sum, item) => sum + Number(item.perUnitCost),
      //   0
      // );
      // this.infraRenototalCost = this.infrsRenovationsData.reduce(
      //   (sum, item) => sum + Number(item.totalCost),
      //   0
      // );

      // this.equipmentData = res.equipment;
      // this.quantity = this.equipmentData.reduce(
      //   (sum, item) => sum + Number(item.quantity),
      //   0
      // );
      // this.equipmentperUnitCost = this.equipmentData.reduce(
      //   (sum, item) => sum + Number(item.perUnitCost),
      //   0
      // );
      // this.equipmenttotalCost = this.equipmentData.reduce(
      //   (sum, item) => sum + Number(item.totalCost),
      //   0
      // );


      // this.remedialClassesData = res.remedialClasses;
      // this.proposedAreaClassReme = this.remedialClassesData.reduce(
      //   (sum, item) => sum + Number(item.noWorkshop),
      //   0
      // );
      // this.numberofClass = this.remedialClassesData.reduce(
      //   (sum, item) => sum + Number(item.noOfClasses),
      //   0
      // );
      // this.costPerClassReme = this.remedialClassesData.reduce(
      //   (sum, item) => sum + Number(item.costPerClass),
      //   0
      // );
      // this.expectedOutcomeReme = this.remedialClassesData.reduce(
      //   (sum, item) => sum + Number(item.expectedOutcome),
      //   0
      // );
      // this.targetNumberofParticipantsReme = this.remedialClassesData.reduce(
      //   (sum, item) => sum + Number(item.targetNoParticipant),
      //   0
      // );
      // this.totalCostReme = this.remedialClassesData.reduce((sum, item) => sum + Number(item.totalCost), 0);

      // this.stemCoursesData = res.proposedStemCourses;
      
      // this.dataListVocational = res.proposedActivityDetailForImprovingSkills;

      // this.unitV = this.dataListVocational.reduce(
      //   (sum, item) => sum + Number(item.unit),
      //   0
      // );
      // this.costPerUnitV = this.dataListVocational.reduce(
      //   (sum, item) => sum + Number(item.costPerUnit),
      //   0
      // );
      // this.totalCostV = this.dataListVocational.reduce(
      //   (sum, item) => sum + Number(item.totalCost),
      //   0
      // );
      // this.expectedOutcomeV = this.dataListVocational.reduce(
      //   (sum, item) => sum + Number(item.expectedOutcome),
      //   0
      // );
      // this.targetNoParticipantV = this.dataListVocational.reduce(
      //   (sum, item) => sum + Number(item.targetNoParticipant),
      //   0
      // );

      // this.dataActivitiesList = res.otherActivityDetails;
      // this.unitActivity = this.dataActivitiesList.reduce(
      //   (sum, item) => sum + Number(item.unit),
      //   0
      // );
      // this.costPerUnitActivity = this.dataActivitiesList.reduce(
      //   (sum, item) => sum + Number(item.costPerUnit),
      //   0
      // );
      // this.targetNoBeneficiaryActivity = this.dataActivitiesList.reduce(
      //   (sum, item) => sum + Number(item.targetNoBeneficiary),
      //   0
      // );
      // this.expectedOutcomeActivity = this.dataActivitiesList.reduce(
      //   (sum, item) => sum + Number(item.expectedOutcome),
      //   0
      // );
      // this.totalCostActivity = this.dataActivitiesList.reduce(
      //   (sum, item) => sum + Number(item.totalCost),
      //   0
      // );

      //  this.dataTimeLineList = res.proposalTimelines;
      // this.dataFinancialEstimateList = res.proposalFinancialEstimates;
      // this.activityDetailData = res.activityDetail;

      // this.activityDetailData.forEach(ele => {
      //   if (ele.proposalActivityName) {
      //     ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
      //   }
      //   if (ele.itemName) {
      //     ele.itemName = Object.values(ele.itemName).toString()
      //   }
      // });

      // this.outcomesData = res.proposedOutcomes;

      // this.otherSourceOfFundsData = res.otherSourceOfFunds;

      // this.otherInformationData = res.otherInformation;
      // this.tentativeDate = this.otherInformationData[0]?.tenatativeDateCompletionOfProject;
      // this.provideDetails = this.otherInformationData[0]?.provideDetails;


      // if (res.otherInformation && res.otherInformation.length) {

      //   if (res.otherInformation['0'].documentOfDpr) {
      //     this.myFilesName = res.otherInformation['0'].dprFileName;
      //     this.documentOfDpr = res.otherInformation['0'].documentOfDpr;

      //   }
      // }
  //   });


  // }

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
        this.pabActionIdValue = this.overallData?.pabActionId
        this.updateConsultantStatus = this.overallData?.consultantStatus
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
      consultantComment: this.overallData?.consultantComment,
      pabActionId: this.overallData?.pabActionId,
      updteConsultantStatus: this.overallData?.consultantStatus
    }
    this.common.remarks(payload).subscribe(res => {
      if (res) {
        sessionStorage.removeItem('addRemarks');
        this.getoverallData();
        // this.router.navigate([this.routers.genderscrutinylist, this.componentId])

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
  viewEdit(e, Id) {
    this.common.scoreViewComment(e, Id).subscribe(res => {
      if (res) {
        // this.getGenderEquityData();
        this.getScoreList();
        this.getCostList();
        this.getCostData();
        this.getoverallData();
      }
    })
  }

  back(){
    sessionStorage.setItem('back','true')
    if (this.pmushaUniqueCode == 10){
      this.router.navigate([this.routers.genderpmushalist,this.sharedService.genderComponentId])
    }
    else {
      this.router.navigate([this.routers.genderscrutinylist,this.sharedService.genderComponentId])
    }
    
  }

  
}
