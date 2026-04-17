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
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'cfs-dpr-consolidated',
  templateUrl: './dpr-consolidated.component.html',
  styleUrls: ['./dpr-consolidated.component.scss']
})
export class DprConsolidatedComponent implements OnInit {
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
  tempConsolidatedListGie: Array<any> = []
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
  allConslidatedMeru: number = 0;
  allConslidatedGie: number = 0;
  fnpd: any = '1'
  genderconsolidatedList: Array<any> = []
  otherConsolidatedList:Array<any>=[]
  trueEsignDocument: boolean = false;
  componentListDropDown: any[];
  esignRecord: any;
  consolidatedListTotal: any[];
  genderConsListTotal:any[];
  selectedIndex: number;
isPanelOpenMeru: any;
isPanelOpenGie: any;

  consolidatedMatchList: any[];
  genderconsolidatedMatchList: any[];
  revisedProposedDetails:any = []
  revisedDprFilterArr:any = []
  dprStatusFilter:any =[]
  tab: Window;
  constructor(public getService: GetService, public sharedService: SharedService, public masterService: MasterService,
    public common: Common, public notification: NotificationService, public router: Router, private sanitizer: DomSanitizer,
    public postService: PostService, public encrypt: EncryptDecrypt, public api: ApiService, private dialog : MatDialog) {
    this.environment = environment.eSignGateway;
    this.clientRequestURL = environment.clientrequestURL
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userId = sessionStorage.getItem('userName')
    this.userTypeId = sessionStorage.getItem('userTypeId')
    this.getLockProposal()
   if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
      this.stateCode = sessionStorage.getItem('stateCode');
    
    }
    
  }

  ngOnInit(): void {}

  getLockProposal(){
    this.revisedDprFilterArr = []
    let stateCode = this.stateCode;
    let revisedProposalRevisedDprUploaded = true
    this.getService.getLockListStatusConsolated(revisedProposalRevisedDprUploaded, stateCode).subscribe((res) => {
      if(res){
        this.revisedProposedDetails = res.filter(e => e.revisedProposalRevisedDprUploaded)
        if (this.stateCode) {
            this.getConsolidate();
          }
      }})
    
    }



  getConsolidate() {
  this.revisedDprFilterArr = []
   let payload = {
      stateCode: this.stateCode === 'ALL' ? null : (this.stateCode || null),
      componentId: this.componentId === 0 ? '' : this.componentId,
      // finalReviseProposalLockStatus: true,
      pabActionId: ''

    }
    this.getService.getfinalSubmitProposal(payload).subscribe(res => {
     this.consolidatedList = res.data.filter(e => e.userTypeId?.toString() !== this.sharedService.userTypeList['1'].id && (e.isRevisedProposalDprEsign == false || e.isRevisedProposalDprEsign == null) && (e.pabActionId === 1 || e.pabActionId === 3))
     this.dprStatusFilter = this.consolidatedList.filter((e:any) => (e.revisedProposalForwardedtoNpd === true && e.revisedProposalDprUndertaking === true))
     this.consolidatedList.forEach((e: any) => {
        this.revisedProposedDetails.forEach((a: any) => {
          if (e.aisheCode.toString() === a.aisheCode.toString()) { 
            this.revisedDprFilterArr.push(e);  
          }
        });
      });
      this.consolidatedList = this.revisedDprFilterArr 
    })
   
   }

unlock(item){
  let temp = {
    aisheCode: item.aisheCode,
    componentId: item.componentId,
    constant: 'revisedProposalRevisedDprUploaded',
    districtCode: item.districtCode,
    // instituteCategory: characters,
    stateCode: item.stateCode,
    status: false
  }
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '25%',
          data: {
            message: 'Are you sure you want to UnLock ?',
          }
})
    
dialogRef.afterClosed().subscribe(res =>{
  if(res){
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res?.data === "done") {
        this.notification.showSuccessMessage(`DPR Revised has been UnLoked successfully!!!`);

        this.getLockProposal()
        // this.getConsolidate()
      }
    });
  }

})




}

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




  //esign


  forword() {
    if (this.myCheck1) {
      let payload = {
        type: 'PDF',
        stateCode: this.stateCode,
        componentId: [this.sharedService.meruComponentId, this.sharedService.universityComponentId, this.sharedService.collegeComponentId, this.sharedService.nmdcComponentId, this.sharedService.genderComponentId],
        proposalRevisionApprovedBySaa: true,
        // finalReviseProposalLockStatus: null,
        // revisedProposalForwardedToNpd: null,
        pabActionId: 1,
        revisedProposalRevisedDprLockStatus : true,
        // revisedProposalDprUndertaking : null,
        isRevisedProposalRevisedDprEsign: false,
        reportTitle : 'Revised DPR Proposal'
      }
     
      
      //   if (this.dprStatusFilter.length !== this.revisedDprFilterArr.length) {
      //     this.notification.showValidationMessage(`Please upload revised DPR to all of the pending PAB approved proposals. Once all of the pending revised DPR would be uploaded and locked by the concerned proposal owner/user, one can forward all of the DPR to NPD in one-go via AADHAR based eSign using SAA user credential.`);
      //     return;
      // }
      
      this.getService.downloadDataConsolidatedDpr(payload).subscribe(res => {
  
  
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



  blob1: any;
  xml: any
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

  tabValue(compId){
    if (compId === 1) {
      this.getESignTransactionId(compId)
      this.isPanelOpenGie = false
    }
    else if (compId === 5) {
      this.getESignTransactionId(compId)
      this.isPanelOpenMeru = false
    }
  }

  getESignTransactionId(compId) {
    let payload = {
      stateCode: this.stateCode,
      // revisedProposal: compId === 1?true:false, //College,University,Meru (true)
      // revisedProposalEquity:compId === 5?true:false, //Gender Equity (true)
      saaRevisedDpr: true
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
  bypassAndSanitize(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  generateXML(){
    
      var saaRevisedDpr = true
      const formdata: FormData = new FormData();
      if (this.blob) {
        formdata.append('file', this.blob, this.myFilesName);
      }
      let componentId = [this.sharedService.meruComponentId, this.sharedService.universityComponentId, this.sharedService.collegeComponentId, this.sharedService.genderComponentId, this.sharedService.nmdcComponentId]

      this.postService.revisedGenerateXMLService(this.userId, this.stateCode, formdata, true,componentId, saaRevisedDpr).subscribe(res => {
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

  redirect() {
    this.acceptFormElement.nativeElement.submit();
  }

  back() {
    this.src = null
  }

  view(documentId) {
    let temp = {
      documentId : documentId,
      documentTypeId: 41,
      
    }
    this.getService.viewDocument(temp).subscribe((res) => {
      if (res) {
      this.viewDocuments(res.data[0].documentFile, res.data[0].name)
      }
     
    })
  }






viewDocuments(data: any, fileName: string) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    var blob = new Blob([ba], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    this.tab = window.open(url, fileName);
    this.tab.location.href = url;

    function _base64ToArrayBuffer(base64: string) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
    // let file = new Blob([data], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }

}

