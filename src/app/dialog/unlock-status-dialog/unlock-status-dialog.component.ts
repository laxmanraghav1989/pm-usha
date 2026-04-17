import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-unlock-status-dialog',
  templateUrl: './unlock-status-dialog.component.html',
  styleUrls: ['./unlock-status-dialog.component.scss']
})
export class UnlockStatusDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UnlockStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any,public sharedService:SharedService) { }

  ngOnInit(): void {
  }

}
