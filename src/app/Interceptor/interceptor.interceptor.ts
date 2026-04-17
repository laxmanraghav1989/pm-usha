import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { finalize, catchError, map } from "rxjs/operators";
import { SharedService } from "src/app/shared/shared.service";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { NotificationService } from "../service/notification.service";
import { Common } from "../shared/common";
import { SessionExpireDialogComponent } from "../dialog/session-expire-dialog/session-expire-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { EncryptDecrypt } from "../utility/encrypt-decrypt";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class Interceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    public router: Router,
    public sharedService: SharedService,
    private notification: NotificationService,
    public common: Common,
    public dialog: MatDialog,
    private encrypt: EncryptDecrypt,
    private spinner: NgxSpinnerService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const skipLoader = request.headers.get('skipLoader'); // 👈 Read custom header
    if (!skipLoader) { // 👈 Only show loader if skipLoader not present
    this.totalRequests++;
    this.sharedService.global_loader = true;
    }
    const token = sessionStorage.getItem("token");
    const token1 = sessionStorage.getItem("token1");
    const userTypeId = sessionStorage.getItem("userTypeId");

    if (token) {
      request = request.clone({
        setHeaders: {
          // "Access-Control-Allow-Origin":``,
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (token1 && userTypeId) {
        const oldSession = this.encrypt.getDecryptedValue(token1);
        const newSession = userTypeId;
        if (oldSession && newSession && oldSession !== newSession) {
          this.session();
        }
      }
    }
    // else{
    //   //if(request.method === 'POST'){
    //   request = request.clone({

    //     setHeaders: {
    //       'Access-Control-Allow-Origin': '*',
    //       "Authorization": `Bearer ${sessionStorage.getItem('btoken')}`,

    //     }
    //   });
    // //}
    // }

    return next.handle(request).pipe(
      finalize(() => {
        if (!skipLoader) { // 👈 Only hide loader if skipLoader not present
          this.totalRequests--;
          if (this.totalRequests === 0) {
  
            this.sharedService.global_loader = false;
          }
        }
       
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          if (!skipLoader) { 

          this.sharedService.global_loader = false;
          }
          // A client-side or network error occurred. Handle it accordingly.
          console.error("An error occurred:", error.error.message);
        } else if (error.status === 401) {

          this.sharedService.global_loader = false;
          this.notification.showValidationMessage(
            "Invalid User Id or Password....."
          );

          return;
        } else if (error.status === 402) {

          this.sharedService.global_loader = false;
          this.session();

          return;
        } else if (error.status === 400) {
        } else if (error.status === 422) {
          this.notification.showValidationMessage(error.error.message);
        } else if (error.status === 497) {


          this.sharedService.global_loader = false;
        } else if (error.status === 404) {
          this.notification.showValidationMessage(error.error.message);

          this.sharedService.global_loader = false;
        } else if (error.status === 417) {

          this.sharedService.global_loader = false;
          this.notification.showValidationMessage(error.error.message);
        } else if (error.status === 406) {

          this.sharedService.global_loader = false;
          this.notification.showValidationMessage(error.error.message);
        } else if (error.status === 200) {

          this.sharedService.global_loader = false;
        } else {

          this.sharedService.global_loader = false;
          this.notification.apiNotRespond();
        }
          this.sharedService.global_loader = false;

        return throwError(error);
      })
    );
  }
  public session(): Observable<boolean> {
    if (this.dialog.openDialogs.length === 0) {
      return this.dialog
        .open(SessionExpireDialogComponent, {
          data: "",
          disableClose: true,
        })
        .afterClosed();
    }
  }
}
