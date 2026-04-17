
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from './http.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Injectable()
export class CollegeService {
  aisheCode: string;
  instituteType: string
  params: { aisheCode: string; instituteCaterogy: string; };
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
  getRenovatedListReviosn(aisheCode,instituteType,componentId,districtCode,pabStatus):Observable<any>{
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
  getSoftCompoenentListRevision(aisheCode,componentId, pabStatus):Observable<any>{
    const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    return this.http.get(`institute/soft-component-activity?aisheCode=${encryptedAishe}&componentId=${componentId}&pabStatusId=${pabStatus}`);
  }
  saveInfraConstruction(payload:any,menu:any):Observable<any>{
    const dada=[...payload];
    return this.http.post(`institute/infrastructure_construction?menu=${menu}`,payload);
  }
  saveRenovated(payload:any,menu:any):Observable<any>{
    return this.http.post(`institute/infrastructure-renovation?menu=${menu}`,payload);
  }
  saveEquipment(payload:any,menu:any):Observable<any>{
    return this.http.post(`institute/equipment?menu=${menu}`,payload);
  }
  saveSoftCompoenent(payload:any,menu:any):Observable<any>{
    return this.http.post(`institute/soft-component-activity?menu=${menu}`,payload);
  }
  
}
