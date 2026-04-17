import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';

@Component({
  selector: 'cfs-session-expire-dialog',
  templateUrl: './session-expire-dialog.component.html',
  styleUrls: ['./session-expire-dialog.component.scss']
})
export class SessionExpireDialogComponent implements OnInit {
  public routers: typeof routes = routes;
  confirmButtonText = "Login";
  constructor(public dialogRef: MatDialogRef<SessionExpireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public router: Router) { }

  ngOnInit(): void {
  }
  login() {
    this.router.navigate([this.routers.Login])
    sessionStorage.clear();
    this.dialogRef.close()
}
}
