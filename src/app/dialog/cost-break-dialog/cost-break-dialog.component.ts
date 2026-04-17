import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'cfs-cost-break-dialog',
  templateUrl: './cost-break-dialog.component.html',
  styleUrls: ['./cost-break-dialog.component.scss']
})
export class CostBreakDialogComponent implements OnInit {
  aisheCode: any;
  criteriaList: any;
  total: any;
  componentId: any;
  stateName: any;
  districtName: any;
  costList: any;
  totalCostMain: any;
  districtCode: any;
  instituteName: any;
  stateName1: any;
  viewId: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiPost: PostService, public notification: NotificationService, 
    public common: Common, public sharedService: SharedService,public getService: GetService) { }

  ngOnInit(): void {
    this.viewId = this.dialogRef.id;
    setTimeout(() => {
      this.sharedService.global_loader=true
      this.getCostList();
    }, 1000)
   
    this.stateName = this.data.name;
    this.aisheCode = this.data.aisheCode;
    this.districtName = this.data.districtName;
    this.stateName1 = this.data.stateName;
    this.instituteName = this.data.instituteName;
  }
  getCostList() {
    if(this.data.componentId == this.sharedService.nmdcComponentId || this.data.componentId == this.sharedService.genderComponentId){
      this.districtCode = this.data.districtCode;
    }else{
      this.districtCode = this.data.aisheCode;
    }
    if (this.viewId){
      this.getService.getProposalCostRevision(this.districtCode,this.data.componentId, this.data.pabActionId).subscribe(res => {
        if (res && res.length) {
          this.costList = res;
  
          this.totalCostMain = this.costList.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
        }
  
      }, err => {
  
      })
    }
    else{
      this.getService.getProposalCost(this.districtCode,this.data.componentId).subscribe(res => {
        if (res && res.length) {
          this.costList = res;
  
          this.totalCostMain = this.costList.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
        }
  
      }, err => {
  
      })
    }
    
  }
}
