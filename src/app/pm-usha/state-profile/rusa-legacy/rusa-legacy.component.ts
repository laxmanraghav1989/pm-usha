import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ViewportScroller } from "@angular/common";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';
import { ApiService } from 'src/app/service/api.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';
@Component({
  selector: 'cfs-rusa-legacy',
  templateUrl: './rusa-legacy.component.html',
  styleUrls: ['./rusa-legacy.component.scss']
})
export class RusaLegacyComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  tab: any;
  isFormInvalid: boolean = false;

  rusaForm: FormGroup
  selectionType: string = 'UPDATED'
  rusaList: Array<any> = [];
  tempList: Array<any> = []
  searchText: any;
  stateCode: any;
  disabledPage: boolean = false;
  componentNameMainList: Array<any> = [];
  componentNameMainArray: Array<any> = [];
  districtList: Array<any> = []
  componentId: string = 'ALL'
  districtCode: string = 'ALL'
  isUpdated:string='ALL'
  variables: Array<any> = [];
  addUpdate: string = 'Add';
  userTypeId: string;

  constructor(public sharedService: SharedService, public getService: GetService, public postService: PostService, public common: Common, public api: ApiService,
    public masterService: MasterService, public viewportScroller: ViewportScroller, public fb: FormBuilder, public notification: NotificationService, public errorMatcher: CustomErrorStateMatcher) {
    this.stateCode = sessionStorage.getItem('stateCode')
    this.userTypeId=sessionStorage.getItem('userTypeId')
    this.getRusaList();
    this.getDistrict();
    this.rusaForm = this.fb.group({
      isCompletionCertificateUploaded: [false, []],
      percentageCompletionProject: ['', []],
      isWholeProjectCompleted: ['', []],
      centralShareApproved: { value: '', disabled: true },
      centralShareReleased: ['', [Validators.required]],
      centralShareUtilised: ['', [Validators.required]],
      stateShareApproved: { value: '', disabled: true },
      stateShareReleased: ['', [Validators.required]],
      stateShareUtilised: ['', [Validators.required]],
      totalAmountApproved: { value: '', disabled: true },
      totalAmountReleased: { value: '', disabled: true },
      totalUtilisation: { value: '', disabled: true },
      aisheCode: ['', []],
      districtId: ['', []],
      institutionName: { value: '', disabled: true },
      id: 0,
      componentId: ['', []],
      stateId: ['', []],
      componentName: { value: '', disabled: true },
      districtName: { value: '', disabled: true },
      rusaPhase: { value: '', disabled: true },
      documentId: [0, []],
      institutionNameAISHE: { value: '', disabled: true },
      remarks: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.getPageStatusList()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.rusaForm.controls;
  }
  getPageStatusList() {
    this.api.getPageStatus('').subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          // if (res.data[index].moduleName === this.common.stateAtGlance) {
          //   this.disabledPage = true
          // }
          if (res.data[index].page === this.common.rusaLegacy) {
            this.disabledPage = true
            this.sharedService.setMenu(true)
          }
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
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
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  editRUSA(item) {
    this.getService.getRusaLisDoc(item.id).subscribe(res => {
      this.viewportScroller.scrollToPosition([0, 0]);
      this.rusaForm.patchValue(res);
      this.addition(this.rusaForm)
      this.addUpdate = 'Update'
      if (res?.document?.name) {
        this.myFilesName = res?.document.name
      } else {
        this.myFilesName = ''
      }
      if (!this.changeDoc) {
        if (res?.document?.documentFile) {
          this.downloadPdf(res?.document?.documentFile);
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  addition(forms) {
    const x = parseFloat(forms.controls['centralShareApproved'].value ? forms.controls['centralShareApproved'].value : 0) + parseFloat(forms.controls['stateShareApproved'].value ? forms.controls['stateShareApproved'].value : 0);
    const y = parseFloat(forms.controls['centralShareReleased'].value ? forms.controls['centralShareReleased'].value : 0) + parseFloat(forms.controls['stateShareReleased'].value ? forms.controls['stateShareReleased'].value : 0);
    const z = parseFloat(forms.controls['centralShareUtilised'].value ? forms.controls['centralShareUtilised'].value : 0) + parseFloat(forms.controls['stateShareUtilised'].value ? forms.controls['stateShareUtilised'].value : 0);
    this.rusaForm.get('totalAmountApproved').setValue(x.toFixed(2))
    this.rusaForm.get('totalAmountReleased').setValue(y.toFixed(2))
    this.rusaForm.get('totalUtilisation').setValue(z.toFixed(2))
  }
  getDistrict() {
    this.masterService.getDistrictList(this.stateCode).subscribe(res => {
      this.variables = res;
      this.districtList = this.variables.slice();
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  resetSearch(){
    this.componentId='ALL'
    this.districtCode='ALL'
    this.isUpdated='ALL'
    this.rusaList=[]
    this.rusaList = [...this.tempList]
  }
  search(){
    if(this.componentId !== 'ALL' && this.districtCode !== 'ALL' && this.isUpdated !== 'ALL'){
      this.rusaList = this.tempList.filter(e=>e.componentId === this.componentId && e.districtId === this.districtCode && e.isUpdated === this.isUpdated);
      this.handlePageChange(this.sharedService.page = 1)
      return;
    }if(this.componentId !== 'ALL' && this.districtCode !== 'ALL'){
      this.rusaList = this.tempList.filter(e=>e.componentId === this.componentId && e.districtId === this.districtCode)
      this.handlePageChange(this.sharedService.page = 1)
      return;
    }if(this.componentId !== 'ALL' && this.isUpdated !== 'ALL'){
      this.rusaList = this.tempList.filter(e=>e.componentId === this.componentId && e.isUpdated === this.isUpdated)
      this.handlePageChange(this.sharedService.page = 1)
      return;
    }if(this.districtCode !== 'ALL' && this.isUpdated !== 'ALL'){
      this.rusaList = this.tempList.filter(e=>e.isUpdated === this.isUpdated && e.districtId === this.districtCode)
      this.handlePageChange(this.sharedService.page = 1) 
      return;
    }if(this.componentId !== 'ALL'){
      this.rusaList = this.tempList.filter(e=>e.componentId === this.componentId);
      this.handlePageChange(this.sharedService.page = 1)
      return;
    }if(this.districtCode !== 'ALL'){
      this.rusaList = this.tempList.filter(e=>e.districtId === this.districtCode);
      this.handlePageChange(this.sharedService.page = 1)
      return;
    }if(this.isUpdated !== 'ALL'){
      this.rusaList = this.tempList.filter(e=>e.isUpdated === this.isUpdated);
      this.handlePageChange(this.sharedService.page = 1)
      return;
    }
  }
  getFilterData(value) {
    if (value !== 'ALL') {
      this.rusaList = this.tempList.filter(e => e.componentId === value);
    } else {
      this.rusaList = []
      this.rusaList = [...this.tempList]
    }
    this.handlePageChange(this.sharedService.page = 1)
  }
  getFilterData1(value) {
    if (value !== 'ALL') {
      this.rusaList = this.tempList.filter(e => e.districtId === value);
    } else {
      this.rusaList = []
      this.rusaList = [...this.tempList]
    }
    this.handlePageChange(this.sharedService.page = 1)
  }
  getDetails() {
    var type = ''
    if (this.rusaForm.controls['aisheCode'].value) {
      type = this.rusaForm.controls['aisheCode'].value.toUpperCase().split(/[\W\d]+/).join("");
      if (type !== 'C' && type !== 'U') {
        this.notification.showValidationMessage('Please enter valid AISHE Code !!!');
        return;
      }
    } else {
      return;
    }


    this.masterService.getInstituteByAISHE(this.rusaForm.controls['aisheCode'].value, this.rusaForm.controls['stateId'].value, type).subscribe(res => {
      this.rusaForm.get('institutionNameAISHE')?.setValue(res.institutes ? res.institutes['0'].name : '')
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getRusaList() {
    this.getService.getRusaLegacyData('', this.stateCode, '', '').subscribe(res => {
      if (res && res.length) {
        this.rusaList = res;
        this.tempList = [...this.rusaList]
        this.componentNameMainArray = this.rusaList.filter(
          (thing, i, arr) => arr.findIndex(t => t.componentName?.trim() === thing.componentName?.trim()) === i
        );
        this.componentNameMainList = this.componentNameMainArray.slice()
      } else {
        this.rusaList = [];
        this.tempList = [];
        this.componentNameMainList = []
      }


      this.handlePageChange(this.sharedService.page = 1)
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getRusaListById(id) {
    this.getService.getRusaLisDoc(id).subscribe(res => {
      if (res?.document?.documentFile) {
        this.viewPdf(res?.document?.documentFile, res?.document?.name);

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
   replaceSpecialCharactersWithEncoded(input) {
    // Define a regular expression pattern to match special characters
    var pattern = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~]/g;

    // Use the replace method to replace special characters with their URL-encoded representations
    var encodedString = input.replace(pattern, function(match) {
        return encodeURIComponent(match);
    });

    return encodedString;
}
  saveRusa() {
    if (this.rusaForm.controls['isWholeProjectCompleted'].value === '') {
      this.notification.showValidationMessage('Please choose Whether project completed');
      return;
    }
    if (this.rusaForm.controls['isWholeProjectCompleted'].value) {
      this.rusaForm.get('isCompletionCertificateUploaded').setValue(true);
      this.rusaForm.get('percentageCompletionProject').setValue('')

    } else {
      this.rusaForm.get('isCompletionCertificateUploaded').setValue(false)
    }

    const formdata: FormData = new FormData();
    if (this.rusaForm.controls['isWholeProjectCompleted'].value) {
      // for (var i = 0; i < this.myFiles.length; i++) {
      //   formdata.append("file", this.myFiles[i]);
      // }
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
        if (this.myFilesName === '') {
          this.notification.showValidationMessage('Please upload document !!!')
          return;
        }
      }
    }

    if (this.rusaForm.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false
    }
    let institutionName = '';
    if(this.rusaForm.controls['institutionName'].value){
      const text = this.rusaForm.controls['institutionName'].value
      institutionName = text.replace(/&/gi, "and")
    }
    // let remarks:''
    // if(this.rusaForm.controls['remarks'].value){
    //   const text1 = this.rusaForm.controls['remarks'].value
    //   const chars = {
    //     '&':'%26',
    //     '/':'%2F',
    //     '%':'%25',
    //     '?':'%3F',
    //     ':':'%3A'
    //   }
    //   s = text1.replace(/[abc]/g, m => chars[m]);
    //   remarks = text1.replace(/&/gi, "%26")
    //   remarks = text1.replace('/',"%2F")
    //   remarks  =text1
    // }
    
  

  
   
  
    let payload = {
      isCompletionCertificateUploaded: this.rusaForm.controls['isCompletionCertificateUploaded'].value,
      percentageCompletionProject: this.rusaForm.controls['percentageCompletionProject'].value,
      isWholeProjectCompleted: this.rusaForm.controls['isWholeProjectCompleted'].value,
      centralShareApproved: this.rusaForm.controls['centralShareApproved'].value,
      centralShareReleased: this.rusaForm.controls['centralShareReleased'].value,
      centralShareUtilised: this.rusaForm.controls['centralShareUtilised'].value,
      stateShareApproved: this.rusaForm.controls['stateShareApproved'].value,
      stateShareReleased: this.rusaForm.controls['stateShareReleased'].value,
      stateShareUtilised: this.rusaForm.controls['stateShareUtilised'].value,
      totalAmountApproved: this.rusaForm.controls['totalAmountApproved'].value,
      totalAmountReleased: this.rusaForm.controls['totalAmountReleased'].value,
      totalUtilisation: this.rusaForm.controls['totalUtilisation'].value,
      aisheCode: this.rusaForm.controls['aisheCode'].value ? this.rusaForm.controls['aisheCode'].value : '',
      districtId: this.rusaForm.controls['districtId'].value ? this.rusaForm.controls['districtId'].value : '',
      institutionName: this.rusaForm.controls['institutionName'].value ? this.replaceSpecialCharactersWithEncoded(this.rusaForm.controls['institutionName'].value) : '',
      id: this.rusaForm.controls['id'].value,
      componentId: this.rusaForm.controls['componentId'].value,
      stateId: this.rusaForm.controls['stateId'].value ? this.rusaForm.controls['stateId'].value : '',
      rusaPhase: this.rusaForm.controls['rusaPhase'].value,
      documentId: this.rusaForm.controls['documentId'].value ? this.rusaForm.controls['documentId'].value : 0,
      componentName: this.rusaForm.controls['componentName'].value,
      remarks: this.replaceSpecialCharactersWithEncoded(this.rusaForm.controls['remarks'].value)

    }
    this.postService.saveRusaLegacy(payload, formdata, this.common.Menu['10'].value).subscribe(res => {
      if (res.status === 200) {
        this.getRusaList()
        this.myFiles = [];
        this.myFilesName = ''
        this.changeDoc = false
        this.notification.showSuccess();
        this.addUpdate = "Add"
        this.rusaForm.reset();
        this.rusaForm.get('id')?.setValue(0)
        this.rusaForm.get('isWholeProjectCompleted')?.setValue(false)
        this.rusaForm.get('isCompletionCertificateUploaded')?.setValue(false)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  reset() {
    this.rusaForm.reset();
    this.rusaForm.get('id')?.setValue(0)
    this.rusaForm.get('isWholeProjectCompleted')?.setValue(false)
    this.rusaForm.get('isCompletionCertificateUploaded')?.setValue(false)
    this.rusaForm.get('documentId')?.setValue(0)
  }
  close() {
    this.rusaForm.reset();
    this.rusaForm.get('id')?.setValue(0)
    this.rusaForm.get('isWholeProjectCompleted')?.setValue(false)
    this.rusaForm.get('isCompletionCertificateUploaded')?.setValue(false)
    this.rusaForm.get('documentId')?.setValue(0)
    this.addUpdate = 'Add'
  }
  getFieldValidation(value) {
    if (value) {
      this.rusaForm.get('percentageCompletionProject').clearValidators();
      this.rusaForm.get('percentageCompletionProject').updateValueAndValidity();
      this.rusaForm.get('percentageCompletionProject').setValue(null);
    } else {
      this.rusaForm.get('percentageCompletionProject').setValidators(Validators.required);
      this.rusaForm.get('percentageCompletionProject').updateValueAndValidity();
    }
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }
  async updateResults() {
    this.rusaList = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.institutionName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.aisheCode?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.rusaPhase?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.centralShareApproved?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.centralShareReleased?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.centralShareUtilised?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateShareApproved?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateShareReleased?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateShareUtilised?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalAmountApproved?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalAmountReleased?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalUtilisation?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))

      }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.rusaList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.rusaList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.rusaList.length - 1);
    }

  }
  lock() {
    for (let index = 0; index < this.rusaList.length; index++) {
      if (this.rusaList[index].isUpdated === false) {
        this.notification.showValidationMessage('Please save your details !!!');
        return;
      }
    }
    this.postService.lockRusaLegecy(this.common.Menu['10'].value,).subscribe(res => {
      if (res.status === 200) {
        this.getPageStatusList()
        this.notification.showSuccessMessage(this.sharedService.locked)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }
}
