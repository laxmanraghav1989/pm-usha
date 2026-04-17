import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/app/service/post.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'cfs-revised-consolidated-list',
  templateUrl: './revised-consolidated-list.component.html',
  styleUrls: ['./revised-consolidated-list.component.scss']
})
export class RevisedConsolidatedListComponent implements OnInit {
  @ViewChild('acceptForm') acceptFormElement;
  revisedProposalForwardedtoNpd: boolean = true
  src: SafeResourceUrl;
  public routers: typeof routes = routes;
  userTypeId: any;
  consolidatedList: Array<any> = [];
  variables: Array<any> = [];
  stateList: Array<any> = [];
  stateCode: string
  componentId: any = 0
  consolidatedListArray: Array<any> = [];
  componentList: Array<any> = []
  meruUnit: number = 0
  univUnit: number = 0;
  clgUnit: number = 0;
  nmdcUnit: number = 0;
  genderUnit: number = 0;
  mmerUnit: number = 0;
  totalUnit: number = 0;
  searchText: any = '';
  tempConsolidatedList: Array<any> = []
  totalCostMeru: number = 0;
  totalCostUniv: number = 0;
  totalCostClg: number = 0;
  totalCostNMDC: number = 0;
  totalCostGender: number = 0;
  totalCostMMER: number = 0;
  totalCost: number = 0
  mobileNo: string = '';
  emailId: string = ''
  latestId: number = 0;
  emailOtp: boolean = false;
  mobileOtp: boolean = false;
  displayE: any;
  display: any;
  verify: boolean = false
  blob: Blob;
  myFilesName: any;
  userId: string;
  myFiles: any[];
  fileSizeExceed: boolean;
  changeDoc: boolean;
  sortDir = 1;
  eSignGatewatHTML: any
  environment: any
  clientRequestURL: string;
  myCheck1: any;
  disabled = true;
  eSignDocument: any;
  eSignDocumentName: any;
  digitallySignedDate: any;
  finalSubmit: boolean;
  pabActionId: number = 1
  finalReviseProposalStatusId: boolean = true
  isProposalRevisionEsignDone: any;
  allConslidated: number = 0;
  fnpd: any = '1'
  genderconsolidatedList: Array<any> = []
  otherConsolidatedList:Array<any>=[]
  trueEsignDocument: boolean = false;
  esignRecord: any;
  componentListDropDown: any[];
  constructor(public getService: GetService, public sharedService: SharedService, public masterService: MasterService,
    public common: Common, public notification: NotificationService, public router: Router, private sanitizer: DomSanitizer,
    public postService: PostService, public encrypt: EncryptDecrypt, public api: ApiService,) {
    this.environment = environment.eSignGateway;
    this.clientRequestURL = environment.clientrequestURL
    this.userId = sessionStorage.getItem('userName')
    this.userTypeId = sessionStorage.getItem('userTypeId')
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
      this.stateCode = sessionStorage.getItem('stateCode');
      this.getPageStatusList('');
      if (this.stateCode) {
        this.getConsolidate();
        this.getComponentList()
      }
    }
    else {
      this.getStateList();
      this.getComponentList()
    }
  }

  ngOnInit(): void {
    // this.common.forwardVerify()

    this.mobileNo = sessionStorage.getItem('mobile')
    this.emailId = sessionStorage.getItem('emailId')
  }
  getStateList() {
    let payload = {
      stateCode: 'ALL',
      reviseProposalOrInitial: true
    }
    this.getService.saaForwardedFinalProposal(payload).subscribe(res => {
      this.variables = res.data;
      this.stateList = this.variables.slice()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getPageStatusList(id) {
    if (this.userTypeId === this.sharedService.userTypeList['1'].id) {
      this.api.getPageStatus(id).subscribe(res => {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.stateAtGlance) {
            this.finalSubmit = true;
          }
        }
      }, err => {
      })
    }
  }
  getComponentList() {
    this.getService.getComponent().subscribe(res => {
      this.componentList = res;
      this.componentListDropDown = this.componentList.filter(e => (e.id !== 6 && e.id !== 99 && e.id !== 100))
      this.componentList.unshift({
        id: 0,
        componentName: '--ALL--'
      })
      this.componentListDropDown.unshift({
        id: 0,
        componentName: '--ALL--'
      })
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // getStateList() {
  //   this.masterService.getState().subscribe(res => {
  //     this.variables = res;
  //     this.stateList = this.variables.slice()
  //   }, err => {

  //   })
  // }
  getFNPD(value){
    if(value === '2'){
      this.allConslidated = this.genderconsolidatedList.length;
      if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
        this.consolidatedList = this.genderconsolidatedList.filter(e => e.proposalRevisionApprovedBySaa === true)
      }
      if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
        this.consolidatedList = this.genderconsolidatedList.filter(o => o.revisedProposalForwardedtoNpd === true)
      }

      
        if (this.consolidatedList && this.consolidatedList.length) {
          for (let index = 0; index < this.consolidatedList.length; index++) {
            if (this.consolidatedList[index].revisedProposalForwardedtoNpd === false || this.consolidatedList[index].revisedProposalForwardedtoNpd === null) {
              this.revisedProposalForwardedtoNpd = true;
              return;
            } else {
              this.revisedProposalForwardedtoNpd = false
            }
          }
        
      }
      if (this.revisedProposalForwardedtoNpd === false) {
        this.getESignTransactionId()
      }
    }else{
      this.consolidatedList = [...this.otherConsolidatedList]
      if (this.sharedService.userTypeList['1'].id === this.userTypeId || this.sharedService.userTypeList['2'].id === this.userTypeId || this.userTypeId === this.sharedService.userTypeList['12'].id) {
        if (this.consolidatedList && this.consolidatedList.length) {
          for (let index = 0; index < this.consolidatedList.length; index++) {
            if (this.consolidatedList[index].revisedProposalForwardedtoNpd === false || this.consolidatedList[index].revisedProposalForwardedtoNpd === null) {
              this.revisedProposalForwardedtoNpd = true;
              return;
            } else {
              this.revisedProposalForwardedtoNpd = false
            }
          }
        }

        if (this.revisedProposalForwardedtoNpd === false) {
          this.getESignTransactionId()
        }
      }
    }
    this.handlePageChange(this.sharedService.page = 1);
  }
  getConsolidate() {
    let payload = {
      stateCode: this.stateCode === 'ALL' ? null : (this.stateCode || null),
      componentId: this.componentId === 0 ? '' : this.componentId,
      finalReviseProposalStatusId: true,
      pabActionId: ''

    }
    this.getService.getfinalSubmitProposal(payload).subscribe(res => {
      this.consolidatedList = res.data.filter(e => e.userTypeId?.toString() !== this.sharedService.userTypeList['1'].id)

      this.genderconsolidatedList = this.consolidatedList.filter(o => (o.componentId === this.sharedService.genderComponentId) && (o.pabActionId === 1 || o.pabActionId === 3))
      this.consolidatedList = this.consolidatedList.filter(o => (o.componentId === this.sharedService.meruComponentId || o.componentId === this.sharedService.universityComponentId || o.componentId === this.sharedService.collegeComponentId) && (o.pabActionId === 1 || o.pabActionId === 3))

      // this.consolidatedList = this.consolidatedList.filter(f=>f.pabActionId === 1 || f.pabActionId === 3)
      
      let array = []
      if(this.fnpd === '1'){
        this.allConslidated = this.consolidatedList.length;
        if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
          this.consolidatedList = this.consolidatedList.filter(e => e.proposalRevisionApprovedBySaa === true)
        }
        if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
          this.consolidatedList = this.consolidatedList.filter(o => o.revisedProposalForwardedtoNpd === true)
        }
        this.otherConsolidatedList = [...this.consolidatedList]
      }
      
      
      this.tempConsolidatedList = [...this.consolidatedList]
      this.meruUnit = 0;
      this.univUnit = 0;
      this.clgUnit = 0;
      this.nmdcUnit = 0;
      this.genderUnit = 0;
      this.mmerUnit = 0;
      this.totalUnit = 0;
      this.totalCostMeru = 0
      this.totalCostUniv = 0
      this.totalCostClg = 0
      this.totalCostNMDC = 0
      this.totalCostGender = 0
      this.totalCostMMER = 0;
      this.totalCost = 0
      let genderConsList=[]
      if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
        genderConsList = this.genderconsolidatedList.filter(e => e.proposalRevisionApprovedBySaa === true)
      }
      if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
        genderConsList = this.genderconsolidatedList.filter(o => o.revisedProposalForwardedtoNpd === true)
      }
      array = [...this.consolidatedList,...genderConsList]
      // let array = []
      // if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
      //   array = res.data.filter(e => e.proposalRevisionApprovedBySaa === true)
      // } else {
      //   array = res.data.filter(e => e.revisedProposalForwardedtoNpd === true)
      // }

      array.forEach(element => {
        if (element.componentId === 1) {
          this.meruUnit = this.meruUnit + 1
          this.totalCostMeru = (element.revisedTotalCost ? element.revisedTotalCost : 0) + this.totalCostMeru
        } if (element.componentId === 2) {
          this.univUnit = this.univUnit + 1
          this.totalCostUniv = (element.revisedTotalCost ? element.revisedTotalCost : 0) + this.totalCostUniv
        } if (element.componentId === 3) {
          this.clgUnit = this.clgUnit + 1
          this.totalCostClg = (element.revisedTotalCost ? element.revisedTotalCost : 0) + this.totalCostClg
        }
        if (element.componentId === 4) {
          this.nmdcUnit = this.nmdcUnit + 1
          this.totalCostNMDC = (element.revisedTotalCost ? element.revisedTotalCost : 0) + this.totalCostNMDC
        }
        if (element.componentId === 5) {
          this.genderUnit = this.genderUnit + 1
          this.totalCostGender = (element.revisedTotalCost ? element.revisedTotalCost : 0) + this.totalCostGender
        }
      });
      this.totalUnit = this.meruUnit + this.univUnit + this.clgUnit + this.nmdcUnit + this.genderUnit;
      this.totalCost = this.totalCostMeru + this.totalCostClg + this.totalCostUniv + this.totalCostNMDC + this.totalCostGender;
      this.totalCostMMER = (this.totalCost / 100) * 1;
      this.handlePageChange(this.sharedService.page = 1);
      if (this.sharedService.userTypeList['1'].id === this.userTypeId || this.sharedService.userTypeList['2'].id === this.userTypeId || this.userTypeId === this.sharedService.userTypeList['12'].id) {
        if (this.consolidatedList && this.consolidatedList.length) {
          for (let index = 0; index < this.consolidatedList.length; index++) {
            if (this.consolidatedList[index].revisedProposalForwardedtoNpd === false || this.consolidatedList[index].revisedProposalForwardedtoNpd === null) {
              this.revisedProposalForwardedtoNpd = true;
              return;
            } else {
              this.revisedProposalForwardedtoNpd = false
            }
          }
        }

        if (this.revisedProposalForwardedtoNpd === false) {
          this.getESignTransactionId()
        }
      }

      // this.totalCostMMER = totalCostMMER.toFixed(2)




       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getESignTransactionId() {
    let payload = {
      stateCode: this.stateCode,
      revisedProposal: this.fnpd === '1'?true:false, //College,University,Meru (true)
      revisedProposalEquity:this.fnpd === '1'?true:false //Gender Equity (true)
    }
    this.getService.getEsignTransId(payload).subscribe(res => {
      this.esignRecord = res
      if (res?.digitallySignedDocument) {
        this.eSignDocument = res.digitallySignedDocument;
        this.eSignDocumentName = res.digitallySignedDocumentName;
        this.trueEsignDocument = true
        const date = res.digitallySignedDate
        this.digitallySignedDate = new Date(date).toLocaleString('en-IN')

        // this.downloadDoc(res.digitallySignedDocument,res.digitallySignedDocumentName)
      }
      else {
        this.trueEsignDocument = false
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  downloadDoc(data: any, fileName: string) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    var blob = new Blob([ba], { type: 'application/pdf' });
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(blob);
    } else {
      var a = document.createElement("a");
      document.body.appendChild(a);
      var fileURL = URL.createObjectURL(blob);
      a.href = fileURL;
      a.download = fileName;

      a.click();
    }
    function _base64ToArrayBuffer(base64: string) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  async updateResults() {
    this.consolidatedList = []
    this.consolidatedList = this.searchByValue(this.tempConsolidatedList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.componentName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.instituteName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.aisheCode?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalScore?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalCost?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))

      }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.consolidatedList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.consolidatedList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.consolidatedList.length - 1);
    }

  }
  openScore(data) {
    this.common.scoreBreakup(data);
  }
  openCost(data) {
    this.common.costBreakup(data, this.sharedService.revPrposal);
  }
  // unlock(item){
  //   let temp = {
  //     "aisheCode": item.aisheCode === undefined ? null : item.aisheCode,
  //     "componentId": item.componentId,
  //     "districtCode": item.districtCode,
  //     "remarks": this.formRemarks.controls['remarks'].value,
  //     "stateCode": item.stateCode,
  //     "unlockComponent": this.common.unlockSAA

  //   }
  // }
  unlock(item) {
    let characters = item.aisheCode.split(/[\W\d]+/).join("");
    let data = {
      aisheCode: item.aisheCode,
      districtCode: item.districtCode,
      stateCode: item.stateCode,
      stateName: item.stateName,
      componentId: item.componentId,
      constant: this.common.proposalRevisionApprovedByState,
      instituteCategory: item.componentId === 5 ? '' : characters,
      status: false,
      institutationName: item.instituteName,
      proposalRevisionApprovedBySaa: item.proposalRevisionApprovedBySaa
    }
    this.common.unLockConsolidated(data).subscribe(res => {
      if (res) {
        this.getConsolidate()
        this.notification.showSuccessMessage('This record has been Successfully unlocked')
      }
    });
  }
  download(type) {
    if (type !== '--Select--') {
      let payload = {
        stateCode: this.stateCode === 'ALL' ? '' : this.stateCode,
        componentId: this.componentId === 0 ? [this.sharedService.meruComponentId, this.sharedService.universityComponentId, this.sharedService.collegeComponentId, this.sharedService.nmdcComponentId, this.sharedService.genderComponentId] : this.componentId,
        type: type,
        proposalRevisionApprovedBySaa: true,
        pabActionId: 1,
        finalReviseProposalLockStatus: true,
        revisedProposalForwardedToNpd: this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id ? false : true
      }
      this.getService.downloadDataConsolidatedRevision(payload).subscribe(res => {
        if (res.byteData) {
          if (type === 'EXCEL') {
            this.common.viewExcel(res.byteData, res.name)
          } else {
            this.common.viewPdf(res.byteData, res.name)
          }

        }
      }, err => {

      })
    }

  }
  forword() {
    if (this.myCheck1) {
      let payload = {
        type: 'PDF',
        stateCode: this.stateCode,
        componentId: this.fnpd === '1' ? [this.sharedService.meruComponentId, this.sharedService.universityComponentId, this.sharedService.collegeComponentId] : [this.sharedService.genderComponentId],
        proposalRevisionApprovedBySaa: true,
        finalReviseProposalLockStatus: true,
        pabActionId: 1,
      }

        if (this.allConslidated !== this.consolidatedList.length) {
          this.notification.showValidationMessage(`Please approve all of the PAB approved/conditionally approved proposals.
           Unless all of the PAB approved/conditionally aproved proposals are approved by SAA, forwarding to NPD via eSign is not possible!`);
          return;
        }
      
      
      this.getService.downloadDataConsolidated(payload).subscribe(res => {
        if (res.byteData) {
          this.myFilesName = res.name
          this.viewPdf(res.byteData, res.name);
          this.downloadPdf(res.byteData)
        }

      }, err => {

      })
    }
    else {
      this.notification.showValidationMessage("Click Certify Checkbox !");
    }
  }


  downloadPdf(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob1 = new Blob([ba], { type: 'application/pdf' });
    function _base64ToArrayBuffer(base64: any) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }
  viewPdf(data: any, fileName: string) {

    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(this.blob);
    this.src = this.bypassAndSanitize(url);
    // this.router.navigate([this.routers.forword,this.src])
    // this.tab = window.open(url, fileName);
    // this.tab.location.href = url;

    function _base64ToArrayBuffer(base64: string) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }

  }
  bypassAndSanitize(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // openOTPDialog() {

  //   this.postService.sendEmail(this.encrypt.getEncryptedValue(this.emailId), this.latestId).subscribe(res => {
  //     if (res.status === 200) {
  //       this.notification.showSuccessMessage(`OTP has been sent successfully to ${this.emailId}.Please enter the same OTP.`)
  //      // this.timerE(1);
  //       this.sendMobileOTP();
  //       this.emailOtp = true;
  //       this.latestId = res.data;
  //     }
  //   }, err => {

  //   })


  // }

  sendMobileOTP() {
    this.postService.sendMobile(this.encrypt.getEncryptedValue(this.mobileNo), this.latestId).subscribe((res) => {
      if (res.status === 200) {
        this.latestId = res.data;
        this.mobileOtp = true;
        this.notification.showSuccessMessage(`OTP has been sent successfully to ${this.mobileNo}.Please enter the same OTP.`)
        //  this.timer(1);
        this.common.forwardVerify()
      }
    },
      (err) => { }
    );
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  timerE(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.displayE = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        clearInterval(timer);
      }

    }, 1000);
  }
  blob1: any;
  xml: any

  generateXML() {
    // const formdata: FormData = new FormData();

    // for (var i = 0; i < this.myFiles.length; i++) {
    //   formdata.append("file", this.myFiles[i]);
    // }
    const formdata: FormData = new FormData();
    if (this.blob) {
      formdata.append('file', this.blob, this.myFilesName);
    }
    let componentId = this.fnpd === '1'?[this.sharedService.meruComponentId, this.sharedService.universityComponentId, this.sharedService.collegeComponentId]:[this.sharedService.genderComponentId]
    this.postService.generateXMLService(this.userId, this.stateCode, formdata, true,componentId).subscribe(res => {
      this.xml = res
      setTimeout(() => {
        this.redirect()
      }, 1000);
      // this.test()
      //  this.clientResponse()
      // this.generateXML()
      // setTimeout(() => {
      //   xml2js.parseStringPromise(this.xml, { explicitArray: false })
      // .then(response => this.esign(response.Esign.$.txn))
      // }, 5000);


       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // test(){
  //      const formdata: FormData = new FormData();
  //   formdata.append('xml', this.xml);
  //   formdata.append('clientrequestURL', this.clientRequestURL);
  //   formdata.append("Content-Type", "application/xml")
  //   formdata.append("username", this.userId)
  //   this.postService.tesAcc(formdata).subscribe(res=>{

  //   },err=>{

  //   })
  // }
  redirect() {
    this.acceptFormElement.nativeElement.submit();
  }
  // transaction_id: any = "999-USHA-"
  // gatewayUrl: any = "https://nic-esigngateway.nic.in/eSign21/";
  // responseUrl: any = "https://nic-esigngateway.nic.in/eSign21/response?rs=";
  // aspId: any = "TNIC-001";
  // certFilePath: any = "D://AisheFinal//AisheIntegratedServices//eSignClient//src//main//resources//nicesign.pfx";
  // certFilePwd: any = "nic-esign0108";
  // fileDownloadPath: any = "D://AisheFinal//AisheIntegratedServices//eSignClient";
  // txnCounter: string = '9711953'
  // baseUrl: string = 'http://localhost:4200/#/app/npd/consolidatedProposal'
  // txnTimeStamp: string
  // timestamp: any
  // hash: any = 'bca7dff2bbb072cfa8f84dab40b8e366a201d1cf47b1fe5aacb26de11d303a94'
  // String timestamp = EsignClientUtil.getCurrentDateTimeISOFormat();
  // 	String pattern = "yyyy-MM-dd'T'HH:mm:ss";
  // 	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
  // 	String txnPattern = "yyyyMMdd-HHmmss";
  // 	SimpleDateFormat txnSimpleDateFormat = new SimpleDateFormat(txnPattern);
  // 	String txnTimeStamp = txnSimpleDateFormat.format(new Date());
  // 	timestamp = simpleDateFormat.format(new Date());

  // generateXML() {

  //   var d = new Date();

  //   let now = new Date();
  //   this.timestamp = (now.getFullYear() + "-" + ("00" + (now.getMonth() + 1)).slice(-2) + "-" + ("00" + now.getDate()).slice(-2) + "T" + ("00" + now.getHours()).slice(-2) + ":" + ("00" + now.getMinutes()).slice(-2) + ":" + ("00" + now.getSeconds()).slice(-2));

  //   var timestamp = now.getFullYear().toString(); // 2011
  //   let month: string = (now.getMonth() + 1).toString();
  //   timestamp += +month < 10 ? '0' + month : month;
  //   let day: string = now.getDate().toString();
  //   timestamp += +day < 10 ? '0' + day : day;



  //   // timestamp += (now.getMonth < 9 ? '0' : '') + (now.getMonth()+1).toString(); // JS months are 0-based, so +1 and pad with 0's
  //   // timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString(); // pad with a 0

  //   var time = (now.getHours()).toString()
  //   time += (now.getMinutes()).toString()
  //   time += (now.getSeconds()).toString()
  //   var ran = Math.floor(100000 + Math.random() * 900000);
  //   var uni = '999-USHA'
  //   this.txnTimeStamp = uni + '-' + timestamp + '-' + time + '-' + ran;

  //   this.xml = "<Esign AuthMode=\"1\" ver=\"2.1\" sc=\"Y\"    ts=\"" + this.timestamp + "\"  txn =\""
  //     + this.txnTimeStamp + "-" + this.txnCounter + "\" ekycId=\"\"  aspId=\"" + this.aspId
  //     + "\" ekycIdType=\"A\" responseSigType=\"pkcs7\"  responseUrl=\"" + this.gatewayUrl + this.baseUrl + "\" ><Docs>"
  //     + "<InputHash id=\"1\" hashAlgorithm=\"SHA256\" docInfo=\"hello\">" + this.hash + "</InputHash>\n"
  //     + "</Docs></Esign>"
  //   this.clientResponse()
  // }

  // esign(a) {
  //   const formdata: FormData = new FormData();
  //   formdata.append('eSignRequest', this.xml);
  //   formdata.append('aspTxnID', a);
  //   formdata.append("Content-Type", "application/xml")
  //   this.postService.ehashtakshar(formdata).subscribe(res => {

  //   }, err => {

  //   })
  // }
  // clientResponse() {
  //   const formdata: FormData = new FormData();
  //   formdata.append('username', 'anwar.khan');
  //   formdata.append('clientrequestURL', 'https://demo.he.nic.in/pm-usha/#/app/npd/consolidatedProposal');
  //   formdata.append("document", '')
  //   formdata.append("xml", this.xml)
  //   formdata.append('clientId', '1');
  //   formdata.append('userId', '2');
  //   formdata.append("Content-Type", 'application/xml')
  //   formdata.append("submit2", 'SUBMIT For Esigning')

  //   this.postService.client(formdata).subscribe(res => {
  //     const sanitizedContent = DOMPurify.sanitize(res);
  //     this.eSignGatewatHTML = this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);



  //   }, err => {

  //   })
  // }
  // res: any
  //  parseXmlToJson(xml) {
  //   // With parser
  //   /* const parser = new xml2js.Parser({ explicitArray: false });
  //   parser
  //     .parseStringPromise(xml)
  //     .then(function(result) {
  //     })
  //     .catch(function(err) {
  //       // Failed
  //     }); */

  //   // Without parser
  //   return  xml2js
  //     .parseStringPromise(xml, { explicitArray: false })
  //     .then(response => 


  //       // JsonToXML.parse("Esign", response.Esign)
  //       ),err=>{

  //       }}

  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }
  onSortClick(event, colName) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr(colName);
  }

  sortArr(colName: any) {
    this.consolidatedList.sort((a, b) => {
      a = a[colName]?.toLowerCase();
      b = b[colName]?.toLowerCase();
      return a?.localeCompare(b) * this.sortDir;
    });
  }

  async getFileDetails(e: any) {
    this.myFiles = [];
    this.myFilesName = '';
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles.push(e.target.files[i]);
        this.myFilesName += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName += ',';
      }
    }


  }
  checkBoxAlert() {
    this.disabled = false;
  }
  back() {
    this.src = null
  }
}
