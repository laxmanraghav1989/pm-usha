import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-nmdc-section6',
  templateUrl: './nmdc-section6.component.html',
  styleUrls: ['./nmdc-section6.component.scss']
})
export class NmdcSection6Component implements OnInit {
  otherSource: Array<any> = [];
  financial: Array<any> = []
  physical: Array<any> = []
  districtCode: any
  stateCode: string;
  disabledPage: boolean = false;
  selectedIndex: any = 0
  other: boolean = false
  otherF: boolean = false
  isFormInvalid: boolean = false
  otherSourceOfFunds:boolean=false
  constructor(public common: Common, public sharedService: SharedService, public notification: NotificationService, public post: PostService,
    public get: GetService, public master: MasterService, public api: ApiService,public deleteService:DeleteService) {
    this.districtCode = sessionStorage.getItem('districtCode')
    this.stateCode = sessionStorage.getItem('stateCode')
  }

  ngOnInit(): void {
    this.getDataFinancialEstimate();
    this.getPageStatusList();
  }
  tabSelected(event) {
    this.selectedIndex = event.index
    this.isFormInvalid = false
    if (this.selectedIndex === 0) {
      this.getDataFinancialEstimate()
    } if (this.selectedIndex === 1) {
      this.getDataFinancial()
    }
    if (this.selectedIndex === 2) {
      this.getOtherSource();
      this.getBooleanData()
  }
  }
  getBooleanData() {
    this.get.getBooleanList('', this.sharedService.nmdcComponentId,this.districtCode).subscribe(res => {
      this.otherSourceOfFunds = res['0'].isOtherSourceOfFund
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveOtherSourceBoolean() {
    let payload={
     // "aisheCode": '',
      "componentId": this.sharedService.nmdcComponentId,
      "districtCode": this.districtCode,
      "isOtherSourceOfFund": this.otherSourceOfFunds,
      "menu":this.common.nmdcBasicOtherSource
    }
    this.post.saveBoolean(payload).subscribe(res => {
      if (res.status === 200){
        this.getBooleanData()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  checkOther(event){
    for (let index = 0; index < this.otherSource.length; index++) {
      if(this.otherSource[index].id !== 0){
        this.notification.showValidationMessage('Please Delete all row.')
        event.preventDefault();
      }
      
    }
  }
  delete(e, i) {
    this.common.delete().subscribe(res => {
      if (res) {
        if (e.id === 0) {
          this.otherSource.splice(i, 1);
          this.notification.showDelete();
          if (i === 0) {
            this.add()
          }
        } else {
          this.deleteService.deleteOtherSource(e).subscribe(res => {
            if (res.status === 200) {
              this.getOtherSource();
              this.getBooleanData()
            }
          }, err => {

          })
        }
      }
    })
  }
  anyOther(value) {
    if (value) {
      this.other = true
    } else {
      this.other = false
    }
  }
  anyOtherF(value) {
    if (value) {
      this.otherF = true
    } else {
      this.otherF = false
    }
  }
  getEstimates() {
    this.master.getEstimates().subscribe(res => {
      this.physical = [];
      this.financial = [];
      res.forEach(e => {
        if (e.isPhysical) {
          this.physical.push({
            id: 0,
            itemId: e.id,
            proposedArea: 0,
            itemName: e.name
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
              this.disabledPage = true;
            }

          }
        }
      },
      (err) => { }
    );
  }

  getEstimatesF() {
    this.master.getEstimates().subscribe(res => {
      this.physical = [];
      this.financial = [];
      res.forEach(e => {
        if (e.isFinancial) {
          this.financial.push({
            id: 0,
            amount2023: 0,
            amount2024: 0,
            amount2025: 0,
            itemName: e.name,
            itemId: e.id
          })
        }

      })
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  add() {
    this.otherSource.push({
      "activity": '',
      "amount": 0,
      "componentId": this.sharedService.nmdcComponentId,
      "districtCode": this.districtCode,
      "id": 0,
      "scheme": "",
      "stateCode": this.stateCode
    })
  }
  submit() {

    for (let index = 0; index < this.otherSource.length; index++) {
      this.otherSource[index].stateCode = this.stateCode,
        this.otherSource[index].districtCode = this.districtCode
      if (this.otherSource[index].activity === '' || this.otherSource[index].scheme === '' || this.otherSource[index].amount === null) {
        this.notification.showValidationMessage('Please enter all field !!!');
        this.isFormInvalid = true
        return;
      } else {
        this.isFormInvalid = false
      }
    }
    this.post.postNMDCOtherSource(this.otherSource, false, this.common.nmdcBasicOtherSource).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getOtherSource();
        this.saveOtherSourceBoolean()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getOtherSource() {
    this.get.getOtherSourceListNMDC(this.districtCode, this.sharedService.nmdcComponentId).subscribe(res => {
      if (res.otherSourceOfFund && res.otherSourceOfFund.length) {
        this.otherSource = res.otherSourceOfFund
      } else {
        this.otherSource = [];
        this.add()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  saveTab0() {
    let temp = []
    for (let index = 0; index < this.physical.length; index++) {
      if (this.physical[index].proposedArea === null) {
        this.notification.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false
        temp.push({
          itemId: this.physical[index].itemId,
          proposedArea: this.physical[index].proposedArea,
          stateCode: this.stateCode,
          districtCode: this.districtCode,
          componentId: this.sharedService.nmdcComponentId,
          id: this.physical[index].id
        })
      }
    }

    this.post.postFinancial(temp, this.common.nmdcPhysical).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getDataFinancialEstimate();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDataFinancial() {
    this.get.getFinancialEstimate(this.districtCode, this.sharedService.nmdcComponentId, true).subscribe((res) => {
      if (res && res.length) {
        this.financial = res;
      } else {
        this.getEstimatesF()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDataFinancialEstimate() {
    this.get.getFinancialEstimate(this.districtCode, this.sharedService.nmdcComponentId, false).subscribe((res) => {
      if (res && res.length) {
        this.physical = res;
      } else {
        this.getEstimates()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveTab1() {
    let temp = []
    for (let index = 0; index < this.financial.length; index++) {
      if (this.financial[index].amount2023 === '' || this.financial[index].amount2024 === '' || this.financial[index].amount2025 === '') {
        this.notification.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false
        temp.push({
          id: this.financial[index].id,
          amount2023: this.financial[index].amount2023,
          amount2024: this.financial[index].amount2024,
          amount2025: this.financial[index].amount2025,
          stateCode: this.stateCode,
          districtCode: this.districtCode,
          componentId: this.sharedService.nmdcComponentId,
          itemId: this.financial[index].itemId
        })

      }

    }
    this.post.postFinancial(temp, this.common.nmdcFinancialEstimate).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getDataFinancial();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  reset() {
    this.isFormInvalid = false
    if (this.selectedIndex === 0) {
      this.physical.forEach(element => {
        element.proposedArea = null
      });
    } if (this.selectedIndex === 1) {
      this.financial.forEach(element => {
        element.amount2023 = ''
        element.amount2024 = ''
        element.amount2025 = ''
      });
    } if (this.selectedIndex === 2) {
      this.otherSource.forEach(element => {
        element.amount = null
        element.scheme = ''
        element.activity = ''
      });
    }
  }
}

