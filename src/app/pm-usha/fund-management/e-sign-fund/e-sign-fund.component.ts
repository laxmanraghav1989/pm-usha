import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/routes';
import { GetService } from 'src/app/service/get.service';

@Component({
  selector: 'cfs-e-sign-fund',
  templateUrl: './e-sign-fund.component.html',
  styleUrls: ['./e-sign-fund.component.scss']
})
export class ESignFundComponent implements OnInit {

  public routers: typeof routes = routes;
  txnId: string;
  status: string;
  msg: string = 'Pdf is signed successfully'
  tabId: string;
  constructor(private route: ActivatedRoute, public getService: GetService) {
    this.txnId = this.route.snapshot.paramMap.get('txnId');
    this.status = this.route.snapshot.paramMap.get('status');
    this.tabId = this.route.snapshot.paramMap.get('tabId');
    
  }

  ngOnInit(): void {
  }
  downloadPdf() {
    this.getService.downloadeSignFund(this.txnId).subscribe(res => {
      if (res.digitallySignedDocument) {
        this.downloadDoc(res.digitallySignedDocument, res.digitallySignedDocumentName)
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
