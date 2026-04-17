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

@Component({
  selector: 'cfs-view-nmdc',
  templateUrl: './view-nmdc.component.html',
  styleUrls: ['./view-nmdc.component.scss']
})
export class ViewNmdcComponent implements OnInit {
  public routers: typeof routes = routes;
  panelOpenState = true;
  basicDetails: any;
  districtCode: any;
  RUSADataLists: any;
  tab: Window;
  instituteTypeList: any;
  totalC: any;
  totalS: any;
  totalU: any;
  infraConstructionList: any;
  proposedArea: any;
  perUnitCost: any;
  totalCost: any;
  equipmentList: any;
  quantity: any;
  perUnitCostE: any;
  totalCostE: any;
  departmentData: any;
  courseData: any;
  teachingData: any;
  nonTeachingData: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;
  dataOutComeList: any;
  criteriaList: any;
  total: any;
  componentId: any;
  anticipatedList: any;
  withExistringLinkage: boolean;
  otherInfo: string;
  withScopeForLinkage: boolean;
  withoutLinkage: boolean;
  otherInfopp: string;
  physical: any[];
  financial: any[];
  physicalEstimatesList: any;
  financialEstimatesList: any;
  otherSourceOfFunList: any;
  timelinesList: any;
  academicAdminTimelinesList: any;
  activityDetailsList: any;
  landownershipcertificateFileName: any;
  landownershipcertificate: any;
  locationloflandFileName: any;
  locationlofland: any;
  certificateoflocationFileName: any;
  certificateoflocation: any;
  mapofthelanddurlysignedFileName: any;
  mapofthelanddurlysigned: any;
  activityNegativeRemrk: Array<any> = [];
  costList: any;
  totalCostMain: any;
  indicatorStatus: boolean;
  undertaking: boolean;
  stateCode: any;
  arr1: any;
  studentRatio: any;
  teacherRatio: any;
  myFiles5: any[];
  myFilesName5: string;
  uploadedMedia: any[];
  // notification: any;
  changeDoc: boolean;
  fileSizeExceed: boolean;
  organogramFile: any;
  organogramDoc: string;
  blob: Blob;
  aisheCode: string;
  addRemarks: any
  userTypeId: string;
  consultantComment: string;
  userId: string;
  consultantUserId: any;
  costData: any;
  basicNaacScoreDetails:Array<any> = [];
  propOutcomeData: Array<any> = [];
  activityDetailsData: Array<any> = [];
  overallData:any;
  infraconstructionData: Array<any> = [];
  timelineData: Array<any> = [];
  equipmentProcData: Array<any> = [];
  rusaApprovalDetails: Array<any> = [];
  UpdateScoreList: Array<any> = [];
  userName:any;
  eligibleList:Array<any>=[];
  institute: string;
  assignView: boolean=false;
  sumConsutant: any;
  consultantRemarks: string;
  overallView: boolean;
  otherSourceView= true;
  hiddenValue:boolean=true;
  pmushaUniqueCode: number;
  pabActionIdValue:any;
  updateConsultantStatus:any;
  constructor(public api: ApiService, public common: Common, public sharedService: SharedService, public router: Router,
    public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService,  private route: ActivatedRoute) {
    this.componentId = this.sharedService.nmdcComponentId
    this.districtCode = sessionStorage.getItem("districtCodeGender");
    this.institute = sessionStorage.getItem("instituteCategory");
    this.stateCode = sessionStorage.getItem("stateCodeP")
    this.aisheCode = sessionStorage.getItem('aisheCode')
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.userName = sessionStorage.getItem('userName');
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.consultantComment = sessionStorage.getItem('consultantComment');
    this.consultantUserId = sessionStorage.getItem('consultantUserIdNmdc')
    this.consultantRemarks = sessionStorage.getItem('consultantRemarks')
    this.userId = sessionStorage.getItem('userName')
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id  ||this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id) {

      this.userId = sessionStorage.getItem('userName')
    } 
    if(this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
      this.assignView = true
    }
    // if (this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['6'].id) {
    //   this.consultantUserId = sessionStorage.getItem('consultantUserName')
    // }
  }

  ngOnInit(): void {
    this.getEligible();
    // this.nmdcData();
    this.getBasicDetails();
    // this.getbasicScoreDetails()
    this.getScoreList();
    this.getCostList();
    this.getRUSAData();
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

  nmdcData() {
    this.getService.getNMDCData(this.districtCode).subscribe((res) => {
      this.basicDetails = res.basicDetails[0];
      this.arr1 = this.basicDetails?.studentTeacherRatio?.split(":");
      this.studentRatio = this.arr1?.[0];
      this.teacherRatio = this.arr1?.[1];

      //this.RUSADataLists = res.earlierApprovalUnderRusa; 
      this.instituteTypeList = res.districtHeiDetails;

      this.totalC = this.instituteTypeList.reduce(
        (sum, item) => sum + Number(item.noCollege),
        0
      );
      this.totalU = this.instituteTypeList.reduce(
        (sum, item) => sum + Number(item.noUniversity),
        0
      );
      this.totalS = this.instituteTypeList.reduce(
        (sum, item) => sum + Number(item.noStandaloneInstitution),
        0
      );
      this.infraConstructionList = res.infrastructureConstructions;
      this.proposedArea = this.infraConstructionList.reduce(
        (sum, item) => sum + Number(item.proposedArea),
        0
      );
      this.perUnitCost = this.infraConstructionList.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.totalCost = this.infraConstructionList.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );

      this.equipmentList = res.equipments;
      this.quantity = this.equipmentList.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
      );
      this.perUnitCostE = this.equipmentList.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.totalCostE = this.equipmentList.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
      this.departmentData = res.departments;
      this.courseData = res.proposedCourses;
      this.teachingData = res.proposedTeachingStaffDetails[0];

      this.nonTeachingData = res.nonTeachingStaffDetails;
      this.data1 = this.nonTeachingData[0]?.adminDeptSanctionedPost;
      this.data2 = this.nonTeachingData[0]?.adminDeptPostYetToBeSanctioned;
      this.data3 = this.nonTeachingData[0]?.technicalDeptSanctionedPost;
      this.data4 = this.nonTeachingData[0]?.technicalDeptPostYetToBeSanctioned;
      this.data5 = this.nonTeachingData[0]?.othersDeptSanctionedPost;
      this.data6 = this.nonTeachingData[0]?.othersDeptPostYetToBeSanctioned;

      this.dataOutComeList = res.proposedOutcomes;
      this.anticipatedList = res.anticipatedEnrollments;

      if (res.basicDetails && res.basicDetails.length) {
        if (res.basicDetails['0'].isWithExistingLinkageLocalIndustry) {
          this.withExistringLinkage = true
          this.otherInfo = 'With existing Linkages';
        } if (res.basicDetails['0'].isWithScopeForLinkageLocalIndustry) {
          this.withScopeForLinkage = true
          this.otherInfo = 'With scope for linkage';
        } if (res.basicDetails['0'].isWithoutLinkageLocalIndustry) {
          this.withoutLinkage = true
          this.otherInfo = 'Without Linkages';
        }
      }

      if (res.basicDetails && res.basicDetails.length) {
        if (res.basicDetails['0'].isWithExistingLinkagePpp) {
          this.withExistringLinkage = true
          this.otherInfopp = 'With existing Linkages';
        } if (res.basicDetails['0'].isWithScopeForLinkagePpp) {
          this.withScopeForLinkage = true
          this.otherInfopp = 'With scope for linkage';
        } if (res.basicDetails['0'].isWithoutLinkagePpp) {
          this.withoutLinkage = true
          this.otherInfopp = 'Without Linkages';
        }
      }

      this.physicalEstimatesList = res.proposalPhysicalEstimates;
      this.financialEstimatesList = res.proposalFinancialEstimates;
      this.otherSourceOfFunList = res.otherSourceOfFund.otherSourceOfFund;
      this.timelinesList = res.proposalTimelines;
      this.academicAdminTimelinesList = res.academicAdminTimelines;
      this.activityDetailsList = res.activityDetails;
      this.activityDetailsList.forEach(ele => {
        if (ele.proposalActivityName) {
          ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
        }
        if (ele.itemName) {
          ele.itemName = Object.values(ele.itemName).toString()
        }
      });


      if (res.basicDetails['0']?.landownershipcertificate) {
        this.landownershipcertificateFileName = res.basicDetails['0'].landownershipcertificateFileName;
        this.landownershipcertificate = res.basicDetails['0'].landownershipcertificate;
      }
      if (res.basicDetails['0']?.locationlofland) {
        this.locationloflandFileName = res.basicDetails['0'].locationloflandFileName;
        this.locationlofland = res.basicDetails['0'].locationlofland;
      }
      if (res.basicDetails['0']?.certificateoflocation) {
        this.certificateoflocationFileName = res.basicDetails['0'].certificateoflocationFileName;
        this.certificateoflocation = res.basicDetails['0'].certificateoflocation;
      }
      if (res.basicDetails['0']?.mapofthelanddurlysigned) {
        this.mapofthelanddurlysignedFileName = res.basicDetails['0'].mapofthelanddurlysignedFileName;
        this.mapofthelanddurlysigned = res.basicDetails['0'].mapofthelanddurlysigned;
      }
      if (res.basicDetails['0']?.isOrganogramUploaded) {
        this.getDocument()
      }
    });
  }

  getRUSAData() {
    this.getService.getRusaLegacyData('', this.stateCode, this.districtCode, '',).subscribe((res) => {
      this.RUSADataLists = res;
      if (this.RUSADataLists && this.RUSADataLists.length) {
        this.indicatorStatus = true
        this.undertaking = true
      } else {
        this.indicatorStatus = false
        this.undertaking = false
      }
      // for (let index = 0; index < this.RUSADataLists.length; index++) {
      //   this.formDataApprovalRUSA.get('proposalScoreBaseIndicator')?.setValue(this.RUSADataLists[index].proposalScoreBaseIndicator)
      //   if (this.RUSADataLists[index].proposalScoreBaseIndicator === 35 || this.RUSADataLists[index].proposalScoreBaseIndicator === 63) {
      //     this.RUSADataLists.splice(index, 1);
      //     index++
      //   }
      // }

    }, (error) => { });
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

  getScoreList() {
    this.getService.getScore(this.districtCode, this.sharedService.nmdcComponentId).subscribe(res => {
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

  getCostData() {
    this.getService.getCostData(this.aisheCode, this.componentId).subscribe(res => {
      if (res.status == 200) {
        this.costData = res.data;
        this.infraconstructionData = this.costData.filter(x => x?.proposalActivityId === 1);
        this.equipmentProcData = this.costData.filter(x => x?.proposalActivityId === 3);
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

  // getbasicScoreDetails() {
  //   this.getService.getNmdcBasic(this.districtCode, this.componentId).subscribe((res) => {
  //       this.basicNaacScoreDetails = res[0];

  //   }, err => {

  //   })
  // }

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

  getDocument() {
    let payload = {
      districtCode: this.districtCode,
      componentId: this.sharedService.nmdcComponentId,
      documentType: this.common.organogram,
    }
    this.common.downloadPDFProposalNMDC(payload).then((result: any) => {
      this.organogramDoc = result.name
      this.organogramFile = result.file
    })
  }
  download() {
    this.common.viewPdf(this.organogramFile, this.organogramDoc)
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
        // this.router.navigate([this.routers.nmdcscrutinylist,this.sharedService.nmdcComponentId])

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
        this.getScoreList();
        this.getUpdateScoreList();
        // this.getinstituteData();
        this.getCostData();
        this.nmdcData();
        this.getoverallData();
        // this.getbasicScoreDetails();
      }
    })
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

  back(){
    sessionStorage.setItem('back','true')
    if (this.pmushaUniqueCode == 10) {
      this.router.navigate([this.routers.nmdcpmushalist,this.sharedService.nmdcComponentId])
    }
    else {
      this.router.navigate([this.routers.nmdcscrutinylist,this.sharedService.nmdcComponentId])
    }
    
  }

  tabValue(e){
    if (e === 'buildConstriuction') {
      this.getInfraConstruction()
    }
     else if (e == 'equipmentProc'){
      this.getequpData()
    }
    else if (e == 'departmentData'){
      this.getDepartment()
    }
    else if (e == 'courseData'){
      this.getCourse()
    }
    else if (e == 'TeachingStaff'){
      this.getTeaching()
    }
    else if (e == 'nonTeachingStaff'){
      this.getNonTeaching()
    }
    else if (e == 'apropOutcomes'){
      this.getPrposedOutcome()
    }
    else if (e == 'anticipatedEnroll'){
      this.getanticiptedEnroll()
    }
    else if (e == 'financialEstimate'){
      this.getDataFinancialEstimate()
    }
    else if (e == 'otherSourceFund'){
      this.otherSourceOfFunds()
    }
    else if (e == 'timeline'){
      this.getTimeline()
    }
    else if (e == 'actiDetails'){
      this.getActivityDetails()
    }
    else if (e == 'instituteList'){
      this.getInstituteList()
    }
    else if (e == 'academicTimeline'){
      this.getAcademicTimeline()
    }
    else if (e == 'physicalEstimate'){
      this.getDataPhysicalEstimate()
    }
    // else if (e == 'meruFacilities'){
    //   this.getMeruFacility()
    // }
    // else if (e == 'infraConstriuction'){
    //   this.getInfraConstruction()
    // }
    // else if (e == 'infraRenovation'){
    //   this.getInfraRenovation()
    // }
   
    // else if (e == 'softComp'){
    //   this.getSoftData()
    // }
    // else if (e == 'propCourse') {
    //   this.getProposedCourse()
    // }



   

    // else if (e == 'otherInform'){
    //   this.getOtherInfData()
    // }
  }

  getBasicDetails(){
    this.getService.getNmdcBasic(this.districtCode, this.componentId).subscribe((res) => {
      this.basicDetails = res[0];
      this.arr1 = this.basicDetails?.studentTeacherRatio?.split(":");
      this.studentRatio = this.arr1?.[0];
      this.teacherRatio = this.arr1?.[1];
      if (res && res.length) {
        if (this.basicDetails.isWithExistingLinkageLocalIndustry) {
          this.withExistringLinkage = true
          this.otherInfo = 'With existing Linkages';
        } if (this.basicDetails.isWithScopeForLinkageLocalIndustry) {
          this.withScopeForLinkage = true
          this.otherInfo = 'With scope for linkage';
        } if (this.basicDetails.isWithoutLinkageLocalIndustry) {
          this.withoutLinkage = true
          this.otherInfo = 'Without Linkages';
        }
      }

      if (res && res.length) {
        if (this.basicDetails.isWithExistingLinkagePpp) {
          this.withExistringLinkage = true
          this.otherInfopp = 'With existing Linkages';
        } if (this.basicDetails.isWithScopeForLinkagePpp) {
          this.withScopeForLinkage = true
          this.otherInfopp = 'With scope for linkage';
        } if (this.basicDetails.isWithoutLinkagePpp) {
          this.withoutLinkage = true
          this.otherInfopp = 'Without Linkages';
        }
      }

    })
  }

  getInfraConstruction(){
    this.getService.getinfrasConstNMDC(this.districtCode).subscribe((res) => {
      this.infraConstructionList = res.data;
      this.proposedArea = this.infraConstructionList.reduce(
        (sum, item) => sum + Number(item.proposedArea),
        0
      );
      this.perUnitCost = this.infraConstructionList.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.totalCost = this.infraConstructionList.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
  });
  }

  getequpData(){
    this.getService.getEquipmentNMDC(this.districtCode).subscribe((res) => {
      this.equipmentList = res.data;
      this.quantity = this.equipmentList.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
      );
      this.perUnitCostE = this.equipmentList.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.totalCostE = this.equipmentList.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
  });
  }

  getDepartment(){
    this.getService.getDepartmentData(this.componentId, this.districtCode).subscribe((res) => {
      this.departmentData = res.data;
  });
  }

  getCourse(){
    this.getService.getProposedCourseNMDC(this.districtCode, this.componentId).subscribe((res) => {
      this.courseData = res;
  });
  }
// getTeacher

  getTeaching(){
    this.getService.getTeacher(this.districtCode, this.componentId).subscribe((res) => {
        this.teachingData = res[0];
  });
  }
  getNonTeaching(){
    this.getService.getNonTeacherStaffNMDC(this.districtCode).subscribe((res) => {
        this.nonTeachingData = res.data;
        this.data1 = this.nonTeachingData[0]?.adminDeptSanctionedPost;
        this.data2 = this.nonTeachingData[0]?.adminDeptPostYetToBeSanctioned;
        this.data3 = this.nonTeachingData[0]?.technicalDeptSanctionedPost;
        this.data4 = this.nonTeachingData[0]?.technicalDeptPostYetToBeSanctioned;
        this.data5 = this.nonTeachingData[0]?.othersDeptSanctionedPost;
        this.data6 = this.nonTeachingData[0]?.othersDeptPostYetToBeSanctioned;
  });
  }

  getPrposedOutcome() {
    this.getService.getOutComeNMDC(this.districtCode, this.componentId).subscribe((res) => {
      this.dataOutComeList = res.data;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getanticiptedEnroll() {
    this.getService.getAnticipatedList(this.districtCode, this.componentId).subscribe((res) => {
      this.anticipatedList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getDataFinancialEstimate() {
    this.api.getFinancialEstimateGenderEquity(this.districtCode, this.componentId).subscribe((res) => {
      this.financialEstimatesList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  otherSourceOfFunds() {
    this.getService.getOtherSourceListGen(this.districtCode, this.componentId).subscribe((res) => {
      this.otherSourceOfFunList = res.otherSourceOfFund;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getTimeline(){
    this.getService.getDataTimeNMDC(this.districtCode, this.componentId).subscribe((res) => {
      this.timelinesList = res;
  });
  }

  getActivityDetails() {
    this.api.getActivityDetailsForGender(this.districtCode, this.componentId).subscribe((res) => {
      this.activityDetailsList = res;
      this.activityDetailsList.forEach(ele => {
        if (ele.proposalActivityName) {
          ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
        }
        if (ele.itemName) {
          ele.itemName = Object.values(ele.itemName).toString()
        }
      });
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstituteList(){
    this.getService.getHEIInstituteList(this.districtCode).subscribe((res) => {
      this.instituteTypeList = res;

      this.totalC = this.instituteTypeList.reduce(
        (sum, item) => sum + Number(item.noCollege),
        0
      );
      this.totalU = this.instituteTypeList.reduce(
        (sum, item) => sum + Number(item.noUniversity),
        0
      );
      this.totalS = this.instituteTypeList.reduce(
        (sum, item) => sum + Number(item.noStandaloneInstitution),
        0
      );
  });
  }

  getAcademicTimeline(){
    this.getService.acadeicAdminTime(this.districtCode).subscribe((res) => {
      this.academicAdminTimelinesList = res;
  });
  }

  getDataPhysicalEstimate() {
    this.api.getFinancialEstimateNMDC(this.districtCode, this.componentId).subscribe((res) => {
      this.physicalEstimatesList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

}
