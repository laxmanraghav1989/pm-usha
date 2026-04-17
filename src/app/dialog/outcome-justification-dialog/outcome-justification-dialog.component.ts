import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cfs-outcome-justification-dialog',
  templateUrl: './outcome-justification-dialog.component.html',
  styleUrls: ['./outcome-justification-dialog.component.scss']
})
export class OutcomeJustificationDialogComponent implements OnInit {
  isDisable: boolean=false;

  constructor(public dialogRef: MatDialogRef<OutcomeJustificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  justification:any;
  ngOnInit(): void {
    if(this.data.disableSave==false){
      this.justification=this.data.item.justification;
      this.isDisable=true;
    }
  }
  onConfirmClick() {
   this.dialogRef.close(this.justification);
  }
  closeDialog(event: any): void {
    this.dialogRef.close();
  }
}
