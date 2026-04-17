import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'cfs-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any,public apiPost: PostService, public notification: NotificationService, public getService: GetService) {
    }
   
  ngOnInit(): void {
   // alert(`${this.element.data}`) 
  }
  postStatus(){
    var data;
    if(this.element.action){
      data=false
    }else{
      data=true
    }
    this.apiPost.postInactiveStatus(this.element.data,data).subscribe((res)=>{
if(res.status ===200){
this.notification.showSuccess();
this.dialogRef.close(true);
}
    })

  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
