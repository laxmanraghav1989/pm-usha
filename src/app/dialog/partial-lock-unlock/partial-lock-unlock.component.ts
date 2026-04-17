import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-partial-lock-unlock',
  templateUrl: './partial-lock-unlock.component.html',
  styleUrls: ['./partial-lock-unlock.component.scss']
})
export class PartialLockUnlockComponent implements OnInit {
  remarks: string = '';
  confirmButtonText = "Save"
  cancelButtonText = "Cancel"
  remarkValue: any;
  constructor(
    public dialogRef: MatDialogRef<PartialLockUnlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sharedService: SharedService, public common: Common, public postService: PostService,
    public notification: NotificationService, public api: ApiService) { }

  ngOnInit(): void {

  }
  unlock() {
    if (this.remarks.trim() === '') {
      this.notification.showValidationMessage('Please enter remarks');
      return;
    }
    else {
        let temp = {
          "aisheCode": null,
          "componentId": this.common.partialUnlockState,
          "districtCode": null,
          "remarks": this.remarks,
          "stateCode": this.data.stateCode,
          "unlockComponent": this.data.partialunlock
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
