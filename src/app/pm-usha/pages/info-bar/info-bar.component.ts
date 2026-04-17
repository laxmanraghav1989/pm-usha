import { Component, OnDestroy } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { ApiService } from '../../../service/api.service';
import { NotificationService } from '../../../service/notification.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';

@Component({
  selector: 'cfs-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnDestroy {
  public routers: typeof routes = routes;
  roleId: string;
  userId: string;
  userDetails: any;
  name: any;
  mobile: any;
  emailId: any;
  aisheCode: any
  userType: any;
  param: any;
  stateName: any;
  instituteName: any;
  roleName: any;
  firstName: string;
  middleName: string;
  lastName: string;
  constructor(public sharedService:SharedService,public api:ApiService,public notification:NotificationService,public router:Router) {
   
    this.userId = sessionStorage.getItem('userId')
    this.emailId =sessionStorage.getItem('emailId')
    this.roleName =sessionStorage.getItem('roleName')
    this.mobile =sessionStorage.getItem('mobile')
    this.aisheCode =sessionStorage.getItem('aisheCode')
    this.stateName =sessionStorage.getItem('stateName')
    this.instituteName =sessionStorage.getItem('instituteName')
    this.firstName =sessionStorage.getItem('firstName')
    this.middleName =sessionStorage.getItem('middleName')
    this.lastName =sessionStorage.getItem('lastName')
    this.name = this.firstName.concat(" ", this.middleName, " ", this.lastName);
}



ngOnDestroy(): void {
  if (this.userDetails) {
    this.userDetails.unsubscribe()
  }
}

logout() {
  sessionStorage.clear();
  window.sessionStorage.clear();
  this.router.navigate([this.routers.Login])
}
}
