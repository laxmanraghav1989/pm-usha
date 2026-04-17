import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, Router,Route, CanLoad } from '@angular/router';
import { SharedService } from '../shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild,CanLoad {
  constructor(private router: Router,public sharedService:SharedService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    let user = sessionStorage.getItem('userTypeId')
    if (user === this.sharedService.userTypeList['10'].id|| user === this.sharedService.userTypeList['11'].id||user === this.sharedService.userTypeList['1'].id || user === this.sharedService.userTypeList['0'].id || user === this.sharedService.userTypeList['2'].id || user === this.sharedService.userTypeList['6'].id || user === this.sharedService.userTypeList['7'].id || user === this.sharedService.userTypeList['8'].id || user === this.sharedService.userTypeList['9'].id ||user === this.sharedService.userTypeList['12'].id ) {
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
 
    let user = sessionStorage.getItem('userTypeId')
    if(user === this.sharedService.userTypeList['3'].id || user === this.sharedService.userTypeList['4'].id || user === this.sharedService.userTypeList['5'].id){
      if (sessionStorage.getItem('token')) {
        return true;
      }
    }
    alert('You are not authorised to visit this page');
    this.router.navigate(['**'])
    return false; 
  }


  canLoad(route: Route): boolean {
    let url: string = route.path;
    if (sessionStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['**'])
    // window.location.href =  environment.aisheMain;
    return false;
  }
}


