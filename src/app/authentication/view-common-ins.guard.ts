import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ViewCommonInsGuard implements CanActivate {
  constructor(public sharedService:SharedService,public router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let componentId = JSON.parse(sessionStorage.getItem('componentId'))
      
      let user = sessionStorage.getItem('userTypeId')
      if(user === this.sharedService.userTypeList['0'].id||user === this.sharedService.userTypeList['10'].id  || user === this.sharedService.userTypeList['1'].id || user === this.sharedService.userTypeList['2'].id || user === this.sharedService.userTypeList['3'].id || user === this.sharedService.userTypeList['4'].id || user === this.sharedService.userTypeList['5'].id || user === this.sharedService.userTypeList['6'].id || user === this.sharedService.userTypeList['7'].id || user === this.sharedService.userTypeList['8'].id || user === this.sharedService.userTypeList['9'].id){
        if (sessionStorage.getItem('token')) {
          return true;
        }
      }
      alert('You are not authorised to visit this page');
      this.router.navigate(['**'])
      return false;
  }
  
}