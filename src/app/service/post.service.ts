import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*"
  })
};
@Injectable({
  providedIn: "root"
})
export class PostService {
  getImageUrl(documentId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(public http: HttpClient) {}
  saveNMDCHEIData(data, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/district-hei-detail?menu=${menu}`,
      data
    );
  }
  saveNmdcBasic(data, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/ndmc-basic-detail?menu=${menu}`,
      data
    );
  }
  postNmdcFacility(data, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/nmdc-facility?menu=${menu}`,
      data
    );
  }
  saveInfrastructureData(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/infrastructure_construction?menu=${menu}`,
      data
    );
  }
  saveEquipmentData(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/equipment?menu=${menu}`,
      data
    );
  }
  saveDepartment(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/department?menu=${menu}`,
      data
    );
  }
  postProposalCourse(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/proposed-course?menu=${menu}`,
      data
    );
  }
  postNonTeachingSaff(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/non-teaching-staff-detail?menu=${menu}`,
      data
    );
  }
  saveTIF(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/proposed-teaching-staff-detail?menu=${menu}`,
      data
    );
  }
  postOutCome(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/proposed-outcome?menu=${menu}`,
      data
    );
  }

  postAnticipated(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/anticipated-enrollment?menu=${menu}`,
      data
    );
  }
  collegeUnivOtherSource(
    data,
    undertakingNoDuplicationExpenditure,
    menu
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/other-source-of-fund?undertakingNoDuplicationExpenditure=${undertakingNoDuplicationExpenditure}&menu=${menu}`,
      data
    );
  }
  postNMDCOtherSource(
    data,
    undertakingNoDuplicationExpenditure,
    menu
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/other-source-of-fund?undertakingNoDuplicationExpenditure=${undertakingNoDuplicationExpenditure}&menu=${menu}`,
      data
    );
  }
  postFinancial(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/year_wise_financial_estimate_for_activity-common?menu=${menu}`,
      data
    );
  }
  saveAcademic(data, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/academic-admin-timeline?menu=${menu}`,
      data
    );
  }
  unlockState(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}module/proposal-action`,
      data
    );
  }
  postUpdates(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/user-master?isUpdated=true`,
      data
    );
  }

  postNmdcRUSAData(
    data: any,
    formdata: any,
    instituteCategory: any,
    componentId: any,
    menu: any,
    indicatorStatus: any
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/earlier-approval-under-rusa?id=${data.id}&centralShareApproved=${data.centralShareApproved}&centralShareReleased=${data.centralShareReleased}&instituteCategory=${instituteCategory}&centralShareUtilised=${data.centralShareUtilised}&componentId=${componentId}&districtCode=${sessionStorage.getItem(
        "districtCode"
      )}&documentId=${data.documentId == null
        ? 0
        : data.documentId}&isCompletionCertificateUploaded=${data.isWholeProjectCompleted}&isWholeProjectCompleted=${data.isWholeProjectCompleted}&percentageCompletionProject=${data.percentageCompletionProject}&rusaComponentName=${data.rusaComponentName}&stateCode=${sessionStorage.getItem(
        "stateCode"
      )}&stateShareApproved=${data.stateShareApproved}&stateShareReleased=${data.stateShareReleased}&stateShareUtilised=${data.stateShareUtilised}&totalAmountApproved=${data.totalAmountApproved}&totalAmountReleased=${data.totalAmountReleased}&totalAmountUtilised=${data.totalAmountUtilised}&isInstitutionApprovedUnderRusa=true&proposalScoreBaseIndicator=${data.proposalScoreBaseIndicator}&menu=${menu}&indicatorStatus=${indicatorStatus}`,
      formdata
    );
  }
  saveActivityFacility(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}meru/meru-available-facility?menu=${menu}`,
      data
    );
  }
  calculateScore(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}module/final-submit`,
      data
    );
  }

  saveInfraConstructionGender(
    payload: any,
    componentId,
    stateCode,
    districtCode,
    menu: any,
    formdata
  ): Observable<any> {
    return this.http.post(
      `${environment.baseURL}equity/equity-infrastructure_construction?id=${payload.id}&componentId=${componentId}&description=${payload.description}&districtCode=${districtCode}&justification=${payload.justification}&location=${payload.location}&perUnitCost=${payload.perUnitCost ===
      null
        ? ""
        : payload.perUnitCost === "null"
          ? ""
          : payload.perUnitCost}&proposedArea=${payload.proposedArea}&purpose=${payload.purpose}&stateCode=${stateCode}&totalCost=${payload.totalCost}&pabStatus=${payload.pabStatus}&recordStatusId=${payload.recordStatusId ==
      null
        ? ""
        : payload.recordStatusId}&menu=${menu}`,
      formdata
    );
  }

  // saveInfraConstructionGenderRevision(
  //   payload: any,
  //   componentId,
  //   stateCode,
  //   districtCode,
  //   menu: any,
  //   formdata
  // ): Observable<any> {
  //   return this.http.post(
  //     `${environment.baseURL}equity/equity-infrastructure_construction?id=${payload.id}&componentId=${componentId}&description=${payload.description}&districtCode=${districtCode}&justification=${payload.justification}&location=${payload.location}&perUnitCost=${payload.perUnitCost === null ? "" : payload.perUnitCost === "null" ? "" : payload.perUnitCost}&proposedArea=${payload.proposedArea}&purpose=${payload.purpose}&stateCode=${stateCode}&totalCost=${payload.totalCost}&oldId=${payload.oldId}&pabStatus=${payload.pabStatus}&recordStatusId=${payload.recordStatusId == null ? "" : payload.recordStatusId}&menu=${menu}`,
  //     formdata
  //   );
  // }
  saveInfraConstructionGenderRevision(
  payload: any,
  componentId: any,
  stateCode: any,
  districtCode: any,
  menu: any,
  formData: FormData
): Observable<any> {

  let params = new HttpParams()
    .set('id', payload.id ?? '')
    .set('componentId', componentId)
    .set('description', payload.description ?? '')
    .set('districtCode', districtCode)
    .set('justification', payload.justification ?? '')
    .set('location', payload.location ?? '')
    .set('perUnitCost', payload.perUnitCost && payload.perUnitCost !== 'null' ? payload.perUnitCost : '')
    .set('proposedArea', payload.proposedArea ?? '')
    .set('purpose', payload.purpose ?? '')
    .set('stateCode', stateCode)
    .set('totalCost', payload.totalCost ?? '')
    .set('oldId', payload.oldId ?? '')
    .set('pabStatus', payload.pabStatus ?? '')
    .set('recordStatusId', payload.recordStatusId ?? '')
    .set('menu', menu)

    // ✅ newly added fields
    .set('rsV3', payload.rsV3?.id ?? '')
    .set('oldIdV3', payload.oldIdV3?.id ?? '')
    .set('v1', payload.v1 ?? '')
    .set('v2', payload.v2 ?? '')
    .set('v3', payload.v3 ?? '');

  return this.http.post(
    `${environment.baseURL}equity/equity-infrastructure_construction`,
    formData,
    { params }
  );
}



  saveInfraConstructionGenderRevisionV3(key:Params,
    componentId,
    stateCode,
    districtCode,
    menu: any,
    formdata
  ): Observable<any> {
    return this.http.post(
      `${environment.baseURL}equity/equity-infrastructure_construction?` + key + `&menu=${menu}`,
      formdata
    );
  }

  

  saveFundPrposelRemarks(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}submit-tab-data?stateFundBriefDetailId=${data.stateFundBriefDetailId}&tabId=${data.tabId}&status=${data.status}&overallRemarksProposalFromStateUt=${data.overallRemarksProposalFromStateUt}&numberRusa1Institution=${data.numberRusa1Institution}&numnberRusa2Institution=${data.numnberRusa2Institution}&numberPmushaInstitution=${data.numberPmushaInstitution}&rusa1CentralShareDemand=${data.rusa1CentralShareDemand}&rusa2CentralShareDemand=${data.rusa2CentralShareDemand}&pmushaCentralShareDemand=${data.pmushaCentralShareDemand}`,
      data
    );
  }
  saveBoolean(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/indicator-tab-status`,
      payload
    );
  }
  saveRusaLegacy(payload, formData, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/rusa-legacy-data?aisheCode=${payload.aisheCode}&componentName=${payload.componentName}&isCompletionCertificateUploaded=${payload.isCompletionCertificateUploaded}&percentageCompletionProject=${payload.percentageCompletionProject}&isWholeProjectCompleted=${payload.isWholeProjectCompleted}&id=${payload.id}&componentId=${payload.componentId}&stateId=${payload.stateId}&districtId=${payload.districtId}&rusaPhase=${payload.rusaPhase}&documentId=${payload.documentId}&institutionName=${payload.institutionName}&totalUtilisation=${payload.totalUtilisation}&totalAmountReleased=${payload.totalAmountReleased}&totalAmountApproved=${payload.totalAmountApproved}&stateShareUtilised=${payload.stateShareUtilised}&stateShareReleased=${payload.stateShareReleased}&stateShareApproved=${payload.stateShareApproved}&centralShareUtilised=${payload.centralShareUtilised}&centralShareReleased=${payload.centralShareReleased}&centralShareApproved=${payload.centralShareApproved}&remarks=${payload.remarks}&menu=${menu}&isLocked=false`,
      formData
    );
  }
  saveRusaProgress(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/rusa-monthly-progress`,
      payload
    );
  }

  saveAisheCode(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/rusa-monthly-progress`,
      payload
    );
  }
  saveFinalDocumentUC(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}submit-tab-data?tabId=6&status=true&stateCode=${payload.stateCode}&financialYear=${payload.financialYear}&quarter=${payload.quarter}`,
      payload
    );
  }

  saveDocumentUC(payload, formData) {
    return this.http.post<any>(
      `${environment.baseURL}institute/document-save?componentId=${payload.componentId}&stateCode=${payload.stateCode}&documentTypeId=${payload.documentTypeId}&financialYear=${payload.financialYear}&quarter=${payload.quarter}`,
      formData
    );
  }
  saveDocument(payload, formData): Observable<any> {
    if (!payload.stateFundRequestDetailId) {
      return this.http.post<any>(
        `${environment.baseURL}institute/document-save?documentId=${payload.documentId}&componentId=${payload.componentId}&stateCode=${payload.stateCode}&documentTypeId=${payload.documentTypeId}`,
        formData
      );
    }
    if (payload.documentId !== 0) {
      return this.http.post<any>(
        `${environment.baseURL}institute/document-save?documentId=${payload.documentId}&componentId=${payload.componentId}&stateCode=${payload.stateCode}&documentTypeId=${payload.documentTypeId}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}`,
        formData
      );
    }
    if (payload.financialYear && payload.quarter) {
      return this.http.post<any>(
        `${environment.baseURL}institute/document-save?componentId=${payload.componentId}&stateCode=${payload.stateCode}&documentTypeId=${payload.documentTypeId}&financialYear=${payload.financialYear}&quarter=${payload.quarter}`,
        formData
      );
    }

    return this.http.post<any>(
      `${environment.baseURL}institute/document-save?componentId=${payload.componentId}&stateCode=${payload.stateCode}&documentTypeId=${payload.documentTypeId}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}`,
      formData
    );
  }
  saveDocumentExcel(payload, formData) {
    return this.http.post<any>(
      `${environment.baseURL}ias-mapped-pfms?stateCode=${payload.stateCode}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}&ifdChecklistId=${payload.ifdChecklistId}`,
      formData
    );
  }

  saveIfd(payload: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}submit-tab-data?stateFundBriefDetailId=${payload.stateFundBriefDetailId}&tabId=${payload.tabId}&status=true`,
      payload
    );
  }

  lockRusaProgress(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/rusa-monthly-progress-lock-status`,
      payload
    );
  }

  lockPmUshaProgress(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/pmusha-monthly-progress-lock-status`,
      payload
    );
  }

  lockForwardPmUshaProgress(payload, dataObject): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/pmusha-forwarded_to_npd-status?rusaMonthlyProgressLockStatusId=${payload.rusaMonthlyProgressLockStatusId}&year=${payload.year}&month=${payload.month}`,dataObject
    );
  }

  lockRusaLegecy(menu) {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/rusa-legacy-data?menu=${menu}&isLocked=true`,
      httpOptions
    );
  }
  postRUSAData(menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/approval-under-rusa?menu=${menu}`,
      httpOptions
    );
  }
  sendEmail(email: string, latestId: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/send-otp-to-email?latestId=${latestId}&email=${email}`,
      httpOptions
    );
  }
  verifyEOTP(email: any, otp: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/verify-email-otp?email=${email}&otp=${otp}`,
      httpOptions
    ).pipe(
      timeout(1000),  // Sets the timeout to 1 second (1000 ms)
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          // Handle timeout error specifically
          console.error('The request timed out. Please try again.');
          return throwError(() => new Error('Request timed out. Please try again.'));
        }
        // Handle other types of errors
        console.error('An error occurred:', error.message);
        return throwError(() => error);
      })
    );;
  }




  sendMobile(mobile: string, latestId): Observable<any> {
    return this.http.post<any>(
      `${environment.otpUpdateUrl}auth/users/send-otp-to-mobile?latestId=${latestId}&mobileNumber=${mobile}`,
      httpOptions
    );
  }
  verifyMOTP(mobile: any, otp: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/verify-mobile-otp?mobile=${mobile}&otp=${otp}`,
      httpOptions
    ).pipe(
      timeout(1000),  // Sets the timeout to 1 second (1000 ms)
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          // Handle timeout error specifically
          console.error('The request timed out. Please try again.');
          return throwError(() => new Error('Request timed out. Please try again.'));
        }
        // Handle other types of errors
        console.error('An error occurred:', error.message);
        return throwError(() => error);
      })
    );
  }
  forgot(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/verifyforgotpassword`,
      payload
    );
  }

  postInactiveStatus(userId, data): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/update-user-status?status=${data}&userId=${userId}`,
      httpOptions
    );
  }
  uploadDocuments(payload, formData): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/document?id=${payload.id}&aisheCode=${payload.aisheCode}&componentId=${payload.componentId}&documentType=${payload.documentType}&meruActivityId=${payload.meruActivityId}`,
      formData
    );
  }

  uploadpirDocuments(payload, formData): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/document?id=${payload.id}&aisheCode=${payload.aisheCode}&componentId=${payload.componentId}&documentType=${payload.documentType}&month=${payload.month}&year=${payload.year}&rusaLegacyDataId=${payload.rusaLegacyDataId}&instituteCategory=${payload.instituteCategory}&districtCode=${payload.districtCode}&stateCode=${payload.stateCode}`,
      formData
    );
  }

  uploadDocumentsProposal(payload, formData): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/document?id=${payload.id}&aisheCode=${payload.aisheCode}&componentId=${payload.componentId}&documentType=${payload.documentType}`,
      formData
    );
  }
  uploadDocumentsProposalNMDC(payload, formData): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/document?id=${payload.id}&districtCode=${payload.districtCode}&componentId=${payload.componentId}&documentType=${payload.documentType}`,
      formData
    );
  }

  saveIfdChecklist(payload, formData): Observable<any> {
    //http://10.246.76.130/pmusha/ifd-checklist?Id=1&stateCode=211222&ifdChecklistId=2&remarks=2&stateFundRequestDetailId=2
    return this.http.post<any>(
      `${environment.baseURL}ifd-checklist?Id=${payload.Id}&stateCode=${payload.stateCode}&ifdChecklistId=${payload.ifdChecklistId}&remarks=${payload.remarks}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}`,
      formData
    );
    // return this.http.post<any>(`${environment.baseURL}ifd-checklist?`, key, formData)
  }
  lockProlife(): Observable<any> {
    let payload = { locked: true };
    return this.http.post<any>(
      `${environment.baseURL}state-profile/state-basic-detail?`,
      payload
    );
  }
  getUser(username: string): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/users/user-master-get?userId=${username}`,
      httpOptions
    );
  }

  getUserToken(username: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(
      `${environment.baseURL}auth/users/user-master-get?userId=${username}`,
      {}, // empty body
      { headers }
    );
  }
  getUserVerify(username: string): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/users/user-master-get-public?userId=${username}`,
      httpOptions
    );
  }
  getUserByType(userTypeId): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/users/user-master-get?userTypeId=${userTypeId}`,
      httpOptions
    );
  }
  getAllUser(stateCode): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/users/user-master-get?stateCode=${stateCode}`,
      httpOptions
    );
  }

  getAllViewUser(stateCode, userTypeId, isProjectApproved): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/users/user-master-get?stateCode=${stateCode}&userTypeId=${userTypeId==='ALL'?'':userTypeId}&isProjectApproved=${isProjectApproved}
`,
      httpOptions
    );
  }
  generateXMLService(
    userId: any,
    stateCode: any,
    formData,
    revisedProposal: boolean,
    componentId
  ): Observable<any> {
    if (revisedProposal) {
      return this.http.post(
        `${environment.baseURL}generate-xml?username=${userId}&stateCode=${stateCode}&revisedProposal=${revisedProposal}&componentId=${componentId}`,
        formData,
        { responseType: "text" }
      );
    } else {
      return this.http.post(
        `${environment.baseURL}generate-xml?username=${userId}&stateCode=${stateCode}`,
        formData,
        { responseType: "text" }
      );
    }
  }



  revisedGenerateXMLService(
    userId: any,
    stateCode: any,
    formData,
    revisedProposal: boolean,
    componentId,
    saaRevisedDpr:boolean
  ): Observable<any> {
      return this.http.post(
        `${environment.baseURL}generate-xml?username=${userId}&stateCode=${stateCode}&revisedProposal=${revisedProposal}&componentId=${componentId}&saaRevisedDpr=${saaRevisedDpr}`,
        formData,
        { responseType: "text" }
      );
  }


  generateXMLServiceFund(obj: any, formData): Observable<any> {
    return this.http.post(
      `${environment.baseURL}generate-xml-esign-fund-mgmt?username=${obj.username}&stateCode=${obj.stateCode}&stateFundRequestDetailId=${obj.stateFundRequestDetailId}&tabId=${obj.tabId}`,
      formData,
      { responseType: "text" }
    );
  }
  allotCons(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/assign-submitted-proposal-to-consultant?consultantUserId=${payload.consultantUserId}&finalProposalStatusId=${payload.finalProposalStatusId}&componentId=${payload.componentId}&stateCode=${payload.stateCode}`,
      httpOptions
    );
  }
  tesAcc(formData): Observable<any> {
    return this.http.post(`${environment.eSignGateway}`, formData);
  }
  saveRemarks(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/final-status-forward-by-consultant`,
      payload
    );
  }
  saveScoreComment(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}update-score-by-consultant`,
      payload
    );
  }
  savefacilityComment(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}update-meru-facility-by-consultant`,
      payload
    );
  }
  saveCostComment(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}update-cost-by-consultant`,
      payload
    );
  }

  saveOtherSource(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}update-other-source-fund-by-consultant?aisheCode=${payload.aisheCode}&componentId=${payload.componentId}&otherSourceOfFundGoi=${payload.otherSourceOfFundGoi}&otherSourceOfFundGoiRemark=${payload.otherSourceOfFundGoiRemark}`,
      httpOptions
    );
  }

  saveBasicScore(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}update-basic-by-consultant`,
      payload
    );
  }

  saveOverallRemarks(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/consultant-proposal-eligible`,
      payload
    );
  }

  saveActDetailsData(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/common-activity-details-save`,
      payload
    );
  }

  savePABActions(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/pab-action`,
      payload
    );
  }

  saveFundPrposel(payload): Observable<any> {
    return this.http.post(`${environment.baseURL}fund-proposal`, payload);
    //http://10.206.194.253:81/pmusha/fund-proposal saveProposal
  }

  saveBriefDetails(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}state-fund-brief-detail`,
      payload
    );
  }

  saveMonthlyProgressRemark(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/users/pm-usha-monthly-progress`,
      payload
    );
  }


  savePMushaMonthlyFinancialProgress(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}state-profile/pmusha-monthly-financial-progress`,
      payload
    );
  }

  latLong(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/update-latitutde-longitude?proposalActivityId=${payload.proposalActivityId}&id=${payload.id}&latitude=${payload.latitude}&longitude=${payload.longitude}`,
      httpOptions
    );
  }


  updateExp(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}state-profile/update-expenditure?stateCode=${payload.stateCode}&month=${payload.month}&year=${payload.year}`,
      httpOptions
    );
  }
  saveFinicialProgressRemark(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}pm-usha-financial-monthly-progress`,
      payload
    );
  }
  postUCData(payload: any): Observable<any> {
    return this.http.post(`${environment.baseURL}state-uc-detail`, payload);
  }
  //https://demo.he.nic.in/pmusha/state-uc-detail postUCData
  // aisheCode: this.aisheCode,
  // componentId: this.componentId,
  // otherSourceOfFundGoi: this.outForm.value.otherSourceOfFundGoi,
  // otherSourceOfFundGoiRemark: this.outForm.value.otherSourceOfFundGoiRemark,
  saveEvent(payload: any): Observable<any> {
    return this.http.post(`${environment.baseURL}event-detail`, payload);
  }

  saveMinistryDocument(payload: any): Observable<any> {
    return this.http.post(`${environment.baseURL}ministry-document`, payload);
  }


  // saveUCDocument(payload: any, formdata): Observable<any> {
  //   return this.http.post(`${environment.baseURL}/institute/audit-uc-document`, payload, formdata);
  // }



  saveUCDocument(payload, formData): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/audit-uc-document?Id=${payload.Id}&state=${payload.state}&year=${payload.year}&fromDate=${payload.fromDate}&toDate=${payload.toDate}&documentId=${payload.documentId}&isActive=${payload.isActive}&yearOld=${payload.yearOld}&toDateOld=${payload.toDateOld}&fromDateOld=${payload.fromDateOld}&stateOld=${payload.stateOld}`,
      formData
    );

  }

  saveSanctionDocument(formData): Observable<any> {
    // return this.http.post<any>(`${environment.baseURL}institute/sanction-document?sanctionData?` + key, formData)
    return this.http.post<any>(
      `${environment.baseURL}institute/sanction-document`,formData
    );
  }

  saveStateIssue(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/state_issue`,
      payload
    );
  }





  savefinicialData(payload: any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}ifd-state-central-release-since-inception-rusa`,
      payload
    );
  }

  saveInstituteDocument(payload, formdata): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/document?componentId=${payload.componentId}&documentType=${payload.documentTypeId}&id=${payload.id}`,
      formdata
    );
  }

  updateFundData(id): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}update-state-fund-brief-detail-with-rusa?stateFundBriefDetailId=${id}`,
      id
    );
  }
  saveifdCheckListData(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}ifd-checklist-detail`,
      payload
    );
  }

  

  updateCostonEsign(id): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/update-cost-on-esign?transactionId=${id}`,
      id
    );
  }

  saveTagging(data:any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/proposal-item-tagging`,
      data
    );
  }

  // emailManagement(payload):Observable<any>{
   
  //   return this.http.post(
  //     `${environment.baseURL}auth/users/send-email-to-sno-saa?year=${payload.year}&month=${payload.month}`,
  //     httpOptions
    
  //   )
  //   // https://demo.he.nic.in/pmusha/auth/users/send-email-to-sno-saa?year=2025&month=2
  // }
  emailManagement(payload): Observable<any> {
    const headers = {
      skipLoader: 'true'
    };
  
    return this.http.post(
      `${environment.baseURL}auth/users/send-email-to-sno-saa?year=${payload.year}&month=${payload.month}`,
      httpOptions,
      { headers }
    );
  }
  checkEmailContent(payload):Observable<any>{
    return this.http.post(
      `${environment.baseURL}auth/users/check-email-content-for-sno-saa?stateCode=${payload.stateCode}&year=${payload.year}&month=${payload.month}`,
      httpOptions
    
    )
  }
  lockTagging(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/final-proposal-item-tagging-status`,
      payload
    );
  }

   savePhotoDocument(payload, formdata): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/photo-document?id=${payload.id}&stateCode=${payload.stateCode}&districtCode=${payload.districtCode}&instituteCategory=${payload.instituteCategory}&aisheCode=${payload.aisheCode}&componentId=${payload.componentId}&documentType=${payload.documentType}&proposalActivityId=${payload.proposalActivityId}&primaryId=${payload.primaryId}`,
      formdata
    );
  }

  saveInfraConstruction(payload:any,menu:any):Observable<any>{
    const dada=[...payload];
    return this.http.post(`institute/infrastructure_construction?menu=${menu}`,payload);
  }

postQuarterlyTarget(payload:any, lockOrForwarded): Observable<any> {
    return this.http.post(
      `${environment.baseURL}pmusha-quarterly-target?lockOrForwarded=${lockOrForwarded}`,
      payload
    );
  }


 



  postAchievement(payload, lockOrForwarded): Observable<any> {
    return this.http.post(
      `${environment.baseURL}pmusha-quarterly-achievement?lockOrForwarded=${lockOrForwarded}`,
      payload
    );
  }


  postQuarterlyAchievement(payload): Observable<any> {
    return this.http.post(
      `${environment.baseURL}pmusha-quarterly-mooc-target-achievement`,
      payload
    );
  }

  sendEmailToNadals(file: any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}email/send-email-to-any`,
      file,
      httpOptions
    );
  }

}
