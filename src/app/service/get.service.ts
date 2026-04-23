import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../shared/shared.service';
import { Params } from '@angular/router';
import { timeout, catchError } from 'rxjs/operators';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { ProgressMaxData } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  encryptedAishe: any;


  private httpWithoutInterceptor: HttpClient;

  constructor(public http: HttpClient, public sharedService: SharedService, private encrypt: EncryptDecrypt, private httpBackend: HttpBackend) {
    this.httpWithoutInterceptor = new HttpClient(this.httpBackend);
   }

  getToken(userId: any, password: any): Observable<any> {

    var data = {
      username: userId,
      password: password
    }
    return this.http.post(`${environment.authLogin}`, data).pipe(
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

  getCaptchaText() {
    return this.http.get(environment.baseUrlCaptcha + `getCaptcha`, { responseType: 'json' })
  }
  getprojectStatusList(): Observable<any> {
    return this.http.get(`${environment.baseURL}state-profile/ref-rusa-project-status`)
  }

  getComponentName(phase: any): Observable<any> {
    return this.http.get(`${environment.baseURL}state-profile/ref-rusa-component?phase=${phase}`)
  }

  getLockRusaProgress(state, rusaPmusha): Observable<any> { //JGKGKHJL JGHK
    return this.http.get(`${environment.baseURL}state-profile/rusa-monthly-progress-lock-status?stateCode=${state}&rusaPmusha=${rusaPmusha}`)
  }
  getLockRusaProgressNpd(state, rusaPmusha): Observable<any> { //JGKGKHJL JGHK
    return this.http.get(`${environment.baseURL}state-profile/rusa-monthly-progress-lock-npd?stateCode=${state}&rusaPmusha=${rusaPmusha}`)
  }

  getLockRusaProgressNpdPMUsha(state, rusaPmusha, year, month): Observable<any> { //JGKGKHJL JGHK
    return this.http.get(`${environment.baseURL}state-profile/rusa-monthly-progress-lock-npd?stateCode=${state}&rusaPmusha=${rusaPmusha}&year=${year}&month=${month}`)
  }
  getLockRusaProgress1(state, month, year, rusaPmusha): Observable<any> {
    return this.http.get(`${environment.baseURL}state-profile/rusa-monthly-progress-lock-status?stateCode=${state}&month=${month}&year=${year}&rusaPmusha=${rusaPmusha}`)
  }
  getLockPMUshaProgress1(state, month, year, aisheCode): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`${environment.baseURL}state-profile/pmusha-monthly-progress-lock-status?stateCode=${state}&month=${month}&year=${year}&aisheCode=${encryptedAishe}`)
  }
  getLockPMUshaProgressLockVald(state, month, year, aisheCode, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`${environment.baseURL}auth/users/pm-usha-monthly-progress-lock-validation?stateCode=${state}&month=${month}&year=${year}&aisheCode=${encryptedAishe}&componentId=${componentId}`)
  }
  getLockPMUshaProgressList(state): Observable<any> {
    return this.http.get(`${environment.baseURL}state-profile/pmusha-monthly-progress-lock-status?stateCode=${state}`)
  }
  getLockPMUshaProgressListFilter(state, componentId, year, month): Observable<any> {
    return this.http.get(`${environment.baseURL}state-profile/pmusha-monthly-progress-lock-status?stateCode=${state}&componentId=${componentId}&year=${year}&month=${month}`)
  }

  getLockPMUshaProgressListLock(state, componentId, month, year): Observable<any> {
    return this.http.get(`${environment.baseURL}state-profile/pmusha-monthly-progress-lock-status?stateCode=${state}&componentId=${componentId}&month=${month}&year=${year}`)
  }
  

  getDocumentData(payload) {
    if (payload.documentId) {
      return this.http.get(`${environment.baseURL}institute/document-get?documentId=${payload.documentId}`)
    }
    if (payload.stateFundRequestDetailId) {
      return this.http.get(`${environment.baseURL}institute/document-get?componentId=${payload.componentId}&documentTypeId=${payload.documentTypeId}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}&stateCode=${payload.stateCode}`)
    }
    return this.http.get(`${environment.baseURL}institute/document-get?componentId=${payload.componentId}&documentTypeId=${payload.documentTypeId}&stateCode=${payload.stateCode}`)
  }
  getFundDemand(data: any): Observable<any> {
    return this.http.get(`${environment.baseURL}state-fund-demand?stateCode=${data.stateCode}&stateFundRequestDetailId=${data.stateFundRequestDetailId}`)
  }
  getUserRole(): Observable<any> {
    return this.http.get(`${environment.baseURL}auth/users/ref-user-type`)
  }

  getStateIssue(): Observable<any> {
    return this.http.get(`${environment.baseURL}auth/users/ref-state-issue-status`)
  }
  getAllUser(): Observable<any> {
    return this.http.get(`${environment.baseURL}auth/users/user-master`)
  }
  getFocusDistrict(stateId: any): Observable<any> {
    return this.http.get(`${environment.baseURL}auth/users/focus-district-get?stateId=${stateId}`)
  }

  getComponent(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-component`)
  }
  getInstitutionsDetails(payload: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURLInstituteManagement}institutionDirectory /institute-list?categoryType=${payload.categoryType}&districtId=${payload.districtId}&managementId=${payload.managementId}&typeId=${payload.typeId}`)
  }
  getInstitute(categoryType: any, districtId: any, stateCode: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURLInstituteManagement}institutionDirectory /institute-list?categoryType=${categoryType}&districtId=${districtId}&stateCode=${stateCode}`)
  }

  getInstituteUC(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/component-institute-mapping`, { params: payload })
  }
  getInstituteByStateCode(categoryType: any, stateCode: any) {
    return this.http.get<any>(`${environment.baseURLInstituteManagement}institutionDirectory /institute-list?categoryType=${categoryType}&stateCode=${stateCode}`)
  }

  getComponentInsMapping(catgegory, stateCode: any, districtCode: any, componentId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/component-institute-mapping?stateCode=${stateCode}&districtCode=${districtCode}&instituteCategory=${catgegory}&componentId=${componentId}`)
  }
  getComponentInsMappingU(category: any, stateCode: any, componentId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/component-institute-mapping?stateCode=${stateCode}&instituteCategory=${category}&componentId=${componentId}`)
  }
  getComponentInsMappingNMDCGENDER(stateCode: any, componentId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/component-institute-mapping?stateCode=${stateCode}&componentId=${componentId}`)

  }
  getMappingList(userId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/component-institute-mapping?userId=${userId}`)
  }
  getProfile(stateCode: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile?stateCode=${stateCode}`)
  }
  getInstituteData(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-pmusha-institution-type`)
  }
  getIndicatorList(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-indicators`)
  }
  getAccreditation(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-naac-accreditation`);
  }
  // downloadFundDemandPDF(payload:any): Observable<any> {
  //   return this.http.get<any>(`${environment.baseURL}reports/fund-management?stateCode=12&tabId=8&proposalId=4&exportType=PDF`)
  // }

  getBasicDetails(aisheCode: string, instituteCategory: string, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/basic-detail?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`)
  }

  getTaggingReportExl(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}reports/timeStamp-tagging-report`)
  }


  

  getstateProfile(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/glance?stateCode=${sessionStorage.getItem('stateCodeP')}`)
  }
  pageValidation(stateCode: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/district-data-not-filled?stateCode=${stateCode}`)
  }
  getProposedCome(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/ref-outcome-indicator`)
  }

  getNMDCInstitute(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/ref-ndmc-institution-type`)
  }

  getHEIInstituteList(districtCode): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/district-hei-detail?districtCode=${districtCode}`)
  }
  getOutCome(aisheCode: string, instituteCategory: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposed-outcome?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`)
  }
  getOutComeRevision(aisheCode: string, instituteCategory: string, componentId: any, districtCode: any, pabStatus: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposed-outcome?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}&districtCode=${districtCode}&pabStatusId=${pabStatus}`)
  }

  getOutComeSummary(instituteCategory:any, componentId:any, pabStatusId:any, pabstatus:any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/proposed-outcome?instituteCategory=${instituteCategory}&componentId=${componentId}&pabStatusId=${pabStatusId}&pabStatus=${pabstatus}`)
  }

  getOutComeTarget(componentId:any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/proposed-outcome-target?componentId=${componentId}`)
  }
  
  getProposedCourse(aisheCode: string, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposed-course?aisheCode=${encryptedAishe}&componentId=${componentId}`)
  }
  getItemData(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/ref-item-physical-financial`)
  }
  //getDataTimeRevision
  // getDataTimeRevision(aisheCode: string, componentId, district, pabstatus): Observable<any> {
  //   return this.http.get<any>(`${environment.baseURL}institute/proposal-timeline?districtCode=${district}&pabStatus=${pabstatus}&aisheCode=${aisheCode}&componentId=${componentId}`)
  // }
  getDataTime(aisheCode: string, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposal-timeline?aisheCode=${encryptedAishe}&componentId=${componentId}`)
  }
  getDataTimeRevision(aisheCode: string, componentId, districtCode, pabStatus): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposal-timeline?aisheCode=${encryptedAishe}&componentId=${componentId}&districtCode=${districtCode}&pabStatus=${pabStatus}`)
  }



  revisionFinalSubmit(aisheCode: string, componentId, districtCode, pabStatus): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/revised-proposal-final-submit-validation?aisheCode=${encryptedAishe}&componentId=${componentId}&districtCode=${districtCode}&pabStatus=${pabStatus}`)
  }

  // reRevisionFinalSubmit(payload): Observable<any> {
  //   return this.http.post<any>(`${environment.baseURL}version-based/update-final-proposal-status?id=${payload.id}&isV3Locked=${payload.isV3Locked}&revisedProposalV3Cost=${payload.revisedProposalV3Cost}&v3Justification=${payload.v3Justification}&activity=${payload.activity}`)
  // }


  getDataTimeNMDC(districtCode: string, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/proposal-timeline?districtCode=${districtCode}&componentId=${componentId}`)
  }
  getProposalActivity(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/ref-proposal-activity`)
  }
  getProposalActivityWithItem(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposal-with-item?aisheCode=${encryptedAishe}&districtCode=${payload.districtCode}&componentId=${payload.componentId}`)
  }

  getfinalSubmit(stateCode, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/final-proposal-status?stateCode=${stateCode}&componentId=${componentId}`)
  }


  getfinalSubmitReport(stateCode, componentId, pabNumber): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/final-proposal-status?stateCode=${stateCode}&componentId=${componentId}&pabNumber=${pabNumber}`)
  }



  // getfinalRevisedSubmit(payload): Observable<any> {
  //   return this.http.get<any>(`${environment.baseURL}institute/final-proposal-status`,{params:payload})
  // }



  getfinalSubmitProposal(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/final-proposal-status`, { params: payload })
  }

  getfinalTaggingReport(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/proposal-item-tagging-report`, { params: payload })
  }

  getStateSubmitData(state: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}dashboard/component-wise-dashboard?componentId=-1&stateCode=${state}`)
  }


  getGenderEquityData(districtCode, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}equity/equity-preview?districtCode=${districtCode}&componentId=${componentId}`)
  }

  getNMDCData(districtCode): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/nmdc-preview?districtCode=${districtCode}`)
  }


  getCollegeData(aisheCode: any, instituteCategory: any, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/preview-institution-detail?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`)
  }

  getEquipment(aisheCode: string, instituteCategory: string): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/equipment?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}`)

  }
  getWorkshop(aisheCode: string, instituteCategory: string): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}equity/workshop?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}`)
  }
  getOtherSourceList(aisheCode: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/other-source-of-fund?aisheCode=${encryptedAishe}&componentId=${componentId}`)
  }

  getRemedialClasss(aisheCode: any, instituteCategory: string): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}equity/remedial-class?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}`)
  }
  getEquityInstitution(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}equity/ref-equity-institution-type`)
  }

  getStemCourseData(aisheCode: any, instituteCategory: string): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}equity/proposed-stem-course?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}`)
  }

  getinfrastructureRenovation(aisheCode: string, instituteCategory: string): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/infrastructure-renovation?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}`)
  }
  getOtherSourceListGen(districtCode: string, componentId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/other-source-of-fund?districtCode=${districtCode}&componentId=${componentId}`)
  }
  getOtherInfoDetailsGender(districtCode:any, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/other-information?districtCode=${districtCode}&componentId=${componentId}`)
  }
  getNmdcBasic(districtCode: any, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/ndmc-basic-detail?districtCode=${districtCode}`)
  }
  getInfraCnstruction(districtCode, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/infrastructure_construction?districtCode=${districtCode}&componentId=${componentId}`);
  }

  getInfraCnstructionRevision(districtCode, componentId, pabStatus): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/infrastructure_construction?districtCode=${districtCode}&componentId=${componentId}&pabStatus=${pabStatus}`);
  }

  getEquipmentList(districtCode, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/equipment?districtCode=${districtCode}&componentId=${componentId}`);

  }
  getDepartmentData(componentId, districtCode): Observable<any> {
    const encryptedAishe = districtCode ? this.encrypt.getEncryptedValue(districtCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/department?componentId=${componentId}&aisheCode=${encryptedAishe}`);
  }
  getDepartmentDataIns(aisheCode, instituteCategory, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/department?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`);
  }
  getProposedProgramme(aisheCode: string, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposed-course?aisheCode=${encryptedAishe}&componentId=${componentId}`)
  }
  getNonTeacherStaff(districtCode: string, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/non-teaching-staff-detail?districtCode=${districtCode}&componentId=${componentId}`)
  }
  getTeacher(districtCode: string, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/proposed-teaching-staff-detail?aisheCode=${districtCode}`)
  }
  getOutComeNMDC(districtCode: string, componentId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/proposed-outcome?districtCode=${districtCode}&componentId=${componentId}`)
  }
  getOtherSourceListNMDC(districtCode: string, componentId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/other-source-of-fund?districtCode=${districtCode}&componentId=${componentId}`)
  }
  getFinancialEstimate(districtCode: string, componentId, financial): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/year_wise_financial_estimate_for_activity?districtCode=${districtCode}&componentId=${componentId}&financial=${financial}`)
  }
  getAnticipatedList(districtCode: string, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/anticipated-enrollment?aisheCode=${districtCode}&componentId=${componentId}`)

  }

  getInfraTimelin(districtCode, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/anticipated-enrollment?districtCode=${districtCode}&componentId=${componentId}`)

  }
  acadeicAdminTime(districtCode): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/academic-admin-timeline?aisheCode=${districtCode}`)

  }
  getScore(aisheCode, componentId): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    if (componentId === this.sharedService.meruComponentId || componentId === this.sharedService.universityComponentId || componentId === this.sharedService.collegeComponentId) {
      return this.http.get<any>(`${environment.baseURL}institute/proposal-score-common?aisheCode=${encryptedAishe}&componentId=${componentId}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}institute/proposal-score-common?districtCode=${aisheCode}&componentId=${componentId}`)

    }

  }
  // getScoreRevision(aisheCode, componentId, pabStatus): Observable<any> {
  //   if (componentId === this.sharedService.meruComponentId || componentId === this.sharedService.universityComponentId || componentId === this.sharedService.collegeComponentId) {
  //     return this.http.get<any>(`${environment.baseURL}institute/proposal-score-common?aisheCode=${aisheCode}&componentId=${componentId}`)

  //   } else {
  //     return this.http.get<any>(`${environment.baseURL}institute/proposal-score-common?districtCode=${aisheCode}&componentId=${componentId}`)

  //   }

  // }

  getScores(aisheCode, componentId): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposal-score-common?aisheCode=${encryptedAishe}&componentId=${componentId}`)

  }
  getUpdateScore(aisheCode, componentId): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/score?componentId=${componentId}&aisheCode=${encryptedAishe}&selectionType=true`)


  }

  //get Cost Data created by 02-02-2024
  getCostData(aisheCode, componentId): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/cost-data?componentId=${componentId}&aisheCode=${encryptedAishe}`)

  }

  getOverallData(aisheCode, componentId): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/final-proposal-status?componentId=${componentId}&aisheCode=${encryptedAishe}`)

  }

  getAuditTrail(stateCode, userId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}audit?stateCode=${stateCode}&userId=${userId}`)

  }
  activityFacility(aisheCode: any): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}meru/meru-available-facility?aisheCode=${encryptedAishe}`)
  }
  getConsolidatedList(stateCode, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/score?selectionType=false&stateCode=${stateCode}&componentId=${componentId}`)

  }
  getDataList(instituteCategory: string, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/component-institute-mapping?stateCode=${sessionStorage.getItem('stateCode')}&instituteCategory=${instituteCategory}&componentId=${componentId}`);
  }
  getBooleanList(aisheCode: any, componentId: any, districtCode: any): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/indicator-tab-status?aisheCode=${encryptedAishe}&componentId=${componentId}&districtCode=${districtCode}`);

  }
  getLockListStatus(aisheCode: any, componentId: any): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposal-revision-lock?aisheCode=${encryptedAishe}&componentId=${componentId}`);

  }


  getLockListStatusConsolated(revisedProposalRevisedDprUploaded:any, stateCode:any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/proposal-revision-lock?revisedProposalRevisedDprUploaded=${revisedProposalRevisedDprUploaded}&stateCode=${stateCode}`);

  }


  getRusaLegacyData(aisheCode, stateCode, districtCode, componentId): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-legacy-data?stateCode=${stateCode}&aisheCode=${encryptedAishe}&selectionType=UPDATED&districtCode=${districtCode}&componentId=${componentId}`)
  }



  getRusaProfressData(state, year, months, projectCompleted, phase, componentId, digitallyLaunchedProject): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-monthly-progress?month=${months}&monthlyProgressId=-1&stateCode=${state}&year=${year}&whetherProjectIsCompleted=${projectCompleted}&phase=${phase}&componentId=${componentId}&whetherPmDigitallyLaunchedProject=${digitallyLaunchedProject}`)

  }

  getRusaProfressDataCompare(state, year, months): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-monthly-progress-npd?month=${months}&stateCode=${state}&year=${year}`)

  }


  getifdCheckListStateDataNPD(key: Params): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-monthly-progress-npd?` + key)

  }

  getifdCheckListStateData(key: Params): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-monthly-progress?` + key)

  }

  getFinicialData(key: Params): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}ifd-state-central-release-since-inception-rusa?` + key)

  }

  getStateUcDetail(key: Params): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-uc-detail?` + key)

  }



  getRusaPreviousMonthlyReport(state, year, months, rusaId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/previous-rusa-monthly-progress?month=${months}&stateCode=${state}&year=${year}&rusaId=${rusaId}`)

  }

  getRusaProfressDataById(id, year, months): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-monthly-progress-by-id?id=${id}&year=${year}&month=${months}`)

  }
  getRusaProfressDataNpd(state, year, months, projectCompleted, phase, componentId, digitallyLaunchedProject): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-monthly-progress-npd?stateCode=${state}&year=${year}&month=${months}&whetherProjectIsCompleted=${projectCompleted}&phase=${phase}&componentId=${componentId}&whetherPmDigitallyLaunchedProject=${digitallyLaunchedProject}`)
  }
  getRusaLisDoc(id): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-legacy-data-by-id?id=${id}`)
  }

  getProposalCost(aisheCode, componentId): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    if (componentId === this.sharedService.meruComponentId || componentId === this.sharedService.universityComponentId || componentId === this.sharedService.collegeComponentId) {
      return this.http.get<any>(`${environment.baseURL}institute/proposal-cost?aisheCode=${encryptedAishe}&componentId=${componentId}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}institute/proposal-cost?districtCode=${aisheCode}&componentId=${componentId}`)

    }

  }

  //start
  getProposalCostRevision(aisheCode, componentId, pabStatus): Observable<any> {
     const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    if (componentId === this.sharedService.meruComponentId || componentId === this.sharedService.universityComponentId || componentId === this.sharedService.collegeComponentId) {
      return this.http.get<any>(`${environment.baseURL}institute/proposal-cost?aisheCode=${encryptedAishe}&componentId=${componentId}&pabStatus=${pabStatus}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}institute/proposal-cost?districtCode=${aisheCode}&componentId=${componentId}&pabStatus=${pabStatus}`)

    }

  }
  
  getCostList(stateCode, componentId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/cost?stateCode=${stateCode}&componentId=${componentId}`)

  }
  getDashboard(stateCode): Observable<any> {
    return this.http.get(
      `${environment.baseURL}dashboard?stateCode=${stateCode}`
    );
  }
  downloadDocument(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/document?aisheCode=${encryptedAishe}&documentType=${payload.documentType}&meruActivityId=${payload.meruActivityId}&componentId=${payload.componentId}`)
  }
  downloadDocumentProposal(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/document?aisheCode=${encryptedAishe}&documentType=${payload.documentType}&componentId=${payload.componentId}`)
  }
  downloadDocumentProposalNMDC(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/document?districtCode=${payload.districtCode}&documentType=${payload.documentType}&componentId=${payload.componentId}`)
  }
  downloadDocumentData(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/document?documentType=${payload.documentType}&infrastructureId=${payload.infrastructureId}&componentId=${payload.componentId}`)
  }
  getStatus(): Observable<any> {
    return this.http.get(
      `${environment.baseURL}state-profile/state_profile_filled`
    );
  }
  getActivityList(userId, activity): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/application-log?action=${activity}&userId=${userId}`)
  }
  showUnlockStatus(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/final-proposal-status-all`)
  }
  downloadData(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-without-units?stateCode=${payload.stateCode}&exportType=${payload.type}&componentId=${payload.componentId}`)

  }

  downloadByAisheCode(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get(`${environment.baseURL}reports/preview-institution?aisheCode=${encryptedAishe}&componentId=${payload.componentId}&districtCode=${payload.districtCode}&exportType=${payload.type}`);
  }

    downloadPMUshaReports(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get(`${environment.baseURL}reports/pmusha-progress-monitoring?aisheCode=${encryptedAishe}&componentId=${payload.componentId}&year=${payload.year}&month=${payload.month}&exportType=${payload.type}`);
  }

  downloadByAisheCodeRevision(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get(`${environment.baseURL}reports/preview-institution?aisheCode=${encryptedAishe}&componentId=${payload.componentId}&districtCode=${payload.districtCode}&exportType=${payload.exportType}&revisedProposal=${payload.revisedProposal}`);
  }

  downloadByAisheCodeReRevision(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get(`${environment.baseURL}reports/pmusha-v3-rerevised-report?aisheCode=${encryptedAishe}&componentId=${payload.componentId}&exportType=${payload.exportType}`);
  }

  downloadByAisheCodeReRevisionEquity(payload): Observable<any> {
    return this.http.get(`${environment.baseURL}reports/pmusha-v3-rerevised-report?districtCode=${payload.districtCode}&componentId=${payload.componentId}&exportType=${payload.exportType}`);
  }






  downloadByAisheCode1(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get(`${environment.baseURL}reports/activity-report?aisheCode=${encryptedAishe}&componentId=${payload.componentId}&districtCode=${payload.districtCode}&exportType=${payload.type}`);
  }
  downloadDataConsolidated(payload): Observable<any> {
    if (payload.proposalRevisionApprovedBySaa) {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}&proposalRevisionApprovedBySaa=${payload.proposalRevisionApprovedBySaa}&finalReviseProposalLockStatus=${payload.finalReviseProposalLockStatus}&pabActionId=${payload.pabActionId}&revisedProposalForwardedToNpd=${payload.revisedProposalForwardedToNpd}&revisedProposalDprUndertaking=${payload.revisedProposalDprUndertaking}&revisedProposalRevisedDprLockStatus=${payload.revisedProposalRevisedDprLockStatus}&reportTitle=${payload.reportTitle}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}`)

    }

  }

  downloadDataConsolidatedDpr(payload): Observable<any> {
    if (payload.proposalRevisionApprovedBySaa) {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}&proposalRevisionApprovedBySaa=${payload.proposalRevisionApprovedBySaa}&pabActionId=${payload.pabActionId}&revisedProposalRevisedDprLockStatus=${payload.revisedProposalRevisedDprLockStatus}&isRevisedProposalRevisedDprEsign=${payload.isRevisedProposalRevisedDprEsign}&reportTitle=${payload.reportTitle}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}`)

    }

  }


  downloadDataRevisedConsolidated(payload): Observable<any> {
    if (payload.proposalRevisionApprovedBySaa) {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}&proposalRevisionApprovedBySaa=${payload.proposalRevisionApprovedBySaa}&finalReviseProposalLockStatus=${payload.finalReviseProposalLockStatus}&pabActionId=${payload.pabActionId}&revisedProposalForwardedToNpd=${payload.revisedProposalForwardedToNpd}&reportTitle=${payload.reportTitle}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}`)

    }

  }

  downloadDataConsolidatedRevision(payload): Observable<any> {
    if (payload.proposalRevisionApprovedBySaa) {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}&proposalRevisionApprovedBySaa=${payload.proposalRevisionApprovedBySaa}&pabActionId=${payload.pabActionId}&finalReviseProposalLockStatus=${payload.finalReviseProposalLockStatus}&revisedProposalForwardedToNpd=${payload.revisedProposalForwardedToNpd}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}`)

    }

  }
  getConsolidatedPDF(payload): Observable<any> {
    if (payload.proposalRevisionApprovedBySaa) {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}&proposalRevisionApprovedBySaa=${payload.proposalRevisionApprovedBySaa}&reportTitle=${payload.reportTitle}`)

    } else {
      return this.http.get<any>(`${environment.baseURL}reports/consolidated-proposal-with-units?stateCode=${payload.stateCode}&componentIds=${payload.componentId}&exportType=${payload.type}`)

    }
  }
  getFinalProposalCount(stateCode): Observable<any> {
    if (stateCode === '') {
      return this.http.get<any>(`${environment.baseURL}institute/final-proposal-count`)
    } else {
      return this.http.get<any>(`${environment.baseURL}institute/final-proposal-count?stateCode=${stateCode}`)
    }
  }
  // esignService():Observable<any>{
  //   return this.http.get<any>(`${environment.eSign}esign-service`)
  // }
  downloadeSign(transactionId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}esign-data?transactionId=${transactionId}`)
  }
  downloadeSignFund(transactionId): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}esign-data-fund-mgmt?transactionId=${transactionId}`)
  }
  getEsignTransId(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}esign-data`, { params: payload })
  }

  saaForwardedFinalProposal(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/saa-forwarded-final-proposal`, { params: payload })
  }
  getEligibleList(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref_proposal_eligible_remark`)
  }


  downloadReportUniversity(payload): Observable<any> {
    const encryptedAishe = payload.aisheCode ? this.encrypt.getEncryptedValue(payload.aisheCode) : '';
    return this.http.get(`${environment.baseURL}reports/consultant-scrutiny?aisheCode=${encryptedAishe}&componentId=${payload.componentId}&districtCode=${payload.districtCode}&exportType=${payload.type}`);
  }


  getCheckListDetails(payload): Observable<any> {
    if (payload.stateFundRequestDetailId) {
      return this.http.get(`${environment.baseURL}ifd-checklist?stateCode=${payload.stateCode}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}`);
    }
    return this.http.get(`${environment.baseURL}ifd-checklist?stateCode=${payload.stateCode}`);
  }
  getCheckListDownloadPDF(payload): Observable<any> {
    return this.http.get(`${environment.baseURL}ifd-checklist?stateCode=${payload.stateCode}&checklistId=${payload.checklistId}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}`);
  }

  getExcelData(payload): Observable<any> {
    return this.http.get(`${environment.baseURL}ias-mapped-pfms?checklistId=${payload.checklistId}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}`);
  }

  // getBriefData(payloadDetails:any): Observable<any> {
  //   return this.http.get<any>(`${environment.baseURL}state-fund-brief-detail`,{params:payloadDetails})
  // }
  getBriefData(payloadDetails: any): Observable<any> {
    if (payloadDetails.npd) {
      if (payloadDetails.stateCode && payloadDetails.npd && payloadDetails.stateCode !== 'ALL') {
        return this.http.get<any>(`${environment.baseURL}state-fund-brief-detail?isEsigned=${payloadDetails.npd}&stateCode=${payloadDetails.stateCode}`)
      }
      return this.http.get<any>(`${environment.baseURL}state-fund-brief-detail?isEsigned=${payloadDetails.npd}`)
    }
    if (payloadDetails.stateFundBriefDetailId) {
      return this.http.get<any>(`${environment.baseURL}state-fund-brief-detail?stateCode=${payloadDetails.stateCode}&stateFundBriefDetailId=${payloadDetails.stateFundBriefDetailId}`)
    }
    return this.http.get<any>(`${environment.baseURL}state-fund-brief-detail?stateCode=${payloadDetails.stateCode}`)

  }

  UCDetail(payloadDetails): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-uc-detail?stateCode=${payloadDetails?.stateCode}&isFinancialYear=${payloadDetails?.isFinancialYear}&financialYear=${payloadDetails?.financialyear}&quarter=${payloadDetails?.quarter}`)
  }
  gfrDetail(payloadDetails: any): Observable<any> {
    if (payloadDetails?.stateFundRequestDetailId) {
      return this.http.get<any>(`${environment.baseURL}state-uc-detail?stateCode=${payloadDetails?.stateCode}&stateFundRequestDetailId=${payloadDetails?.stateFundRequestDetailId}`)
    }
    if (payloadDetails?.isFinancialYear && payloadDetails?.stateCode) {
      return this.http.get<any>(`${environment.baseURL}state-uc-detail?stateCode=${payloadDetails?.stateCode}&isFinancialYear=${payloadDetails?.isFinancialYear}`)
    }
    if (!payloadDetails?.stateCode && payloadDetails?.isFinancialYear) {
      return this.http.get<any>(`${environment.baseURL}state-uc-detail?isFinancialYear=${payloadDetails?.isFinancialYear}&onlyFinalSubmit=${payloadDetails?.onlyFinalSubmit}`)
    }
    return this.http.get<any>(`${environment.baseURL}state-uc-detail?stateCode=${payloadDetails?.stateCode}`)
  }

  checkEligibilty(payload: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}fund-eligibility-state-proposal?stateCode=${payload}`)
  }

  getFundData(payloadDetails: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}fund-proposal`, { params: payloadDetails })

  }

  getActivityDetails(aisheCode: any, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}institute/common-activity-details?aisheCode=${encryptedAishe}&componentId=${componentId}`
    );
  }

  getRemarkList(propId: any, componentId: any, aisheCode: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}auth/users/pm-usha-monthly-progress?proposalActivityId=${propId}&componentId=${componentId}&aisheCode=${encryptedAishe}`
    );
  }

  getRemarkListUpdate(propId: any, componentId: any, aisheCode: any, month:any, year:any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}auth/users/pm-usha-monthly-progress?proposalActivityId=${propId}&componentId=${componentId}&aisheCode=${encryptedAishe}&month=${month}&year=${year}`
    );
  }

  getRemarkListUpdate1(propId: any, componentId: any): Observable<any> {
    // const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(
      `${environment.baseURL}auth/users/pm-usha-monthly-progress?proposalActivityId=${propId}&componentId=${componentId}`
    );
  }
//start
  getFinacialProgres(payloadDetails: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}pm-usha-financial-monthly-progress`, { params: payloadDetails })

  }

  getFinacialDetails(payloadDetails: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}state-profile/pmusha-monthly-financial-progress`, { params: payloadDetails })
  }

  // getFinacialDetails(payloadDetails: any): Observable<any> {
  //   return this.http.get<any>(`${environment.baseURL}state-profile/pmusha-monthly-financial-progress`, { params: payloadDetails })
  // }

  
  getLockPMUshaProgressListLock1(payloadDetails: any): Observable<any> {
    return this.http.get(`${environment.baseURL}state-profile/pmusha-monthly-progress-lock-status`, { params: payloadDetails })
  }
  

  getFundReport(payload: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}reports/fund-management`, { params: payload })

  }
  getEsignPdfFile(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}esign-data-fund-mgmt?stateFundRequestDetailId=${payload.stateFundRequestDetailId}&stateCode=${payload.stateCode}`)
  }
  getDocumentFileName(payload) {
    return this.http.get(`${environment.baseURL}institute/document-get?componentId=${payload.componentId}&quarter=${payload.quarter}&financialYear=${payload.financialYear}&stateCode=${payload.stateCode}&documentTypeId=${payload.documentTypeId}`)
  }

  getCourseData(aisheCode: string, instituteCategory: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/course?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`)
  }
  getNonTeacherStaffIns(aisheCode: string, instituteCategory: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/non-teaching-staff-detail?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`)
  }

  getinfrasConstIns(aisheCode: string, instituteCategory: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/infrastructure_construction?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`);
  }

  getinfrastructureRenovationIns(aisheCode: string, instituteCategory: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/infrastructure-renovation?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`);
  }

  getEquipmentIns(aisheCode: string, instituteCategory: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/equipment?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}&componentId=${componentId}`);

  }

  getinfrasConstNMDC(districtCode: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/infrastructure_construction?districtCode=${districtCode}`);
  }

  getEquipmentNMDC(districtCode: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/equipment?districtCode=${districtCode}`);

  }

  getDepartmentDataNMDC(districtCode: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/department?districtCode=${districtCode}`);
  }

  getCourseDataNMDC(aisheCode: string, componentId: any): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/course?aisheCode=${encryptedAishe}&componentId=${componentId}`)
  }

  getNonTeacherStaffNMDC(districtCode: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}institute/non-teaching-staff-detail?districtCode=${districtCode}`)
  }

  getProposedCourseNMDC(districtCode: string, componentId): Observable<any> {
    const encryptedAishe = districtCode ? this.encrypt.getEncryptedValue(districtCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/proposed-course?aisheCode=${encryptedAishe}&componentId=${componentId}`)
  }

  getEventType() {
    return this.http.get<any>(`${environment.baseURL}ref-event-type`);
  }
  getministryDocument(eventTypeName:any, stateId:any) {
    return this.http.get<any>(`${environment.baseURL}ministry-document?documentTypeId=${eventTypeName}&stateId=${stateId}`);
  }
  // getministryDocumentFilter(eventTypeName:any) {
  //   return this.http.get<any>(`${environment.baseURL}ministry-document?documentTypeId=${eventTypeName}`);
  // }
  viewDocument(data: any) {
    return this.http.get<any>(`${environment.baseURL}institute/document-get?documentTypeId=${data.documentTypeId}&documentId=${data.documentId}`);
  }

  viewTagDocument(data: any) {
    return this.http.get<any>(`${environment.baseURL}institute/document-get?documentId=${data.documentId}`);
  }

  viewRevisedDocument(data: any) {
    const encryptedAishe = data.aisheCode ? this.encrypt.getEncryptedValue(data.aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/document-get?documentTypeId=${data.documentTypeId}&documentId=${data.documentId}&aisheCode=${encryptedAishe}&componentId=${data.componentId}`);
  }


  viewUCDocument(data: any) {
    return this.http.get<any>(`${environment.baseURL}institute/document-get?documentId=${data.documentId}`);
  }


  deleteDocument(item: any) {
    return this.http.delete<any>(`${environment.baseURL}delete/ministry-document?id=${item.id}`);
  }


  deleteUCDocument(item: any) {
    return this.http.delete<any>(`${environment.baseURL}delete/audit-uc-document?id=${item.id}`);
  }

  deleteSanctionDocument(item: any) {
    return this.http.delete<any>(`${environment.baseURL}delete/sanction-document?id=${item.id}`);
  }


  getFinancialYear() {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-financial-year`);
  }

  getMajorHead() {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-major-head`);
  }

  getObjHead() {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-object-head`);
  }


  
  



  getEvent(payload: any) {
    return this.http.get<any>(`${environment.baseURL}event-detail?eventTypeId=${payload.eventTypeId?payload.eventTypeId:''}`);
  }
  getEventDate(payload: any) {
    return this.http.get<any>(`${environment.baseURL}event-detail?fromDate=${payload.fromDate}&toDate=${payload.toDate}&eventTypeId=${payload.eventTypeId}`);
  }
  getEvent1() {
    return this.http.get<any>(`${environment.baseURL}event-detail`);
  }

  getifdCertificate(key: Params): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}reports/ifd-certificate?` + key)

  }

  getStateData() {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-state-data`);
  }
  getifdCheckListData(payload): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}ifd-checklist-detail?stateCode=${payload.stateCode}&stateFundRequestDetailId=${payload.stateFundRequestDetailId}`)
  }

  getDprStatus(stateCode,componentId):Observable<any> {

return this.http.get<any>(`${environment.baseURL}state-profile/undertaking-revised-or-update-dpr?stateCode=${stateCode}&componentId=${componentId}`)
   
  }


  getPmUshaReportDetails(stateCode,rusaPhase,componentId):Observable<any> {

    return this.http.get<any>(`${environment.baseURL}institute/scheme-consolidated-reports?stateCode=${stateCode}&rusaPhase=${rusaPhase}&componentId=${componentId}`)
       
}

      getRusaProfressDataNpdUpdate(){
    return this.http.get<any>(`${environment.baseURL}state-profile/rusa-legacy-data-list`)

        // return http://10.206.194.253:81/pmusha/state-profile/rusa-legacy-data-list
      }


getUCDocumentDetails(stateCode,id):Observable<any> {

  return this.http.get<any>(`${environment.baseURL}institute/audit-uc-document`)
     
}

getSanctionDocumentDetails(stateCode,id):Observable<any> {

  return this.http.get<any>(`${environment.baseURL}institute/sanction-document`)
     
}

getSanctionDocumentDetailsFilter(stateCode,id):Observable<any> {

  return this.http.get<any>(`${environment.baseURL}institute/sanction-document?state=${stateCode}`)
     
}

getStateIssueDetails(activeKey, stateCode): Observable<any> {
  return this.http.get<any>(`${environment.baseURL}institute/state_issue?isActive=${activeKey}&stateCode=${stateCode}`)
}

getPMUshaProgressMaxData(params: ProgressMaxData): Observable<any> {
    const {stateCode, componentId, month, year, isForwardedToNpd} = params;
    return this.http.get(`${environment.baseURL}state-profile/pmusha-monthly-progress-all-max-data?stateCode=${stateCode}&componentId=${componentId}&month=${month}&year=${year}&isForwardedToNpd=${isForwardedToNpd}`)
}

 getInfraCnstructionPhotoRevision(aisheCode,instituteType,componentId,districtCode,pabStatus): Observable<any> {
  const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/infrastructure_construction?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatus=${pabStatus}`);
  }

