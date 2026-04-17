import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'cfs-merge-consultant-dialog',
  templateUrl: './merge-consultant-dialog.component.html',
  styleUrls: ['./merge-consultant-dialog.component.scss']
})
export class MergeConsultantDialogComponent implements OnInit {
  confirmButtonText = "Save"
  cancelButtonText = "Cancel"
  consultantUserId: any
  constructor(
    public dialogRef: MatDialogRef<MergeConsultantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sharedService: SharedService, public common: Common, public postService: PostService,
    public notification: NotificationService) { }

  ngOnInit(): void {
  }
  save() {
    if (!this.consultantUserId) {
      this.notification.showValidationMessage('Please select consultant !!!');
      return;
    }
    let payload = {
      finalProposalStatusId: this.data.finalProposalStatusId,
      consultantUserId: this.consultantUserId,
      isState:this.data.isState,
      componentId:this.data.componentId,
      stateCode:this.data.stateCode
    }
    this.postService.allotCons(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.dialogRef.close(true)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

  }
}
