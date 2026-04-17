import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-view-state-profile',
  templateUrl: './view-state-profile.component.html',
  styleUrls: ['./view-state-profile.component.scss']
})
export class ViewStateProfileComponent implements OnInit {
  public routers: typeof routes = routes;
  stateProfileList = [];
  basicDetails: any
  dataForm: FormGroup;
  meetingDate1: any;
  meetingDate2: any;
  meetingDate3: any;
  meetingDate4: any;
  meetingDate5: any;
  statePopulations: any;
  gerEnrollmentData: any;
  institutionNoEnrolments: any;
  GPI: any;
  PTR: any;
  accreditationData: any;
  naacAcc: Array<any> = [];
  naacAccData: any;
  expenditureOnHigherEducations: any;
  totalAGrade: any = 0;
  totalAPlusGrade: any = 0;
  totalAPlusPlusGrade: any = 0;
  totalBGrade: any = 0;
  totalBPlusGrade: any = 0;
  totalBPlusPlusGrade: any = 0;
  totalCGrade: any = 0;
  districtList: any;
  focusList: any=[];
  sessionStorage: any;
  districtIndicator: Array<any> = [];
  focusDistrictIndicator: any;
  focusDistrictHigherEducation: Array<any> = [];
  districtNameData: any;
  myFilesName: any;
  documentOfDpr: any;
  changeDoc: any;
  myFiles: any[];
  uploadedMedia: any[];
  fileSizeExceed: boolean;
  notification: any;
  blob: any
  tab: any
  GPIYear: any;
  PTRYear: any;
  rusaList: any;
  source: any;
  year: any;
  totalDistrict: any;
  focusDistrict: any;
  addRemarks: string;
  userTypeId: string;
  userAisheState:string
  consultantComment: any;
  constructor(public apiSerevice: ApiService, public fb: FormBuilder, public common: Common, public masterService: MasterService,
    public getSrevice: GetService, public getService: GetService,public router: Router,public sharedService:SharedService
  ) { }


