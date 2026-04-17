import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cfs-state-issue-dialog',
  templateUrl: './state-issue-dialog.component.html',
  styleUrls: ['./state-issue-dialog.component.scss']
})
export class StateIssueDialogComponent implements OnInit {
  cancelButtonText = "cancel"
  remarks: any = [];
  
  constructor(
    public dialogRef: MatDialogRef<StateIssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

  ngOnInit(): void {
    this.remarks = this.data?.progressUpdate
  }

}