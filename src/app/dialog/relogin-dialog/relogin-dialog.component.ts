import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';

@Component({
  selector: 'cfs-relogin-dialog',
  templateUrl: './relogin-dialog.component.html',
  styleUrls: ['./relogin-dialog.component.scss']
})
export class ReloginDialogComponent implements OnInit {
  public routers: typeof routes = routes;
  confirmButtonText = "Login";
  constructor(public dialogRef: MatDialogRef<ReloginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public router: Router) { }

  ngOnInit(): void {
  }
  login() {
      this.router.navigate([this.routers.Login])
      sessionStorage.clear();
      this.dialogRef.close()
  }
}