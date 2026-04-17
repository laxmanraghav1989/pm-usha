import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cfs-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.scss']
})
export class UtilizationComponent implements OnInit, OnChanges {
  isFormInvalid: boolean = false;
  isValid: boolean = false;
  showUC: boolean = false;
  stateCodeNPD: any;
  stateList: any;
  filterStateList: any = [];
  stateName: any;
  @ViewChild('acceptForm') acceptFormElement;
  clientRequestURL: string;
  checkDocumentId: boolean = false;
  src: SafeResourceUrl;
  bankAccount: any;
  gfrForm: FormGroup;
  formdata: FormGroup;
  changeDoc: boolean = false;
  totalGrand: any;
  sum: number = 0;
  totalRusa1: number = 0;
  totalRusa2: number = 0;
  totalPmusha: number = 0;
  grandTotal: number = 0;
  formSubscription: Subscription;
  centralShareUtilizationRusa1: any;
  unspentAmount: any;
  totalCS: any
  totalRUSA2: any;
  unspentRUSA2: any;
  totalPmushaCSSS: any;
  totalRUSA2RUSA1PMUShA: any;
  unspentPMUShA: any
  totalutilized: any;
  finalSubmit: boolean = false
  totalunspent: any;
  @Input() item: any;
  @Input() stateCodePass: any;
  @Input() idPass: any;
  fundingRatio: any;
  fundingRatio1: any;
  items: string[] = [
    'Vouchers and Bank Account',
    'Vouchers',
    'Bank Account'
  ];
  userNPD: any;
  userId: string;
  environment: string;
  esignBlob: any
  myFilesName: any;
  tabId: number = 11
  stateCode: string;
  isUcEsign: boolean = false
  dataList: any = [];
  myFilesSign: any;
  fileSizeExceed: boolean;
  myDocumentSignName: any;
  signdocumentFile: any;
  documentTypeId: number = 15;
  documentName: any;
  documentId: number;
  PercentageMMER: number;
  blob: Blob;
  isUcSubmit: boolean = false;
  quarter: number;
  getDataList: any = [];
  isFinalSubmit: boolean = false;
  isUCDocumentUploaded: boolean = false;
  financialyear: any;

  quarters = [
    { value: 1, name: 'First Quarter' },
    { value: 2, name: 'Second Quarter' },
    { value: 3, name: 'Third Quarter' },
    { value: 4, name: 'Fourth Quarter' }
  ];
  quartersList: { value: number; name: string; }[];
  constructor(private masterService: MasterService, public sharedService: SharedService, public fb: FormBuilder, public postService: PostService, public common: Common,
    public notification: NotificationService, public getService: GetService, private sanitizer: DomSanitizer) {
    this.environment = environment.eSignGateway;
    this.clientRequestURL = environment.fundManagementRequestURL;
    this.userId = sessionStorage.getItem('userName');
    this.stateCode = sessionStorage.getItem('stateCode')
    this.userNPD = sessionStorage.getItem('userTypeId');

  }

