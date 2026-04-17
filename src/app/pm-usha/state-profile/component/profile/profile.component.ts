import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {FormBuilder,FormGroup,Validators,} from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { Subject } from "rxjs/internal/Subject";

import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { NotificationService } from "src/app/service/notification.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import {AppDateAdapter,APP_DATE_FORMATS,} from "src/app/utility/format-datepicker.service";

@Component({
  selector: "cfs-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class ProfileComponent implements OnInit {
  type: any;
  showDate: boolean = false;
  gpiRatio: any;
  dataForm: FormGroup;
  date:any
  stateCategoryList: Array<any> = [];

  pipe = new DatePipe("en-US");
  date1: any;
  heiData: any;
  gpi: Array<any> = [];
  ptr: Array<any> = [];
  showErrorMessageGPi: boolean = false;
  showErrorMessagePtr: boolean = false;
  addUpdateGPI: string = "Add";
  addUpdateptr: string = "Add";
  selectedIndex: any = null;
  year: Array<any> = ["2020-21"];
  stateName: string;
  disabledPage: boolean = false;
  stateCode: any
  stateCategoryName: any;
  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  isFormInvalid: boolean = false
  myFileArray:any
  userTypeId: string;
  constructor(
    public apiSerevice: ApiService, public fb: FormBuilder, public notification: NotificationService,
    public sharedService: SharedService, public common: Common, public getService: GetService) {
    this.stateCode = sessionStorage.getItem('stateCode')
    this.userTypeId=sessionStorage.getItem('userTypeId')
    //  if(sessionStorage.getItem('stateP')){
    //   this.disabledPage = true
    //   // sessionStorage.setItem('roleName','State Approving Authority(SAA)');
    //   // let stCode = sessionStorage.getItem('stateCodeP');
    //   this.stateCode = sessionStorage.getItem('stateCodeP')
    //   // sessionStorage.setItem('stateCode',stCode);
    //   this.sharedService.setSidebarChanges('State Approving Authority(SAA)');
    //  }else{
    //   this.stateCode = sessionStorage.getItem('stateCode')
    this.getPageStatusList();
    //  }
    this.getStateCategory();
    this.getStateProfies();


  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      remarks:['',[]],
      id: 0,
      nameState: { value: sessionStorage.getItem("stateName"), disabled: true },
      categoryofState: ['', []],
      fundingRatiounderPMUSHA: [null, []],
      Centre: ['', []],
      State: ['', []],
      statehaveSHEC: [null, [Validators.required]],
      dateofFormation: ['', []],
      formedthroughAct: ['', []],
      sHECUploadDocument: ['', []],
      roleofSHECunderPMUSHA: ['', []],
      datesofmeetings1: '',
      datesofmeetings2: '',
      datesofmeetings3: '',
      datesofmeetings4: '',
      datesofmeetings5: '',
      GenderParityIndex: [null, [Validators.required,Validators.maxLength(5)]],
      gPiId: [0, []],
      pupilRatio: [null, [Validators.required]],
      ptrId: [0, []],
      gpiYears: ["0", Validators.required],
      ptrYears: ["0", Validators.required],
    });

  }
  getPageStatusList() {
    this.apiSerevice.getPageStatus('').subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].page === this.common.briefStateProfile) {
            this.disabledPage = true
            this.sharedService.setMenu(true)
          }
          // if (res.data[index].moduleName === this.common.stateAtGlance) {
          //   this.disabledPage = true
          // }
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  addGPI(): void {
    let array = [];
    if (this.dataForm.value.gpiYears === "0") {
      this.notification.showValidationMessage("Please select year !!!");
      return;
    }
    if (this.addUpdateGPI === "Update") {
      const index = this.gpi.findIndex(
        (obj) => obj.year === this.dataForm.value.gpiYears
      );
      if (index !== -1) {
        if (index !== this.selectedIndex) {
          array = this.gpi.filter(
            (ele) => ele.year === this.dataForm.value.gpiYears
          );
        }
        if (array.length !== 0) {
          this.showErrorMessageGPi = true;
          setTimeout(() => {
            this.showErrorMessageGPi = false;
          }, 8000);

          return;
        }
        this.gpi[this.selectedIndex].id = this.dataForm.value.gPiId;
        (this.gpi[this.selectedIndex].indicator = {
          id: 3,
          indicatorName: "GPI",
        }),
          (this.gpi[this.selectedIndex].ratio =
            this.dataForm.value.GenderParityIndex.toString()),
          (this.gpi[this.selectedIndex].stateCode =
            sessionStorage.getItem("stateCode")),
          (this.gpi[this.selectedIndex].year = this.dataForm.value.gpiYears);
        this.notification.showSuccess();
        this.selectedIndex = null;
        this.addUpdateGPI = "Add";
        this.dataForm.get("gpiYears")?.setValue("");
        this.dataForm.get("gPiId")?.setValue(0);
        this.dataForm.get("GenderParityIndex")?.setValue("");
        this.dataForm.get("gpiYears")?.setValue("0");
      }
    } else {
      array = this.gpi.filter(
        (ele) => ele.year === this.dataForm.value.gpiYears
      );
      if (array.length !== 0) {
        this.showErrorMessageGPi = true;
        setTimeout(() => {
          this.showErrorMessageGPi = false;
        }, 8000);

        return;
      }
      this.gpi.push({
        id: 0,
        indicator: { id: 3, indicatorName: "GPI" },
        ratio: this.dataForm.value.GenderParityIndex.toString(),
        stateCode: sessionStorage.getItem("stateCode"),
        year: this.dataForm.value.gpiYears,
      });
    }
  }

  editGPi(data: any, i: number): void {
    this.addUpdateGPI = "Update";
    this.selectedIndex = i;
    this.dataForm.get("gPiId")?.setValue(data.id);
    this.dataForm.get("gpiYears")?.setValue(data.year);
    this.dataForm.get("GenderParityIndex")?.setValue(data.ratio);
  }
  addptr(): void {
    let array = [];
    if (this.dataForm.value.ptrYears === "0") {
      this.notification.showValidationMessage("Please select year !!!");
      return;
    }
    if (this.addUpdateptr == "Update") {
      const index = this.ptr.findIndex(
        (ele) => ele.year === this.dataForm.value.ptrYears
      );
      if (index !== -1) {
        if (index !== this.selectedIndex) {
          array = this.ptr.filter(
            (ele) => ele.year === this.dataForm.value.ptrYears
          );
        }
        if (array.length !== 0) {
          this.showErrorMessageGPi = true;
          setTimeout(() => {
            this.showErrorMessageGPi = false;
          }, 8000);

          return;
        }
        this.ptr[this.selectedIndex].id = this.dataForm.value.gPiId;
        (this.ptr[this.selectedIndex].indicator = {
          id: 4,
          indicatorName: "PTR",
        }),
          (this.ptr[this.selectedIndex].ratio =
            this.dataForm.value.pupilRatio.toString()),
          (this.ptr[this.selectedIndex].stateCode =
            sessionStorage.getItem("stateCode")),
          (this.ptr[this.selectedIndex].year = this.dataForm.value.ptrYears);
        this.notification.showSuccess();
        this.selectedIndex = null;
        this.addUpdateptr = "Add";
        this.dataForm.get("ptrYears")?.setValue("");
        this.dataForm.get("ptrId")?.setValue(0);
        this.dataForm.get("pupilRatio")?.setValue("");
        this.dataForm.get("ptrYears")?.setValue("0");
      }
    } else {
      array = this.ptr.filter((ele) => ele.year === this.dataForm.value.ptrYears);
      if (array.length !== 0) {
        this.showErrorMessagePtr = true;
        setTimeout(() => {
          this.showErrorMessagePtr = false;
        }, 8000);
        return;
      }

      this.ptr.push({
        id: 0,
        indicator: { id: 4, indicatorName: "PTR" },
        ratio: this.dataForm.value.pupilRatio.toString(),
        stateCode: sessionStorage.getItem("stateCode"),
        year: this.dataForm.value.ptrYears,
      });
    }

  }

    onKeypressEvent(event, inputLength) {
      if (event.target.value.length + 1 > inputLength) {
        event.preventDefault();
      }
    }
    


  editPTR(data: any, i: number): void {
    this.addUpdateptr = "Update";
    this.selectedIndex = i;
    this.dataForm.get("ptrId")?.setValue(data.id);
    this.dataForm.get("ptrYears")?.setValue(data.year);
    this.dataForm.get("pupilRatio")?.setValue(data.ratio);
  }

  getStateProfies() {
    this.getService.getProfile(this.stateCode).subscribe(
      (res) => {
        if (res.data !== null) {
          this.dataForm.controls["categoryofState"].setValue(
            res.data.stateCategoryId
          );
          this.stateCategoryName = res.data.stateCategory.categoryName;
          let ratio = res.data.fundingRatio;
          this.dataForm.get('fundingRatiounderPMUSHA')?.setValue(ratio)
          if (ratio) {
            let a = ratio.split(":");
            this.dataForm.controls["Centre"].setValue(a["0"]);
            this.dataForm.controls["State"].setValue(a["1"]);
          }
          this.dataForm.controls["roleofSHECunderPMUSHA"].setValue(res.data.roleOfShec);
          this.dataForm.controls["remarks"].setValue(res.data.remarks);
          this.dataForm.controls["statehaveSHEC"].setValue(res.data.isShec);
          if (res.data.shecDate) {
            var dateAsString1 = res.data.shecDate;
            let split_dateAsString1 = dateAsString1.split("/");
            let final_format1 = new Date(
              `${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`
            );
            this.dataForm.get("dateofFormation")?.setValue(final_format1);
          }
          if (res.data.lastFiveMeetingsShec) {
            if (res.data.lastFiveMeetingsShec.length >= 1) {
              if(res.data.lastFiveMeetingsShec['0'].meetingDate1.trim("") !== ''){
                var dateAsString2 =
                res.data.lastFiveMeetingsShec["0"].meetingDate1.trim("");
              let split_dateAsString2 = dateAsString2.split("/");
              let final_format2 = new Date(
                `${split_dateAsString2[2]}-${split_dateAsString2[1]}-${split_dateAsString2[0]}`
              );
              this.dataForm.get("datesofmeetings1")?.setValue(final_format2);
              }else{
                this.dataForm.get("datesofmeetings1")?.setValue('');
              }
              
            }
          }
          if (res.data.lastFiveMeetingsShec) {
            if (res.data.lastFiveMeetingsShec.length >= 2) {
              if(res.data.lastFiveMeetingsShec['1'].meetingDate2.trim("") !== ''){
              var dateAsString3 =
                res.data.lastFiveMeetingsShec["1"].meetingDate2.trim("");
              let split_dateAsString3 = dateAsString3.split("/");
              let final_format3 = new Date(
                `${split_dateAsString3[2]}-${split_dateAsString3[1]}-${split_dateAsString3[0]}`
              );
              this.dataForm.get("datesofmeetings2")?.setValue(final_format3);
            }else{
              this.dataForm.get("datesofmeetings2")?.setValue('');
            }
          }
        }
          if (res.data.lastFiveMeetingsShec) {
            if (res.data.lastFiveMeetingsShec.length >= 3) {
              if(res.data.lastFiveMeetingsShec['2'].meetingDate3.trim("") !== ''){
              var dateAsString4 =
                res.data.lastFiveMeetingsShec["2"].meetingDate3.trim("");
              let split_dateAsString4 = dateAsString4.split("/");
              let final_format4 = new Date(
                `${split_dateAsString4[2]}-${split_dateAsString4[1]}-${split_dateAsString4[0]}`
              );
              this.dataForm.get("datesofmeetings3")?.setValue(final_format4);
            }else{
              this.dataForm.get("datesofmeetings3")?.setValue('');

            }
          }
        }
          if (res.data.lastFiveMeetingsShec) {
            if (res.data.lastFiveMeetingsShec.length >= 4) {
              if(res.data.lastFiveMeetingsShec['3'].meetingDate4.trim("") !== ''){
              var dateAsString5 =
                res.data.lastFiveMeetingsShec["3"].meetingDate4.trim("");
              let split_dateAsString5 = dateAsString5.split("/");
              let final_format5 = new Date(
                `${split_dateAsString5[2]}-${split_dateAsString5[1]}-${split_dateAsString5[0]}`
              );
              this.dataForm.get("datesofmeetings4")?.setValue(final_format5);
            }else{
              this.dataForm.get("datesofmeetings4")?.setValue('');
            }
          
          }
        }
          if (res.data.lastFiveMeetingsShec) {
            if (res.data.lastFiveMeetingsShec.length === 5) {
              if(res.data.lastFiveMeetingsShec['4'].meetingDate5.trim("") !== ''){
              var dateAsString6 =
                res.data.lastFiveMeetingsShec["4"].meetingDate5.trim("");
              let split_dateAsString6 = dateAsString6.split("/");
              let final_format6 = new Date(
                `${split_dateAsString6[2]}-${split_dateAsString6[1]}-${split_dateAsString6[0]}`
              );
              this.dataForm.get("datesofmeetings5")?.setValue(final_format6);
            }else{
              this.dataForm.get("datesofmeetings5")?.setValue('');
            }
          }
        }
          this.dataForm.controls["formedthroughAct"].setValue(
            res.data?.isFormedThroughActOrNotification.trim("")
          );
          this.dataForm.controls["id"].setValue(res.data.id);

          if (res.data.stateHeiDataGpiPtrRatios.length !== 0) {
            let gpi = res.data.stateHeiDataGpiPtrRatios.filter(
              (ele) => ele.indicator.id === 3
            );
            this.dataForm.get('gPiId')?.setValue(gpi['0'].id)
            this.dataForm.get('GenderParityIndex')?.setValue(gpi['0'].ratio)
            this.dataForm.get('gpiYears')?.setValue(gpi['0'].year)
          }
          if (res.data.stateHeiDataGpiPtrRatios.length !== 0) {
            let ptr = res.data.stateHeiDataGpiPtrRatios.filter(
              (ele) => ele.indicator.id === 4
            );
            this.dataForm.get('ptrId')?.setValue(ptr['0'].id)
            this.dataForm.get('pupilRatio')?.setValue(ptr['0'].ratio)
            this.dataForm.get('ptrYears')?.setValue(ptr['0'].year)
          }
          if (!this.changeDoc) {
            this.myFilesName = res.data.stateProfileDocument?.documentName;
            
            if (res.data.stateProfileDocument?.documentFile) {
              this.myFileArray = res.data.stateProfileDocument?.documentFile
              this.downloadPdf(res.data.stateProfileDocument?.documentFile);

            }
          }
        }
      },
      (err) => { }
    );
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
  getStateCategory() {
    this.apiSerevice.stateCategory().subscribe(
      (res) => {
        this.stateCategoryList = res;
      },
      (err) => { }
    );
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
  save(locked:boolean) {
    if (this.dataForm.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
    }
    
    
    
    const formdata: FormData = new FormData();
    let remarks='';
    let roleofSHECunderPMUSHA = ''
    let date1 = '';
    let date2 = '';
    let date3 = '';
    let date4 = '';
    let date5 = '';
    let dateofFormation = '';
    if (this.dataForm.controls['statehaveSHEC'].value) {
      const input2 = document.getElementById(
        'roleofSHECunderPMUSHA',
      ) as HTMLInputElement | null;
      
      if (input2 != null) {
        roleofSHECunderPMUSHA =input2.value
      }
      if (this.fileSizeExceed) {
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
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
      if(this.myFilesName =''){
        this.notification.showValidationMessage('Please upload document !!!')
        return;
      }
    if (this.dataForm.controls["dateofFormation"].value) {
      let day: string = this.dataForm.controls["dateofFormation"].value
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.dataForm.controls["dateofFormation"].value.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year = this.dataForm.controls["dateofFormation"].value.getFullYear();
      dateofFormation = `${day}/${month}/${year}`;
      dateofFormation.toString();
    } else {
      dateofFormation = '';
    }
  
    if (this.dataForm.controls["datesofmeetings1"].value) {
      let day: string = this.dataForm.controls["datesofmeetings1"].value
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.dataForm.controls["datesofmeetings1"].value.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year = this.dataForm.controls["datesofmeetings1"].value.getFullYear();
      date1 = `${day}/${month}/${year}`;
      date1.toString();
    } else {
      date1 = '';
    }
    if (this.dataForm.controls["datesofmeetings2"].value) {
      let day: string = this.dataForm.controls["datesofmeetings2"].value
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.dataForm.controls["datesofmeetings2"].value.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year = this.dataForm.controls["datesofmeetings2"].value.getFullYear();
      date2 = `${day}/${month}/${year}`;
      date2.toString();
    } else {
      date2 = '';
    }
    if (this.dataForm.controls["datesofmeetings3"].value) {
      let day: string = this.dataForm.controls["datesofmeetings3"].value
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.dataForm.controls["datesofmeetings3"].value.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year = this.dataForm.controls["datesofmeetings3"].value.getFullYear();
      date3 = `${day}/${month}/${year}`;
      date3.toString();
    } else {
      date3 = '';
    }
    if (this.dataForm.controls["datesofmeetings4"].value) {
      let day: string = this.dataForm.controls["datesofmeetings4"].value
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.dataForm.controls["datesofmeetings4"].value.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year = this.dataForm.controls["datesofmeetings4"].value.getFullYear();
      date4 = `${day}/${month}/${year}`;
      date4.toString();
    } else {
      date4 = '';
    }
    if (this.dataForm.controls["datesofmeetings5"].value) {
      let day: string = this.dataForm.controls["datesofmeetings5"].value
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.dataForm.controls["datesofmeetings5"].value.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year = this.dataForm.controls["datesofmeetings5"].value.getFullYear();
      date5 = `${day}/${month}/${year}`;
      date5.toString();
    } else {
      date5 = '';
    }
    remarks='';
    this.date = {
      datesofmeetings1: date1,
      datesofmeetings2: date2,
      datesofmeetings3: date3,
      datesofmeetings4: date4,
      datesofmeetings5: date5,
      dateofFormation: dateofFormation,
    };
  }else{
    this.dataForm.get('dateofFormation')?.setValue('');
    this.dataForm.get('formedthroughAct')?.setValue('');
    roleofSHECunderPMUSHA='';
    this.date = {
      datesofmeetings1: '',
      datesofmeetings2: '',
      datesofmeetings3: '',
      datesofmeetings4: '',
      datesofmeetings5: '',
      dateofFormation: '',
    };
    const input1 = document.getElementById(
      'remarks',
    ) as HTMLInputElement | null;
    
    if (input1 != null) {
      remarks =input1.value
    
    }
  }
    

    this.dataForm.value.fundingRatiounderPMUSHA =
      this.dataForm.controls["Centre"].value +
      ":" +
      this.dataForm.controls["State"].value;

    let categoryofState = this.stateCategoryList.find(
      (ele) =>
        ele.categoryName.toString() === this.stateCategoryName
    );
    
    this.apiSerevice
      .postBasicState(this.dataForm.value, this.date, categoryofState, this.common.Menu['0'].value, formdata, this.stateCode,roleofSHECunderPMUSHA,remarks,locked)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            // this.getStateProfies();
            this.saveGenderParityIndex(locked);
           
            // this.notification.showSuccess();
          }
        },
        (err) => { }
      );
  }

  saveGenderParityIndex(locked): void {
    if (this.dataForm.controls['ptrYears'].value === '0') {
      this.notification.showValidationMessage('Please select year !!!');
      return;
    }
    if (this.dataForm.controls['gpiYears'].value === '0') {
      this.notification.showValidationMessage('Please select year !!!');
      return;
    }
    let temp = [];
    temp.push({
      id: this.dataForm.controls['ptrId'].value,
      indicator: {
        id: 4,
        indicatorName: "PTR",
      },
      ratio: this.dataForm.controls['pupilRatio'].value,
      stateCode: sessionStorage.getItem("stateCode"),
      year: this.dataForm.controls['ptrYears'].value
    });



    temp.push({
      id: this.dataForm.controls['gPiId'].value,
      indicator: {
        id: 3,
        indicatorName: "GPI",
      },
      ratio: this.dataForm.controls['GenderParityIndex'].value,
      stateCode: sessionStorage.getItem("stateCode"),
      year: this.dataForm.controls['gpiYears'].value,
    });


    let payload = {
      stateHeiDataGpiPtrRatios: temp,
    };

    this.apiSerevice.saveBasicdata(payload).subscribe(
      (res) => {
        if (res.status === 200) {
          this.getStateProfies();
          if(locked){
            this.getPageStatusList()
            this.notification.showSuccessMessage(this.sharedService.locked)
          }else{
            this.notification.showSuccess();
          }
        }
      },
      (err) => { }
    );
  }

 
  onChange(e: any): void {
    if (e) {
      this.dataForm.get('dateofFormation')?.setValidators(Validators.required)
      this.dataForm.get('dateofFormation')?.updateValueAndValidity();
      this.dataForm.get('formedthroughAct')?.setValidators(Validators.required)
      this.dataForm.get('formedthroughAct')?.updateValueAndValidity();
      this.dataForm.get('roleofSHECunderPMUSHA')?.setValidators(Validators.required)
      this.dataForm.get('roleofSHECunderPMUSHA')?.updateValueAndValidity()
      this.dataForm.get('remarks')?.clearValidators()
      this.dataForm.get('remarks')?.updateValueAndValidity();
    } else {
      this.dataForm.get('remarks')?.setValidators(Validators.required)
      this.dataForm.get('remarks')?.updateValueAndValidity();
      this.dataForm.get('dateofFormation')?.clearValidators()
      this.dataForm.get('dateofFormation')?.updateValueAndValidity()
      this.dataForm.get('formedthroughAct')?.clearValidators()
      this.dataForm.get('formedthroughAct')?.updateValueAndValidity()
      this.dataForm.get('roleofSHECunderPMUSHA')?.clearValidators()
      this.dataForm.get('roleofSHECunderPMUSHA')?.updateValueAndValidity()
      this.dataForm.get('datesofmeetings1')?.clearValidators()
      this.dataForm.get('datesofmeetings1')?.updateValueAndValidity()
      this.dataForm.get('datesofmeetings2')?.clearValidators()
      this.dataForm.get('datesofmeetings2')?.updateValueAndValidity()
      this.dataForm.get('datesofmeetings3')?.clearValidators()
      this.dataForm.get('datesofmeetings3')?.updateValueAndValidity()
      this.dataForm.get('datesofmeetings4')?.clearValidators()
      this.dataForm.get('datesofmeetings4')?.updateValueAndValidity()
      this.dataForm.get('datesofmeetings5')?.clearValidators()
      this.dataForm.get('datesofmeetings5')?.updateValueAndValidity()
      
    }

  }
  
  reset() {
    this.dataForm.reset();
    this.dataForm.get('gpiYears')?.setValue('0'),
      this.dataForm.get('ptrYears')?.setValue('0'),
      this.dataForm.get('ptrId')?.setValue(0),
      this.dataForm.get('gPiId')?.setValue(0),
      this.dataForm.get('id').setValue(0),
      this.dataForm.get('nameState').setValue(sessionStorage.getItem("stateName"))
  }
}
