import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cfs-utilization-certificate',
  templateUrl: './utilization-certificate.component.html',
  styleUrls: ['./utilization-certificate.component.scss']
})
export class UtilizationCertificateComponent implements OnInit, OnChanges {
  isFormInvalid: boolean = false;
  isValid: boolean = false;
  @ViewChild('acceptForm') acceptFormElement;
  clientRequestURL: string;
  checkDocumentId: boolean = false;
  src: SafeResourceUrl;
  bankAccount: any;
  gfrForm: FormGroup;
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
  @Input() passStateCode: any;
  @Input() indexId: any;
  fundingRatio: any;
  fundingRatio1: any;
  items: string[] = [
    'Vouchers and Bank Account',
    'Vouchers',
    'Bank Account'
  ];
  stateFundChecks: Array<any> = []
  userNPD: any;
  userId: string;
  environment: string;
  esignBlob: any
  myFilesName: any;
  tabId: number = 3
  stateCode: string;
  isUcEsign: boolean = false
  isUcDocumentUploaded: boolean
  myFilesSign: any;
  fileSizeExceed: boolean;
  myDocumentSignName: any;
  signdocumentFile: any;
  documentTypeId: number = 15;
  documentName: any;
  documentId: any;
  PercentageMMER: number;
  blob: Blob;
  isUcSubmit: boolean;

  constructor(public sharedService: SharedService, public fb: FormBuilder, public postService: PostService, public common: Common,
    public notification: NotificationService, public getService: GetService, private sanitizer: DomSanitizer) {
    this.environment = environment.eSignGateway;
    this.clientRequestURL = environment.fundManagementRequestURL;
    this.userId = sessionStorage.getItem('userName');

    this.userNPD = sessionStorage.getItem('userTypeId');
  }

