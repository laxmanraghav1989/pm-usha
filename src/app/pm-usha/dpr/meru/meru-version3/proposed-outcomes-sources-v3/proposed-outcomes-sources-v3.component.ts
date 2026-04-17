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
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';


@Component({
  selector: 'cfs-proposed-outcomes-sources-v3',
  templateUrl: './proposed-outcomes-sources-v3.component.html',
  styleUrls: ['./proposed-outcomes-sources-v3.component.scss']
})
export class ProposedOutcomesSourcesV3Component implements OnInit {
 @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  dataOutComeList: Array<any> = [];
  aisheCode: string;
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
  myFilesDPR: string[] = [];
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
  myFileArray: any;
  otherSourceOfFunds: boolean = false;
  paramId: any;
  dprUploadIsVisible:boolean;
  myFilesNameDPR:any='';
  myFileArrayDPR:any;
  changeDocDPR: boolean;

  isInfraDisabled:boolean = false;
  isRenvoDisabled:boolean = false;
  isEquoDisabled:boolean = false;
  isSoftDisabled:boolean = false;
  istimelineDisabled:boolean = false;
  isProposedDisabled:boolean = false;
  isOtherDisabled:boolean = false;
  isOtherDisabledRevised:boolean = false;
  FinalLockKey: any;
  dprChecked:any;
  dprValue:any
  defaultValue:any;
  dprCheckVisible:any;
  newDprfileId:any;
  isVisibleUndertaking:any;
  newRevisedDprfileId:any;
  newRevisedDprStatus:any;
  newRevisedDprId:any
  myFilesNameDPR1: any;
  newRevisedDprfileId1: any;
  newDprfileId1: any;
  dprUploadIsVisible1: boolean;
  isOtherDisabled1: boolean = false;
  myFilesDPR1: any;
  myFilesNameDPRName: any;
  statusId: any;
  FinalLockKey1: boolean;
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    public notification: NotificationService,
    public common: Common,
    public errorMatcher: CustomErrorStateMatcher,
    public sharedService: SharedService,
    private router: Router,
    public getSrevice: GetService, public deleteService: DeleteService,public postService:PostService, private route: ActivatedRoute, private encrypt: EncryptDecrypt
  ) {
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.districtCode = sessionStorage.getItem('districtCode')
    this.stateCode = sessionStorage.getItem('stateCode')
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    if (this.insType === "C") {
      this.instituteCategory = "COLLEGE";
    } else {
      this.instituteCategory = "UNIVERSITY";
    }
    this.otherInfo = this.fb.group({
      tenatativeDateCompletionOfProject: ['', [Validators.required]],
      preCollebe: ['0', []],
      provideDetails: [null, []]
    })
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getOutComeIndicator();
    this.getPageStatusList();
    if (this.paramId){
    this.saveLockStatus();
    this.getPropsalStatus()
    }

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
    this.isFormInvalid = false
    if (this.selectedIndex === 0) {
      this.getOutComeIndicator();
    } if (this.selectedIndex === 1) {
      this.getOtherSource();
      this.getBooleanData()
    } if (this.selectedIndex === 2) {
      this.getOtherInfo();
    }
  }
  getBooleanData() {
    this.getSrevice.getBooleanList(this.aisheCode, this.sharedService.meruComponentId,this.districtCode).subscribe(res => {
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
    let payload={
      "aisheCode": this.aisheCode,
      "componentId": this.sharedService.meruComponentId,
      "districtCode": this.districtCode,
      "isOtherSourceOfFund": this.otherSourceOfFunds,
      menu:this.common.meruProposedOtherSource
    }
    this.postService.saveBoolean(payload).subscribe(res => {
      if (res.status === 200){
        this.getBooleanData()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  checkOther(event){
    for (let index = 0; index < this.otherSource.length; index++) {
      if(this.otherSource[index].id !== 0){
        this.notification.showValidationMessage('Please Delete all row.')
        event.preventDefault();
      }
      
    }
  }

    getPropsalStatus() {
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe
    }
    this.getSrevice.getfinalSubmitProposal(payload).subscribe(res => {
        if (res.data.length && res.data) {
          const StatusFilter = res.data.filter(e=> e.isEligibleForV3);
          this.statusId = StatusFilter[0]?.id;
          this.FinalLockKey1 = StatusFilter[0]?.isV3Locked ? true : false
        }
      },
      (err) => {}
    );
    //   this.progressMonitoring = res[0]
    // })
  }

  onOptionChange(value){
    this.dprValue = value
    if(value == true){
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


  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.meruComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if(this.paramId !== this.sharedService.revPrposal){
            if (res.data[index].moduleName === this.common.meruFinal) {
              this.disabledPage = true
            }
          }

        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getOutComeData() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.getSrevice.getOutComeRevision(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId, null, "1").subscribe((res) => {
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
      this.getSrevice.getOutCome(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe((res) => {
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

  getOutComeIndicator() {
    this.getSrevice.getProposedCome().subscribe(
      (res) => {
        this.dataOutComeList = []
        res.forEach((e: any) => {
          if (e.targetType === 'float') {
            e.targetType = 'number'
          } if (e.baseYearType === 'float') {
            e.baseYearType = 'number'
          }
          if (e.isMeruIndicator) {
            this.dataOutComeList.push({
              indicatorName: e.indicatorName,
              id: e.id,
              baseYear: '',
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
              indicatorInfo:e.indicatorInfo,
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
      // if(this.dataOutComeList[index].id === 3){
      //   if (this.dataOutComeList[index].baseYear === '' || this.dataOutComeList[index].isProjectCompletedTarget31032024 === '0' || this.dataOutComeList[index].isProjectCompletedTarget31032025 === '0' || this.dataOutComeList[index].isProjectCompletedTarget31032026 === '0') {
      //     this.notification.showValidationMessage('Please choose YES/NO !!!');
      //     this.isFormInvalid = true
      //     return;
      //   }
      // }
      // if (this.dataOutComeList[index].baseYear === '' || this.dataOutComeList[index].isProjectCompletedTarget31032024 === '' || this.dataOutComeList[index].isProjectCompletedTarget31032025 === '' || this.dataOutComeList[index].isProjectCompletedTarget31032026 === '') {
      //   this.notification.showWarning();
      //   this.isFormInvalid = true
      //   return;
      // } else {
      //   this.isFormInvalid = false
      temp.push({
        aisheCode: this.aisheCode,
        baseYear: this.dataOutComeList[index].baseYear,
        districtCode: this.districtCode,
        id: this.dataOutComeList[index].outId,
        instituteCategory: this.insType,
        componentId: this.sharedService.meruComponentId,
        isProjectCompletedTarget31032024:
          this.dataOutComeList[index].isProjectCompletedTarget31032024,
        isProjectCompletedTarget31032025:
          this.dataOutComeList[index].isProjectCompletedTarget31032025,
        isProjectCompletedTarget31032026:
          this.dataOutComeList[index].isProjectCompletedTarget31032026,
        outcomeIndicatorId: this.dataOutComeList[index].id,
        stateCode: this.stateCode,
      })
      // }
    }
    this.api.postOutCome(temp, this.common.meruProposedOutcome).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.getOutComeData();
        }
      },
      (error) => { }
    );
  }
  add() {
    this.otherSource.push({
      "activity": '',
      "aisheCode": this.aisheCode,
      "amount": 0,
      "componentId": this.sharedService.meruComponentId,
      "districtCode": this.districtCode,
      "id": 0,
      "instituteCategory": this.insType,
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
              this.notification.showDelete()
              this.getOtherSource();
              this.getBooleanData()
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
        if (!(this.otherSource[index].activity && this.otherSource[index].scheme && this.otherSource[index].amount)) {
          this.notification.showValidationMessage('Please enter all field !!!')
          return;
        }
      }
    } else {
      this.notification.showValidationMessage('Please check undertaking !!!')
      return;
    }
    this.api.collegeUnivOtherSource(this.otherSource, this.undertakingNoDuplicationExpenditure, this.common.meruProposedOtherSource).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.getOtherSource();
        this.saveOtherSourceBoolean()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getOtherSource() {
    this.getSrevice.getOtherSourceList(this.aisheCode, this.sharedService.meruComponentId).subscribe(res => {
      this.undertakingNoDuplicationExpenditure = res.undertakingNoDuplicationExpenditure
      if (res.otherSourceOfFund && res.otherSourceOfFund.length) {
        this.otherSource = res.otherSourceOfFund
      } else {
        this.otherSource = [];
        // if(this.otherSource.length === 0){
        //   this.saveOtherSourceBoolean()
        // }
        this.add()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getOtherInfo() {
    this.api.getOtherInfoDetails(this.aisheCode, this.sharedService.meruComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        this.myFilesName = res.data['0'].dprFileName;
        this.dprChecked = res.data['0'].revisedProposalDprUndertaking == true ? true : false
        this.newRevisedDprStatus = res.data['0']?.revisedProposalDprUndertaking
        this.newRevisedDprId =  res.data['0']?.revisedProposalRevisedDprId
        this.isVisibleUndertaking = res.data['0'].revisedProposalDprUndertaking == "" ? false : res.data['0'].revisedProposalDprUndertaking == null ? false : true
        this.dprCheckVisible  = res.data['0'].newDprFileName == "" ? false : res.data['0'].newDprFileName == null ? false : true
        this.myFilesName = res.data['0'].dprFileName;
       this.newDprfileId = res.data['0'].newDprFileId
       this.dprUploadIsVisible = res.data['0'].newDprFileName ? true : false
        this.documentOfDpr = res.data['0'].documentOfDpr

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
          this.myFilesName = res.data['0']?.dprFileName;
          this.myFileArray = res.data['0']?.dprFileId
          if (res.data['0']?.documentOfDpr) {
            this.downloadPdf(res.data['0'].documentOfDpr);

          }
        }
        if(this.newDprfileId == null){
          this.getDocuments()
        }
        if (this.paramId === this.sharedService.revPrposalV3) {
          this.getDocumentsVer3()
        }
        // this.getDPRDoc(res.data['0']?.newDprFileId)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  deleteDoc(){
    this.deleteService.deleteDocuments(this.newRevisedDprfileId1).subscribe(res =>{
      if(res.status == 200){
        this.notification.showSuccessMessage(res.message)
        this.newRevisedDprfileId1 = ""
        this.myFilesNameDPR1 = ""
        // this.defaultValue = ""
        this.isOtherDisabled1 = false;
        this.getDocumentsVer3()
        // this.getOtherInfo()
      }
    })
  
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
        aisheCode:this.aisheCode,
        // districtCode:this.districtCode,
        componentId: this.sharedService.collegeComponentId,
        documentTypeId:41,
        documentId:'',
      }
  
      this.api.getDPRDoc(payload).subscribe((res)=>{
        if (res.status === 200 && res.data.length > 0) {
            this.myFilesNameDPR = res.data['0']?.name;
            this.newRevisedDprfileId = res.data['0']?.id;
            // if(this.newRevisedDprStatus == null && this.newRevisedDprId != null){
            //   this.isOtherDisabledRevised = false
            // }
            this.isOtherDisabled = true
            
         
        }
      }, err => {
  
      })
     
    }


     getDocumentsVer3(){
      let payload={
        aisheCode:this.aisheCode,
        componentId: this.sharedService.meruComponentId,
        documentTypeId:42,
        documentId:'',
      }
  
      this.api.getDPRDocV3(payload).subscribe((res)=>{
        if (res.status === 200 && res.data.length > 0) {
            this.myFilesNameDPR1 = res.data['0']?.name;
            this.newRevisedDprfileId1 = res.data['0']?.id;
            this.newDprfileId1 = res.data['0']?.document_type_Id
            this.dprUploadIsVisible1 = res.data['0']?.name ? true : false
            this.isOtherDisabled1 = this.myFilesNameDPR1 ? true : false
         
        }
        else if (res.status === 200 && res.data.length === 0) {
          this.myFilesNameDPR1 = ''
        }
      }, err => {
  
      })
     
    }
  



  getDPRDoc(documentId:any, newRevisedDprfileId){
    let Id = documentId == null ? newRevisedDprfileId : documentId 
    let payload={
      aisheCode:this.aisheCode,
      // districtCode:this.districtCode,
      componentId: this.sharedService.collegeComponentId,
      documentTypeId:this.newDprfileId == null ? 41 : 13,
      documentId:Id,
    }
      this.api.getDPRDoc(payload).subscribe((res)=>{
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

  getDPRDocV3(documentId:any, newRevisedDprfileId){
    let payload={
      aisheCode:this.aisheCode,
      // districtCode:this.districtCode,
      componentId: this.sharedService.meruComponentId,
      documentTypeId:documentId,
      documentId:newRevisedDprfileId,
    }
      this.api.getDPRDocV3(payload).subscribe((res)=>{
        if (res.status === 200) {
          // this.notification.showSuccess()
          // this.getOtherInfo()
            this.myFilesNameDPR1 = res.data['0']?.name;
            this.myFileArrayDPR = res.data['0']?.documentFile;
            this.viewNewDPRPdf(this.myFileArrayDPR, this.myFilesNameDPR1)
            if (res.data['0']?.documentFile) {
              this.downloadPdf(res.data['0'].documentFile);
            
          }
        }
      }, err => {
  
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
    if (!((event.keyCode > 95 && event.keyCode < 106)
      || (event.keyCode > 47 && event.keyCode < 58)
      || event.keyCode == 8)) {
      event.preventDefault();
      return false;
    }
    if (item.id == 15){
      let inputLengthUpdate = 4
      if (event.target.value.length + 1 > inputLengthUpdate) {
        event.preventDefault();
      }
    }
    if (item.id != 15){
      if (event.target.value.length + 1 > inputLength) {
        event.preventDefault();
      }
    }
    
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  async getFileDetails(e: any) {
    this.documentOfDpr = ''
    // const buffer = await readChunk(e.target.file, { length: 4100 });
    this.myFiles = [];
    this.myFilesName = '';
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      // let size: number = e.target.files[i].size / 1024 / 1024 / 1024 / 1024 / 1024
      // size = parseInt(size.toFixed(2));
      // if (size > 2) {
      //   this.fileSizeExceed = true;
      //   this.sharedService.showValidationMessage('File size should be less than 25MB.')
      //   return;
      // } 
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
   processFilesDPRV3(files: any) {
    for (const file of files) {
      if (file.type != 'application/pdf') {
        this.notification.showValidationMessage(
          'Please upload pdf file only!!!'
        );
        this.myFilesNameDPR1 = '';
        this.myFilesDPR1 = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.myFilesNameDPR1 = file.name;
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
    //log / access file size in bytes

    //log / access file size in Mb

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
    // if (!this.myFilesName) {
    //   this.notification.showValidationMessage('Please upload document !!!')
    //   return;
    // }
    if (this.otherInfo.controls['preCollebe'].value === '0') {
      this.notification.showValidationMessage('Please select Pre-Collaboration !!!!')
      return
    }
    let payload = {
      aisheCode: this.aisheCode,
      withExistringLinkage: this.otherInfo.controls['preCollebe'].value === 'With existing Linkages' ? true : false,
      withScopeForLinkage: this.otherInfo.controls['preCollebe'].value === 'With scope for linkage' ? true : false,
      withoutLinkage: this.otherInfo.controls['preCollebe'].value === 'Without Linkages' ? true : false,
      tenatativeDateCompletionOfProject: tenatativeDateCompletionOfProject,
      provideDetails: this.otherInfo.controls['provideDetails'].value,
      componentId: this.sharedService.meruComponentId
    }
    this.api.saveDocumentOtherInfo(payload, this.common.meruProposedOtherInfor, formdata).subscribe(res => {
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

  reset() {
    if (this.selectedIndex === 0) {
      this.dataOutComeList.forEach(e => {
        e.baseYear = '',


        
          e.isProjectCompletedTarget31032024 = '',
          e.isProjectCompletedTarget31032025 = '',
          e.isProjectCompletedTarget31032026 = ''
      })
    } if (this.selectedIndex === 1) {
      this.otherSource.forEach(e => {
        e.scheme = '',
          e.amount = null,
          e.activity = ''
      })
    } if (this.selectedIndex === 2) {
      this.otherInfo.reset();
      this.otherInfo.get('preCollebe').setValue('0')
    }
  }
  editRow(item:any,index:any){
    let indexToChange=index;
    this.dataOutComeList = this.dataOutComeList.map((item, index) => {
     if (index === indexToChange) {
       return { ...item, disabled: 0 ,saveButton:true, isActive : true };
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
      aisheCode: this.aisheCode,
      baseYear: item.baseYear,
      districtCode: this.districtCode,
      id: item.outId,
      instituteCategory: this.insType,
      componentId: this.sharedService.meruComponentId,
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
        this.api.postOutCome(newPayload, this.insType === 'U' ? this.common.strengthUnivOutCome : this.common.strengthClgOutCome).subscribe(
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
  async getFileDetailsDpr(e: any) {
    this.myFilesDPR = [];
    this.myFilesNameDPR1 = '';
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
        this.myFilesNameDPR1 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesNameDPR1 += ',';
      }
    }
    const target = e.target as HTMLInputElement;
    this.processFilesDPR(target.files);

  }

    async getFileDetailsDprV3(e: any) {
    this.myFilesDPR1 = [];
    this.myFilesNameDPR1 = '';
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
        this.myFilesDPR1.push(e.target.files[i]);
        this.myFilesNameDPR1 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesNameDPR1 += ',';
      }
    }
    const target = e.target as HTMLInputElement;
    this.processFilesDPRV3(target.files);

  }
  submitDocument(){
    if (this.myFilesNameDPR1) {
      if (this.fileSizeExceed) {
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      const formdata: FormData = new FormData();
      if (this.changeDocDPR) {
        for (var i = 0; i < this.myFilesDPR1.length; i++) {
          formdata.append('file', this.myFilesDPR1[i]);
        }
      } else {
        if(this.blob){
          formdata.append('file', this.blob, this.myFilesNameDPR1);
        }
      
      }

        if(this.fileSize <= 0 && this.newDprfileId1 == null){
          this.notification.showValidationMessage('Please Upload DPR File')
          return
        }
        else{
          this.dprChecked = false
        }
        let payload = {
          aisheCode: this.aisheCode,
          stateCode: this.stateCode,
          districtCode: this.districtCode,
          instituteCategory: this.insType,
          componentId: this.sharedService.meruComponentId,
          documentTypeId:42,
        }
        this.api.saveDocumentOtherInfoDPRV3(payload, this.insType === 'U' ? this.common.strengthUnivOtherInfo : this.common.strengthClgOtherInfo, formdata).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccess()
            this.getDocumentsVer3()
          }
        }, err => {
    
        })
    }
    else {
      this.notification.showValidationMessage('Please Upload DPR File')
    }
    
  }
  LockProposal(lockValue){
    if(lockValue == 'otherInformation' && this.newRevisedDprId == null){
        if(this.dprValue == undefined && this.defaultValue == null){
        this.notification.showValidationMessage('Please Select Yes/No')
        return
      }
      if((this.newDprfileId == "" || this.newDprfileId == null) && (this.dprChecked == false)){
        this.notification.showValidationMessage('Please DPR File Upload or Undertaking Process')
        return
      }
      
      if(this.newRevisedDprStatus == null && this.newRevisedDprId == null){
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
        componentId: this.sharedService.meruComponentId,
        constant: lockValue,
        districtCode: sessionStorage.getItem("districtCode"),
        instituteCategory: characters,
        stateCode: this.stateCode,
        status: true
      }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(`${filterObjValue} has been Loked successfully!!!`);
        this.saveLockStatus();
        // this.reset();
        this.close()
      }
    });
  }
  saveLockStatus(){
    this.getSrevice.getLockListStatus(this.aisheCode, this.sharedService.meruComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey){
          if (this.FinalLockKey.infraConstruction){
            this.isInfraDisabled = true;
          }
          if (this.FinalLockKey.infraRenovation){
            this.isRenvoDisabled = true;
          }
          if (this.FinalLockKey.equipment){
            this.isEquoDisabled = true;
          }
          if (this.FinalLockKey.softComponent){
            this.isSoftDisabled = true;
          }
          if (this.FinalLockKey.timeline){
            this.istimelineDisabled = true;
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
  close() {
    // this.addUpdateButton = "Save";
    // this.addUpdate = false;
    // this.hideButton = true;
    // this.reset();
    // this.addDepartmentData = false;
    // this.showPage = false
    this.isFormInvalid = false
  }
  cancelSingleRowData(item:any,index:any){
    this.dataOutComeList[index].disabled=1;
    this.dataOutComeList[index].saveButton=false;
    this.dataOutComeList[index].isActive = false 
  }
}
