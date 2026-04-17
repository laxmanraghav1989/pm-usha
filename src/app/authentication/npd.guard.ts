import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class NpdGuard implements CanActivate {
  constructor(private router: Router,public sharedService:SharedService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = sessionStorage.getItem('userTypeId')
    if (user === this.sharedService.userTypeList['0'].id ||user === this.sharedService.userTypeList['10'].id ||user === this.sharedService.userTypeList['11'].id || user === this.sharedService.userTypeList['8'].id || user === this.sharedService.userTypeList['9'].id) {
      if (sessionStorage.getItem('token')) {
        return true;
      }
      
     }  
     alert('You are not authorised to visit this page');
     this.router.navigate(['**'])
     return false; 
  }
  }
