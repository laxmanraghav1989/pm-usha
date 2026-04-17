import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';
import { ApiService } from 'src/app/service/api.service';
import { ExcelService } from 'src/app/service/excel.service';
import { ShareReplayService } from 'src/app/service/share-replay.service';

@Component({
  selector: 'cfs-comparison-data',
  templateUrl: './comparison-data.component.html',
  styleUrls: ['./comparison-data.component.scss']
})
export class ComparisonDataComponent implements OnInit {

  checkedStateName: boolean = false;
  arrMonths: any = [];
  monthList: any[] = [];
  monthListFirstData: any = [];
  monthListFirstData1: any = [];
  yearFirst: any;
  monthFirstData: any;
  year: any;
  month: any;
  rusaProgressList: any = [];
  tempListFirst: any = [];
  rusaProgressListSecond: any = [];
  tempList: Array<any> = [];
  searchText: any;
  stateCode: any;
  userTypeId: any;
  filterStateList: Array<any> = [];
  stateList: Array<any> = [];
  userId: string | null;
  arrYears1: any = [];
  modiefiedMonth: any;
  stateName: any;
  projectStatusList: any = [];
  @Input() noteData: string; 
 //  @Input() passValue1;
  getLockList: any;
  arrYears: Array<any> = [];
  yearSecond: any;
  StateGroup: any = true;
  componentList: any;
  componentId:any;
  currentYear = new Date().getFullYear().toString();
  currentMonth: number = new Date().getMonth() + 1;
  constructor(
    public sharedService: SharedService,
    public dialog: MatDialog,
    private masterService: MasterService,
    public getService: GetService,
    public errorMatcher: CustomErrorStateMatcher,
    public postService: PostService,
    public common: Common,
    public notification: NotificationService,
    public viewportScroller: ViewportScroller,
    public api: ApiService, private excelService: ExcelService, public shareData: ShareReplayService
  ) {
    this.userTypeId = sessionStorage.getItem("userTypeId");
    this.userId = sessionStorage.getItem("userName");
    this.stateCode = sessionStorage.getItem("stateCode");
    this.arrMonths = [
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
    //  { year: '2023' },
     { year: '2024' },
     { year: '2025' },
     { year: '2026' },
   ]
  //  this.stateName = this.stateCode;
    this.StateGroup = this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id
  
  }

  ngOnInit(): void {
   this.resetSearch();
   this.getSateData();
   this.getComponentList()
   // this.getLockStatus();
   if ( this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id){
    this.stateName = this.stateCode
   
  }
  else{
    this.stateName = ''
  }
  }

  getLockStatus(e:any) {
  }

  ChangesYears1(data: any) {
   this.monthListFirstData = [];
   this.monthFirstData = "";
   this.year = data.value; // Store selected year
     if (this.year === '2023') {
       this.monthListFirstData = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
     }
     else if (this.year === '2024') {
       this.monthListFirstData = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
     } 
     else if (this.year === '2025') {
       this.monthListFirstData = this.arrMonths;
     }
    else if (this.year === '2026') {
       this.monthListFirstData = this.arrMonths;
     }

     this.handlePageChange((this.sharedService.page = 1));
 }

 ChangesYears(data: any) {
   this.monthList = [];
   this.month = "";
   this.yearSecond = data.value; // Store selected year
     if (this.yearSecond === '2023') {
       this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
     }
     else if (this.yearSecond === '2024') {
       this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
     } 
     else if (this.yearSecond === '2025') {
       this.monthList = this.arrMonths;
     }
    else if (this.yearSecond === '2026') {
       this.monthList = this.arrMonths;
     }

     this.handlePageChange((this.sharedService.page = 1));
 }

  sortData(arr) {
    return arr.sort((a, b) => {
      return a.month - b.month;
    });
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange((this.sharedService.page = 1));
  }
  find() {

    if (!this.stateName) {
      this.notification.showValidationMessage("Please select state ");
      return;
    }

    let state = this.stateName;
    if (!this.yearFirst && !this.monthFirstData && !this.yearSecond && !this.month) {
      this.notification.showValidationMessage("Please select a year and month");
      this.rusaProgressList = [];
      return;
    } else if (
      this.year === this.yearFirst &&
      this.monthFirstData === this.month
    ) {
      this.rusaProgressList = [];
      this.notification.showValidationMessage(
        "Month and year should not be the same"
      );
      return;
    } else if (
      this.year &&
      this.month &&
      this.yearFirst &&
      this.monthFirstData
    ) {
        const year = this.yearFirst;
        const month = this.monthFirstData;
       //  this.getRusaProgressListNpd1(state, year, month);
       let payload = {
         year: year,
         month: month,
         stateCode : state === 'ALL' ? null : state,
         componentId: this.componentId === 'ALL' ? '' : this.componentId
       }
       let payload1 = {
         year: this.yearSecond,
         month: this.month,
         stateCode : state === 'ALL' ? null : state,
          componentId: this.componentId === 'ALL' ? '' : this.componentId
       }
       this.getRusaProgressListNpd1(payload, payload1)
  
    } else {
      this.notification.showValidationMessage("Please select a year and month");
      return;
    }
  }