  ngOnInit(): void {
    this.getStateProfile();
    this.getnaacAccreditation();
    this.getDistrict();
    this.getFocusDis();
    this.getDistrictIndicator();
    this.addRemarks = sessionStorage.getItem('addRemarks');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.userAisheState= sessionStorage.getItem('userAisheState');
    this.consultantComment = sessionStorage.getItem('consultantComment')

  }
  getStateProfile() {
    this.getService.getstateProfile().subscribe(
      (res) => {
        if(res.data){
          this.basicDetails = res.data;
          if (res.data.lastFiveMeetingsShec) {
            if (res.data.lastFiveMeetingsShec.length >= 1) {
              this.meetingDate1 = res.data.lastFiveMeetingsShec['0'].meetingDate1;
              this.meetingDate2 = res.data.lastFiveMeetingsShec['1'].meetingDate2;
              this.meetingDate3 = res.data.lastFiveMeetingsShec['2'].meetingDate3;
              this.meetingDate4 = res.data.lastFiveMeetingsShec['3'].meetingDate4;
              this.meetingDate5 = res.data.lastFiveMeetingsShec['4'].meetingDate5;
  
              if (res.data.stateHeiDataGpiPtrRatios.length !== 0) {
                let gpi = res.data.stateHeiDataGpiPtrRatios.filter(
                  (ele) => ele.indicator.id === 3
                );
                this.GPI = gpi['0'].ratio
                this.GPIYear = gpi['0'].year
  
              }
              if (res.data.stateHeiDataGpiPtrRatios.length !== 0) {
                let ptr = res.data.stateHeiDataGpiPtrRatios.filter(
                  (ele) => ele.indicator.id === 4
                );
                this.PTR = ptr['0'].ratio
                this.PTRYear = ptr['0'].year
              }
            }
          }
  
          this.statePopulations = res.data.statePopulations;
          this.source = res.data.statePopulations['0'].source;
          this.year = res.data.statePopulations['0'].year;
          this.rusaList = res.data.rusaLegacyData;
          this.gerEnrollmentData = res.data.stateHeiDataGerEnrollments;
          this.institutionNoEnrolments = res.data.stateHeiNumberCountEnrollments;
  
          this.naacAccData = res.data.stateNaacAccreditationDetailsNew;
          this.naacAccData["0"]["type"] = "State Govt. Universities";
          this.naacAccData["1"]["type"] = "State Govt. Colleges";
          this.naacAccData["2"]["type"] = "Private (aided) Colleges";
          this.totalAgrade('grade');
          this.totalAPlusgrade('grade');
          this.totalAPlusPlusgrade('grade');
          this.totalBgrade('grade');
          this.totalBPlusgrade('grade');
          this.totalBPlusPlusgrade('grade');
          this.totalCgrade('grade');
  
          this.expenditureOnHigherEducations = res.data.stateExpenditureOnHigherEducations;
          this.focusDistrictIndicator = res.data.focusDistrictIndicatorDataNew;
  
          if (res.data.higherEducationData.district.length >= 1) {
            this.focusDistrictHigherEducation = res.data.higherEducationData.district;
  
          };
  
          if (res.data.stateProfileDocument && res.data.stateProfileDocument) {
            this.myFilesName = res.data.stateProfileDocument.documentType.documentName;
            this.documentOfDpr = res.data.stateProfileDocument.documentFile;
            this.myFilesName = res.data.stateProfileDocument.documentName;
          }
        }
        

      },
      (err) => { }
    );
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



  getnaacAccreditation() {
    this.getService.getAccreditation().subscribe((res) => {
      this.accreditationData = res.map((v) => ({ ...v, value: 0 }));
    });
  }
  
  // downloadPdf(): void {
  //   let dataObj={window}
  //   this.downoloadPdfFileService.downloadPDF(dataObj);

  // };

  downloadPdfAisheCode() {
    let payload = {
      stateCode: sessionStorage.getItem('stateCodeP'),
      componentId: '',
      type: 'PDF',
      aisheCode: '',
      districtCode: '',
    }
    this.getService.downloadByAisheCode(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)
       
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getDistrict() {
    this.masterService.getDistrictList(sessionStorage.getItem("stateCodeP")).subscribe(
      (res) => {
        this.districtList = res;
      },
      (err) => { }
    );
  }

  getFocusDis() {
    var num=0;
  
    this.getSrevice.getFocusDistrict(sessionStorage.getItem("stateCodeP")).subscribe(
      (res) => {
        if (res.list && res.list.length) {
          this.totalDistrict = res.list.length;
            for (let i = 0; i < res.list.length; i++) {
            if (res.list[i].focus) {
             this.focusList.push(res.list[i]);
            }            
          }
        }
        
        this.focusDistrict =this.focusList.length;       
      },
      (err) => { }
    );
  }
  getDistrictIndicator() {
    this.districtIndicator = []
    this.apiSerevice.districtIndicator().subscribe(
      (res) => {
        this.districtIndicator = res;
      },
      (err) => { }
    );
  }

  totalAgrade(event: any) {
    this.totalAGrade = this.naacAccData['0'].a + this.naacAccData['1'].a + this.naacAccData['2'].a
  }
  totalAPlusgrade(event: any) {
    this.totalAPlusGrade = this.naacAccData['0'].aplus + this.naacAccData['1'].aplus + this.naacAccData['2'].aplus
  }
  totalAPlusPlusgrade(event: any) {
    this.totalAPlusPlusGrade = this.naacAccData['0'].aplusplus + this.naacAccData['1'].aplusplus + this.naacAccData['2'].aplusplus
  }
  totalBgrade(event: any) {
    this.totalBGrade = this.naacAccData['0'].b + this.naacAccData['1'].b + this.naacAccData['2'].b
  }
  totalBPlusgrade(event: any) {
    this.totalBPlusGrade = this.naacAccData['0'].bplus + this.naacAccData['1'].bplus + this.naacAccData['2'].bplus
  }
  totalBPlusPlusgrade(event: any) {
    this.totalBPlusPlusGrade = this.naacAccData['0'].bplusplus + this.naacAccData['1'].bplusplus + this.naacAccData['2'].bplusplus
  }
  totalCgrade(event: any) {
    this.totalCGrade = this.naacAccData['0'].c + this.naacAccData['1'].c + this.naacAccData['2'].c
  }

  remarks() {
    let payload = {
      aisheCode: this.userAisheState,
      componentId: null,
      consultantStatus: this.addRemarks === 'true'?true:false,
      consultantComment:this.consultantComment
    }
    this.common.remarks(payload).subscribe(res => {
      if (res) {
        sessionStorage.removeItem('addRemarks');
          this.router.navigate([this.routers.stateprofilescrutiny])
      }
    })
  }
}
