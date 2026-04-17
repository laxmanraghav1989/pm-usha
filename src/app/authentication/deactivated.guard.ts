import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: null
})
export class DeactivatedGuard implements CanDeactivate<unknown> {
  constructor(public sharedService:SharedService){

  }
  canDeactivate(
    component: SharedService,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.sharedService){
      alert('Please save your data first !!!')
      return false;
    }else{
      return true;
    }
  }
  
}
