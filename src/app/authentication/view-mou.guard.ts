import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SharedService } from "../shared/shared.service";

@Injectable({
  providedIn: "root",
})
export class ViewMouGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, public sharedService: SharedService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userTypeId = sessionStorage.getItem("userTypeId");
    if (
      userTypeId === this.sharedService.userTypeList["1"].id ||
      userTypeId === this.sharedService.userTypeList["6"].id ||
      userTypeId === this.sharedService.userTypeList["8"].id ||
      userTypeId === this.sharedService.userTypeList["9"].id
    ) {
      if (sessionStorage.getItem("token")) {
        return true;
      }
    }
    alert("You are not authorised to visit this page");
    this.router.navigate(["**"]);
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
