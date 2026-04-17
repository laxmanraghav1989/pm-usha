import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cfs-confirm-aishe-dialog',
  templateUrl: './confirm-aishe-dialog.component.html',
  styleUrls: ['./confirm-aishe-dialog.component.scss']
})
export class ConfirmAisheDialogComponent implements OnInit {

   getData: any;
   confirmButtonText = "Yes"
   cancelButtonText = "Edit"
   preIninstituteName: any;
 
   constructor(
     public dialogRef: MatDialogRef<ConfirmAisheDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {
       if(data.responseData){
         this.getData = data?.responseData;
         this.preIninstituteName = data?.instituteName;
      }
   }
 
   ngOnInit(): void {
   }
   onConfirmClick(): void {
      this.dialogRef.close(this.getData);
   }
 }
 