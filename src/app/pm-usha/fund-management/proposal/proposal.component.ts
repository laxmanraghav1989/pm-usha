import { Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cfs-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit, OnChanges {
  @ViewChild('acceptForm') acceptFormElement;
  clientRequestURL: string;
  src: SafeResourceUrl;
  rusaPhase: any = [];
  checkSave: boolean = false;
  rusa: any;
  rusa10Compare: any;
  rusa1Institution: any;
  numberPmushaInstitution: any;
  rusa2Institution: any;
  rusa1CentralShareDemand: any;
  rusa2CentralShareDemand: any;
  pmushaCentralShareDemand: any;
  arr: Array<any> = [];
  byDefault1: boolean = true;
  hideTable1: boolean;
  briefForm: FormGroup;
  showTable: boolean = false;
  balancecentralShareLiabilityRusa1and2: any;
  centralShareRecommendedReleaseCorresToReleaseRusa1and2: any;
  centralShareApprovedPmusha: any;
  centralShareRecommendedReleasePmusha: any
  remarks: string = '';
  @Input() item: any;
  @Input() itemS: any;
  @Input() passStateCode: any;
  @Input() indexId: any;
  finalSubmit: boolean = false;
  checkFundDemandSubmit: boolean
  checkId: any;
  userNPD: any;
  userId: string;
  environment: string;
  esignBlob: any
  myFilesName: any;
  tabId: number = 8
  stateCode: string;
  isUcEsign: boolean = false;
  isIfdEsign: boolean = false
  isEsign: boolean = false
  documentName: any;
  documentId: number;
  rusa1CenterShareApproved: any;
  rusa1CenterShareRealeased: any;
  rusa2CenterShareApproved: any;
  rusa2CenterShareRealeased: any;
  pmushaCenterShareApproved: any;
  pmushaCenterShareRealeased: any;
  totalcenterSharedApprovedRusa1Rusa2: any;
  totalcenterSharedRealeasedRusa1Rusa2: any;
  TotalCenterShareduetotheShare: any;
  totalAllRusaCentralApproved: any;
  totalAllAmountDemand: any;
  averageTotalAllRusaCentralApproved: any;
  rusa1rusa1CenterSharedliability: number;
  rusa2rusa2CenterSharedliability: number;
  StateData: any;
  UpdateStateData: any;
  fy2024AnnualBudget: any;
  fy2024AnnualBudgetPercent: string;
  constructor(public sharedService: SharedService, public fb: FormBuilder, public getService: GetService, public common: Common,
    private postService: PostService, public notification: NotificationService, private sanitizer: DomSanitizer) {
    this.environment = environment.eSignGateway;
    this.clientRequestURL = environment.fundManagementRequestURL
    this.userId = sessionStorage.getItem('userName')
    this.userNPD = sessionStorage.getItem('userTypeId');
    this.rusaPhase = [
      { rusa: 'RUSA 1.0', rusaData: [] },
      { rusa: 'RUSA 2.0', rusaData: [] },
      { rusa: 'PM-USHA', rusaData: [] },
    ]

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.itemS = changes.itemS.currentValue;
    this.indexId = changes.indexId.currentValue;
    this.item = changes.item.currentValue;
    this.passStateCode = changes.passStateCode.currentValue


  }
  ngOnInit(): void {
    this.stateCode = this.passStateCode
    if (this.itemS && this.indexId === 5 && this.item && this.item !== "NewDemand") {

      this.sharedService.getfundDemandDetailsData.subscribe((res) => {
        if (res) {
          this.finalSubmit = res.isFinalSubmit
          this.balancecentralShareLiabilityRusa1and2 = res.balancecentralShareLiabilityRusa1and2
          this.centralShareApprovedPmusha = res.centralShareApprovedPmusha
          this.centralShareRecommendedReleasePmusha = res.centralShareRecommendedReleasePmusha;
          this.remarks = res?.overallRemarksOnProposalByState
          this.centralShareRecommendedReleaseCorresToReleaseRusa1and2 = res.centralShareRecommendedReleaseCorresToReleaseRusa1and2
          this.isIfdEsign = res?.isIfdEsign;
          this.isUcEsign = res?.isUcEsign;
          this.isEsign = res?.isEsign;
          this.sharedService.setFundSubmit(res?.isStateFundDemandSubmit)
          this.checkFundDemandSubmit = res?.isStateFundDemandSubmit;
          this.TotalCenterShareduetotheShare = (this.centralShareApprovedPmusha?this.centralShareApprovedPmusha:0) + (this.balancecentralShareLiabilityRusa1and2?this.balancecentralShareLiabilityRusa1and2:0)
        } else {
          this.getBriefDetails();
        }
      })
      this.getFundDemand();
    }

    if (!this.itemS && this.indexId === 4 && this.item && this.item !== "NewDemand") {
      this.sharedService.getfundDemandDetailsData.subscribe((res) => {
        if (res) {
          this.finalSubmit = res.isFinalSubmit
          this.balancecentralShareLiabilityRusa1and2 = res.balancecentralShareLiabilityRusa1and2
          this.centralShareApprovedPmusha = res.centralShareApprovedPmusha
          this.centralShareRecommendedReleasePmusha = res.centralShareRecommendedReleasePmusha;
          this.remarks = res?.overallRemarksOnProposalByState
          this.centralShareRecommendedReleaseCorresToReleaseRusa1and2 = res.centralShareRecommendedReleaseCorresToReleaseRusa1and2
          this.isIfdEsign = res?.isIfdEsign,
            this.isUcEsign = res?.isUcEsign,
            this.isEsign = res?.isEsign
          this.sharedService.setFundSubmit(res?.isStateFundDemandSubmit)
          this.checkFundDemandSubmit = res?.isStateFundDemandSubmit;
        } else {
          this.getBriefDetails();
        }
      })

      this.getFundDemand();

    }

    this.sharedService.getfundTabs.subscribe((res) => {
      if (res) {
        this.checkId = res;

      }
    })
  }

  getFundDemand() {
    let payloadDetails;
    if (this?.item && this?.item !== 'NewDemand') {
      payloadDetails = {
        stateCode: this.passStateCode,
        stateFundRequestDetailId: this.item ? this.item : this.checkId
      }
    } else {
      payloadDetails = {
        stateCode: this.passStateCode,
      }
    }
    this.getService.getFundDemand(payloadDetails).subscribe(
      (res) => {
        if (res && res.length) {
          let array1 = res.filter(e => e.phase === 'RUSA 1')
          let array2 = res.filter(e => e.phase === 'RUSA 2')
          let array3 = res.filter(e => e.phase === 'PM-USHA')

          const arr1 = [...array1, ...array2, ...array3];

          this.rusa10Compare = arr1.map((item, index) => {
            return {
              ...item,
              id: item.id,
              compareA: (item.amountApprovedCentralShare ? item.amountApprovedCentralShare : 0) - (item.amountReleasedCentralShare ? item.amountReleasedCentralShare : 0),
            }
          })
          this.rusa1CentralShareDemand = array1.reduce((acc, curr) => {
            return acc += parseInt(curr.amountDemand);
          }, 0);
          //12-09-2023
          //Start
          this.rusa1CenterShareApproved = array1.reduce((acc, curr) => {
            return acc += parseInt(curr.amountApprovedCentralShare);
          }, 0);
          this.rusa1CenterShareRealeased = array1.reduce((acc, curr) => {
            return acc += parseInt(curr.amountReleasedCentralShare);
          }, 0);
          this.rusa1rusa1CenterSharedliability = this.rusa1CenterShareApproved - this.rusa1CenterShareRealeased
          this.rusa2CenterShareApproved = array2.reduce((acc, curr) => {
            return acc += parseInt(curr.amountApprovedCentralShare);
          }, 0);
          this.rusa2CenterShareRealeased = array2.reduce((acc, curr) => {
            return acc += parseInt(curr.amountReleasedCentralShare);
          }, 0);
          this.rusa2rusa2CenterSharedliability = this.rusa2CenterShareApproved - this.rusa2CenterShareRealeased
          this.pmushaCenterShareApproved = array3.reduce((acc, curr) => {
            return acc += parseInt(curr.amountApprovedCentralShare);
          }, 0);
          this.pmushaCenterShareRealeased = array3.reduce((acc, curr) => {
            return acc += parseInt(curr.amountReleasedCentralShare);
          }, 0);
          this.totalcenterSharedApprovedRusa1Rusa2 = this.rusa1CenterShareApproved + this.rusa2CenterShareApproved
          this.totalcenterSharedRealeasedRusa1Rusa2 = this.rusa1CenterShareRealeased + this.rusa2CenterShareRealeased
          //end
          this.rusa2CentralShareDemand = array2?.reduce((acc, curr) => { return acc += parseInt(curr?.amountDemand); }, 0);
          this.pmushaCentralShareDemand = array3?.reduce((acc, curr) => { return acc += parseInt(curr?.amountDemand); }, 0)
          this.totalAllAmountDemand=this.rusa1CentralShareDemand+this.rusa2CentralShareDemand+this.pmushaCentralShareDemand
          this.rusa1Institution = array1.length;
          this.rusa2Institution = array2.length;
          this.numberPmushaInstitution = array3.length;



          this.rusaPhase['0']['rusaData'] = [...array1]
          this.rusaPhase['1']['rusaData'] = [...array2]
          this.rusaPhase['2']['rusaData'] = [...array3]
          this.getStateData()

        }
      },
      (err) => { }
    );
  }
  compareAmount(event: Event, itemId: number, i, j) {
    const inputValue = (event.target as HTMLInputElement).value;

    this.rusa10Compare.forEach(obj => {
      if (obj.phase !== 'PM-USHA') {
        if (obj.id === itemId && parseInt(inputValue) > obj.compareA) {
          this.notification.showValidationMessage('Amount Demand is greater than the Central liability, Please check the amount.!')
          this.checkSave = true;
          this.rusaPhase[i]['rusaData'][j].amountDemand = 0;
          this.rusaPhase[i]['rusaData'][j].amountDemand = 0;
          return true;
        }

      }
      if (obj.phase === 'PM-USHA') {
        const amount = parseInt(obj.amountApprovedCentralShare ? obj.amountApprovedCentralShare : 0) * 25 / 100;
        if (obj.id === itemId && parseInt(inputValue) > amount) {
          this.notification.showValidationMessage('Amount Demand is greater than the Central liability, Please check the amount.!')
          this.checkSave = true;
          this.rusaPhase[i]['rusaData'][j].amountDemand = 0;
          return true;
        }

      }

    })

  }

  validateAmount(amount: string, compareAmount: any): boolean {

    return amount > compareAmount;
  }

  async getDocumentFile(documentTypeId: any): Promise<number | null> {
    this.documentName = [];
    this.documentId = 0;

    let temp = {
      stateCode: this.passStateCode,
      stateFundRequestDetailId: this.item,
      documentTypeId: documentTypeId,
      componentId: 0
    };

    return new Promise((resolve, reject) => {
      this.getService.getDocumentData(temp).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.documentName = res.data['0']?.name;
            this.documentId = res.data['0']?.id;
            if (this.documentId) {
              resolve(this.documentId);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  async saveRemarks() {
    let documentTypeId: number = 14;
    try {
      this.checkId = await this.getDocumentFile(documentTypeId);
      if (this.checkId) {
        let documentTypeId1: number = 15;
        let checkId1 = await this.getDocumentFile(documentTypeId1);
        if (checkId1) {
          this.saveRemarks1()
        } else {
          this.notification.showValidationMessage('Please Upload Utilization Certificate Document');
        }
      } else {
        this.notification.showValidationMessage('Please Upload IFD checklist Document');
      }
    } catch (error) {
      console.error("An error occurred while getting the document file:", error);
      // Handle the error if getDocumentFile throws an error
      this.notification.showValidationMessage('Error retrieving document file');
    }
  }
  saveRemarks1() {
    let temp = {
      stateFundBriefDetailId: this.item,
      tabId: 8,
      status: true,
      overallRemarksProposalFromStateUt: this.remarks,
      numberRusa1Institution: this.rusa1Institution,
      numnberRusa2Institution: this.rusa2Institution,
      numberPmushaInstitution: this.numberPmushaInstitution,
      rusa1CentralShareDemand: this.rusa1CentralShareDemand,
      rusa2CentralShareDemand: this.rusa2CentralShareDemand,
      pmushaCentralShareDemand: this.pmushaCentralShareDemand

    }

    this.postService.saveFundPrposelRemarks(temp).subscribe(res => {
      if (res.status === 200) {
        this.byDefault1 = false;
        this.hideTable1 = true;
        this.isEsign = true;
        this.getBriefDetails();
        // this.sharedService.setFundSubmit(true);
        this.notification.showSuccess();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

  }
  downloadFund() {
    this.notification.showValidationMessage('Please Final Submit');
  }

  downloadFundDemand() {
    let payload = {
      exportType: 'PDF',
      stateCode: this.passStateCode,
      tabId: 8,
      proposalId: this.item

    }
    this.getService.getFundReport(payload).subscribe((res: any) => {
      if (res) {
        this.downloadPdf1(res.byteData, res.name);
      }
    }, err => { })
  }
  esign() {

    let temp = {
      stateFundBriefDetailId: this.item,
      tabId: 8
    }
    this.postService.saveIfd(temp).subscribe((res) => {
      if (res.statusCode === 200) {
        this.notification.showSuccess();
      }
    })

  }
  showTab1(value) {
    if (value === true) {
      this.byDefault1 = false;
      this.hideTable1 = true;
    }
    else {
      this.byDefault1 = true;
      this.hideTable1 = false;
    }
  }
  getBriefDetails() {
    let payloadDetails;
    if (this?.item && this?.item !== 'NewDemand') {
      payloadDetails = {
        stateCode: this.passStateCode,
        stateFundBriefDetailId: this.item
      }
    } else {
      payloadDetails = {
        stateCode: this.passStateCode,
        //stateFundRequestDetailId: this.item
      }
    }

    this.getService.getBriefData(payloadDetails).subscribe(
      (res) => {
        if (res) {
          this.finalSubmit = res['0'].isFinalSubmit
          this.balancecentralShareLiabilityRusa1and2 = res[0].balancecentralShareLiabilityRusa1and2
          this.centralShareApprovedPmusha = res[0].centralShareApprovedPmusha
          this.centralShareRecommendedReleasePmusha = res[0].centralShareRecommendedReleasePmusha;
          this.remarks = res[0]?.overallRemarksOnProposalByState
          this.centralShareRecommendedReleaseCorresToReleaseRusa1and2 = res[0].centralShareRecommendedReleaseCorresToReleaseRusa1and2
          this.isIfdEsign = res['0']?.isIfdEsign,
            this.isUcEsign = res['0']?.isUcEsign,
            this.isEsign = res['0']?.isEsign
          this.sharedService.setFundSubmit(res['0']?.isStateFundDemandSubmit);
          this.sharedService.setfundDemandDetailsData(res['0']);
          this.checkFundDemandSubmit = res['0']?.isStateFundDemandSubmit;
          this.TotalCenterShareduetotheShare = (this.centralShareApprovedPmusha?this.centralShareApprovedPmusha:0) + (this.balancecentralShareLiabilityRusa1and2?this.balancecentralShareLiabilityRusa1and2:0)
          this.getStateData()
        }
      },
      (err) => { }
    );
  }


  onSubmit(form) {

    if (form.valid) {
      this.totalAllRusaCentralApproved=this.rusa1CenterShareApproved+this.rusa2CenterShareApproved+this.pmushaCenterShareApproved
      this.averageTotalAllRusaCentralApproved =(this.totalAllRusaCentralApproved/2)

      this.totalAllAmountDemand=this.rusa1CentralShareDemand+this.rusa2CentralShareDemand+this.pmushaCentralShareDemand

      if( this.totalAllAmountDemand >this.averageTotalAllRusaCentralApproved ){
        this.notification.showValidationMessage('Should not be more than 50% of annual allocation of the State/UT!')
        return

      }
      this.arr = [...this.rusaPhase[0].rusaData, ...this.rusaPhase[1].rusaData, ...this.rusaPhase[2].rusaData];

      let tem = this.arr.map((e: any) => {
        if (parseInt(e.amountDemand) || e.amountDemand == 0) {
          // this.checkSave = false;
          return {
            "aisheCode": e.aisheCode,
            "amountApprovedCentralShare": e.amountApprovedCentralShare,
            "amountApprovedStateShare": e.amountApprovedStateShare,
            "amountApprovedTotal": e.amountApprovedTotal,
            "amountDemand": e.amountDemand,
            "amountReleasedCentralShare": e.amountReleasedCentralShare,
            "amountReleasedStateShare": e.amountReleasedStateShare,
            "amountReleasedTotal": e.amountReleasedTotal,
            "amountUtilisedCentralShare": e.amountUtilisedCentralShare,
            "amountUtilisedStateShare": e.amountUtilisedStateShare,
            "amountUtilisedTotal": e.amountUtilisedTotal,
            checked: true,
            "componentId": e.componentId,
            "componentName": e.componentName,
            "districtId": e.districtId,
            "districtName": e.districtName,
            "id": e.id,
            "institutionName": e.institutionName,
            "phase": e.phase,
            "rusaLegacyDataId": e.rusaLegacyDataId,
            "stateCode": e.stateCode,
            "stateFundRequestDetailId": this.item,
            "stateName": e.stateName
          }
        } else {
          this.notification.showValidationMessage('Please enter amount!')
          // this.checkSave = true;
          return tem.length = 0;
        }
      })
      if (tem.length > 0) {
        this.postService.saveFundPrposel(tem).subscribe(res => {
          if (res.status === 200) {
            //   this.getFundDemand();
            if (!this.checkFundDemandSubmit) {
              this.getBriefDetails();
            }

            this.showTable = true;
            this.notification.showSuccess();
            this.sharedService.setFundSubmit(true)
            this.saveData();
          }
        }, err => {

        })
      }
    }
  }

  onKeypressEvent(event: KeyboardEvent, maxDigits: number): void {
    const inputChar = String.fromCharCode(event.charCode);
    const currentValue = (event.target as HTMLInputElement).value;
    if (
      event.charCode != 8 &&
      (event.charCode == 0 || !/[\d.]/.test(inputChar) ||
        currentValue.length >= maxDigits)
    ) {
      event.preventDefault();
    }
  }

  saveData() {
    let temp = {
      stateFundBriefDetailId: this.item,
      tabId: 5
    }
    this.postService.saveIfd(temp).subscribe((res) => {
      if (res.statusCode === 200) {
        this.notification.showSuccess();
      }
    })

  }
  eSignData1() {

    let payload = {
      exportType: 'PDF',
      stateCode: this.passStateCode,
      tabId: this.tabId,
      proposalId: this.item

    }
    this.common.esign(payload).then((res: any) => {
      if (res.byteData) {
        this.myFilesName = res.name
        this.viewPdf(res.byteData, res.name);
        this.common.downloadPdf(res.byteData)
      }
    })
  }
  viewPdf(data: any, fileName: string) {

    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.esignBlob = new Blob([ba], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(this.esignBlob);
    this.src = this.bypassAndSanitize(url);
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
  xml: any
  generateXML() {
    let obj = {
      username: this.userId,
      stateCode: this.passStateCode,
      stateFundRequestDetailId: this.item,
      tabId: this.tabId,
      esignBlob: this.esignBlob,
      myFilesName: this.myFilesName

    }
    this.common.generateXML(obj).then(res => {
      this.xml = res
      setTimeout(() => {
        this.redirect()
      }, 1000);
    })

  }
  redirect() {
    this.acceptFormElement.nativeElement.submit();
  }
  getStateData() {
    this.getService.getStateData().subscribe((res) => {
      if (res) {
        this.StateData = res;
        this.UpdateStateData = this.StateData.filter(item => item.stCode === this.stateCode);
        this.fy2024AnnualBudget = this.UpdateStateData[0]?.fy2024AnnualBudget
        this.fy2024AnnualBudgetPercent = ((this.fy2024AnnualBudget * 12.5) / 100).toFixed(2)
      }
    }, (err) => { })
  }
  downloadPdf1(data, fileName) {
    // Convert base64 string to Uint8Array
    let uint8_data = this.base64ToUint8Array(data);

    // Create a Blob from the Uint8Array data
    let blob = new Blob([uint8_data], { type: 'application/pdf' });

    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName; // You can set the filename here
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  base64ToUint8Array(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
}
