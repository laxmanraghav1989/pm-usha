
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from './http.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';



@Injectable()
export class PmushaService {
  aisheCode: string;
  instituteType: string
  params: { aisheCode: string; instituteCaterogy: string; };
  encryptedAishe: any;
  constructor(public http: HttpService, private encrypt: EncryptDecrypt) {
    this.aisheCode = sessionStorage.getItem('aisheCode')
    let instituteCaterogy = this.aisheCode.split(/[\W\d]+/).join("");
    if(instituteCaterogy === 'C'){
      this.instituteType = 'COLLEGE'
    }
  }
  // saveInfra(payload: any): Observable<any> {
  //   return this.http.post<any>(`${environment.baseURL}institute/infrastructure_construction`, payload)
  // }
  getInfraCnstruction(aisheCode,instituteType,componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/infrastructure_construction?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`);
  }          
  
  
  getInfraCnstructionRevision(aisheCode,instituteType,componentId,districtCode,pabStatus): Observable<any> {
  const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/infrastructure_construction?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatus=${pabStatus}`);
  }
  getRenovatedList(aisheCode,instituteType,componentId):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/infrastructure-renovation?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`);
  }
  getRenovatedListRevision(aisheCode,instituteType,componentId,districtCode,pabStatus):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/infrastructure-renovation?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatus=${pabStatus}`);
  }
  getEquipmentList(aisheCode,instituteType,componentId):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/equipment?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`);
  }
  getEquipmentListRevision(aisheCode,instituteType,componentId,districtCode,pabStatus):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/equipment?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatus=${pabStatus}`);
  }
  getSoftCompoenentList(aisheCode,instituteType,componentId):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/soft-component-activity?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}`);
  }
  getSoftCompoenentListRevision(aisheCode,instituteType,componentId,districtCode,pabStatus):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/soft-component-activity?aisheCode=${encryptedAishe}&instituteCategory=${instituteType}&componentId=${componentId}&districtCode=${districtCode}&pabStatusId=${pabStatus}`);
  }
  saveInfraConstruction(payload:any,menu:any):Observable<any>{
    return this.http.get(`institute/infrastructure_construction?menu=${menu}`,payload);
  }
  saveRenovated(payload:any,menu:any):Observable<any>{
    return this.http.get(`institute/infrastructure-renovation?menu=${menu}`,payload);
  }
  saveEquipment(payload:any,menu:any):Observable<any>{
    return this.http.get(`institute/equipment?menu=${menu}`,payload);
  }
  saveSoftCompoenent(payload:any,menu:any):Observable<any>{
    return this.http.get(`institute/soft-component-activity?menu=${menu}`,payload);
  }

  getActivitiesGenderEquity(aisheCode, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/common-activity-details?aisheCode=${encryptedAishe}&componentId=${componentId}`);
  }

  getOtherInformation(aisheCode, componentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/other-information?aisheCode=${encryptedAishe}&componentId=${componentId}`);
  }

  getDprDocumentRevision(aisheCode, districtCode, componentId, documentTypeId, documentId): Observable<any> {
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/document?aisheCode=${encryptedAishe}&districtCode=${districtCode}&componentId=${componentId}&documentTypeId=${documentTypeId}&documentId=${documentId}`);
  }
  getDPRDoc(data:any): Observable<any>{
    const encryptedAishe = data.aisheCode ? this.encrypt.getEncryptedValue(data.aisheCode) : '';
    return this.http.get(`institute/document-get?aisheCode=${encryptedAishe}&documentTypeId=${data.documentTypeId}&documentId=${data.documentId}`)
  }
  getDPRDocEquityV3(data:any): Observable<any>{
    return this.http.get(`institute/document-get?districtCode=${data.districtCode}&documentTypeId=${data.documentTypeId}&documentId=${data.documentId}`)
  }

  getGenInfraCnstruction(districtCode,componentId): Observable<any> {
    return this.http.get(`institute/infrastructure_construction?districtCode=${districtCode}&componentId=${componentId}`);
  }

  getGenRenovatedList(districtCode,componentId): Observable<any> {
    return this.http.get(`institute/infrastructure-renovation?districtCode=${districtCode}&componentId=${componentId}`);
  }

  getGenRenovatedListStatus(districtCode,componentId,pabStatus): Observable<any> {
    return this.http.get(`institute/infrastructure-renovation?districtCode=${districtCode}&componentId=${componentId}&pabStatus=${pabStatus}`);
  }



  getGenEquipmentList(districtCode,componentId):Observable<any>{
    return this.http.get(`institute/equipment?districtCode=${districtCode}&componentId=${componentId}`)

  }

  getGenEquipmentListRevision(districtCode,componentId, pabStatus):Observable<any>{
    return this.http.get(`institute/equipment?districtCode=${districtCode}&componentId=${componentId}&pabStatus=${pabStatus}`)

  }

  getGenPrposelActivity(districtCode,componentId):Observable<any>{
    return this.http.get(`equity/proposed-other-activity-detail?districtCode=${districtCode}&componentId=${componentId}`)
  }

  getGenPrposelOutcome(districtCode,componentId):Observable<any>{
    return this.http.get(`institute/proposed-outcome?districtCode=${districtCode}&componentId=${componentId}`)
  }

  getGenActivityDetails(districtCode,componentId):Observable<any>{
    return this.http.get(`institute/common-activity-details?districtCode=${districtCode}&componentId=${componentId}`)
  }

  getGenOtherInformation(districtCode,componentId): Observable<any> {
    return this.http.get(`institute/other-information?districtCode=${districtCode}&componentId=${componentId}`)
  }

  getbuildConstructionnmdc(districtCode,componentId): Observable<any> {
    return this.http.get(`institute/infrastructure_construction?districtCode=${districtCode}&componentId=${componentId}`)
  }


  
  
}
