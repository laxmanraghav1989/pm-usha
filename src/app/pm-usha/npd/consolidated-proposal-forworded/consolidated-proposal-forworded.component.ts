import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-consolidated-proposal-forworded',
  templateUrl: './consolidated-proposal-forworded.component.html',
  styleUrls: ['./consolidated-proposal-forworded.component.scss']
})
export class ConsolidatedProposalForwordedComponent implements OnInit {
  tempConsolidatedList: Array<any> = [];
  consolidatedList: Array<any> = [];
  searchText: any = '';
  userTypeId: any;
  isSAAforword: boolean = true;
  myCheck1: any;
  stateCode: any;
  constructor(public sharedService: SharedService, public getService: GetService) { }

  ngOnInit(): void {
    this.stateCode = sessionStorage.getItem('stateCode')
    this.getConsolidatedProposalForwordedData();
  }

  ///saaForwardedFinalProposal
  getConsolidatedProposalForwordedData() {
    let payload={
      stateCode:'ALL',
      reviseProposalOrInitial:false
    }
    this.getService.saaForwardedFinalProposal(payload).subscribe((res) => {
      if (res.status === 200) {
        this.consolidatedList = res.data;
        this.tempConsolidatedList=[...this.consolidatedList]
        this.handlePageChange(this.sharedService.page = 1)
      }
    })
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
        return (item.stateName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.userId?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.digitallySignedDate?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.digitallySignedDocumentName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
        

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
  downloadPdf(stateCode) {
    this.getService.getEsignTransId(stateCode).subscribe(res => {
      if (res.digitallySignedDocument) {
        this.downloadDoc(res.digitallySignedDocument,res.digitallySignedDocumentName)
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
}
