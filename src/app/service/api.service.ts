import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  }),
};
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(public http: HttpClient, private encrypt: EncryptDecrypt) { }

  verifyGetCaptcha(text: any, encodeCaptcha: any): Observable<any> {
    return this.http.get(
      environment.baseUrlCaptcha +
      `verifycaptchaaishe?captchaText=${text}&data=${encodeCaptcha}`
    );
  }

  saveFocusDis(payload: any, menu, isLocked: boolean): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/focus-district-save?focusDistrictUnderTaking=true&menu=${menu}&isLocked=${isLocked}`,
      payload
    );
  }

  saveActivityData(payload: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/common-activity-details?menu=${menu}`,
      payload
    );
  }

  saveComponentMapping(payload: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/component-institute-mapping`,
      payload
    );
  }

  saveBasicdata(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/state-basic-detail?`,
      data
    );
  }
  saveBasicdataPopulation(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/state-basic-detail?&stateCode=${data.stateCode}`,
      data
    );
  }
  getPopulation(stateCode): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseURL}state-profile?stateCode=${stateCode}`
    );
  }
  postBasicState(data: any, date: any, categoryofState, menu, formdata: any, stateCode: any, roleofSHECunderPMUSHA: any, remarks: any, locked: boolean): Observable<any> {
    return this.http.post(
      `${environment.baseURL}state-profile?lastFiveMeetingsShec=${date.datesofmeetings1}&lastFiveMeetingsShec=${date.datesofmeetings2}
    &lastFiveMeetingsShec=${date.datesofmeetings3}&lastFiveMeetingsShec=${date.datesofmeetings4}&lastFiveMeetingsShec=${date.datesofmeetings5}
    &id=${data.id}&shecDate=${date.dateofFormation}&fundingRatio=${data.fundingRatiounderPMUSHA}&isFormedThroughActOrNotification=${data.formedthroughAct}
    &isShec=${data.statehaveSHEC}&roleOfShec=${roleofSHECunderPMUSHA}&stateCategoryName=${categoryofState?.categoryName}
    &stateCategoryId=${categoryofState?.id}&stateCode=${stateCode}&remarks=${remarks}&isLocked=${locked}&menu=${menu}`,
      formdata
    );
  }

  stateCategory(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}auth/users/ref-state_category`
    );
  }

  districtIndicator(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}auth/users/ref-district-indicator`
    );
  }
  focusDisIndentifier(stateCode): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}state-profile/focus-district-indicator-data?stateCode=${stateCode}`
    );
  }
  focusDisIndentifier1(stateCode): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}state-profile/focus-district-new?stateCode=${stateCode}`
    );
  }

  getInstituteHigherData(districtCode): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL
      }state-profile/he-focus-district-functional?districtCode=${districtCode ? districtCode : ""
      }`
    );
  }

  getNacc(stateCode): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}state-profile/state-naac-accreditation-details-new?stateCode=${stateCode}`
    );
  }

  getStateProfileList(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-state`);
  }
  finalProposalState(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/final-proposal-status-state`);
  }
  getStateProfileDetails(data: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}state-profile?stateCode=${data}`
    );
  }
  getInstituteDataList(stateCode): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}state-profile/functional-and-tobe-functional-inst-count?stateCode=${stateCode}`
    );
  }
  getDepartment(
    aisheCode: string,
    instituteCategory: string,
    componentId
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/department?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`
    );
  }

  getCollegeDetails(
    aisheCode: string,
    category: string,
    componentId
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/basic-detail?aisheCode=${encryptedAishe}&instituteCategory=${category}&componentId=${componentId}`
    );
  }
  getCourse(
    aisheCode: string,
    instituteCategory: string,
    componentId
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/course?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`
    );
  }

  getLevel(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}auth/users/ref-course-level`
    );
  }
  getProgramme(level: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}auth/users/ref-programme?levelId=${level}`
    );
  }
  getPageStatus(componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}module?componentId=${componentId}`);
  }
  getVocationalData(
    aisheCode: any,
    instituteCategory: string
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}equity/proposed-activity-detail-for-improving-skill?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}`
    );
  }

  getInfraCnstructionRevision(
    aisheCode: any,
    instituteType: any,
    componentId,
    district, addId
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/infrastructure_construction?aisheCode=${encryptedAishe}&pabStatus=${addId}&districtCode=${district}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
  
  getInfraCnstructionRevisionV3(
    componentId,
    district, addId
  ): Observable<any> {
    return this.http.get(
      `${environment.baseURL}institute/infrastructure_construction?pabStatus=${addId}&districtCode=${district}&componentId=${componentId}`
    );
  }
  getInfraCnstruction(
    aisheCode: any,
    instituteType: any,
    componentId
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/infrastructure_construction?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
  getEquityList(districtCode: string, componentId: any): Observable<any> {
    //basic-detail?districtCode=665&componentId=5
    return this.http.get<any>(
      `${environment.baseURL}equity/basic-detail?districtCode=${districtCode}&componentId=${componentId}`
    );
  }
  getGenderInclusion(districtCode: string, componentId: any): Observable<any> {
    ///equity/ger-data?districtCode=665&componentId=5
    return this.http.get<any>(
      `${environment.baseURL}equity/ger-data?districtCode=${districtCode}&componentId=${componentId}`
    );
  }

  getOtherInfoDetails(aisheCode, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/other-information?aisheCode=${encryptedAishe}&componentId=${componentId}`
    );
  }
  getDPRDoc(data:any): Observable<any>{
    const encryptedAishe = data.aisheCode ? this.encrypt.getEncryptedValue(data.aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/document-get?aisheCode=${encryptedAishe}&documentTypeId=${data.documentTypeId}&documentId=${data.documentId}`)
  }

  getDPRDocV3(data:any): Observable<any>{
    const encryptedAishe = data.aisheCode ? this.encrypt.getEncryptedValue(data.aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/document-get?aisheCode=${encryptedAishe}&documentTypeId=${data.documentTypeId}&documentId=${data.documentId}&componentId=${data.componentId}`)
  }
  getDPRDocDistrict(data:any): Observable<any>{
    return this.http.get<any>(`${environment.baseURL}institute/document-get?districtCode=${data.districtCode}&componentId=${data.componentId}&documentTypeId=${data.documentTypeId}&documentId=${data.documentId}`)
  }
  getDPRDocEquity(data:any): Observable<any>{
    return this.http.get<any>(`${environment.baseURL}institute/document-get?documentTypeId=${data.documentTypeId}&documentId=${data.documentId}`)
  }

  getPIRDoc(data:any): Observable<any>{
    const encryptedAishe = data.aisheCode ? this.encrypt.getEncryptedValue(data.aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/document-get?aisheCode=${encryptedAishe}&documentTypeId=${data.documentTypeId}&documentId=${data.documentId}`)
  }

    getAisheCode(data:any): Observable<any>{
    // const encryptedAishe = data.aisheCode ? this.encrypt.getEncryptedValue(data.aisheCode) : '';
    return this.http.get<any>(`https://api1.he.nic.in/aishehibernategetapi/institute-detail?aisheCode=${data.aisheCode}`)
  }


  getNonTeacherStaff(
    aisheCode: string,
    instituteCategory: string,
    componentId
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/non-teaching-staff-detail?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`
    );
  }

  //getFinancialEstimate/  getFinancialEstimateRevision
  getFinancialEstimateRevision(aisheCode: string, componentId,district,psbstatus): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/year_wise_financial_estimate_for_activity?aisheCode=${encryptedAishe}&pabStatus=${psbstatus}&districtCode=${district}&componentId=${componentId}&financial=true`
    );
  }
  getFinancialEstimate(aisheCode: string, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/year_wise_financial_estimate_for_activity?aisheCode=${encryptedAishe}&componentId=${componentId}&financial=true`
    );
  }
  //   getRUSAData(
  //     aisheCode: string,
  //     instituteCategory: string,
  //     componentId
  //   ): Observable<any> {
  //     return this.http.get(
  //       `${environment.baseURL}institute/earlier-approval-under-rusa?aisheCode=${aisheCode}&instituteCategory=${instituteCategory}&componentId=${componentId}`
  //     );
  //   }
  //   getRUSADataNew(
  //     aisheCode: string,
  //     instituteCategory: string,
  //     componentId
  //   ): Observable<any> {
  //  return this.http.get(
  //       `${environment.baseURL}state-profile/rusa-legacy-data?componentId=${componentId}&aisheCode=${aisheCode}&selectionType=UPDATED`
  //     );
  //   }
  //   getRUSADataNMDC(
  //     aisheCode: string,
  //     componentId
  //   ): Observable<any> {
  //     return this.http.get(
  //       `${environment.baseURL}state-profile/rusa-legacy-data?componentId=${componentId}&districtCode=${aisheCode}&selectionType=UPDATED`
  //     );
  //   }

  // getRUSAData1(
  //   districtCode: string,
  //   componentId
  // ): Observable<any> {
  //   return this.http.get(
  //     `${environment.baseURL}institute/earlier-approval-under-rusa?districtCode=${districtCode}&componentId=${componentId}`
  //   );
  // }
  //getSoftCompoenentListRevision
  getSoftCompoenentListRevision(
    aisheCode,
    instituteType,
    componentId,
    district,psbstatus
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/soft-component-activity?aisheCode=${encryptedAishe}&pabStatus=${psbstatus}&districtCode=${district}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
  getSoftCompoenentList(
    aisheCode,
    instituteType,
    componentId
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/soft-component-activity?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
  getUploadMou(stateCode: any): Observable<any> {
    return this.http.get(
      `${environment.baseURL}auth/users/mou-documents?stateCode=${stateCode}`
    );
  }
  getActivityDetails(aisheCode: any, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/common-activity-details?aisheCode=${encryptedAishe}&componentId=${componentId}`
    );
  }
  getActivityDetailsForGender(districtCode, componentId): Observable<any> {
    return this.http.get(
      `${environment.baseURL}institute/common-activity-details?districtCode=${districtCode}&componentId=${componentId}`
    );
  }

  getActivities(aisheCode: any, category): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}equity/proposed-other-activity-detail?aisheCode=${encryptedAishe}&instituteCategory=${category}`
    );
  }

  getInfraConsDetails(instituteCategory): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/infrastructure_construction?instituteCategory=${instituteCategory}`
    );
  }

  getUserTypeData(): Observable<any> {
    return this.http.get(`${environment.baseURL}auth/users/ref-user-type`);
  }

  getEquipmentDetails(instituteCategory): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/equipment?instituteCategory=${instituteCategory}`
    );
  }


  getPhaseCount(
    aisheCode: any,
    componentId: any,
    districtCode: any
  ): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(
      `${environment.baseURL}institute/phase-count?aisheCode=${encryptedAishe}&componentId=${componentId}&districtCode=${districtCode}`
    );
  }
  //getRenovatedListRevision

  getRenovatedListRevision(aisheCode, instituteType, componentId, district, psbstatus): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/infrastructure-renovation?aisheCode=${encryptedAishe}&pabStatus=${psbstatus}&districtCode=${district}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
    getRenovatedListRevisionV3(componentId, district, psbstatus): Observable<any> {
    return this.http.get(
      `${environment.baseURL}institute/infrastructure-renovation?pabStatus=${psbstatus}&districtCode=${district}&componentId=${componentId}`
    );
  }
  getRenovatedList(aisheCode, instituteType, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/infrastructure-renovation?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
  //getEquipmentListRevision
  getEquipmentListRevision(aisheCode, instituteType, componentId, district, pabstatus): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/equipment?aisheCode=${encryptedAishe}&pabStatus=${pabstatus}&districtCode=${district}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
  getEquipmentListRevisionV3(componentId, district, pabstatus): Observable<any> {
    return this.http.get(
      `${environment.baseURL}institute/equipment?pabStatus=${pabstatus}&districtCode=${district}&componentId=${componentId}`
    );
  }
  getWorkshopListRevisionV3(componentId, district, pabstatus): Observable<any> {
    return this.http.get(
      `${environment.baseURL}equity/workshop?pabStatusId=${pabstatus}&districtCode=${district}&componentId=${componentId}`
    );
  }
  getRemidalClassRevisionV3(componentId, district, pabstatus): Observable<any> {
    return this.http.get(
      `${environment.baseURL}equity/remedial-class?pabStatusId=${pabstatus}&districtCode=${district}&componentId=${componentId}`
    );
  }
  getVocationalRevisionV3(componentId, district, pabstatus): Observable<any> {
    return this.http.get(
      `${environment.baseURL}equity/proposed-activity-detail-for-improving-skill?pabStatusId=${pabstatus}&districtCode=${district}&componentId=${componentId}`
    );
  }
  getActivityRevisionV3(componentId, district, pabstatus): Observable<any> {
    return this.http.get(
      `${environment.baseURL}equity/proposed-other-activity-detail?pabStatusId=${pabstatus}&districtCode=${district}&componentId=${componentId}`
    );
  }
  getEquipmentList(aisheCode, instituteType, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/equipment?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`
    );
  }
  //basic-detail?districtCode=665&componentId=5
  getSoftCompoenentListGenderEquity(
    districtCode,
    componentId
  ): Observable<any> {
    return this.http.get(
      `${environment.baseURL}institute/soft-component-activity?districtCode=${districtCode}&componentId=${componentId}`
    );
  }

  getInfraConstructionGender(
    districtCode: any,
    componentId: any
  ): Observable<any> {
    return this.http.get(
      `${environment.baseURL}institute/infrastructure_construction?districtCode=${districtCode}&componentId=${componentId}`
    );
  }

  getInfraConstructionGenderRevision(
    districtCode: any,
    componentId: any,
    pabStatus: any
  ): Observable<any> {
    return this.http.get(
      `${environment.baseURL}institute/infrastructure_construction?districtCode=${districtCode}&componentId=${componentId}&pabStatus=${pabStatus}`
    );
  }

  getinfrastructureRenovationGenderEquityRevision(
    districtCode: string,
    componentId: any,
    pabStatus: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/infrastructure-renovation?districtCode=${districtCode}&componentId=${componentId}&pabStatus=${pabStatus}`
    );
  }
  getinfrastructureRenovationGenderEquity(
    districtCode: string,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/infrastructure-renovation?districtCode=${districtCode}&componentId=${componentId}`
    );
  }
  getEquipmentGenderEquity(
    districtCode: string,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/equipment?districtCode=${districtCode}&componentId=${componentId}`
    );
  }
  getEquipmentGenderEquityRevision(
    districtCode: string,
    componentId: any,
    pabStatus: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/equipment?districtCode=${districtCode}&componentId=${componentId}&pabStatus=${pabStatus}`
    );
  }

  getWorkshopGenderEquity(
    districtCode: string,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}equity/workshop?districtCode=${districtCode}&componentId=${componentId}`
    );
  }

  getWorkshopGenderEquityRevision(
    districtCode: string,
    componentId: any,
    pabStatus: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}equity/workshop?districtCode=${districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}`
    );
  }

  getRemedialClasssGenderEquity(
    districtCode: any,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}equity/remedial-class?districtCode=${districtCode}&componentId=${componentId}`
    );
  }
  getRemedialClasssGenderEquityRevision(
    districtCode: any,
    componentId: any,
    pabStatus: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}equity/remedial-class?districtCode=${districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}`
    );
  }
  getStemCourseDataGenderEquity(
    districtCode: any,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}equity/proposed-stem-course?districtCode=${districtCode}&componentId=${componentId}`
    );
  }

  getVocationalDataGenderEquity(
    districtCode: any,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}equity/proposed-activity-detail-for-improving-skill?districtCode=${districtCode}&componentId=${componentId}`
    );
  }
  getVocationalDataGenderEquityRevision(
    districtCode: any,
    componentId: any,
    pabStatus: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}equity/proposed-activity-detail-for-improving-skill?districtCode=${districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}`
    );
  }

  getActivitiesGenderEquity(districtCode: any, componentId): Observable<any> {
    return this.http.get(
      `${environment.baseURL}equity/proposed-other-activity-detail?districtCode=${districtCode}&componentId=${componentId}`
    );
  }
  getActivitiesGenderEquityRevision(districtCode: any, componentId, pabStatus: any): Observable<any> {
    return this.http.get(
      `${environment.baseURL}equity/proposed-other-activity-detail?districtCode=${districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}`
    );
  }
  getDataTimeGenderEquity(districtCode: string, componentId): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/proposal-timeline?districtCode=${districtCode}&componentId=${componentId}`
    );
  }
  getDataTimeGenderEquityRevision(districtCode: string, componentId, pabStatus: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/proposal-timeline?districtCode=${districtCode}&componentId=${componentId}&pabStatus=${pabStatus}`
    );
  }
  getFinancialEstimateGenderEquity(
    districtCode: string,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/year_wise_financial_estimate_for_activity?districtCode=${districtCode}&componentId=${componentId}&financial=true`
    );
  }
  getOutComeGenderEquity(
    districtCode: string,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/proposed-outcome?districtCode=${districtCode}&componentId=${componentId}`
    );
  }

  getOutComeGenderEquityRevision(
    districtCode: string,
    componentId: any,
    pabStatus: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/proposed-outcome?districtCode=${districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}`
    );
  }

  // --------------------------------------------------Post------------------------------------------------------------------------------

  saveAccreditationData(data, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/state-naac-accreditation-details-new?menu=${menu}`,
      data
    );
  }
  saveDisHigherData(payload: any, menu, isLocked): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/he-focus-district-functional?menu=${menu}&isLocked=${isLocked}`,
      payload
    );
  }
  saveDisHigherData1(payload: any, menu, isLocked, stateCode): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/he-focus-district-functional?menu=${menu}&isLocked=${isLocked}&stateCode=${stateCode}`,
      payload
    );
  }
  saveFocusDisIdentifier(payload: any, menu, isLocked): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}state-profile/focus-district-new?menu=${menu}&isLocked=${isLocked}`,
      payload
    );
  }
  postCollegeDetail(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/basic-detail?menu=${menu}`,
      data
    );
  }
  postDepartmentData(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/department?menu=${menu}`,
      data
    );
  }

  postCourse(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/course?menu=${menu}`,
      data
    );
  }
  // finalSubmit(payload: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Access-Control-Allow-Origin": "*",
  //     }),
  //   };
  //   return this.http.post<any>(
  //     `${environment.baseURL}module/final-lock-menu?menu=${payload.menu}&stateCode=${payload.stateCode}&districtCode=${payload.districtCode}&insittuteCategory=${payload.insittuteCategory}&aisheCode=${payload.aisheCode}&componentId=${payload.componentId}`,
  //     httpOptions
  //   );
  // }

  finalSubmit(payload: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.http.post<any>(`${environment.baseURL}module/final-submit?menu=${payload.menu}`, payload);
  }

  postNonTeachingSaff(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/non-teaching-staff-detail?menu=${menu}`,
      data
    );
  }

  postProposalOutcomes(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}/institute/proposed-outcome`,
      data
    );
  }
  postBasicDetail(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/save-preamble?menu=${menu}`,
      data
    );
  }

  postOutCome(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/proposed-outcome?menu=${menu}`,
      data
    );
  }

  postProposalCourse(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/proposed-course?menu=${menu}`,
      data
    );
  }

  postProposalRevisionLock(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/proposal-revision-lock?`,
      data
    );
  }

  saveTimeLineData(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/proposal-timeline?menu=${menu}`,
      data
    );
  }

  postFinancial(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/year_wise_financial_estimate_for_activity?menu=${menu}`,
      data
    );
  }

  postEquityDetails(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}equity/basic-detail?menu=${menu}`,
      data
    );
  }
  postEquityGender(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}equity/ger-data?menu=${menu}`,
      data
    );
  }

  saveInfraConstruction(payload: any, menu: any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/infrastructure_construction?menu=${menu}`,
      payload
    );
  }
  saveRenovated(payload: any, menu: any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/infrastructure-renovation?menu=${menu}`,
      payload
    );
  }

  saveEquipment(payload: any, menu: any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/equipment?menu=${menu}`,
      payload
    );
  }

  saveLandbasic(data, formdata, menu): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}institute/ndmc-save-land?stateCode=${data.stateCode}&districtCode=${data.districtCode}&broadObjective=${data.broadObjective}&visionMission=${data.visionMission}&organizationalStructure=${data.organizationalStructure}&roleAndResponsibility=${data.roleAndResponsibility}&boardOfGovernance=${data.boardOfGovernance}&pmuDetail=${data.pmuDetail}&existingLandAvailability=${data.existingLandAvailability}&latitude=${data.latitude}&longitude=${data.longitude}&isOrganogramUploaded=${data.isOrganogramUploaded}&menu=${menu}`, formdata);
  }

  postEquipmentData(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/equipment?menu=${menu}`,
      data
    );
  }

  postInfrastructureRenovation(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/infrastructure-renovation?menu=${menu}`,
      data
    );
  }

  postWorkshopData(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}equity/workshop?menu=${menu}`,
      data
    );
  }

  postRemedial(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}equity/remedial-class?menu=${menu}`,
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


 




  saveDocumentOtherInfo(data, menu, formData) {
    return this.http.post<any>(
      `${environment.baseURL}institute/other-information?aisheCode=${data.aisheCode}&withExistringLinkage=${data.withExistringLinkage}&withScopeForLinkage=${data.withScopeForLinkage}&withoutLinkage=${data.withoutLinkage}&tenatativeDateCompletionOfProject=${data.tenatativeDateCompletionOfProject}&provideDetails=${data.provideDetails}&componentId=${data.componentId}&menu=${menu}`,
      formData
    );
  }
  saveDocumentOtherInfoDPR(data, menu, formData) {
    return this.http.post<any>(`${environment.baseURL}institute/document-save?aisheCode=${data.aisheCode}&stateCode=${data.stateCode}&districtCode=${data.districtCode}&instituteCategory=${data.instituteCategory}&componentId=${data.componentId}&documentTypeId=${data.documentTypeId}&revisedProposalDprUndertaking=${data.revisedProposalDprUndertaking}&documentId=${data.documentId}`, formData);

  }
  saveDocumentOtherInfoDPRV3(data, menu, formData) {
    return this.http.post<any>(`${environment.baseURL}institute/document-save?aisheCode=${data.aisheCode}&stateCode=${data.stateCode}&districtCode=${data.districtCode}&instituteCategory=${data.instituteCategory}&componentId=${data.componentId}&documentTypeId=${data.documentTypeId}`, formData);

  }
  saveDocumentOtherInfoDPREquity(data, menu, formData) {
    return this.http.post<any>(`${environment.baseURL}institute/document-save?aisheCode=${data.aisheCode}&districtCode=${data.districtCode}&stateCode=${data.stateCode}&componentId=${data.componentId}&documentTypeId=${data.documentTypeId}&revisedProposalDprUndertaking=${data.revisedProposalDprUndertaking}`, formData);

  }
  saveDocumentOtherInfoDPREquityV3(data, menu, formData) {
    return this.http.post<any>(`${environment.baseURL}institute/document-save?&districtCode=${data.districtCode}&stateCode=${data.stateCode}&componentId=${data.componentId}&documentTypeId=${data.documentTypeId}`, formData);

  }
  postStemCourse(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}equity/proposed-stem-course?menu=${menu}`,
      data
    );
  }

  postVocational(data: any, menu): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}equity/proposed-activity-detail-for-improving-skill?menu=${menu}`,
      data
    );
  }

  postRUSAData(
    data: any,
    formdata: any,
    aisheCode: string,
    instituteCategory: any,
    componentId: any,
    menu: any,
    indicatorStatus: any
  ): Observable<any> {
    if (data.isWholeProjectCompleted) {
      return this.http.post<any>(
        `${environment.baseURL}institute/earlier-approval-under-rusa?id=${data.id
        }&aisheCode=${aisheCode}&centralShareApproved=${data.centralShareApproved
        }&centralShareReleased=${data.centralShareReleased
        }&centralShareUtilised=${data.centralShareUtilised
        }&componentId=${componentId}&districtCode=${sessionStorage.getItem(
          "districtCode"
        )}&documentId=${data.documentId == null ? 0 : data.documentId
        }&instituteCategory=${instituteCategory}&isCompletionCertificateUploaded=${data.isWholeProjectCompleted
        }&isWholeProjectCompleted=${data.isWholeProjectCompleted
        }&percentageCompletionProject=${data.percentageCompletionProject
        }&rusaComponentName=${data.rusaComponentName
        }&stateCode=${sessionStorage.getItem("stateCode")}&stateShareApproved=${data.stateShareApproved
        }&stateShareReleased=${data.stateShareReleased}&stateShareUtilised=${data.stateShareUtilised
        }&totalAmountApproved=${data.totalAmountApproved}&totalAmountReleased=${data.totalAmountReleased
        }&totalAmountUtilised=${data.totalAmountUtilised
        }&isInstitutionApprovedUnderRusa=true&proposalScoreBaseIndicator=${data.proposalScoreBaseIndicator
        }&menu=${menu}&indicatorStatus=${indicatorStatus}`,
        formdata
      );
    } else {
      return this.http.post<any>(
        `${environment.baseURL}institute/earlier-approval-under-rusa?id=${data.id
        }&aisheCode=${aisheCode}&centralShareApproved=${data.centralShareApproved
        }&centralShareReleased=${data.centralShareReleased
        }&centralShareUtilised=${data.centralShareUtilised
        }&componentId=${componentId}&districtCode=${sessionStorage.getItem(
          "districtCode"
        )}&documentId=${data.documentId == null ? 0 : data.documentId
        }&instituteCategory=${instituteCategory}&isCompletionCertificateUploaded=${data.isWholeProjectCompleted
        }&isWholeProjectCompleted=${data.isWholeProjectCompleted
        }&percentageCompletionProject=${data.percentageCompletionProject
        }&rusaComponentName=${data.rusaComponentName
        }&stateCode=${sessionStorage.getItem("stateCode")}&stateShareApproved=${data.stateShareApproved
        }&stateShareReleased=${data.stateShareReleased}&stateShareUtilised=${data.stateShareUtilised
        }&totalAmountApproved=${data.totalAmountApproved}&totalAmountReleased=${data.totalAmountReleased
        }&totalAmountUtilised=${data.totalAmountUtilised
        }&isInstitutionApprovedUnderRusa=true&proposalScoreBaseIndicator=${data.proposalScoreBaseIndicator
        }&menu=${menu}&indicatorStatus=${indicatorStatus}`,
        formdata
      );
    }
  }
  uploadMoU(
    stateId: any,
    formData: any,
    userId: any,
    id: any
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/create-mou?stateCode=${stateId}&uploadedBy=${userId}&id=${id}`,
      formData
    );
  }
  postActivities(data: any, menu): Observable<any> {
    return this.http.post(
      `${environment.baseURL}equity/proposed-other-activity-detail?menu=${menu}`,
      data
    );
  }

  reset(payload: any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/users/reset-password`,
      payload
    );
  }
  saveDepartmentData(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/department}`,
      data
    );
  }

  savePhaseCount(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}institute/phase-count`,
      data
    );
  }
  saveSoftCompoenent(payload: any, menu: any): Observable<any> {
    return this.http.post(
      `${environment.baseURL}institute/soft-component-activity?menu=${menu}`,
      payload
    );
  }

  postUserData(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}auth/users/user-master`,
      data
    );
  }

  saveDocumentOtherInfoGender(data, menu, formData, componentId) {
    return this.http.post<any>(
      `${environment.baseURL}institute/other-information?aisheCode=${data.aisheCode}&componentId=${componentId}&withExistringLinkage=${data.withExistringLinkage}&withScopeForLinkage=${data.withScopeForLinkage}&withoutLinkage=${data.withoutLinkage}&tenatativeDateCompletionOfProject=${data.tenatativeDateCompletionOfProject}&menu=${menu}`,
      formData
    );
  }

  getFinancialEstimateNMDC(
    districtCode: string,
    componentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}institute/year_wise_financial_estimate_for_activity?districtCode=${districtCode}&componentId=${componentId}`
    );
  }


  rusaLegacyDataUpdateId(data:any): Observable<any> {
return this.http.post<any>(`${environment.baseURL}state-profile/rusa-legacy-data-update-id?id=${data.id}&projectStatusId=${data.projectStatusId}&projectUpdationRemarks=${data.projectUpdationRemarks}&pabMeetingNumber=${data.pabMeetingNumber}&pabDate=${data.pabDate}&projectStatusIdOld=${data.projectStatusIdOld}&projectUpdationRemarksOld=${data.projectUpdationRemarksOld}&pabMeetingNumberOld=${data.pabMeetingNumberOld}&pabDateOld=${data.pabDateOld}`, data)
  }

updateAisheCode(data:any): Observable<any> {
return this.http.post<any>(`${environment.baseURL}state-profile/rusa-legacy-data-update-aishe-code?id=${data.id}&aisheCode=${data.aisheCode}`, data)
  }
  // http://10.206.194.253:81/pmusha/state-profile/rusa-legacy-data-update-id?id=2439&projectStatusId=2&projectUpdationRemarks=dsadasdsa

postFinalProposelV3(data: any, menu: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseURL}version-based/update-final-proposal-status?activity=${menu}`,
      data
    );
  }

getUploadDoc(data:any): Observable<any>{
    return this.http.get<any>(`${environment.baseURL}institute/document-get?documentId=${data.documentId}`)
  }

getPhotoSoftCompoenentListRevision(aisheCode,instituteType,componentId,districtCode,pabStatus):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`${environment.baseURL}institute/soft-component-activity?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatusId=${pabStatus}`);
}

getPhotoEquipmentListRevision(aisheCode,instituteType,componentId,districtCode,pabStatus):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`${environment.baseURL}institute/equipment?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatus=${pabStatus}`);
  }


}