  values = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.stateCodePass = changes.stateCodePass.currentValue
      this.idPass = changes.idPass.currentValue;

    }
  }

  ngOnInit() {
    this.quartersList = this.quarters;
    this.sharedService.getUcFinancial.subscribe((res) => {
      if (res) {
        this.getDataList = res
        this.isFinalSubmit = res.isFinalSubmit;
        this.isUCDocumentUploaded = res.isUCDocumentUploaded;
        if (res && this.idPass) {
          const data = res.find((item1) => { return item1.id === this.idPass })
          this.financialyear = data.financialYear === '2024-25' ? '2024' : '2023';
          this.quarter = data.quarter;
          this.stateCodeNPD = data.stateCode;
          let temp = {
            stateCode: data.stateCode,
            financialyear: data.financialYear === '2024-25' ? '2024' : '2023',
            quarter: data.quarter,
            isFinancialYear: true
          }
          this.showUC = true;
          this.gfrDetail(temp);

        } else {
          //this.gfrDetail1()
        }

      } else {

      }

    })

    if (this.userNPD === this.sharedService.userTypeList['0'].id || this.userNPD === this.sharedService.userTypeList['6'].id || this.userNPD === this.sharedService.userTypeList['7'].id || this.userNPD === this.sharedService.userTypeList['8'].id || this.userNPD === this.sharedService.userTypeList['9'].id || this.userNPD === this.sharedService.userTypeList['10'].id) {
      this.getSateData();
    }


    // this.stateCode = this.passStateCode;
    this.gfrForm = this.fb.group({
      totalReleasedRusa1: [{ value: '', disabled: true }],
      totalReleasedRusa2: [{ value: '', disabled: true }],
      totalReleasedPmusha: [{ value: '', disabled: true }],
      totalReleasedMmerOnlyCs: [{ value: '', disabled: true }],
      totalReleasedAll: [{ value: '', disabled: true }],
      totalReleasedPreparatoryGrantsRusa1: [{ value: '', disabled: true }],
      totalReleasedPreparatoryGrantsRusa2: [{ value: '', disabled: true }],
      centralShareUtilizationRusa1: [{ value: '', disabled: true }],
      stateShareUtilizationRusa1: [{ value: '', disabled: true }],
      rusa1Total: [{ value: '', disabled: true }],
      centralShareUtilizationRusa2: [{ value: '', disabled: true }],
      stateShareUtilizationRusa2: [{ value: '', disabled: true }],
      rusa2Total: [{ value: '', disabled: true }],
      centralShareUtilizationPmusha: [{ value: '', disabled: true }],
      stateShareUtilizationPmusha: [{ value: '', disabled: true }],
      pmushaTotal: [{ value: '', disabled: true }],
      totalUtilizedMmerCsOnly: [{ value: '', disabled: true }],
      totalGrant: [{ value: '', disabled: true }],
      // remarks: ['', [Validators.required]],
      stateCode: [{ value: '', disabled: true }],
      fundingRatio: [''],
      id: 0,
      totalInterestAccruedCentralShare: ['', [Validators.required]],
      totalInterestAccruedStateShare: ['', [Validators.required]],
      totalRemainingCenterShare: ['', [Validators.required]],
      totalRemittedCenterShare: ['', [Validators.required]],
    });
    this.formdata = this.fb.group({
      financialYear: ['', [Validators.required]],
      quarter: ['', [Validators.required]],
    })

    this.formSubscription = this.gfrForm.valueChanges.subscribe(() => { });
    this.bankAccount = `<ol>
    <li>Vouchers and Bank Account</li>
    <li>Vouchers</li>
    <li>Bank Account</li>
    </ol>`
    this.items.map(item => `- ${item}`).join('\n');
    if (this.idPass) {
      this.getFileName();
    }

  }
  checkData() {
    this.dataList = [];
    const payloadDetails = {
      stateCode: this.userNPD !== this.sharedService.userTypeList['7'].id && this.userNPD !== this.sharedService.userTypeList['8'].id && this.userNPD !== this.sharedService.userTypeList['9'].id && this.userNPD !== this.sharedService.userTypeList['10'].id && this.userNPD !== this.sharedService.userTypeList['6'].id && this.userNPD !== this.sharedService.userTypeList['0'].id ? this.stateCode : false,
      isFinancialYear: true,
      onlyFinalSubmit: this.userNPD === this.sharedService.userTypeList['7'].id || this.userNPD === this.sharedService.userTypeList['8'].id || this.userNPD === this.sharedService.userTypeList['9'].id || this.userNPD === this.sharedService.userTypeList['10'].id || this.userNPD === this.sharedService.userTypeList['6'].id || this.userNPD === this.sharedService.userTypeList['0'].id ? true : false,
    }
    this.getService.gfrDetail(payloadDetails).subscribe((res: any) => {
      if (res && res.length > 0) {
        res.forEach((el) => {
          if (el.id) {
            this.dataList.push({
              submittedOnDate: el.submittedOnDate,
              stateName: el.stateName,
              financialYear: el.financialYear === 2023 ? '2023-24' : '2024-25',
              quarter: el.quarter,
              id: el.id,
              stateCode: el.stateCode,
              isFinalSubmit: el.isFinalSubmit,
              isUCDocumentUploaded: el.isUCDocumentUploaded
            });
          }
        })
        this.sharedService.setUcFinancial(this.dataList)
      }
    },
      (err) => { }
    );
  }
  gfrDetail1() {
    const payloadDetails = {
      stateCode: this.userNPD !== this.sharedService.userTypeList['7'].id && this.userNPD !== this.sharedService.userTypeList['8'].id && this.userNPD !== this.sharedService.userTypeList['9'].id && this.userNPD !== this.sharedService.userTypeList['10'].id && this.userNPD !== this.sharedService.userTypeList['6'].id && this.userNPD !== this.sharedService.userTypeList['0'].id ? this.stateCode : false,
      isFinancialYear: true
    }
    this.getService.gfrDetail(payloadDetails).subscribe((res: any) => {
      if (res && res.length > 0) {
        res.forEach((el) => {
          if (el.id) {
            this.dataList.push({
              submittedOnDate: el.submittedOnDate,
              stateName: el.stateName,
              financialYear: el.financialYear ? '2024-25' : el.financialYear,
              quarter: el.quarter,
              id: el.id,
              stateCode: el.stateCode,
              isFinalSubmit: el.isFinalSubmit
            });
          }
        })
        this.sharedService.setUcFinancial(this.dataList)
      }
    },
      (err) => { }
    );
  }
  AddUC() {
    this.checkData();
    const year = this.formdata.controls['financialYear'].value === 2023 ? '2023-24' : '2024-25';
    const qu = this.formdata.controls['quarter'].value
    const data1 = this.getDataList.find((item) => { return item.quarter === qu && item.financialYear === year });

    if (!this.stateName && !this.idPass && data1?.quarter) {
      this.showUC = false;
      this.notification.showValidationMessage('Utilization Certificate for this Quarter has been added already. Please check it.');
      return;
    }
    if (this.formdata.invalid) {
      this.notification.showValidationMessage('Please select Financial Year and Quarter!');
      return;
    }
    let temp = {
      stateCode: this.stateName ? this.stateName : this.stateCode,
      financialyear: this.formdata.controls['financialYear'].value,
      quarter: this.formdata.controls['quarter'].value,
      isFinancialYear: true
    }
    this.gfrDetail(temp);
    this.showUC = true;
  }
  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
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

  onPaste(e) {
    e.preventDefault();
    return false;
  }

  generateList(): string {
    return this.items.map(item => `${item}`).join('\n');
  }
  gfrDetail(data: any) {


    this.getService.UCDetail(data).subscribe((res: any) => {
      if (res && res?.length > 0) {

        this.gfrForm.patchValue(res[0]);
        this.isFinalSubmit = res['0']?.isFinalSubmit;
        this.isUCDocumentUploaded = res['0']?.isUCDocumentUploaded;
        if (!this.isFinalSubmit && !this.isUCDocumentUploaded) {
          this.isUcSubmit = true;
        }
        if (res['0'].stateFundChecks && res['0']?.stateFundChecks.length) {
          this.stateFundChecks = []
          let data = res[0].stateFundChecks['0']?.split(',')
          for (let index = 0; index < data?.length; index++) {
            this.stateFundChecks.push({ 'name': data[index] })
          }
        } else {
          this.stateFundChecks = []
          this.addElement()
        }

        this.calculateSum();

      }
    },
      (err) => { }
    );
  }
  calculateSum() {
    // Get the values of the form controls and calculate the sum
    const totalReleasedRusa1 = this.gfrForm.get('totalReleasedRusa1')?.value || 0;
    const totalReleasedRusa2 = this.gfrForm.get('totalReleasedRusa2')?.value || 0;
    const totalReleasedPmusha = this.gfrForm.get('totalReleasedPmusha')?.value || 0;
    const totalReleasedMmerOnlyCs = this.gfrForm.get('totalReleasedMmerOnlyCs')?.value || 0;
    this.centralShareUtilizationRusa1 = this.gfrForm.get('centralShareUtilizationRusa1')?.value || 0;
    const stateShareUtilizationRusa1 = this.gfrForm.get('stateShareUtilizationRusa1')?.value || 0;
    const centralShareUtilizationRusa2 = this.gfrForm.get('centralShareUtilizationRusa2')?.value || 0;
    const stateShareUtilizationRusa2 = this.gfrForm.get('stateShareUtilizationRusa2')?.value || 0;
    const centralShareUtilizationPmusha = this.gfrForm.get('centralShareUtilizationPmusha')?.value || 0;
    const stateShareUtilizationPmusha = this.gfrForm.get('stateShareUtilizationPmusha')?.value || 0;
    const totalUtilizedMmerCsOnly = this.gfrForm.get('totalUtilizedMmerCsOnly')?.value || 0;
    this.totalCS = parseInt(this.centralShareUtilizationRusa1) + parseInt(stateShareUtilizationRusa1);
    this.unspentAmount = parseInt(totalReleasedRusa1) - this.totalCS;
    this.PercentageMMER = parseFloat(totalUtilizedMmerCsOnly) / parseFloat(totalReleasedMmerOnlyCs) * 100;

    this.totalRUSA2 = parseInt(centralShareUtilizationRusa2) + parseInt(stateShareUtilizationRusa2);
    this.unspentRUSA2 = parseInt(totalReleasedRusa2) - this.totalRUSA2;
    this.totalPmushaCSSS = parseInt(centralShareUtilizationPmusha) + parseInt(stateShareUtilizationPmusha);
    this.unspentPMUShA = parseInt(totalReleasedPmusha) - this.totalPmushaCSSS;
    this.totalRUSA2RUSA1PMUShA = parseInt(totalReleasedRusa1) + parseInt(totalReleasedRusa2) + parseInt(totalReleasedPmusha);

    this.totalutilized = this.totalCS + this.totalRUSA2 + this.totalPmushaCSSS;

    this.totalunspent = this.totalRUSA2RUSA1PMUShA - this.totalutilized
    this.sum = eval(`${totalReleasedRusa1} + ${totalReleasedRusa2} + ${totalReleasedPmusha} +${totalReleasedMmerOnlyCs}`);
    this.gfrForm.get('totalReleasedAll').setValue(this.sum);

    this.totalRusa1 = eval(`${this.centralShareUtilizationRusa1} + ${stateShareUtilizationRusa1}`);
    this.gfrForm.get('rusa1Total').setValue(this.totalRusa1);

    this.totalRusa2 = eval(`${centralShareUtilizationRusa2} + ${stateShareUtilizationRusa2}`);
    this.gfrForm.get('rusa2Total').setValue(this.totalRusa2);

    this.totalPmusha = eval(`${centralShareUtilizationPmusha} + ${stateShareUtilizationPmusha}`);
    this.gfrForm.get('pmushaTotal').setValue(this.totalPmusha);

    this.grandTotal = eval(`${this.totalRusa1} + ${this.totalRusa2} + ${this.totalPmusha} +${totalUtilizedMmerCsOnly}`);
    this.gfrForm.get('totalGrant').setValue(this.grandTotal);
  }

  async uploadSignDu(e: any, item) {
    this.myFilesSign = [];
    this.myDocumentSignName = '';
    this.blob;
    this.documentName = [];
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
      // this.documentName= e.target.files[i].name;
      if (!(e.target.files.length - 1 === i)) {
        this.myDocumentSignName += ',';
      }

    }

    const target = e.target as HTMLInputElement;
    for (var i = 0; i < this.myFilesSign.length; i++) {
      this.signdocumentFile = this.myFilesSign[i]
    }
  }

  saveDocument() {

    if (this.changeDoc) {
      this.saveDocument11()
    } else if (this.documentId) {
      this.getBytesFile1()
    } else {
      this.notification.showValidationMessage('Upload Signed Document');
    }

  }
  saveDocument11() {

    const formData = new FormData();
    if (this.blob && !this.changeDoc) {

      formData.append('file', this.blob, this.documentName);
    } else if (this.signdocumentFile && this.myDocumentSignName) {

      formData.append('file', this.signdocumentFile, this.myDocumentSignName);
    } else {
      this.notification.showValidationMessage('Upload Signed Document')
      return;
    }

    let temp = {
      stateCode: this.stateCode,
      documentTypeId: this.documentTypeId,
      componentId: 0,
      financialYear: this.financialyear ? this.financialyear : this.formdata.controls['financialYear'].value,
      quarter: this.quarter ? this.quarter : this.formdata.controls['quarter'].value,
    }
    this.postService.saveDocumentUC(temp, formData).subscribe((res) => {
      if (res.status === 200) {
        this.getFileName()
        this.saveFinalDocument();
      }
    })


  }
  saveFinalDocument() {
    let temp = {
      status: true,
      financialYear: this.financialyear ? this.financialyear : this.formdata.controls['financialYear'].value,
      quarter: this.quarter ? this.quarter : this.formdata.controls['quarter'].value,
      stateCode: this.stateCode
    }
    this.postService.saveFinalDocumentUC(temp).subscribe((res) => {
      if (res.status === 200) {
        this.isFinalSubmit = true;
        this.isUCDocumentUploaded = true
        this.notification.showSuccess();
      }
    }, (err) => { })
  }


  getFileName() {
    this.documentName = [];
    let temp = {
      stateCode: this.stateCodeNPD ? this.stateCodeNPD : this.stateCode,
      documentTypeId: 15,
      componentId: 0,
      financialYear: this.financialyear ? this.financialyear : this.formdata.controls['financialYear'].value,
      quarter: this.quarter ? this.quarter : this.formdata.controls['quarter'].value,
    }
    this.getService.getDocumentFileName(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.documentName = res.data['0']?.name;
        this.documentId = res.data['0']?.id;

      }
    }, (err) => { })
  }

  getBytesFile() {
    this.documentName = [];
    let temp = {
      documentId: this.documentId
    }

    this.getService.getDocumentData(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.documentName = res.data['0'].name;
        if (res.data['0']?.documentFile) {
          this.downloadPdf1(res.data['0']?.documentFile, res.data['0'].name)
        }

      }
    }, (err) => { })
  }
  getBytesFile1() {
    this.documentName = [];
    let temp = {
      documentId: this.documentId
    }

    this.getService.getDocumentData(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.documentName = res.data['0'].name;
        if (res.data['0']?.documentFile) {
          this.downloadPdf(res.data['0']?.documentFile)
        }

      }
    }, (err) => { })
  }
  downloadPdf(data: any) {
    if (this.changeDoc) {
      this.saveDocument11();
    } else {
      let uint8_data = _base64ToArrayBuffer(data);
      var ba = new Uint8Array(uint8_data);
      this.blob = new Blob([ba], { type: 'application/pdf' });
      this.saveDocument11();
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
  }
  financiaQuarter(e: any) {
    this.showUC = false;
    this.isUCDocumentUploaded = false;
    this.myDocumentSignName = '';
    this.documentName = ''
    this.quartersList = [];
    if (e.value === 2023) {
      this.quartersList = [{ value: 4, name: 'Fourth Quarter' }];
    } else {
      this.quartersList = this.quarters;
    }
  }

  getDocumentFile() {

    this.documentName = [];
    this.documentId = null;
    let temp = {
      stateCode: this.stateCode,
      tabId: 11,
      exportType: 'PDF',
      financialYear: this.financialyear ? this.financialyear : this.formdata.controls['financialYear'].value,
      quarter: this.quarter ? this.quarter : this.formdata.controls['quarter'].value,
    }
    this.getService.getFundReport(temp).subscribe((res: any) => {
      if (res) {
        this.downloadPdf1(res?.byteData, res?.name)
      }
    })
  }

  saveUCData() {
    if (this.gfrForm.invalid) {
      this.isFormInvalid = true;
      return;
    }
    let array = []
    for (const key in this.stateFundChecks) {
      if (this.stateFundChecks[key].name !== '') {
        if (Object.prototype.hasOwnProperty.call(this.stateFundChecks, key)) {
          const element = this.stateFundChecks[key];
          array.push(element.name)
        }
      } else if (this.stateFundChecks[key].name === '' && this.stateFundChecks.length > 1) {
        this.isValid = true;
        this.notification.showValidationMessage(`Please fill in 'Kinds of checks exercised'`);
        return;
      }
    }
    this.isValid = false;
    // if (array.length ===0) {
    //   this.notification.showValidationMessage('Enter your account details')
    //   return;
    // }
    let temp = {
      "centralShareUtilizationPmusha": this.gfrForm.controls['centralShareUtilizationPmusha']?.value ? this.gfrForm.controls['centralShareUtilizationPmusha']?.value : 0,
      "centralShareUtilizationRusa1": this.gfrForm.controls['centralShareUtilizationRusa1']?.value ? this.gfrForm.controls['centralShareUtilizationRusa1']?.value : 0,
      "centralShareUtilizationRusa2": this.gfrForm.controls['centralShareUtilizationRusa2']?.value ? this.gfrForm.controls['centralShareUtilizationRusa2']?.value : 0,
      "fundingRatio": this.gfrForm.controls['fundingRatio']?.value,
      "id": this.gfrForm.controls['id']?.value ? this.gfrForm.controls['id']?.value : 0,
      "phase": this.gfrForm.controls['phase']?.value,
      "stateCode": this.stateCode,
      "stateFundChecks": array.length !== 0 ? [array.join(', ')] : [],

      "stateFundRequestDetailId": this.item,
      "stateName": this.gfrForm.controls['stateName']?.value,
      "stateShareUtilizationPmusha": this.gfrForm.controls['stateShareUtilizationPmusha']?.value ? this.gfrForm.controls['stateShareUtilizationPmusha']?.value : 0,
      "stateShareUtilizationRusa1": this.gfrForm.controls['stateShareUtilizationRusa1']?.value ? this.gfrForm.controls['stateShareUtilizationRusa1']?.value : 0,
      "stateShareUtilizationRusa2": this.gfrForm.controls['stateShareUtilizationRusa2']?.value ? this.gfrForm.controls['stateShareUtilizationRusa2']?.value : 0,
      "totalReleasedMmerOnlyCs": this.gfrForm.controls['totalReleasedMmerOnlyCs']?.value ? this.gfrForm.controls['totalReleasedMmerOnlyCs']?.value : 0,
      "totalReleasedPmusha": this.gfrForm.controls['totalReleasedPmusha']?.value ? this.gfrForm.controls['totalReleasedPmusha']?.value : 0,
      "totalReleasedPreparatoryGrantsRusa1": this.gfrForm.controls['totalReleasedPreparatoryGrantsRusa1']?.value ? this.gfrForm.controls['totalReleasedPreparatoryGrantsRusa1']?.value : 0,
      "totalReleasedPreparatoryGrantsRusa2": this.gfrForm.controls['totalReleasedPreparatoryGrantsRusa2']?.value ? this.gfrForm.controls['totalReleasedPreparatoryGrantsRusa2']?.value : 0,
      "totalReleasedRusa1": this.gfrForm.controls['totalReleasedRusa1']?.value ? this.gfrForm.controls['totalReleasedRusa1']?.value : 0,
      "totalReleasedRusa2": this.gfrForm.controls['totalReleasedRusa2']?.value ? this.gfrForm.controls['totalReleasedRusa2']?.value : 0,
      "totalUtilizedMmerCsOnly": this.gfrForm.controls['totalUtilizedMmerCsOnly']?.value ? this.gfrForm.controls['totalUtilizedMmerCsOnly']?.value : 0,
      "financialYear": this.financialyear ? this.financialyear : this.formdata.controls['financialYear'].value,
      "quarter": this.quarter ? this.quarter : this.formdata.controls['quarter'].value,
      totalInterestAccruedCentralShare: this.gfrForm.controls['totalInterestAccruedCentralShare']?.value,
      totalInterestAccruedStateShare: this.gfrForm.controls['totalInterestAccruedStateShare']?.value,
      totalRemainingCenterShare: this.gfrForm.controls['totalRemainingCenterShare']?.value,
      totalRemittedCenterShare: this.gfrForm.controls['totalRemittedCenterShare']?.value,
    }
    this.postService.postUCData(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.gfrForm.get('id').setValue(res.data?.id)
        this.isUcSubmit = true;
        this.checkData();
        this.notification.showSuccess();
      }
    })
  }


  stateFundChecks: Array<any> = []
  addElement() {
    this.isValid = false;
    if (this.stateFundChecks.length > 4) {

    } else {
      this.stateFundChecks.push({
        name: ''
      })
    }

  }
  deleteElement(i) {
    this.isValid = false;
    this.stateFundChecks.splice(i, 1)
  }
  ngOnDestroy() {
    this.formSubscription.unsubscribe();
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
  downloadDocument1() {
    let temp = {
      exportType: 'PDF',
      stateCode: this.stateCode,
      tabId: this.tabId,
      financialYear: this.financialyear,
      quarter: this.quarter,
    }
    this.getService.getFundReport(temp).subscribe((res) => {
      if (res) {
        this.downloadPdf1(res.byteData, res.name);
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
}

