import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { ExcelService } from 'src/app/service/excel.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DeleteService } from 'src/app/service/delete.service';

interface item {
  id: string;
  url: string;
  name: string;
}

@Component({
  selector: 'cfs-ifd-checklist',
  templateUrl: './ifd-checklist.component.html',
  styleUrls: ['./ifd-checklist.component.scss']
})
export class IfdChecklistComponent implements OnInit, OnDestroy, OnChanges {
  panelStates: boolean[] = [];
  private destroy$ = new Subject<void>();
  @ViewChild('acceptForm') acceptFormElement;
  clientRequestURL: string;
  src: SafeResourceUrl;
  chackData: boolean = false;
  checkCompareData: boolean = false;
  stateCode: any;
  blob: any;
  isValid: boolean = false;
  checkDocumentId: boolean = false;
  esignBlob: any
  arrauByte: any[];
  ifdChecklistName: any;
  checklistId: any;
  fileUpload: any;
  isDisable: boolean = true
  remark: any;
  deficitStateBudget: any;
  myFiles: string[] = [];
  myFilesName: any;
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0;
  myFilesSign: any = [];
  myDocumentSignName: any = '';
  documentTypeId: number = 14;
  documentName: any;
  @Input() item: any;
  @Input() passStateCode: any;
  @Input() indexId: any;
  finalSubmit: boolean = false;
  stateFundChecks: Array<any> = []
  checkId: any;
  userId: string;
  environment: any;
  tabId: number = 2
  signdocumentFile: any;
  storeData: any
  documentId: any;
  isIfdChecklistSubmit: boolean
  checkListArr: any[];
  editingRowIndex: number = -1;

  ifdChecklistForm: FormGroup;

  isFormInvalid: boolean = false;
  isIfdDocumentUploaded: boolean
  checkListData: Array<any> = [];
  userNPD: any;
  isIfdEsign: boolean = false
  checkList: Array<any> = [];
  ExcelValueData: Array<any> = [];
  myDocumentExcelName: any;
  signdocumentFileExcel: any;
  rusaProgressList: any;
  rusaProgressList1: any;
  progress: number;
  totalPhysicalProgress1: any;
  totalPhysicalProgress: any;
  arrYears: { year: number; }[];
  addUpdateButton: string = "Save";
  finicialForm: FormGroup;
  FinicialList: any;
  StateUCDetails: any;
  totalCS: number;
  unspentAmount: number;
  PercentageMMER: number;
  totalRUSA2: number;
  unspentRUSA2: number;
  totalPmushaCSSS: number;
  unspentPMUShA: number;
  totalRUSA2RUSA1PMUShA: number;
  totalReleasedSinceInsc: number;
  totalCsSsReleasedSinceInsc: number;
  totalCsSsUtiliseSinceInsc: number;
  csSsReleasedSinceInception: number;
  csSsUtilizedSinceInception: number;
  percentageUtilizationSinceInception: any;
  StateData: any;
  UpdateStateData: any;
  fy2024AnnualBudget: any;
  fy2024AnnualBudgetPercent: any;
  constructor(public common: Common, public sharedService: SharedService, public fb: FormBuilder,
    public postService: PostService, public notification: NotificationService, public getService: GetService, private sanitizer: DomSanitizer, private excelService: ExcelService, public deleteApi: DeleteService) {
    this.userNPD = sessionStorage.getItem('userTypeId');
    this.environment = environment.eSignGateway;
    this.clientRequestURL = environment.fundManagementRequestURL
    this.userId = sessionStorage.getItem('userName');

    this.arrYears = [
      { year: 2023 },
      { year: 2024 },
    ]

    // this.FinicialList = [
    //   {id: 1, finicialYear: '2023'},
    //   {id: 2, finicialYear: '2024'},

    // ]

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.passStateCode = changes.passStateCode.currentValue;
    this.indexId = changes.indexId.currentValue;
    this.item = changes.item.currentValue;
  }
  ngOnInit(): void {
    this.ifdChecklistForm = this.fb.group({
      checklistId: ['', [Validators.required]],
      ifdChecklistName: ['', [Validators.required]],
      fileUpload: ['', [Validators.required]],
      remark: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
    });
    this.stateCode = this.passStateCode;


    this.sharedService.getfundDemandDetailsData.subscribe((res) => {
      if (res) {
        this.isIfdChecklistSubmit = res.isIfdChecklistSubmit;
        this.finalSubmit = res.isFinalSubmit;
        this.isIfdEsign = res?.isIfdEsign;
        this.isIfdDocumentUploaded = res?.isIfdDocumentUploaded;
      } else {
        this.getBriefDetails();
      }
    })


    this.sharedService.getfundTabs.subscribe((res) => {
      if (this.indexId === 1 && res) {
        this.checkId = res;
      }
    })

    if (this.indexId === 1 && this.item !== "NewDemand" && this.checkId !== 0 && this.checkId !== undefined) {

      // this.getPABData()
      // this.getDocumentFile();
      
      // this.getStateData()
      this.getChecklistData();
      this.getCheckList();

    }
    this.finicialForm = this.fb.group({
      financialYear: ['', [Validators.required]],
      centralShareReleased: ['', Validators.required],
      dueStateShare: ['', [Validators.required]],
      stateShareReleased: ['', [Validators.required]],
      deficit: ['', [Validators.required]],
      id: ['']


    })

    // this.getFinicialData();
  }

