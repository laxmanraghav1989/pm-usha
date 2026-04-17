import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'cfs-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  message: string = "Are you sure you want to delete this record?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data){
        this.message = data.message ;
          }
  }

  ngOnInit(): void {
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
