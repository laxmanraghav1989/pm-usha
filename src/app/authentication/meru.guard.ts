import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class MeruGuard implements CanActivate {
  constructor(private router: Router,public sharedService:SharedService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let componentId = JSON.parse(sessionStorage.getItem('componentId'))
      for (let index = 0; index < componentId.length; index++) {
        if([this.sharedService.meruComponentId,this.sharedService.nmdcComponentId,this.sharedService.collegeComponentId,this.sharedService.universityComponentId,this.sharedService.genderComponentId].includes(componentId[index])){
          if (sessionStorage.getItem('token')) {
            return true;
          }
        }

      }

    alert('You are not authorised to visit this page');
    this.router.navigate(['**'])
    return false
    }
}
