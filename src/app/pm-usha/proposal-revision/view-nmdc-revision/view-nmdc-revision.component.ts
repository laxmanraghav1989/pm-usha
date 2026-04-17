import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'cfs-view-nmdc-revision',
  templateUrl: './view-nmdc-revision.component.html',
  styleUrls: ['./view-nmdc-revision.component.scss']
})
export class ViewNmdcRevisionComponent implements OnInit {
  public routers: typeof routes = routes;
  componentId: any;
  aisheCode: string;
  districtCode: string;
  addRemarks: any
  userTypeId: string;
  costList: any;
  totalCost: any;
  isInfraConstruction: any;
  newArray: any[];
  deleteFilterArr: any;
  updateIdArrFilter: any;
  item1FilterArray: any[];
  existingRecordFilter: any;
  newFilterArr: any;
  oldIdArrFilter: any;
  totalArr: any;
  itemList: any[];
  proposedArea: any;
  perUnitCost: any;
  equipmentData: any[];
  quantity: any;
  equipmentperUnitCost: any;
  equipmenttotalCost: any;
  dataTimeLineList: any[];
  id: number;
  hiddenValue:boolean=true;
  districtName: string;
  appId: number;

  constructor(public getService: GetService, public common: Common, public router: Router, public sharedService: SharedService, public api: ApiService, private route: ActivatedRoute) { 
    this.aisheCode = sessionStorage.getItem('aisheCode')
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.appId = parseInt(this.route.snapshot.paramMap.get('AppId'));
    this.componentId = this.sharedService.nmdcComponentId

    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
      this.districtCode = sessionStorage.getItem('districtCodeGender');
      this.districtName = sessionStorage.getItem('districtNameNMDC');
    }
  }

  ngOnInit(): void {
  }

    downloadPdfAisheCode() {
    let payload = {
      componentId: this.componentId,
      exportType: 'PDF',
      aisheCode: this.aisheCode,
      districtCode: this.districtCode,
      revisedProposal : true
    }
    this.getService.downloadByAisheCodeRevision(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)
        
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

    back(){
    sessionStorage.setItem('back','true')
    if (this.appId){
      this.router.navigate([this.routers.pmushaFinalApprove, this.sharedService.finApproveLIst])
    }
    else {
    this.router.navigate([this.routers.pmushalistRevision, this.sharedService.revPrposal])
    }
  }

    tabValue(e, prposalId){
    if (e === 'propsalCost') {
      this.getCostListRevision()
    }
    if ((e === 'infraConstriuction') && (prposalId === 1)) {
      this.getInfraCons()
    }
    else if ((e === 'equipmentProc') && (prposalId === 3)) {
      this.getEquipment()
    }
   
    else if ((e === 'timeline') && (prposalId === 33)) {
      // this.getRemarkData(prposalId)
      this.getTimelineData(prposalId)
    }
  }

   getCostListRevision() {
    this.getService.getProposalCostRevision( this.districtCode , this.id, this.sharedService.revAddId).subscribe(res => {
      if (res && res.length) {
        this.costList = res;

        this.totalCost = this.costList.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getInfraCons() {
      this.api.getInfraConstructionGenderRevision(this.districtCode, this.sharedService.nmdcComponentId, "1").subscribe(
        (res) => {
          this.processInfraResponse(res)
        },
        (err) => { }
      );
  }

  processInfraResponse(res) {
    this.isInfraConstruction = [];
    this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
         if (this.appId){
              this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.isInfraConstruction = this.isInfraConstruction.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3)
            );
          }
          else {
              this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.isInfraConstruction = this.isInfraConstruction;
          }
    // this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.isInfraConstruction.filter(item => item.activeStatus == true)
    
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.description
      });
    });
    this.proposedArea = this.totalArr.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );
    this.perUnitCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    
}

 getEquipment() {
      this.api.getEquipmentGenderEquityRevision(this.districtCode, this.sharedService.nmdcComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processEquoResponse(res)
        },
        (err) => { }
      );
  }

  processEquoResponse(res) {
    this.equipmentData = [];
      this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
      if (this.appId){
              this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.equipmentData = this.equipmentData.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3)
            );
          }
          else {
              this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.equipmentData = this.equipmentData;
          }
    // this.equipmentData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.equipmentData.filter(item => item.activeStatus == true)
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.name
      });
    });
    this.quantity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    this.equipmentperUnitCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.equipmenttotalCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }

  getTimelineData(propId) {
      this.api.getDataTimeGenderEquityRevision(this.districtCode, this.sharedService.nmdcComponentId, this.sharedService.revAddId)
        .pipe(
          tap(res => {
            this.dataTimeLineList = []
            this.newArray = []
           
              this.deleteFilterArr = res.filter(item => item.recordStatus?.id === 2)
              this.updateIdArrFilter = res.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
              this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
              this.existingRecordFilter = res.filter(item => item.activeStatus == true && item.recordStatus == null)
              this.newFilterArr = res.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
              this.oldIdArrFilter = res.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
                  this.updateIdArrFilter.forEach(item1 => {
                this.oldIdArrFilter.forEach(item2 => {
                    if (item1.oldId === item2.id) {
                        this.newArray.push(item2, item1);
                    }
                });
            });
            this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray;
            if (this.appId){
              this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataTimeLineList = this.dataTimeLineList.filter(item =>
              // ❌ hide deleted
              !(item.recordStatus?.id === 2) &&
              // ❌ hide existing (old v2 only)
              !(item.activeStatus == false && item.recordStatus?.id === 3)
            );
          }
          else {
              this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
              this.dataTimeLineList = this.dataTimeLineList;
          }
            // this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          }),
          // switchMap(() => this.getService.getRemarkList(propId, this.componentId, this.aisheCode)),
          // tap(res => {
          //   this.getremarkData = res.data;
          //   this.getMergedData(this.courseData);
          // }),
          catchError(err => {
            // Handle errors here, perhaps logging them or showing a user-friendly message.
            return of(null);
          })
        ).subscribe();
    }

     getClass(item: any): any {
    return {
      'delete-row': item?.recordStatus?.id === 2 && (item?.activeStatus === false),
      'update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === true),
      'old-update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === false),
      'disabled-row1': item?.recordStatus?.id === 1,
    };
  }


  getTitle(item: any): string {
    if (item?.recordStatus?.id === 3 && item?.activeStatus === true) {
      return 'Existing Record Updated';
    } else if (item?.recordStatus?.id === 1) {
      return 'New Addition';
    }
    else if (item?.recordStatus?.id === 2 && (item?.activeStatus === false)) {
      return 'Deleted Record';
    }
    else if (item?.recordStatus?.id === 3 && (item?.activeStatus === false)) {
      return 'Old Existing Record';
    }
    return '';
  }

  download(doc, name) {
    if (doc) {
      this.common.viewPdf(doc, name)
    }
  }

}
