import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-unlock-consolidated-dialog',
  templateUrl: './unlock-consolidated-dialog.component.html',
  styleUrls: ['./unlock-consolidated-dialog.component.scss']
})
export class UnlockConsolidatedDialogComponent implements OnInit {
  remarks: string = ''
  cancelButtonText = "Cancel"
  constructor(public dialogRef: MatDialogRef<UnlockConsolidatedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sharedService: SharedService, public common: Common, public postService: PostService,
    public notification: NotificationService, public api: ApiService) {

  }

  ngOnInit(): void {
  }
  unlock() {
    if(this.remarks.trim() === ''){
      this.notification.showValidationMessage('Please enter remarks');
      return;
    }
    if(this.data.constant === this.common.proposalRevisionApprovedByState){
      var temp:any = {
        "aisheCode": this.data.aisheCode,
        "componentId": this.data.componentId,
        "constant": this.data.constant,
        "districtCode": this.data.districtCode,
        "instituteCategory": this.data.instituteCategory,
        "remarks": this.remarks,
        "stateCode": this.data.stateCode,
        "status": null
      }
      this.api.postProposalRevisionLock(temp).subscribe((res) => {
        if (res.status === 200) {
          this.dialogRef.close(true)
        }
      }, err => {
  
      })
    }
    
    else{
      var temp:any = {
        "aisheCode": this.data.aisheCode === undefined ? null : this.data.aisheCode,
        "componentId": this.data.componentId,
        "districtCode": this.data.districtCode,
        "remarks": this.remarks,
        "stateCode": this.data.stateCode,
        "unlockComponent": this.common.unlockShortlisted
      }
      this.postService.unlockState(temp).subscribe((res) => {
        if (res.status === 200) {
          this.dialogRef.close(true)
        }
      }, err => {
  
      })
    }
  }
}
