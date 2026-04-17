import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EncryptDecrypt } from '../utility/encrypt-decrypt';
import { ApiService } from '../service/api.service';
import { NotificationService } from '../service/notification.service';
import { routes } from '../routes';
import { SharedService } from '../shared/shared.service';
import { Common } from '../shared/common';
import { CustomErrorStateMatcher } from '../utility/validators';
import { GetService } from '../service/get.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'cfs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public routers: typeof routes = routes;
  captchaText: any;
  loginForm: FormGroup;
  show: boolean = false;
  encodeCaptcha: any;
  isFormInvalid: boolean = false
  componentList: Array<any> = [];
  captchaText1: any;
  encodeCaptcha1: any;
  esignDoneVar: any
  constructor(private fb: FormBuilder, private notification: NotificationService, private api: ApiService, private getService: GetService, public common: Common, public post: PostService,
    private encrypt: EncryptDecrypt, private router: Router, private sanitizer: DomSanitizer, public sharedService: SharedService, public errorMatcher: CustomErrorStateMatcher,) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
    });
    this.getCaptcha();
  }

  ngOnInit(): void {

  }
  password() {
    this.show = !this.show;
  }

  getCaptcha() {
    this.getService.getCaptchaText().subscribe(
      (resp: any) => {
        this.captchaText = this.sanitizer.bypassSecurityTrustUrl(resp.capcha);;
        this.encodeCaptcha = resp.data;
      },
      (err: any) => {
      }
    );
  }
  verifycaptcha() {
    if (this.loginForm.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
      let captchaText = this.loginForm.controls['captcha'].value;
      this.api
        .verifyGetCaptcha(captchaText, this.encodeCaptcha)
        .subscribe(
          (res: { message: string }) => {
            if (res.message == 'Captcha Valid') {
              this.login()
            } else {
              this.getCaptcha()
              this.notification.showValidationMessage('Invalid Captcha !!!');
            }
          },
          (err: any) => {

          }
        );
    }
  }
  login() {
  sessionStorage.clear()
    let reqdata = {
      username: this.loginForm.controls['username'].value,
      password: this.encrypt.getEncryptedValue(
        this.loginForm.controls['password'].value
      ),
    };
    this.getService.getToken(reqdata.username, reqdata.password).subscribe(res => {
      let getToken = res.token;
      let tokenarray = getToken.split('Bearer ');
      let token = tokenarray[tokenarray.length - 1];
      sessionStorage.setItem('token', token);
      this.getUserAuthDetails(token)
      // this.getUserDetails(token);
    },
      (err: { error: { status: number } }) => {
        this.getCaptcha()
        if (err?.error?.status === 401) {
          this.notification.showValidationMessage(
            'Your User Credential is Incorrect'
          );
        }
      }
    );
  }
  getUserAuthDetails(token) {
    this.post.getUserToken(this.loginForm.controls['username'].value, token).subscribe(res => {
      if (res && res.length) {
        if (res[0].isActive === 1) {
          this.notification.showValidationMessage(res[0].message);
        }
        else {
          this.getUserDetails(token)
        }
      }else{
        this.notification.showValidationMessage(
          'Your User Credential is Incorrect'
        );
        this.getCaptcha()
      }
    }, err => {
      this.getCaptcha()
  })
  }
  getUserDetails(token) {
    this.post.getUserToken(this.loginForm.controls['username'].value, token).subscribe(res => {
      if (res && res.length) {
        if (!res['0'].isPasswordChange) {
          sessionStorage.setItem('change', 'true')
          sessionStorage.setItem('userName', this.loginForm.controls['username'].value)
          this.common.openChangePass().subscribe(res => {
            if (res) {
              this.getCaptcha()
              this.loginForm.reset()
            }
          })
        } else {
          sessionStorage.setItem('userData', JSON.stringify(res)); // ✅ store
          this.sharedService.setUserData(res); // ✅ push to subject
          sessionStorage.setItem('change', 'false')
          if (res['0'].componentId && res['0'].componentId.length) {

            res['0']?.componentId.forEach(element => {
              if (element === this.sharedService.collegeComponentId || element === this.sharedService.universityComponentId || element === this.sharedService.meruComponentId) {
                this.getInstituteName(res['0'].userName, token, res)
              } else {
                this.getSetSessionData(token, res)
              }
            });
          } else {
            this.getSetSessionData(token, res)
          }
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstituteName(aisheCode, token, data) {
  const encryptedAishe = aisheCode ? this.encrypt.getEncryptedValue(aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe
    }
    this.getService.getInstituteUC(payload).subscribe(res => {
      let instituteCaterogy = aisheCode.split(/[\W\d]+/).join("");
      if (instituteCaterogy === "U" || instituteCaterogy === "C") {
        sessionStorage.setItem('insName', res['0'].instituteName);
        let collegeAddress = res['0'].addressLine1.concat(" ", res['0'].addressLin2 ? res['0'].addressLin2 : '');
        sessionStorage.setItem('collegeAddress', collegeAddress);
        sessionStorage.setItem("affliatedUniversity", res['0'].affiliatingUniversityName);
        sessionStorage.setItem("affliatedUniversityId", res['0'].affiliatingUniversityId);
        if (instituteCaterogy === 'C') {
          sessionStorage.setItem('instituteAisheTypeManagement', res['0'].managementName)
        } else {
          sessionStorage.setItem('instituteAisheTypeManagement', res['0'].universityType)
        }
        this.getSetSessionData(token, data)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getSetSessionData(token, res) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('componentId', JSON.stringify(res['0'].componentId))
    sessionStorage.setItem('userName', res['0'].userName.trim(''))
    sessionStorage.setItem('emailId', res['0'].emailId)
    sessionStorage.setItem('designation', res['0'].designation)
    sessionStorage.setItem('roleName', res['0'].userType)
    sessionStorage.setItem('userTypeId', res['0'].userTypeId);
    sessionStorage.setItem('token1', this.encrypt.getEncryptedValue(res['0']?.userTypeId));
    sessionStorage.setItem('districtName', res['0'].districtName)
    sessionStorage.setItem('stateName', res['0'].stateName)
    sessionStorage.setItem('districtCode', res['0'].districtId)
    sessionStorage.setItem('mobile', res['0'].mobile)
    sessionStorage.setItem('aisheCode', res['0'].userName.trim(''))
    sessionStorage.setItem('stateCode', res['0'].stateCode)
    sessionStorage.setItem('firstName', res['0'].firstName)
    sessionStorage.setItem('middleName', res['0'].middleName)
    sessionStorage.setItem('lastName', res['0'].lastName);
    sessionStorage.setItem('pabApproved', res['0'].pabApproved)
    sessionStorage.setItem('pabConditionallyApproved', res['0'].pabConditionallyApproved)

    sessionStorage.setItem('isEsignDone', this.encrypt.getEncryptedValue(res['0']?.isEsignDone ? res['0']?.isEsignDone : ''))
    sessionStorage.setItem('isProposalRevisionEsignDone', this.encrypt.getEncryptedValue(res['0']?.isProposalRevisionEsignDone ? res['0']?.isProposalRevisionEsignDone : ''))
    sessionStorage.setItem('isEsignDoneEquity', this.encrypt.getEncryptedValue(res['0']?.isEsignDoneEquity ? res['0']?.isEsignDoneEquity : ''))
    this.sharedService.setUserDetails(res['0']);
    this.sharedService.setSidebarChanges(res['0'].userType);
    this.router.navigate([this.routers.Home])
  }

  clearData() {
    this.loginForm.reset();
  }
  openForgot() {

  }



}
