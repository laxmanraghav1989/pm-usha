import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { RemarksComponent } from '../../../dialog/remarks/remarks.component';
import { PostService } from 'src/app/service/post.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PmushaService } from '../../ipmr/service/pmusha.service';

@Component({
  selector: 'cfs-view-college',
  templateUrl: './view-college.component.html',
  styleUrls: ['./view-college.component.scss']
})
export class ViewCollegeComponent implements OnInit {
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
  pabActionIdValue:any;
  updateConsultantStatus:any;
  constructor(public api: ApiService, public dialog: MatDialog, public common: Common, public sharedService: SharedService, public router: Router,
    public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute,  public getpmService: PmushaService) {
    this.componentId = parseInt(sessionStorage.getItem("componentIdV"));
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.stateCode = sessionStorage.getItem("stateCodeP")
    this.institute = sessionStorage.getItem("instituteCategory");
    this.districtCode = sessionStorage.getItem("districtCode");
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.userName = sessionStorage.getItem('userName');
    this.consultantUserId = sessionStorage.getItem('consultantUserName')
    this.consultantRemarks = sessionStorage.getItem('consultantRemarks')
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
      this.userId = sessionStorage.getItem('userName')
    }
    if(this.userTypeId === sharedService.userTypeList['0'].id  || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
      this.assignView = true
    }
    
