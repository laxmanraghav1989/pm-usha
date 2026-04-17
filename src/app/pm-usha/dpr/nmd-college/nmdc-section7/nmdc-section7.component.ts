
import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/utility/format-datepicker.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';

@Component({
  selector: 'cfs-nmdc-section7',
  templateUrl: './nmdc-section7.component.html',
  styleUrls: ['./nmdc-section7.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
})
export class NmdcSection7Component implements OnInit {
  physical: Array<any> = [];
  formDataTimeLine: FormGroup;
  districtCode: any;
  stateCode: any;
  addUpdateButton: string = 'Save'
  addUpdate: boolean = false
  hideButton: boolean = true
  phaseCount: any = 0;
  phaseList: Array<any> = [];
  itemList: Array<any> = [];
  dataTimeLineList: Array<any> = [];
  showPage: boolean = false;
  disabledPage: boolean = false;
  academicTime: Array<any> = []
  selectedIndex: any = 0;
  isFormInvalid: boolean = false
  start: any;
  startFinance: any;
  startDateIns: any;
  paramId: any;
  newArray:any = [];
  existingRecordFilter:any = []
  item1FilterArray:any = []
  totalArr:any = []
  StatusValue: any[];
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  UpdatedataTimeLineList: any;
  FinalLockKey: any;
  aisheCode: string;
  istimelineDisabled: boolean = false;
  maxDate1 = new Date(2026, 2, 31);
  constructor(public master: MasterService, public get: GetService, public sharedService: SharedService, public notification: NotificationService,
    public api: ApiService, public common: Common, public viewportScroller: ViewportScroller, public fb: FormBuilder, public post: PostService,
    public errorMatcher: CustomErrorStateMatcher,public deleteService:DeleteService, private route: ActivatedRoute, public getService: GetService) {
    this.districtCode = sessionStorage.getItem('districtCode')
    this.stateCode = sessionStorage.getItem('stateCode')
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.aisheCode = sessionStorage.getItem("userName");
    this.formDataTimeLine = this.fb.group({
      phase: [null, [Validators.required]],
      itemId: [null, [Validators.required]],
      id: 0,
      percentageOfCompletion: [null, [Validators.required]],
      physicalTargetEndDateString: [null, []],
      physicalTargetStartDateString: [null, []],
      financialTargetEndDateString: [null, []],
      financialTargetStartDateString: [null, []],
    });
  }

  ngOnInit(): void {
    this.getEstimatesF();
    this.getPhase();
    this.getDataTimeLine()
    this.getPageStatusList()
    if (this.paramId) {
      this.saveLockStatus()
    }
  }
  tabSelected(event) {
    this.selectedIndex = event.index
    this.isFormInvalid=false
    if (this.selectedIndex === 0) {
      this.getPageStatusList()
      this.getDataTimeLine();
      this.reset();
    } if (this.selectedIndex === 1) {
      this.getAcademicTimelineList()
      this.getPageStatusList()
      // this.showPage = false

    }
  }
  getEstimatesF() {
    this.master.getEstimates().subscribe(res => {
      res.forEach(e => {
        if (e.isPhysical) {
          this.itemList.push({
            name: e.name,
            id: e.id,
          })
        }

      })
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  
  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.nmdcComponentId).subscribe(
      (res) => {
        if (res.data && res.data.length) {
          for (let index = 0; index < res.data.length; index++) {
         
             if (res.data[index].moduleName === this.common.nmdcFinal) {
              if (this.paramId === this.sharedService.revPrposal) {
                if (this.selectedIndex === 0) {
                  this.disabledPage = false
                }
                else {
                  this.disabledPage = true
                }
              }
              else if (this.paramId !== this.sharedService.revPrposal) {
                this.disabledPage = true
              }
              //  if (this.paramId === this.sharedService.revPrposal && (this.selectedIndex === 0)) {
              //   this.disabledPage = false
              //   }
              // else {
              //   this.disabledPage = true
              // }
              }
         
          }
        }
      },
      (err) => { }
    );
  }
  savePhase() {
    if (this.phaseCount === 0 || this.phaseCount === undefined || this.phaseCount === null) {
      this.notification.showValidationMessage('Please enter non zero(0) value !!!');
      return;
    }
    if (this.phaseCount < this.dataTimeLineList.length) {
      this.notification.showValidationMessage('Number of phase should not be less than Timeline details !!!')
      return;
    }
    let payload = {
      "componentId": this.sharedService.nmdcComponentId,
      "districtCode": this.districtCode,
      "phaseCount": this.phaseCount
    }
    this.api.savePhaseCount(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.showPage = true
        this.getPhase();

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getPhase() {
    this.api.getPhaseCount('', this.sharedService.nmdcComponentId, this.districtCode).subscribe(res => {
      this.phaseCount = res['Phase Count'];
      this.phaseList = [];
      var count = 1;
      for (let index = 0; index < this.phaseCount; index++) {
        this.phaseList.push(count++)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDataTimeLine() {
     if (this.paramId === this.sharedService.revPrposal) {
    this.api.getDataTimeGenderEquityRevision(this.districtCode, this.sharedService.nmdcComponentId, this.sharedService.revAddId).subscribe(
      (res) => {
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
        this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
        this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
       
        // this.dataTimeLineList = res;
        this.saveLockStatus()
        let CompareDate = '31/03/2026';
        let compareDateObject = this.parseDateUpdate(CompareDate);
        this.UpdatedataTimeLineList = this.dataTimeLineList.filter(item => item.activeStatus);
        this.StatusValue = this.UpdatedataTimeLineList.map(item => {
          let itemDateFinEnd = item.financialTargetEndDateString;
          let itemDatePhyEnd = item.physicalTargetEndDateString;
          let itemDatePhyStart = item.physicalTargetStartDateString;
          let itemDateFinStart = item.financialTargetStartDateString;
          let itemDateObjectFinEnd = this.parseDateUpdate(itemDateFinEnd);
          let itemDateObjectPhyEnd = this.parseDateUpdate(itemDatePhyEnd);
          let itemDateObjectPhyStart = this.parseDateUpdate(itemDatePhyStart);
          let itemDateObjectFinStart = this.parseDateUpdate(itemDateFinStart);
          item['trueId'] = itemDateObjectPhyStart > compareDateObject;
          item['trueId1'] = itemDateObjectFinStart > compareDateObject;
          item['trueId2'] = itemDateObjectFinEnd > compareDateObject;
          item['trueId3'] = itemDateObjectPhyEnd > compareDateObject;

            
            // item.trueId || item.trueId1 || item.trueId2 || item.trueId3)
            
          
          return item;
        });

        // let data = this.StatusValue .filter(item =>  { return item.trueId || item.trueId1 || item.trueId2 || item.trueId3 } )
      },
      (err) => { }
    );
    }
    else {
    this.get.getDataTimeNMDC(this.districtCode, this.sharedService.nmdcComponentId).subscribe(
      (res) => {
        this.dataTimeLineList = res;
      },
      (error) => { }
    );
  }
  }

  parseDateUpdate(dateStr: string): Date | null {
    if (!dateStr) return null;
    let parts = dateStr.split('/');
    if (parts.length !== 3) return null;  // Ensure the date string is properly formatted
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  parseDateUpdate1(dateStr: string): Date | null {
    if (!dateStr) return null;
    let parts = dateStr.split(' '); // Split by space
    if (parts.length !== 6) return null;  // Ensure the date string is properly formatted
    // Joining parts other than the first (day of the week) with a space
    let newDateStr = parts.slice(1).join(' ');
    return new Date(newDateStr);
}

saveLockStatus() {
    this.getService.getLockListStatus(this.aisheCode, this.sharedService.nmdcComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey) {
         
          if (this.FinalLockKey.timeline) {
            this.istimelineDisabled = true;
          }
        }
      }

    })
  }
  getAcademicTimeline() {
    this.master.getAcademic().subscribe(res => {
      this.academicTime = res
      this.academicTime = this.academicTime.map((v) => ({
        ...v,
        initiationDateString: null,
        completionDateString: null,
        adminAcademicActivityId: v.id,
        id: 0,
        startDateIns:null
      }));
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveTimeLine() {
     if (this.formDataTimeLine.invalid) {
      if (this.formDataTimeLine.controls.physicalTargetEndDateString.status === 'INVALID' || this.formDataTimeLine.controls.physicalTargetStartDateString.status === 'INVALID' || this.formDataTimeLine.controls.financialTargetStartDateString.status === 'INVALID' || this.formDataTimeLine.controls.financialTargetEndDateString.status === 'INVALID'){
        this.notification.showValidationMessage("Date Should not be greator then '31/03/2026' !!!")
      }
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    if (this.addUpdateButton === 'Save') {
      for (let index = 0; index < this.dataTimeLineList.length; index++) {
        if (parseInt(this.dataTimeLineList[index].phase) === this.formDataTimeLine.value.phase  && this.dataTimeLineList[index].itemId === this.formDataTimeLine.value.itemId) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      }
    } else {
      for (let index = 0; index < this.dataTimeLineList.length; index++) {
        if (this.dataTimeLineList[index].id !== this.formDataTimeLine.value.id) {
          if (parseInt(this.dataTimeLineList[index].phase) === this.formDataTimeLine.value.phase &&  this.dataTimeLineList[index].itemId === this.formDataTimeLine.value.itemId) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }
      }
    }
    let physicalTargetStartDateString = null;
    let physicalTargetEndDateString = null;
    let financialTargetStartDateString = null;
    let financialTargetEndDateString = null;
    if (this.formDataTimeLine.value.physicalTargetStartDateString) {
      let day: string = this.formDataTimeLine.value.physicalTargetStartDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.physicalTargetStartDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.physicalTargetStartDateString.getFullYear();
      physicalTargetStartDateString = `${day}/${month}/${year}`;
      physicalTargetStartDateString.toString();
    }
    if (this.formDataTimeLine.value.physicalTargetEndDateString) {
      let day: string = this.formDataTimeLine.value.physicalTargetEndDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.physicalTargetEndDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.physicalTargetEndDateString.getFullYear();
      physicalTargetEndDateString = `${day}/${month}/${year}`;
      physicalTargetEndDateString.toString();
    }
    if (this.formDataTimeLine.value.financialTargetStartDateString) {
      let day: string = this.formDataTimeLine.value.financialTargetStartDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.financialTargetStartDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.financialTargetStartDateString.getFullYear();
      financialTargetStartDateString = `${day}/${month}/${year}`;
      financialTargetStartDateString.toString();
    }
    if (this.formDataTimeLine.value.financialTargetEndDateString) {
      let day: string = this.formDataTimeLine.value.financialTargetEndDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.financialTargetEndDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.financialTargetEndDateString.getFullYear();
      financialTargetEndDateString = `${day}/${month}/${year}`;
      financialTargetEndDateString.toString();
    }

    let temp = [];
    temp.push({

      componentId: this.sharedService.nmdcComponentId,
      districtCode: this.districtCode,
      financialTargetEndDateString: financialTargetEndDateString,
      financialTargetStartDateString: financialTargetStartDateString,
      id: this.formDataTimeLine.value.id,

      itemId: this.formDataTimeLine.value.itemId,
      percentageOfCompletion:
        this.formDataTimeLine.value.percentageOfCompletion,
      phase: this.formDataTimeLine.value.phase,
      physicalTargetEndDateString: physicalTargetEndDateString,
      physicalTargetStartDateString: physicalTargetStartDateString,
      stateCode: this.stateCode,
    });
    this.api.saveTimeLineData(temp, this.common.nmdcInfraTimeLine).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getDataTimeLine();
        this.reset();
      }
    });
  }
  add() {
    this.addUpdate = true;
    this.hideButton = false;
    this.addUpdateButton = "Save";
    if (this.phaseCount && this.phaseCount !== 0) {
      this.showPage = true
    }
  }
  editTimeLine(item: any) {
    this.showPage = true
    this.viewportScroller.scrollToPosition([0, 0]);
    this.formDataTimeLine.patchValue(item);
    this.formDataTimeLine.get('phase')?.setValue(parseInt(item.phase));
    this.formDataTimeLine.get('physicalTargetStartDateString')?.setValue(this.formatDate(item.physicalTargetStartDateString))
    this.formDataTimeLine.get('physicalTargetEndDateString')?.setValue(this.formatDate(item.physicalTargetEndDateString))
    this.formDataTimeLine.get('financialTargetStartDateString')?.setValue(this.formatDate(item.financialTargetStartDateString))
    this.formDataTimeLine.get('financialTargetEndDateString')?.setValue(this.formatDate(item.financialTargetEndDateString));
    this.addUpdateButton = "Update";
    this.addUpdate = true;
    this.hideButton = false
  }
  private formatDate(date) {
    if (date) {
      let split_dateAsString1 = date.split('/')
      let final_format1 = new Date(`${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`);
      return final_format1;
    }
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  close() {
    this.addUpdateButton = "Save";
    this.addUpdate = false;
    this.hideButton = true;
    this.reset();
    this.showPage = false

  }
  reset() {
    this.addUpdateButton = "Save";
    this.formDataTimeLine.reset();
    this.formDataTimeLine.get('id')?.setValue(0)
  }
  saveTab1() {
    let temp = []
   
    this.academicTime.forEach(e => {
      let completionDateString = null
      let initiationDateString = null
      if (e.completionDateString) {
        let day: string = e.completionDateString.getDate().toString();
        day = +day < 10 ? '0' + day : day;
        let month: string = (e.completionDateString.getMonth() + 1).toString();
        month = +month < 10 ? '0' + month : month;
        let year = e.completionDateString.getFullYear();
        completionDateString = `${day}/${month}/${year}`;
        completionDateString.toString();
      }
      if (e.initiationDateString) {
        let day: string = e.initiationDateString.getDate().toString();
        day = +day < 10 ? '0' + day : day;
        let month: string = (e.initiationDateString.getMonth() + 1).toString();
        month = +month < 10 ? '0' + month : month;
        let year = e.initiationDateString.getFullYear();
        initiationDateString = `${day}/${month}/${year}`;
        initiationDateString.toString();
      }
      temp.push({
        adminAcademicActivityId: e.adminAcademicActivityId,
        completionDateString: completionDateString,
        initiationDateString: initiationDateString,
        id: e.id,
        districtCode: this.districtCode,
        componentId: this.sharedService.nmdcComponentId,
        stateCode: this.stateCode

      })
    })

    this.post.saveAcademic(temp, this.common.nmdcAcademic).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getAcademicTimelineList()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getAcademicTimelineList() {
    this.get.acadeicAdminTime(this.districtCode).subscribe(res => {
      if (res && res.length) {
        this.academicTime = res;
        this.academicTime.forEach(e => {
          e['startDateIns']=null
          if (e.completionDateString) {
            let split_dateAsString1 = e.completionDateString.split('/')
            let final_format1 = new Date(`${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`);
            e.completionDateString = final_format1
           
          } if (e.initiationDateString) {
            let split_dateAsString2 = e.initiationDateString.split('/')
            let final_format2 = new Date(`${split_dateAsString2[2]}-${split_dateAsString2[1]}-${split_dateAsString2[0]}`);
            e.initiationDateString = final_format2
            e.startDateIns = e.initiationDateString
          }
          e.name = e.adminAcademicActivity
        })
      } else {
        this.getAcademicTimeline()
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  delete(item){
    this.common.delete().subscribe(res => {
      if (res) {
        if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteTimeLineRevision(item, this.sharedService.revAddId, false).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showDelete()
                this.getDataTimeLine();
  
              }
            }, err => {
  
            })
        }
        else {
        this.deleteService.deleteTimeLine(item).subscribe(res => {
          if (res.status === 200) {
            this.notification.showDelete()
            this.getDataTimeLine();
            
          }
        }, err => {

        })
        }

      }
    })
  }
  dateChangeP(event) {
    const m = event.value;
    if (m) {
      this.formDataTimeLine.get('physicalTargetEndDateString').setValue(null)
      this.start = m;
    }
  }
  dateChangeFinance(event) {
    const m = event.value;
    if (m) {
      this.formDataTimeLine.get('financialTargetEndDateString').setValue(null)
      this.startFinance = m;
    }
  }
  compareAcademicDate(event,i){
    const m = event.value;
    if (m) {
      this.academicTime[i].completionDateString=null
      this.academicTime[i]['startDateIns']=m
    }
  }
  clearDateValue(control: any) {
   this.academicTime
 
  }
  clearDate() {
    this.formDataTimeLine.controls['physicalTargetStartDateString'].reset()
    event.stopPropagation();
    //this.date = null;
  }

    restore(item: any) {
    this.hideButton = true;
    this.common.delete().subscribe(res => {
      if (res) {
          this.deleteService.deleteTimeLineRevision(item, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getDataTimeLine();

            }
          }, err => {

          })
      }
    })
  }

   resetTotal() {
 
  }

   getClass(item: any): any {
    return {
      // 'revision-row': item?.recordStatus?.id === 3 && item?.activeStatus === true,
      // 'revision-row1': item?.recordStatus?.id === 1,
      'delete-row': item?.recordStatus?.id === 2 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal),
      'update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === true && this.paramId === this.sharedService.revPrposal),
      'old-update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal),
      'disabled-row1': item?.recordStatus?.id === 1 && this.paramId === this.sharedService.revPrposal,
    };
  }

  getTitle(item: any): string {
    if (item?.recordStatus?.id === 3 && item?.activeStatus === true && this.paramId === this.sharedService.revPrposal) {
      return 'Existing Record Updated';
    } else if (item?.recordStatus?.id === 1 && this.paramId === this.sharedService.revPrposal) {
      return 'New Addition';
    }
    else if (item?.recordStatus?.id === 2 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal)) {
      return 'Deleted Record';
    }
    else if (item?.recordStatus?.id === 3 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal)) {
      return 'Old Existing Record';
    }
    return '';
  }

  LockProposaltime(lockValue) {
  this.StatusValue = this.dataTimeLineList.filter(item => {
    return (item.trueId === true || item.trueId1 === true || item.trueId2 === true || item.trueId3 === true)
  });
  if (this.StatusValue.length > 0) {
    this.notification.showValidationMessage("Date Should not be greator then '31/03/2026' !!!");;
  }
  else {
    let commonObj = this.common.newObj
    let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
    let filterObjValue = filterObjt[0][1]
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = {
        aisheCode: this.aisheCode,
        componentId: this.sharedService.nmdcComponentId,
        constant: lockValue,
        districtCode: sessionStorage.getItem("districtCode"),
        // instituteCategory: characters,
        stateCode: this.stateCode,
        status: true
      }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(`${filterObjValue} has been Loked successfully!!!`);
        this.saveLockStatus();
        this.reset();
        this.close()
      }
    });
  }


}
}
