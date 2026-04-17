import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-view-upload',
  templateUrl: './view-upload.component.html',
  styleUrls: ['./view-upload.component.scss']
})
export class ViewUploadComponent implements OnInit {
  stateCode:any
  docsList:Array<any>=[];
  tab:any
  userTypeId: string;
  constructor(public api:ApiService,public sharedService:SharedService) {
    
    this.userTypeId = sessionStorage.getItem('userTypeId')
    if(this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['6'].id){
      this.stateCode='ALL'
    }else{
      this.stateCode = sessionStorage.getItem('stateCode')
    }
 
    this.getUploadList();
   }

  ngOnInit(): void {
  }
  getUploadList() {
    this.api.getUploadMou(this.stateCode).subscribe(res => {
      this.docsList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  viewPdf(data: any, fileName: string) {
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