  getRusaProgressListNpd1(payload, payload1) {
    this.getService.getLockPMUshaProgressListLock1(payload).subscribe(
      (res) => {
        if (res.status === 200) {
          if (res.data && res.data.length > 0) {
            this.tempListFirst = [...res.data];
            this.getRusaProgressListNpd2(payload1);
          } else {
            this.notification.showValidationMessage(
              `First Data is not available on this ${
                (this.monthFirstData, this.yearFirst)
              }`
            );
            this.rusaProgressList = [];
            this.tempList = [];
          }
        }
        this.handlePageChange((this.sharedService.page = 1));
      },
      (err) => {}
    );
  }
  getRusaProgressListNpd2(payload1) {
    let temp = [];
    this.getService.getLockPMUshaProgressListLock1(payload1).subscribe(
      (res) => {
        if (res.status === 200) {
          if (res.data && res.data.length > 0) {
            if (this.tempListFirst.length > 0 && res.data.length > 0) {
              let tem: any[] = this.compareArray(this.tempListFirst, res.data);
              this.rusaProgressList = [...tem];
              this.tempList = [...this.rusaProgressList];
            } else {
              if (res.data.length <= 0) {
                this.notification.showValidationMessage(
                  `Second Data is not available on this ${
                    (this.month, this.year)
                  }`
                );
              }
            }
          } else {
            this.notification.showValidationMessage(
              `Second Data is not available on this ${(this.month, this.year)}`
            );
            this.rusaProgressList = [];
            this.tempList = [];
          }
        }
        this.handlePageChange((this.sharedService.page = 1));
      },
      (err) => {}
    );
  }

   compareArray(arr1: any[], arr2: any[]): any[] {
  const matchedList = arr1.map((item1) => {
    const matchingItem = arr2.find(
      (e) => item1.userId === e?.rusaLegacyDataMinimalUse?.aisheCode
    );

    return {
      ...item1,
      physicalProgressTotal: item1.physicalProgressTotal || 0,
      totalAmountReleased: item1.totalAmountReleased || 0,
      totalUtilisation: item1.totalUtilisation || 0,
      projectStatusId: item1.projectStatusId || '',
      year: item1.year || '',
      monthName: item1.monthName || '',

      secondPhysicalProgressTotal: matchingItem?.physicalProgressTotal || 'No data',
      secondTotalAmountReleased: matchingItem?.totalAmountReleased || 'No data',
      secondTotalUtilisation: matchingItem?.totalUtilisation || 'No data',
      secondRusaProjectStatusId: matchingItem?.projectStatusId || 'No data',
      secondYear: matchingItem?.year || 'No data',
      secondMonth: matchingItem?.monthName || 'No data',
    };
  });

  // Extract all matched aisheCodes
  const matchedAisheCodes = new Set(arr1.map(item => item.userId));

  // Add unmatched arr2 items
  const unmatchedList = arr2
    .filter((e) => !matchedAisheCodes.has(e?.rusaLegacyDataMinimalUse?.aisheCode))
    .map((e) => {
      return {
        userId: e?.rusaLegacyDataMinimalUse?.aisheCode,
        state: e?.state,
        district: e?.district,
        componentId: e?.componentId,
        rusaPhase: 'PM-USHA',
        instituteName: e?.instituteName,

        physicalProgressTotal: 'No data',
        totalAmountReleased: 'No data',
        totalUtilisation: 'No data',
        projectStatusId: 'No data',
        year: 'No data',
        monthName: 'No data',

        secondPhysicalProgressTotal: e?.physicalProgressTotal || 0,
        secondTotalAmountReleased: e?.totalAmountReleased || 0,
        secondTotalUtilisation: e?.totalUtilisation || 0,
        secondRusaProjectStatusId: e?.projectStatusId || '',
        secondYear: e?.year || '',
        secondMonth: e?.monthName || '',
      };
    });

  return [...matchedList, ...unmatchedList];
}





