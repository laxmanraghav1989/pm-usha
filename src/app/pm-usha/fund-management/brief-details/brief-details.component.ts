import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-brief-details',
  templateUrl: './brief-details.component.html',
  styleUrls: ['./brief-details.component.scss']
})
export class BriefDetailsComponent implements OnInit, OnChanges {
  snaBankBalance: any;
  briefForm: FormGroup;
  documentId: any;
  isFormInvalid: boolean;
  myFilesSign: any;
  myDocumentSignName: any;
  documentName: any;
  fileSizeExceed: boolean = false;
  changeDoc: boolean = false;
  signdocumentFile: any
  stateFundChecks: Array<any> = []
  stateFundBriefDetailId: any;
  stateUtilizationPercentage: any = '23';
  formattedDate: string;
  @Input() item: any;
  finalSubmit: boolean = false;
  @Input() passStateCode: any;
  @Input() indexId: any;
  userNPD: any;
  checkId: any;
  getBriefDetailsId: any;
  checkFundDemandId: any;
  name: any;
  blob: Blob;
  documentFile: any = [];
  arrReportType1: any = [{ name: 'SNA 01', type: 18 }, { name: 'SNA 02', type: 19 }, { name: 'SNA 03', type: 20 },
  { name: 'SNA 04', type: 21 }, { name: 'SNA 06', type: 30 }]
  arrReportType = [{ name: 'SNA 01', type: 18 }, { name: 'SNA 02', type: 19 }, { name: 'SNA 03', type: 20 },
  { name: 'SNA 04', type: 21 }, { name: 'SNA 06', type: 30 }
  ];
  dataList = [{ id: 1, name: 'Central Share' }, { id: 2, name: 'State Share' }, { id: 3, name: 'Total Amount' }]
  constructor(public common: Common, public sharedService: SharedService, public fb: FormBuilder, public postService: PostService, public notification: NotificationService, public getService: GetService, private datepipe: DatePipe,
    public deleteService: DeleteService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getBriefDetailsId = changes.item?.currentValue;
    this.indexId = changes.indexId?.currentValue;
    this.item = changes.item?.currentValue;

  }
  ngOnInit(): void {

    this.addElement();
    this.briefForm = this.fb.group({
      amountApprovedCentralShare: [{ value: '', disabled: true }],
      amountApprovedStateShare: [{ value: '', disabled: true }],
      amountApprovedTotal: [{ value: '', disabled: true }],
      amountReleasedCentralShare: [{ value: '', disabled: true }],
      amountReleasedStateShare: [{ value: '', disabled: true }],
      amountReleasedTotal: [{ value: '', disabled: true }],
      amountUtilisedCentralShare: [{ value: '', disabled: true }],
      amountUtilisedStateShare: [{ value: '', disabled: true }],
      amountUtilisedTotal: [{ value: '', disabled: true }],
      centralShareUtilizedPercentAge: [{ value: '', disabled: true }],
      stateShareUtilizedPercentAge: [{ value: '', disabled: true }],
      totalUtilizedPercentAge: [{ value: '', disabled: true }],
      dateOnWhichSnaBalanceReportTakenString: [{ value: '', disabled: true }],
      fundingRatio: [{ value: '', disabled: true }],
      id: [''],
      pmushaCentralShareDemand: [{ value: '', disabled: true }],
      rusa1CentralShareDemand: [{ value: '', disabled: true }],
      rusa2CentralShareDemand: [{ value: '', disabled: true }],
      shortfallInStateShareUnderScheme: [{ value: '', disabled: true }],
      stateCode: [{ value: '', disabled: true }],
      stateName: [{ value: '', disabled: true }],
      stateShareDueUnderScheme: [{ value: '', disabled: true }],
      totalInterestOnDelayTransferFundsToSna: ['', [Validators.required]],
      whetherLegacyDataOfSnaFilledInPfms: ['', [Validators.required]],
      isInterestAccruedSinceStartSchemeTillLastDepositCfi: ['', [Validators.required]],
      dateOnWhichSnaBalanceReportTaken: ['', [Validators.required]],
      //   snaBankBalance: ['', []],
      balancecentralShareLiabilityRusa1and2: [''],
      centralShareApprovedPmusha: [''],
      centralShareRecommendedReleaseCorresToReleaseRusa1and2: [''],
      centralShareRecommendedReleasePmusha: [''],
      dateFinalSubmission: [''],
      dateFinalSubmissionString: [],
      isEsign: [],
      isFinalSubmit: [],
      isIfdChecklistSubmit: [],
      isProposalSubmit: [],
      isStateFundDemandSubmit: [],
      isUcSubmit: [''],
      isIfdEsign: [''],
      isUcEsign: [''],
      numberPmushaInstitution: [''],
      numberRusa1Institution: [''],
      numberRusa2Institution: [''],
      overallRemarksOnProposalByState: [''],
      snaCentralShare: ['', [Validators.required]],
      snaInterestPartOfCenterShare: ['', [Validators.required]],
      snaStateShare: ['', [Validators.required]],
      snaInterestPartOfStateShare: ['', [Validators.required]],
      snaOtherAmounts: ['', [Validators.required]],
      reportTypeName: [''],



    });

    this.sharedService.getfundTabs.subscribe((res) => {
      this.checkFundDemandId = res;

    })
    if (this.indexId === 0 && this.getBriefDetailsId !== "NewDemand" && this.checkFundDemandId !== 0) {
      this.getBriefDetails()
    } else {

      this.getBriefDetails()
    }
  }
  back() {
    history.back();
  }
  private formatDate(date) {
    if (date) {

      const dateParts = date?.split(' ')[0];
      let split_dateAsString1 = dateParts?.split('/')
      let final_format1 = new Date(`${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`);
      return final_format1;
    }
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  getBriefDetails() {

    let payloadDetails;
    if (this?.item && this?.item !== 'NewDemand') {
      payloadDetails = {
        stateCode: this.passStateCode ? this.passStateCode : this.passStateCode,
        stateFundBriefDetailId: this?.item
      }
      this.getService.getBriefData(payloadDetails).subscribe(
        (res) => {
          if (res && res.length > 0) {
            this.sharedService.setfundDemandDetailsData(res['0']);
            this.finalSubmit = res['0'].isFinalSubmit;
            this.sharedService.setFundSubmit(res['0']?.isStateFundDemandSubmit)
            this.sharedService.setFundtabs(res['0']?.id)
            this.briefForm.patchValue(res[0]);
            this.briefForm.get('fundingRatio').setValue(res[0]?.fundingRatio);
            this.briefForm.get('dateOnWhichSnaBalanceReportTaken').setValue(this.formatDate(res[0]?.dateOnWhichSnaBalanceReportTakenString));
            if (res['0'].snaReportTypes?.length > 0) {
              this.documentFile.push(...res['0'].snaReportTypes);
              this.compareArrays(this.arrReportType, this.documentFile);
            } else {
              this.arrReportType1 = this.arrReportType
            }

          }
        },
        (err) => { }
      );
    } else {
      payloadDetails = {
        stateCode: this.passStateCode,
      }
      this.getService.getBriefData(payloadDetails).subscribe(
        (res) => {
          if (res && res.length > 0) {
            this.finalSubmit = false;
            this.sharedService.setFundtabs(0);
            this.sharedService.setFundSubmit(false);
            this.briefForm.patchValue({
              'id': 0,
              'stateName': res['0'].stateName,
              'fundingRatio': res['0'].fundingRatio,
              'amountApprovedCentralShare': res['0'].amountApprovedCentralShare,

              'amountReleasedCentralShare': res['0'].amountReleasedCentralShare,
              'amountUtilisedCentralShare': res['0'].amountUtilisedCentralShare,
              'centralShareUtilizedPercentAge': res['0'].centralShareUtilizedPercentAge,
              'amountApprovedStateShare': res['0'].amountApprovedStateShare,
              'stateShareDueUnderScheme': res['0'].stateShareDueUnderScheme,
              'amountReleasedStateShare': res['0'].amountReleasedStateShare,
              'amountUtilisedStateShare': res['0'].amountUtilisedStateShare,
              'stateShareUtilizedPercentAge': res['0'].stateShareUtilizedPercentAge,
              'shortfallInStateShareUnderScheme': res['0'].shortfallInStateShareUnderScheme,
              'amountApprovedTotal': res['0'].amountApprovedTotal,
              'amountReleasedTotal': res['0'].amountReleasedTotal,
              'amountUtilisedTotal': res['0'].amountUtilisedTotal,
              'totalUtilizedPercentAge': res['0'].totalUtilizedPercentAge
            });
          }
        },
        (err) => { }
      );
    }
  }
  compareInterest(e: any, data: any, da) {
    const checkData = e.target.value > parseInt(data);
    if (checkData) {
      this.briefForm.controls[da].reset();
      //this.notification.showValidationMessage(msg)
    } else { 
       this.briefForm.controls[da].reset();
    }
  }
  compareSNA(e: any, data: any, da: any, msg) {
    const checkData = e.target.value > parseInt(data);
    if (checkData) {
      this.briefForm.controls[da].reset();
      this.notification.showValidationMessage(msg)
    }

  }
  compareArrays = (a, b) => {
    this.arrReportType1 = [];

    if (!Array.isArray(a) || !Array.isArray(b) || (a.length <= 0 && b.length <= 0)) return false;

    for (let i = 0; i < a.length; i++) {
      let isDifferent = true;
      for (let j = 0; j < b.length; j++) {
        if (a[i]?.type === b[j]?.type) {
          isDifferent = false;
          break;
        }
      }
      if (isDifferent) {
        this.arrReportType1.push({
          type: a[i]?.type,
          name: a[i]?.name,
        });
      }
    }

    // Now check elements in b that are not in a
    for (let j = 0; j < b.length; j++) {
      let isDifferent = true;
      for (let i = 0; i < a.length; i++) {
        if (b[j]?.type === a[i]?.type) {
          isDifferent = false;
          break;
        }
      }
      if (isDifferent) {
        this.arrReportType1.push({
          type: b[j]?.type,
          name: b[j]?.name,
        });
      }
    }

    return this.arrReportType1.length > 0;
  };


  getTotalShare(): number {

    const centralShare = parseFloat(this.briefForm.controls['snaCentralShare'].value) || 0;
    const snaInterestPartOfCenterShare = parseFloat(this.briefForm.controls['snaInterestPartOfCenterShare'].value) || 0;
    const stateShare = parseFloat(this.briefForm.controls['snaStateShare'].value) || 0;
    const snaInterestPartOfStateShare = parseFloat(this.briefForm.controls['snaInterestPartOfStateShare'].value) || 0;
    const OtherAmounts = parseFloat(this.briefForm.controls['snaOtherAmounts'].value) || 0;

    const s = centralShare + stateShare + OtherAmounts + snaInterestPartOfStateShare + snaInterestPartOfCenterShare;
    this.snaBankBalance = s;
    return s;
  }
  snaDelete(data: any): void {
    let userId = {
      id: data.documentId,
      stateFundRequestDetailId: this.item
    }
    this.common.delete().subscribe((res) => {
      if (res) {
        this.deleteService.deleteSNA(userId).subscribe((res) => {
          if (res.status === 200) {
            this.briefForm.controls['reportTypeName'].reset();
            this.documentFile = this.documentFile.filter((e) => e.documentId !== data.documentId)
            this.compareArrays(this.arrReportType, this.documentFile);
            this.notification.showSuccessMessage(res.message)

          }
        }, error => {

        })
      }
    })
  }
  SaveBrief() {
    let temp1 = [];
    this.documentFile.forEach(element => {
      if (element.documentId && element.documentName && element.type) {
        temp1.push({
          documentId: element.documentId,
          documentName: element.documentName,
          type: element.type
        })
      }

    });

    if (this.briefForm.invalid) {
      this.isFormInvalid = true;
      this.notification.mandatory();
      return;
    }
    if (temp1.length < 0 || temp1.length < 5) {
      this.notification.showValidationMessage('Please Upload all of the required SNA documents!')
      return;
    }
    if (this.briefForm.valid) {
      this.isFormInvalid = false

      let dataq = this.briefForm.value?.dateOnWhichSnaBalanceReportTaken; // Assuming this is your input date
      const inputDate = new Date(dataq); // Creating a Date object from the input date
      const adjustedDate = new Date(inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000)); // Adjusting for timezone
      let dat = adjustedDate.toISOString().split("T"); // Converting adjusted date to ISO string and splitting
      let df = dat[0].split("-"); // Splitting date part
      let sd = `${df[2]}/${df[1]}/${df[0]}`; // Reformatting to desired format

      this.formattedDate = this.datepipe.transform(adjustedDate, 'dd/MM/yyyy');
      let temp = {
        "amountApprovedCentralShare": this.briefForm.controls['amountApprovedCentralShare']?.value,
        "amountApprovedStateShare": this.briefForm.controls['amountApprovedStateShare']?.value,
        "amountApprovedTotal": this.briefForm.controls['amountApprovedTotal']?.value,
        "amountReleasedCentralShare": this.briefForm.controls['amountReleasedCentralShare']?.value,
        "amountReleasedStateShare": this.briefForm.controls['amountReleasedStateShare']?.value,
        "amountReleasedTotal": this.briefForm.controls['amountReleasedTotal']?.value,
        "amountUtilisedCentralShare": this.briefForm.controls['amountUtilisedCentralShare']?.value,
        "amountUtilisedStateShare": this.briefForm.controls['amountUtilisedStateShare']?.value,
        "amountUtilisedTotal": this.briefForm.controls['amountUtilisedTotal']?.value,
        "centralShareUtilizedPercentAge": this.briefForm.controls['centralShareUtilizedPercentAge']?.value,
        "dateOnWhichSnaBalanceReportTakenString": sd,
        "fundingRatio": this.briefForm.controls['fundingRatio']?.value ? this.briefForm.controls['fundingRatio']?.value : '',
        "id": this.briefForm.controls['id']?.value !== 0 ? this.briefForm.controls['id']?.value : 0,
        "isInterestAccruedSinceStartSchemeTillLastDepositCfi": this.briefForm.controls['isInterestAccruedSinceStartSchemeTillLastDepositCfi'].value,
        "pmushaCentralShareDemand": this.briefForm.value.pmushaCentralShareDemand,
        "rusa1CentralShareDemand": this.briefForm.value.rusa1CentralShareDemand,
        "rusa2CentralShareDemand": this.briefForm.value.rusa2CentralShareDemand,
        "shortfallInStateShareUnderScheme": this.briefForm.controls['shortfallInStateShareUnderScheme'].value,
        // "snaBankBalance": String(this.snaBankBalance),
        "stateCode": this.passStateCode,
        "stateName": this.briefForm.controls['stateName']?.value,
        "stateShareDueUnderScheme": this.briefForm.controls['stateShareDueUnderScheme']?.value,
        "totalInterestOnDelayTransferFundsToSna": String(this.briefForm.controls['totalInterestOnDelayTransferFundsToSna']?.value),
        "whetherLegacyDataOfSnaFilledInPfms": this.briefForm.controls['whetherLegacyDataOfSnaFilledInPfms']?.value,
        "isEsign": this.briefForm.controls['isEsign']?.value,
        "isFinalSubmit": this.briefForm.controls['isFinalSubmit']?.value,
        "isIfdChecklistSubmit": this.briefForm.controls['isIfdChecklistSubmit']?.value,
        "isProposalSubmit": this.briefForm.controls['isProposalSubmit']?.value,
        "isStateFundDemandSubmit": this.briefForm.controls['isStateFundDemandSubmit']?.value,
        "isUcSubmit": this.briefForm.controls['isUcSubmit']?.value,
        "numberPmushaInstitution": this.briefForm.controls['numberPmushaInstitution']?.value,
        "numberRusa1Institution": this.briefForm.controls['numberRusa1Institution']?.value,
        "numberRusa2Institution": this.briefForm.controls['numberRusa2Institution']?.value,
        "overallRemarksOnProposalByState": this.briefForm.controls['overallRemarksOnProposalByState']?.value,
        "isIfdEsign": this.briefForm.controls['isIfdEsign']?.value,
        "isUcEsign": this.briefForm.controls['isUcEsign']?.value,
        "stateShareUtilizedPercentAge": this.briefForm.controls['stateShareUtilizedPercentAge']?.value,
        "totalUtilizedPercentAge": this.briefForm.controls['totalUtilizedPercentAge']?.value,

        "snaCentralShare": this.briefForm.controls['snaCentralShare']?.value,
        "snaInterestPartOfCenterShare": this.briefForm.controls['snaInterestPartOfCenterShare']?.value,
        "snaInterestPartOfStateShare": this.briefForm.controls['snaInterestPartOfStateShare']?.value,
        "snaOtherAmounts": this.briefForm.controls['snaOtherAmounts']?.value,
        "snaStateShare": this.briefForm.controls['snaStateShare']?.value,
        "snaReportTypes": temp1.length > 0 ? [...temp1] : null


      }
      this.postService.saveBriefDetails(temp).subscribe(res => {
        if (res.status === 200) {
          this.sharedService.setFundtabs(res.data.id)
          this.briefForm.controls['id']?.setValue(res.data.id);
          this.sharedService.setfundDemandDetailsData(res.data);
          this.sharedService.setFundSubmit(res?.data?.isStateFundDemandSubmit)
          this.notification.showSuccess();
        }
      }, err => {

      })
    }
  }

