import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { InstitutionDialogComponent } from "../dialog/institution-dialog/institution-dialog.component";
import { Injectable } from "@angular/core";
import { StateProfileDetailComponent } from "../dialog/state-profile-detail/state-profile-detail.component";
import { FinalSubmitDialogComponent } from "../dialog/final-submit-dialog/final-submit-dialog.component";
import { SetPasswordDialogComponent } from "../dialog/set-password-dialog/set-password-dialog.component";
import { ErrorDialogComponent } from "../dialog/error-dialog/error-dialog.component";
import { ReloginDialogComponent } from "../dialog/relogin-dialog/relogin-dialog.component";
import { ChangePasswordDialogComponent } from "../dialog/change-password-dialog/change-password-dialog.component";
import { DeleteDialogComponent } from "../dialog/delete-dialog/delete-dialog.component";
import { UnlockMessageComponent } from "../dialog/unlock-message/unlock-message.component";
import { ScoreBreakupDialogComponent } from "../dialog/score-breakup-dialog/score-breakup-dialog.component";
import { CostBreakDialogComponent } from "../dialog/cost-break-dialog/cost-break-dialog.component";
import { GetService } from "../service/get.service";
import { UserActionDialogComponent } from "../dialog/user-action-dialog/user-action-dialog.component";
import { PartialLockUnlockComponent } from "../dialog/partial-lock-unlock/partial-lock-unlock.component";
import { UnlockStatusDialogComponent } from "../dialog/unlock-status-dialog/unlock-status-dialog.component";
import { UnlockConsolidatedDialogComponent } from "../dialog/unlock-consolidated-dialog/unlock-consolidated-dialog.component";
import { ForwardConfirmationDialogComponent } from "../dialog/forward-confirmation-dialog/forward-confirmation-dialog.component";
import { MergeConsultantDialogComponent } from "../dialog/merge-consultant-dialog/merge-consultant-dialog.component";
import { RemarksComponent } from "../dialog/remarks/remarks.component";
import { ScoreCommentDialogComponent } from "../dialog/score-comment-dialog/score-comment-dialog.component";
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { PabCommentDialogComponent } from "../dialog/pab-comment-dialog/pab-comment-dialog.component";
import { InsCommentDialogComponent } from "../dialog/ins-comment-dialog/ins-comment-dialog.component";
import { OutcomeJustificationDialogComponent } from "../dialog/outcome-justification-dialog/outcome-justification-dialog.component";
import { PostService } from "../service/post.service";
import { RevisionLockUnlockComponent } from "../dialog/revision-lock-unlock/revision-lock-unlock.component";
import { StateIssueDialogComponent } from "../dialog/state-issue-dialog/state-issue-dialog.component";
import { ItemTaggingDialogComponent } from "../dialog/item-tagging-dialog/item-tagging-dialog.component";
import { UploadImageDialogComponent } from "../dialog/upload-image-dialog/upload-image-dialog.component";
import { EmailSmsDialogComponent } from "../dialog/email-sms-dialog/email-sms-dialog.component";

@Injectable()
export class Common {
  stateNaacAccreditationDetailsNew: any;
  tab: any;
  constructor(public dialog: MatDialog, public get: GetService, public postService: PostService) { }
  public institutionDetails(
    item: any,
    distCode: any,
    id: any
  ): Observable<boolean> {
    return this.dialog
      .open(InstitutionDialogComponent, {
        data: { list: item, distCode: distCode, componentId: id },
        width: "70%",
        height: "100%",
        disableClose: true,
      })
      .afterClosed();
  }
  public finalSubmit(): Observable<boolean> {
    return this.dialog
      .open(FinalSubmitDialogComponent, {
        data: '',

        disableClose: true,
      })
      .afterClosed();
  }

  public unLock(ele): Observable<boolean> {
    return this.dialog.open(UnlockMessageComponent, {
      width: "35%",
      data: ele,
      disableClose: true,
    }).afterClosed();
  }
  public mergeConsultant(ele): Observable<boolean> {
    return this.dialog.open(MergeConsultantDialogComponent, {
      width: "35%",
      data: ele,
      disableClose: true,
    }).afterClosed();
  }
  public partialUnlock(ele): Observable<boolean> {
    return this.dialog.open(PartialLockUnlockComponent, {
      width: "35%",
      data: ele,
      disableClose: true,
    }).afterClosed();
  }
  public partialUnlockRevision(ele): Observable<boolean> {
    return this.dialog.open(RevisionLockUnlockComponent, {
      width: "35%",
      data: ele,
      disableClose: true,
    }).afterClosed();
  }
  public unLockConsolidated(ele): Observable<boolean> {
    return this.dialog.open(UnlockConsolidatedDialogComponent, {
      width: "35%",
      data: ele,
      disableClose: true,
    }).afterClosed();
  }
  public scoreBreakup(ele): Observable<boolean> {
    return this.dialog.open(ScoreBreakupDialogComponent, {
      data: ele,
      disableClose: true,
    }).afterClosed();
  }

  public costBreakup(ele, veiwId:any): Observable<boolean> {
    return this.dialog.open(CostBreakDialogComponent, {
      width: "50%",
      data: ele,
      id: veiwId,
      disableClose: true,
    }).afterClosed();
  }

  public error(ele): Observable<boolean> {
    return this.dialog
      .open(ErrorDialogComponent, {
        data: ele,
        disableClose: true,
      }).afterClosed();
    //return; 
  }
  public stateprofileDetails(ele): Observable<boolean> {
    return this.dialog
      .open(StateProfileDetailComponent, {
        data: { stateCode: ele.stCode, stateName: ele.name },
        disableClose: true,
      })
      .afterClosed();
  }
  public openSetPassword(userId: string): Observable<boolean> {
    return this.dialog.open(SetPasswordDialogComponent, {
      data: userId,
      width: "35%",
      disableClose: true,
    }).afterClosed()
  }

  public reLogin(ele: any): Observable<boolean> {
    return this.dialog.open(ReloginDialogComponent, {
      data: ele,
      disableClose: true,
    }).afterClosed()

  }

  public openUnlockStatus(ele: any): Observable<boolean> {
    return this.dialog.open(UnlockStatusDialogComponent, {
      data: ele,
      disableClose: true,
    }).afterClosed()
  }