getPMUshaProgressMaxDataLatest(params: ProgressMaxData): Observable<any> {
    const {stateCode, districtCode, componentId, month, year, aisheCode, isForwardedToNpd, maxMonthData} = params;
    return this.http.get(`${environment.baseURL}state-profile/pmusha-monthly-progress-all-max-data?stateCode=${stateCode}&componentId=${componentId}&month=${month}&year=${year}&isForwardedToNpd=${isForwardedToNpd}&maxMonthsData=${maxMonthData}`)
}

getDate(): Observable<any> {
  return this.httpWithoutInterceptor.get(
    `${environment.baseTimeUrl}localdatetime`
  );
}

getDate1(): Observable<any> {
  return this.httpWithoutInterceptor.get(
    `${environment.baseTimeUrl1}localdatetime`
  );
}


getQuarterlyTarget(params: ProgressMaxData): Observable<any> {
    const {aisheCode, componentId, financialYear, financialQuarter, stateCode, districtCode} = params;
    return this.http.get(`${environment.baseURL}pmusha-quarterly-target?aisheCode=${aisheCode}&componentId=${componentId}&financialYear=${financialYear}&financialQuarter=${financialQuarter}&stateId=${stateCode}&districtId=${districtCode}`)
}


getQuarterlyAchievement(params: ProgressMaxData): Observable<any> {
    const {aisheCode, componentId, financialYear, financialQuarter, stateCode, districtCode} = params;
    return this.http.get(`${environment.baseURL}pmusha-quarterly-achievement?aisheCode=${aisheCode}&componentId=${componentId}&financialYear=${financialYear}&financialQuarter=${financialQuarter}&stateId=${stateCode}&districtId=${districtCode}`)
}



