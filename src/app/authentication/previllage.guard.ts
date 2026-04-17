import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class PrevillageGuard implements CanActivate,CanActivateChild {
  constructor(private router: Router,public sharedService:SharedService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let componentId = JSON.parse(sessionStorage.getItem('componentId'))
      for (let index = 0; index < componentId.length; index++) {
        if(componentId[index] === this.sharedService.collegeComponentId || componentId[index] === this.sharedService.universityComponentId){
          if (sessionStorage.getItem('token')) {
            return true;
          }
        }
        
      }
      alert('You are not authorised to visit this page');
      this.router.navigate(['**'])
      return false; 
    }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
 
      let componentId = JSON.parse(sessionStorage.getItem('componentId'))
      for (let index = 0; index < componentId.length; index++) {
        if(componentId[index] === this.sharedService.collegeComponentId || componentId[index] === this.sharedService.universityComponentId){
          if (sessionStorage.getItem('token')) {
            return true;
          }
        }
        
      }
    
    alert('You are not authorised to visit this page');
    this.router.navigate(['**'])
    return false; 
  }
}