  resetSearch() {
    this.arrYears1 = [];
    this.year = "";
    this.month = "";
    this.monthList = [];
    this.yearFirst = "";
    this.yearSecond = "";
    this.monthFirstData = "";
    this.rusaProgressList = [];
    this.monthListFirstData = [];
    this.stateName = ''
    this.componentId = ''
  }

  handlePageChange(event: any) {
    this.sharedService.page = event;
    (this.sharedService.StartLimit =
      (this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      (this.sharedService.EndLimit =
        this.sharedService.StartLimit + Number(this.sharedService.pageSize));
    var a = Math.ceil(
      this.rusaProgressList.length / Number(this.sharedService.pageSize)
    );
    if (a === event) {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.rusaProgressList.length
      );
    } else {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.rusaProgressList.length - 1
      );
    }
  }

  getSateData() {
  this.rusaProgressList=[];
    this.shareData.getStateData().subscribe(
      (res) => {
        this.stateList = res;
        this.filterStateList = this.stateList.slice();
      },
      () => {}
    );
  }

  getComponentList() {
    this.getService.getComponent().subscribe(res => {
      this.componentList = res;

      this.componentList = this.componentList.splice(0, 5)

        // this.componentList.splice(3, 1); // 2nd parameter means remove one item only
      // this.componentList.unshift({
      //   id: 0,
      //   componentName: '--ALL--'
      // })
      //  }, err => {
      // console.error('Error fetching page status:', err);
    })
  }

exportToExcel() {
  if (this.rusaProgressList.length !== 0) {
    let custom_data = [];
    this.rusaProgressList.forEach((item, index) => {
      // First Data Row
      custom_data.push({
        'S.No': index + 1,
        'State': item?.state?.name,
        'District': item.district?.name,
        'Component Name': item.componentId === 1 ? this.sharedService.meru :
              item.componentId === 2 ? this.sharedService.university :
              item.componentId === 3 ? this.sharedService.college :
              item.componentId === 5 ? this.sharedService.gender : '',
        'RUSA Phase': item.rusaPhase || 'PM-USHA',
        'Aishe Code': item?.rusaLegacyDataMinimalUse?.aisheCode,
        'Institution Name': item.instituteName + (item.userId ? ' (' + item.userId + ')' : ''),
        '% Physical Progress Total': item.physicalProgressTotal === 'NaN' ? 0 : item.physicalProgressTotal,
        'Total Amount Released': item.totalAmountReleased === 'NaN' ? 0 : item.firstcentralShareReleased,
        'Total Amount Utilized': item.totalUtilisation,
        'Project Status': item.projectStatusId === 1 ? 'Completed' :
            item.projectStatusId === 2 ? 'Ongoing' :
            item.projectStatusId === 3 ? 'Not yet started' : '',
        'Year': item.year,
        'Month': item.monthName,
        'Data Phase': 'First'
      });

      // Second Data Row
      custom_data.push({
        'S.No': '', // Empty to indicate continuation
        'State': '',
        'District': '',
        'Component Name': '', // Empty to keep structure like your table
        'RUSA Phase': '',
        'Institution Name': '',
        '% Physical Progress Total': item.secondPhysicalProgressTotal === 'No data found'
                ? 'No data found'
                : item.secondPhysicalProgressTotal,
        'Total Amount Released': item.secondTotalAmountReleased === 'No data found'
                ? 'No data found'
                : item.secondTotalAmountReleased,
        'Total Amount Utilized': item.secondTotalUtilisation === 'No data found'
              ? 'No data found'
              : item.secondTotalUtilisation,
        'Project Status': item.secondRusaProjectStatusId === 'No data found'
              ? 'No data found'
              : item.secondRusaProjectStatusId === 1
              ? 'Completed'
              : item.secondRusaProjectStatusId === 2
              ? 'Ongoing'
              : item.secondRusaProjectStatusId === 3
              ? 'Not yet started'
              : '',
        'Year': item.secondYear === 'No data found' ? 'No data found' : item.secondYear,
        'Month': item.secondMonth === 'No data found' ? 'No data found' : item.secondMonth,
        'Data Phase': 'Second'
      });
    });

    // Call your Excel export service
    this.excelService.exportToExcel(custom_data, `PMUSHA_Comparision_MPR_Data`);
  }
  else {
    this.notification.showValidationMessage("NO Data Found");
  }
}
}