getMOOCTargetAchivement(params: ProgressMaxData): Observable<any> {
    const {aisheCode, componentId, financialYear, financialQuarter, isTargetAchievement} = params;
    return this.http.get(`${environment.baseURL}pmusha-quarterly-mooc-target-achievement?aisheCode=${aisheCode}&componentId=${componentId}&financialYear=${financialYear}&financialQuarter=${financialQuarter}&isTargetAchievement=${isTargetAchievement}`)
}

getSoftCompoenentListVal(aisheCode,instituteType,componentId,districtCode,pabStatus):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`${environment.baseURL}institute/soft-component-activity?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatusId=${pabStatus}`);
}


getBasicDetails1(aisheCode: string,instituteCategory): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get<any>(`${environment.baseURL}institute/basic-detail?aisheCode=${encryptedAishe}&instituteCategory=${instituteCategory}`)
  }


getTargetAchievmentFilledOrNot(params: ProgressMaxData): Observable<any> {
    const {aisheCode, componentId, financialYear, financialQuarter, stateCode, districtCode, isTargetAchievement, moocId } = params;
    return this.http.get(`${environment.baseURL}pmusha-quarterly-mooc-target-achievement-filled-or-not?aisheCode=${aisheCode}&componentId=${componentId}&financialYear=${financialYear}&financialQuarter=${financialQuarter}&stateId=${stateCode}&districtId=${districtCode}&isTargetAchievement=${isTargetAchievement}&moocId=${moocId}`);
  }


  getTargetReport(params: ProgressMaxData): Observable<any> {
    const {aisheCode, componentId, financialYear, financialQuarter, stateCode, districtCode, isTargetAchievement, moocId } = params;
    return this.http.get(`${environment.baseURL}pmusha-quarterly-target-report?financialYear=${financialYear}&financialQuarter=${financialQuarter}&&stateId=${stateCode}&componentId=${componentId}`);
  }

    getAchivementReport(params: ProgressMaxData): Observable<any> {
    const {aisheCode, componentId, financialYear, financialQuarter, stateCode, districtCode, isTargetAchievement, moocId } = params;
    return this.http.get(`${environment.baseURL}pmusha-quarterly-achievement-report?financialYear=${financialYear}&financialQuarter=${financialQuarter}&&stateId=${stateCode}&componentId=${componentId}`);
  }

    getMoocReport(params: ProgressMaxData): Observable<any> {
    const {aisheCode, componentId, financialYear, financialQuarter, stateCode, districtCode, isTargetAchievement, moocId } = params;
    return this.http.get(`${environment.baseURL}pmusha-quarterly-mooc-report?financialYear=${financialYear}&financialQuarter=${financialQuarter}`);
  }

  rusaInstitute(payload: any): Observable<any> {
    debugger
    return this.http.get<any>(`${environment.baseURL}auth/users/rusa-legacy-data-institute?rusaPhase=${payload.rusaPhase}&componentId=${payload.componentId}&stateId=${payload.stateId}`)
  }
// https://demo.he.nic.in/pmusha/auth/users/rusa-legacy-data-institute?rusaPhase=RUSA%201&componentId=1&stateId=1

}
