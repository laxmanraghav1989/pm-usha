import { Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { SharedService } from "src/app/shared/shared.service";
import { routes } from "../routes";
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { NotificationService } from "../service/notification.service";
import { EncryptDecrypt } from "../utility/encrypt-decrypt";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;
  showProfileBtn: boolean = false;
  roleId: string;
  userId: string;
  userDetails: any;
  name: any;
  mobile: any;
  emailId: any;
  aisheCode: any;
  userType: any;
  param: any;
  stateName: any;
  instituteName: any;
  roleName: any;
  firstName: string;
  middleName: string;
  lastName: string;
  districtName: any;
  designation: string;
  userTypeId: any;
  userDetails1: any;
  constructor(
    public sharedService: SharedService,
    public router: Router,
    public userService: UserService,
    public notification: NotificationService,
    private ngZone: NgZone,
    private encrypt: EncryptDecrypt,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.sessionChanged1();

    this.userDetails1 = this.sharedService.getUserDetails.subscribe((res) => {
      if (res.length > 0 && res.length !== 0) {
        if (res?.emailId && res?.mobile) {
          this.userId = res.userName;
          const email = res?.emailId ? res?.emailId : "";
          this.emailId = this.encrypt.getDecryptedValue(email);
          this.roleName = res.userType;
          this.userTypeId = res.userTypeId.toString();
          const mobile1 = res?.mobile ? res?.mobile : "";
          this.mobile = this.encrypt.getDecryptedValue(mobile1);
          this.aisheCode = res.aisheCode;
          this.instituteName = sessionStorage.getItem("insName");
          this.firstName = res.firstName;
          this.middleName = res.middleName;
          this.lastName = res.lastName;
          this.stateName = res.stateName;
          this.districtName = res.districtName;
          this.designation = res.designation;
          if (
            this.middleName === "null" ||
            this.middleName === null ||
            this.middleName === undefined
          ) {
            this.middleName = "";
          }
          if (
            this.lastName === "null" ||
            this.lastName === null ||
            this.lastName === undefined
          ) {
            this.lastName = "";
          }
          this.name = this.firstName?.concat(
            " ",
            this.middleName,
            this.lastName
          );
        }
      } else {
        if (
          sessionStorage?.getItem("emailId") &&
          sessionStorage?.getItem("mobile")
        ) {
          this.userId = sessionStorage.getItem("userName");
          this.designation = sessionStorage.getItem("designation");
          this.emailId = sessionStorage?.getItem("emailId")
            ? this.encrypt.getDecryptedValue(sessionStorage?.getItem("emailId"))
            : "";
          this.roleName = sessionStorage.getItem("roleName");
          this.mobile = sessionStorage?.getItem("mobile")
            ? this.encrypt.getDecryptedValue(sessionStorage?.getItem("mobile"))
            : "";
          this.aisheCode = sessionStorage.getItem("aisheCode");
          this.stateName = sessionStorage.getItem("stateName");
          this.instituteName = sessionStorage.getItem("insName");
          this.firstName = sessionStorage.getItem("firstName");
          this.middleName = sessionStorage.getItem("middleName");
          this.lastName = sessionStorage.getItem("lastName");
          this.districtName = sessionStorage.getItem("districtName");
          this.userTypeId = sessionStorage.getItem("userTypeId");
          if (
            this.middleName === "null" ||
            this.middleName === null ||
            this.middleName === undefined
          ) {
            this.middleName = "";
          }
          if (
            this.lastName === "null" ||
            this.lastName === null ||
            this.lastName === undefined
          ) {
            this.lastName = "";
          }
          this.name = this.firstName?.concat(
            " ",
            this.middleName,
            this.lastName
          );
        }
      }
    });
  }
  ngOnInit() {
    
  }
  sessionChanged1() {
    if (
      sessionStorage.getItem("token1") &&
      sessionStorage.getItem("userTypeId")
    ) {
      const oldSession = this.encrypt.getDecryptedValue(
        sessionStorage.getItem("token1")
      );

      const newValue = sessionStorage.getItem("userTypeId");
      if (oldSession !== newValue) {
        this.ngZone.run(() => {
          this.logout();
        });
      }
    }
  }

  receiveData(data:any){
    
  }

  ngDoCheck() {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("userTypeId")
    ) {
      let test = sessionStorage.getItem("change");
      if (test === "true") {
        this.showProfileBtn = false;
      } else {
        this.showProfileBtn = true;
      }
    } else {
      this.showProfileBtn = false;
    }
  }

  ngOnDestroy(): void {
    if (this.userDetails1) {
      this.userDetails1.unsubscribe();
    }
  }

  logout() {
    this.userService.logout(this.userId).subscribe(
      (res) => {
        if (res) {
          this.notification.showSuccessMessage("Logout Successfully");
          sessionStorage.clear();
          window.sessionStorage.clear();
          this.router.navigate([this.routers.Login]);
        }
      },
      (err) => {}
    );
  }


}