    if (this.institute === "C") {
      this.instituteCategory = "COLLEGE"
    } else {
      this.instituteCategory = "UNIVERSITY"
    }

  }

  ngOnInit(): void {
    this.getEligible();
    this.getbasicScoreDetails();
    // this.getinstituteData();
    this.getScoreList();
    // this.getCostList();
    this.getRUSAData();
    // this.getUpdateScoreList();
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
  getEligible() {
    this.getService.getEligibleList().subscribe(res => {
      this.eligibleList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getinstituteData() {
    this.getService.getCollegeData(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      this.basicDetails = res.basicDetail;
      //this.teachingRatio = res.basicDetail.teachingNonTeachingRatio.split(' ',0);

      this.arr = res.basicDetail.teachingNonTeachingRatio?.split(":");
      this.teachingNonTeachingRatioTS = this.arr?.[0];
      this.teachingNonTeachingRatioNTS = this.arr?.[1];

      this.arr1 = res.basicDetail.studentTeacherRatio?.split(":");
      this.studentRatio = this.arr1?.[0];
      this.teacherRatio = this.arr1?.[1];



      this.departmentData = res.departments;
      this.courseData = res.courses;
      this.activityDetailData = res.activityDetail;
      this.activityDetailData.forEach(ele => {
        if (ele.proposalActivityName) {
          ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
        }
        if (ele.itemName) {
          ele.itemName = Object.values(ele.itemName).toString()
        }
      });

      this.nonTeachingData = res.nonTeachingStaffDetails;
      this.data1 = this.nonTeachingData[0]?.adminDeptSanctionedPost;
      this.data2 = this.nonTeachingData[0]?.adminDeptPostYetToBeSanctioned;
      this.data3 = this.nonTeachingData[0]?.technicalDeptSanctionedPost;
      this.data4 = this.nonTeachingData[0]?.technicalDeptPostYetToBeSanctioned;
      this.data5 = this.nonTeachingData[0]?.othersDeptSanctionedPost;
      this.data6 = this.nonTeachingData[0]?.othersDeptPostYetToBeSanctioned;

      this.infrastructureData = res.infrastructureConstructions;
      this.proposedArea = this.infrastructureData.reduce(
        (sum, item) => sum + Number(item.proposedArea), 0);
      this.perUnitCost = this.infrastructureData.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.totalCost = this.infrastructureData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );

      this.infrastructureRenovationsData = res.infrastructureRenovations;
      this.infraRenoproposedArea = this.infrastructureRenovationsData.reduce(
        (sum, item) => sum + Number(item.proposedArea),
        0
      );
      this.infraRenoperUnitCost = this.infrastructureRenovationsData.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.infraRenototalCost = this.infrastructureRenovationsData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );

      this.equipmentData = res.equipment;
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

      this.softComponentsData = res.softComponents;

      this.quantitySoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.unit),
        0
      );
      this.perUnitCostSoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.costPerUnit),
        0
      );
      this.totalCostSoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
      this.targetNumberSoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
        0
      );
      this.proposedCoursesData = res.proposedCourses;
      this.timelinesData = res.proposalTimelines;
      this.financialEstimatesData = res.proposalFinancialEstimates;
      this.outcomesData = res.proposedOutcomes;

      this.otherSourceOfFundsData = res.otherSourceOfFunds;
      // this.rusaData = res.earlierApprovalUnderRusa;
      this.meruActivityFacilities = res.meruAvailableFacilityUniversity;
      this.otherInformationData = res.otherInformation;
      this.tentativeDate = this.otherInformationData[0].tenatativeDateCompletionOfProject;
      this.provideDetails = this.otherInformationData[0].provideDetails;



      if (res.otherInformation && res.otherInformation.length) {
        if (res.otherInformation['0'].withExistringLinkage) {
          this.withExistringLinkage = true
          this.otherInfo = 'With existing Linkages';
        } if (res.otherInformation['0'].withScopeForLinkage) {
          this.withScopeForLinkage = true
          this.otherInfo = 'With scope for linkage';
        } if (res.otherInformation['0'].withoutLinkage) {
          this.withoutLinkage = true
          this.otherInfo = 'Without Linkages';
        }
        if (res.otherInformation['0'].documentOfDpr) {
          this.myFilesName = res.otherInformation['0'].dprFileName;
          this.documentOfDpr = res.otherInformation['0'].documentOfDpr;

        }

        if (res.basicDetail.isOrganogramUploaded) {
          this.getDocument()
        }
      }

    });
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
  getRUSAData() {
    this.getService.getRusaLegacyData(this.aisheCode, this.stateCode, '', '',).subscribe((res) => {
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
  getScoreList() {
    this.getService.getScore(this.aisheCode, this.componentId).subscribe(res => {
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
  getCostList() {
    this.getService.getProposalCost(this.aisheCode, this.componentId).subscribe(res => {
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
    // let file = new Blob([data], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }

  printThisPage() {
    window.print();
  };

  handlePageChange(arg0: number) {
    throw new Error('Method not implemented.');
  }

  downloadPdfAisheCode() {
    let payload = {
      stateCode: '',
      componentId: this.componentId,
      type: 'PDF',
      aisheCode: this.aisheCode,
      districtCode: '',
    }
    this.getService.downloadByAisheCode(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)
        this.downloadPdfAisheCode2();
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
        this.getoverallData()
      }
    })
  }

  getoverallData() {
    this.getService.getOverallData(this.aisheCode, this.componentId).subscribe(res => {
      if (res.status === 200) {
        this.overallData = res.data[0];
        this.pabActionIdValue = this.overallData?.pabActionId
        this.updateConsultantStatus = this.overallData?.consultantStatus
        if(this.overallData.consultantUserId){
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

  getbasicScoreDetails() {
    this.getService.getBasicDetails(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      if (res.status == 200) {
        this.basicNaacScoreDetails = res?.data
        this.basicNaacDistrictCode = res?.data?.proposalDistrictId;
        this.studentTeacherRatio = res?.data?.studentTeacherRatio;
        this.teachingNonTeachingRatioTS = res?.data?.teachingNonTeachingRatio
        if (this.basicNaacScoreDetails?.accrediationScoreWebsite == null && this.basicNaacScoreDetails?.multiDisciplinaryComment == null) {
          this.basicDetailsEditView = false;
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  remarksView() {
    this.common.remarks(this.overallData).subscribe(res => {
      if (res) {
        this.getoverallData()
        // this.getScoreList();
        // this.getUpdateScoreList();
        // this.getinstituteData();
        // this.getCostData();
      }
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
  toggleOverallComment() {
    let dialogRef = this.dialog.open(RemarksComponent, {
      data: {

      }
    });
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
          //  ele['showIcon'] = true
        }
        if ((ele.criteriaId == 7)) {
          // ele['showIcon'] = false
        }
      });
    });
    //Compare two array object data with criteriaId and baseId and insert new 3 object value
    this.sumConsutant = this.criteriaList.reduce(
      (sum, item) => sum + Number(item.consultantScore == null ? '0' : item.consultantScore),
      0
    );
    // this.sumConsutant = this.criteriaList.reduce((sum, item) => sum + item?.consultantScore, 0);
  }

  viewEdit(e, Id) {
    
    this.common.scoreViewComment(e, Id).subscribe(res => {
      if (res) {
        this.getScoreList();
        this.getUpdateScoreList();
        this.getinstituteData();
        this.getCostData();
        this.getoverallData();
        this.getbasicScoreDetails();
      }
    })
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
    if(this.componentId === this.sharedService.collegeComponentId && this.pmushaUniqueCode != 10){
      this.router.navigate([this.routers.collegescrutinylist,this.sharedService.collegeComponentId])
    }
    else if(this.componentId === this.sharedService.universityComponentId && this.pmushaUniqueCode != 10){
      this.router.navigate([this.routers.universityscrutinylist,this.sharedService.universityComponentId])
    }
    else if(this.componentId === this.sharedService.collegeComponentId && this.pmushaUniqueCode == 10){
      this.router.navigate([this.routers.collegepmushalist,this.sharedService.universityComponentId])
    }
    else if(this.componentId === this.sharedService.universityComponentId && this.pmushaUniqueCode == 10){
      this.router.navigate([this.routers.universitypmushalist,this.sharedService.universityComponentId])
    }
    else if (this.pmushaUniqueCode == 10){
      this.router.navigate([this.routers.merupmushalist,this.sharedService.meruComponentId])
    }
    else{
      this.router.navigate([this.routers.meruscrutinylist,this.sharedService.meruComponentId])
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

  tabValue(e){
    if (e === 'propsalCost') {
      this.getCostList()
    }
    else if (e == 'departmentData'){
      this.getDepartment()
    }
    else if (e == 'courseData'){
      this.getCourse()
    }
    else if (e == 'nonTeachingStaff'){
      this.getNonTeaching()
    }
    else if (e == 'meruFacilities'){
      this.getMeruFacility()
    }
    else if (e == 'infraConstriuction'){
      this.getInfraConstruction()
    }
    else if (e == 'infraRenovation'){
      this.getInfraRenovation()
    }
    else if (e == 'equipmentProc'){
      this.getequpData()
    }
    else if (e == 'softComp'){
      this.getSoftData()
    }
    else if (e == 'propCourse') {
      this.getProposedCourse()
    }
    else if (e == 'timeline'){
      this.getTimeline()
    }
    else if (e == 'financialEstimate'){
      this.getDataFinancialEstimate()
    }
    else if (e == 'actiDetails'){
      this.getActivityDetails()
    }
    else if (e == 'apropOutcomes'){
      this.getPrposedOutcome()
    }
    else if (e == 'otherSourceFund'){
      this.otherSourceOfFunds()
    }
    else if (e == 'otherInform'){
      this.getOtherInfData()
    }
  }

  getDepartment(){
      this.getService.getDepartmentDataIns(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
        this.departmentData = res.data;
    });
  }

  getCourse(){
    this.getService.getCourseData(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      this.courseData = res.data;
  });
  }

  getNonTeaching(){
    this.getService.getNonTeacherStaffIns(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      this.nonTeachingData = res.data;
      this.data1 = this.nonTeachingData[0]?.adminDeptSanctionedPost;
      this.data2 = this.nonTeachingData[0]?.adminDeptPostYetToBeSanctioned;
      this.data3 = this.nonTeachingData[0]?.technicalDeptSanctionedPost;
      this.data4 = this.nonTeachingData[0]?.technicalDeptPostYetToBeSanctioned;
      this.data5 = this.nonTeachingData[0]?.othersDeptSanctionedPost;
      this.data6 = this.nonTeachingData[0]?.othersDeptPostYetToBeSanctioned;
  });
  }

  getMeruFacility(){
    this.getService.activityFacility(this.aisheCode).subscribe((res) => {
      this.meruActivityFacilities = res;
  });
  }

  getInfraConstruction(){
    this.getService.getinfrasConstIns(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      this.infrastructureData = res.data;
      this.proposedArea = this.infrastructureData.reduce(
        (sum, item) => sum + Number(item.proposedArea), 0);
      this.perUnitCost = this.infrastructureData.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.totalCost = this.infrastructureData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
  });
  }

  getInfraRenovation(){
    this.getService.getinfrastructureRenovationIns(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      this.infrastructureRenovationsData = res.data;
      this.infraRenoproposedArea = this.infrastructureRenovationsData.reduce(
        (sum, item) => sum + Number(item.proposedArea),
        0
      );
      this.infraRenoperUnitCost = this.infrastructureRenovationsData.reduce(
        (sum, item) => sum + Number(item.perUnitCost),
        0
      );
      this.infraRenototalCost = this.infrastructureRenovationsData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
  });
  }

  getequpData(){
    this.getService.getEquipmentIns(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
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
  });
  }
  getSoftData(){
    this.getpmService.getSoftCompoenentList(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      this.softComponentsData = res.data;

      this.quantitySoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.unit),
        0
      );
      this.perUnitCostSoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.costPerUnit),
        0
      );
      this.totalCostSoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
      this.targetNumberSoft = this.softComponentsData.reduce(
        (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
        0
      );
  });
  }
  getProposedCourse(){
    this.getService.getProposedCourse(this.aisheCode, this.componentId).subscribe((res) => {
      this.proposedCoursesData = res;
  });
  }
  getTimeline(){
    this.getService.getDataTime(this.aisheCode, this.componentId).subscribe((res) => {
      this.timelinesData = res;
  });
  }

  
  getDataFinancialEstimate() {
    this.api.getFinancialEstimate(this.aisheCode, this.componentId).subscribe((res) => {
      this.financialEstimatesData = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

   
  getActivityDetails() {
    this.api.getActivityDetails(this.aisheCode, this.componentId).subscribe((res) => {
      this.activityDetailData = res;
      this.activityDetailData.forEach(ele => {
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

  getPrposedOutcome() {
    this.getService.getOutCome(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
      this.outcomesData = res.data;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  otherSourceOfFunds() {
    this.getService.getOtherSourceList(this.aisheCode, this.componentId).subscribe((res) => {
      this.otherSourceOfFundsData = res.otherSourceOfFund;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getOtherInfData() {
    this.getpmService.getOtherInformation(this.aisheCode, this.componentId).subscribe((res) => {
      this.otherInformationData = res.data;
      this.tentativeDate = this.otherInformationData[0].tenatativeDateCompletionOfProject;
      this.provideDetails = this.otherInformationData[0].provideDetails;



      if (res.data && res.data.length) {
        if (res.data['0'].withExistringLinkage) {
          this.withExistringLinkage = true
          this.otherInfo = 'With existing Linkages';
        } if (res.data['0'].withScopeForLinkage) {
          this.withScopeForLinkage = true
          this.otherInfo = 'With scope for linkage';
        } if (res.data['0'].withoutLinkage) {
          this.withoutLinkage = true
          this.otherInfo = 'Without Linkages';
        }
        if (res.data['0'].documentOfDpr) {
          
          this.myFilesName = res.data['0'].dprFileName;
          this.documentOfDpr = res.data['0'].documentOfDpr;

        }
        if (this.basicNaacScoreDetails.isOrganogramUploaded) {
          this.getDocument()
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  // this.getService.getActivityDetails(this.aisheCode, this.componentId)
 

}
