import { ViewportScroller } from "@angular/common";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { ExcelService } from "src/app/service/excel.service";
import { GetService } from "src/app/service/get.service";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import { PostService } from "src/app/service/post.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import { CustomErrorStateMatcher } from "src/app/utility/validators";

@Component({
  selector: "cfs-comparision-mpr-data",
  templateUrl: "./comparision-mpr-data.component.html",
  styleUrls: ["./comparision-mpr-data.component.scss"],
})
export class ComparisionMprDataComponent implements OnInit, OnChanges {
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
  @Input() passValue1;
  getLockList: any;
  arrYears: { year: string; }[];
  componentList: any;
  componentId: any;
  componentIdValue: any;
  componentNameList: any;
  variables: any;
rusaPhase: any;
  rusaPhaseValue: any;
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
    public api: ApiService, private excelService: ExcelService
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
      { year: '2023' },
      { year: '2024' },
      { year: '2025' },
      { year: '2026' },
    ]
  }
  ngOnChanges(event) {
    this.resetSearch();
    const value = event.passValue1.currentValue;
    if (value === 2) {
      if (
        this.userTypeId === this.sharedService.userTypeList["1"].id ||
        this.userTypeId === this.sharedService.userTypeList["2"].id ||
        this.userTypeId === this.sharedService.userTypeList["11"].id ||
        this.userTypeId === this.sharedService.userTypeList["12"].id
      ) {
        this.stateName = this.stateCode;
        this.checkedStateName = true;
        this.getSateData();
        this.getLockStatus();
      } else {
        this.stateName=''
        this.getSateData();
      }
    }
  }
  ngOnInit(): void {
    // this.getComponentList()
  }

  getLockStatus() {
    // this.monthListFirstData = [];
    // this.monthList = [];
    // this.yearFirst = "";
    // this.monthFirstData = "";
    // this.year = "";
    // this.month = "";
    // this.arrYears1 = [];
    // this.monthListFirstData1 = [];
    // let state = this.stateName || this.stateCode;
    // this.getService.getLockRusaProgress(state, this.sharedService.rusaKey).subscribe((res) => {
    //   this.getLockList = res.data;
    //   if (res.data && res.data.length > 0) {
    //     const data = this.sortData(res.data);
    //     data.forEach((v) => {
    //       let yearMonthIndex = this.arrYears1.findIndex(
    //         (item) => item.year === v.year
    //       );
    //       if (yearMonthIndex === -1) {
    //         this.arrYears1.push({
    //           monthlock: v.monthName,
    //           year: v.year,
    //         });
    //       }
    //       let monthCodeIndex = this.monthListFirstData.findIndex(
    //         (item) => item.name === v.monthName && item.monthCode === v.month
    //       );

    //       if (monthCodeIndex === -1) {
    //         this.monthListFirstData1.push({
    //           name: v.monthName,
    //           monthCode: v.month,
    //         });
    //       }
    //     });
    //   }
    // });
  }
  sortData(arr) {
    return arr.sort((a, b) => {
      return a.month - b.month;
    });
  }

  ChangesYearsFirst(data: any) {
   this.monthListFirstData = [];
   this.monthFirstData = "";
   this.yearFirst = data.value; // Store selected year


     if (this.yearFirst === '2023') {
       this.monthListFirstData = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
     }
     else if (this.yearFirst === '2024') {
       this.monthListFirstData = this.arrMonths;
     } 
     else if (this.yearFirst === '2025') {
       this.monthListFirstData = this.arrMonths;
     }
       else if (this.yearFirst === '2026') {
       this.monthListFirstData = this.arrMonths;
     }

     this.handlePageChange((this.sharedService.page = 1));
 }

 ChangesYears(data: any) {
   this.monthList = [];
   this.month = "";
   this.year = data.value; // Store selected year
     if (this.year === '2023') {
       this.monthList = [{ monthCode: '10', name: 'October', lastDate: '31' }, { monthCode: '11', name: 'November', lastDate: '30' }, { monthCode: '12', name: 'December', lastDate: '31' }];
     }
     else if (this.year === '2024') {
       this.monthList = this.arrMonths;
     } 
     else if (this.year === '2025') {
       this.monthList = this.arrMonths;
     }
      else if (this.year === '2026') {
       this.monthList = this.arrMonths;
     }

     this.handlePageChange((this.sharedService.page = 1));
 }
  // ChangesYearsFirst(data: any) {
  //   this.monthListFirstData = [];
  //   this.monthFirstData = "";

  //   this.monthListFirstData = this.monthListFirstData1;
  // }
  // ChangesYears(data: any) {
  //   this.monthList = [];
  //   this.month = "";
  //   this.monthList = this.monthListFirstData1;
  // }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange((this.sharedService.page = 1));
  }
  find() {
    if (!this.stateName) {
      this.notification.showValidationMessage("Please select state ");
      return;
    }

    let state = this.stateName === 'ALL' ? null : this.stateName;
    // this.componentIdValue = this.componentId === 'ALL' ? '' : this.componentId;
    // this.rusaPhaseValue = this.rusaPhase === 'ALL' ? '' : this.rusaPhase;
    if (!this.year && !this.month && !this.yearFirst && !this.monthFirstData) {
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
        this.getRusaProgressListNpd1(state, year, month);
  
    } else {
      this.notification.showValidationMessage("Please select a year and month");
      return;
    }
  }
  getRusaProgressListNpd1(state: any, year: any, month: any) {
    this.getService.getRusaProfressDataCompare(state, year, month).subscribe(
      (res) => {
        if (res.status === 200) {
          if (res.data && res.data.length > 0) {
            this.tempListFirst = [...res.data];
            this.getRusaProgressListNpd2(state, this.year, this.month);
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
  getRusaProgressListNpd2(state: any, year: any, month: any) {
    let temp = [];
    this.getService.getRusaProfressDataCompare(state, year, month).subscribe(
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

  compareArray(arr1, arr2) {
    return arr1.map((item1) => {
      const matchingItem = arr2.find((e) => item1.rusaId === e.rusaId);
      if (matchingItem) {
        return {
          ...item1,
          firstCentralShareApproved: item1.centralShareApproved || 0,
          firstcentralShareReleased: item1.centralShareReleased || 0,
          firstcentralShareUtilised: item1.centralShareUtilised || 0,
          firstStateShareApproved: item1.stateShareApproved || 0,
          firststateShareReleased: item1.stateShareReleased || 0,
          firststateShareUtilised: item1.stateShareUtilised || 0,
          firstShortfallInStateShareUnderScheme:
            item1.shortfallInStateShareUnderScheme || 0,
          firststateShareDueUnderScheme: item1.stateShareDueUnderScheme || 0,
          firsttotalAmountApproved: item1.totalAmountApproved || 0,
          firsttotalAmountReleased: item1.totalAmountReleased || 0,
          firsttotalUtilisation: item1.totalUtilisation || 0,
          firstActivitiesYetToBeUnderTaken:
            item1.activitiesYetToBeUnderTaken || 0,
          firstPhysicalProgressTotal: item1.physicalProgressTotal || 0,
          firstProjectStatusName: item1.projectStatusName || "",
          secondCentralShareApproved: matchingItem.centralShareApproved || 0,
          secondCentralShareReleased: matchingItem.centralShareReleased || 0,
          secondCentralShareUtilised: matchingItem.centralShareUtilised || 0,
          secondStateShareApproved: matchingItem.stateShareApproved || 0,
          secondStateShareReleased: matchingItem.stateShareReleased || 0,
          secondStateShareUtilised: matchingItem.stateShareUtilised || 0,
          secondShortfallInStateShareUnderScheme:
            matchingItem.shortfallInStateShareUnderScheme || 0,
          secondStateShareDueUnderScheme:
            matchingItem.stateShareDueUnderScheme || 0,
          secondTotalAmountApproved: matchingItem.totalAmountApproved || 0,
          secondTotalAmountReleased: matchingItem.totalAmountReleased || 0,
          secondTotalUtilisation: matchingItem.totalUtilisation || 0,
          secondActivitiesYetToBeUnderTaken:
            matchingItem.activitiesYetToBeUnderTaken || "",
          secondPhysicalProgressTotal: matchingItem.physicalProgressTotal || 0,
          secondProjectStatusName: matchingItem?.projectStatusName || "",
        };
      } else {
        return item1;
      }
    });
  }



  resetSearch() {
    this.arrYears1 = [];
    this.year = "";
    this.month = "";
    this.monthList = [];
    this.yearFirst = "";
    this.monthFirstData = "";
    this.rusaProgressList = [];
    this.monthListFirstData = [];
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
    this.masterService.getStateData().subscribe(
      (res) => {
        this.stateList = res;
        this.filterStateList = this.stateList.slice();
      },
      () => {}
    );
  }

  RusaStatus(statusValue: any) {
    this.getComponentId(statusValue)  
  }
  getComponentId(getValue: any) {
    let phaseRUSA1 = getValue === 'RUSA 1' ? '1' : getValue === 'RUSA 2' ? '2' : '-1'
    this.getService.getComponentName(phaseRUSA1)?.subscribe(res => {
      this.componentNameList = res;
      this.variables = this.componentNameList.slice()
                }, err => {
      console.error('Error fetching page status:', err);
    })
  }



exportToExcel() {
  if (this.rusaProgressList.length !== 0) {
    let custom_data = [];
    const updateList =  this.rusaProgressList.filter(e=> e.projectStatusId !== 4)
    updateList.forEach((item, index) => {
      // First Data Row
      custom_data.push({
        'S.No': index + 1,
        'Component Name': item.componentName,
        'RUSA Phase': item.rusaPhase,
        'Aishe Code': item?.aisheCode,
        'Institution Name': item.institutionName + (item.aisheCode ? ` (${item.aisheCode})` : ''),
        'State': item.stateName,
        'District': item.districtName,
        'Central Share Approved': item.firstCentralShareApproved,
        'Central Share Released': item.firstcentralShareReleased === 'NaN' ? 0 : item.firstcentralShareReleased,
        'Central Share Utilised': item.firstcentralShareUtilised,
        'State Share Approved': item.firstStateShareApproved,
        'State Share Due Share to be released': item.firststateShareDueUnderScheme,
        'State Share Released': item.firststateShareReleased,
        'State Share Utilised': item.firststateShareUtilised,
        'State Share Shortfall': item.firstShortfallInStateShareUnderScheme,
        'Total Amount Approved': item.firsttotalAmountApproved,
        'Total Amount Released': item.firsttotalAmountReleased,
        'Total Amount Utilised': item.firsttotalUtilisation,
        'Activities yet to be undertaken': item.firstActivitiesYetToBeUnderTaken || '',
        '% Physical Progress Total': item.firstPhysicalProgressTotal,
        'Project Status': item.firstProjectStatusName,
        'Data Phase': 'First'
      });

      // Second Data Row
      custom_data.push({
        'S.No': '', // Empty to indicate continuation
        'Component Name': '', // Empty to keep structure like your table
        'RUSA Phase': '',
        'Institution Name': '',
        'District': '',
        'Central Share Approved': item.secondCentralShareApproved,
        'Central Share Released': item.secondCentralShareReleased === 'NaN' ? 0 : item.secondCentralShareReleased,
        'Central Share Utilised': item.secondCentralShareUtilised,
        'State Share Approved': item.secondStateShareApproved,
        'State Share Due Share to be released': item.secondStateShareDueUnderScheme,
        'State Share Released': item.secondStateShareReleased,
        'State Share Utilised': item.secondStateShareUtilised,
        'State Share Shortfall': item.secondShortfallInStateShareUnderScheme,
        'Total Amount Approved': item.secondTotalAmountApproved,
        'Total Amount Released': item.secondTotalAmountReleased,
        'Total Amount Utilised': item.secondTotalUtilisation,
        'Activities yet to be undertaken': item.secondActivitiesYetToBeUnderTaken !== 'NIL' ? item.secondActivitiesYetToBeUnderTaken : '',
        '% Physical Progress Total': item.secondPhysicalProgressTotal,
        'Project Status': item.secondProjectStatusName,
        'Data Phase': 'Second'
      });
    });

    // Call your Excel export service
    this.excelService.exportToExcel(custom_data, `RUSA_Comparision_MPR_Data`);
  }
  else {
    this.notification.showValidationMessage("NO Data Found");
  }
}
}