  uploadSignDu(e: any, item: any) {
    this.myFilesSign = [];
    this.myDocumentSignName = '';

    const files = e.target.files;
    const fileInput = e.target as HTMLInputElement;

    if (files.length === 0) {
      this.notification.showValidationMessage('No file selected.');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.');
        return;
      } else {
        this.fileSizeExceed = false;
        this.myFilesSign.push(file);
        this.myDocumentSignName += file.name;

        if (i < files.length - 1) {
          this.myDocumentSignName += ', ';
        }
      }
    }


    if (this.myFilesSign.length > 0) {
      this.signdocumentFile = this.myFilesSign[this.myFilesSign.length - 1];
    }

    this.saveDocument().finally(() => {
      fileInput.value = '';
    });
  }
  saveDocument() {
    const formData = new FormData();

    if (this.blob && !this.changeDoc) {
      formData.append('file', this.blob, this.documentName);
    } else if (this.signdocumentFile && this.myDocumentSignName) {
      formData.append('file', this.signdocumentFile, this.myDocumentSignName);
    } else {
      this.notification.showValidationMessage('Upload Document');
      return Promise.reject();
    }

    if (this.documentFile.length > 0) {
      const reportType = this.briefForm.controls['reportTypeName'].value;
      const typeMismatch = this.documentFile.some(el => el.type === reportType);

      if (typeMismatch) {
        this.briefForm.controls['reportTypeName'].setValue('');
        this.signdocumentFile = [];
        this.myDocumentSignName = '';
        this.notification.showValidationMessage('Please select a different report type');
        return Promise.reject();
      }
    }

    const temp = {
      stateFundRequestDetailId: this.item !== "NewDemand" ? this.item : null,
      stateCode: this.passStateCode,
      documentTypeId: this.briefForm.controls['reportTypeName'].value,
      componentId: 0,
      documentId: 0,
      myDocumentSignName: this.myDocumentSignName
    };

    return this.postService.saveDocument(temp, formData).toPromise().then(res => {
      if (res.status === 200) {
        this.signdocumentFile = [];
        this.myDocumentSignName = '';

        temp.documentId = res.data;
        this.documentFile.push({
          type: temp.documentTypeId,
          documentName: temp.myDocumentSignName,
          documentId: temp.documentId
        });

        this.arrReportType1 = this.arrReportType1?.filter(item => item?.type !== this.briefForm.controls['reportTypeName']?.value);
        this.notification.showSuccess();
      }
    }).catch(error => {
      this.notification.showValidationMessage('An error occurred while saving the document.');
    });
  }


  // async uploadSignDu1(e: any, item) {
  //   this.myFilesSign = [];
  //   this.myDocumentSignName = '';

  //   this.documentName = [];
  //   for (var i = 0; i < e.target.files.length; i++) {
  //     if (e.target.files[i].size > 26214400) {
  //       this.fileSizeExceed = true;
  //       this.notification.showValidationMessage('File size should be less than 25MB.')
  //       return;
  //     }
  //     else {
  //       this.changeDoc = true;
  //       this.fileSizeExceed = false;
  //       this.myFilesSign.push(e.target.files[i]);
  //       this.myDocumentSignName += e.target.files[i].name;
  //     }

  //     if (!(e.target.files.length - 1 === i)) {
  //       this.myDocumentSignName += ',';
  //     }

  //   }

  //   const target = e.target as HTMLInputElement;
  //   for (var i = 0; i < this.myFilesSign.length; i++) {
  //     this.signdocumentFile = this.myFilesSign[i]
  //   }
  //   this.saveDocument();
  // }
  checkData: boolean = false;

  // saveDocument() {

  //   const formData = new FormData();
  //   if (this.blob && !this.changeDoc) {

  //     formData.append('file', this.blob, this.documentName);
  //   } else if (this.signdocumentFile && this.myDocumentSignName) {

  //     formData.append('file', this.signdocumentFile, this.myDocumentSignName);
  //   } else {
  //     this.notification.showValidationMessage('Upload Document')
  //     return;
  //   }
  //   if (this.documentFile.length > 0) {
  //     this.documentFile.forEach((el, i) => {
  //       if (el.type === this.briefForm.controls['reportTypeName'].value) {
  //         this.checkData = true;
  //       }

  //     })


  //     if (this.checkData) {
  //       this.briefForm.controls['reportTypeName'].setValue('');
  //       this.signdocumentFile = [];
  //       this.myDocumentSignName = ''
  //       formData.append('file', '');
  //       this.notification.showValidationMessage('please select diferent type report type')
  //       return;
  //     }
  //   }

  //   let temp = {
  //     stateFundRequestDetailId: this.item !== "NewDemand" ? this.item : null,
  //     stateCode: this.passStateCode,
  //     documentTypeId: this.briefForm.controls['reportTypeName'].value,
  //     componentId: 0,
  //     documentId: 0,
  //     myDocumentSignName: this.myDocumentSignName
  //   }

  // return  this.postService.saveDocument(temp, formData).subscribe((res) => {
  //     if (res.status === 200) {
  //       this.signdocumentFile = null;
  //       this.myDocumentSignName = '';
  //       this.myDocumentSignName = null
  //       temp.documentId = res.data;
  //       this.documentFile?.push({
  //         type: temp.documentTypeId,
  //         documentName: temp.myDocumentSignName,
  //         documentId: temp.documentId
  //       })
  //       this.arrReportType1 = this.arrReportType1?.filter((item) => { return item?.type !== this.briefForm?.controls['reportTypeName']?.value })
  //       this.notification.showSuccess();
  //     }
  //   })

  // }
  addElement() {

    // if (this.stateFundChecks.length > 3) {

    // } else {
    //   this.stateFundChecks.push({
    //     name: this.briefForm?.controls['reportTypeName']?.value
    //   })
    // }

  }
  deleteElement(i) {
    this.stateFundChecks.splice(i, 1)
  }
}
