import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { PmushaService } from 'src/app/pm-usha/ipmr/service/pmusha.service';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { ShareReplayService } from 'src/app/service/share-replay.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-outcome-achivement-summary',
  templateUrl: './outcome-achivement-summary.component.html',
  styleUrls: ['./outcome-achivement-summary.component.scss']
})
export class OutcomeAchivementSummaryComponent implements OnInit {

  panelOpenState = true;
    basicDetailsEditView = true;
    public routers: typeof routes = routes;
    aisheCode: any;
    instituteCategory: any;
    documentOfDpr: string;
    myFiles: any[];
    myFilesName: string;
    uploadedMedia: any[];
    fileSizeExceed: boolean;
    blob: any;
    tab: any
    componentId: any;
    insType: string;
    stateCode: any = 'ALL';
    organogramDoc: any;
    organogramFile: any;
    districtCode: any;
    addRemarks: any
    userTypeId: string;
    consultantRemarks: string;
    propOutcomeData: Array<any> = [];
    basicNaacScoreDetails: any;
    userId: string;
    userName:any;
    consultantUserId: string;
    basicNaacDistrictCode: any;
    studentTeacherRatio: any;
    assignView:boolean=false
    pmushaUniqueCode: number;
    hiddenValue:boolean=true;
    infraConstructionList: any;
    itemList: any[];
    renovatedList: any;
    equipmentList: any;
    softComponentList: any;
    targetNumber: any;
    getpropOutcomeData: any;
    instituteName: string;
    getremarkData:  any[]=[];
    arrMonths: any = [];
    arrYears: any = [];
    instuteNameUpdate: any;
    monthList: any[];
    month: string = "ALL";
    modiefiedMonth: any;
    year:any = "";
    isView: boolean = false;
    variables: Array<any> = [];
    otherDPRReviseData: any;
    myFilesNameDpr: any;
    documentUpload: any;
    tabIndex:any;
    filterStateListArr: Array<any> = [];
    stateListArr: Array<any> = [];
    stateName:any = 'ALL';
    componentList:Array<any> =[];
    componetName:any;
    stateList2: any;
    filterStateList: any;
    meruOutcomeData:Array<any> = [];
    univOutcomeData:Array<any> = [];
    collegeOutcomeData:Array<any> = [];
    equityOutcomeData:Array<any> = [];
    nmdcOutcomeData:Array<any> = [];
    groupedData: any[] = [];
    selectedStateCode: any;
    meruTemplateArr: any;
    univeTemplateArr: any;
    collegeTemplateArr: any;
    equityTemplateArr: any;
    meruId: any;
    univId: any;
    collegeId: any;
    equityId: any;
    nmdcId: any;
    OutcomeIndicator13: any;
    OutcomeIndicator15: any;
    TotalPaperPublished: any;
    TotalPaperPublishedBaseYear: any;
    TotalPaperPublishedTarget31032024: any;
    TotalPaperPublishedTarget31032025: any;
    TotalPaperPublishedTarget31032026: any;
    ClosePannel: boolean = false;
    isPanelOpenMulti: boolean;
    isPanelOpenUniv:boolean;
    isPanelOpenCollege:boolean;
    isPanelOpenGender:boolean;
    isPanelOpenNMDC:boolean;
    componetNameFilter: any;
    componentShowMeru:boolean = true;
    componentShowUniv:boolean = true;
    componentShowCollege:boolean = true;
    componentShowEquity:boolean = true;
    componentShowNMDC:boolean = true;
    instituteList: any[];
    instuteShow: boolean;
    districtShow: boolean;
    DistrictList: any;
    instituteNameFilter: any;
    districtNameFilter: any;
    filterInstituteList: Array<any> = [];
    DistrictListFilter: Array<any> = [];
    instuteInformation: any[];
    instuteaisheCode: any;
    instuteCatogory: any;
    instuteName: any;
    NameOfDistrict: any;
    NameOfState: any;
    instituteMeruList: any[];
    collegeList: any[];
    instituteUnivList: any[];
    DistrictEquityList: any;
    isDisable: boolean;
    dataOutComeList: any[];
    getTargetData:Array<any> = [];
    univOutcomeData1: any;
    count = 0
  meruOutcomeData1: any;
  collegeOutcomeData1: any;
  equityOutcomeData1: any;
  nmdcOutcomeData1: any;
  instituteListTag: any;
  instituteUnivListTag: any;
  instituteListMeruTag: any;
  instituteMeruListTag: any;
  instituteListCollegeTag: any;
  collegeListTag: any;
  DistrictListTag: any;
  DistrictEquityListTag: any;
  DistrictNMDCListTag: any;
  DistrictListNMDC: any;
  fullArrMonths: { monthCode: string; name: string; lastDate: string; }[];
    constructor(public api: ApiService, public dialog: MatDialog, public common: Common, public sharedService: SharedService, public router: Router,
      public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, public getpmService: PmushaService, public shareData: ShareReplayService) {
      this.componentId = '2';
      this.aisheCode = '';
      this.stateCode = 'ALL'
      this.insType = this.aisheCode.split(/[\W\d]+/).join("");
      if (this.insType === "C") {
        this.instituteCategory = "COLLEGE";
      } else {
        this.instituteCategory = "UNIVERSITY";
      }
      this.tabIndex = this.route.snapshot.paramMap.get('tabIndex');
      this.districtCode = sessionStorage.getItem("districtCode");
      this.addRemarks = sessionStorage.getItem('addRemarks');
      this.userTypeId = sessionStorage.getItem('userTypeId');
      this.userName = sessionStorage.getItem('userName');
      this.instituteName = sessionStorage.getItem('insName')
      if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
        this.userId = sessionStorage.getItem('userName')
      }
      if(this.userTypeId === sharedService.userTypeList['0'].id  || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id){
        this.assignView = true
      }
      if (this.userTypeId === sharedService.userTypeList['1'].id) {
        this.stateName = sessionStorage.getItem("stateCode")
        // this.selectedStateCode = value;
        this.componetNameFilter = 'ALL';
        this.ChangesComponentNameSelection('ALL');
        this.instituteList = [];
        this.instituteMeruList = [];
        this.instituteUnivList = [];
        this.collegeList = [];
        this.filterInstituteList = [];
        // this.filterStateListArr = [];
        this.DistrictList = [];
        this.DistrictEquityList = [];
        this.DistrictListFilter = [];
        this.instituteNameFilter = '';
        this.districtNameFilter = '';
        this.isPanelOpenMulti = false;
        this.isPanelOpenUniv = false;
        this.isPanelOpenCollege = false;
        this.isPanelOpenGender = false;
        this.isPanelOpenNMDC = false;
        this.instuteaisheCode = '';
        this.instuteCatogory = '';
        this.instuteName = '';
        this.NameOfState = '';
        this.NameOfDistrict = '';
        this.isDisable = true
      }
       this.arrMonths = [
      // { monthCode: '1', name: 'January', lastDate: '31' },
      // { monthCode: '2', name: 'February', lastDate: '28' },
      // { monthCode: '3', name: 'March', lastDate: '31' },
      // { monthCode: '4', name: 'April', lastDate: '30' },
      // { monthCode: '5', name: 'May', lastDate: '31' },
      // { monthCode: '6', name: 'June', lastDate: '30' },
      // { monthCode: '7', name: 'July', lastDate: '31' },
      // { monthCode: '8', name: 'August', lastDate: '31' },
      // { monthCode: '9', name: 'September', lastDate: '30' },
      { monthCode: '10', name: 'October', lastDate: '31' },
      { monthCode: '11', name: 'November', lastDate: '30' },
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
     this.fullArrMonths = [
      { monthCode: 'ALL', name: '--ALL--', lastDate: null },
      { monthCode: '1', name: 'January', lastDate: '31' },
      { monthCode: '2', name: 'February', lastDate: '28' },
      { monthCode: '3', name: 'March', lastDate: '31' },
      { monthCode: '4', name: 'April', lastDate: '30' },
      { monthCode: '5', name: 'May', lastDate: '31' },
      { monthCode: '6', name: 'June', lastDate: '30' },
      { monthCode: '7', name: 'July', lastDate: '31' },
      { monthCode: '8', name: 'August', lastDate: '31' },
      { monthCode: '9', name: 'September', lastDate: '30' },
      { monthCode: '10', name: 'October', lastDate: '31' },
      { monthCode: '11', name: 'November', lastDate: '30' },
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
    this.arrYears = [
      { year: '2024' },
      { year: '2025' }
    ]
  
    }
  
    ngOnInit(): void {
      
      this.getSateDataList()
      this.componentIdList()
      this.loadOutcomeMonths()
    }

    loadOutcomeMonths() {
      this.getService.getOutComeTarget('').subscribe((res: any) => {
        if (res?.status === 200 && Array.isArray(res.data)) {

          const apiData = res.data;

          // Full month reference
          const monthMaster = [
            { monthCode: '1', name: 'January', lastDate: '31' },
            { monthCode: '2', name: 'February', lastDate: '28' },
            { monthCode: '3', name: 'March', lastDate: '31' },
            { monthCode: '4', name: 'April', lastDate: '30' },
            { monthCode: '5', name: 'May', lastDate: '31' },
            { monthCode: '6', name: 'June', lastDate: '30' },
            { monthCode: '7', name: 'July', lastDate: '31' },
            { monthCode: '8', name: 'August', lastDate: '31' },
            { monthCode: '9', name: 'September', lastDate: '30' },
            { monthCode: '10', name: 'October', lastDate: '31' },
            { monthCode: '11', name: 'November', lastDate: '30' },
            { monthCode: '12', name: 'December', lastDate: '31' },
          ];

          // Extract unique month numbers from API response
          const uniqueMonths = [...new Set(apiData.map(x => x.month))];

          // Convert unique API months → your month format
          const finalMonths = uniqueMonths
            .map(m => monthMaster.find(mm => mm.monthCode === String(m)))
            .filter(x => !!x); // remove nulls
          const sortedMonths = finalMonths.sort((a, b) => Number(a.monthCode) - Number(b.monthCode));
          // Add ALL option at top
          this.fullArrMonths = [
            // { monthCode: 'ALL', name: '--ALL--', lastDate: null },
            ...sortedMonths
          ];

        } else {
          this.fullArrMonths = [
            // { monthCode: 'ALL', name: '--ALL--', lastDate: null }
          ];
        }
      });
    }

  
    ChangesCurrentMonth(changeValue: any) {
      // let modyMonth = this.arrMonths.filter(m => parseInt(m.monthCode) === parseInt(changeValue));
      // this.modiefiedMonth = modyMonth[0].name
      // this.state = changeValue;
      this.componetNameFilter = 'ALL';
      this.ChangesComponentNameSelection('ALL');
      this.instituteList = [];
      this.instituteMeruList = [];
      this.instituteUnivList = [];
      this.collegeList = [];
      this.filterInstituteList = [];
      // this.filterStateListArr = [];
      this.DistrictList = [];
      this.DistrictEquityList = [];
      this.DistrictListFilter = [];
      this.instituteNameFilter = '';
      this.districtNameFilter = '';
      this.isPanelOpenMulti = false;
      this.isPanelOpenUniv = false;
      this.isPanelOpenCollege = false;
      this.isPanelOpenGender = false;
      this.isPanelOpenNMDC = false;
      this.instuteaisheCode = '';
      this.instuteCatogory = '';
      this.instuteName = '';
      this.NameOfState = '';
      this.NameOfDistrict = '';
    }
  
  ChangesYears(data: any) {

    this.monthList = [];
    this.month = '';
    if (data.value === '2024') {
   
      this.monthList = this.arrMonths;
    }
    else if (data.value === '2025') {
      this.monthList = this.fullArrMonths
   }

  }  
  
    find(month, year){
      if (month && year){
        this.isView = true;
      }
      else {
        this.notification.showValidationMessage("Month and Year Field are Mandantory !!!")
        this.isView = false;
      }
    }
    download1(activityId) {
      let payload = {
        meruActivityId: activityId,
        aisheCode: this.aisheCode,
        componentId: this.sharedService.meruComponentId,
        documentType: this.common.meruDoc,
      }
      this.common.downloadPDF(payload)
    }
  
    getDocument() {
      let payload = {
        aisheCode: this.aisheCode,
        componentId: this.componentId,
        documentType: this.common.organogram,
      }
      this.common.downloadPDFProposal(payload).then((result: any) => {
        this.organogramDoc = result.name
        this.organogramFile = result.file
      })
    }
  
    download() {
      this.common.viewPdf(this.organogramFile, this.organogramDoc)
    }
  
    downloadPdf(data: any) {
      let uint8_data = _base64ToArrayBuffer(data);
      var ba = new Uint8Array(uint8_data);
      this.blob = new Blob([ba], { type: "application/pdf" });
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
  
    getRusaListById(id) {
      this.getService.getRusaLisDoc(id).subscribe(res => {
        if (res?.document?.documentFile) {
          this.viewPdf(res?.document?.documentFile, res?.document?.name);
  
        }
      }, err => {
  
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
    }

  getOutComeIndicator(propId:any, compId:any) {
    this.getService.getProposedCome().subscribe(

      (res) => {
        this.dataOutComeList = []
        res.forEach((e: any) => {
          if (e.targetType === 'float') {
            e.targetType = 'number'
          } if (e.baseYearType === 'float') {
            e.baseYearType = 'number'
          }
          if (this.insType === 'C') {
            if (e.isStrengthenCollegeIndicator) {

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
          } else {
            if (e.isStrengthenUniversityIndicator) {
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
          }

        });
        this.getCollegeOutcomeData(compId)
        // this.collegeId = compId
        //  this.getProposedOutcomeData(propId)
      },
      (error) => { }
    );

  }
  
    printThisPage() {
      window.print();
    };
  
    handlePageChange(arg0: number) {
      throw new Error('Method not implemented.');
    }
  
    downloadPdfAisheCode() {
      let payload = {
        componentId: this.componentId,
        exportType: 'PDF',
        aisheCode: this.aisheCode,
        districtCode: '',
        revisedProposal : true
      }
      this.getService.downloadByAisheCodeRevision(payload).subscribe(res => {
        if (res) {
          this.common.viewPdf(res.byteData, res.name)
          
        }
      }, err => {
  
      })
    }
  
    downloadPdfAisheCode2() {
      let payload = {
        stateCode: '',
        componentId: this.componentId,
        type: 'PDF',
        aisheCode: this.aisheCode,
        districtCode: '',
      }
      this.getService.downloadByAisheCode1(payload).subscribe(res => {
        if (res) {
          this.common.viewPdf(res.byteData, res.name)
        }
      }, err => {
  
      })
    }
  
  
    getbasicScoreDetails() {
      this.getService.getBasicDetails(this.aisheCode, this.instituteCategory, this.componentId).subscribe((res) => {
        if (res.status == 200) {
          
          this.instuteNameUpdate = res?.data.name;
          this.basicNaacScoreDetails = res?.data
          this.basicNaacDistrictCode = res?.data?.proposalDistrictId;
          this.studentTeacherRatio = res?.data?.studentTeacherRatio;
          if (this.basicNaacScoreDetails?.accrediationScoreWebsite == null && this.basicNaacScoreDetails?.multiDisciplinaryComment == null) {
            this.basicDetailsEditView = false;
          }
        }
  
      }, err => {
  
      })
    }
    private formatDate(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    }
    isDisplay = true;
    toggleDisplay() {
      this.isDisplay = !this.isDisplay;
    }
  
    isDisplay2 = true;
    toggleDisplay2() {
      this.isDisplay2 = !this.isDisplay2;
    }
  
  
    // Code by date 28-12-2023
  
  
  
    resetSearch() {
      this.year = '';
      this.month = ''
      this.isView = false;
    }
  
    tabValue(compId){
      if (compId === 1) {
        this.getMeruOutcomeData(compId)
        this.meruId = compId
      }
      else if (compId === 2) {
        this.getUnivOutcomeData(compId)
        this.univId = compId
      }
      else if (compId === 3) {
        // this.getOutComeIndicator(11, compId)
        this.getCollegeOutcomeData(compId)
        this.collegeId = compId
      }
      else if (compId === 5) {
        this.getEquityOutcomeData(compId)
        this.equityId = compId
      }
      else if (compId === 4) {
        this.getNMDCOutcomeData(compId)
        this.nmdcId = compId
      }
      
    }
  
    getMeruOutcomeData(compId) {
      this.getService.getOutComeSummary('ALL', compId, '1', '1')
        .pipe(
          tap(res => {
              this.meruOutcomeData1 = res.data;
          }),
          switchMap(() => this.getService.getOutComeTarget(compId)),
          tap(res => {
            this.getTargetData = res.data;
            // overwrite with merged data
            this.meruOutcomeData1 = this.getMergedData(this.meruOutcomeData1);
            if (this.month !== 'ALL') {
                this.meruOutcomeData1 = this.meruOutcomeData1.filter(item =>
                  item.month == this.month
                );
            }
            if(this.stateName !== 'ALL' && (this.instituteNameFilter == "" || this.instituteNameFilter == "ALL")){
              this.meruOutcomeData = this.meruOutcomeData1.filter(item => (item.stateCode === this.stateName)) || [];
              const instituteNames = this.meruOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.aisheCode)) {
                  unique.push({
                    id: e.aisheCode,
                    institute: `${e.pabActionName}, ${e.stateName} - (${e.aisheCode})`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.instituteListMeruTag = instituteNames.filter(e => e.proposalActivityId)
              this.instituteMeruListTag = this.instituteListMeruTag
              this.instituteList = this.instituteListMeruTag
              this.instituteMeruList = instituteNames
              this.filterInstituteList = this.instituteListMeruTag.slice();
            }         
            else if (this.instituteNameFilter && this.instituteNameFilter != 'ALL'){
              this.meruOutcomeData = this.meruOutcomeData1.filter(item => (item.aisheCode === this.instituteNameFilter)) || [];
              this.instuteaisheCode = this.meruOutcomeData[0]?.aisheCode;
              this.instuteCatogory = this.meruOutcomeData[0]?.instituteCategory;
              this.instuteName = this.meruOutcomeData[0]?.pabActionName;
            }
            else{
              this.meruOutcomeData = this.meruOutcomeData1
              const instituteNames = this.meruOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.aisheCode)) {
                  unique.push({
                    id: e.aisheCode,
                    institute: `${e.pabActionName}, ${e.stateName} - (${e.aisheCode})`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.instituteListMeruTag = instituteNames.filter(e => e.proposalActivityId)
              this.instituteMeruListTag = this.instituteListMeruTag
              this.instituteList = this.instituteListMeruTag
              this.instituteMeruList = instituteNames
              this.filterInstituteList = this.instituteListMeruTag.slice();
            }
            const groupedData: { [key: number]: any } = {};
            this.meruOutcomeData.forEach((item) => {
              const outcomeId = item.outcomeIndicatorId;
              if (!groupedData[outcomeId]) {
                groupedData[outcomeId] = {
                  outcomeIndicatorName: item.outcomeIndicatorName,
                  baseYear: 0,
                  isProjectCompletedTarget31032024: 0,
                  isProjectCompletedTarget31032025: 0,
                  isProjectCompletedTarget31032026: 0,
                  targetFor2024: 0,
                  targetFor2025: 0,
                  targetFor2026: 0,
                };
              }
              groupedData[outcomeId].baseYear += isNaN(Number(item.baseYear))
              ? item.baseYear === "true"
                ? 1
                : 0
              : Number(item.baseYear);
              groupedData[outcomeId].isProjectCompletedTarget31032024 += isNaN(Number(item.isProjectCompletedTarget31032024))
                ? item.isProjectCompletedTarget31032024 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032024);
        
              groupedData[outcomeId].isProjectCompletedTarget31032025 += isNaN(Number(item.isProjectCompletedTarget31032025))
                ? item.isProjectCompletedTarget31032025 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032025);
        
              groupedData[outcomeId].isProjectCompletedTarget31032026 += isNaN(Number(item.isProjectCompletedTarget31032026))
                ? item.isProjectCompletedTarget31032026 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032026);
               groupedData[outcomeId].targetFor2024 += isNaN(Number(item.targetFor2024))
                ? item.targetFor2024 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2024);
        
              groupedData[outcomeId].targetFor2025 += isNaN(Number(item.targetFor2025))
                ? item.targetFor2025 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2025);
        
              groupedData[outcomeId].targetFor2026 += isNaN(Number(item.targetFor2026))
                ? item.targetFor2026 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2026);
            });
        
            this.meruOutcomeData = Object.values(groupedData).map((data: any) => ({
              ...data,
              total:
                data.isProjectCompletedTarget31032024 +
                data.isProjectCompletedTarget31032025 +
                data.isProjectCompletedTarget31032026 + data.targetFor2024 + data.targetFor2025 + data.targetFor2026,
            }));
          }),
          catchError(err => {
            // Handle errors here, perhaps logging them or showing a user-friendly message.
            return of(null);
          })
        ).subscribe();
    }
    
    getUnivOutcomeData(compId) {
      this.getService.getOutComeSummary('ALL', compId, '1', '1')
      .pipe(
        tap(res => {
          this.univOutcomeData1 = res.data;
        }),
        switchMap(() => this.getService.getOutComeTarget(compId)),
        tap(res => {
          this.getTargetData = res.data;
          // overwrite with merged data
          this.univOutcomeData1 = this.getMergedData(this.univOutcomeData1);
          if (this.month !== 'ALL') {
                this.univOutcomeData1 = this.univOutcomeData1.filter(item =>
                  item.month == this.month
                );
            }
          // now merged result will show here
            if(this.stateName !== 'ALL' && (this.instituteNameFilter == "" || this.instituteNameFilter == "ALL")){
            this.univOutcomeData = this.univOutcomeData1.filter(item => item.stateCode === this.stateName) || [];
            const instituteNames = this.univOutcomeData.reduce((unique, e) => {
              if (!unique.some(item => item.id === e.aisheCode)) {
                unique.push({
                  id: e.aisheCode,
                  institute: `${e.pabActionName}, ${e.stateName} - (${e.aisheCode})`,
                  proposalActivityId: e.proposalActivityId
                });
              }
              return unique;
            }, []);
            this.instituteListTag = instituteNames.filter(e => e.proposalActivityId)
            this.instituteUnivListTag = this.instituteListTag
            this.instituteList = this.instituteListTag
            this.instituteUnivList = instituteNames;
            this.filterInstituteList = this.instituteList.slice();
            }
            else if (this.instituteNameFilter && this.instituteNameFilter !== 'ALL'){
              this.univOutcomeData = this.univOutcomeData1.filter(item => (item.aisheCode === this.instituteNameFilter)) || [];
              this.instuteaisheCode = this.univOutcomeData[0]?.aisheCode;
              this.instuteCatogory = this.univOutcomeData[0]?.instituteCategory;
              this.instuteName = this.univOutcomeData[0]?.pabActionName;
            }
            else{
              this.univOutcomeData = this.univOutcomeData1
              const instituteNames = this.univOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.aisheCode)) {
                  unique.push({
                    id: e.aisheCode,
                    institute: `${e.pabActionName}, ${e.stateName} - (${e.aisheCode})`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.instituteListTag = instituteNames.filter(e => e.proposalActivityId)
              this.instituteUnivListTag = this.instituteListTag
              this.instituteList = this.instituteListTag
              this.instituteUnivList = instituteNames;
              this.filterInstituteList = this.instituteList.slice();
            }
            const groupedData: { [key: number]: any } = {};
            this.univOutcomeData.forEach((item) => {
              const outcomeId = item.outcomeIndicatorId;
              if (!groupedData[outcomeId]) {
                groupedData[outcomeId] = {
                  outcomeIndicatorName: item.outcomeIndicatorName,
                  baseYear: 0,
                  isProjectCompletedTarget31032024: 0,
                  isProjectCompletedTarget31032025: 0,
                  isProjectCompletedTarget31032026: 0,
                  targetFor2024: 0,
                  targetFor2025: 0,
                  targetFor2026: 0,
                };
              }

              groupedData[outcomeId].baseYear += isNaN(Number(item.baseYear))
                ? item.baseYear === "true"
                  ? 1
                  : 0
                : Number(item.baseYear);
        
              groupedData[outcomeId].isProjectCompletedTarget31032024 += isNaN(Number(item.isProjectCompletedTarget31032024))
                ? item.isProjectCompletedTarget31032024 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032024);
        
              groupedData[outcomeId].isProjectCompletedTarget31032025 += isNaN(Number(item.isProjectCompletedTarget31032025))
                ? item.isProjectCompletedTarget31032025 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032025);
        
              groupedData[outcomeId].isProjectCompletedTarget31032026 += isNaN(Number(item.isProjectCompletedTarget31032026))
                ? item.isProjectCompletedTarget31032026 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032026);
              groupedData[outcomeId].targetFor2024 += isNaN(Number(item.targetFor2024))
                ? item.targetFor2024 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2024);
        
              groupedData[outcomeId].targetFor2025 += isNaN(Number(item.targetFor2025))
                ? item.targetFor2025 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2025);
        
              groupedData[outcomeId].targetFor2026 += isNaN(Number(item.targetFor2026))
                ? item.targetFor2026 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2026);
            });
        
            this.univOutcomeData = Object.values(groupedData).map((data: any) => ({
              ...data,
              total:
                data.isProjectCompletedTarget31032024 +
                data.isProjectCompletedTarget31032025 +
                data.isProjectCompletedTarget31032026 + data.targetFor2024 + data.targetFor2025 + data.targetFor2026,
            }));
          }),
          catchError(err => {
            // Handle errors here, perhaps logging them or showing a user-friendly message.
            return of(null);
          })
        ).subscribe();
    }
    getCollegeOutcomeData(compId) {
      this.getService.getOutComeSummary('ALL', compId, '1', '1')
        .pipe(
          tap(res => {
           this.collegeOutcomeData1 = res.data;
          }),
          switchMap(() => this.getService.getOutComeTarget(compId)),
          tap(res => {
          this.getTargetData = res.data;
          // overwrite with merged data
          this.collegeOutcomeData1 = this.getMergedData(this.collegeOutcomeData1);
          if (this.month !== 'ALL') {
                this.collegeOutcomeData1 = this.collegeOutcomeData1.filter(item =>
                  item.month == this.month
                );
            }
            if(this.stateName !== 'ALL' && (this.instituteNameFilter == "" || this.instituteNameFilter == "ALL")){
              this.collegeOutcomeData = this.collegeOutcomeData1.filter(item => item.stateCode === this.stateName) || [];
              const instituteNames = this.collegeOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.aisheCode)) {
                  unique.push({
                    id: e.aisheCode,
                    institute: `${e.pabActionName}, ${e.stateName} - (${e.aisheCode})`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.instituteListCollegeTag = instituteNames.filter(e => e.proposalActivityId)
              this.collegeListTag = this.instituteListCollegeTag
              this.instituteList = this.instituteListCollegeTag
              this.collegeList = instituteNames;
              this.filterInstituteList = this.instituteList.slice();
            }
            else if (this.instituteNameFilter && this.instituteNameFilter !== 'ALL'){
              this.collegeOutcomeData = this.collegeOutcomeData1.filter(item => (item.aisheCode === this.instituteNameFilter)) || [];
              this.instuteaisheCode = this.collegeOutcomeData[0]?.aisheCode;
              this.instuteCatogory = this.collegeOutcomeData[0]?.instituteCategory;
              this.instuteName = this.collegeOutcomeData[0]?.pabActionName;
            }
            else{
              this.collegeOutcomeData = this.collegeOutcomeData1 || [];
              const instituteNames = this.collegeOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.aisheCode)) {
                  unique.push({
                    id: e.aisheCode,
                    institute: `${e.pabActionName}, ${e.stateName} - (${e.aisheCode})`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.instituteListCollegeTag = instituteNames.filter(e => e.proposalActivityId)
              this.collegeListTag = this.instituteListCollegeTag
              this.instituteList = this.instituteListCollegeTag
              this.collegeList = instituteNames;
              this.filterInstituteList = this.instituteList.slice();
            }
            const groupedData: { [key: number]: any } = {};

            this.collegeOutcomeData.forEach((item) => {
              const outcomeId = item.outcomeIndicatorId;
              if (!groupedData[outcomeId]) {
                groupedData[outcomeId] = {
                  outcomeIndicatorName: item.outcomeIndicatorName,
                  baseYear: isNaN(Number(item.baseYear)) ? (item.baseYear === "true" ? 1 : 0) : Number(item.baseYear),
                  isProjectCompletedTarget31032024: 0,
                  isProjectCompletedTarget31032025: 0,
                  isProjectCompletedTarget31032026: 0,
                  targetFor2024: 0,
                  targetFor2025: 0,
                  targetFor2026: 0,
                };
              }
        
              groupedData[outcomeId].isProjectCompletedTarget31032024 += isNaN(Number(item.isProjectCompletedTarget31032024))
                ? item.isProjectCompletedTarget31032024 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032024);
        
              groupedData[outcomeId].isProjectCompletedTarget31032025 += isNaN(Number(item.isProjectCompletedTarget31032025))
                ? item.isProjectCompletedTarget31032025 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032025);
        
              groupedData[outcomeId].isProjectCompletedTarget31032026 += isNaN(Number(item.isProjectCompletedTarget31032026))
                ? item.isProjectCompletedTarget31032026 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032026);
              groupedData[outcomeId].targetFor2024 += isNaN(Number(item.targetFor2024))
                ? item.targetFor2024 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2024);
        
              groupedData[outcomeId].targetFor2025 += isNaN(Number(item.targetFor2025))
                ? item.targetFor2025 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2025);
        
              groupedData[outcomeId].targetFor2026 += isNaN(Number(item.targetFor2026))
                ? item.targetFor2026 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2026);
            });
        
            this.collegeOutcomeData = Object.values(groupedData).map((data: any) => ({
              ...data,
              total:
                data.isProjectCompletedTarget31032024 +
                data.isProjectCompletedTarget31032025 +
                data.isProjectCompletedTarget31032026 + data.targetFor2024 + data.targetFor2025 + data.targetFor2026,
            }));
          }),
          catchError(err => {
            // Handle errors here, perhaps logging them or showing a user-friendly message.
            return of(null);
          })
        ).subscribe();
    }

    getMergedData(dataValue) {
      return dataValue.map(ele => {
        const match = this.getTargetData.find(obj =>
            obj.year &&
            obj.month &&
            ele.aisheCode === obj.aisheCode &&
            ele.componentId === obj.componentId &&
            ele.outcomeIndicatorId === obj.outcomeIndicatorId
         
        );

        return {
          ...ele,
          targetFor2024: match?.targetFor2024 || null,
          proposalActivityId: match?.proposalActivityId || null,
          targetFor2025: match?.targetFor2025 || null,
          targetFor2026: match?.targetFor2026 || null,
          year: match?.year || null,
          month: match?.month || null
        };
      });
    }
    getEquityOutcomeData(compId) {
      this.getService.getOutComeSummary('ALL', compId, '1', '1')
        .pipe(
          tap(res => {
            this.equityOutcomeData1 = res.data;
          }),
          switchMap(() => this.getService.getOutComeTarget(compId)),
          tap(res => {
          this.getTargetData = res.data;
          // overwrite with merged data
          this.equityOutcomeData1 = this.getMergedData(this.equityOutcomeData1);
          if (this.month !== 'ALL') {
                this.equityOutcomeData1 = this.equityOutcomeData1.filter(item =>
                  item.month == this.month
                );
            }
            if(this.stateName !== 'ALL' && (this.districtNameFilter == "" || this.districtNameFilter == "ALL")){
              this.equityOutcomeData = this.equityOutcomeData1.filter(item => item.stateCode === this.stateName) || [];
              const instituteNames = this.equityOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.districtCode)) {
                  unique.push({
                    id: e.districtCode,
                    district: `${e.districtName}`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.DistrictListTag = instituteNames.filter(e => e.id)
              this.DistrictEquityListTag = this.DistrictListTag;
              this.DistrictList =  this.DistrictListTag;
              this.DistrictEquityList = instituteNames;
              this.DistrictListFilter = this.DistrictList.slice();
            }
            else if (this.districtNameFilter && this.districtNameFilter !== 'ALL'){
              this.equityOutcomeData = this.equityOutcomeData1.filter(item => (item.districtCode === this.districtNameFilter)) || [];
              this.NameOfState = this.equityOutcomeData[0]?.stateName;
              this.NameOfDistrict = this.equityOutcomeData[0]?.districtName;
            }
            else{
              this.equityOutcomeData = this.equityOutcomeData1 || [];
              const instituteNames = this.equityOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.districtCode)) {
                  unique.push({
                    id: e.districtCode,
                    district: `${e.districtName} - (${e.stateName})`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.DistrictListTag = instituteNames.filter(e => e.id)
              this.DistrictEquityListTag = this.DistrictListTag;
              this.DistrictList = this.DistrictListTag
              this.DistrictEquityList = instituteNames;
              this.DistrictListFilter = this.DistrictList.slice();
            }
            const groupedData: { [key: number]: any } = {};

            this.equityOutcomeData.forEach((item) => {
              const outcomeId = item.outcomeIndicatorId;
              if (!groupedData[outcomeId]) {
                groupedData[outcomeId] = {
                  outcomeIndicatorName: item.outcomeIndicatorName,
                  baseYear: 0,
                  isProjectCompletedTarget31032024: 0,
                  isProjectCompletedTarget31032025: 0,
                  isProjectCompletedTarget31032026: 0,
                  targetFor2024: 0,
                  targetFor2025: 0,
                  targetFor2026: 0,
                };
              }

              groupedData[outcomeId].baseYear += isNaN(Number(item.baseYear))
              ? item.baseYear === "true"
                ? 1
                : 0
              : Number(item.baseYear);
        
              groupedData[outcomeId].isProjectCompletedTarget31032024 += isNaN(Number(item.isProjectCompletedTarget31032024))
                ? item.isProjectCompletedTarget31032024 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032024);
        
              groupedData[outcomeId].isProjectCompletedTarget31032025 += isNaN(Number(item.isProjectCompletedTarget31032025))
                ? item.isProjectCompletedTarget31032025 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032025);
        
              groupedData[outcomeId].isProjectCompletedTarget31032026 += isNaN(Number(item.isProjectCompletedTarget31032026))
                ? item.isProjectCompletedTarget31032026 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032026);
               groupedData[outcomeId].targetFor2024 += isNaN(Number(item.targetFor2024))
                ? item.targetFor2024 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2024);
        
              groupedData[outcomeId].targetFor2025 += isNaN(Number(item.targetFor2025))
                ? item.targetFor2025 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2025);
        
              groupedData[outcomeId].targetFor2026 += isNaN(Number(item.targetFor2026))
                ? item.targetFor2026 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2026);
            });
        
            this.equityOutcomeData = Object.values(groupedData).map((data: any) => ({
              ...data,
              total:
                data.isProjectCompletedTarget31032024 +
                data.isProjectCompletedTarget31032025 +
                data.isProjectCompletedTarget31032026 + data.targetFor2024 + data.targetFor2025 + data.targetFor2026,
            }));
          }),
          catchError(err => {
            // Handle errors here, perhaps logging them or showing a user-friendly message.
            return of(null);
          })
        ).subscribe();
    }
    getNMDCOutcomeData(compId) {
      this.getService.getOutComeSummary('ALL', compId, '1', '1')
        .pipe(
          tap(res => {
            this.nmdcOutcomeData1 = res.data;
          }),
          switchMap(() => this.getService.getOutComeTarget(compId)),
          tap(res => {
          this.getTargetData = res.data;
          // overwrite with merged data
          this.nmdcOutcomeData1 = this.getMergedData(this.nmdcOutcomeData1);
            if (this.month !== 'ALL') {
                this.nmdcOutcomeData1 = this.nmdcOutcomeData1.filter(item =>
                  item.month == this.month
                );
            }
            if(this.stateName !== 'ALL' && (this.districtNameFilter == "" || this.districtNameFilter == "ALL")){
              this.nmdcOutcomeData = this.nmdcOutcomeData1.filter(item => item.stateCode === this.stateName) || [];
              const instituteNames = this.nmdcOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.districtCode)) {
                  unique.push({
                    id: e.districtCode,
                    district: `${e.districtName}`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.DistrictListTag = instituteNames.filter(e => e.id)
              this.DistrictNMDCListTag = this.DistrictListTag;
              this.DistrictList = this.DistrictNMDCListTag
              this.DistrictListNMDC = instituteNames
              this.DistrictListFilter = this.DistrictList.slice();
            }
            else if (this.districtNameFilter && this.districtNameFilter !== 'ALL'){
              this.nmdcOutcomeData = this.nmdcOutcomeData1.filter(item => (item.districtCode === this.districtNameFilter)) || [];
              this.NameOfState = this.nmdcOutcomeData[0]?.stateName;
              this.NameOfDistrict = this.nmdcOutcomeData[0]?.districtName;
            }
            else{
              this.nmdcOutcomeData = this.nmdcOutcomeData1 || [];
              const instituteNames = this.nmdcOutcomeData.reduce((unique, e) => {
                if (!unique.some(item => item.id === e.districtCode)) {
                  unique.push({
                    id: e.districtCode,
                    district: `${e.districtName} - (${e.stateName})`,
                    proposalActivityId: e.proposalActivityId
                  });
                }
                return unique;
              }, []);
              this.DistrictListTag = instituteNames.filter(e => e.id)
              this.DistrictNMDCListTag = this.DistrictListTag;
              this.DistrictList = this.DistrictNMDCListTag
              this.DistrictListNMDC = instituteNames
              this.DistrictListFilter = this.DistrictList.slice();
            }
            const groupedData: { [key: number]: any } = {};

            this.nmdcOutcomeData.forEach((item) => {
              const outcomeId = item.outcomeIndicatorId;
              if (!groupedData[outcomeId]) {
                groupedData[outcomeId] = {
                  outcomeIndicatorName: item.outcomeIndicatorName,
                  baseYear: 0,
                  isProjectCompletedTarget31032024: 0,
                  isProjectCompletedTarget31032025: 0,
                  isProjectCompletedTarget31032026: 0,
                  targetFor2024: 0,
                  targetFor2025: 0,
                  targetFor2026: 0,
                };
              }
              groupedData[outcomeId].baseYear += isNaN(Number(item.baseYear))
              ? item.baseYear === "true"
                ? 1
                : 0
              : Number(item.baseYear);

              groupedData[outcomeId].isProjectCompletedTarget31032024 += isNaN(Number(item.isProjectCompletedTarget31032024))
                ? item.isProjectCompletedTarget31032024 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032024);
        
              groupedData[outcomeId].isProjectCompletedTarget31032025 += isNaN(Number(item.isProjectCompletedTarget31032025))
                ? item.isProjectCompletedTarget31032025 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032025);
        
              groupedData[outcomeId].isProjectCompletedTarget31032026 += isNaN(Number(item.isProjectCompletedTarget31032026))
                ? item.isProjectCompletedTarget31032026 === "true"
                  ? 1
                  : 0
                : Number(item.isProjectCompletedTarget31032026);
               groupedData[outcomeId].targetFor2024 += isNaN(Number(item.targetFor2024))
                ? item.targetFor2024 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2024);
        
              groupedData[outcomeId].targetFor2025 += isNaN(Number(item.targetFor2025))
                ? item.targetFor2025 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2025);
        
              groupedData[outcomeId].targetFor2026 += isNaN(Number(item.targetFor2026))
                ? item.targetFor2026 === "true"
                  ? 1
                  : 0
                : Number(item.targetFor2026);
            });
        
            this.nmdcOutcomeData = Object.values(groupedData).map((data: any) => ({
              ...data,
              total:
                data.isProjectCompletedTarget31032024 +
                data.isProjectCompletedTarget31032025 +
                data.isProjectCompletedTarget31032026 + data.targetFor2024 + data.targetFor2025 + data.targetFor2026,
            }));
          }),
          catchError(err => {
            // Handle errors here, perhaps logging them or showing a user-friendly message.
            return of(null);
          })
        ).subscribe();
    }
  
  
    getDprDocuemnt(newDprFileId:any){
      let payload:any={
        aisheCode:this.aisheCode,
        documentTypeId:13,
        documentId:newDprFileId
      }
      this.getpmService.getDPRDoc(payload).subscribe((res) => {
        this.otherDPRReviseData = res.data[0]
        if (res.data && res.data.length) {
          this.myFilesNameDpr = this.otherDPRReviseData.name;
          this.documentOfDpr = this.otherDPRReviseData.documentFile;
        }
      }, (err) => { });
    }

  
    getRemarkData(propId) {
      this.getService.getRemarkList(propId, this.componentId, this.aisheCode).subscribe(
        (res) => {
          this.getremarkData = res.data
        },
        (err) => { }
      );
    }
  
  
    back(){
      if(this.tabIndex == 0 || this.tabIndex == 2){
        sessionStorage.setItem('back','true')
        this.router.navigate([this.routers.viewReport, this.tabIndex])
      }
      else{
        sessionStorage.setItem('back','true')
        sessionStorage.setItem('back','true')
        this.router.navigate([this.routers.Reports])
      }
    }
    downloadReport(){
      let payload = {
        stateCode: '',
        componentId: this.componentId,
        type: 'PDF',
        aisheCode: this.aisheCode,
        districtCode: '',
      }
      this.getService.downloadReportUniversity(payload).subscribe(res => {
        if (res) {
          this.common.viewPdf(res.byteData, res.name)
        }
      }, err => {
  
      })
    }

    componentFilterChanges(value: any) {
      this.instituteNameFilter = value
      this.isPanelOpenMulti = false;
      this.isPanelOpenUniv = false;
      this.isPanelOpenCollege = false;
      this.isPanelOpenGender = false;
      this.isPanelOpenNMDC = false;
      this.instuteaisheCode = '';
      this.instuteCatogory = '';
      this.instuteName = '';
      this.NameOfState = '';
      this.NameOfDistrict = '';
    }

    districtFilterChanges(value: any) {
      this.districtNameFilter = value
      this.isPanelOpenMulti = false;
      this.isPanelOpenUniv = false;
      this.isPanelOpenCollege = false;
      this.isPanelOpenGender = false;
      this.isPanelOpenNMDC = false;
    }
    
    stateFilterChanges(value: any) {
      this.selectedStateCode = value;
      this.componetNameFilter = 'ALL';
      this.ChangesComponentNameSelection('ALL');
      this.instituteList = [];
      this.instituteMeruList = [];
      this.instituteUnivList = [];
      this.collegeList = [];
      this.filterInstituteList = [];
      // this.filterStateListArr = [];
      this.DistrictList = [];
      this.DistrictEquityList = [];
      this.DistrictListFilter = [];
      this.instituteNameFilter = '';
      this.districtNameFilter = '';
      this.isPanelOpenMulti = false;
      this.isPanelOpenUniv = false;
      this.isPanelOpenCollege = false;
      this.isPanelOpenGender = false;
      this.isPanelOpenNMDC = false;
      this.instuteaisheCode = '';
      this.instuteCatogory = '';
      this.instuteName = '';
      this.NameOfState = '';
      this.NameOfDistrict = '';
    }

    getSateDataList() {
      this.shareData.getStateData().subscribe((res) => {
        this.stateList2 = res;
        this.stateListArr = res
        this.filterStateList = this.stateList2.slice();
        this.filterStateListArr = this.stateListArr.slice()
      }, () => { })
    }

    componentIdList(){
      this.getService.getComponent().subscribe((res=>{
        this.componentList = res
        this.componentList = this.componentList.splice(0,5)
    
      }))
    }

    ChangesComponentNameSelection(e: any) {
      this.isPanelOpenMulti = false;
      this.isPanelOpenUniv = false;
      this.isPanelOpenCollege = false;
      this.isPanelOpenGender = false;
      this.isPanelOpenNMDC = false;
      if (e === 'ALL') {
        this.componentShowMeru = true;
        this.componentShowUniv = true;
        this.componentShowCollege = true;
        this.componentShowEquity = true;
        this.componentShowNMDC = true;
        this.instuteShow = false;
        this.districtShow = false;
        this.instituteNameFilter = '';
        this.districtNameFilter = '';
        this.instuteaisheCode = '';
        this.instuteCatogory = '';
        this.instuteName = '';
        this.NameOfState = '';
        this.NameOfDistrict = '';
      } else {
        this.componentShowMeru = e === 1;
        this.componentShowUniv = e === 2;
        this.componentShowCollege = e === 3;
        this.componentShowEquity = e === 5;
        this.componentShowNMDC = e === 4;
        if (this.componentShowMeru) {
          this.getMeruOutcomeData(e)
          this.instuteShow = true;
          this.districtShow = false;
          this.instituteNameFilter = '';
          this.districtNameFilter = '';
          this.instuteaisheCode = '';
          this.instuteCatogory = '';
          this.instuteName = '';
          this.NameOfState = '';
          this.NameOfDistrict = '';
        }
        else if (this.componentShowUniv) {
          this.getUnivOutcomeData(e)
          this.instuteShow = true;
          this.districtShow = false;
          this.instituteNameFilter = '';
          this.districtNameFilter = '';
          this.instuteaisheCode = '';
          this.instuteCatogory = '';
          this.instuteName = '';
          this.NameOfState = '';
          this.NameOfDistrict = '';
        }
        else if (this.componentShowCollege) {
          this.getCollegeOutcomeData(e)
          this.instuteShow = true;
          this.districtShow = false;
          this.instituteNameFilter = '';
          this.districtNameFilter = '';
          this.instuteaisheCode = '';
          this.instuteCatogory = '';
          this.instuteName = '';
          this.NameOfState = '';
          this.NameOfDistrict = '';
        }
        else if (this.componentShowEquity) {
          this.getEquityOutcomeData(e)
          this.instuteShow = false;
          this.districtShow = true;
          this.instituteNameFilter = '';
          this.districtNameFilter = '';
          this.instuteaisheCode = '';
          this.instuteCatogory = '';
          this.instuteName = '';
          this.NameOfState = '';
          this.NameOfDistrict = '';
        }
        else if (this.componentShowNMDC) {
          this.getNMDCOutcomeData(e)
          this.instuteShow = false;
          this.districtShow = true;
          this.instituteNameFilter = '';
          this.districtNameFilter = '';
          this.instuteaisheCode = '';
          this.instuteCatogory = '';
          this.instuteName = '';
          this.NameOfState = '';
          this.NameOfDistrict = '';
        }
      }
    }

    clearAll(){
      if (this.userTypeId !== this.sharedService.userTypeList['1'].id) {
        this.stateName = 'ALL';
      }
      this.componetNameFilter = 'ALL';
      this.ChangesComponentNameSelection('ALL');
      this.instituteList = [];
      this.instituteMeruList = [];
      this.instituteUnivList = [];
      this.collegeList = [];
      this.filterInstituteList = [];
      this.DistrictList = [];
      this.DistrictEquityList = [];
      this.DistrictListFilter = [];
      // this.filterStateListArr = []
      this.instituteNameFilter = '';
      this.districtNameFilter = '';
      this.isPanelOpenMulti = false;
      this.isPanelOpenUniv = false;
      this.isPanelOpenCollege = false;
      this.isPanelOpenGender = false;
      this.isPanelOpenNMDC = false;
      this.instuteaisheCode = '';
      this.instuteCatogory = '';
      this.instuteName = '';
      this.NameOfState = '';
      this.NameOfDistrict = '';
      
   }
  
  }
  
  
  