  addElement() {
    this.isValid = false;
    if (this.stateFundChecks.length > 4) {

    } else {
      this.stateFundChecks.push({
        'financialYear': '',
        'centralShareReleased': '',
        'dueStateShare': '',
        'stateShareReleased': '',
        'deficit': ''
      })
    }

  }

  deleteElement(data, i) {
    this.isValid = false;
    if (data.length > 1) {
      this.stateFundChecks.splice(i, 1)
      this.deleteDoc(data)
    }


  }
  documentChange(e: any) {

  }

  save(item: any, i: any) {
    let temp = []
    for (let i = 0; i < item.length; i++) {
      if (!item[i].centralShareReleased && !item[i].deficit && !item[i].dueStateShare && !item[i].financialYear) {
        this.notification.mandatory();
        return;
      } else {
        temp.push({
          "centralShareReleased": +item[i].centralShareReleased,
          "deficit": +item[i].deficit,
          "dueStateShare": +item[i].dueStateShare,
          "financialYear": +item[i].financialYear,
          "id": item[i].id ? item[i].id : 0,
          "ifdChecklistId": 10,
          "state": {
            "fundingRatio": "",
            "lgdCode": 0,
            "name": "",
            "stCode": this.passStateCode,
            "stateShortName": ""
          },

          "stateFundRequestDetailId": this.item ? this.item : this.checkId,
          "stateShareReleased": +item[i].stateShareReleased
        })
      }
    }

    this.postService.savefinicialData(temp).subscribe(res => {
      if (res.status === 200) {
        this.finicialForm.get('id').setValue(0)
        this.notification.showSuccess()
        this.addUpdateButton = "Save";
        this.finicialForm.reset();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  editDocument(item) {

    this.addUpdateButton = 'Update'
    this.finicialForm.patchValue(item);

  }


  reset() {
    this.finicialForm.reset();
  }

  close() {
    this.close();
  }

  deleteDoc(item) {
    this.deleteApi.deleteFinicialDoc(item[0].id).subscribe(res => {
      if (res.status == 200) {
        this.getFinicialData();
        this.notification.showSuccessMessage(res.message)
      }
    })

  }

  compareBC(valueB: any, valueC: any) {
    if (valueB && valueC) {
      const b = parseInt(valueB);
      const c = parseInt(valueC);

      if (b < c) {

        this.notification.showValidationMessage('C should be less than or equal to B');
        return;
      } else {
        this.minsValueBD(valueB, valueC)
      }
    }
  }
  minsValueBD(valueB: any, valueC: any) {
    if (valueB && valueC) {
      const b = parseInt(valueB);
      const c = parseInt(valueC);
      if (b > c) {
        this.deficitStateBudget = b - c
        return b - c
      }
      if (b < c) {
        this.deficitStateBudget = ""
        this.notification.showValidationMessage(' C should be less than or equal to B');
        return this.deficitStateBudget = 'C should be less than or equal to B';
      }
    }

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  alphaNumberOnly(e) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  onPaste(e) {
    e.preventDefault();
    return false;
  }

  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  handleFileInput(files: FileList): void {
    this.fileUpload = files.item(0);
  }

  async getFileDetails(e: any, item) {
    this.myFiles = [];
    this.myFilesName = '';
    this.uploadedMedia = [];
    const fileInput = e.target as HTMLInputElement;
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
        this.myFilesName = e.target.files[i].name;
        item.documentName = e.target.files[i].name
      }
    }
    const target = e.target as HTMLInputElement;
    for (var i = 0; i < this.myFiles.length; i++) {
      item.documentFile = this.myFiles[i];

    }

  }

  async uploadSignDu(e: any, item) {
    this.myFilesSign = [];
    this.myDocumentSignName = '';
    const fileInput = e.target as HTMLInputElement;
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFilesSign.push(e.target.files[i]);
        this.myDocumentSignName += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myDocumentSignName += ',';
      }
    }

    const target = e.target as HTMLInputElement;
    for (var i = 0; i < this.myFilesSign.length; i++) {
      this.signdocumentFile = this.myFilesSign[i]
    }
    //this.saveDocument11()
  }

  async uploadExcelDoc(e: any, item) {
    this.progress = 1;
    this.myFilesSign = [];
    this.myDocumentExcelName = '';
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFilesSign.push(e.target.files[i]);
        this.myDocumentExcelName += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myDocumentExcelName += ',';
      }
    }

