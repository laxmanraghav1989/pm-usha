import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';

@Component({
  selector: 'cfs-giei-outcomes',
  templateUrl: './giei-outcomes.component.html',
  styleUrls: ['./giei-outcomes.component.scss']
})
export class GieiOutcomesComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  dataOutComeList: Array<any> = [];
 // aisheCode: string;
  outComeDataList: Array<any> = [];
  instituteCategory: any;
  outComeDataList1: Array<any> = [];
  disabledPage: boolean = false
  insType: string;
  otherSource: Array<any> = [];
  districtCode: string;
  stateCode: string;
  selectedIndex: any = 0;
  otherInfo: FormGroup
  undertakingNoDuplicationExpenditure: boolean = false
  isFormInvalid: boolean = false;
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  withExistringLinkage: boolean = false
  withScopeForLinkage: boolean = false
  withoutLinkage: boolean = false
  documentOfDpr: any;
  otherSourceOfFunds: boolean = false
  paramId: number;
  aisheCode: string;
  FinalLockKey: any;
  isInfraDisabled: boolean;
  isRenvoDisabled: boolean;
  isSoftDisabled: boolean;
  istimelineDisabled: boolean;
  isProposedDisabled: boolean;
  isEquoDisabled: boolean;
  isFinicialEstimateDisabled: boolean;
  isWorkDisabled: boolean;
  isremedialDisabled: boolean;
  isVocationalDisabled: boolean;
  isOtherActivityDisabled: boolean;
  isOtherDisabled:boolean = false;
  isOtherDisabledRevised:boolean = false;
  myFileArray: any;
  dprCheckVisible: any;
  isVisibleUndertaking: any;
  dprUploadIsVisible: any;
  dprChecked: any;
  dprValue: any;
  defaultValue:any;
  myFilesNameDPR: any='';
  myFilesDPR: string[] = [];
  changeDocDPR: boolean;
  newDprfileId: any;
  myFileArrayDPR:any;
  newRevisedDprfileId:any;

  newRevisedDprStatus:any;
  newRevisedDprId:any
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    public notification: NotificationService,
    public common: Common,
    public errorMatcher: CustomErrorStateMatcher,
    public sharedService: SharedService,
    public getService: GetService, public postService: PostService,public deleteService:DeleteService,
    private route: ActivatedRoute, private router: Router

  ) {
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.districtCode = sessionStorage.getItem('districtCode')
    this.stateCode = sessionStorage.getItem('stateCode')
    this.instituteCategory = this.sharedService.genderComponentId;

    this.otherInfo = this.fb.group({
      tenatativeDateCompletionOfProject: ['', [Validators.required]],
      preCollebe: [0, [Validators.required]],
      provideDetails: [null, []]
    })
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getOutComeIndicator();
    this.getPageStatusList()
    if (this.paramId){
      this.saveLockStatus();
      }
  }

  reset(): void {
    this.isFormInvalid = false;
  }
  getColebe(value) {
    if (value === 'With existing Linkages' || value === 'With scope for linkage') {
      this.otherInfo.get('provideDetails')?.setValidators(Validators.required);
      this.otherInfo.get('provideDetails')?.updateValueAndValidity();
    } else {
      this.otherInfo.get('provideDetails')?.setValue('');
      this.otherInfo.get('provideDetails')?.clearValidators();
      this.otherInfo.get('provideDetails')?.updateValueAndValidity();
    }
  }
  tabSelected(event) {
    this.selectedIndex = event.index;

    if (this.selectedIndex === 0) {
      this.getOutComeIndicator();
    } if (this.selectedIndex === 1) {
      //this.getOtherSource();
      this.getBooleanData()
    } if (this.selectedIndex === 2) {
      this.getOtherInfo();
    }
  }
  getBooleanData() {
    this.getService.getBooleanList('', this.sharedService.genderComponentId, this.districtCode).subscribe(res => {
      this.otherSourceOfFunds = res['0'].isOtherSourceOfFund
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveOtherSourceBoolean() {
    if(this.otherSourceOfFunds === undefined || this.otherSourceOfFunds === null){
      this.notification.showValidationMessage('Please choose Other source of funds');
      return;
    }
    let payload = {
     // "aisheCode": "",
      "componentId": this.sharedService.genderComponentId,
      "districtCode": this.districtCode,
      "isOtherSourceOfFund": this.otherSourceOfFunds,
      menu:this.common.genderEquityOtherSourceFunds
    }
    this.postService.saveBoolean(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getBooleanData()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  checkOther(event) {
    for (let index = 0; index < this.otherSource.length; index++) {
      if (this.otherSource[index].id !== 0) {
        this.notification.showValidationMessage('Please Delete all row.')
        event.preventDefault();
      }

    }
  }
  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.genderComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if(this.paramId !== this.sharedService.revPrposal){
            if (res.data[index].moduleName === this.common.genderEquityFinal) {
              this.disabledPage = true
            }
          }
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }


  getOutComeIndicator() {
    this.getService.getProposedCome().subscribe(
      (res) => {
        this.dataOutComeList = []
        res.forEach((e: any) => {
          if (e.targetType === 'float') {
            e.targetType = 'number'
          } if (e.baseYearType === 'float') {
            e.baseYearType = 'number'
          }
          if (e.isEquityIndicator) {
            this.dataOutComeList.push({
              indicatorName: e.indicatorName,
              id: e.id,
              baseYear: 0,
              outId: 0,
              isProjectCompletedTarget31032024: '',
              isProjectCompletedTarget31032025: '',
              isProjectCompletedTarget31032026: '',
              targetLength: e.targetLength,
              targetRegex: e.targetRegex,
              targetType: e.targetType,
              baseYearLength: e.baseYearLength,
              baseYearRegex: e.baseYearRegex,
              baseYearType: e.baseYearType,
              indicatorInfo: e.indicatorInfo,
              disabled:1,
              saveButton:false,
              justification:e.justification,
            });
          }
        });
        this.getOutComeData();
      },
      (error) => { }
    );

  }
  saveOutCome() {

    let temp = [];
    for (let index = 0; index < this.dataOutComeList.length; index++) {
      // if (this.dataOutComeList[index].baseYear) {
      //   if ((this.dataOutComeList[index].baseYear.toString().length) !== 4) {
      //     this.notification.showValidationMessage(`Please enter base year in 'YYYY' format !!!`);
      //     return;
      //   } else {
      //     if(this.dataOutComeList[index].isProjectCompletedTarget31032024 ===''||this.dataOutComeList[index].isProjectCompletedTarget31032025 ===''|| this.dataOutComeList[index].isProjectCompletedTarget31032026 ==='' || Number(this.dataOutComeList[index].baseYear==='')){
      //       this.notification.showWarning()
      //       this.isFormInvalid = true
      //       return;


      //   }else{
      //     this.isFormInvalid = true
      temp.push({
        // aisheCode: this.aisheCode,
        baseYear: Number(this.dataOutComeList[index].baseYear),
        districtCode: this.districtCode,
        id: this.dataOutComeList[index].outId,
        //  instituteCategory: this.insType,
        componentId: this.sharedService.genderComponentId,
        isProjectCompletedTarget31032024:
          this.dataOutComeList[index].isProjectCompletedTarget31032024,
        isProjectCompletedTarget31032025:
          this.dataOutComeList[index].isProjectCompletedTarget31032025,
        isProjectCompletedTarget31032026:
          this.dataOutComeList[index].isProjectCompletedTarget31032026,
        outcomeIndicatorId: this.dataOutComeList[index].id,
        stateCode: this.stateCode,
      })
    }
    //   }
    // } else {
    //   this.notification.showValidationMessage(`Please enter base year in 'YYYY' format !!!`);
    //   return;
    // }
    // }

    this.api.postOutCome(temp, this.common.genderEquityOutComes).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.getOutComeData();
        }
      },
      (error) => { }
    );
  }
  getOutComeData() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getOutComeGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe((res) => {
        this.outComeDataList = res.data
        this.dataOutComeList.forEach(element => {
          this.outComeDataList.forEach(e=>{
            if (e.outcomeIndicatorId === element.id) {
              element.id = e.outcomeIndicatorId
              element.outId = e.id
              element.baseYear = e.baseYear
              element.isProjectCompletedTarget31032024 = e.isProjectCompletedTarget31032024
              element.isProjectCompletedTarget31032025 = e.isProjectCompletedTarget31032025
              element.isProjectCompletedTarget31032026 = e.isProjectCompletedTarget31032026
              element.baseYear = e.baseYear,
              element.disabled=1,
              element.saveButton=false,
              element.justification=e.justification
            }
          })
        });
      }, err => {
  
      })
    }
    else {
      this.api.getOutComeGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe((res) => {
        this.outComeDataList = res.data
        this.dataOutComeList.forEach(element => {
          this.outComeDataList.forEach(e=>{
            if (e.outcomeIndicatorId === element.id) {
              element.id = e.outcomeIndicatorId
              element.outId = e.id
              element.baseYear = e.baseYear
              element.isProjectCompletedTarget31032024 = e.isProjectCompletedTarget31032024
              element.isProjectCompletedTarget31032025 = e.isProjectCompletedTarget31032025
              element.isProjectCompletedTarget31032026 = e.isProjectCompletedTarget31032026
              element.baseYear = e.baseYear
            }
          })
        });
      }, err => {
  
      })
    }

  }

  add() {
    this.otherSource.push({
      "activity": '',
      "amount": 0,
      "componentId": this.sharedService.genderComponentId,
      "districtCode": this.districtCode,
      "id": 0,
      "scheme": "",
      "stateCode": this.stateCode
    })
  }
  delete(e, i) {
    this.common.delete().subscribe(res => {
      if (res) {
        if (e.id === 0) {
          this.otherSource.splice(i, 1);
          this.notification.showDelete();
          if (i === 0) {
            this.add()
          }
        } else {
          this.deleteService.deleteOtherSource(e).subscribe(res => {
            if (res.status === 200) {
              this.getOtherSource();
              this.getBooleanData()
              this.notification.showDelete();
            }
          }, err => {

          })
        }
      }
    })
  }
  submit() {
    if (this.undertakingNoDuplicationExpenditure) {
      for (let index = 0; index < this.otherSource.length; index++) {
        this.otherSource[index].stateCode = this.stateCode,
          this.otherSource[index].districtCode = this.districtCode
        if ((this.otherSource[index].activity === '' || this.otherSource[index].scheme === '' || this.otherSource[index].amount === null)) {
          this.isFormInvalid = true
          this.notification.showWarning()
          return;
        } else {
          this.isFormInvalid = false
        }
      }
    } else {
      this.notification.showValidationMessage('Please check undertaking !!!')
      return;
    }
    this.api.collegeUnivOtherSource(this.otherSource, this.undertakingNoDuplicationExpenditure, this.common.genderEquityOtherSourceFunds).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getOtherSource();
        //this.saveOtherSourceBoolean()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getOtherSource() {
    this.getService.getOtherSourceListGen(this.districtCode, this.sharedService.genderComponentId).subscribe(res => {
      this.undertakingNoDuplicationExpenditure = res.undertakingNoDuplicationExpenditure
      if (res.otherSourceOfFund && res.otherSourceOfFund.length) {
        this.otherSource = res.otherSourceOfFund
      } else {
        this.otherSource = [];
        if(this.otherSource.length === 0){
          this.saveOtherSourceBoolean()
        }
        this.add()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getOtherInfo() {
    this.getService.getOtherInfoDetailsGender(this.districtCode, this.sharedService.genderComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        this.dprChecked = res.data['0'].revisedProposalDprUndertaking == true ? true : false
        this.newRevisedDprStatus = res.data['0']?.revisedProposalDprUndertaking
        this.newRevisedDprId =  res.data['0']?.revisedProposalRevisedDprId
        
        this.dprCheckVisible  = res.data['0'].newDprFileName == "" ? false : res.data['0'].newDprFileName == null ? false : true
        this.isVisibleUndertaking = res.data['0'].revisedProposalDprUndertaking == "" ? false : res.data['0'].revisedProposalDprUndertaking == null ? false : true
        this.myFilesName = res.data['0'].dprFileName;
        this.documentOfDpr = res.data['0'].documentOfDpr   
        this.newDprfileId = res.data['0'].newDprFileId
        this.dprUploadIsVisible = res.data['0'].newDprFileName ? true : false
        this.myFilesNameDPR = res.data['0'].newDprFileName


        if(res.data['0'].revisedProposalDprUndertaking == true && res.data['0'].newDprFileName == null){
          this.defaultValue = false
        }
        else if(res.data['0'].newDprFileName != null){
      
          this.defaultValue = true
        }
        this.otherInfo.get('provideDetails').setValue(res.data['0'].provideDetails);
        this.otherInfo.get('tenatativeDateCompletionOfProject').setValue(this.formatDate(res.data['0'].tenatativeDateCompletionOfProject))
        if (res.data['0'].withExistringLinkage) {
          this.withExistringLinkage = true
          this.otherInfo.get('preCollebe').setValue('With existing Linkages');
        } if (res.data['0'].withScopeForLinkage) {
          this.withScopeForLinkage = true
          this.otherInfo.get('preCollebe').setValue('With scope for linkage');
        } if (res.data['0'].withoutLinkage) {
          this.withoutLinkage = true
          this.otherInfo.get('preCollebe').setValue('Without Linkages');
        }
        if (!this.changeDoc) {

          this.myFilesName = res.data['0'].dprFileName
          this.myFileArray = res.data['0']?.dprFileId;
          if (res.data['0']?.documentOfDpr) {
          this.downloadPdf(res.data['0'].documentOfDpr);
          }
        }
        if(this.newDprfileId == null){
          this.getDocuments()
        }
        
        // this.getDPRDoc(res.data['0']?.newDprFileId)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
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
  private formatDate(date) {
    if (date) {
      let split_dateAsString1 = date.split('/')
      let final_format1 = new Date(`${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`);
      return final_format1;
    }
  }
  onKeypressEvent1(event, inputLength, item) {
    if (item.id !== 1 && item.id !== 3 && item.id !== 4) {
      if (!((event.keyCode > 95 && event.keyCode < 106)
        || (event.keyCode > 47 && event.keyCode < 58)
        || event.keyCode == 8)) {
        event.preventDefault();
        return false;
      }
    }
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  async getFileDetails(e: any) {
    this.documentOfDpr = ''
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
  async getFileDetailsDpr(e: any) {
    this.myFilesDPR = [];
    this.myFilesNameDPR = '';
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDocDPR = true;
        this.fileSizeExceed = false;
        this.myFilesDPR.push(e.target.files[i]);
        this.myFilesNameDPR += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesNameDPR += ',';

      }
    }
    const target = e.target as HTMLInputElement;
    this.processFilesDPR(target.files);

  }
  processFilesDPR(files: any) {
    for (const file of files) {
      if (file.type != 'application/pdf') {
        this.notification.showValidationMessage(
          'Please upload pdf file only!!!'
        );
        this.myFilesNameDPR = '';
        this.myFilesDPR = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.myFilesNameDPR = file.name;
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
  submitDoc() {

    if (this.otherInfo.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    let tenatativeDateCompletionOfProject = null;
    if (this.otherInfo.value.tenatativeDateCompletionOfProject) {
      let day: string = this.otherInfo.value.tenatativeDateCompletionOfProject.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.otherInfo.value.tenatativeDateCompletionOfProject.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.otherInfo.value.tenatativeDateCompletionOfProject.getFullYear();
      tenatativeDateCompletionOfProject = `${day}/${month}/${year}`;
      tenatativeDateCompletionOfProject.toString();
    }
    if (this.fileSizeExceed) {
      this.notification.showValidationMessage('File size should be less than 25MB.')
      return;
    }

    const formdata: FormData = new FormData();

    if (this.changeDoc) {
      
      for (var i = 0; i < this.myFiles.length; i++) {
        formdata.append('file', this.myFiles[i]);
      }
    } else {
      // if (!this.blob) {
      //   this.notification.showValidationMessage('Please upload document !!!')
      //   return;
      // }
      if(this.blob){
        formdata.append('file', this.blob, this.myFilesName);
      }
      
    }
    // if (this.myFilesName === '') {
    //   this.notification.showValidationMessage('Please upload document !!!')
    //   return;
    // }
    let payload = {
      aisheCode: this.districtCode,
      withExistringLinkage: this.otherInfo.controls['preCollebe'].value === 'With existing Linkages' ? true : false,
      withScopeForLinkage: this.otherInfo.controls['preCollebe'].value === 'With scope for linkage' ? true : false,
      withoutLinkage: this.otherInfo.controls['preCollebe'].value === 'Without Linkages' ? true : false,
      tenatativeDateCompletionOfProject: tenatativeDateCompletionOfProject,
      // provideDetails: this.otherInfo.controls['provideDetails'].value
    }
    this.api.saveDocumentOtherInfoGender(payload, this.common.genderEquityOtherInformation, formdata, this.sharedService.genderComponentId).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getOtherInfo()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  tab: any
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


  viewNewDPRPdf(data: any, fileName: string) {
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

  LockProposal(lockValue){   
    if(lockValue == 'otherInformation' && this.newRevisedDprId == null){
      if(this.dprValue == undefined && this.defaultValue == null && this.newRevisedDprfileId == null){
      this.notification.showValidationMessage('Please Select Yes/No')
      return
    }
    if((this.newDprfileId == "" || this.newDprfileId == null) && (this.dprChecked == false) && (this.newRevisedDprfileId == null)){
      this.notification.showValidationMessage('Please DPR File Upload or Undertaking Process')
      return
    }
    if(this.newRevisedDprStatus == null && this.newRevisedDprId == null && this.newRevisedDprfileId == null){
      this.notification.showValidationMessage("Can't Lock before saving")
      return
    }
  }
    let commonObj = this.common.newObj
    let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
    let filterObjValue = filterObjt[0][1]
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = {
        aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
        constant: lockValue,
        districtCode: sessionStorage.getItem("districtCode"),
        // instituteCategory: characters,
        stateCode: this.stateCode,
        status: true
      }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(`${filterObjValue} has been Loked successfully!!!`);
        this.saveLockStatus();
        this.close()
      }
    });
  }

  saveLockStatus() {
    this.getService.getLockListStatus(this.aisheCode, this.sharedService.genderComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey) {
          if (this.FinalLockKey.infraConstruction) {
            this.isInfraDisabled = true;
          }
          if (this.FinalLockKey.infraRenovation) {
            this.isRenvoDisabled = true;
          }
          if (this.FinalLockKey.equipment) {
            this.isEquoDisabled = true;
          }
          if (this.FinalLockKey.softComponent) {
            this.isSoftDisabled = true;
          }
          if (this.FinalLockKey.timeline) {
            this.istimelineDisabled = true;
          }
          if (this.FinalLockKey.financialEstimate) {
            this.isFinicialEstimateDisabled = true;
          }
          if (this.FinalLockKey.workshop) {
            this.isWorkDisabled = true;
          }
          if (this.FinalLockKey.remedialClass) {
            this.isremedialDisabled = true;
          }
          if (this.FinalLockKey.vocational) {
            this.isVocationalDisabled = true;
          }
          if (this.FinalLockKey.anyOtherActivities) {
            this.isOtherActivityDisabled = true;
          }
          if (this.FinalLockKey.proposedOutcome){
            this.isProposedDisabled = true;
          }
          if (this.FinalLockKey.otherInformation){
            this.isOtherDisabled = true;
            this.isOtherDisabledRevised = true

          }
        }
        // 
        // this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.insType === 'U' ? this.common.strengthUnivProposed : this.common.strengthClgProposed, this.sharedService.isProposedCourse)
        // this.reset();
      }

    })
  }

  editRow(item:any,index:any){
    let indexToChange=index;
    this.dataOutComeList = this.dataOutComeList.map((item, index) => {
     if (index === indexToChange) {
       return { ...item, disabled: 0 ,saveButton:true, isActive : true}
       ;
     }else{
       return { ...item, disabled: 1 ,saveButton:false, isActive : false };
     }
   });
   
  }

  viewRow(item:any,index:any){
    let payload={
      item:item,
      disableSave:false
    }
    this.common.outcomeJustification(payload).subscribe((res)=>{

    })
  }

  saveSingleRowData(item:any,index:any){
    let payload:any={
      // aisheCode: this.aisheCode,
      baseYear: item.baseYear,
      districtCode: this.districtCode,
      id: item.outId,
      instituteCategory: this.insType,
      componentId: this.sharedService.genderComponentId,
      isProjectCompletedTarget31032024:
        item.isProjectCompletedTarget31032024,
      isProjectCompletedTarget31032025:
        item.isProjectCompletedTarget31032025,
      isProjectCompletedTarget31032026:
        item.isProjectCompletedTarget31032026,
      outcomeIndicatorId: item.id,
      stateCode: this.stateCode,
      justification:'',
      pabStatus:1
    }
    this.common.outcomeJustification(payload).subscribe(res => {
      
      if (res) {
        payload.justification=res;
        let newPayload=[];
        newPayload.push(payload);
        this.api.postOutCome(newPayload, this.common.genderEquityOutComes).subscribe(
          (res) => {
            if (res.status === 200) {
              this.notification.showSuccess();
              this.getOutComeData();
              this.dataOutComeList[index].isActive = false 
            }
          },
          (error) => { }
        );
      }
    })
  }
  cancelSingleRowData(item:any,index:any){
    this.dataOutComeList[index].disabled=1;
    this.dataOutComeList[index].saveButton=false;
    this.dataOutComeList[index].isActive = false 
  }

  onOptionChange(value){
    this.dprValue = value
    if(this.dprValue){
      this.dprUploadIsVisible = true;
      this.dprCheckVisible = true
      this.isVisibleUndertaking = false
    }
    else{
      this.dprUploadIsVisible = false;
      this.dprCheckVisible = false
      this.isVisibleUndertaking = true
      this.defaultValue = false
      
    }


  }

  deleteDoc(){
    this.deleteService.deleteDocuments(this.newDprfileId).subscribe(res =>{
      if(res.status == 200){
        this.notification.showSuccessMessage(res.message)
        this.newDprfileId = ""
        this.myFilesNameDPR = ""
        this.defaultValue = ""
        this.getOtherInfo()
        
  
      }
    })
  
    }

    submitDocument(){
      if (this.fileSizeExceed) {
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      const formdata: FormData = new FormData();
      if (this.changeDocDPR) {
        for (var i = 0; i < this.myFilesDPR.length; i++) {
          formdata.append('file', this.myFilesDPR[i]);
        }
      } else {
        if(this.blob){
          formdata.append('file', this.blob, this.myFilesNameDPR);
        }
       
      }
     
      if(this.dprValue == true || this.defaultValue == true){
          if(this.fileSize <= 0 && this.newDprfileId == null){
          this.notification.showValidationMessage('Please Upload DPR File')
          return
        }
        else{
          this.dprChecked = false
        }
          let payload = {
          aisheCode: null,
          stateCode: this.stateCode,
          districtCode: this.districtCode,
          instituteCategory: '',
          componentId: this.sharedService.genderComponentId,
          documentTypeId:13,
          revisedProposalDprUndertaking : this.dprChecked == true ? true : false
        }
  
        this.api.saveDocumentOtherInfoDPREquity(payload, this.common.genderEquityOtherInformation, formdata).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccess()
            this.getOtherInfo();
          }
        }, err => {
    
        })
      }
      else{
        if(this.dprChecked == false){
          this.notification.showValidationMessage('Please Choose Undertaking')
        }
        else{
          if(!(this.newDprfileId == "" || this.newDprfileId == null)){
            this.notification.showValidationMessage('Delete DPR Document')
            return
          }
        
         
          let payload = {
            aisheCode: null,
            stateCode: this.stateCode,
            districtCode: this.districtCode,
            instituteCategory: '',
            componentId: this.sharedService.genderComponentId,
            documentTypeId:13,
            revisedProposalDprUndertaking : this.dprChecked == true ? true : false
          }
          formdata.delete('file');
          this.api.saveDocumentOtherInfoDPREquity(payload, this.common.genderEquityOtherInformation, formdata).subscribe(res => {
            if (res.status === 200) {
              this.notification.showSuccess()
              this.getOtherInfo()
              this.router.navigate([this.router.url]);
            }
          }, err => {
      
          })
        }
        
      }
  
      
    }

    close() {
      // this.addUpdateButton = "Save";
      // this.addUpdate = false;
      // this.hideButton = true;
      // this.reset();
      // this.addDepartmentData = false;
      // this.showPage = false
      this.isFormInvalid = false
    }


    viewFile(documentId:any, newRevisedDprfileId){
      let Id = documentId == null ? newRevisedDprfileId : documentId 
      let payload={
        aisheCode:this.aisheCode,
        // districtCode:this.districtCode,
        componentId: this.sharedService.collegeComponentId,
        documentTypeId:'',
        documentId:Id,
      }
      if(Id != null){
        this.api.getDPRDoc(payload).subscribe((res)=>{
          if (res.status === 200) {
            // this.notification.showSuccess()
            // this.getOtherInfo()
     
              let name = res.data['0']?.name;
              let id = res.data['0']?.documentFile;
              this.viewPdf(id, name)
              if (res.data['0']?.documentFile) {
                this.downloadPdf(res.data['0'].documentFile);
    
              
            }
          }
        }, err => {
    
        })
      }
  
    }




    getDocuments(){
      let payload={
        // aisheCode:this.aisheCode,
        districtCode:this.districtCode,
        componentId: this.sharedService.genderComponentId,
        documentTypeId:41,
        documentId:'',
      }
      this.api.getDPRDocDistrict(payload).subscribe((res)=>{
        if (res.status === 200 && res.data.length > 0) {
            this.myFilesNameDPR = res.data['0']?.name;
            this.newRevisedDprfileId = res.data['0']?.id;
            this.isOtherDisabled = true
         
        }
      }, err => {
  
      })
     
    }

    
  



    getDPRDoc(documentId:any, newRevisedDprfileId){
      let Id = documentId == null ? newRevisedDprfileId : documentId 
      let payload={
        // aisheCode:this.aisheCode,
        districtCode:this.districtCode,
        componentId: this.sharedService.genderComponentId,
        documentTypeId:this.newDprfileId == null ? 41 : 13,
        documentId:Id,
      }
      if(Id != null){
        this.api.getDPRDocDistrict(payload).subscribe((res)=>{
          if (res.status === 200) {
            // this.notification.showSuccess()
            // this.getOtherInfo()
     
              this.myFilesNameDPR = res.data['0']?.name;
              this.myFileArrayDPR = res.data['0']?.documentFile;
              this.viewNewDPRPdf(this.myFileArrayDPR, this.myFilesNameDPR)
              if (res.data['0']?.documentFile) {
                this.downloadPdf(res.data['0'].documentFile);
    
              
            }
          }
        }, err => {
    
        })
      }
  
    }

}
