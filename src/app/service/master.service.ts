import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EncryptDecrypt } from '../utility/encrypt-decrypt';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(public http: HttpClient, private encrypt: EncryptDecrypt) { }
  getState(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-state`)
  }
  getStateData(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-state-data`)
  }
  getDistrictList(stateCode: any): Observable<any> {
    return this.http.get<any>(`${environment.masterUrl}/api/district/${stateCode}`)
  }
  getUniversity(): Observable<any> {
    return this.http.get<any>(`${environment.masterUrl}/api/university?stateCode=${sessionStorage.getItem('stateCode')}&year=2021`)
  }
  getActivityList(): Observable<any> {
    return this.http.get(`${environment.baseURL}auth/users/ref-activity`)
  }
  getGenderList():Observable<any>{
    return this.http.get(`${environment.baseURL}auth/users/ref-gender`)

  }
  getLevel(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-course-level`)
  }
  getProgramme(level: any): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-programme?levelId=${level}`)
  }
  getEstimates():Observable<any>{
    return this.http.get<any>(`${environment.baseURL}institute/ref-item-physical-financial`)

  }
  getAcademic(){
    return this.http.get<any>(`${environment.baseURL}institute/ref-admin-academic-activity`)
  }
  getProposalScore(componentId){
    return this.http.get<any>(`${environment.baseURL}institute/ref-proposal-score-basis-indicator?componentId=${componentId}&baseId=9`)
  }
  getInstituteByAISHE(aisheCode: any,stateCode:any,type:any): Observable<any> {
  const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
  return this.http.get<any>(`${environment.baseURLInstituteManagement}institutionDirectory /institute-list?aisheCode=${encryptedAishe}&stateCode=${stateCode}&categoryType=${type}`)
  }

  getNPDAction(){
    return this.http.get<any>(`${environment.baseURL}auth/users/ref-npd-status`)
  }

  getTagging(proposalActivityId){
    return this.http.get<any>(`${environment.baseURL}institute/ref-proposal-item-tagging?proposalActivityId=${proposalActivityId}`)
  }

  getTaggingDetails(){
     return this.http.get<any>(`${environment.baseURL}institute/ref-proposal-item-tagging`)
  }
}
