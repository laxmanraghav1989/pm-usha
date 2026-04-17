import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from "@angular/core";
import { SharedService } from "./shared/shared.service";
import { NotificationService } from "./service/notification.service";
import { UserService } from "./service/user.service";
import { Router } from "@angular/router";
import { routes } from "./routes";
import { EncryptDecrypt } from "./utility/encrypt-decrypt";
import { SPINNER_TYPE, SPINNER_BDCOLOR, SPINNER_SIZE, SPINNER_COLOR, SPINNER_FULLSCREEN } from './config/spinner.config';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  type = SPINNER_TYPE;
  bdColor = SPINNER_BDCOLOR;
  size = SPINNER_SIZE;
  color = SPINNER_COLOR;
  fullScreen = SPINNER_FULLSCREEN;
  isGallary:boolean = true;
  public routers: typeof routes = routes;
  constructor(
    public sharedService: SharedService,
    public cdRef: ChangeDetectorRef,
    public userService: UserService,
    public notification: NotificationService,
    public router: Router,
    private ngZone: NgZone,
    private encrypt: EncryptDecrypt
  ) {
    //this.listenToStorageChanges()
  }

  ngOnInit() {
    window.addEventListener("storage", this.onStorageChange.bind(this));
    this.sessionChanged();
    if (sessionStorage.getItem("token1")){
      this.isGallary = false
    }
    
  }

  // @HostListener('document:paste', ['$event'])
  // onPaste(event: ClipboardEvent): void {
  //   event.preventDefault();
    //alert("Pasting is disabled globally!");
  // }

  sessionChanged() {
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
  onStorageChange(event: any) {
    if (event.storageArea === sessionStorage && event.key === "userTypeId") {

      if (event.oldValue !== event.newValue) {
        this.ngZone.run(() => {
          this.logout();
        });
      }
    }
  }

  private listenToStorageChanges() {
    this.ngZone.run(() => {
      this.logout();
    });
  }
  logout() {
    this.userService.logout(sessionStorage.getItem("userName")).subscribe(
      (res) => {
        if (res) {
          this.notification.showSuccessMessage("Logout Successfully");
          this.sharedService.clearUserData()
          sessionStorage.clear();
          window.sessionStorage.clear();
          this.router.navigate([this.routers.Login]);
        }
      },
      (err) => {}
    );
  }
  ngAfterViewChecked() {
    const v = this.cdRef.detectChanges();
  }
}