  public userAction(ele: any): Observable<boolean> {
    return this.dialog.open(UserActionDialogComponent, {
      width: '40%',
      data: ele,
      disableClose: true,
    }).afterClosed()
  }
  public openChangePass(): Observable<boolean> {
    return this.dialog.open(ChangePasswordDialogComponent, {
      width: '35%',
      data: '',
      disableClose: true,
    }).afterClosed()
  }
  public delete(): Observable<boolean> {
    return this.dialog.open(DeleteDialogComponent, {
      data: '',
      disableClose: true,
    }).afterClosed()
  }
  public restoreDelete(viewid): Observable<boolean> {
    return this.dialog.open(DeleteDialogComponent, {
      id:viewid,
      data: '',
      disableClose: true,
    }).afterClosed()
  }
  public forwardVerify(): Observable<boolean> {
    return this.dialog.open(ForwardConfirmationDialogComponent, {
      data: '',
      disableClose: true,
      width: '40%',
    }).afterClosed()
  }
  public emailSMS(ele: any): Observable<boolean> {
    return this.dialog.open(EmailSmsDialogComponent, {
      data: ele,
      disableClose: true,
      width: '70%',
      maxHeight: '100vh',   // ✅ enables scroll
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()
  }
  public remarks(ele: any): Observable<boolean> {
    return this.dialog.open(RemarksComponent, {
      width: '50%',
      data: ele,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()

  }

  public pabRemark(ele: any, veiwId: any): Observable<boolean> {
    return this.dialog.open(PabCommentDialogComponent, {
      width: '50%',
      data: ele,
      id: veiwId,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()

  }

  public scoreViewComment(ele: any, veiwId: any): Observable<boolean> {
    return this.dialog.open(ScoreCommentDialogComponent, {
      width: '50%',
      data: ele,
      id: veiwId,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()
  }

  public scoreViewinsComment(ele: any, veiwId: any): Observable<boolean> {
    return this.dialog.open(InsCommentDialogComponent, {
      width: '60%',
      data: ele,
      id: veiwId,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()
  }

    public imageMultipleUpload(ele: any, veiwId: any): Observable<boolean> {
    return this.dialog.open(UploadImageDialogComponent, {
      width: '60%',
      data: ele,
      id: veiwId,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()
  }

  public tagViewinsComment(ele: any, veiwId: any,): Observable<boolean> {
    return this.dialog.open(ItemTaggingDialogComponent, {
      width: '60%',
      data: ele,
      id: veiwId,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()
  }

  public stateIssue(ele: any): Observable<boolean> {
    return this.dialog.open(StateIssueDialogComponent, {
      width: '60%',
      data: ele,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()
  }

  public outcomeJustification(ele: any): Observable<boolean> {
    return this.dialog.open(OutcomeJustificationDialogComponent, {
      width: '50%',
      data: ele,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy()
    }).afterClosed()
  }
  // public facilityComment(ele: any, veiwId:any): Observable<boolean> {
  //   return this.dialog.open(ScoreCommentDialogComponent, {
  //     width: '50%',
  //     data: ele,
  //     id: veiwId,
  //   disableClose: true,
  //   }).afterClosed()
  // }
  downloadPDF(payload) {
    this.get.downloadDocument(payload).subscribe(res => {
      if (res.data && res.data.length) {
        this.viewPdf(res.data['0'].documentFile, res.data['0'].name)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  downloadPDFProposal(payload) {
    return new Promise((resolve, reject) => {
      this.get.downloadDocumentProposal(payload).subscribe(res => {
        if (res.data && res.data.length) {
          let ele = {
            name: res.data['0'].name,
            file: res.data['0'].documentFile
          }
          resolve(ele)
        } else {
          reject();
          return;
        }
      }, err => {

      })
    })

  }
  downloadPDFProposalNMDC(payload) {
    return new Promise((resolve, reject) => {
      this.get.downloadDocumentProposalNMDC(payload).subscribe(res => {
        if (res.data && res.data.length) {
          let ele = {
            name: res.data['0'].name,
            file: res.data['0'].documentFile
          }
          resolve(ele)
        } else {
          reject();
          return;
        }
      }, err => {

      })
    })

  }
  blob: any;
  downloadPdf(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: 'application/pdf' });
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
  viewPdfProposal(data: any, fileName: string) {

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

  viewPdf(data: any, fileName: string) {

    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    var blob = new Blob([ba], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    this.tab = window.open(url, fileName);
    //this.tab.location.href = url;

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
  viewExcel(data: any, fileName: string) {

    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    var blob = new Blob([ba], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    // this.tab = window.open(url, fileName);
    // this.tab.location.href = url;
    let pdfName = fileName + ".xlsx";
    // Construct the 'a' element
    let link = document.createElement("a");
    link.download = pdfName;
    link.target = "_blank";

    // Construct the URI
    link.href = url;
    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);

    function _base64ToArrayBuffer(base64: string) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }




    //     public static downloadAsExcel(base64: string,reportNumber:string):void{

    //       const byteArray = new Uint8Array(atob(base64).split("").map(char => char.charCodeAt(0)));

    //       const pdfData = new Blob([byteArray], {type:'application/octet-stream' });
    //       const fileURL = URL.createObjectURL(pdfData);   //create random url to render on browser
    //       // window.open(fileURL);

    //       let pdfName = reportNumber+".xlsx";
    //       // Construct the 'a' element
    //       let link = document.createElement("a");
    //       link.download = pdfName;
    //       link.target = "_blank";

    //       // Construct the URI
    //       link.href = fileURL;
    //       document.body.appendChild(link);
    //       link.click();

    //       // Cleanup the DOM
    //       document.body.removeChild(link);



    // }
  }

  public courseDurationYear = [0, 1, 2, 3, 4, 5, 6];
  public courseDurationMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  public statePopulations = [
    {
      genderName: "Male",
      genderId: 1,
      grandTotal: 0,
      id: 0,
      obcPercentageGtotal: 0,
      obcTotal: 0,
      otherPercentageGtotal: 0,
      otherTotal: 0,
      scPercentageGtotal: 0,
      scTotal: 0,
      source: "",
      stPercentageGtotal: 0,
      stTotal: 0,
      stateCode: "",
      year: 0,
    },
    {
      genderName: "Female",
      genderId: 2,
      grandTotal: 0,
      id: 0,
      obcPercentageGtotal: 0,
      obcTotal: 0,
      otherPercentageGtotal: 0,
      otherTotal: 0,
      scPercentageGtotal: 0,
      scTotal: 0,
      source: "",
      stPercentageGtotal: 0,
      stTotal: 0,
      stateCode: "",
      year: 0,
    },
    {
      genderName: "Transgender",
      genderId: 3,
      grandTotal: 0,
      id: 0,
      obcPercentageGtotal: 0,
      obcTotal: 0,
      otherPercentageGtotal: 0,
      otherTotal: 0,
      scPercentageGtotal: 0,
      scTotal: 0,
      source: "",
      stPercentageGtotal: 0,
      stTotal: 0,
      stateCode: "",
      year: 0,
    },
    {
      genderName: "Total",
      genderId: 0,
      grandTotal: 0,
      id: 0,
      obcPercentageGtotal: 0,
      obcTotal: 0,
      otherPercentageGtotal: 0,
      otherTotal: 0,
      scPercentageGtotal: 0,
      scTotal: 0,
      source: "",
      stPercentageGtotal: 0,
      stTotal: 0,
      stateCode: "",
      year: 0,
    },
  ];

  public Accreditation = [
    {
      type: "State Govt. Universities",
      pmushaInstitutionTypeId: 2,
      id: 0,
      a: 0,
      aplus: 0,
      aplusplus: 0,
      b: 0,
      bplus: 0,
      bplusplus: 0,
      c: 0,
      stateCode: ''
    },
    {
      type: "State Govt. Colleges",
      pmushaInstitutionTypeId: 9,
      id: 0,
      a: 0,
      aplus: 0,
      aplusplus: 0,
      b: 0,
      bplus: 0,
      bplusplus: 0,
      c: 0,
      stateCode: ''
    },
    {
      type: "Private (aided) Colleges",
      pmushaInstitutionTypeId: 10,
      id: 0,
      a: 0,
      aplus: 0,
      aplusplus: 0,
      b: 0,
      bplus: 0,
      bplusplus: 0,
      c: 0,
      stateCode: ''
    }
  ];

  // Constitution_And_composition(1, "Constitution and composition of the SHEC"),
  // MoU(2, "MoU"),
  // DPR(3, "DPR"),
  // Location_Of_Land(4, "Location of Land"),
  // Land_Ownership_Certificate(5, "Land ownership certificate from competent authority for proposed additional " +
  //         "land requirement"),
  // Non_Encumbrance_Certificate(6, "Certification of the location: Non-Encumbrance Certificate"),
  // Map_Of_Land_Duly_Signed(7, "Map of the land duly signed by competent authority"),
  // RUSA_Scheme_Completion_Certificate_User(8, "RUSA Scheme Completion Certificate(User)"),
  // Equity_Infra_Land_Title(9, "Equity Infra Land Title"),
  // RUSA_Scheme_Completion_Certificate_Legacy(10, "RUSA Project Completion Certificate(Legacy) "),
  meruDoc: string = 'MERU_Available_Facility_Proof_Document'
  organogram: string = 'Organogram'
  landCertificate: string = 'Land_Ownership_Certificate'




  briefStateProfile: string = 'Brief State Profile';
  population: string = 'Population data';
  gerEnrol: string = 'GER & Enrollment';
  insENrol: string = `Institution's Number & Enrollment`;
  naac: string = `NAAC Accreditation Details`;
  expenditure: string = `State Expenditure on Higher Education`;
  districtTotal: string = `Total Number of District`;
  focusDistrictIndicatore: string = `Focus District Indicator`;
  focusDistrict: string = `Focus District Data`;
  noIns: string = `Number of Institutions Data`;
  rusaLegacy: string = 'RUSA Legacy Data'


  stateRequestUnlock: string = 'Request_For_Unlocking_State'
  userRequestUnlock: string = 'Request_For_Unlocking_Scheme';
  unlockSAA: string = 'Unlock_Scheme';
  unlockBYNPD: string = 'Unlock_By_NPD'
  approvedBySAA: string = 'APPROVED_BY_SAA';
  approvedByNPD: string = 'APPROVED_BY_NPD';
  requesttoUnlockNPD: string = 'Request_to_Unlock_From_NPD';
  rejectedSAA: string = 'DISAPPROVED_OR_REJECTED_APPROVED_BY_SAA'
  rejectedByNPD: string = 'DISAPPROVED_OR_REJECTED_APPROVED_BY_NPD'
  unlockShortlisted: string = 'Unlock_Shortlisted_Status'
  partialUnlockState: number = 999

  revisionProposalUnlockByAdmin:string='proposalRequestForUnlockByAdmin'
  proposalRevisionApprovedByState:string='proposalRevisionApprovedByState'
  proposalRequestForUnlockByUser:string='proposalRequestForUnlockByUser'
  proposalRequestForUnlockByUserV3:number = 2;
  proposalRevisionApprovedByStateV3:number = 3;
  


  public finalStatus = ['FINAL_SUBMIT_STATE_AT_A_GLANCE']
  stateAtGlance: string = 'Final Submit State at a Glance';
  stateAtGlanceFinal: string = 'FINAL_SUBMIT_STATE_AT_A_GLANCE'

  strengthClgFinal: string = 'Final Submit Strengthen Colleges';
  strengthClg: string = 'FINAL_SUBMIT_COLLEGE_STRENGTH';

  strengthUniv: string = 'Final Submit Strengthen University';
  strengthUnivFinal: string = 'FINAL_SUBMIT_UNIVERSITY_STRENGTH'

  strengthClgPreamble: string = 'COLLEGE_PREAMBLE'
  strengthClgRUSA: string = 'COLLEGE_EARLIER_APPROVAL_DETAILS_UNDER_RUSA'
  strengthClgDetails: string = 'COLLEGE_DETAILS'
  strengthClgDepartment: string = 'COLLEGE_DEPARTMENT_DETAILS'
  strengthClgCourse: string = 'COLLEGE_COURSE_DETAILS'
  strengthClgNonTIF: string = 'COLLEGE_NON_TEACHING_STAFF_DETAILS'
  strengthClgInfraCons: string = 'COLLEGE_INFRASTRUCTURE_CONSTRUCTION'
  strengthClgReno: string = 'COLLEGE_INFRASTRUCTURE_RENOVATION'
  strengthClgEquip: string = 'COLLEGE_EQUIPMENT_PROCURED'
  strengthClgSoft: string = 'COLLEGE_SOFT_COMPONENT'
  strengthClgProposed: string = 'COLLEGE_PROPOSED_COURSE'
  strengthClgTimeline: string = 'COLLEGE_COMPLETION_TIMELINE'
  strengthClgFinance: string = 'COLLEGE_FINANCIAL_ESTIMATE'
  strengthClgOutCome: string = 'COLLEGE_PROPOSED_OUTCOME'
  strengthClgOtherSource: string = 'COLLEGE_OTHER_SOURCE_OF_FUND_FOR_THE_INSTITUTION'
  strengthClgOtherInfo: string = 'COLLEGE_OTHER_INFORMATION'
  strengthCollegeActivity: string = 'COLLEGE_ACTIVITY'

  strengthUnivPreamble: string = 'UNIVERSITY_PREAMBLE'
  strengthUnivRUSA: string = 'UNIVERSITY_EARLIER_APPROVAL_DETAILS_UNDER_RUSA'
  strengthUnivDetails: string = 'UNIVERSITY_DETAILS'
  strengthUnivDepartment: string = 'UNIVERSITY_DEPARTMENT_DETAILS'
  strengthUnivCourse: string = 'UNIVERSITY_COURSE_DETAILS'
  strengthUnivNonTIF: string = 'UNIVERSITY_NON_TEACHING_STAFF_DETAILS'
  strengthUnivInfraCons: string = 'UNIVERSITY_INFRASTRUCTURE_CONSTRUCTION'
  strengthUnivReno: string = 'UNIVERSITY_INFRASTRUCTURE_RENOVATION'
  strengthUnivEquip: string = 'UNIVERSITY_EQUIPMENT_PROCURED'
  strengthUnivSoft: string = 'UNIVERSITY_SOFT_COMPONENT'
  strengthUnivProposed: string = 'UNIVERSITY_PROPOSED_COURSE'
  strengthUnivTimeline: string = 'UNIVERSITY_COMPLETION_TIMELINE'
  strengthUnivFinance: string = 'UNIVERSITY_FINANCIAL_ESTIMATE'
  strengthUnivOutCome: string = 'UNIVERSITY_PROPOSED_OUTCOME'
  strengthUnivOtherSource: string = 'UNIVERSITY_OTHER_SOURCE_OF_FUND_FOR_THE_INSTITUTION'
  strengthUnivOtherInfo: string = 'UNIVERSITY_OTHER_INFORMATION'
  strengthUnivActivity: string = 'UNIVERSITY_ACTIVITY'
  strengthUniversityInfrRenovation: string = 'UNIVERSITY_INFRASTRUCTURE_RENOVATION'
  strengthUniversityEquipment = 'UNIVERSITY_EQUIPMENT_PROCURED'


  meruFinalSubmit: string = 'FINAL_SUBMIT_MERU'
  meruFinal: string = 'Final Submit MERU'
  rusaPage: string = 'Earlier Approval details under RUSA'

  module = ['State at a Glance', 'Strengthen Colleges', 'Strengthen University', 'MERU', 'Gender Inclusion and Equity Initiatives', 'New Model Degree College']
  meruPreable: string = 'MERU_PREAMBLE'
  meruRUSA: string = 'MERU_EARLIER_APPROVAL_DETAILS_UNDER_RUSA'
  meruInfrastructureConstruction: string = 'MERU_INFRASTRUCTURE_CONSTRUCTION'
  meruRenovation: string = 'MERU_INFRASTRUCTURE_RENOVATION'
  meruSoftComponent: string = 'MERU_SOFT_COMPONENT'
  meruEquipment: string = 'MERU_EQUIPMENT_PROCURED'
  meruFinancial: string = 'MERU_FINANCIAL_ESTIMATE'
  meruTimeLine: string = 'MERU_COMPLETION_TIMELINE'
  meruProposed: string = 'MERU_PROPOSED_COURSE'
  meruDepartment: string = 'MERU_DEPARTMENT_DETAILS'
  meruCourse: string = 'MERU_COURSE_DETAILS'
  meruNonTechibg: string = 'MERU_NON_TEACHING_STAFF_DETAILS'
  meruInfraDetails: string = 'MERU_INFRA_DETAILS'
  meruActivity: string = 'MERU_ACTIVITY'
  meruDetailsUniversity: string = 'MERU_DETAILS'
  meruProposedOutcome: string = 'MERU_PROPOSED_OUTCOME'
  meruProposedOtherSource: string = 'MERU_OTHER_SOURCE_OF_FUND_FOR_THE_INSTITUTION'
  meruProposedOtherInfor: string = 'MERU_OTHER_INFORMATION'
  meruAvailableFacility: string = 'MERU_AVAILABLE_FACILITY'

  genderEqBasic: string = 'EQUITY_BASIC_DETAIL'
  genderEquityInfroRenovation: string = 'EQUITY_INFRA_RENOVATION'
  genderEquityInfroConstruction: string = 'EQUITY_INFRA_CONSTRUCTION'
  genderEquityDetails: string = 'EQUITY_DETAILS_OF_DISTRICT'
  genderEquityEquipmint: string = 'EQUITY_EQUIPMENT_PROCURED'
  genderEquityWorkshops: string = 'EQUITY_WORKSHOPS'
  genderEquityRemedial: string = 'EQUITY_REMEDIAL_CLASSES'
  genderEquityStremCourse: string = 'EQUITY_PROPOSED_STEM_COURSE'
  genderEquityImprovingVocationalSkilling: string = 'EQUITY_ACTIVITIES_FOR_IMPROVING_VOCATIONALISATION_AND_SKILLING'
  genderEquityOtherActivity: string = 'EQUITY_OTHER_ACTIVITY'
  genderEquityFinancial: string = 'EQUITY_FINANCIAL_ESTIMATES'
  genderEquityTimeLine: string = 'EQUITY_COMPLETION_TIMELINE'
  genderEquityOutComes: string = 'EQUITY_PROPOSED_OUTCOMES'
  genderEquityOtherSourceFunds: string = 'EQUITY_OTHER_SOURCE_OF_FUNDS_FOR_THE_INSTITUTION'
  genderEquityUploadingDocument: string = 'EQUITY_UPLOADING_DOCUMENT'
  genderEquityOtherInformation: string = 'EQUITY_OTHER_INFORMATION'
  genderEquityCommitment: string = 'EQUITY_COMMITMENT'
  genderEquityActivity: string = 'EQUITY_ACTIVITY'
  genderEquityFinalSubmit: string = 'FINAL_SUBMIT_EQUITY'
  genderEquityFinal: string = 'Final Submit Gender Equity'

  //FINAL_SUBMIT_NMDC("Final Submit NMDC", "", "Final Submit NMDC"),
  nmdcFinalSubmit: string = 'FINAL_SUBMIT_NMDC'
  nmdcFinal: string = 'Final Submit NMDC'
  nmdcRUSA: string = 'NMDC_EARLIER_APPROVAL_DETAILS_UNDER_RUSA'
  nmdcBasic: string = 'NMDC_BASIC_DETAIL'
  nmdcHigher: string = 'NMDC_HE_DETAILS_IN_DISTRICT_REGION'
  nmdcAbout: string = 'NMDC_NEW_MDC_DETAILS'
  nmdcBuilding: string = 'NMDC_BUILDING_PROPOSED_CONSTRUCTION'
  nmdcEquipment: string = 'NMDC_EQUIPMENT'
  nmdcDepartment: string = 'NMDC_DEPARTMENT'
  nmdcProgram: string = 'NMDC_COURSE'
  nmdcTeaching: string = 'NMDC_TEACHING_STAFF_DETAIL'
  nmdcNonTIF: string = 'NMDC_NON_TEACHING_STAFF_DETAIL'
  nmdcOutcome: string = 'NMDC_PROPOSED_OUTCOME'
  nmdcEnrol: string = 'NMDC_ANTICIPATED_ENROLLMENT_IN_DEMOGRAPHIC_CATEGORIES'
  nmdcFacility: string = 'NMDC_AVAILABILITY_OF_CIVIC_FACILITIES'
  nmdcPhysical: string = 'NMDC_PHYSICAL_ESTIMATES'
  nmdcFinancialEstimate: string = 'NMDC_FINANCIAL_ESTIMATES'
  nmdcBasicOtherSource: string = 'NMDC_OTHER_SOURCE'
  nmdcInfraTimeLine: string = 'NMDC_TIMELINE_FOR_BUILDING_INFRA'
  nmdcAcademic: string = 'NMDC_TIMELINE_FOR_ADMIN_MATTERS'
  nmdcActivityChart: string = 'NMDC_ACTIVITY_CHAT'
  nmdcActivity: string = 'NMDC_ACTIVITY'

  unlockStateProfile: string = 'Unlock_State_Profile'
  unlockUniversity: string = 'Unlock_Grants_To_Strengthen_Universities'
  unlockCollege: string = 'Unlock_Grants_To_Strengthen_Colleges'
  unlockMERU: string = 'Unlock_MERU'
  UnlockNMDC: string = 'Unlock_NMDC'
  UnlockMMER: string = 'Unlock_MMER_Grants'
  UnlockEquity: string = 'Unlock_Gender_Inclusion_And_Equity_Initiatives'

  RevisionUnlockConstantUser: string = 'proposalRequestForUnlockByUser'
  RevisionUnlockConstantAdmin: string = 'proposalRequestForUnlockByAdmin'
  

  infraConstruction:string = 'Infrastructure Construction'
  buildingConstruction:string = 'Building Construction'
  infraRenovation:string = 'Infra Renovation/Upgradation'
  equipment:string = 'Equipment Procured'
  Nmdcequipment:string = 'Equipment'
  softComponent:string = 'Soft Component'
  timeline:string = 'Completion Timeline'
  infraTimeline:string = 'Infra Timeline'
  proposedOutcome:string = 'Proposed Outcomes'
  otherInformation:string = 'Other Information'
  activityDetail:string = 'Activity Detail'
  financialEstimate:string = 'Financial Estimates'
  workshop:string = 'Workshop Programme'
  remedialClass:string = 'Remedial Classes'
  vocational:string = 'Activities for Improving Vocationalisation & Skilling'
  anyOtherActivities:string = 'Other Activity'
  activityDetails:string = 'Activity Details'


  public newObj = {
  infraConstruction:  'Infrastructure Construction',
  buildingConstruction: 'Building Construction',
  infraRenovation: 'Infra Renovation/Upgradation',
  equipment: 'Equipment Procured',
  Nmdcequipment: 'Equipment',
  softComponent: 'Soft Component',
  timeline: 'Completion Timeline',
  infraTimeline: 'Infra Timeline',
  proposedOutcome: 'Proposed Outcomes',
  otherInformation: 'Other Information',
  activityDetail: 'Activity Detail',
  financialEstimate: 'Financial Estimates',
  workshop: 'Workshop Programme',
  remedialClass: 'Remedial Classes',
  vocational: 'Activities for Improving Vocationalisation & Skilling',
  anyOtherActivities: 'Other Activity',
  activityDetails: 'Activity Details',
  }




  public Menu = [
    {
      module: this.module['0'],
      menu: 'Brief State Profile',
      subMenu: '',
      page: 'Brief State Profile',
      value: 'STATE_PROFILE',
      status: false
    }, {
      module: this.module['0'],
      menu: 'Population data',
      subMenu: '',
      page: 'Population data',
      value: 'STATE_POPULATION_DATA',
      status: false
    }, {
      module: this.module['0'],
      menu: `State's Higher Education Data`,
      subMenu: '',
      page: 'GER & Enrollment',
      value: 'STATE_HE_DATA_GER_ENROLLMENT',
      status: false
    }, {
      module: this.module['0'],
      menu: `State's Higher Education Data`,
      subMenu: '',
      page: `Institution's Number & Enrollment`,
      value: 'STATE_HE_DATA_INSTITUTION_NUMBER_AND_ENROLLMENT',
      status: false
    }, {
      module: this.module['0'],
      menu: `State's Higher Education Data`,
      subMenu: '',
      page: `NAAC Accreditation Details`,
      value: 'STATE_HE_DATA_NAAC_ACCREDITATION_DETAILS',
      status: false
    }, {
      module: this.module['0'],
      menu: `State's Higher Education Data`,
      subMenu: '',
      page: `State Expenditure on Higher Education`,
      value: 'STATE_HE_DATA_EXPENDITURE',
      status: false
    }, {
      module: this.module['0'],
      menu: `District Profile`,
      subMenu: '',
      page: `Total Number of District`,
      value: 'FOCUS_DISTRICT',
      status: false
    }, {
      module: this.module['0'],
      menu: `District Profile`,
      subMenu: '',
      page: `Focus District Indicator`,
      value: 'FOCUS_DISTRICT_INDICATOR',
      status: false
    }, {
      module: this.module['0'],
      menu: `District Profile`,
      subMenu: '',
      page: `Focus District Data`,
      value: 'FOCUS_DISTRICT_DATA',
      status: false
    }, {
      module: this.module['0'],
      menu: `District's Higher Education Data`,
      subMenu: '',
      page: `Number of Institutions Data`,
      value: 'NUMBER_OF_INSTITUTION_DATA',
      status: false
    },
    {
      module: this.module['0'],
      menu: `RUSA Legacy Data`,
      subMenu: '',
      page: `RUSA Legacy Data`,
      value: 'STATE_RUSA_LEGACY_DATA',
      status: false
    },
    {
      module: this.module['1'],
      menu: `Preamble`,
      subMenu: '',
      page: `Basic Details`,
      value: this.strengthClgPreamble,
      status: false
    },
    {
      module: this.module['1'],
      menu: `Preamble`,
      subMenu: '',
      page: `Earlier Approval details under RUSA`,
      value: this.strengthClgRUSA,
      status: false
    },
    {
      module: this.module['1'],
      menu: `College Details`,
      subMenu: '',
      page: `College Details`,
      value: this.strengthClgDetails,
      status: false
    }, {
      module: this.module['1'],
      menu: `College Details`,
      subMenu: '',
      page: `Department`,
      value: this.strengthClgDepartment,
      status: false
    }, {
      module: this.module['1'],
      menu: `College Details`,
      subMenu: '',
      page: `Course`,
      value: this.strengthClgCourse,
      status: false
    }, {
      module: this.module['1'],
      menu: `College Details`,
      subMenu: '',
      page: `Non-Teaching Staff`,
      value: this.strengthClgNonTIF,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infrastructure Construction`,
      value: this.strengthClgInfraCons,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infra Renovation/Upgradation`,
      value: this.strengthClgReno,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Equipment Procured`,
      value: this.strengthClgEquip,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Soft Component`,
      value: this.strengthClgSoft,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Proposed Course`,
      value: this.strengthClgProposed,
      status: false
    },
    {
      module: this.module['1'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Completion Timeline`,
      value: this.strengthClgTimeline,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Financial Estimate`,
      value: this.strengthClgFinance,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Proposed Outcomes`,
      value: this.strengthClgOutCome,
      status: false
    },
    {
      module: this.module['1'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Source of funds`,
      value: this.strengthClgOtherSource,
      status: false
    }, {
      module: this.module['1'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Information`,
      value: this.strengthClgOtherInfo,
      status: false
    }, {
      module: this.module['1'],
      menu: `Activity Details`,
      subMenu: '',
      page: `Activity Details`,
      value: this.strengthCollegeActivity,
      status: false
    },

    {
      module: this.module['2'],
      menu: `Preamble`,
      subMenu: '',
      page: `Basic Details`,
      value: this.strengthUnivPreamble,
      status: false
    }, {
      module: this.module['2'],
      menu: `Preamble`,
      subMenu: '',
      page: `Earlier Approval details under RUSA`,
      value: this.strengthUnivRUSA,
      status: false
    }, {
      module: this.module['2'],
      menu: `University Details`,
      subMenu: '',
      page: `University Details`,
      value: this.strengthUnivDetails,
      status: false
    }, {
      module: this.module['2'],
      menu: `University Details`,
      subMenu: '',
      page: `Department`,
      value: this.strengthUnivDepartment,
      status: false
    }, {
      module: this.module['2'],
      menu: `University Details`,
      subMenu: '',
      page: `Course`,
      value: this.strengthUnivCourse,
      status: false
    }, {
      module: this.module['2'],
      menu: `University Details`,
      subMenu: '',
      page: `Non-Teaching Staff`,
      value: this.strengthUnivNonTIF,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infrastructure Construction`,
      value: this.strengthUnivInfraCons,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infra Renovation/Upgradation`,
      value: this.strengthUnivReno,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Equipment Procured`,
      value: this.strengthUnivEquip,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Soft Component`,
      value: this.strengthUnivSoft,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Proposed Course`,
      value: this.strengthUnivProposed,
      status: false
    },

    {
      module: this.module['2'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Completion Timeline`,
      value: this.strengthUnivTimeline,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Financial Estimate`,
      value: this.strengthUnivFinance,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Proposed Outcomes`,
      value: this.strengthUnivOutCome,
      status: false
    }, {
      module: this.module['2'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Source of funds`,
      value: this.strengthUnivOtherInfo,
      status: false
    },
    {
      module: this.module['2'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Information`,
      value: this.strengthUnivOtherInfo,
      status: false
    }, {
      module: this.module['2'],
      menu: `Activity Details`,
      subMenu: '',
      page: `Activity Details`,
      value: this.strengthUnivActivity,
      status: false
    },

    {
      module: this.module['3'],
      menu: `Preamble`,
      subMenu: '',
      page: `Basic Details`,
      value: this.meruPreable,
      status: false
    }, {
      module: this.module['3'],
      menu: `Preamble`,
      subMenu: '',
      page: `Earlier Approval details under RUSA`,
      value: this.meruRUSA,
      status: false
    }, {
      module: this.module['3'],
      menu: `University Details`,
      subMenu: '',
      page: `University Details`,
      value: this.meruDetailsUniversity,
      status: false
    }, {
      module: this.module['3'],
      menu: `University Details`,
      subMenu: '',
      page: `Department`,
      value: this.meruDepartment,
      status: false
    }, {
      module: this.module['3'],
      menu: `University Details`,
      subMenu: '',
      page: `Course`,
      value: this.meruCourse,
      status: false
    }, {
      module: this.module['3'],
      menu: `University Details`,
      subMenu: '',
      page: `Non-Teaching Staff`,
      value: this.meruNonTechibg,
      status: false
    }, {
      module: this.module['3'],
      menu: `University Details`,
      subMenu: '',
      page: `Facilities/Activities`,
      value: this.meruAvailableFacility,
      status: false
    },
    {
      module: this.module['3'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infrastructure Construction`,
      value: this.meruInfrastructureConstruction,
      status: false
    }, {
      module: this.module['3'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infra Renovation/Upgradation`,
      value: this.meruRenovation,
      status: false
    }, {
      module: this.module['3'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Equipment Procured`,
      value: this.meruEquipment,
      status: false
    }, {
      module: this.module['3'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Soft Component`,
      value: this.meruSoftComponent,
      status: false
    }, {
      module: this.module['3'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Proposed Course`,
      value: this.meruProposed,
      status: false
    },

    {
      module: this.module['3'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Completion Timeline`,
      value: this.meruTimeLine,
      status: false
    }, {
      module: this.module['3'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Financial Estimate`,
      value: this.meruFinancial,
      status: false
    }, {
      module: this.module['3'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Proposed Outcomes`,
      value: this.meruProposedOutcome,
      status: false
    }, {
      module: this.module['3'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Source of funds`,
      value: this.meruProposedOtherSource,
      status: false
    },
    {
      module: this.module['3'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Information`,
      value: this.meruProposedOtherInfor,
      status: false
    }, {
      module: this.module['3'],
      menu: `Activity Details`,
      subMenu: '',
      page: `Activity Details`,
      value: this.meruActivity,
      status: false
    },

    {
      module: this.module['4'],
      menu: `Basic Details`,
      subMenu: '',
      page: `Basic Details`,
      value: this.genderEqBasic,
      status: false
    },

    {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infra Construction`,
      value: this.genderEquityInfroConstruction,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Infra Renovation/Upgradation`,
      value: this.genderEquityInfroRenovation,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Equipment Procured`,
      value: this.genderEquityEquipmint,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Workshop Programme`,
      value: this.genderEquityWorkshops,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Remedial Classes`,
      value: this.genderEquityRemedial,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Financial Estimates`,
      value: this.strengthUnivFinance,
      status: false
    },


    {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Proposed STEM Course`,
      value: this.genderEquityStremCourse,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Activities for Improving Vocationalisation & Skilling`,
      value: this.genderEquityImprovingVocationalSkilling,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Other Activity`,
      value: this.genderEquityOtherActivity,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposal Details`,
      subMenu: '',
      page: `Timeline`,
      value: this.genderEquityTimeLine,
      status: false
    },



    {
      module: this.module['4'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Proposed Outcomes`,
      value: this.strengthUnivOutCome,
      status: false
    }, {
      module: this.module['4'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Source of funds`,
      value: this.strengthUnivOtherInfo,
      status: false
    },
    {
      module: this.module['4'],
      menu: `Proposed Outcomes & Other Sources`,
      subMenu: '',
      page: `Other Information`,
      value: this.strengthUnivOtherInfo,
      status: false
    }, {
      module: this.module['4'],
      menu: `Activity Details`,
      subMenu: '',
      page: `Activity Details`,
      value: this.strengthUnivActivity,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Preamble`,
      subMenu: '',
      page: `Basic Details`,
      value: this.nmdcBasic,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Preamble`,
      subMenu: '',
      page: `Earlier Approval details under RUSA`,
      value: this.nmdcRUSA,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Preamble`,
      subMenu: '',
      page: `Higher Education Institution`,
      value: this.nmdcHigher,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Basic Information`,
      subMenu: '',
      page: `About MDC/Land`,
      value: this.nmdcAbout,
      status: false
    }, {
      module: this.module['5'],
      menu: `Basic Information`,
      subMenu: '',
      page: `Building Construction`,
      value: this.nmdcBuilding,
      status: false
    }, {
      module: this.module['5'],
      menu: `Basic Information`,
      subMenu: '',
      page: `Equipment`,
      value: this.nmdcEquipment,
      status: false
    }, {
      module: this.module['5'],
      menu: `Academic & Administrative Details`,
      subMenu: '',
      page: `Department`,
      value: this.nmdcDepartment,
      status: false
    }, {
      module: this.module['5'],
      menu: `Academic & Administrative Details`,
      subMenu: '',
      page: `Course`,
      value: this.nmdcProgram,
      status: false
    }, {
      module: this.module['5'],
      menu: `Academic & Administrative Details`,
      subMenu: '',
      page: `Teaching`,
      value: this.nmdcTeaching,
      status: false
    }, {
      module: this.module['5'],
      menu: `Academic & Administrative Details`,
      subMenu: '',
      page: `Non-Teaching`,
      value: this.nmdcNonTIF,
      status: false
    }, {
      module: this.module['5'],
      menu: `Academic & Administrative Details`,
      subMenu: '',
      page: `Proposed Outcomes`,
      value: this.nmdcOutcome,
      status: false
    }, {
      module: this.module['5'],
      menu: `Academic & Administrative Details`,
      subMenu: '',
      page: `Anticipated Enrolment`,
      value: this.nmdcEnrol,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Academic & Administrative Details`,
      subMenu: '',
      page: `Facility`,
      value: this.nmdcFacility,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Physical & Financial Details`,
      subMenu: '',
      page: `Physical Estimates`,
      value: this.nmdcPhysical,
      status: false
    }, {
      module: this.module['5'],
      menu: `Physical & Financial Details`,
      subMenu: '',
      page: `Financial Estimates`,
      value: this.nmdcFinancialEstimate,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Physical & Financial Details`,
      subMenu: '',
      page: `Other Sources`,
      value: this.nmdcBasicOtherSource,
      status: false
    }, {
      module: this.module['5'],
      menu: `Plan & Commitments`,
      subMenu: '',
      page: `Infra Timeline`,
      value: this.nmdcInfraTimeLine,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Plan & Commitments`,
      subMenu: '',
      page: `Academic Timeline`,
      value: this.nmdcAcademic,
      status: false
    },
    {
      module: this.module['5'],
      menu: `Activity Details`,
      subMenu: '',
      page: `Activity Details`,
      value: this.nmdcActivity,
      status: false
    },
  ]

  public RevisionMenu = [
    {
     module: this.module['1'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infrastructure Construction`,
     value: this.strengthClgInfraCons,
     status: false,
     compName: ''
   }, {
     module: this.module['1'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infra Renovation/Upgradation`,
     value: this.strengthClgReno,
     status: false,
     compName: ''
   }, {
     module: this.module['1'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Equipment Procured`,
     value: this.strengthClgEquip,
     status: false,
     compName: ''
   }, {
     module: this.module['1'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Soft Component`,
     value: this.strengthClgSoft,
     status: false,
     compName: ''
   },
    {
     module: this.module['1'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Completion Timeline`,
     value: this.strengthClgTimeline,
     status: false,
     compName: ''
   }, 
   {
    module: this.module['1'],
    menu: `Proposal Details`,
    subMenu: '',
    page: `Financial Estimates`,
    value: this.strengthClgFinance,
    status: false,
    compName: ''
    }, 
    {
     module: this.module['1'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Proposed Outcomes`,
     value: this.strengthClgOutCome,
     status: false,
     compName: ''
   },
   {
     module: this.module['1'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Other Information`,
     value: this.strengthClgOtherInfo,
     status: false,
     compName: ''
   },
   {
     module: this.module['2'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infrastructure Construction`,
     value: this.strengthUnivInfraCons,
     status: false,
     compName: ''
   }, {
     module: this.module['2'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infra Renovation/Upgradation`,
     value: this.strengthUnivReno,
     status: false,
     compName: ''
   }, {
     module: this.module['2'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Equipment Procured`,
     value: this.strengthUnivEquip,
     status: false,
     compName: ''
   }, {
     module: this.module['2'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Soft Component`,
     value: this.strengthUnivSoft,
     status: false,
     compName: ''
   },
   {
     module: this.module['2'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Completion Timeline`,
     value: this.strengthUnivTimeline,
     status: false,
     compName: ''
   },
   {
    module: this.module['2'],
    menu: `Proposal Details`,
    subMenu: '',
    page: `Financial Estimates`,
    value: this.strengthUnivFinance,
    status: false,
    compName: ''
    }, 
   {
     module: this.module['2'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Proposed Outcomes`,
     value: this.strengthUnivOutCome,
     status: false,
     compName: ''
   },
   {
     module: this.module['2'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Other Information`,
     value: this.strengthUnivOtherInfo,
     status: false,
     compName: ''
   },
    {
     module: this.module['3'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infrastructure Construction`,
     value: this.meruInfrastructureConstruction,
     status: false,
     compName: ''
   }, {
     module: this.module['3'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infra Renovation/Upgradation`,
     value: this.meruRenovation,
     status: false,
     compName: ''
   }, {
     module: this.module['3'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Equipment Procured`,
     value: this.meruEquipment,
     status: false,
     compName: ''
   }, {
     module: this.module['3'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Soft Component`,
     value: this.meruSoftComponent,
     status: false,
     compName: ''
   },
   {
     module: this.module['3'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Completion Timeline`,
     value: this.meruTimeLine,
     status: false,
     compName: ''
   },
   {
    module: this.module['3'],
    menu: `Proposal Details`,
    subMenu: '',
    page: `Financial Estimates`,
    value: this.meruFinancial,
    status: false,
    compName: ''
  },
   {
     module: this.module['3'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Proposed Outcomes`,
     value: this.meruProposedOutcome,
     status: false,
     compName: ''
   },
   {
     module: this.module['3'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Other Information`,
     value: this.meruProposedOtherInfor,
     status: false,
     compName: ''
   }, {
     module: this.module['3'],
     menu: `Activity Details`,
     subMenu: '',
     page: `Activity Detail`,
     value: this.meruActivity,
     status: false,
     compName: ''
   },
   {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infrastructure Construction`,
     value: this.genderEquityInfroConstruction,
     status: false
   }, {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Infra Renovation/Upgradation`,
     value: this.genderEquityInfroRenovation,
     status: false
   }, {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Equipment Procured`,
     value: this.genderEquityEquipmint,
     status: false
   }, {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Workshop Programme`,
     value: this.genderEquityWorkshops,
     status: false
   }, {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Remedial Classes`,
     value: this.genderEquityRemedial,
     status: false
   },
   {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Activities for Improving Vocationalisation & Skilling`,
     value: this.genderEquityImprovingVocationalSkilling,
     status: false
   }, {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Other Activity`,
     value: this.genderEquityOtherActivity,
     status: false
   }, {
     module: this.module['4'],
     menu: `Proposal Details`,
     subMenu: '',
     page: `Completion Timeline`,
     value: this.genderEquityTimeLine,
     status: false
   },
   {
    module: this.module['4'],
    menu: `Proposal Details`,
    subMenu: '',
    page: `Financial Estimates`,
    value: this.genderEquityFinancial,
    status: false
  },
   {
     module: this.module['4'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Proposed Outcomes`,
     value: this.genderEquityOutComes,
     status: false
   }, 
  //  {
  //    module: this.module['4'],
  //    menu: `Proposed Outcomes & Other Sources`,
  //    subMenu: '',
  //    page: `Other Source of funds`,
  //    value: this.strengthUnivOtherInfo,
  //    status: false
  //  },
   {
     module: this.module['4'],
     menu: `Proposed Outcomes & Other Sources`,
     subMenu: '',
     page: `Other Information`,
     value: this.genderEquityOtherSourceFunds,
     status: false
   }, {
     module: this.module['4'],
     menu: `Activity Details`,
     subMenu: '',
     page: `Activity Details`,
     value: this.genderEquityActivity,
     status: false
   },
  
  // {
  //   module: this.module['5'],
  //   menu: `Basic Information`,
  //   subMenu: '',
  //   page: `About MDC/Land`,
  //   value: this.nmdcAbout,
  //   status: false
  // }, 
  {
    module: this.module['5'],
    menu: `Basic Information`,
    subMenu: '',
    page: `Building Construction`,
    value: this.nmdcBuilding,
    status: false
  }, {
    module: this.module['5'],
    menu: `Basic Information`,
    subMenu: '',
    page: `Equipment`,
    value: this.nmdcEquipment,
    status: false
  }, 
  // {
  //   module: this.module['5'],
  //   menu: `Academic & Administrative Details`,
  //   subMenu: '',
  //   page: `Department`,
  //   value: this.nmdcDepartment,
  //   status: false
  // }, {
  //   module: this.module['5'],
  //   menu: `Academic & Administrative Details`,
  //   subMenu: '',
  //   page: `Course`,
  //   value: this.nmdcProgram,
  //   status: false
  // }, {
  //   module: this.module['5'],
  //   menu: `Academic & Administrative Details`,
  //   subMenu: '',
  //   page: `Teaching`,
  //   value: this.nmdcTeaching,
  //   status: false
  // }, {
  //   module: this.module['5'],
  //   menu: `Academic & Administrative Details`,
  //   subMenu: '',
  //   page: `Non-Teaching`,
  //   value: this.nmdcNonTIF,
  //   status: false
  // }, {
  //   module: this.module['5'],
  //   menu: `Academic & Administrative Details`,
  //   subMenu: '',
  //   page: `Proposed Outcomes`,
  //   value: this.nmdcOutcome,
  //   status: false
  // }, {
  //   module: this.module['5'],
  //   menu: `Academic & Administrative Details`,
  //   subMenu: '',
  //   page: `Anticipated Enrolment`,
  //   value: this.nmdcEnrol,
  //   status: false
  // },
  // {
  //   module: this.module['5'],
  //   menu: `Academic & Administrative Details`,
  //   subMenu: '',
  //   page: `Facility`,
  //   value: this.nmdcFacility,
  //   status: false
  // },
  // {
  //   module: this.module['5'],
  //   menu: `Physical & Financial Details`,
  //   subMenu: '',
  //   page: `Physical Estimates`,
  //   value: this.nmdcPhysical,
  //   status: false
  // }, {
  //   module: this.module['5'],
  //   menu: `Physical & Financial Details`,
  //   subMenu: '',
  //   page: `Financial Estimates`,
  //   value: this.nmdcFinancialEstimate,
  //   status: false
  // },
  // {
  //   module: this.module['5'],
  //   menu: `Physical & Financial Details`,
  //   subMenu: '',
  //   page: `Other Sources`,
  //   value: this.nmdcBasicOtherSource,
  //   status: false
  // }, 
  {
    module: this.module['5'],
    menu: `Plan & Commitments`,
    subMenu: '',
    page: `Infra Timeline`,
    value: this.nmdcInfraTimeLine,
    status: false
  },
  // {
  //   module: this.module['5'],
  //   menu: `Plan & Commitments`,
  //   subMenu: '',
  //   page: `Academic Timeline`,
  //   value: this.nmdcAcademic,
  //   status: false
  // },
  // {
  //   module: this.module['5'],
  //   menu: `Activity Details`,
  //   subMenu: '',
  //   page: `Activity Details`,
  //   value: this.nmdcActivity,
  //   status: false
  // },
 ]

  async esign(payload) {
    return new Promise((resolve, reject) => {
      this.get.getFundReport(payload).subscribe(res => {
        if (res.byteData) {
          return resolve(res);

        }
      }, err => {
        reject(err)
      })
    })

  }
  async generateXML(obj) {
    return new Promise((resolve, reject) => {
      const formdata: FormData = new FormData();
      if (obj.esignBlob) {
        formdata.append('file', obj.esignBlob, obj.myFilesName);
      }

      this.postService.generateXMLServiceFund(obj, formdata).subscribe(res => {
        return resolve(res)

      }, err => {
        reject(err)
      })
    })
  }

}
