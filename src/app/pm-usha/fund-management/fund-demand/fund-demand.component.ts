import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Location } from '@angular/common';
import { routes } from 'src/app/routes';
import { PostService } from 'src/app/service/post.service';
@Component({
  selector: 'cfs-fund-demand',
  templateUrl: './fund-demand.component.html',
  styleUrls: ['./fund-demand.component.scss']
})
export class FundDemandComponent implements OnInit {
  public routers: typeof routes = routes;
  selectedIndex: number = 0;
  stateCode: any;
  hideTable: boolean = true;
  stateName: any;
  isEsign: boolean
  passId: number;
  dataList: any[] = [];
  totalAmount: any
  checkIdSave: boolean = false
  checkId: boolean;
  isStateFundDemandSubmit: boolean;
  check1Id: number;
  filterStateList: Array<any> = [];
  stateList: Array<any> = [];
  userNPD: any;
  passStateCode: any;
  tabId: any = '0';
  id: any;
  dfrTabId: any;
  stateFundBriefDetailId: any;
  constructor(private masterService: MasterService, private getService: GetService, public _location: Location,
    public notification: NotificationService, public sharedService: SharedService, private route: ActivatedRoute, public router: Router, private postService: PostService) {
    this.userNPD = sessionStorage.getItem('userTypeId');

    if (this.userNPD === this.sharedService.userTypeList['0'].id || this.userNPD === this.sharedService.userTypeList['6'].id || this.userNPD === this.sharedService.userTypeList['7'].id || this.userNPD === this.sharedService.userTypeList['8'].id || this.userNPD === this.sharedService.userTypeList['9'].id || this.userNPD === this.sharedService.userTypeList['10'].id) {
      this.getSateData();
    } else {
      this.stateCode = sessionStorage.getItem('stateCode');
    }
    this.tabId = this.route.snapshot.paramMap.get('tabId');
    this.id = this.route.snapshot.paramMap.get('tabId')
    this.getBriefDetails(this.stateCode);
    this.route.paramMap.subscribe(params => {
      this.id = params.get('tabId');

      if (this.id == 1) {
        this.selectedIndex = 0;
        this.hideTable = false;
      } else {
        this.hideTable = true;
      }
      this.router.navigate(['/app/fundManagement/fundDemand', '0']);
    });

  }
  ngOnInit(): void {

    this.sharedService.getfundTabs.subscribe((res) => {
      if (res !== 0 && res !== null) {
        this.check1Id = res;
        let check = res;
        this.passId = res;
        if (check !== null && check) {
          this.checkId = true;
        } else {
          this.checkId = false;
        }

      } else {
        this.check1Id = null;
        this.checkId = false;
      }
    })
    this.sharedService.getFundSubmit.subscribe((res) => {
      if (res) {
        this.isStateFundDemandSubmit = res;
      }
    })

    if (this.tabId !== '0') {
      this.tabId = Number(this.tabId) - 1
      this.checkId = true
      let value = {
        index: this.tabId
      }

      this.tabSelected(value).then(res => {
        if (res) {
          this.showTab(true, res, this.stateCode)
        }
      })
    }
  }
  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
  }
  back() {
    this.getBriefDetails(this.stateCode);
    this.selectedIndex = 0
    this.hideTable = true;
    this.isStateFundDemandSubmit = false;
  }

  getBriefDetails(data: any) {
    this.dataList = [];
    const payloadDetails = {
      stateCode: this.userNPD !== this.sharedService.userTypeList['7'].id && this.userNPD !== this.sharedService.userTypeList['8'].id && this.userNPD !== this.sharedService.userTypeList['9'].id && this.userNPD !== this.sharedService.userTypeList['10'].id && this.userNPD !== this.sharedService.userTypeList['6'].id && this.userNPD !== this.sharedService.userTypeList['0'].id ? this.stateCode : data?.value ? data.value : '',
      npd: this.userNPD === this.sharedService.userTypeList['7'].id || this.userNPD === this.sharedService.userTypeList['8'].id || this.userNPD === this.sharedService.userTypeList['9'].id || this.userNPD === this.sharedService.userTypeList['10'].id || this.userNPD === this.sharedService.userTypeList['6'].id || this.userNPD === this.sharedService.userTypeList['0'].id ? 1 : false,
      stateFundBriefDetailId: 0
    }
    this.getService.getBriefData(payloadDetails).subscribe(
      (res) => {
        if (res && res.length) {
          res.forEach((element) => {
            if (element.id) {
              this.dataList.push({
                ...res,
                id: element?.id,
                stateCode: element?.stateCode,
                stateName: element?.stateName,
                isEsign: element?.isEsign === null ? false : element?.isEsign,
                dateFinalSubmissionString: element?.dateFinalSubmissionString,
                isFinalSubmit: element?.isFinalSubmit === null ? false : element?.isFinalSubmit,
                esignDateString: element?.esignDateString,
                totalFund: parseInt(element?.rusa1CentralShareDemand) ? parseInt(element?.rusa1CentralShareDemand) : 0 + parseInt(element?.rusa2CentralShareDemand) ? parseInt(element?.rusa2CentralShareDemand) : 0 + parseInt(element?.pmushaCentralShareDemand) ? parseInt(element?.pmushaCentralShareDemand) : 0
              });
            }
          });
          this.totalAmount = parseInt(res[0].rusa1CentralShareDemand ? res[0].rusa1CentralShareDemand : 0 + res[0].rusa2CentralShareDemand ? res[0].rusa2CentralShareDemand : 0 + res[0].pmushaCentralShareDemand ? res[0].pmushaCentralShareDemand : 0)
        }
      },
      (err) => { }
    );
  }



  showTab(value, id: any, stateCode1: any) {

    if (id === 'NewDemand' && this.stateCode) {
      const state = this.stateCode;
      let check1 = this.dataList.filter((item) => { return !item.isFinalSubmit && item.id });
      if (check1.length > 0) {
        this.notification.showValidationMessage('One of your proposal is already in the draft stage. Please submit it.');
        return;
      }

      this.getService.checkEligibilty(state).subscribe((res) => {

        if (res?.message === "Elligible") {
          if (value === true) {
            this.hideTable = false;
            this.passId = id;
            this.sharedService.setFundtabs(0);
            this.isStateFundDemandSubmit = false;
            this.selectedIndex = 0;
            this.passStateCode = this.stateCode;
          }
          else {
            this.hideTable = true;
          }
        } else {
          this.notification.showValidationMessage(res?.message);
        }
      })
      return;
    }
    if (value === true) {
      this.hideTable = false;
      this.passId = id;
      this.passStateCode = stateCode1 ? stateCode1 : this.stateCode;
      this.sharedService.setFundtabs(id);
    }
    else {
      this.hideTable = true;
    }
  }
  async tabSelected(value) {
    this.passId = null
    this.selectedIndex = value.index;

    if (!this.checkId) {
      this.selectedIndex = 0;
      this.notification.showValidationMessage('Please fill in the brief details');
      return;
    } else {
      this.passId = this.check1Id;
      this.dfrTabId = this.selectedIndex;
      let cururl = this._location.path().replace(this.id, '0');
      this._location.go(cururl)
      return this.check1Id
    }
  }

  getDocumentFile(stateFundRequestDetailId, stateCode) {
    let temp = {
      stateFundRequestDetailId: stateFundRequestDetailId,
      stateCode: stateCode
    }
    this.getService.getEsignPdfFile(temp).subscribe((res) => {
      if (res) {
        this.downloadPdf1(res.digitallySignedDocument, res.digitallySignedDocumentName)
      }
    })
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

  updateFund(id) {

    this.postService.updateFundData(id).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(res.message)
      }
    })
  }
}
