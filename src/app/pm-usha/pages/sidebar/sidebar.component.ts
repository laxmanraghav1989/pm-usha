import { Component, ElementRef, OnInit } from "@angular/core";
import { SharedService } from "../../../shared/shared.service";
import { routes } from "../../../routes";
import { Router } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
import { Common } from "src/app/shared/common";
import { UserService } from "src/app/service/user.service";
import { NotificationService } from "src/app/service/notification.service";
import { GetService } from "src/app/service/get.service";
import { EncryptDecrypt } from "src/app/utility/encrypt-decrypt";

@Component({
  selector: "cfs-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public routers: typeof routes = routes;
  toggle: boolean;
  role: string;
  roleName: string;
  userTypeId: any;
  componentId: Array<any> = [];
  componentList: Array<any> = [];
  meru: boolean;
  strengthUniversity: boolean;
  strengthCollege: boolean;
  nmdc: boolean;
  genderInc: boolean;
  aisheCode: string;
  insType: string;
  showPage: boolean = false;
  pabApproved: any;
  trueValues: string[];
  trueValuesConditionally: string[];
  containsTrue: boolean;
  containsFalse: boolean;
  pabConditionallyApproved: any;
  progressMonitoring:any
  showMonitoring: boolean | null = null;
  revisedProposalDprUndertaking:any;
  revisedProposalForwardedtoNpd:any;

  basicId: any = 0;
  stateCode: string;
  districtCode: string;
  instituteCategory: string;
  userNpdTypeList: boolean;
  userNotNpdList: boolean;
  userNpdNStateList: boolean;
  revisedVersion3: any;
  constructor(
    public elementRef: ElementRef,
    public sharedservice: SharedService,
    public apiSerevice: ApiService,
    public getService: GetService,
    public router: Router,
    public api: ApiService,
    public common: Common,
    public userService: UserService,
    public notification: NotificationService,
    public sharedService: SharedService,
    private encrypt: EncryptDecrypt
  ) {
    
    this.sharedservice.changeSidebar.subscribe((res) => {
      this.userTypeId = sessionStorage.getItem("userTypeId");
      if (res != 0) {
        this.roleName = sessionStorage.getItem("roleName");
        // this.stateP= sessionStorage.getItem('stateP')
        // let stCode = sessionStorage.getItem('stateCodeP');
        // sessionStorage.setItem('stateCode',stCode);
      } else {
        this.roleName = sessionStorage.getItem("roleName");
      }
    });
    this.sharedservice.getMenu.subscribe((res) => {
      this.userTypeId = sessionStorage.getItem("userTypeId");
      if (res === true) {
        if (
          this.userTypeId === this.sharedservice.userTypeList["1"].id ||
          this.userTypeId === this.sharedservice.userTypeList["2"].id
        ) {
          this.getPageStatusList();
        }
      } else {
        this.showPage = false;
      }
    });
    this.sharedservice.getSidebarToggle.subscribe((res) => {
      if (res == true) {
        this.toggle = true;
      } else {
        this.toggle = false;
      }
    });
  }

  private extractTrueValue(input: string): string[] {
    if (!input) return [];
    const pairs = input.split(",");
    const trueValues = [];

    for (const pair of pairs) {
      const [key, value] = pair.split(":");
      if (value?.trim() === "true") {
        trueValues.push(key);
      }
    }

    return trueValues;
  }

  private checkContainsTrue(input: any, input1: any): boolean {
    return input?.includes("true") || input1?.includes("true");
  }

  ngOnInit(): void {
    this.initializeSession(); 
    this.getComponentList();
    if (this.userTypeId === this.sharedservice.userTypeList["3"].id || this.userTypeId === this.sharedservice.userTypeList["4"].id || this.userTypeId === this.sharedservice.userTypeList["5"].id) {
    this.getPropsalStatus();
    // this.getBasicDetailData()
    }
    this.setUserFlags()
  }

  initializeSession(){
     this.userTypeId = sessionStorage.getItem("userTypeId");

    this.role = sessionStorage.getItem("userName");
    this.aisheCode = sessionStorage.getItem("aisheCode");

    this.pabApproved = sessionStorage.getItem("pabApproved");
    this.pabConditionallyApproved = sessionStorage.getItem(
      "pabConditionallyApproved"
    );
    this.trueValues = this.extractTrueValue(this.pabApproved);
    this.trueValuesConditionally = this.extractTrueValue(
      this.pabConditionallyApproved
    );
    this.containsTrue = this.checkContainsTrue(
      this.pabApproved,
      this.pabConditionallyApproved
    );
    this.componentId = JSON.parse(sessionStorage.getItem("componentId") || '[]');
    if (this.aisheCode) {
      this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    }

    if (this.insType === "C") {
      this.instituteCategory = "COLLEGE";
    } else {
      this.instituteCategory = "UNIVERSITY";
    }

  }

  setUserFlags(){
     this.userNpdTypeList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id;

    this.userNpdNStateList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['11'].id || this.userTypeId === this.sharedService.userTypeList['12'].id;

    this.userNotNpdList = this.userTypeId !== this.sharedService.userTypeList['0'].id && this.userTypeId !== this.sharedService.userTypeList['6'].id && this.userTypeId !== this.sharedService.userTypeList['7'].id && this.userTypeId !== this.sharedService.userTypeList['8'].id && this.userTypeId !== this.sharedService.userTypeList['9'].id && this.userTypeId !== this.sharedService.userTypeList['10'].id;
  }

  getPageStatusList() {
    this.getService.getStatus().subscribe(
      (res) => {
        this.showPage = res;
      },
      (err) => {}
    );
  }
  getComponentList() {
    if (this.componentId && this.componentId.length) {
      this.componentId.forEach((e) => {
        if (e === this.sharedservice.meruComponentId) {
          this.meru = true;
        }
        if (e === this.sharedservice.universityComponentId) {
          this.strengthUniversity = true;
        }
        if (e === this.sharedservice.collegeComponentId) {
          this.strengthCollege = true;
        }
        if (e === this.sharedservice.nmdcComponentId) {
          this.nmdc = true;
        }
        if (e === this.sharedservice.genderComponentId) {
          this.genderInc = true;
        }
      });
    }
  }
  newMenu() {
    if (this.elementRef.nativeElement.querySelectorAll(".show").length > 0) {
      this.elementRef.nativeElement
        .querySelectorAll(".show")[0]
        .classList.remove("show");
    }
  }
  changePassword() {
    this.common.openChangePass();
  }

  goToPage(page) {
    if (
      page === this.sharedservice.meruComponentId ||
      page === this.sharedservice.universityComponentId ||
      page === this.sharedservice.collegeComponentId
    ) {
      this.router.navigate([this.routers.instituteList, page]);
    } else {
      this.router.navigate([this.routers.ComponentWiseMapping, page]);
    }

    this.sharedservice.goInstitutionPage(page);
  }
  goToStatus(page) {
    this.router.navigate([this.routers.status, page]);
    this.sharedservice.goStatusPage(page);
  }
  goToActivity(page) {
    if (this.insType === "C") {
      this.router.navigate([this.routers.Activity, page]);
    } else {
      this.router.navigate([this.routers.Activity, page]);
    }
    this.sharedservice.goActivityPage(page);
  }
  goToActivityMeru(data: any) {
    this.router.navigate([this.routers.Activity, data]);
  }

  callAgainRoute(url: any) {
    if (this.router.url == "/app/fundManagement/fundDemand/0") {
      this.router.navigate([url + "/", "1"]);
    }
  }

  logout() {
    this.userService.logout(sessionStorage.getItem("userName")).subscribe(
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

  // getPropsalStatus() {
  //   const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
  //   let payload = {
  //     aisheCode: encryptedAishe
  //   }
  //   this.getService.getfinalSubmitProposal(payload).subscribe(res => {
  //       if (res.data.length && res.data) {
  //         // const ProgressValue = res.data.filter(e =>  (parseInt(e.componentId) === parseInt(this.trueValues[0])) || parseInt(e.componentId) === parseInt(this.trueValuesConditionally[0]))
  //         const ProgressValue = res.data.filter(e =>  
  //           this.trueValues.includes(e.componentId.toString()) ||
  //           this.trueValuesConditionally.includes(e.componentId.toString())
  //         );
  //         this.revisedProposalDprUndertaking = ProgressValue[0]?.revisedProposalDprUndertaking
  //         this.revisedVersion3 = ProgressValue[0]?.isEligibleForV3
  //         if (ProgressValue[0]?.revisedProposalForwardedtoNpd) {
  //           this.showMonitoring = true;
  //           // this.notification.showValidationMessage(`Sorry, It cannot be unlocked as data for Year and Month is already there. Inorder to unlock data for this MaxYear/MaxMonth, Please unlock latest data.`);
  //         }
  //         else {
  //           this.showMonitoring = false
  //         }

         
  //       }
  //     },
  //     (err) => {}
  //   );
  // }

  getPropsalStatus() {
  const encryptedAishe = this.aisheCode 
    ? this.encrypt.getEncryptedValue(this.aisheCode) 
    : '';

  const payload = { aisheCode: encryptedAishe };

  this.getService.getfinalSubmitProposal(payload).subscribe(
    (res) => {
      if (res?.data?.length) {

        const progress = res.data.find(e =>
          this.trueValues.includes(e.componentId?.toString()) ||
          this.trueValuesConditionally.includes(e.componentId?.toString())
        );

        // Safe assignments
        this.revisedProposalDprUndertaking = progress?.revisedProposalDprUndertaking ?? null;
        this.revisedVersion3 = progress?.isEligibleForV3 ?? null;

        // Clean boolean logic
        this.showMonitoring = !!progress?.revisedProposalForwardedtoNpd;

      } else {
        this.showMonitoring = false;
      }
    },
    (err) => {
      console.error(err);
      this.showMonitoring = false;
    }
  );
}



  openURL(componentId){
    sessionStorage.setItem('getComponentId', componentId)
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode : encryptedAishe,
      componentId : componentId
    }
    this.getService.getfinalSubmitProposal(payload).subscribe(res => {
      // let isRevisedDprLock = res.data[0]?.revisedProposalRevisedDprUploadedLock
      let undertaking = res.data[0]?.revisedProposalDprUndertaking
      let npdFwd = res.data[0]?.revisedProposalForwardedtoNpd
      if(undertaking == false && npdFwd){
        this.notification.showValidationMessage("DPR for this Project has already been uploaded during the Proposal-Revision. There's no need to re-upload it. In case of any discrepancies in DPR, please send an email to ministryofhrd@gmail.com for rectification.")
        return
      }
      else if(undertaking == false && !npdFwd){
        this.notification.showValidationMessage("DPR for this Project has already been uploaded during the Proposal-Revision. There's no need to re-upload it. In case of any discrepancies in DPR, please send an email to ministryofhrd@gmail.com for rectification.")
        return
      }
      else if(undertaking && npdFwd){
        this.router.navigate([this.routers.revisedDpr])
      }
      else if(undertaking && !npdFwd){
       this.notification.showValidationMessage("Please Submit Revised Proposal and get it forwarded to NPD via your State-SAA using AADHAR based eSign!!!")
      }
       else if(undertaking == null){
          this.notification.showValidationMessage("Please use 'Proposal Revision Submission Module' to upload the Revised DPR while submitting the Revised Proposal and get it forwarded to NPD via your State-SAA using AADHAR based eSign!!!")
        //this.router.navigate([this.routers.revisedDpr])

      }
      // else{
      //   this.router.navigate([this.routers.revisedDpr]) 

      // }
      // this.getLockProposal(npdFwd, undertaking)
     
 })

   }



 


//   getLockProposal(npdFwd, undertaking){
//     let aisheCode = this.aisheCode;
//     let componentId = sessionStorage.getItem('getComponentId')
//     this.getService.getLockListStatus(aisheCode, componentId).subscribe((res) => {
//       if((res[0]?.revisedProposalDprUploaded !== false) && (npdFwd && !undertaking)){
//             this.notification.showValidationMessage("DPR for this Project has already been uploaded during the Proposal-Revision. There's no need to re-upload it. In case of any discrepancies in DPR, please send an email to ministryofhrd@gmail.com for rectification.")
//             return
//       }
//     else{
//       this.router.navigate([this.routers.revisedDpr])
//    }
 
 
// });
// }
}

