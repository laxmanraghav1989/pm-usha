import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cfs-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  message: string = "Are you sure you want to delete this record?"
  messageComponentMapping: string = "Are you sure you want to delete this record? Once deleted, Userid of this institute will be made INACTIVE. In order to make it ACTIVE again, you need to go to 'VIEW USER Section' and ACTIVATE it. !"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  viewId: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data){
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
          }
  }
  ngOnInit(): void {
    this.viewId = this.dialogRef.id
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