    const target = e.target as HTMLInputElement;
    for (var i = 0; i < this.myFilesSign.length; i++) {
      this.signdocumentFileExcel = this.myFilesSign[i]
    }
    this.saveDocumentExcel(item)
  }

  saveifdChecklist(item: any, i: any) {
    this.checkListData[i].isDisable = true
    if (i === 8) {
      if (+item.matchingStateShare < +item.provisionInStateBudget) {
        this.notification.showValidationMessage('C should be less than or equal to B')
        return;
      }
    }

    if (!this.blob && !item?.documentFile && !this.changeDoc) {
      if (i !== 7 && i !== 15 && i !== 0 && i !== 1 && i !== 2 && i !== 12 && i !== 4) {
        this.notification.showValidationMessage('Please upload document !!!')
        return;
      }

    }

    if (!this.myFilesName) {
      if (i !== 7 && i !== 15 && i !== 0 && i !== 1 && i !== 2 && i !== 12 && i !== 4) {
        this.notification.showValidationMessage('Please upload document !!!')
        return;
      }
    }
    let formdata: FormData = new FormData();
    if (i !== 7 && i !== 15 && i !== 0 && i !== 1 && i !== 2 && i !== 12 && i !== 4) {

      if (this?.blob && !this.changeDoc) {
        formdata.append('file', this.blob, this.myFilesName);
      } else {
        formdata.append('file', item?.documentFile, this.myFilesName);
      }
      let payload = {
        "Id": item.id === null ? 0 : item.id,
        "stateCode": this.stateCode,
        "ifdChecklistId": item.ifdChecklistId,
        "remarks": item?.remarks !== null ? item?.remarks : '',
        "stateFundRequestDetailId": this.item ? this.item : this.checkId
      }

      let params = new HttpParams()
      let body = new HttpParams({ fromObject: payload })
      
      this.postService.saveIfdChecklist(payload, formdata).subscribe(res => {
        if (res.status === 200) {
          this.getChecklistData()
          this.checkListData[i].id = res.data;
          this.changeDoc = false;
          this.myFilesName = '';
          this.notification.showSuccess();
        }

      })

    } else {



      let payload = {
        "Id": item.id === null ? 0 : item.id,
        "stateCode": this.stateCode,
        "ifdChecklistId": item.ifdChecklistId,
        "remarks": item?.remarks !== null ? item?.remarks : '',
        "stateFundRequestDetailId": this.item ? this.item : this.checkId
      }

      let params = new HttpParams()
      let body = new HttpParams({ fromObject: payload })
      this.postService.saveIfdChecklist(payload, formdata).subscribe(res => {
        if (res.status === 200) {
          this.getChecklistData()
          this.checkListData[i].id = res.data;
          this.changeDoc = false;
          this.myFilesName = '';
          this.notification.showSuccess();
        }

      })
    }
  }
  totalExpenditure(itemValue: any): void {
    const csReleasedLastFy = itemValue.csReleasedLastFy;
    const ssReleasedLastFy = itemValue.ssReleasedLastFy;
    const dataP: any = csReleasedLastFy == null ? '' : +csReleasedLastFy;
    const data11P: any = ssReleasedLastFy == null ? '' : +ssReleasedLastFy;
    itemValue.totalCsSsReleasedLastFy = dataP + data11P;


    const totalCsSS = dataP + data11P;
    const utilizationrel = itemValue.totalCsSsLastFy;
    itemValue.percentageUtilizationCorresponding = ((utilizationrel / totalCsSS) * 100).toFixed(2);
  }
  totalExpenditure1(itemValue: any): void {
    const csReleasedVideLastSanctionOrder = itemValue.csReleasedVideLastSanctionOrder;
    const ssReleasedVideLastSanctionOrder = itemValue.ssReleasedVideLastSanctionOrder;
    const dataP: any = csReleasedVideLastSanctionOrder == null ? '' : +csReleasedVideLastSanctionOrder;
    const data11P: any = ssReleasedVideLastSanctionOrder == null ? '' : +ssReleasedVideLastSanctionOrder;
    itemValue.totalCsSsReleasedVideLastSanctionOrder = dataP + data11P;

    const totalCsSSSanction = dataP + data11P;
    const utilizationrelSanction = itemValue.totalCsSsVideLastSanctionOrder;
    itemValue.percentageUtilizationSanctionOrder = ((utilizationrelSanction / totalCsSSSanction) * 100).toFixed(2);
  }

  getCheckList() {

    const payload = {
      "stateCode": this.passStateCode,
      "stateFundRequestDetailId": this.item && this.item !== 'NewDemand' ? this.item : this.checkId || null
    };
    this.getService.getCheckListDetails(payload)?.subscribe((res) => {
      const uniqueItems = res.filter((item, index, self) =>
        index === self.findIndex((i) => i.ifdChecklistId === item.ifdChecklistId)
      );
      this.checkListData = uniqueItems;
      this.checkListData.map(() => {
        return {

        }
      })
      this.ifdChecklistForm.patchValue(res)
      this.checkListData = this.checkListData.map(item => ({ ...item, remarks: item?.remarks !== 'null' ? item?.remarks : '', isDisable: true }));

    });

  }


  getBriefDetails() {
    let payloadDetails;
    if (this?.item && this?.item !== 'NewDemand') {
      payloadDetails = {
        stateCode: this.passStateCode,
        stateFundBriefDetailId: this.item ? this.item : this.checkId
      }
    } else {
      payloadDetails = {
        stateCode: this.passStateCode,
      }
    }

    this.getService.getBriefData(payloadDetails).subscribe(
      (res) => {
        if (res) {
          this.checkId = res['0'].id;
          this.finalSubmit = res['0'].isFinalSubmit;
          this.isIfdEsign = res['0']?.isIfdEsign;
          this.isIfdDocumentUploaded = res['0']?.isIfdDocumentUploaded;
        }
      },
      (err) => { }
    );
  }
  cancelChecklist(index: any) {
    this.checkListData[index].isDisable = true
  }

  editChecklist(item) {
    this.myFilesName = '';

    const payload = {
      "stateCode": this.stateCode,
      "checklistId": item,
      "stateFundRequestDetailId": this.item
    }
    this.getService.getCheckListDownloadPDF(payload).subscribe((res) => {
      if (res === null) return;

      else {
        //this.checkListData[index].isDisable = false
        this.arrauByte = res['0']?.documentFile;
        this.myFilesName = res['0']?.documentName;
        this.downloadPdf(res['0']?.documentFile, this.myFilesName)



      }
    })
  }

  deleteChecklist(index: number): void {
    const deletedItem = this.checkListData[index];
  }

  saveData() {
    let dataCheck = this.checkListData.filter((item) => {
      return !item.id && item.ifdChecklistId !== 8 && item.ifdChecklistId !== 13 && item.ifdChecklistId !== 5 && item.ifdChecklistId !== 6 && item.ifdChecklistId !== 10 && item.ifdChecklistId !== 15
    });
    if (dataCheck.length > 0) {
      this.notification.showValidationMessage('filled all checklist form data.');
      return;
    }
    let temp = {
      stateFundBriefDetailId: this.item,
      tabId: this.tabId
    }
    this.postService.saveIfd(temp).subscribe((res) => {
      if (res) {
        this.changeDoc = false;
        this.isIfdChecklistSubmit = true;
        this.saveDocument11()
      }
    }, (err) => { })
  }
  downloadPDFfilePro(fileName: string) {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = `assets/docs/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  saveDocument11() {
    if (this.signdocumentFile && this.myDocumentSignName || this.blob && this.documentName) {
      const formData = new FormData();
      if (this.blob && !this.changeDoc) {
        formData.append('file', this.blob, this.documentName);
      } else {

        formData.append('file', this.signdocumentFile, this.myDocumentSignName);
      }
      let temp = {
        stateFundRequestDetailId: this.item,
        stateCode: this.passStateCode,
        documentTypeId: this.documentTypeId,
        componentId: 0,
        documentId: this.documentId ? this.documentId : 0
      }
      this.postService.saveDocument(temp, formData).subscribe((res) => {
        if (res.status === 200) {
          this.isIfdDocumentUploaded = true;
          this.notification.showSuccess();

        }
      }, (err) => { })
    } else {
      this.notification.showValidationMessage('Upload Signed Document')
    }
  }

  saveDocumentExcel(itemValue: any) {
    if (this.signdocumentFileExcel && this.myDocumentExcelName || this.blob && this.documentName) {
      const formData = new FormData();
      if (this.blob && !this.changeDoc) {
        formData.append('file', this.blob, this.documentName);
      } else {

        formData.append('file', this.signdocumentFileExcel, this.myDocumentExcelName);
      }
      let temp = {
        stateFundRequestDetailId: this.item,
        ifdChecklistId: itemValue.ifdChecklistId,
        stateCode: this.passStateCode,
      }
      this.postService.saveDocumentExcel(temp, formData).subscribe((res) => {
        if (res.status === 200) {
          this.getExcelData1(itemValue)
          this.notification.showSuccess();

        }
      }, (err) => { })
    } else {
      this.notification.showValidationMessage('Upload Excel Document')
    }
  }

  getExcelData1(itemValue: any) {
    this.myFilesName = '';

    const payload = {
      "checklistId": itemValue.ifdChecklistId,
      "stateFundRequestDetailId": this.item
    }
    this.getService.getExcelData(payload).subscribe((res) => {
      if (res) {
        this.ExcelValueData = res;
      }
    }, (err) => { })
  }

  getFinicialData() {
    const payload = {
      "ifdChecklistId": 10,
      "stateFundRequestDetailId": this.item
    }
    let body = new HttpParams({ fromObject: payload })
    this.getService.getFinicialData(body).subscribe((res) => {
      if (res.length > 0) {
        this.FinicialList = res;
        for (let i = 0; i < res.length; i++) {
          this.stateFundChecks.push({
            'financialYear': res[i].financialYear,
            'centralShareReleased': res[i].centralShareReleased,
            'dueStateShare': res[i].dueStateShare,
            'stateShareReleased': res[i].stateShareReleased,
            'deficit': res[i].deficit,
            'stateCode': res[i].stateCode,
            'id': res[i].id

          })
        }


      } else {
        this.addElement();
      }


    }, (err) => { })
  }

  getStateUCDetails() {
    const payload = {
      "stateCode": this.stateCode,
      "stateFundRequestDetailId": this.item
    }
    let params = new HttpParams()
    let body = new HttpParams({ fromObject: payload })
    this.getService.getStateUcDetail(body).subscribe((res) => {
      if (res) {
        this.StateUCDetails = res[0];
        this.calculateSum(this.StateUCDetails)
      }
    }, (err) => { })
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

  calculateSum(item: any) {
    const totalReleasedRusa1 = item.totalReleasedRusa1 || 0;
    const totalReleasedRusa2 = item.totalReleasedRusa2 || 0;
    const totalReleasedPmusha = item.totalReleasedPmusha || 0;
    const centralShareUtilizationRusa1 = item.centralShareUtilizationRusa1 || 0;
    const stateShareUtilizationRusa1 = item.stateShareUtilizationRusa1 || 0;
    const centralShareUtilizationRusa2 = item.centralShareUtilizationRusa2 || 0;
    const stateShareUtilizationRusa2 = item.stateShareUtilizationRusa2 || 0;
    const centralShareUtilizationPmusha = item.centralShareUtilizationPmusha || 0;
    const stateShareUtilizationPmusha = item.stateShareUtilizationPmusha || 0;
    this.csSsReleasedSinceInception = parseFloat(totalReleasedRusa1) + parseFloat(totalReleasedRusa2) + parseFloat(totalReleasedPmusha)
    this.csSsUtilizedSinceInception = parseFloat(centralShareUtilizationRusa1) + parseFloat(stateShareUtilizationRusa1) + parseFloat(centralShareUtilizationRusa2) + parseFloat(stateShareUtilizationRusa2) + parseFloat(centralShareUtilizationPmusha) + parseFloat(stateShareUtilizationPmusha);
    this.percentageUtilizationSinceInception = (this.csSsUtilizedSinceInception / this.csSsReleasedSinceInception * 100).toFixed(2);
  }


  downloadIFDCheckListFile() {
    let payload = {
      exportType: 'PDF',
      stateCode: this.passStateCode,
      tabId: this.tabId,
      proposalId: this.item
    }
    this.getService.getFundReport(payload).subscribe((res) => {
      if (res) {
        this.downloadPdf1(res.byteData, res.name)
      }
    })
  }

  getDocumentFile(): Promise<void> {
    this.documentName = [];
    this.documentId = [];
  
    const temp = {
      stateCode: this.passStateCode,
      stateFundRequestDetailId: this.item,
      documentTypeId: this.documentTypeId,
      componentId: 0
    };
  
    return new Promise((resolve, reject) => {
      this.getService.getDocumentData(temp).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.documentName = res.data['0']?.name;
            this.documentId = res.data['0']?.id;
          }
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  
  async downloadDocument1() {
    await this.getDocumentFile();  // Wait for the document to load
  
    if (this.documentId) {
      this.documentName = [];
      const temp = {
        documentId: this.documentId
      };
  
      this.getService.getDocumentData(temp).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.documentName = res.data['0']?.name;
            this.checkDocumentId = false;
            this.downloadPdf1(res.data['0']?.documentFile, res.data['0']?.name);
          }
        },
        (err) => {
          // Handle the error
        }
      );
    }
  }
  
  download(item) {
    const payload = {
      "stateCode": this.stateCode,
      "checklistId": item,
      "stateFundRequestDetailId": this.item
    }
    this.getService.getCheckListDownloadPDF(payload).subscribe((res) => {
      if (res) {
        let fileName = res['0']?.documentName
        this.downloadPdf1(res['0']?.documentFile, fileName)

      }
    })
  }
  downloadPdf(data: any, fileName: string) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: 'application/pdf' });
    // this.saveDocument11();
    function _base64ToArrayBuffer(base64: any) {
      var binary_string = window?.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
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
  base64ToUint8Array(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  eSignData() {
    let payload = {
      exportType: 'PDF',
      stateCode: this.stateCode,
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
      stateCode: this.stateCode,
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

  getPABData() {
    const payload = {
      "stateCode": this.stateCode,
    }
    let body = new HttpParams({ fromObject: payload })
    this.getService.getifdCheckListStateData(body).subscribe(res => {
      if (res.status === 200) {
        if (res.data && res.data.length) {
          this.rusaProgressList = res.data;
          this.totalPhysicalProgress1 = this.rusaProgressList.reduce(
            (sum, item) => sum + (item.physicalProgressTotal),
            0
          );
          this.totalPhysicalProgress = this.totalPhysicalProgress1
          this.handlePageChange(this.sharedService.page = 1)
          // this.ExcelValueData = res;
        }

      }
    }, (err) => { })
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSizeCustom)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom)
    var a = Math.ceil(this.rusaProgressList.length / Number(this.sharedService.pageSizeCustom));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom), this.rusaProgressList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom), this.rusaProgressList.length - 1);
    }
  }

  exportToExcel() {


    if (this.ExcelValueData.length != 0) {
      let custom_data = this.ExcelValueData.map((item, index) => ({
        'Total No. of IAs': item.totalNoOfIas,
        'No. of IAs where zero balance have been opened': item.noOfIasZeroBalanceOpened,
        'No. of IAs which the details has been submitted to bank for opening zero balance account': item.noOfIasDetailsSubmittedBankZeroBalAccount,
        "Details of IAs where no process has been initiated": item.detailsIasNoProcessInitiated,
        'Time Period when the details will be submitted to bank': item.timePeriodDetailsSubmittedToBank

      }

      ));

      this.excelService.exportToExcel(custom_data, `IAS_Mapped`);
    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }



  public generatePdf(contentId: string, filename: string): void {
    const content = document.getElementById(contentId);

    if (!content) {
      console.error('Element not found!');
      return;
    }

    html2canvas(content).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(filename);
    });
  }
  anxreDownload() {

    if (this.rusaProgressList.length != 0) {
      let custom_data = this.rusaProgressList.map((item, index) => ({
        'S.No': index + 1,
        'Component Name': item.componentName,
        'Institution Name': item.institutionName + (item.aisheCode ? ' (' + item.aisheCode + ')' : ''),

        "RUSA Phase": item.rusaPhase,
        'PAB No.': item.pabMeetingNumber,
        'PAB Date': item.pabDate,
        'Physical Progress': item.physicalProgressTotal,
        'Status': item.projectStatusName,



      }

      ));
      const filename = this.rusaProgressList[0].componentName;
      this.excelService.exportToExcel(custom_data, filename);
    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }

  viewPicPdf() {
    const payload = {
      "stateCode": this.stateCode,
      "exportType": 'PDF'
    }
    let body = new HttpParams({ fromObject: payload })
    this.getService.getifdCertificate(body).subscribe((res) => {
      if (res) {
        this.downloadPdf1(res.byteData, res.name)
      }
    })
  }



  scrollToAnexure() {
    const element = document.getElementById('anexure');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handlePanelOpened(e) {
    if (e === 'panel0') {
      this.getPABData()
    }
    if (e === 'panel3') {
      this.getFinicialData();
    }
  }

  expand1(i: number, phase: any, event: Event) {
    // Toggle the expansion state of the clicked panel
    this.panelStates[i] = !this.panelStates[i];

    if (this.panelStates[i]) {

    } else {

    }
  }
  expand(i, id, e: Event) {
    // this.panelStates[i] = !this.panelStates[i];

    // if (this.panelStates[i]) {

    // } else {

 if (i === 0 || i === 1|| i === 2|| i === 3|| i === 4|| i === 6||i===8|| i === 9|| i === 10|| i === 11|| i === 12|| i === 13|| i === 14|| i === 16) {
      this.getChecklistData();
    }
    if (i === 5 && id.ifdChecklistId === 6) {
      this.checkCompareData = false;
      this.getExcelData1(id.ifdChecklistId);
    }
    if (i === 4) {
       this.checkCompareData = false;
      this.getStateData()
    }
    if (i === 8 && id.ifdChecklistId === 9) {
      // this.getChecklistData()
      this.checkCompareData=true
      this.editChecklist(id.ifdChecklistId)
    }
    if (i === 6 && id.ifdChecklistId === 7) {
       this.checkCompareData = false;
      this.editChecklist(id.ifdChecklistId)

    }
    if (i === 10 && id.ifdChecklistId === 11) {
       this.checkCompareData = false;
      this.editChecklist(id.ifdChecklistId)
    }
    if (i === 11 && id.ifdChecklistId === 12) {
       this.checkCompareData = false;
     // this.getChecklistData();
      this.editChecklist(id.ifdChecklistId)
    }
    if (i === 13 && id.ifdChecklistId === 14) {
       this.checkCompareData = false;
      this.editChecklist(id.ifdChecklistId)
    }
    if (i === 12 && id.ifdChecklistId === 13) { 
       this.checkCompareData = false;
     // this.getStateUCDetails();
    }
    if (i === 3) {
       this.checkCompareData = false;
      this.editChecklist(id.ifdChecklistId)
     // this.getChecklistData();
    }
    if (i === 9 && id.ifdChecklistId === 10) {
       this.checkCompareData = false;
      this.getFinicialData();
    }
    // }
  }

  downloadPdf12(data: any, fileName: string) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: 'application/pdf' });
    // this.saveDocument11();
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
  saveifdChecklistForm(data: any, i: any) {
    
    if (i === 8 && (+data.matchingStateShare < +data.provisionInStateBudget)) { 
      this.notification.showValidationMessage('C should be less than or equal to B')
      return
    }
    let temp = {
      "auditedUcCentralShareReleased": +data.auditedUcCentralShareReleased ? +data.auditedUcCentralShareReleased : 0,
      "auditedUcCentralShareUnspent": +data.auditedUcCentralShareUnspent ? +data.auditedUcCentralShareUnspent : 0,
      "auditedUcCentralShareUtilized": +data.auditedUcCentralShareUtilized ? +data.auditedUcCentralShareUtilized : 0,
      "auditedUcStateShareReleased": +data.auditedUcStateShareReleased ? +data.auditedUcStateShareReleased : 0,
      "auditedUcStateShareUnspent": +data.auditedUcStateShareUnspent ? +data.auditedUcStateShareUnspent : 0,
      "auditedUcStateShareUtilized": +data.auditedUcStateShareUtilized ? +data.auditedUcStateShareUtilized : 0,
      "auditedUcTotalReleased": +data.auditedUcTotalReleased ? +data.auditedUcTotalReleased : 0,
      "auditedUcTotalUnspent": +data.auditedUcTotalUnspent ? +data.auditedUcTotalUnspent : 0,
      "auditedUcTotalUtilized": +data.auditedUcTotalUtilized,
      "centralShareProposed": +data.centralShareProposed,
      "consolidatedUcCentralShareReleased": +data.consolidatedUcCentralShareReleased,
      "consolidatedUcCentralShareUnspent": +data.consolidatedUcCentralShareUnspent,
      "consolidatedUcCentralShareUtilized": +data.consolidatedUcCentralShareUtilized,
      "consolidatedUcStateShareReleased": +data.consolidatedUcStateShareReleased,
      "consolidatedUcStateShareUnspent": +data.consolidatedUcStateShareUnspent,
      "consolidatedUcStateShareUtilized": +data.consolidatedUcStateShareUtilized,
      "consolidatedUcTotalReleased": +data.consolidatedUcTotalReleased,
      "consolidatedUcTotalUnspent": +data.consolidatedUcTotalUnspent,
      "consolidatedUcTotalUtilized": +data.consolidatedUcTotalUtilized,
      "csReleasedLastFy": data.csReleasedLastFy,
      "csReleasedVideLastSanctionOrder": data.csReleasedVideLastSanctionOrder,
      "csSsReleasedSinceInception": this.csSsReleasedSinceInception,
      "csSsUtilizedSinceInception": this.csSsUtilizedSinceInception,
      "dayTakenStateTreasuryForTransferringCsIntoSna": +data.dayTakenStateTreasuryForTransferringCsIntoSna, // 1 step field,
      "dayTakenStateTreasuryForTransferringSsIntoSna": +data.dayTakenStateTreasuryForTransferringSsIntoSna, // 1 step field
      "deficitStateBudget": data.deficitStateBudget ? data.deficitStateBudget : this.deficitStateBudget,
      "id": data.newId ? data.newId : 0,
      "interestDepositedInCfi": data.interestDepositedInCfi, // 3 step field
      "interestEarnedSinceInception": data.interestEarnedSinceInception, // 3 step field
      "interestYetToBeDepositedInCfi": data.interestYetToBeDepositedInCfi, // 3 step field
      "isSna1AndSna6ReportOfPfms": data.isSna1AndSna6ReportOfPfms, // 2 step field
      "matchingStateShare": +data.matchingStateShare,
      "percentageUtilizationCorresponding": data.percentageUtilizationCorresponding,
      "percentageUtilizationSanctionOrder": data.percentageUtilizationSanctionOrder,
      "percentageUtilizationSinceInception": this.percentageUtilizationSinceInception,
      "provisionInStateBudget": +data.provisionInStateBudget,
      "ssReleasedLastFy": data.ssReleasedLastFy,
      "ssReleasedVideLastSanctionOrder": data.ssReleasedVideLastSanctionOrder,
      "stateCertifyAllIasAreMappedOnPfms": data.stateCertifyAllIasAreMappedOnPfms, // 4 step field
      "stateCertifyCsNotDivertedToPdAccount": true,
      "stateCertifyPaceOfExpenditureIsSatisfactory": data.stateCertifyPaceOfExpenditureIsSatisfactory,
      "stateCertifyVariousOtherCompliances": data.stateCertifyVariousOtherCompliances,
      "stateCode": this.passStateCode,
      "stateFundRequestDetailId": this.item,
      "stateShareCreditedToStateGovernmentSingleNodalAccSna": true,
      "totalCsSsLastFy": data.totalCsSsLastFy,
      "totalCsSsReleasedLastFy": data.totalCsSsReleasedLastFy,
      "totalCsSsReleasedVideLastSanctionOrder": data.totalCsSsReleasedVideLastSanctionOrder,
      "totalCsSsVideLastSanctionOrder": data.totalCsSsVideLastSanctionOrder
    }
    this.postService.saveifdCheckListData(temp).subscribe((res) => {
      if (res.status === 200) {
        if (i !== 12) {
          this.saveifdChecklist(data, i)
        }
        if (i === 12) {
          this.notification.showSuccess();
        }


      }
    })
  }

  getChecklistData() {
    const payload = {
      "stateCode": this.passStateCode,
      "stateFundRequestDetailId": this.item && this.item !== 'NewDemand' ? this.item : this.checkId || null
    };
    this.getService.getifdCheckListData(payload).subscribe((res: any) => {
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          this.checkListData.forEach(ele => {
            if (ele.stateFundRequestDetailId === res[i].stateFundRequestDetailId) {
              ele.dayTakenStateTreasuryForTransferringCsIntoSna = res[i].dayTakenStateTreasuryForTransferringCsIntoSna,
                ele.dayTakenStateTreasuryForTransferringSsIntoSna = res[i].dayTakenStateTreasuryForTransferringSsIntoSna,
                ele.isSna1AndSna6ReportOfPfms = res[i].isSna1AndSna6ReportOfPfms,
                ele.newId = res[i].id ? res[i].id : 0,
                ele.interestDepositedInCfi = res[i].interestDepositedInCfi,
                ele.interestEarnedSinceInception = res[i].interestEarnedSinceInception,
                ele.interestYetToBeDepositedInCfi = res[i].interestYetToBeDepositedInCfi,
                ele.stateCertifyAllIasAreMappedOnPfms = res[i].stateCertifyAllIasAreMappedOnPfms,
                ele.auditedUcCentralShareReleased = res[i].auditedUcCentralShareReleased,
                ele.auditedUcCentralShareUnspent = res[i].auditedUcCentralShareUnspent,
                ele.auditedUcCentralShareUtilized = res[i].auditedUcCentralShareUtilized,
                ele.auditedUcStateShareReleased = res[i].auditedUcStateShareReleased,
                ele.auditedUcStateShareUnspent = res[i].auditedUcStateShareUnspent,
                ele.auditedUcStateShareUtilized = res[i].auditedUcStateShareUtilized,
                ele.auditedUcTotalReleased = res[i].auditedUcTotalReleased,
                ele.auditedUcTotalUnspent = res[i].auditedUcTotalUnspent,
                ele.auditedUcTotalUtilized = res[i].auditedUcTotalUtilized,
                ele.centralShareProposed = res[i].centralShareProposed,
                ele.matchingStateShare = res[i].matchingStateShare,
                ele.provisionInStateBudget = res[i].provisionInStateBudget,
                ele.deficitStateBudget = res[i].deficitStateBudget,
                ele.consolidatedUcStateShareUtilized = res[i].consolidatedUcStateShareUtilized,
                ele.consolidatedUcTotalUtilized = res[i].consolidatedUcTotalUtilized,
                ele.consolidatedUcCentralShareUnspent = res[i].consolidatedUcCentralShareUnspent,
                ele.consolidatedUcStateShareUnspent = res[i].consolidatedUcStateShareUnspent,
                ele.consolidatedUcTotalUnspent = res[i].consolidatedUcTotalUnspent,
                ele.consolidatedUcCentralShareUtilized = res[i].consolidatedUcCentralShareUtilized,
                ele.consolidatedUcTotalReleased = res[i].consolidatedUcTotalReleased,
                ele.consolidatedUcStateShareReleased = res[i].consolidatedUcStateShareReleased,
                ele.consolidatedUcCentralShareReleased = res[i].consolidatedUcCentralShareReleased,
                ele.stateCertifyVariousOtherCompliances = res[i].stateCertifyVariousOtherCompliances,
                ele.csReleasedLastFy = res[i].csReleasedLastFy,
                ele.ssReleasedLastFy = res[i]?.ssReleasedLastFy,
                ele.totalCsSsReleasedLastFy = res[i]?.totalCsSsReleasedLastFy,
                ele.totalCsSsLastFy = res[i]?.totalCsSsLastFy,
                ele.percentageUtilizationCorresponding = res[i]?.percentageUtilizationCorresponding,
                ele.csReleasedVideLastSanctionOrder = res[i]?.csReleasedVideLastSanctionOrder,
                ele.ssReleasedVideLastSanctionOrder = res[i]?.ssReleasedVideLastSanctionOrder,
                ele.totalCsSsReleasedVideLastSanctionOrder = res[i]?.totalCsSsReleasedVideLastSanctionOrder,
                ele.totalCsSsVideLastSanctionOrder = res[i]?.totalCsSsVideLastSanctionOrder,
                ele.percentageUtilizationSanctionOrder = res[i]?.percentageUtilizationSanctionOrder,
                ele.stateCertifyPaceOfExpenditureIsSatisfactory = res[i]?.stateCertifyPaceOfExpenditureIsSatisfactory,
                ele.matchingStateShare = res[i]?.matchingStateShare
              
              // ele.centralShareProposed = res[i]?.centralShareProposed,
              // ele.deficitStateBudget = res[i]?.deficitStateBudget,
              //    ele.provisionInStateBudget=res[i]?.provisionInStateBudget
            } else {
              ele.dayTakenStateTreasuryForTransferringCsIntoSna = res[i].dayTakenStateTreasuryForTransferringCsIntoSna,
                ele.dayTakenStateTreasuryForTransferringSsIntoSna = res[i].dayTakenStateTreasuryForTransferringSsIntoSna,
                ele.isSna1AndSna6ReportOfPfms = res[i].isSna1AndSna6ReportOfPfms,
                ele.newId = res[i].id ? res[i].id : 0,
                ele.interestDepositedInCfi = res[i].interestDepositedInCfi,
                ele.interestEarnedSinceInception = res[i].interestEarnedSinceInception,
                ele.interestYetToBeDepositedInCfi = res[i].interestYetToBeDepositedInCfi,
                ele.stateCertifyAllIasAreMappedOnPfms = res[i].stateCertifyAllIasAreMappedOnPfms,
                ele.auditedUcCentralShareReleased = res[i].auditedUcCentralShareReleased,
                ele.auditedUcCentralShareUnspent = res[i].auditedUcCentralShareUnspent,
                ele.auditedUcCentralShareUtilized = res[i].auditedUcCentralShareUtilized,
                ele.auditedUcStateShareReleased = res[i].auditedUcStateShareReleased,
                ele.auditedUcStateShareUnspent = res[i].auditedUcStateShareUnspent,
                ele.auditedUcStateShareUtilized = res[i].auditedUcStateShareUtilized,
                ele.auditedUcTotalReleased = res[i].auditedUcTotalReleased,
                ele.auditedUcTotalUnspent = res[i].auditedUcTotalUnspent,
                ele.auditedUcTotalUtilized = res[i].auditedUcTotalUtilized,
                ele.centralShareProposed = res[i].centralShareProposed,
                ele.matchingStateShare = res[i].matchingStateShare,
                ele.provisionInStateBudget = res[i].provisionInStateBudget,
                ele.deficitStateBudget = res[i].deficitStateBudget,
                ele.consolidatedUcStateShareUtilized = res[i].consolidatedUcStateShareUtilized,
                ele.consolidatedUcTotalUtilized = res[i].consolidatedUcTotalUtilized,
                ele.consolidatedUcCentralShareUnspent = res[i].consolidatedUcCentralShareUnspent,
                ele.consolidatedUcStateShareUnspent = res[i].consolidatedUcStateShareUnspent,
                ele.consolidatedUcTotalUnspent = res[i].consolidatedUcTotalUnspent,
                ele.consolidatedUcCentralShareUtilized = res[i].consolidatedUcCentralShareUtilized,
                ele.consolidatedUcTotalReleased = res[i].consolidatedUcTotalReleased,
                ele.consolidatedUcStateShareReleased = res[i].consolidatedUcStateShareReleased,
                ele.consolidatedUcCentralShareReleased = res[i].consolidatedUcCentralShareReleased,
                ele.stateCertifyVariousOtherCompliances = res[i].stateCertifyVariousOtherCompliances,
                 ele.csReleasedLastFy = res[i].csReleasedLastFy,
                ele.ssReleasedLastFy = res[i]?.ssReleasedLastFy,
                ele.totalCsSsReleasedLastFy = res[i]?.totalCsSsReleasedLastFy,
                ele.totalCsSsLastFy = res[i]?.totalCsSsLastFy,
                ele.percentageUtilizationCorresponding = res[i]?.percentageUtilizationCorresponding,
                ele.csReleasedVideLastSanctionOrder = res[i]?.csReleasedVideLastSanctionOrder,
                ele.ssReleasedVideLastSanctionOrder = res[i]?.ssReleasedVideLastSanctionOrder,
                ele.totalCsSsReleasedVideLastSanctionOrder = res[i]?.totalCsSsReleasedVideLastSanctionOrder,
                ele.totalCsSsVideLastSanctionOrder = res[i]?.totalCsSsVideLastSanctionOrder,
                ele.percentageUtilizationSanctionOrder = res[i]?.percentageUtilizationSanctionOrder,
                ele.stateCertifyPaceOfExpenditureIsSatisfactory = res[i]?.stateCertifyPaceOfExpenditureIsSatisfactory
              //     ele.centralShareProposed = res[i]?.centralShareProposed,
              // ele.deficitStateBudget = res[i]?.deficitStateBudget,
              //    ele.provisionInStateBudget=res[i]?.provisionInStateBudget
            }
          })
        }
      }
    });
  }
}





