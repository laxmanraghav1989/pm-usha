import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { Subject } from 'rxjs/internal/Subject';
import { GetService } from 'src/app/service/get.service';
import { PostService } from 'src/app/service/post.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MasterService } from 'src/app/service/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'cfs-upload-document-certificate',
  templateUrl: './upload-document-certificate.component.html',
  styleUrls: ['./upload-document-certificate.component.scss']
})
export class UploadDocumentCertificateComponent implements OnInit {
 @Input() idPass: any;
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
  documentFormGroup : FormGroup
  docValue: any;
  myFileArray: any
  newArray: Array<any> = [];
  documentJson2: Array<any> = [];
  documentJson3: Array<any> = [];
  userTypeList: Array<any> = [];
  documentTypeId2: any;
  id2: any;
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
  sansctionAmount:any;
  editData:any =[]
  updatedTemp:any;
  documentJson = [
    { id: '22', name: 'Mof_instructions', documentTypeName: 'Mof Instructions' },
    { id: '23', name: 'Sanction_order', documentTypeName: 'Sanction order' },
    { id: '24', name: 'PAB_Minutes', documentTypeName: 'PAB Minutes' },
    { id: '25', name: 'Review_Minutes', documentTypeName: 'Review Minutes' },
    { id: '26', name: 'NMA_Minutes', documentTypeName: 'NMA Minutes' },
    { id: '27', name: 'Important_Communications', documentTypeName: 'Important Communications' },
    { id: '28', name: 'Status_Notes', documentTypeName: 'Status Notes' },

    { id: '31', name: 'Financial_Instruction', documentTypeName: 'Financial Instruction' },
    { id: '32', name: 'Scheme_Guideline', documentTypeName: 'Scheme Guideline' },
    { id: '33', name: 'Clarification', documentTypeName: 'Clarification' },
    { id: '34', name: 'Cancellation', documentTypeName: 'Cancellation' },
    { id: '35', name: 'Other', documentTypeName: 'Other' },
  ]
  headJson:any = []
  objJson:any = []
  eventTypeName: any = '';
  stateListArr: any;
  filterStateListArr: any = [];
  paginatedData: any[] = []; // Data for the current page
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  pages: number[] = [];
  StateGroup: any = true;
  documentId:any;
  yearArr:any = []
  sortDirection: 'asc' | 'desc' = 'asc';
  sortDirection1: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';
  sortedList:any = []
  hideButton: boolean = true;
  hideView: boolean = true;
  searchText: any;
  tempList: any[];
  stateId: any;
  selectedFilters = {
  state: 'ALL',
  year: 'ALL',
  date: null,
  majorHead: 'ALL',
  objectHead: 'ALL'
  };
  // date time end
  

