import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SharedService } from "../shared/shared.service";
import { elementAt } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, public sharedService: SharedService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userTypeId = sessionStorage.getItem("userTypeId");
    if (
      (userTypeId === this.sharedService.userTypeList["0"].id) ||
      (userTypeId === this.sharedService.userTypeList["1"].id) ||
      (userTypeId === this.sharedService.userTypeList["2"].id) ||
      (userTypeId === this.sharedService.userTypeList["6"].id) ||
      (userTypeId === this.sharedService.userTypeList["7"].id) ||
      (userTypeId === this.sharedService.userTypeList["8"].id) ||
      (userTypeId === this.sharedService.userTypeList["9"].id) ||
      (userTypeId === this.sharedService.userTypeList["11"].id)
    ) {
      const roles = route.data;
      const value = Object.values(roles);
      if (value.length > 1) {
        for (var i in roles) {
          if (
            (roles[i].role === "NMD-NPD" &&
              userTypeId === this.sharedService.userTypeList["0"].id) ||
            (roles[i].role === "SAA" &&
              userTypeId === this.sharedService.userTypeList["1"].id) ||
            (roles[i].role === "SNO" &&
              userTypeId === this.sharedService.userTypeList["2"].id)||
              (roles[i].role === "TSG-CC" &&
                userTypeId === this.sharedService.userTypeList["6"].id)||
                (roles[i].role === "TSG-C" &&
                  userTypeId === this.sharedService.userTypeList["7"].id)||
                  (roles[i].role === "MoE-NPD" &&
                    userTypeId === this.sharedService.userTypeList["8"].id)||
                    (roles[i].role === "PAB-NPD" &&
                      userTypeId === this.sharedService.userTypeList["9"].id)||
                      (roles[i].role === "SAA-Non-MoU" &&
                        userTypeId === this.sharedService.userTypeList["11"].id)
          ) {
            if (sessionStorage.getItem("token")) {
              return true;
            }
          }
        }
      } else {
        const requiredRole = route.data.role;
        if (
          requiredRole === "NMD-NPD" &&
          userTypeId === this.sharedService.userTypeList["0"].id
        ) {
          if (sessionStorage.getItem("token")) {
            return true;
          }
        }
        if (
          requiredRole === "SAA" &&
          userTypeId === this.sharedService.userTypeList["1"].id
        ) {
          if (sessionStorage.getItem("token")) {
            return true;
          }
        }
        if (
          requiredRole === "SNO" &&
          userTypeId === this.sharedService.userTypeList["2"].id
        ) {
          if (sessionStorage.getItem("token")) {
            return true;
          }
        }
        if (
          requiredRole === "TSG-CC" &&
          userTypeId === this.sharedService.userTypeList["6"].id
        ) {
          if (sessionStorage.getItem("token")) {
            return true;
          }
        }
        if (
          requiredRole === "TSG-C" &&
          userTypeId === this.sharedService.userTypeList["7"].id
        ) {
          if (sessionStorage.getItem("token")) {
            return true;
          }
        }
        if (
          requiredRole === "MoE-NPD" &&
          userTypeId === this.sharedService.userTypeList["8"].id
        ) {
          if (sessionStorage.getItem("token")) {
            return true;
          }
        }
        if (
          requiredRole === "PAB-NPD" &&
          userTypeId === this.sharedService.userTypeList["9"].id
        ) {
          if (sessionStorage.getItem("token")) {
            return true;
          }
        }
      }
    }

    alert("You are not authorised to visit this page");
    this.router.navigate(["**"]);
    return false;
  }
}
