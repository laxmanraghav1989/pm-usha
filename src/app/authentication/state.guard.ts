import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class StateGuard implements CanActivate {
  constructor(private router: Router,public sharedService:SharedService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    let user = sessionStorage.getItem('userTypeId')
    if ((user === this.sharedService.userTypeList['1'].id) || (user === this.sharedService.userTypeList['11'].id) || (user === this.sharedService.userTypeList['12'].id)) {
    
      if (sessionStorage.getItem('token')) {
        return true;
      }
      
     }  
     alert('You are not authorised to visit this page');
     this.router.navigate(['**'])
     return false; 
   // this.router.navigate(['**'], { queryParams: { returnUrl: state.url },skipLocationChange:true });
   // return false;
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    let userTypeId = sessionStorage.getItem('userTypeId')
    //if ((user === this.sharedService.userTypeList['0'].id)||(user === this.sharedService.userTypeList['6'].id)) {
    if(userTypeId === this.sharedService.userTypeList['0'].id || userTypeId === this.sharedService.userTypeList['6'].id || userTypeId === this.sharedService.userTypeList['1'].id || userTypeId === this.sharedService.userTypeList['7'].id || userTypeId === this.sharedService.userTypeList['8'].id || userTypeId === this.sharedService.userTypeList['9'].id ||userTypeId === this.sharedService.userTypeList['10'].id){
      if (sessionStorage.getItem('token')) {
        return true;
      }
      
     }  
     alert('You are not authorised to visit this page');
     this.router.navigate(['**'])
     return false; 
   // this.router.navigate(['**'], { queryParams: { returnUrl: state.url },skipLocationChange:true });
   // return false;
  }
  
}