  constructor(public notification: NotificationService, private masterService: MasterService, private getService: GetService, private postService: PostService, private fb: FormBuilder, public sharedService: SharedService, private excelService: ExcelService) {
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
    
  
    this.documentId = this.idPass
    this.refUserType();
    this.getSateData();
    this.getFinancialYear()
    this.getMajorHead()
    this.getObjHead()
    if(this.documentId == 'Audited_Utilization'){
    this.documentForm = this.fb.group({
      id: [0],
      documentId: [0],
      state : ['', [Validators.required]],
      year : ['', Validators.required],
      fromDate  : ['', Validators.required],
      toDate  : ['', Validators.required],
     

    })
    this.getUCDocumentDetails()
  }
  else{
    this.documentForm = this.fb.group({
      id: [0],
      documentId: [0],
      state : ['', [Validators.required]],
        sanctionOrderNumber: [null, Validators.required],
       sanctionDate: [null, Validators.required],
      ifdNumber : ['', Validators.required],
      ifdDate: ['', Validators.required],
      if1CertNumber: ['', Validators.required],
      ifdCertDate : ['', Validators.required],
      financialYear : ['', Validators.required],
      remarks : [''],

    })
    this.getSanctionDocumentDetails('')
    this.documentFormGroup = this.fb.group({
      sanctionData: this.fb.array([this.createRow()])  // FormArray initialized with one row
    });
    
  }

 
 
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
 



  documentFilter(e:any){
      //this.getDocument()
    
    
  }

  
  add() {
    this.hideView = true;
    this.hideButton = false;
    this.showForm = true;
    this.documentForm.reset();
    this.documentFormGroup.reset();
    this.resetSanctionData()
    
  }
  @ViewChild('picker1')
  datepicker!: MatDatepicker<Date>
  @ViewChild('picker2')
  datepicker2!: MatDatepicker<Date>
  @ViewChild('picker3')
  datepicker3!: MatDatepicker<Date>
  @ViewChild('picker4')
  datepicker4!: MatDatepicker<Date>
  dateOpen() {
    this.datepicker.open();
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
        // this.documentUpload()
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
    let formValue = this.documentForm.getRawValue()
    if (this.documentForm.invalid) {
      this.isFormInvalid = true
      this.notification.showValidationMessage('Please field details !!!')
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
   
    if(this.documentId == "Audited_Utilization"){
        let fromDate = this.datePipe.transform(this.documentForm.controls['fromDate']?.value, 'dd/MM/yyyy');
        let toDate = this.datePipe.transform(this.documentForm.controls['toDate']?.value, 'dd/MM/yyyy');
        let temp = {
          documentId: this.documentForm.value.documentId ? this.documentForm.value.documentId : 0,
          Id: this.documentForm.value.id ? this.documentForm.value.id : 0,
          state: this.documentForm.value.state,
          year: this.documentForm.value.year,
          fromDate: fromDate,
          toDate: toDate,
          isActive : true,
          yearOld: '',
          toDateOld: '',
          fromDateOld: '',
          stateOld : '',
        }

        temp = this.compareUCDocumentData(temp);




    this.postService.saveUCDocument(temp, formdata).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccessMessage(res.message)
            this.documentForm.reset();
            this.addUpdateButton = "Save";
            this.docId = '';
            this.myFiles = [];
            this.myFilesName = '';
            this.blob = null;
            this.changeDoc = false;
            this.documentForm.reset();
            this.showForm = false;
            this.hideButton = true;
            this.getUCDocumentDetails()
            this.documentForm.get('sanctionAmount')?.disable();
          }
          }, err => {
          console.error('Error fetching page status:', err);
        })
      }
    else {
      const rows = this.documentFormGroup.get('sanctionData') as FormArray;
      let formattedRows = [];
      let editedRows = []
      let mergedObject = {};
      
     
      for (let i = 0; i < rows.length; i++) {
        const row = rows.at(i) as FormGroup;
        const formValue: any = row.getRawValue();
      
        // Validation checks for sanctionAmount
        if (
          formValue.sanctionAmount === null || 
          formValue.sanctionAmount === undefined || 
          formValue.sanctionAmount === 'undefined' ||
          formValue.sanctionAmount === ''
        ) {
          this.isFormInvalid = true;
          this.notification.showValidationMessage(`Please fill the sanction amount for at least one category in Row ${i + 1}.`);
          return;
        }
      
        // Validation checks for general, SC, ST sanction amount and sanctionAmount
        if (
          [formValue.genSanctionAmount, formValue.scSanctionAmount, formValue.stSanctionAmount, formValue.interestAdjustementAmount, formValue.cancellationAdjustementAmount].every(
            value => value === null || value === 'null' || value === ''
          ) 
          && formValue.sanctionAmount === 0
        ) {
          this.isFormInvalid = true;
          this.notification.showValidationMessage(`Please enter General, SC, or ST, Interest adjustment Amount sanction amount for Row ${i + 1}.`);
          return;
        }
          if (
          formValue.majorHead === null || 
          formValue.majorHead === undefined || 
          formValue.majorHead === 'undefined' ||
          formValue.majorHead === ''
        ) {
          this.isFormInvalid = true;
          this.notification.showValidationMessage(`Please Select Major Head for Row ${i + 1}.`);
          return;
        }

          if (
          formValue.objectHead === null || 
          formValue.objectHead === undefined || 
          formValue.objectHead === 'undefined' ||
          formValue.objectHead === ''
        ) {
          this.isFormInvalid = true;
          this.notification.showValidationMessage(`Please Select Object Head for Row ${i + 1}.`);
          return;
        }
      
        
        if (formValue.sanctionDate) {
          formValue.sanctionDate = this.datePipe.transform(formValue.sanctionDate, 'dd/MM/yyyy');
        }
      
       
        formattedRows.push(formValue);
        editedRows.push(formValue)
      }
      
    
      // let sanctionDate = this.datePipe.transform(this.documentForm.controls['sanctionDate']?.value, 'dd/MM/yyyy');
      let sanctionDate = this.datePipe.transform(this.documentForm.controls['sanctionDate']?.value, 'dd/MM/yyyy');
      let ifdDate = this.datePipe.transform(this.documentForm.controls['ifdDate']?.value, 'dd/MM/yyyy');
      let ifdCertDate = this.datePipe.transform(this.documentForm.controls['ifdCertDate']?.value, 'dd/MM/yyyy');
    
      if(this.addUpdateButton == 'Update'){
         
      let temp = {
        documentId: this.documentForm.value.documentId ? this.documentForm.value.documentId : 0,
        id: this.documentForm.value.id ? this.documentForm.value.id : 0,
        state: this.documentForm.value.state,
        sanctionOrderNumber: this.documentForm.value.sanctionOrderNumber,
        sanctionDate: sanctionDate,
        ifdNumber: this.documentForm.value.ifdNumber,
        ifdDate: ifdDate,
        if1CertNumber: this.documentForm.value.if1CertNumber,
        ifdCertDate: ifdCertDate,
        financialYear: this.documentForm.value.financialYear,
        remarks: this.documentForm.value.remarks,
        active: true,
        sanctionData: formattedRows,
        sanctionDataWithOld: formattedRows,
      };
      
      temp = this.compareSanctionDocumentData(temp);
      

      const cleanSanctionData = temp.sanctionDataWithOld.map((row: any) => {
        const cleanRow: any = {};
        for (const key in row) {
          if (!key.endsWith('Old')) {
            cleanRow[key] = row[key];
          }
        }
        return cleanRow;
      });

      temp.sanctionData = cleanSanctionData
      const jsonString = JSON.stringify(temp);
      formdata.append('sanctionData ', jsonString);

      
      this.postService.saveSanctionDocument(formdata).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccessMessage(res.message)
          this.documentForm.reset();
           this.addUpdateButton = "Save";
           this.docId = '';
           this.myFiles = [];
           this.myFilesName = '';
           this.blob = null;
           this.changeDoc = false;    
           this.documentForm.reset();
           this.documentFormGroup.reset();
           this.showForm = false;
           this.hideButton = true
           this.getSanctionDocumentDetails('')
           this.documentForm.get('sanctionAmount')?.disable();
        }
         }, err => {
        console.error('Error fetching page status:', err);
      })


    
    }
    else{  
      let temp = {
        documentId: this.documentForm.value.documentId ? this.documentForm.value.documentId : 0,
        id: this.documentForm.value.id ? this.documentForm.value.id : 0,
        state: this.documentForm.value.state,
        sanctionOrderNumber: this.documentForm.value.sanctionOrderNumber,
        sanctionDate: sanctionDate,
        ifdNumber: this.documentForm.value.ifdNumber,
        ifdDate: ifdDate,
        if1CertNumber: this.documentForm.value.if1CertNumber,
        ifdCertDate: ifdCertDate,
        financialYear: this.documentForm.value.financialYear,
        remarks: this.documentForm.value.remarks,
        active: true,
        sanctionData: formattedRows,
        sanctionDataWithOld: []
      };
      
      const jsonString = JSON.stringify(temp);
      formdata.append('sanctionData ', jsonString);
      
      this.postService.saveSanctionDocument(formdata).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccessMessage(res.message)
          this.documentForm.reset();
           this.addUpdateButton = "Save";
           this.docId = '';
           this.myFiles = [];
           this.myFilesName = '';
           this.blob = null;
           this.changeDoc = false;    
           this.documentForm.reset();
           this.documentFormGroup.reset();
           this.showForm = false;
           this.hideButton = true;
           this.getSanctionDocumentDetails('')
           this.documentForm.get('sanctionAmount')?.disable();
        }
         }, err => {
        console.error('Error fetching page status:', err);
      })

    }
       
    }
   
  }




  compareUCDocumentData(temp: any): any {
    let updatedTemp = { ...temp };
    if (this.editData.fromDateStr !== updatedTemp.fromDate) {
      updatedTemp['fromDateOld'] = this.editData.fromDateStr;
    }
    if (this.editData.year !== updatedTemp.year) {
      updatedTemp['yearOld'] = this.editData.year;
    }
    if (this.editData.toDateStr !== updatedTemp.toDate) {
      updatedTemp['toDateOld'] = this.editData.toDateStr;
    }
    if (this.editData.stateCode?.stCode !== updatedTemp.state) {
      updatedTemp['stateOld'] = this.editData.stateCode?.stCode;
    }
    return updatedTemp;
  }

  compareSanctionDocumentData(temp: any): any {
    if (this.editData.stateCode?.stCode != temp.state) {
      temp['stateOld'] = this.editData.stateCode?.stCode;
    }
    // if (this.editData.fileNumber != temp.fileNumber) {
    //   temp['fileNumberOld'] = this.editData.fileNumber;
    // }
  
    // if (this.editData.fileDateStr != temp.fileDate) {
    //   temp['fileDateOld'] = this.editData.fileDateStr;
    // }
        if (this.editData.sanctionOrderNumber != temp.sanctionOrderNumber) {
          temp['sanctionOrderNumberOld'] = this.editData.sanctionOrderNumber;
        }
      
        if (this.editData.sanctionDateStr != temp.sanctionDate) {
          temp['sanctionDateOld'] = this.editData.sanctionDateStr;
        }

    

    if (this.editData.ifdDateStr != temp.ifdDate) {
      temp['ifdDateOld'] = this.editData.ifdDateStr;
    }
    if (this.editData.ifdCertDateStr != temp.ifdCertDate) {
      temp['ifdCertDateOld'] = this.editData.ifdCertDateStr;
    }
    if (this.editData.ifdNumber != temp.ifdNumber) {
      temp['ifdNumberOld'] = this.editData.ifdNumber;
    }
    if (this.editData.if1CertNumber != temp.if1CertNumber) {
      temp['if1CertNumberOld'] = this.editData.if1CertNumber;
    }
    if (this.editData.financialYear != temp.financialYear) {
      temp['financialYearOld'] = this.editData.financialYear;
    }
    if (
      Array.isArray(this.editData.sanctionData) &&
      Array.isArray(temp.sanctionData)
    ) {
      for (let i = 0; i < this.editData.sanctionData.length; i++) {
        const original = this.editData.sanctionData[i];
        const updated = temp.sanctionData[i];
     
        if (!updated || !original) continue;
      
        let hasChanges = false;
      
        if (original.genSanctionAmount != updated.genSanctionAmount) {
          updated['genSanctionAmountOld'] = original.genSanctionAmount;
          hasChanges = true;
        }
        if (original.scSanctionAmount != updated.scSanctionAmount) {
          updated['scSanctionAmountOld'] = original.scSanctionAmount;
          hasChanges = true;
        }
        if (original.stSanctionAmount != updated.stSanctionAmount) {
          updated['stSanctionAmountOld'] = original.stSanctionAmount;
          hasChanges = true;
        }
        if (original.sanctionAmount != updated.sanctionAmount) {
          updated['sanctionAmountOld'] = original.sanctionAmount;
          hasChanges = true;
        }
        
        if (original.majorHead != updated.majorHead) {
          updated['majorHeadOld'] = original.majorHead;
          hasChanges = true;
        }
        if (original.objectHead != updated.objectHead) {
          updated['objectHeadOld'] = original.objectHead;
          hasChanges = true;
        }
      }
    }
  
    return temp;
  }



  // compareSanctionDocumentData(temp: any): any {
  //   let updatedTemp = { ...temp };
  // if (this.editData.stateCode?.stCode !== updatedTemp.state) {
  //     updatedTemp['stateOld'] = this.editData.stateCode?.stCode;
  //   }
  //   if (this.editData.fileNumber !== updatedTemp.fileNumber) {
  //     updatedTemp['fileNumberOld'] = this.editData.fileNumber;
  //   }
   
  //   if (this.editData.fileDateStr !== updatedTemp.fileDate) {
  //     updatedTemp['fileDateOld'] = this.editData.fileDateStr;
  //   }
  //   if (this.editData.ifdDateStr !== updatedTemp.ifdDate) {
  //     updatedTemp['ifdDateOld'] = this.editData.ifdDateStr;
  //   }
  //   if (this.editData.ifdCertDateStr !== updatedTemp.ifdCertDate) {
  //     updatedTemp['ifdCertDateOld'] = this.editData.ifdCertDateStr;
  //   }
   
  //   if (this.editData.ifdNumber !== updatedTemp.ifdNumber) {
  //     updatedTemp['ifdNumberOld'] = this.editData.ifdNumber;
  //   }
  //   if (this.editData.if1CertNumber !== updatedTemp.if1CertNumber) {
  //     updatedTemp['if1CertNumberOld'] = this.editData.if1CertNumber;
  //   }
    
  //   if (this.editData.financialYear !== updatedTemp.financialYear) {
  //     updatedTemp['financialYearOld'] = this.editData.financialYear;
  //   }
  //   if (this.editData.genSanctionAmount !== updatedTemp.genSanctionAmount) {
  //     updatedTemp['genSanctionAmountOld'] = this.editData.genSanctionAmount;
  //   }
  //   if (this.editData.scSanctionAmount !== updatedTemp.scSanctionAmount) {
  //     updatedTemp['scSanctionAmountOld'] = this.editData.scSanctionAmount;
  //   }
  //   if (this.editData.stSanctionAmount !== updatedTemp.stSanctionAmount) {
  //     updatedTemp['stSanctionAmountOld'] = this.editData.stSanctionAmount;
  //   }
  //   if (this.editData.sanctionAmount !== updatedTemp.sanctionAmount) {
  //     updatedTemp['sanctionAmountOld'] = this.editData.sanctionAmount;
  //   }
  //   if (this.editData.sanctionOrderNumber !== updatedTemp.sanctionOrderNumber) {
  //     updatedTemp['sanctionOrderNumberOld'] = this.editData.sanctionOrderNumber;
  //   }
  //   if (this.editData.sanctionDateStr !== updatedTemp.sanctionDate) {
  //     updatedTemp['sanctionDateOld'] = this.editData.sanctionDateStr;
  //   }
  //   if (this.editData.majorHead !== updatedTemp.majorHead) {
  //     updatedTemp['majorHeadOld'] = this.editData.majorHead;
  //   }
  //   if (this.editData.objectHead !== updatedTemp.objectHead) {
  //     updatedTemp['objectHeadOld'] = this.editData.objectHead;
  //   }
   
  //   return updatedTemp;
  // }   


  
  
  

 

  

  reset() {
    this.myFiles = [];
    this.myFilesName = '';
    this.documentForm.reset();
    this.documentFormGroup.reset();
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
  

  }



  close() {
    this.hideButton = true;
    this.addUpdateButton = 'Save'
    this.documentForm.reset();
    this.showForm = false;
    this.docId = '';
    this.myFiles = [];
    this.myFilesName = '';
    this.blob = null;
    this.changeDoc = false;
    this.documentFormGroup.reset();
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


getUCDocumentDetails(){
 this.getService.getUCDocumentDetails(null, '').subscribe(res =>{
    if(res.status === 200){
      this.documentList = res.data.filter(item => item?.isActive == true);
      this.filterArray = res.data.filter(item => item?.isActive == true)
    }


  })
}


ChangesYearSelection(year){
  if(year != 'ALL'){
    this.documentList = this.filterArray.filter(item => item.year == year)
  }
  else{
    this.documentList = this.filterArray
  }

}

onSelectionStateEvent(event: any) {
  this.selectedFilters.state = event.value;
  this.applyAllFilters();
}

ChangesFinYearSelection(year: string) {
  this.selectedFilters.year = year;
  this.applyAllFilters();
}

changeSanctionDate(selectedDate: Date) {
  this.selectedFilters.date = selectedDate ? selectedDate : null;
  this.applyAllFilters();
}

changeSelectionMajor(value: string) {
  this.selectedFilters.majorHead = value;
  this.applyAllFilters();
}

changeSelectionOject(value: string) {
  this.selectedFilters.objectHead = value;
  this.applyAllFilters();
}

applyAllFilters() {
  this.documentList = this.tempList.filter(item => {
    
    // State filter
    if (this.selectedFilters.state !== 'ALL' && item?.stateCode?.stCode !== this.selectedFilters.state) {
      return false;
    }

    // Year filter
    if (this.selectedFilters.year !== 'ALL' && item.financialYear !== this.selectedFilters.year) {
      return false;
    }

    // Date filter
    if (this.selectedFilters.date && item.sanctionDateStr !== this.selectedFilters.date) {
      const formattedDate = this.datePipe.transform(this.selectedFilters.date, 'dd/MM/yyyy');
      if (item.sanctionDateStr !== formattedDate) {
        return false;
      }
    }

    // Major Head filter
    if (this.selectedFilters.majorHead !== 'ALL' &&
        !item.sanctionData.some((d: any) => d.majorHead === this.selectedFilters.majorHead)) {
      return false;
    }

    // Object Head filter
    if (this.selectedFilters.objectHead !== 'ALL' &&
        !item.sanctionData.some((d: any) => d.objectHead === this.selectedFilters.objectHead)) {
      return false;
    }

    return true;
  });
  this.handlePageChange(this.sharedService.page = 1)
}




// ChangesFinYearSelection(year){
//   if(year != 'ALL'){
//     this.documentList = this.tempList.filter(item => item.financialYear == year)
//   }
//   else{
//     this.documentList = this.tempList
//   }
//   // this.clearSearch()

// }

// onSelectionStateEvent(event: any) {
//     const selectedValues = event.value;
//     if (selectedValues === 'ALL') {
//       this.getSanctionDocumentDetails('')
//     }
//     else {
//        this.getService.getSanctionDocumentDetailsFilter(selectedValues === 'ALL' ? 'null' : selectedValues, '').subscribe(res =>{
//      if(res.status === 200){
//        this.documentList = res.data.filter(item => item?.isActive == true)
//        this.documentList = this.documentList.sort((a, b) => a?.stateCode?.name > b?.stateCode?.name ? 1 : -1);
//        this.tempList = [...this.documentList]
//       }
//       this.handlePageChange(this.sharedService.page = 1)
//    })
//     }
//   }

getSanctionDocumentDetails(value:any){
  this.getService.getSanctionDocumentDetails(null, '').subscribe(res =>{
     if(res.status === 200){
       this.documentList = res.data.filter(item => item?.isActive == true)
       this.documentList = this.documentList.sort((a, b) => a?.stateCode?.name > b?.stateCode?.name ? 1 : -1);
       this.tempList = [...this.documentList]
      }
      this.handlePageChange(this.sharedService.page = 1)

   })
 }


view(item) {
  let temp = {
    documentId: item.documentId,
   
  }
  this.getService.viewUCDocument(temp).subscribe((res) => {
    if (res) {
      this.viewPdfInNewTab(res.data[0].documentFile, res.data[0].name)
    }
  })
}


downloadFile(item) {
  let temp = {
    documentId: item.documentId,
   
  }
  this.getService.viewUCDocument(temp).subscribe((res) => {
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

base64ToUint8Array(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

 
editDocument(item, value) {
  value === 'Edit' ? this.hideView = true : this.hideView = false
  this.hideButton = false;
  this.showForm = true;
    this.addUpdateButton = 'Update'
    this.documentForm.patchValue(item);
    if(this.documentId == "Audited_Utilization"){
    this.documentForm.get('state').setValue(item.stateCode?.stCode)
    this.documentForm.get('fromDate').setValue(item?.fromDateSelected)
    this.documentForm.get('toDate').setValue(item?.toDateSelected)
    }
    else{
      if (item.sanctionData && item.sanctionData.length > 0) {
        const formArray = this.documentFormGroup.get('sanctionData') as FormArray;
      
        // Clear existing FormArray
        while (formArray.length) {
          formArray.removeAt(0);
        }
      
        // Loop through incoming data and push form groups
        item.sanctionData.forEach((row) => {
          formArray.push(this.fb.group({

            genSanctionAmount: [row.genSanctionAmount],
            scSanctionAmount: [row.scSanctionAmount],
            stSanctionAmount: [row.stSanctionAmount],
            interestAdjustementAmount : [row.interestAdjustementAmount],
            cancellationAdjustementAmount : [row.cancellationAdjustementAmount],

            sanctionAmount: [{ value: (+row.genSanctionAmount || 0) + (+row.scSanctionAmount || 0) + (+row.stSanctionAmount || 0) + (+row.interestAdjustementAmount || 0) + (+row.cancellationAdjustementAmount || 0), disabled: true }],
            // sanctionOrderNumber: [row.sanctionOrderNumber],
            // sanctionDate: [this.convertToDate(row.sanctionDate)],
            majorHead: [row.majorHead],
            objectHead: [row.objectHead]
          }));
        });
      }
      this.documentForm.get('state').setValue(item.stateCode?.stCode)
      this.documentForm.get('sanctionDate').setValue(item.sanctionDateSelected)
      //this.documentForm.get('fileDate').setValue(item?.fileDateSelected)
      this.documentForm.get('ifdDate').setValue(item?.ifdDateSelected)
      this.documentForm.get('ifdCertDate').setValue(item?.ifdCertDateSelected)

      } 
    this.myFilesName = item.documentName
    this.documentTypeId2 = item.documentId
    this.editData = item
    let temp = {
      documentId: item.documentId,
     
    }
    this.getService.viewUCDocument(temp).subscribe((res) => {
      
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

convertToDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('/');
  return new Date(+year, +month - 1, +day);
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


deleteDoc(item) {
if(this.documentId == "Audited_Utilization"){
  this.getService.deleteUCDocument(item).subscribe((res => {
    if (res.status == 200) {
      this.getUCDocumentDetails()
      this.notification.showDelete();
    }
  }))
}
else{
  this.getService.deleteSanctionDocument(item).subscribe((res => {
    if (res.status == 200) {
      this.getSanctionDocumentDetails('')
      this.notification.showDelete();
    }
  }))
}
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



getFinancialYear(){
  this.getService.getFinancialYear().subscribe(res =>{
    if(this.documentId == 'Audited_Utilization'){
      this.yearArr = res.filter(item => item.auditedUc === true)
    }
    else{
      this.yearArr = res.filter(item => item.sanctionManagement === true)
    }
    
  
  })
}

getMajorHead(){
  this.getService.getMajorHead().subscribe(res =>{
    this.headJson = res
   
  })
}

getObjHead(){
  this.getService.getObjHead().subscribe(res =>{    
    this.objJson = res
  })
}





// createRow(): FormGroup {
//   return this.fb.group({
//     genSanctionAmount: [null],
//     scSanctionAmount: [null],
//     stSanctionAmount: [null],
//     sanctionAmount: [{ value: null, disabled: true }],
//     sanctionOrderNumber: [null],
//     sanctionDate: [null],
//     majorHead: [null],
//     objectHead: [null],
    
//   });
// }
createRow(): FormGroup {
  return this.fb.group({
    genSanctionAmount: [null, Validators.required],
    scSanctionAmount: [null, Validators.required],
    stSanctionAmount: [null, Validators.required],
    interestAdjustementAmount: [null, Validators.required],
    sanctionAmount: [{ value: null, disabled: true }],
    majorHead: [null, Validators.required],
    objectHead: [null, Validators.required],
    cancellationAdjustementAmount: [null]
  });
}

get rows() {
  return this.documentFormGroup.get('sanctionData') as FormArray;
}

addRow() {
  this.hideButton = false;
  this.rows.push(this.createRow());
}

removeRow(index: number) {
  this.rows.removeAt(index);
}



onKeyPress(i: number) {
  const rowGroup = this.rows.at(i) as FormGroup;

  let genSanctionAmount = Number(rowGroup.get('genSanctionAmount')?.value) || 0;
  let scSanctionAmount = Number(rowGroup.get('scSanctionAmount')?.value) || 0;
  let stSanctionAmount = Number(rowGroup.get('stSanctionAmount')?.value) || 0;
  let interestAdjustementAmount = Number(rowGroup.get('interestAdjustementAmount')?.value) || 0;
  let cancellationAdjustementAmount = Number(rowGroup.get('cancellationAdjustementAmount')?.value) || 0;

  let totalAmount = genSanctionAmount + scSanctionAmount + stSanctionAmount + interestAdjustementAmount + cancellationAdjustementAmount;

  rowGroup.get('sanctionAmount')?.setValue(totalAmount);
  rowGroup.get('sanctionAmount')?.disable();  // if you want to disable it
}
  
  
  sortAscending = true;
  sortBy() {
  
  
    this.documentList.sort((a, b) => {
      const nameA = a.stateCode.name.toLowerCase();
      const nameB = b.stateCode.name.toLowerCase();
      
      if (this.sortAscending) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  
    this.sortAscending = !this.sortAscending; // Toggle sort direction
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  sortAscending1 = true;
  sortBy1() {
    this.documentList.sort((a, b) => {
      const nameA = a.financialYear.toLowerCase();
      const nameB = b.financialYear.toLowerCase();
      
      if (this.sortAscending1) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  
    this.sortAscending1 = !this.sortAscending1; // Toggle sort direction
    this.sortDirection1 = this.sortDirection1 === 'asc' ? 'desc' : 'asc';
  }

  resetSanctionData() {
    const formArray = this.documentFormGroup.get('sanctionData') as FormArray;
    formArray.clear();  // Remove all existing rows
    formArray.push(this.createRow());  // Add the default first row again
  }


  getSancOrderNumber(tags: any[]): string {
  return tags?.map(tag => tag.sanctionOrderNumber).join(', ') || '';
  }

  getSancOrderDate(tags: any[]): string {
  return tags?.map(tag => tag.sanctionDate).join(', ') || '';
  }

  getSancAmount(tags: any[]): string {
  return tags?.map(tag => tag.sanctionAmount).join(', ') || '';
  }

  // getSancNumber(tags: any[]): string {
  // return tags?.map(tag => tag.sanctionAmount).join(', ') || '';
  // }

 async updateResults() {
    this.documentList = []
    this.documentList = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any[]) {
  const search = this.searchText.trim().toLowerCase();
  if (!search) return items;

  return items.filter((item: any) => {
    const fields = [
      item.financialYear,
      item?.stateCode?.name,
      item.sanctionOrderNumber,
      item.sanctionDateStr,
      item.ifdNumber,
      item.ifdDateSelected,
      item.if1CertNumber,
      item.ifdCertDateSelected,
      item.documentName,
      item.remarks
    ];

    // Add sanctionData array values
    if (Array.isArray(item.sanctionData)) {
      item.sanctionData.forEach((s: any) => {
        fields.push(
          s.majorHead,
          s.objectHead,
          s.sanctionAmount,
          s.scSanctionAmount,
          s.stSanctionAmount,
          s.genSanctionAmount,
          s.interestAdjustementAmount,
          s.cancellationAdjustementAmount
        );
      });
    }

    return fields.some(f =>
      String(f ?? '')
        .toLowerCase()
        .includes(search)
    );
  });
}


  clearSearch() {
  this.searchText = '';
  this.updateResults(); // manually trigger filter
}

trackBySanction(index: number, sanction: any) {
  return sanction.id; // product का unique id
}

exportToExcel() {
  if (this.documentList.length !== 0) {
    let custom_data: any[] = [];

    this.documentList.forEach((item, index) => {
      if (item.sanctionData && item.sanctionData.length > 0) {
        item.sanctionData.forEach((sanction, sIndex) => {
          custom_data.push({
            'S.No': `${index + 1}.${sIndex + 1}`,  
            'State': item?.stateCode?.name,
            'Financial Year': item?.financialYear,
            'Sanction Order Number': item.sanctionOrderNumber,
            'Sanction Order Date': item.sanctionDateStr,
            'IFD Number': item.ifdNumber,
            'IFD Date': item.ifdDateStr,
            'IF1 Certificate Number': item.if1CertNumber,
            'IF1 Certificate Date': item.ifdCertDateStr,
            'SC Amount':sanction.scSanctionAmount,
            'ST Amount':sanction.stSanctionAmount,
            'GEN Amount':sanction.genSanctionAmount,
            'Interest Adjustment':sanction.interestAdjustementAmount,
            'Sanction Amount': sanction.sanctionAmount,
            'Major Head': sanction.majorHead,
            'Object Head': sanction.objectHead,
            'Document Name': sIndex === 0 ? (item?.documentName || 'Pending') : '',
            'Remarks': item.remarks
          });
        });
      } else {
        custom_data.push({
          'S.No': index + 1,
          'State': item?.stateCode?.name,
          'Financial Year': item?.financialYear,
          'Sanction Order Number': item.sanctionOrderNumber,
          'Sanction Order Date': item.sanctionDateStr,
          'IFD Number': item.ifdNumber,
          'IFD Date': item.ifdDateStr,
          'IF1 Certificate Number': item.if1CertNumber,
          'IF1 Certificate Date': item.ifdCertDateStr,
          'SC Amount':'-',
          'ST Amount':'-',
          'GEN Amount':'-',
          'Interest Adjustment':'-',
          'Sanction Amount': '-',
          'Major Head': '-',
          'Object Head': '-',
          'Document Name': item?.documentName || 'Pending',
          'Remarks': item.remarks
        });
      }
    });

    this.excelService.exportToExcel(custom_data, `Sanction_List_`);
  } else {
    this.notification.showValidationMessage("No Data Found");
  }
}

resetSection(){
   this.selectedFilters = {
    state: 'ALL',
    year: 'ALL',
    date: null,
    majorHead: 'ALL',
    objectHead: 'ALL'
  };

  this.documentList = [...this.tempList];  // restore original
}

  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }


}




