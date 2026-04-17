import { Component, Inject, OnInit } from '@angular/core';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-score-breakup-dialog',
  templateUrl: './score-breakup-dialog.component.html',
  styleUrls: ['./score-breakup-dialog.component.scss']
})
export class ScoreBreakupDialogComponent implements OnInit {
  aisheCode: any;
  criteriaList: any;
  total: any;
  componentId: any;
  stateName: any;
  districtName: any;
  districtCode: any;
  stateName1: any;
  instituteName: any;
  arr1: any;
  value1: any;
  value2: any;
  viewId: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiPost: PostService, public notification: NotificationService, 
    public common: Common, public sharedService: SharedService,public getService: GetService) { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.getScoreList();
    }, 1000)
   
    this.stateName = this.data.name;       
    this.districtName = this.data.districtName;
    this.aisheCode = this.data.aisheCode;
    this.stateName1 = this.data.stateName;
    this.instituteName = this.data.instituteName;
  }
  getScoreList() {
    
    if(this.data.componentId === this.sharedService.nmdcComponentId || this.data.componentId === this.sharedService.genderComponentId){
      this.districtCode = this.data.districtCode;
    }else{
      this.districtCode = this.data.aisheCode;
    }
    this.getService.getScore(this.districtCode,this.data.componentId).subscribe(res => {
      if (res && res.length) {
        this.criteriaList = res;

        this.total = this.criteriaList.reduce(
          (sum, item) => sum + Number(item.score),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
