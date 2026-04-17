import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-revision-lock-unlock',
  templateUrl: './revision-lock-unlock.component.html',
  styleUrls: ['./revision-lock-unlock.component.scss']
})
export class RevisionLockUnlockComponent implements OnInit {

  remarks: string = '';
  confirmButtonText = "Save"
  cancelButtonText = "Cancel"
  remarkValue: any;
  unlockValue:any;
 
  constant:any;
  constructor(
    public dialogRef: MatDialogRef<RevisionLockUnlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sharedService: SharedService, public common: Common, public postService: PostService,
    public notification: NotificationService, public api: ApiService) { }

  ngOnInit(): void {
    this.remarkValue = this.data?.RemarksValue
    if(this.data?.proposalRevisionApprovedBySaa){
      this.constant = this.common.proposalRevisionApprovedByState
    }
    if (this.remarkValue === 'ViewRemarks'){
      this.remarks = this.data.remarks
    }

  }
  unlock() {
    if (this.remarks.trim() === '') {
      this.notification.showValidationMessage('Please enter remarks');
      return;
    }
    if (!this.data.districtCode) {
      this.notification.showValidationMessage("District Code is missing.");
      return;
    }
    else {
      if (this.data.paramId && this.data.constant === this.common.proposalRequestForUnlockByUser){
        let temp = {
          "aisheCode": this.data.aisheCode,
          "componentId": this.data.componentId,
          "constant": this.data.constant,
          "districtCode": this.data.districtCode,
          "instituteCategory": this.data.instituteCategory,
          "remarks": this.remarks,
          "stateCode": this.data.stateCode,
          "status": this.data.status
        }
        this.api.postProposalRevisionLock(temp).subscribe((res) => {
          if (res.status === 200) {
            // this.notification.showSuccessMessage(`${unlockId.aisheCode} has been Unlock successfully!!!`);
            this.dialogRef.close(true)
          }
        }, err => {
    
        })
        
      }
      else if (this.data.paramId && this.constant === this.common.revisionProposalUnlockByAdmin) {
        let temp = {
          "aisheCode": this.data.aisheCode,
          "componentId": this.data.componentId,
          "constant": this.constant,
          "districtCode": this.data.districtCode,
          "instituteCategory": this.data.instituteCategory,
          "remarks": this.remarks,
          "stateCode": this.data.stateCode,
          "status": this.data.status
        }
        this.api.postProposalRevisionLock(temp).subscribe((res) => {
          if (res.status === 200) {
            this.notification.showSuccessMessage(`${this.data.aisheCode} has been Unlock successfully!!!`);
            this.dialogRef.close(true)
          }
        }, err => {
    
        })
      }
      else {
        let temp = {
          "aisheCode": this.data.aisheCode,
          "componentId": this.data.componentId,
          "constant": this.constant,
          "districtCode": this.data.districtCode,
          "instituteCategory": this.data.instituteCategory,
          "remarks": this.remarks,
          "stateCode": this.data.stateCode,
          "status": true
        }
        this.api.postProposalRevisionLock(temp).subscribe((res) => {
          if (res.status === 200) {
            this.notification.showSuccessMessage(`${this.data.aisheCode} has been approved successfully!!!`);
            this.dialogRef.close(true)
          }
        }, err => {
        })
       
      }
    }

  }
}
