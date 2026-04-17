import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ApiService } from 'src/app/service/api.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit,OnDestroy {
  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  stateList: Array<any> = [];
  variables: Array<any> = []
  variables1: Array<any> = []
  searchText: any;
  docsList: Array<any> = [];
  tempDocs: Array<any> = [];
  stateId: any = '0'
  state: any
  userId: any;
  tab: any
  id: any = 0;
  showPage: boolean = false;
  hideButton: boolean = true;
  addUpdateButton: string = "Save";
  disabled:boolean=false
  constructor(public masterService: MasterService, public notification: NotificationService,
    public api: ApiService, public sharedService: SharedService) {
    this.userId = sessionStorage.getItem('userName')

  }

  ngOnInit(): void {
    this.getStateList();
    this.getUploadList();
  }
  getStateList() {
    this.masterService.getStateData().subscribe(res => {
      this.variables = res;
      this.variables1 = res;
      this.stateList = this.variables.slice()
      this.stateList = this.variables1.slice()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  save() {
    if (this.stateId === '0') {
      this.notification.showValidationMessage('Please select state');
      return;
    }
    const formdata: FormData = new FormData();
    if (this.changeDoc) {
      for (var i = 0; i < this.myFiles.length; i++) {
        formdata.append('file', this.myFiles[i]);
      }
    } else {
      if (!this.blob) {
        this.notification.showValidationMessage('Please upload document !!!')
        return;
      }
      formdata.append('file', this.blob, this.myFilesName);
    }
    this.api.uploadMoU(this.stateId, formdata, this.userId, this.id).subscribe(res => {
      if (res.status === 200) {
        this.getUploadList();
        this.notification.showSuccess()
        this.stateId = '';
        this.myFiles = [];
        this.myFilesName = '';
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // getUploadFilter(value) {
  //   this.docsList = this.tempDocs.filter(e => e.stateCode === value);
  //   this.handlePageChange(this.sharedService.page = 1)
  // }
  getUploadList() {
    this.api.getUploadMou(this.stateId === '0' ? 'ALL' : this.stateId).subscribe(res => {
      if(res && res.length){
        this.docsList = res;
        this.tempDocs = [...this.docsList];
        this.handlePageChange(this.sharedService.page = 1)
      }
     
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  edit(item) {
    this.disabled = true
    this.addUpdateButton = 'Update'
    this.showPage = true;
    this.hideButton = false;
    this.id = item.id
    this.stateId = item.stateCode
    this.myFilesName = item.fileName;
    this.download(item.documentFile)
  }
  reset() {
    this.id = 0;
    this.stateId = ''
  }
  close() {
    this.disabled = false;
    this.showPage = false;
    this.hideButton = true;
    this.reset();
    this.addUpdateButton = 'Update'
  }
  add() {
    this.disabled = false;
    this.showPage = true;
    this.hideButton = false;
    this.addUpdateButton = 'Save'
  }
  getStateById(value) {
    if(value !== '--ALL--'){
      this.docsList = this.tempDocs.filter(e => e.stateCode === value);
    }else{
      this.docsList = [...this.tempDocs]
    }
    this.handlePageChange(this.sharedService.page = 1)
  }
  async getFileDetails(e: any) {
    this.myFiles = [];
    this.myFilesName = '';
    this.uploadedMedia = [];
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
    const target = e.target as HTMLInputElement;
    this.processFiles(target.files);
  }
  processFiles(files: any) {
    for (const file of files) {
      if (file.type != 'application/pdf') {
        this.notification.showValidationMessage(
          'Please upload pdf file only!!!'
        );
        this.myFilesName = '';
        this.myFiles = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.myFilesName = file.name;
        this.uploadedMedia.push({
          FileName: file.name,
          FileSize:
            this.getFileSize(file.size) + ' ' + this.getFileSizeUnit(file.size),
          FileType: file.type,
          FileUrl: event.target.result,
          FileProgessSize: 0,
          FileProgress: 0,
          ngUnsubscribe: new Subject<any>(),
        });

        this.startProgress(file, this.uploadedMedia.length - 1);
      };
    }
  }
  async startProgress(file: any, index: number) {
    let filteredFile = this.uploadedMedia
      .filter((u: any, index: number) => index === index)
      .pop();

    if (filteredFile != null) {
      let fileSize = this.getFileSize(file.size);
      let fileSizeInWords = this.getFileSizeUnit(file.size);

      for (var f = 0; f < fileSize + fileSize * 0.0001; f += fileSize * 0.01) {
        filteredFile.FileProgessSize = f.toFixed(2) + ' ' + fileSizeInWords;
        var percentUploaded = Math.round((f / fileSize) * 100);
        filteredFile.FileProgress = percentUploaded;
        await this.fakeWaiter(Math.floor(Math.random() * 35) + 1);
      }
    }
  }

  fakeWaiter(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  getFileSize(fileSize: number): number {
    this.fileSize = fileSize;
    if (this.fileSize / 1024 / 1024 > 4) {
    }
    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSize = parseFloat((fileSize / this.fileSizeUnit).toFixed(2));
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSize = parseFloat(
          (fileSize / this.fileSizeUnit / this.fileSizeUnit).toFixed(2)
        );
      }
    }

    return fileSize;
  }

  getFileSizeUnit(fileSize: number) {
    let fileSizeInWords = 'bytes';

    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit) {
        fileSizeInWords = 'bytes';
      } else if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSizeInWords = 'KB';
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSizeInWords = 'MB';
      }
    }

    return fileSizeInWords;
  }
  removeImage(idx: number) {
    this.uploadedMedia = this.uploadedMedia.filter((u, index) => index !== idx);
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  async updateResults() {
    this.docsList = []
    this.docsList = this.searchByValue(this.tempDocs);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.stateName.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
      }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.docsList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.docsList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.docsList.length - 1);
    }

  }
  download(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: 'application/pdf' });
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
  viewPdf(stateId: any, fileName: string) {
    this.api.getUploadMou(stateId).subscribe(res => {
     if(res && res.length){
      let uint8_data = _base64ToArrayBuffer(res['0'].documentFile);
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
     }
       }, err => {
      console.error('Error fetching page status:', err);
    })
    
    // let file = new Blob([data], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }
}