import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AddUserGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,public sharedService:SharedService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      let url: string = state.url;
      const requiredRole = route.data['role'];
      let userTypeId = sessionStorage.getItem('userTypeId')

      if (userTypeId === this.sharedService.userTypeList['0'].id || userTypeId === this.sharedService.userTypeList['1'].id|| userTypeId === this.sharedService.userTypeList['2'].id || userTypeId === this.sharedService.userTypeList['6'].id || userTypeId === this.sharedService.userTypeList['7'].id || userTypeId === this.sharedService.userTypeList['8'].id || userTypeId === this.sharedService.userTypeList['9'].id || userTypeId === this.sharedService.userTypeList['11'].id ) {
        if (sessionStorage.getItem('token')) {
          return true;
        }

       }
       alert('You are not authorised to visit this page');
       this.router.navigate(['**'])
       return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      let url: string = state.url;
      let userTypeId = sessionStorage.getItem('userTypeId')

      if (userTypeId === this.sharedService.userTypeList['0'].id ) {
        if (sessionStorage.getItem('token')) {
          return true;
        }

       }
       alert('You are not authorised to visit this page');
       this.router.navigate(['**'])
       return false;
  }

}