  values = [];
  ngOnChanges(changes: SimpleChanges): void {


    this.indexId = changes.indexId.currentValue;
    this.item = changes.item.currentValue;
    this.passStateCode = changes.passStateCode.currentValue;
    if (this.item && this.indexId === 2 && this.item) {
      this.sharedService.getfundDemandDetailsData.subscribe((res) => {
        if (res) {
          let data = res.fundingRatio;
          let ra = data.split(":")
          this.fundingRatio = ra[0];
          this.fundingRatio1 = ra[1];
          this.finalSubmit = res.isFinalSubmit;
          this.isUcSubmit = res.isUcSubmit;
          this.isUcEsign = res?.isUcEsign
          this.isUcDocumentUploaded = res?.isUcDocumentUploaded;
        } else {
          this.getBriefDetails();
        }
      })

      this.gfrDetail();
      this.getDocumentFile();

    }
  }
  ngOnInit() {
    this.stateCode = this.passStateCode;
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
      itemsV: this.fb.array([]) // Initialize an empty FormArray
    });

    this.formSubscription = this.gfrForm.valueChanges.subscribe(() => { });
    this.bankAccount = `<ol>
    <li>Vouchers and Bank Account</li>
    <li>Vouchers</li>
    <li>Bank Account</li>
    </ol>`


    this.addItem('')
    this.items.map(item => `- ${item}`).join('\n');
  }

  get itemsV() {
    return this.gfrForm.get('itemsV') as FormArray;
  }
  addItem(i) {
    const item = this.fb.group({
      name: [''],
    });

    // Add the new form group to the FormArray
    this.itemsV.push(item);
    this.itemsV.controls['name']?.setValidators([Validators.required])
    this.itemsV.controls['name']?.updateValueAndValidity();


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
  gfrDetail() {
    let payloadDetails
    if (this?.item && this?.item !== 'NewDemand') {
      payloadDetails = {
        stateCode: this.passStateCode,
        stateFundRequestDetailId: this.item

      }
    } else {
      payloadDetails = {
        stateCode: this.passStateCode,
      }
    }


    this.getService.gfrDetail(payloadDetails).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.gfrForm.patchValue(res[0]);
        if (res['0'].stateFundChecks && res['0'].stateFundChecks.length) {
          this.stateFundChecks = []
          let data = res[0].stateFundChecks['0'].split(',')
          for (let index = 0; index < data.length; index++) {
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
    const totalReleasedRusa1 = this.gfrForm.get('totalReleasedRusa1').value || 0;
    const totalReleasedRusa2 = this.gfrForm.get('totalReleasedRusa2').value || 0;
    const totalReleasedPmusha = this.gfrForm.get('totalReleasedPmusha').value || 0;
    const totalReleasedMmerOnlyCs = this.gfrForm.get('totalReleasedMmerOnlyCs').value || 0;
    this.centralShareUtilizationRusa1 = this.gfrForm.get('centralShareUtilizationRusa1').value || 0;
    const stateShareUtilizationRusa1 = this.gfrForm.get('stateShareUtilizationRusa1').value || 0;
    const centralShareUtilizationRusa2 = this.gfrForm.get('centralShareUtilizationRusa2').value || 0;
    const stateShareUtilizationRusa2 = this.gfrForm.get('stateShareUtilizationRusa2').value || 0;
    const centralShareUtilizationPmusha = this.gfrForm.get('centralShareUtilizationPmusha').value || 0;
    const stateShareUtilizationPmusha = this.gfrForm.get('stateShareUtilizationPmusha').value || 0;
    const totalUtilizedMmerCsOnly = this.gfrForm.get('totalUtilizedMmerCsOnly').value || 0;
    this.totalCS = parseFloat(this.centralShareUtilizationRusa1) + parseFloat(stateShareUtilizationRusa1);
    this.unspentAmount = parseFloat(totalReleasedRusa1) - this.totalCS;
    this.PercentageMMER = parseFloat(totalUtilizedMmerCsOnly) / parseFloat(totalReleasedMmerOnlyCs) * 100;

    this.totalRUSA2 = parseFloat(centralShareUtilizationRusa2) + parseFloat(stateShareUtilizationRusa2);
    this.unspentRUSA2 = parseFloat(totalReleasedRusa2) - this.totalRUSA2;
    this.totalPmushaCSSS = parseFloat(centralShareUtilizationPmusha) + parseFloat(stateShareUtilizationPmusha);
    this.unspentPMUShA = parseFloat(totalReleasedPmusha) - this.totalPmushaCSSS;
    this.totalRUSA2RUSA1PMUShA = parseFloat(totalReleasedRusa1) + parseFloat(totalReleasedRusa2) + parseFloat(totalReleasedPmusha);

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
    this.saveDocument1();
  }
  saveDocument1() {

    if (this.changeDoc) {
      this.saveDocument11()
    } else if (this.documentId?.length > 0) {
      this.getBytesFile()
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
      stateFundRequestDetailId: this.item,
      stateCode: this.passStateCode,
      documentTypeId: this.documentTypeId,
      componentId: 0,
      documentId: this.documentId ? this.documentId : 0
    }
    this.postService.saveDocument(temp, formData).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.isUcDocumentUploaded = true;

      }
    })


  }
  downloadGRF() {
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
  getBytesFile() {

    if (this.documentId.length > 0) {
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
    } else {
      this.notification.showValidationMessage('Upload Signed Document')
      return;
    }

  }
  downloadPdf(data: any) {
    //this.blob;
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

  downloadDocument() {
    //this.getDocumentFile();
    // if (this.documentId?.length && this.documentId?.length > 0) {
    //   this.downloadDocument1();
    // } else {
    //   this.checkDocumentId = true;
    //   this.getDocumentFile()
    // }
  }
  getDocumentFile() {
    if (this?.item && this?.item === 'NewDemand') {
      return;
    }
    this.documentName = [];
    this.documentId = [];
    let temp = {
      stateCode: this.passStateCode,
      stateFundRequestDetailId: this.item,
      documentTypeId: this.documentTypeId,
      componentId: 0
    }

    this.getService.getDocumentData(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.documentName = res.data['0']?.name;
        this.documentId = res.data['0']?.id;
        // if (this.documentId) {
        //   this.downloadDocument1();
        // }
      }
    })
  }
  downloadDocument1() {
    if (this?.item && this?.item === 'NewDemand') {
      return;
    }
    this.documentName = [];
    let temp = {
      stateCode: this.passStateCode,
      stateFundRequestDetailId: this.item,
      documentTypeId: this.documentTypeId,
      componentId: 0,
      documentId: this.documentId
    }

    this.getService.getDocumentData(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.documentName = res.data['0'].name;
        this.checkDocumentId = false
        //this.downloadPdf1(res.data['0']?.documentFile, res.data['0']?.name)
        this.pdffile(res.data['0']?.id)
      }
    }, (err) => { })

  }
  pdffile(documentId:any) { 
        this.documentName = [];
    let temp = {
      documentId: documentId
    }

    this.getService.getDocumentData(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.documentName = res.data['0'].name;
        this.checkDocumentId = false
        this.downloadPdf1(res.data['0']?.documentFile, res.data['0']?.name)
      }
    }, (err) => { })
  }
  saveUCData() {
    if (this.gfrForm.invalid) {
      this.isFormInvalid = true;
      return
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
      "stateCode": this.passStateCode,
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
      totalInterestAccruedCentralShare: this.gfrForm.controls['totalInterestAccruedCentralShare']?.value,
      totalInterestAccruedStateShare: this.gfrForm.controls['totalInterestAccruedStateShare']?.value,
      totalRemainingCenterShare: this.gfrForm.controls['totalRemainingCenterShare']?.value,
      totalRemittedCenterShare: this.gfrForm.controls['totalRemittedCenterShare']?.value,
    }

    this.postService.postUCData(temp).subscribe((res: any) => {
      if (res.status === 200) {
        this.isUcSubmit = true;
        this.saveData();
        this.gfrDetail();
      }
    })
  }

  saveData() {

    let temp = {
      stateFundBriefDetailId: this.item,
      tabId: 3
    }
    this.postService.saveIfd(temp).subscribe((res) => {
      if (res.status === 200) {
        this.changeDoc = false;
        this.notification.showSuccess();
      }
    })

  }

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
      }
    }

    this.getService.getBriefData(payloadDetails).subscribe(
      (res) => {
        if (res && res.length) {
          let data = res['0'].fundingRatio;
          let ra = data.split(":")
          this.fundingRatio = ra[0];
          this.fundingRatio1 = ra[1];
          this.finalSubmit = res['0'].isFinalSubmit;
          this.isUcEsign = res['0']?.isUcEsign;
          this.isUcSubmit = res['0'].isUcSubmit;
          this.isUcDocumentUploaded = res['0']?.isUcDocumentUploaded;
        }
      },
      (err) => { }
    );
  }
  eSignData() {
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
