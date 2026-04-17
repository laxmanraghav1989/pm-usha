import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { Subject } from 'rxjs/internal/Subject';
import { GetService } from 'src/app/service/get.service';
import { PostService } from 'src/app/service/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MasterService } from 'src/app/service/master.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
})
export class DocumentUploadComponent implements OnInit {
  showForm: boolean = false;
  isFormInvalid: boolean = false;
  datePipe: DatePipe = new DatePipe('en-GB');
  addUpdateButton: string = "Save";
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  stateName:any = 'ALL'
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: Blob;
  fileSizeExceed: any;
  subjectMatter: any
  variables: Array<any> = []
  variables1: Array<any> = []
  documentList: any;
  document: any;
  tittle: any;
  documentTypeId: any;
  docId: any;
  documentForm: FormGroup;
  docValue: any;
  myFileArray: any
  newArray: Array<any> = [];
  documentJson2: Array<any> = [];
  documentJson3: Array<any> = [];
  userTypeList: Array<any> = [];
  documentTypeId2: any;
  id2: any;
  sortDirection: 'asc' | 'desc' = 'asc';
  filterStateArr:any;
  // date time start
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = true;
  filterStateList: Array<any> = [];
  stateList: Array<any> = [];
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: 'primary';
  filterArray:any = []
  stateCode:any = "";
  minDate = moment().startOf('day').toDate(); // Example min date
  maxDate = moment().add(1, 'year').endOf('day').toDate(); // Example max date
  userTypeId: string;
  documentType: any;
  documentJson = [
    { id: '22', name: 'Financial_Instruction', documentTypeName: 'Financial Instruction' },
    // { id: '23', name: 'Sanction_order', documentTypeName: 'Sanction order' },
    { id: '24', name: 'PAB_Minutes', documentTypeName: 'PAB Minutes' },
    { id: '25', name: 'Review_Minutes', documentTypeName: 'Review Minutes' },
    { id: '26', name: 'NMA_Minutes', documentTypeName: 'NMA Minutes' },
    { id: '27', name: 'Important_Communications', documentTypeName: 'Important Communications' },
    { id: '28', name: 'Status_Notes', documentTypeName: 'Status Notes' },

    // { id: '31', name: 'Financial_Instruction', documentTypeName: 'Financial Instruction' },
    { id: '32', name: 'Scheme_Guideline', documentTypeName: 'Scheme Guideline' },
    { id: '33', name: 'Clarification', documentTypeName: 'Clarification' },
    { id: '34', name: 'Cancellation', documentTypeName: 'Cancellation' },
    { id: '35', name: 'Other', documentTypeName: 'Other' },
  ]
  eventTypeName: any = '';
  stateListArr: any;
  filterStateListArr: any = [];
  paginatedData: any[] = []; // Data for the current page
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  pages: number[] = [];
  StateGroup: any = true;
  hideButton:boolean = true;
  // date time end
  constructor(public notification: NotificationService, private masterService: MasterService, private getService: GetService, private postService: PostService, private fb: FormBuilder, public sharedService: SharedService) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.StateGroup = this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id
    if ( this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id){
      this.stateName = this.stateCode
    }
    else{
      this.stateName = ''
    }

  }

  ngOnInit(): void {
    this.getDocument();
    this.refUserType();
    this.getSateData();
    this.documentForm = this.fb.group({
        documentTypeName: ['', [Validators.required]],
        userTypeName: ['', [Validators.required]],
        title: ['', [Validators.required, Validators.maxLength(1000)]],
        subjectMatter: ['', [Validators.required, Validators.maxLength(1000)]],
        id: [0],
        dateTimeOfDocument: ['', [Validators.required]],
        state: ['', [Validators.required]]
    });

  }



  

  refUserType() {
    this.getService.getUserRole().subscribe(res => {
      this.userTypeList = res
    })
  }

  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.stateListArr = res
      this.filterStateList = this.stateList.slice();
      this.filterStateListArr = this.stateListArr.slice()
    }, () => { })
  }
 

  documentChange(e: any) {
    this.docValue = this.documentJson.filter(item => item.documentTypeName === e);
  }


  documentFilter(e:any){
      this.getDocument();
  }




  stateFilter(e:any){
    this.getDocument()
    
  }


  getDocument() {
        this.getService.getministryDocument(this.eventTypeName, this.stateName).subscribe(res => {
            this.documentList = res.data
            this.documentList.sort((a, b) => {
              if (a.documentTypeName < b.documentTypeName) return -1;
              if (a.documentTypeName > b.documentTypeName) return 1;
              return 0;
            });
            this.filterArray = [...this.documentList]
            this.handlePageChange(this.sharedService.page = 1)
        });
      }




  downloadPdf(data: any) {
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
  add() {
    this.hideButton = false;
    this.showForm = true;
    this.documentTypeId2 = ''
  }
  @ViewChild('picker1')
  datepicker!: MatDatepicker<Date>
  dateOpen() {
    this.datepicker.open();
  }
  documentUpload() {
    let temp = {
      stateCode: '',
      documentTypeId: this.docValue[0]?.name,
      componentId: 0,
      id: this.documentTypeId2 ? this.documentTypeId2 : 0

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
    this.postService.saveInstituteDocument(temp, formdata).subscribe(res => {
      this.documentTypeId = res.data;
    })
  }

  async getFileDetails(e: any) {
    this.documentForm.get('state').clearValidators();
    this.documentForm.get('state').updateValueAndValidity();
    if (this.documentForm.invalid) {
      this.notification.showValidationMessage('please field detail');
      return;
    }
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
        this.documentUpload()
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

  fakeWaiter(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  save() {
    this.documentForm.get('state').clearValidators();
    this.documentForm.get('state').updateValueAndValidity();
    if (this.documentForm.invalid) {
      this.isFormInvalid = true
      this.notification.showValidationMessage('Please field detail !!!')
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
    let formattedDateto = this.datePipe.transform(this.documentForm.controls['dateTimeOfDocument']?.value, 'dd/MM/yyyy');
    const temp = {
      "documentId": this.documentTypeId ? this.documentTypeId : this.documentTypeId2,
      "documentName": this.myFilesName,
      "documentTypeId": parseInt(this.docValue[0].id),
      "id": this.documentForm.value.id ? this.documentForm.value.id : 0,
      "subjectMatter": this.documentForm.value.subjectMatter,
      "title": this.documentForm.value.title,
      "visibilityOfDocument": this.documentForm.value.userTypeName,
      "state": this.documentForm.value.state==''?[]:this.documentForm.value.state,
      "dateTimeOfDocument": formattedDateto

    }
    this.postService.saveMinistryDocument(temp).subscribe(res => {
      if (res.status === 200) {
        this.documentForm.get('id').setValue(0)
        this.getDocument();
        this.notification.showSuccess()
        this.addUpdateButton = "Save";
        this.docId = '';
        this.myFiles = [];
        this.myFilesName = '';
        this.blob = null;
        this.changeDoc = false;
        this.documentForm.reset();
        this.showForm = false;
        this.hideButton = true;
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  editDocument(item) {
    this.hideButton = false;
    this.showForm = true;
    this.addUpdateButton = 'Update'
    this.documentForm.patchValue(item);
    this.myFilesName = item.documentName
    this.documentChange(item.documentTypeName);
    this.documentTypeId2 = item.documentId
    const selectedIds = item.visibilityOfDocumentUserType.map(item => item.id);
    // this.documentForm.patchValue({
    //   userTypeName: selectedIds
    // });
    this.documentForm.get('dateTimeOfDocument')?.setValue(
      moment(item?.dateTimeOfDocument, 'DD/MM/YYYY').toDate()
    );
    this.documentForm.get('userTypeName')?.setValue(
      selectedIds
    )
    let temp = {
      documentId: item.documentId,
      documentTypeId: item.documentTypeId,
    }
    this.getService.viewDocument(temp).subscribe((res) => {
      if (res.status === 200) {
        if (res.data.length > 0 && res.data) {
          this.myFilesName = res.data[0]?.name;
          this.myFileArray = res.data[0]?.documentFile
          this.blob = res.data[0]?.documentFile;
          this.downloadPdf2(res.data[0]?.documentFile);
        }
      }
    })


  }
  downloadPdf2(data: any) {
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


  view(item) {
    let temp = {
      documentId: item.documentId,
      documentTypeId: item.documentTypeId,
    }
    this.getService.viewDocument(temp).subscribe((res) => {
      if (res) {
        this.viewPdfInNewTab(res.data[0].documentFile, res.data[0].name)
      }
    })
  }

  downloadFile(item){
    let temp = {
      documentId: item.documentId,
      documentTypeId: item.documentTypeId,
    }
    this.getService.viewDocument(temp).subscribe((res) => {
      if (res) {
        this.downloadPdf1(res.data[0].documentFile, res.data[0].name)
      }
    })
  }

  viewPdfInNewTab(data, fileName) {
    // Convert base64 string to Uint8Array
    let uint8_data = this.base64ToUint8Array(data);
  
    // Create a Blob from the Uint8Array data
    let blob = new Blob([uint8_data], { type: 'application/pdf' });
  
    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);
  
    // Open the URL in a new tab
    window.open(url, '_blank');
  
    // Optionally, revoke the object URL after some time to free memory
    setTimeout(() => URL.revokeObjectURL(url), 5000);
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

  deleteDoc(item) {
    this.getService.deleteDocument(item).subscribe((res => {
      if (res.status == 200) {
        this.getDocument()
        this.notification.showDelete();
      }
    }))

  }

  reset() {
    this.myFiles = [];
    this.myFilesName = '';
    this.documentForm.reset();
    this.showForm = true;
   
  }

  resetFilter(){
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id){
      this.stateName = this.stateCode
    }
    else {
      this.stateName = ''
    }
    this.eventTypeName = ''
    this.getDocument()

  }



  close() {
    this.addUpdateButton = 'Save'
    this.documentForm.reset();
    this.showForm = false;
    this.hideButton = true;
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.documentList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.documentList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.documentList.length - 1);
    }
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  onSelectionChangeDoc(event:any){
  }
  // filterStateList = [...this.stateList];
  allSelected = false;
  onSelectionChange(event: any) {
    const selectedValues = event.value;
    
    this.allSelected = selectedValues.length-1 === this.stateList.length;
  }

  toggleSelectAll() {
    if (this.allSelected) {
      // Deselect all items
      this.documentForm.get('state')?.setValue([]);
      this.allSelected = false;
    } else {
      // Select all items
      const allValues = this.stateList.map(item => item.stCode);
      this.documentForm.get('state')?.setValue(allValues);
      this.allSelected = true;
    }
  }


    onKeypressEvent(event, inputLength) {
      if (event.target.value.length + 1 > inputLength) {
        event.preventDefault();
      }
    }

    


 sortAscending = true;
 
  sortBy(colName) {
  
  
    this.documentList.sort((a, b) => {
      const nameA = a[colName]?.toLowerCase();
      const nameB = b[colName]?.toLowerCase();
      
      if (this.sortAscending) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  
    this.sortAscending = !this.sortAscending; // Toggle sort direction
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }



sortBy1(colName: string) {
  this.documentList.sort((a, b) => {
    let valA = a[colName] ?? '';
    let valB = b[colName] ?? '';
    let comparison = 0;

    const isDateField = colName === 'dateTimeOfDocument';

    if (isDateField) {
      const dateA = this.parseDate(valA); // convert to real date
      const dateB = this.parseDate(valB);
      comparison = dateA.getTime() - dateB.getTime();
    } else {
      // String comparison fallback
      comparison = valA.toString().toLowerCase().localeCompare(valB.toString().toLowerCase());
    }

    return this.sortAscending ? comparison : -comparison;
  });

  this.sortAscending = !this.sortAscending;
  this.sortDirection = this.sortAscending ? 'asc' : 'desc';
}

// ✅ Add this helper method in your component
parseDate(dateStr: string): Date {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months start at 0
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr); // fallback, may return Invalid Date
}

trackByDocument(index: number, document: any) {
  return document.id; // product का unique id
}

}

