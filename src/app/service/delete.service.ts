import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(public http: HttpClient) { }

  deleteDistrictHigherEducation(districtCode): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}focus-district-higher-education-data?districtCode=${districtCode}`)
  }

  deleteDepartment(id, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}department?id=${id}&componentId=${componentId}`)
  }

  deleteDocuments(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}document?id=${id}`)
  }



  deleteCourse(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}course?id=${id}`)
  }
  deleteInfra(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infrastructure?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}`)
  }
  deleteInfraRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infrastructure?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteRenovated(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infra-renovation?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}`)
  }
  deleteRenovatedRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infra-renovation?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteInfraNMDCGender(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infrastructure?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}`)
  }
  deleteInfraNMDCGenderRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infrastructure?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteRenovatedNMDCGender(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infra-renovation?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}`)
  }
  deleteRenovatedNMDCGenderRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}infra-renovation?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteEquipment(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}equipment?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}`)
  }
  deleteEquipmentRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}equipment?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteEquipmentNMDCGender(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}equipment?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}`)
  }
  deleteEquipmentNMDCGenderRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}equipment?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteWorkshopNMDCGenderRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}workshop?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteRemedialNMDCGenderRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}remedial-class?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteVocationalNMDCGenderRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-activity-detail-for-improving-skill?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteActivityNMDCGenderRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-other-activity-detail?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteSoft(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}soft-component?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}`)
  }
  deleteSoftRevision(item, componentId, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}soft-component?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteProposedCourse(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-course?id=${item.id}&aisheCode=${item.aisheCode}&componentId=${componentId}`)
  }
  deleteProposedCourseNMDC(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-course?id=${item.id}&aisheCode=${item.districtCode}&componentId=${componentId}`)
  }
  deleteTimeLine(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}timeline?id=${item.id}`)
  }
  deleteTimeLineRevision(item, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}timeline?id=${item.id}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteFinancial(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}financial-estimate?id=${item.id}`)
  }
  deleteFinancialRevision(item, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}financial-estimate?id=${item.id}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteOtherSource(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}other-source-of-fund?id=${item.id}`)
  }
  deleteRusa(item, componentId): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}rusa-approved?id=${item.id}&componentId=${componentId}`)

  }
  deleteWorkshop(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}workshop?id=${item.id}`)
  }
  deleteWorkshopRevision(item, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}workshop?id=${item.id}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteRemedial(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}remedial-class?id=${item.id}`)
  }
  deleteRemedialRevision(item, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}remedial-class?id=${item.id}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteSTEMCourse(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-stem-course?id=${item.id}`)
  }
  deleteVocational(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-activity-detail-for-improving-skill?id=${item.id}`)
  }
  deleteVocationalRevision(item, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-activity-detail-for-improving-skill?id=${item.id}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteActivity(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-other-activity-detail?id=${item.id}`)
  }
  deleteActivityRevision(item, pabStatus, restoreData): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}proposed-other-activity-detail?id=${item.id}&pabStatusId=${pabStatus}&restoreData=${restoreData}`)
  }
  deleteActivityAll(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}scheme-activity-detail?id=${item.id}`)
  }
  deleteAnticipated(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}anticipated-enrolment?id=${item.id}`)
  }
  deleteComponentMapping(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}component-mapping?id=${item}`)
  }
  deleteSNA(item): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}sna-document?id=${item.id}&stateFundRequestDetailId=${item.stateFundRequestDetailId}`)
  }
  deleteEvent(id) {
    return this.http.delete<any>(`${environment.baseDeleteURL}event-detail?id=${id}`)
  }

  deleteFinicialDoc(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseDeleteURL}ifd-state-central-release-since-inception-rusa?id=${id}`)
  }
}

