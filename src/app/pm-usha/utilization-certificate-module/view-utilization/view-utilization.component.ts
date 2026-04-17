import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-view-utilization',
  templateUrl: './view-utilization.component.html',
  styleUrls: ['./view-utilization.component.scss']
})
export class ViewUtilizationComponent implements OnInit {
  selectedIndex: number = 0
  hideTable: boolean = false;
  userNPD: any;
  dataList: any = [];
  stateCode: any;
  stateCodePass: any;
  idPass: any;
  constructor(public sharedService: SharedService, private getService: GetService) {
    this.userNPD = sessionStorage.getItem('userTypeId');
   }

  ngOnInit(): void {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.gfrDetail();
  }


  showTab(id: any, stateCode: any): void {
    if(id==='NewDemand'){
      this.hideTable = true;
      this.stateCodePass = stateCode;
      this.idPass = null;
    }else{
      this.hideTable = true;
      this.stateCodePass = stateCode;
      this.idPass = id;
    }
 
  }
  gfrDetail() {
    this.dataList=[];
    const payloadDetails = {
      stateCode:this.userNPD !== this.sharedService.userTypeList['7'].id&&this.userNPD !== this.sharedService.userTypeList['8'].id&&this.userNPD !== this.sharedService.userTypeList['9'].id&&this.userNPD !== this.sharedService.userTypeList['10'].id&&this.userNPD !== this.sharedService.userTypeList['6'].id&& this.userNPD !== this.sharedService.userTypeList['0'].id ? this.stateCode : false,
      isFinancialYear: true,

      // onlyFinalSubmit:this.userNPD === this.sharedService.userTypeList['11'].id&&this.userNPD === this.sharedService.userTypeList['7'].id&&this.userNPD === this.sharedService.userTypeList['8'].id&&this.userNPD === this.sharedService.userTypeList['9'].id&&this.userNPD === this.sharedService.userTypeList['10'].id&&this.userNPD === this.sharedService.userTypeList['6'].id&& this.userNPD === this.sharedService.userTypeList['0'].id ? true : false,
      onlyFinalSubmit:this.userNPD === this.sharedService.userTypeList['7'].id|| this.userNPD === this.sharedService.userTypeList['8'].id||this.userNPD === this.sharedService.userTypeList['9'].id||this.userNPD === this.sharedService.userTypeList['10'].id||this.userNPD === this.sharedService.userTypeList['6'].id||this.userNPD === this.sharedService.userTypeList['0'].id ? true : false,
    }
    this.getService.gfrDetail(payloadDetails).subscribe((res: any) => {
      if (res && res.length > 0) {
        res.forEach((el) => {
          if (el.id) {
            this.dataList.push({
              submittedOnDate: el.submittedOnDate,
              stateName: el.stateName,
              financialYear: el.financialYear===2023 ?'2023-24': '2024-25',
              quarter: el.quarter,
              id: el.id,
              stateCode: el.stateCode,
              isFinalSubmit:el.isFinalSubmit,
              isUCDocumentUploaded:el.isUCDocumentUploaded
            });
          }
        })
        this.sharedService.setUcFinancial(this.dataList)
      }
    },
      (err) => { }
    );
  }
  getDocumentFile(Data: any, Data2: any,) {

  }
  back() {
    this.hideTable = false;
    this.stateCodePass = null;
    this.idPass = null;
    this.gfrDetail();
  }
}
