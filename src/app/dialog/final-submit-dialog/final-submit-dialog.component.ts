import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-final-submit-dialog',
  templateUrl: './final-submit-dialog.component.html',
  styleUrls: ['./final-submit-dialog.component.scss']
})
export class FinalSubmitDialogComponent implements OnInit {
  verify: boolean = false
  constructor(public dialogRef: MatDialogRef<FinalSubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public sharedService: SharedService, public api: ApiService, public notification: NotificationService) { }

  ngOnInit(): void {
  }
  save() {
    if (!this.verify) {
      this.notification.showValidationMessage('Please verify !!!');
      return;
    }else{
      this.dialogRef.close(true)
    }
   
  }
}
